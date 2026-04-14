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

-- Required: the publishable (anon) key ships in the browser. Without RLS, anyone could read or wipe emails via PostgREST.
ALTER TABLE waitlist_subscribers ENABLE ROW LEVEL SECURITY;
```

If you skip the `ALTER TABLE ... ENABLE ROW LEVEL SECURITY` line, Supabase’s **Database → Security Advisor** flags `rls_disabled_in_public` (error) because `anon` has default grants on new `public` tables. After enabling RLS with no policies, you may see an **informational** `rls_enabled_no_policy` notice — that is expected for a table only written from your server (the Secret key uses a role that bypasses RLS). See [Row Level Security](https://supabase.com/docs/guides/database/postgres/row-level-security).

## 2. Get your credentials

In the Supabase dashboard go to **Settings → API** (or use **Project → Connect**) and copy:

- **Project URL** (e.g. `https://abcdef.supabase.co`)
- **Secret API key** (`sb_secret_...`) from **Settings → API Keys** — use this for server-side inserts. It is not a JWT; Supabase maps it to the same elevated Postgres role as the old `service_role` key and you can rotate it independently in the dashboard.

Supabase is moving hosted projects from long-lived JWT **anon** / **service_role** keys to **publishable** (`sb_publishable_...`) and **secret** (`sb_secret_...`) keys. The old keys are tied to the project JWT secret, which makes rotation risky (everything rotates together, long-lived tokens, mobile rollout delays). Secret keys are verified at the API gateway, mint short-lived JWTs downstream, block browser `User-Agent` misuse with 401, and can be rotated or revoked per key. The JWT **service_role** key still works during the transition (see **Legacy API keys** in the dashboard), but new setups should use a **Secret** key.

Reference: [Understanding API keys](https://supabase.com/docs/guides/api/api-keys).

## 3. Set environment variables

### Local development

Copy the example file and fill in your values:

```bash
cp .env.example .env
```

The Vite dev server (`pnpm dev`) does not run `api/waitlist.js`. To call that route locally, use `vercel dev` as described in section 4.

### Vercel production

In **Vercel → Project → Settings → Environment Variables** add:

| Name                  | Value                                     |
| --------------------- | ----------------------------------------- |
| `SUPABASE_URL`        | Your project URL                          |
| `SUPABASE_SECRET_KEY` | Your **Secret** API key (`sb_secret_...`) |

## 4. Run the API locally

`pnpm dev` starts **Vite** only; it does not mount `api/waitlist.js`. To hit `POST /api/waitlist` on your machine, run the app with the **Vercel CLI**, which serves serverless routes from the `api/` directory.

1. Install the CLI (once), for example: `pnpm dlx vercel@latest --version` or install `vercel` globally.
2. From the project root, run `vercel link` if this repo is not already linked to a Vercel project.
3. Ensure `SUPABASE_URL` and `SUPABASE_SECRET_KEY` are set in a root env file Vercel loads for dev (for example `.env` or `.env.local`, same values as in step 3).
4. Start local dev: `vercel dev`  
   The CLI prints the URL (often `http://localhost:3000`). The waitlist form and `POST /api/waitlist` both use that origin.

**Smoke-test with curl** (replace the URL if your CLI uses another port):

```bash
curl -s -X POST http://localhost:3000/api/waitlist \
  -H "Content-Type: application/json" \
  -d '{"email":"you@example.com"}'
```

Leave `company_url` unset or empty for a real signup; a non-empty value is the honeypot and returns a fake success without writing to the database.

## 5. Deploy

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
