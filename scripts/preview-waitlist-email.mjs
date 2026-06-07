/**
 * Builds the waitlist confirmation email and writes it to
 * waitlist-email-preview.html at the repository root for browser preview.
 * Logo src is rewritten to ./public/email-logo.png
 * when using the default asset (so file:// preview loads without a deployed site).
 *
 * Loads local env files from the repo root:
 * `.env`, `.env.local`, then `.env.private.local`.
 *
 * All values below are read from process.env after that load.
 * Usage:
 *   pnpm email:preview
 *
 * Relevant env vars: PUBLIC_SITE_URL, PRIVACY_POLICY_URL, EMAIL_LOGO_URL.
 */

import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { buildWaitlistConfirmationEmail } from "../api/lib/waitlistConfirmationEmail.js";
import { loadLocalEnv } from "./lib/loadLocalEnv.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

loadLocalEnv({ cwd: root });

const env = process.env;
const outPath = join(root, "waitlist-email-preview.html");

const siteUrl = (env.PUBLIC_SITE_URL ?? "https://example.com")
  .trim()
  .replace(/\/$/, "");

const privacyUrl = (env.PRIVACY_POLICY_URL ?? "").trim() || undefined;

const rawLogo = (env.EMAIL_LOGO_URL ?? "").trim();
let logoUrl;
if (rawLogo === "none" || rawLogo === "false") logoUrl = null;
else if (rawLogo) logoUrl = rawLogo;

const usedCustomLogoFromEnv = Boolean(
  rawLogo && rawLogo !== "none" && rawLogo !== "false",
);

const { subject, html } = buildWaitlistConfirmationEmail({
  siteUrl,
  privacyUrl,
  logoUrl,
});

let fileHtml = html;
if (!usedCustomLogoFromEnv) {
  fileHtml = fileHtml.replace(
    /src="[^"]*\/email-logo\.png[^"]*"/,
    'src="./public/email-logo.png"',
  );
}

writeFileSync(outPath, fileHtml, "utf8");

console.log(`Wrote ${outPath}`);
console.log("Open that file in a browser to preview HTML and the footer logo.");
console.log("");
console.log("Subject:", subject);
console.log(
  "(Plain text body is unchanged; see api/lib/waitlistConfirmationEmail.js or your inbox.)",
);
