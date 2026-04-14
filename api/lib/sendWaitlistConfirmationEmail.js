import { Resend } from "resend";

import { buildWaitlistConfirmationEmail } from "./waitlistConfirmationEmail.js";

/**
 * Sends a transactional signup confirmation via Resend.
 * Does not throw; logs on misconfig or provider errors.
 *
 * @param {string} to - Recipient email (normalized)
 */
export async function sendWaitlistConfirmationEmail(to) {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    console.warn("RESEND_API_KEY missing; skip waitlist confirmation email");
    return;
  }

  const from = process.env.WAITLIST_FROM_EMAIL?.trim();
  if (!from) {
    console.warn("WAITLIST_FROM_EMAIL missing; skip waitlist confirmation email");
    return;
  }

  const siteUrl = (process.env.PUBLIC_SITE_URL ?? "").trim().replace(/\/$/, "");
  if (!siteUrl) {
    console.warn("PUBLIC_SITE_URL missing; skip waitlist confirmation email");
    return;
  }

  const privacyUrl = (process.env.PRIVACY_POLICY_URL ?? "").trim() || undefined;

  let logoUrlOpt;
  const rawLogo = process.env.EMAIL_LOGO_URL?.trim();
  if (rawLogo === "none" || rawLogo === "false") {
    logoUrlOpt = null;
  } else if (rawLogo) {
    logoUrlOpt = rawLogo;
  }

  const { subject, text, html } = buildWaitlistConfirmationEmail({
    siteUrl,
    privacyUrl,
    logoUrl: logoUrlOpt,
  });

  try {
    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send({
      from,
      to,
      subject,
      text,
      html,
    });

    if (error) {
      console.error("Resend API error:", error);
      return;
    }

    if (data?.id) {
      console.info("Waitlist confirmation email sent:", data.id);
    }
  } catch (err) {
    console.error("Waitlist confirmation email failed:", err);
  }
}
