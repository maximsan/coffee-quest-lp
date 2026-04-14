import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { buildWaitlistConfirmationEmail } from "../api/lib/waitlistConfirmationEmail.js";

describe("buildWaitlistConfirmationEmail", () => {
  it("returns transactional subject and body", () => {
    const { subject, text, html } = buildWaitlistConfirmationEmail({
      siteUrl: "https://example.com",
    });

    assert.equal(subject, "You're on the Coffee Quest waitlist");
    assert.match(text, /confirmed on the Coffee Quest waitlist/);
    assert.match(text, /joined the waitlist at https:\/\/example\.com/);
    assert.ok(!text.includes("Privacy:"));
    assert.match(html, /https:\/\/example\.com\/email-logo\.png/);
    assert.match(html, /alt="Coffee Quest"/);
  });

  it("appends privacy line when privacyUrl is set", () => {
    const { text, html } = buildWaitlistConfirmationEmail({
      siteUrl: "https://example.com",
      privacyUrl: "https://example.com/privacy",
    });

    assert.match(text, /Privacy: https:\/\/example\.com\/privacy$/m);
    assert.match(html, /href="https:\/\/example\.com\/privacy"/);
  });

  it("omits footer image when logoUrl is null", () => {
    const { html } = buildWaitlistConfirmationEmail({
      siteUrl: "https://example.com",
      logoUrl: null,
    });

    assert.ok(!html.includes("<img"));
  });

  it("uses custom logo URL when provided", () => {
    const { html } = buildWaitlistConfirmationEmail({
      siteUrl: "https://example.com",
      logoUrl: "https://cdn.example.com/mark.png",
    });

    assert.match(html, /src="https:\/\/cdn\.example\.com\/mark\.png"/);
  });
});
