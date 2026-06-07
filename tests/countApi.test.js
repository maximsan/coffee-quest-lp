import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { createCountHandler } from "../api/count.js";

function createMockResponse() {
  const response = {
    statusCode: undefined,
    body: undefined,
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

function createSupabaseCountStub(result) {
  return () => ({
    from(tableName) {
      assert.equal(tableName, "waitlist_subscribers");

      return {
        select(columns, options) {
          assert.equal(columns, "*");
          assert.deepEqual(options, { count: "exact", head: true });
          return result;
        },
      };
    },
  });
}

describe("api/count", () => {
  it("returns 401 when the bearer token is missing", async () => {
    const handler = createCountHandler({
      env: { COUNT_API_TOKEN: "secret" },
      createClientImpl: createSupabaseCountStub({ count: 5, error: null }),
    });
    const res = createMockResponse();

    await handler({ headers: {} }, res);

    assert.equal(res.statusCode, 401);
    assert.deepEqual(res.body, { error: "unauthorized" });
  });

  it("returns the exact waitlist subscriber count for authorized callers", async () => {
    const handler = createCountHandler({
      env: {
        COUNT_API_TOKEN: "secret",
        SUPABASE_URL: "https://example.supabase.co",
        SUPABASE_SECRET_KEY: "sb_secret_example",
      },
      createClientImpl: createSupabaseCountStub({ count: 42, error: null }),
    });
    const res = createMockResponse();

    await handler({ headers: { authorization: "Bearer secret" } }, res);

    assert.equal(res.statusCode, 200);
    assert.deepEqual(res.body, { count: 42 });
  });

  it("returns 500 when Supabase cannot complete the count query", async () => {
    const handler = createCountHandler({
      env: {
        COUNT_API_TOKEN: "secret",
        SUPABASE_URL: "https://example.supabase.co",
        SUPABASE_SECRET_KEY: "sb_secret_example",
      },
      createClientImpl: createSupabaseCountStub({
        count: null,
        error: new Error("database unavailable"),
      }),
    });
    const res = createMockResponse();

    await handler({ headers: { authorization: "Bearer secret" } }, res);

    assert.equal(res.statusCode, 500);
    assert.deepEqual(res.body, { error: "database unavailable" });
  });
});
