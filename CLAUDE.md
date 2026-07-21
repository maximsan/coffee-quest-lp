# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Single-page marketing/landing site for **Coffee Quest** (a coffee-learning app), plus a small waitlist backend. Frontend is React 19 + Vite + Tailwind v4. Backend is Vercel serverless functions (`api/`) backed by Supabase, with Resend for transactional email and Vercel Blob for backups. Package manager is **pnpm**.

## Commands

```bash
pnpm dev               # Vite only — frontend work; does NOT serve api/ routes
pnpm dev:vercel        # Vercel local server (usually :3000) — required to exercise api/waitlist.js and api/count.js
pnpm build             # Vite production build to dist/
pnpm lint              # ESLint
pnpm env:check         # Validate app-scope env vars (see scopes below)
pnpm test              # Node test runner — all tests/*.test.js (API handlers + email builder)
pnpm test:email        # Subset: just the confirmation-email builder tests
pnpm test:visual       # Playwright visual snapshots
pnpm test:visual:update  # Re-baseline snapshots — only when a visual change is intentional
pnpm lighthouse        # Build + report-only Lighthouse audit of dist/ (needs arm64 Node locally)
```

Run a single Playwright spec/grep: `pnpm exec playwright test --config tests/playwright/playwright.config.js -g "hero"`.

CI (`.github/workflows/ci.yml`): the blocking `check` job runs audit (report-only) → lint → unit tests → Playwright visual comparisons → build on Node 26; a separate, non-blocking `lighthouse` job audits `dist/`. A failed visual step dispatches the two-job Linux baseline workflow: unprivileged generation, then trusted publication. Vercel Git integration owns deployment; GitHub Actions does not deploy. See `docs/ci-cd.md`. Dependabot (`.github/dependabot.yml`) opens weekly grouped dependency PRs.

## Architecture

### Frontend
- `src/main.jsx` → `src/App.jsx`: React Router with a single `/` route (`LandingPage`); everything else redirects to `/`. The whole site is one page. `vercel.json` rewrites all paths to `index.html` for SPA routing.
- `src/pages/LandingPage.jsx` composes section components from `src/components/sections/`. Smaller reusable visuals live under `src/components/{previews,tree,layout,forms,shared}/`.
- Landing copy and structured content live in `src/data/content.js` — extract repeated/structured copy there rather than inlining it.
- `src/utils/theme.js` centralizes theme variants (forest-dark / dark / light); `src/utils/cx.js` is the classname helper.

### Backend (Vercel functions in `api/`)
- `api/waitlist.js` — POST-only signup. Enforces JSON content-type, in-memory per-IP sliding-window rate limit (resets on cold start), a `company_url` honeypot (fake success, no write), email validation, then upserts into Supabase `waitlist_subscribers` with `ignoreDuplicates`. On a genuinely new row it fires `sendWaitlistConfirmationEmail`.
- `api/count.js` — Bearer-token-protected (`COUNT_API_TOKEN`) count of subscribers. Exported as a factory (`createCountHandler`) with injectable env/client for testing.
- `api/lib/waitlistConfirmationEmail.js` builds the email (subject/text/html); `api/lib/sendWaitlistConfirmationEmail.js` sends via Resend. The sender **never throws** — it logs and no-ops if `RESEND_API_KEY`/`WAITLIST_FROM_EMAIL`/`PUBLIC_SITE_URL` are missing, so signups still succeed without email configured.

### Maintenance (GitHub Actions + scripts)
- `.github/workflows/maintenance.yml` runs daily: validates maintenance env, runs `scripts/backup-waitlist-to-blob.mjs` (paginated CSV dump of `waitlist_subscribers` to a **private** Vercel Blob), then `scripts/prune-waitlist-backups.mjs`. This daily Supabase read doubles as the free-tier keep-alive — there is no separate keep-alive endpoint.

### Scripts & env loading
- `scripts/lib/loadLocalEnv.mjs` loads local env files in order `.env` → `.env.local` → `.env.private.local`, and **never overrides** already-set vars (shell wins; `.env.private.local` wins over `.env.local`). Hand-maintained secrets go in `.env.private.local` because `vercel env pull` can rewrite `.env.local`.
- `scripts/validate-env.mjs` checks required vars by `--scope`: `app` (default), `waitlist`, `count`, `maintenance`, `email`, `all`. Pass `--no-dotenv` in CI/Actions where env comes from secrets.

## Conventions (from AGENTS.md)

- Treat visual output as behavior: don't incidentally change spacing, hierarchy, copy, or animation. Preserve the premium look unless a redesign is explicitly requested.
- Keep `data-testid` and other Playwright test hooks stable.
- After UI changes run `pnpm build`; after layout/style changes run `pnpm test:visual`; after editing confirmation-email copy run `pnpm test:email`.
- Commit Playwright baselines under `tests/playwright/*-snapshots/`.
- Comments: TSDoc format, only for complex or third-party-integration code (already the style in `api/lib/`).

## Environment variables

`docs/environment-variables.md` is the source of truth. Key points: Vercel **sensitive** vars are non-readable after creation — a `vercel env pull` may yield empty values; do not try to recover them, rotate/recreate at the provider instead. GitHub Actions maintenance secrets (`SUPABASE_URL`, `SUPABASE_SECRET_KEY`, `BLOB_READ_WRITE_TOKEN`) and snapshot publication token (`SNAPSHOTS_PR_TOKEN`) are stored separately as Actions secrets. Never commit `.env.local` / `.env.private.local`.
