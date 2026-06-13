import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { createWaitlistHandler } from "../api/waitlist.js";

const ENV = {
  SUPABASE_URL: "https://example.supabase.co",
  SUPABASE_SECRET_KEY: "sb_secret_example",
};

function createMockResponse() {
  const response = {
    statusCode: undefined,
    body: undefined,
    headers: {},
    setHeader(name, value) {
      this.headers[name] = value;
      return this;
    },
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(payload) {
      this.body = payload;
      return this;
    },
  };

  return response;
}

/**
 * Builds a Supabase stub whose upsert resolves to `result` and records the
 * payload it was called with, so tests can assert email normalization.
 */
function createSupabaseUpsertStub(result) {
  const calls = [];

  const createClientImpl = () => ({
    from(tableName) {
      assert.equal(tableName, "waitlist_subscribers");
      return {
        upsert(values, options) {
          calls.push({ values, options });
          return {
            select() {
              return Promise.resolve(result);
            },
          };
        },
      };
    },
  });

  return { createClientImpl, calls };
}

function createSendEmailSpy() {
  const calls = [];
  const sendEmail = async (to) => {
    calls.push(to);
  };
  return { sendEmail, calls };
}

function jsonPostRequest(body, { ip = "203.0.113.1" } = {}) {
  return {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-forwarded-for": ip,
    },
    body,
  };
}

describe("api/waitlist", () => {
  it("returns 405 with Allow header for non-POST methods", async () => {
    const { createClientImpl } = createSupabaseUpsertStub({ data: [], error: null });
    const handler = createWaitlistHandler({ env: ENV, createClientImpl });
    const res = createMockResponse();

    await handler({ method: "GET", headers: {} }, res);

    assert.equal(res.statusCode, 405);
    assert.equal(res.headers.Allow, "POST");
    assert.deepEqual(res.body, { ok: false, message: "Method is not allowed" });
  });

  it("returns 415 when content-type is not JSON", async () => {
    const { createClientImpl } = createSupabaseUpsertStub({ data: [], error: null });
    const handler = createWaitlistHandler({ env: ENV, createClientImpl });
    const res = createMockResponse();

    await handler(
      { method: "POST", headers: { "content-type": "text/plain" } },
      res,
    );

    assert.equal(res.statusCode, 415);
    assert.deepEqual(res.body, { ok: false, message: "Unsupported content type" });
  });

  it("allows up to the limit then returns 429 for the same IP", async () => {
    const { createClientImpl } = createSupabaseUpsertStub({
      data: [{ id: 1 }],
      error: null,
    });
    const { sendEmail } = createSendEmailSpy();
    // Freeze the clock so all requests fall inside one rate-limit window.
    const handler = createWaitlistHandler({
      env: ENV,
      createClientImpl,
      sendEmail,
      now: () => 1_000,
    });

    for (let i = 0; i < 5; i += 1) {
      const res = createMockResponse();
      await handler(jsonPostRequest({ email: `user${i}@example.com` }), res);
      assert.equal(res.statusCode, 201);
    }

    const limited = createMockResponse();
    await handler(jsonPostRequest({ email: "user6@example.com" }), limited);

    assert.equal(limited.statusCode, 429);
    assert.deepEqual(limited.body, {
      ok: false,
      message: "Too many requests. Please try later.",
    });
  });

  it("treats a filled honeypot as fake success without writing or emailing", async () => {
    const { createClientImpl, calls: upsertCalls } = createSupabaseUpsertStub({
      data: [{ id: 1 }],
      error: null,
    });
    const { sendEmail, calls: emailCalls } = createSendEmailSpy();
    const handler = createWaitlistHandler({ env: ENV, createClientImpl, sendEmail });
    const res = createMockResponse();

    await handler(
      jsonPostRequest({ email: "bot@example.com", company_url: "spam" }),
      res,
    );

    assert.equal(res.statusCode, 201);
    assert.deepEqual(res.body, {
      ok: true,
      message: "You're on the list! We'll be in touch.",
    });
    assert.equal(upsertCalls.length, 0);
    assert.equal(emailCalls.length, 0);
  });

  it("returns 400 when the email is missing or not a string", async () => {
    const { createClientImpl } = createSupabaseUpsertStub({ data: [], error: null });
    const handler = createWaitlistHandler({ env: ENV, createClientImpl });

    for (const body of [{}, { email: 123 }, { email: "" }]) {
      const res = createMockResponse();
      await handler(jsonPostRequest(body), res);
      assert.equal(res.statusCode, 400);
      assert.deepEqual(res.body, { ok: false, message: "Email is required" });
    }
  });

  it("returns 400 for a malformed email address", async () => {
    const { createClientImpl } = createSupabaseUpsertStub({ data: [], error: null });
    const handler = createWaitlistHandler({ env: ENV, createClientImpl });
    const res = createMockResponse();

    await handler(jsonPostRequest({ email: "not-an-email" }), res);

    assert.equal(res.statusCode, 400);
    assert.deepEqual(res.body, { ok: false, message: "Invalid email address" });
  });

  it("normalizes the email before upserting and sends a confirmation on a new row", async () => {
    const { createClientImpl, calls: upsertCalls } = createSupabaseUpsertStub({
      data: [{ id: 7, email: "foo@bar.com" }],
      error: null,
    });
    const { sendEmail, calls: emailCalls } = createSendEmailSpy();
    const handler = createWaitlistHandler({ env: ENV, createClientImpl, sendEmail });
    const res = createMockResponse();

    await handler(jsonPostRequest({ email: "  Foo@Bar.COM " }), res);

    assert.equal(res.statusCode, 201);
    assert.deepEqual(res.body, {
      ok: true,
      message: "You're on the list! We'll be in touch.",
    });
    assert.equal(upsertCalls.length, 1);
    assert.deepEqual(upsertCalls[0].values, { email: "foo@bar.com" });
    assert.deepEqual(emailCalls, ["foo@bar.com"]);
  });

  it("returns 500 and does not email when Supabase reports an error", async () => {
    const { createClientImpl } = createSupabaseUpsertStub({
      data: null,
      error: new Error("database unavailable"),
    });
    const { sendEmail, calls: emailCalls } = createSendEmailSpy();
    const handler = createWaitlistHandler({ env: ENV, createClientImpl, sendEmail });
    const res = createMockResponse();

    await handler(jsonPostRequest({ email: "user@example.com" }), res);

    assert.equal(res.statusCode, 500);
    assert.deepEqual(res.body, {
      ok: false,
      message: "Something went wrong. Please try again.",
    });
    assert.equal(emailCalls.length, 0);
  });

  it("returns 409 without emailing when the subscriber already exists", async () => {
    const { createClientImpl } = createSupabaseUpsertStub({ data: [], error: null });
    const { sendEmail, calls: emailCalls } = createSendEmailSpy();
    const handler = createWaitlistHandler({ env: ENV, createClientImpl, sendEmail });
    const res = createMockResponse();

    await handler(jsonPostRequest({ email: "existing@example.com" }), res);

    assert.equal(res.statusCode, 409);
    assert.deepEqual(res.body, {
      ok: true,
      message: "You're already on the waitlist!",
    });
    assert.equal(emailCalls.length, 0);
  });
});
