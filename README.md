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
pnpm build
pnpm lint
pnpm test:visual
```

## Visual regression

Playwright baselines live in `tests/playwright/landing-page.visual.spec.js-snapshots/`.

- Run `pnpm test:visual` to compare against current baselines.
- Run `pnpm test:visual:update` only when you intentionally accept visual changes.
