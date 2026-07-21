# Coffee Quest Landing Page

Landing page for Coffee Quest, a beginner-friendly coffee learning app focused on short lessons, mini-games, Coffee Cards, and visible progress.

## Stack

- React
- Vite
- Tailwind CSS v4
- Playwright visual snapshots

## Commands

```bash
pnpm install
pnpm dev
pnpm dev:vercel
pnpm env:check
pnpm build
pnpm lint
pnpm test
pnpm test:visual
pnpm lighthouse
```

## Environment

See [docs/environment-variables.md](docs/environment-variables.md) for the source of truth on local testing values, Vercel sensitive variables, and GitHub Actions secrets.

## Waitlist

The waitlist uses Vercel API routes, Supabase, Resend, and private Vercel Blob backups. See [docs/waitlist-setup.md](docs/waitlist-setup.md) for schema setup, local API testing, email preview/testing, backups, subscriber count checks, and launch email preparation.

## Visual regression

Playwright baselines live in `tests/playwright/landing-page.visual.spec.js-snapshots/`.

- Run `pnpm test:visual` to compare against current baselines.
- Run `pnpm test:visual:update` only when you intentionally accept visual changes.
- See [docs/ci-cd.md](docs/ci-cd.md) for CI gates, automatic Linux baseline
  regeneration, deployment ownership, credentials, and limitations.

## Performance audits

CI runs a report-only Lighthouse audit (`lighthouserc.json`) against the built `dist/` on every
PR; it never blocks merge. To run it locally:

- **Quick check (recommended on macOS):** `pnpm build && pnpm preview`, then open the printed URL
  in Chrome → DevTools → **Lighthouse** tab → *Analyze*. This drives your installed Chrome, so it
  is unaffected by the local Node architecture.
- **Full run (matches CI):** `pnpm lighthouse` (builds, then `lhci autorun`). On Apple Silicon the
  **shell** must be arm64 — Lighthouse refuses to launch Chrome from an x64 Node (it would translate
  Chrome through Rosetta). Note the `volta`/`pnpm` shims are universal binaries, so they run as
  whatever architecture the calling shell is; a terminal opened "using Rosetta" yields an x64 Node
  even though the pinned Node is arm64-capable. In the terminal you run from, check with
  `node -p process.arch`; if it prints `x64`, relaunch a native shell (`arch -arm64 zsh`, or uncheck
  *Open using Rosetta* on the terminal/IDE app) until it prints `arm64`, or just use the DevTools
  path above.

## Waitlist Maintenance

The scheduled `maintenance` workflow reads the full `waitlist_subscribers` table through the Supabase API and uploads a private Vercel Blob backup once per day. That database read also keeps the Supabase free-tier project active, so no separate keep-alive endpoint is used.

See [docs/waitlist-setup.md](docs/waitlist-setup.md#daily-backup-and-keep-alive) for the maintenance flow and [docs/environment-variables.md](docs/environment-variables.md#maintenance-workflow) for required secret names.
