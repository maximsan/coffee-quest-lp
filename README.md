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
pnpm test:visual
```

## Environment

See [ENVIRONMENT.md](ENVIRONMENT.md) for the source of truth on local testing values, Vercel sensitive variables, and GitHub Actions maintenance secrets.

## Visual regression

Playwright baselines live in `tests/playwright/landing-page.visual.spec.js-snapshots/`.

- Run `pnpm test:visual` to compare against current baselines.
- Run `pnpm test:visual:update` only when you intentionally accept visual changes.

## Waitlist Maintenance

The scheduled `maintenance` workflow reads the full `waitlist_subscribers` table through the Supabase API and uploads a private Vercel Blob backup once per day. That database read also keeps the Supabase free-tier project active, so no separate keep-alive endpoint is used.

See [ENVIRONMENT.md](ENVIRONMENT.md) for maintenance environment setup.
