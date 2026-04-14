# Waitlist Setup

Collects subscriber emails via a Vercel Serverless Function and stores them in Supabase (Postgres).

## 1. Create the Supabase table

Sign up at [supabase.com](https://supabase.com) (free tier), create a project, then run this SQL in the **SQL Editor**:

```sql
CREATE TABLE waitlist_subscribers (
  id         BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email      TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

## 2. Get your credentials

In the Supabase dashboard go to **Settings → API** and copy:

- **Project URL** (e.g. `https://abcdef.supabase.co`)
- **service_role key** (secret — never expose in client code)

## 3. Set environment variables

### Local development

Copy the example file and fill in your values:

```bash
cp .env.example .env
```

### Vercel production

In **Vercel → Project → Settings → Environment Variables** add:

| Name | Value |
|------|-------|
| `SUPABASE_URL` | Your project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Your service_role key |

## 4. Deploy

Push to your repository. Vercel will automatically detect `api/waitlist.js` as a serverless function and deploy it alongside the Vite frontend.

## How it works

```
Browser (WaitlistForm)
  → POST /api/waitlist  { email }
    → Vercel Serverless Function
      → validates + normalizes email
      → inserts into Supabase
      → returns JSON { ok, message }
    ← success / duplicate / error feedback shown in form
```

## View subscribers

Open the Supabase dashboard → **Table Editor → waitlist_subscribers**. You can sort by `created_at`, see total count, or export as CSV.

## Sending invite emails later

When the app is ready, export the subscriber list (CSV or SQL query) and use any email service (Resend, SendGrid, Mailchimp) to send the launch announcement.
