/* global process */
import { createClient } from "@supabase/supabase-js";

const databaseClient = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

// Matches: non-whitespace/@ + @ + non-whitespace/@ + . + non-whitespace/@
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;

// In-memory store; resets on cold start (acceptable for burst protection)
const ipTimestamps = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW_MS;
  const timestamps = ipTimestamps.get(ip) ?? [];

  // Discard entries outside the sliding window
  const recentTimestamps = timestamps.filter((t) => t > windowStart);

  if (recentTimestamps.length >= RATE_LIMIT_MAX) {
    ipTimestamps.set(ip, recentTimestamps);
    return true;
  }

  recentTimestamps.push(now);
  ipTimestamps.set(ip, recentTimestamps);
  return false;
}

// Extracts the originating client IP from Vercel's x-forwarded-for header
function getClientIp(req) {
  const forwarded = req.headers["x-forwarded-for"] ?? "";
  return forwarded.split(",")[0].trim() || "unknown";
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res
      .status(405)
      .json({ ok: false, message: "Method is not allowed" });
  }

  const contentType = req.headers["content-type"] ?? "";
  if (!contentType.includes("application/json")) {
    return res
      .status(415)
      .json({ ok: false, message: "Unsupported content type" });
  }

  const ip = getClientIp(req);

  if (isRateLimited(ip)) {
    return res
      .status(429)
      .json({ ok: false, message: "Too many requests. Please try later." });
  }

  const { email: rawEmail, company_url: honeypot } = req.body ?? {};

  // Honeypot filled — silently fake success so the bot thinks it worked
  if (honeypot) {
    return res
      .status(201)
      .json({ ok: true, message: "You're on the list! We'll be in touch." });
  }

  if (!rawEmail || typeof rawEmail !== "string") {
    return res.status(400).json({ ok: false, message: "Email is required" });
  }

  const email = rawEmail.trim().toLowerCase();

  if (!EMAIL_PATTERN.test(email)) {
    return res
      .status(400)
      .json({ ok: false, message: "Invalid email address" });
  }

  const { data, error } = await databaseClient
    .from("waitlist_subscribers")
    .upsert({ email }, { onConflict: "email", ignoreDuplicates: true })
    .select();

  if (error) {
    console.error("Supabase insert error:", error);
    return res
      .status(500)
      .json({ ok: false, message: "Something went wrong. Please try again." });
  }

  if (data.length === 0) {
    return res
      .status(409)
      .json({ ok: true, message: "You're already on the waitlist!" });
  }

  return res
    .status(201)
    .json({ ok: true, message: "You're on the list! We'll be in touch." });
}
