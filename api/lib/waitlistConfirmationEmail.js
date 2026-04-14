const APP_NAME = "Coffee Quest";

/** @param {string} s */
function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** @param {string} url */
function safeHttpUrl(url) {
  try {
    const u = new URL(url);
    if (u.protocol !== "http:" && u.protocol !== "https:") return "";
    return u.href;
  } catch {
    return "";
  }
}

/**
 * @param {{ siteUrl: string; siteHref: string; privacyHref: string; logoSrc: string }} p
 */
function buildConfirmationHtml({ siteUrl, siteHref, privacyHref, logoSrc }) {
  const safeSite = escapeHtml(siteUrl);
  const title = escapeHtml(`You're on the ${APP_NAME} waitlist`);

  const footerLinks = siteHref
    ? ` at <a href="${escapeHtml(siteHref)}" style="color:#6b4f2d;text-decoration:underline;">${safeSite}</a>`
    : ` at ${safeSite}`;

  const logoCell = logoSrc
    ? `<td style="width:64px;padding:0 16px 0 0;vertical-align:middle;">
         <img src="${escapeHtml(logoSrc)}" alt="${escapeHtml(APP_NAME)}" width="56" height="56" style="display:block;width:56px;height:56px;border-radius:14px;border:1px solid #304236;" />
       </td>`
    : "";

  const privacyBlock = privacyHref
    ? `<p style="margin:16px 0 0;font-size:13px;line-height:1.55;color:#5c4f44;"><a href="${escapeHtml(privacyHref)}" style="color:#6b4f2d;">Privacy</a></p>`
    : "";

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>${title}</title></head>
<body style="margin:0;padding:0;background:#f4eadf;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f4eadf;">
<tr><td align="center" style="padding:28px 16px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:520px;margin:0 auto;background:#fffdf9;border:1px solid #e8d8c8;border-radius:16px;">
<tr><td style="padding:28px 26px 24px;font-family:Georgia,'Times New Roman',serif;font-size:16px;line-height:1.6;color:#2c2018;">
<p style="margin:0 0 12px;">Hi,</p>
<p style="margin:0 0 12px;">You're confirmed on the <strong>${escapeHtml(APP_NAME)}</strong> waitlist.</p>
<p style="margin:0 0 12px;">We will email you when the app is available to the public.</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:28px;padding-top:22px;border-top:1px solid #e0d0c2;">
<tr>
${logoCell}<td style="vertical-align:middle;padding:0;font-size:13px;line-height:1.55;color:#5c4f44;">
<strong style="font-size:14px;color:#2c2018;">${escapeHtml(APP_NAME)}</strong><br />
You are receiving this because you joined the waitlist${footerLinks}.
</td>
</tr>
</table>
${privacyBlock}
</td></tr></table>
</td></tr></table>
</body>
</html>`;
}

/**
 * Pure builder for the waitlist signup confirmation (plain text + HTML).
 * @param {{ siteUrl: string; privacyUrl?: string; logoUrl?: string | null }} params
 * - `logoUrl`: absolute image URL for the footer mark. Pass `null` to omit the image.
 *   Omit the key to default to `{siteUrl}/email-logo.png` (raster mark aligned with `public/favicon.svg`).
 */
export function buildWaitlistConfirmationEmail({ siteUrl, privacyUrl, logoUrl }) {
  const subject = `You're on the ${APP_NAME} waitlist`;

  const lines = [
    "Hi,",
    "",
    `You're confirmed on the ${APP_NAME} waitlist.`,
    "",
    "We will email you when the app is available to the public.",
    "",
    `— ${APP_NAME}`,
    `You are receiving this because you joined the waitlist at ${siteUrl}.`,
  ];

  if (privacyUrl) {
    lines.push(`Privacy: ${privacyUrl}`);
  }

  const text = lines.join("\n");

  const siteHref = safeHttpUrl(siteUrl);
  const privacyHref = privacyUrl ? safeHttpUrl(privacyUrl) : "";

  let resolvedLogo = "";
  if (logoUrl === null) {
    resolvedLogo = "";
  } else if (logoUrl) {
    resolvedLogo = safeHttpUrl(logoUrl);
  } else {
    const base = (siteHref || siteUrl).replace(/\/$/, "");
    resolvedLogo = base ? safeHttpUrl(`${base}/email-logo.png`) : "";
  }

  const html = buildConfirmationHtml({
    siteUrl,
    siteHref,
    privacyHref,
    logoSrc: resolvedLogo,
  });

  return { subject, text, html };
}
