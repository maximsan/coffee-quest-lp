# Environment Variables

This file is the source of truth for environment-variable setup, including local testing values.

Use `.env.private.local` for hand-maintained local secrets and keep real values out of git. Do not put hand-maintained secrets in `.env.local`: Vercel CLI commands such as `vercel env pull` can rewrite that file.

Local env files are loaded in this order:

1. `.env`
2. `.env.local`
3. `.env.private.local`

Shell-provided variables win over all files. `.env.private.local` wins over `.env.local`, so manually maintained local values survive even if Vercel rewrites `.env.local`.

Do not use `.env.local` for hand-maintained local secrets. If you need to inspect values pulled from Vercel, write them to a scratch file instead:

```bash
vercel env pull .env.vercel.local
```

Then copy only intentionally readable local or test values into `.env.private.local`. The scratch pull file is not the source of truth.

## Local application testing

Use this flow when you want to run the landing page and test the Vercel API routes on your machine.

1. Create the local private env file:

   ```bash
   cp .env.example .env.private.local
   ```

2. Fill the minimum values needed for the waitlist form and subscriber count API:

   ```env
   SUPABASE_URL="https://your-development-project.supabase.co"
   SUPABASE_SECRET_KEY="your-development-supabase-secret-key"
   COUNT_API_TOKEN="any-strong-random-local-token"
   ```

3. Check the app env:

   ```bash
   pnpm env:check
   ```

4. Link the local checkout to the Vercel project once, if `.vercel/project.json` does not already exist:

   ```bash
   pnpm dlx vercel@latest link
   ```

   This writes project metadata under `.vercel/`, which is gitignored. Do not run `vercel env pull` as part of this setup.

5. Start the app with Vercel's local server:

   ```bash
   pnpm dev:vercel
   ```

   Use the URL printed by the CLI, usually `http://localhost:3000`. `pnpm dev` starts Vite only, so it is fine for frontend-only work but it does not serve `api/waitlist.js` or `api/count.js`.

6. Submit the waitlist form in the browser, or smoke-test the API directly:

   ```bash
   curl -s -X POST http://localhost:3000/api/waitlist \
     -H "Content-Type: application/json" \
     -d '{"email":"you@example.com"}'

   curl -s http://localhost:3000/api/count \
     -H "Authorization: Bearer your-local-count-token"
   ```

   Leave `company_url` unset or empty when testing a real signup. A non-empty `company_url` is the honeypot field and returns a fake success without writing to Supabase.

`RESEND_API_KEY`, `WAITLIST_FROM_EMAIL`, and `PUBLIC_SITE_URL` are only needed when you want local signups to send real confirmation emails. `BLOB_READ_WRITE_TOKEN` is only needed when testing waitlist backup or prune scripts.

Separate local/test values are recommended because local testing can write waitlist rows, send emails, and create backup blobs. You do not need a separate provider account for every value if you intentionally test against production, but the value in `.env.private.local` still must be readable by you. For sensitive Vercel Production or Preview variables, get or recreate the value at the original provider, not from `vercel env pull`.

## Required variables

| Scope                      | Check command                | Required variables                                             |
| -------------------------- | ---------------------------- | -------------------------------------------------------------- |
| Vercel functions           | `pnpm env:check`             | `SUPABASE_URL`, `SUPABASE_SECRET_KEY`, `COUNT_API_TOKEN`       |
| Maintenance backup scripts | `pnpm env:check:maintenance` | `SUPABASE_URL`, `SUPABASE_SECRET_KEY`, `BLOB_READ_WRITE_TOKEN` |
| Confirmation email sending | `pnpm env:check:email`       | `RESEND_API_KEY`, `WAITLIST_FROM_EMAIL`, `PUBLIC_SITE_URL`     |

`RESEND_API_KEY`, `WAITLIST_FROM_EMAIL`, and `PUBLIC_SITE_URL` are only required when confirmation emails should be sent. Without them, signup still works and the email sender logs that it skipped the message.

Optional email variables:

- `PRIVACY_POLICY_URL`
- `EMAIL_LOGO_URL`

## Local testing values

Do not try to recover sensitive Production or Preview values from Vercel. For local testing, use values that are readable because you just created them, because they belong to a development provider resource, or because you intentionally put them in Vercel's Development environment.

| Variable                | Local testing value                                                                                                                                                                                                                                                                                                        |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `SUPABASE_URL`          | Use the URL of a development Supabase project. If you test against production intentionally, get the project URL from Supabase, not from an unreadable Vercel env value.                                                                                                                                                   |
| `SUPABASE_SECRET_KEY`   | Prefer a development Supabase secret key from the Supabase dashboard. If the production key is lost or unreadable, rotate it in Supabase and update every place that needs it.                                                                                                                                             |
| `COUNT_API_TOKEN`       | Generate any strong random local token. Use the same value in `.env.private.local` and in the `Authorization: Bearer ...` header when testing `/api/count`.                                                                                                                                                                |
| `BLOB_READ_WRITE_TOKEN` | Prefer a readable token from a separate development Blob store/project connection. Use the local Blob testing flow in [`waitlist-setup.md`](waitlist-setup.md). If the only token is an unreadable sensitive Production/Preview value, rotate or recreate the token/store and update Vercel, GitHub Actions, and `.env.private.local` when you create it. |
| `RESEND_API_KEY`        | Use a separate Resend development/test API key. Omit it when you want signups to work without sending confirmation emails.                                                                                                                                                                                                 |
| `WAITLIST_FROM_EMAIL`   | Use a verified local/test sender, such as Resend's test sender or a verified domain sender. Omit it when you want to skip confirmation emails.                                                                                                                                                                             |
| `PUBLIC_SITE_URL`       | Use the origin that should appear in confirmation email links. For local email previews, a placeholder or local URL is enough; for real sends, use a reachable HTTPS site URL.                                                                                                                                             |
| `PRIVACY_POLICY_URL`    | Optional. Use a reachable URL only when you want the email footer to include the privacy link.                                                                                                                                                                                                                             |
| `EMAIL_LOGO_URL`        | Optional. Use a reachable image URL, or set `none` to omit the HTML email logo.                                                                                                                                                                                                                                            |

## Vercel sensitive environment variables

Vercel Sensitive Environment Variables are non-readable after creation. This means a local env export may produce an empty value like:

```env
SUPABASE_SECRET_KEY=""
```

This is expected and does not mean the production value is empty.

In Vercel Production and Preview, the variable is injected automatically and can be accessed with:

```js
process.env.SUPABASE_SECRET_KEY;
```

For local development, write manual values to `.env.private.local`:

```env
SUPABASE_SECRET_KEY="local-or-test-secret"
```

If a Vercel CLI env export creates an empty value for a sensitive variable, do not try to recover that production value. Create or rotate a separate local/test value at the original provider, then write that value into `.env.private.local` manually. Do not depend on Vercel CLI exports to retrieve sensitive Production or Preview values.

Never commit `.env.private.local` or `.env.local`. Never log secret values. Never expose secrets with `NEXT_PUBLIC_` or any other browser-exposed prefix. If a secret is lost, rotate it at the original provider and update it in Vercel. After changing Vercel env variables, redeploy the project.

## GitHub Actions secrets

The GitHub Actions maintenance workflow cannot read sensitive production values back from Vercel. Store the required maintenance values as GitHub Actions secrets instead:

- `SUPABASE_URL`
- `SUPABASE_SECRET_KEY`
- `BLOB_READ_WRITE_TOKEN`

The workflow validates those names before running the backup scripts. It only prints variable names, never values.

Local maintenance runs use `.env.private.local`.

For waitlist backups, create a private Vercel Blob store connected to the Vercel project. See [`waitlist-setup.md`](waitlist-setup.md) for the Blob setup and backup commands.

Linux visual baseline publication also requires `SNAPSHOTS_PR_TOKEN`. Use a
fine-grained token scoped to this repository with Contents and Pull requests
read/write access. It is available only to the trusted publication job; the job
that runs target-branch code receives no repository secret. See
[`ci-cd.md`](ci-cd.md#credential-boundary) for the workflow and rotation notes.
