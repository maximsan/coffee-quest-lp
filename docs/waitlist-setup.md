# Waitlist Setup

Collects subscriber emails via a Vercel Serverless Function and stores them in Supabase (Postgres).

## 1. Create or update the Supabase schema

Sign up at [supabase.com](https://supabase.com) (free tier) and create a project.

### Recommended: Supabase CLI migrations

Use the committed files in `supabase/migrations/` as the schema source of truth. From the repo root:

```bash
pnpm dlx supabase@latest login
pnpm dlx supabase@latest link
pnpm dlx supabase@latest migration list
pnpm dlx supabase@latest db push --dry-run
pnpm dlx supabase@latest db push
```

`migration list` shows which migrations are already applied. `db push --dry-run` previews pending migrations before changing the remote database. `db push` applies pending migrations in timestamp order.

Do not make routine schema changes directly in the Supabase Dashboard or SQL Editor once migrations are in use. Create a new migration file and apply it with `db push` so the remote migration history stays in sync.

### Manual fallback: SQL Editor

If you are not using the Supabase CLI, run this idempotent SQL in the **SQL Editor**. It creates the table for a new project and updates the existing table when the table already exists.

```sql
CREATE TABLE IF NOT EXISTS public.waitlist_subscribers (
  id         BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email      TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.waitlist_subscribers
  ADD COLUMN IF NOT EXISTS notified_at TIMESTAMPTZ;

CREATE UNIQUE INDEX IF NOT EXISTS waitlist_subscribers_email_key
  ON public.waitlist_subscribers (email);

COMMENT ON COLUMN public.waitlist_subscribers.notified_at IS
  'Timestamp set after the subscriber receives the Coffee Quest launch notification; NULL means unsent.';

-- Required: the publishable (anon) key ships in the browser. Without RLS, anyone could read or wipe emails via PostgREST.
ALTER TABLE public.waitlist_subscribers ENABLE ROW LEVEL SECURITY;
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

Follow the local application testing flow in [`ENVIRONMENT.md`](../ENVIRONMENT.md) to create `.env.private.local`, fill the minimum local values, run `pnpm env:check`, and start `pnpm dev:vercel`.

The Vite dev server (`pnpm dev`) does not run `api/waitlist.js`. To call that route locally, use `pnpm dev:vercel` as described in section 4.

### Vercel production

In **Vercel → Project → Settings → Environment Variables**, add the production variables listed in [`ENVIRONMENT.md`](../ENVIRONMENT.md).

The Blob store must be private because subscriber exports contain PII. Do not commit CSV backups.

### Vercel Blob backup store

Create one private Vercel Blob store for waitlist CSV backups before enabling the maintenance workflow.

Dashboard setup:

1. Open **Vercel → Project → Storage**.
2. Select **Create Database → Blob**.
3. Choose an EU region for the store.
4. Set access to **Private**.
5. Connect the store to this Vercel project.

CLI setup, if you prefer the terminal:

```bash
vercel link
vercel blob create-store coffee-quest-waitlist-backups --access private --region fra1
```

Private access matters because backup files contain subscriber email addresses. Vercel Blob access mode is chosen when the store is created, so do not create this as a public store.

When the store is connected to the project, Vercel creates `BLOB_READ_WRITE_TOKEN` for the selected environments. Follow [`ENVIRONMENT.md`](../ENVIRONMENT.md) for local Blob testing, including what to do when Production or Preview tokens are sensitive and unreadable.

The backup script uploads to `backups/waitlist-subscribers-YYYY-MM-DD.csv` with `access: "private"` and `addRandomSuffix: false`. Running the backup more than once on the same day targets the same pathname and can fail if that blob already exists, so use the scheduled workflow as the normal path and only run local backups intentionally.

References: [Vercel Blob private storage](https://vercel.com/docs/vercel-blob/private-storage), [Vercel Blob SDK token behavior](https://vercel.com/docs/vercel-blob/using-blob-sdk), and [Vercel Blob CLI](https://vercel.com/docs/cli/blob).

### GitHub maintenance credentials

The maintenance workflow cannot read sensitive app secrets back from Vercel. Add the maintenance values listed in [`ENVIRONMENT.md`](../ENVIRONMENT.md) directly in **GitHub → Repository → Settings → Secrets and variables → Actions**.

Create a [Resend](https://resend.com) account, verify your sending domain (or use Resend’s test sender for development), and create an API key.

## 4. Run the API locally

`pnpm dev` starts **Vite** only; it does not mount `api/waitlist.js`. To test the waitlist form and API routes locally, follow the local application testing flow in [`ENVIRONMENT.md`](../ENVIRONMENT.md).

## 5. Deploy

Push to your repository. Vercel will automatically detect `api/waitlist.js` as a serverless function and deploy it alongside the Vite frontend.

## How it works

```
Browser (WaitlistForm)
  → POST /api/waitlist  { email }
    → Vercel Serverless Function
      → validates + normalizes email
      → inserts into Supabase
      → if new row: sends transactional confirmation via Resend (when env is set)
      → returns JSON { ok, message }
    ← success / duplicate / error feedback shown in form
```

### Confirmation email

- Sent only when a **new** subscriber row is inserted (`201`). Duplicate signups (`409`, same email again) do **not** trigger another email.
- If `RESEND_API_KEY`, `WAITLIST_FROM_EMAIL`, or `PUBLIC_SITE_URL` is missing, the API still returns success and the row is stored; the function logs a warning and skips sending.
- Email failures are logged; the HTTP response remains success so users are not blocked after a successful insert.
- Messages include **plain text and HTML**. The HTML footer shows the **Coffee Quest** app mark from [`public/email-logo.png`](../public/email-logo.png) (PNG derived from the same icon as [`public/favicon.svg`](../public/favicon.svg)) so clients that block remote images still get the text version. After rebranding, regenerate or replace `email-logo.png` so it stays in sync with the favicon.

## Preview and test the confirmation email

**HTML file in the repo (no Resend call)**

From the repo root, `pnpm email:preview` writes **`waitlist-email-preview.html`** (gitignored) next to `package.json`. It loads local env files in the order documented in [`ENVIRONMENT.md`](../ENVIRONMENT.md), then reads `PUBLIC_SITE_URL`, `PRIVACY_POLICY_URL`, and `EMAIL_LOGO_URL` from `process.env` (same variables as the deployed API). Open the HTML file in a browser to see layout and styling. For local preview, the script rewrites the footer logo to **`./public/email-logo.png`** so the image loads without a deployed `PUBLIC_SITE_URL` (skipped when you set a custom `EMAIL_LOGO_URL`).

```bash
pnpm email:preview
PUBLIC_SITE_URL=https://your-site.com PRIVACY_POLICY_URL=https://your-site.com/privacy pnpm email:preview
EMAIL_LOGO_URL=none pnpm email:preview   # preview without footer image
```

**Automated checks (copy / structure)**

```bash
pnpm test:email
```

This runs Node’s built-in test runner against `buildWaitlistConfirmationEmail` so refactors to the template stay guarded in CI.

**Real send in your inbox**

1. Create `.env.private.local` by following [`ENVIRONMENT.md`](../ENVIRONMENT.md), including email variables.
2. Run `pnpm dev:vercel` and `POST /api/waitlist` with a disposable address (see curl in section 4), or submit the landing form.
3. In the [Resend dashboard](https://resend.com/emails), open the message to inspect HTML and image loading (logo URL must be publicly reachable over HTTPS).

For richer layouts later, consider [React Email](https://react.email) or Resend’s templates; the current HTML is inlined in `api/lib/waitlistConfirmationEmail.js` for easy review.

## View subscribers

Open the Supabase dashboard → **Table Editor → waitlist_subscribers**. You can sort by `created_at`, see total count, or export as CSV.

## Daily backup and keep-alive

The `.github/workflows/maintenance.yml` workflow runs every day at 09:00 UTC and can also be run manually from GitHub Actions.

The workflow does four things:

1. Validates required GitHub Actions secret names without printing values.
2. Reads the full `waitlist_subscribers` table through the Supabase API and writes `waitlist_subscribers.csv`.
3. Uploads the CSV to the private Vercel Blob store at `backups/waitlist-subscribers-YYYY-MM-DD.csv`.
4. Deletes older backup blobs so only the newest 14 daily snapshots remain.

GitHub Actions provides maintenance values through repository secrets. Local maintenance runs use `.env.private.local`; see [`ENVIRONMENT.md`](../ENVIRONMENT.md) for the required names.

The Supabase table read is also the keep-alive activity. No `/api/keepalive` function is required.

### Restore from backup

Download the latest private Blob backup with a readable `BLOB_READ_WRITE_TOKEN` from `.env.private.local` or your shell. See [`ENVIRONMENT.md`](../ENVIRONMENT.md) if you do not have a readable token. Then run the create-or-update schema SQL above and import the CSV through a temporary table:

```sql
create temporary table waitlist_subscribers_backup (
  id bigint,
  email text,
  created_at timestamptz,
  notified_at timestamptz
);

\copy waitlist_subscribers_backup from 'waitlist-subscribers-YYYY-MM-DD.csv' with csv header;

insert into public.waitlist_subscribers (email, created_at, notified_at)
select email, created_at, notified_at
from waitlist_subscribers_backup
on conflict (email) do update
set created_at = excluded.created_at,
    notified_at = excluded.notified_at;
```

The backup includes `notified_at`, so launch send-state is restored with the subscriber list. The restored table can regenerate identity IDs because no app behavior depends on preserving old row IDs.

## Live subscriber count

Use the secret-gated Vercel Function to check the current list size before launch. Replace the URL and token with the deployed site URL and the `COUNT_API_TOKEN` value from Vercel:

```bash
curl -s https://your-site.com/api/count \
  -H "Authorization: Bearer $COUNT_API_TOKEN"
```

To run the same check locally, follow [`ENVIRONMENT.md`](../ENVIRONMENT.md), start `pnpm dev:vercel`, and call the local function URL:

```bash
curl -s http://localhost:3000/api/count \
  -H "Authorization: Bearer $COUNT_API_TOKEN"
```

Authorized requests return:

```json
{ "count": 42 }
```

Unauthorized requests return `401`.

## Sending the launch email

Use Resend Broadcasts for the one-time launch email while the list is under 1,000 contacts. Resend's current marketing model uses [Contacts](https://resend.com/docs/dashboard/audiences/contacts), [Segments](https://resend.com/docs/dashboard/segments/introduction), and [Broadcasts](https://resend.com/docs/api-reference/broadcasts/create-broadcast); check those docs again immediately before launch in case the dashboard or API has changed.

### Primary launch checklist

1. Call `/api/count` with `COUNT_API_TOKEN` and confirm the list is under 1,000 contacts.
2. Export the emails that will be synced:

   ```sql
   \copy (
     select email
     from public.waitlist_subscribers
     where notified_at is null
     order by created_at asc
   ) to 'launch-synced-emails.csv' with csv header;
   ```

3. Import `launch-synced-emails.csv` into Resend Contacts and add those contacts to a launch Segment, or sync the same emails through the Resend Contacts API.
4. Create one Resend Broadcast for the launch Segment. Include the required unsubscribe link, sender identity, and contact/postal address in the footer.
5. Send the Broadcast from Resend.
6. After the Broadcast is sent, stamp only the emails that were synced to the launch Segment:

   ```sql
   create temporary table launch_synced_emails (
     email text primary key
   );

   \copy launch_synced_emails(email) from 'launch-synced-emails.csv' with csv header;

   update public.waitlist_subscribers as subscriber
   set notified_at = now()
   from launch_synced_emails as synced
   where subscriber.email = synced.email
     and subscriber.notified_at is null;
   ```

Stamping from the exact synced CSV prevents newly joined subscribers from being marked as notified if they signed up after the Resend Segment was prepared.
