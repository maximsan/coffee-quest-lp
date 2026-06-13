# AGENTS.md

## Project shape

- This is a small React + Vite landing-page project.
- Keep page composition in `src/pages/` and section-level UI in `src/components/sections/`.
- Keep reusable preview/layout pieces in their existing folders instead of creating deep new abstractions by default.
- Keep landing-page content data in `src/data/**` when extracting repeated copy or structured content.

## Editing rules

- Preserve the current premium landing-page look unless the task explicitly asks for a redesign.
- Treat visual output as important behavior: avoid changing spacing, hierarchy, copy, or animation incidentally.
- Keep test hooks such as `data-testid` stable when they are used by Playwright snapshots.

## Validation

- Run `pnpm build` after meaningful UI changes.
- Run `pnpm lint` after code changes.
- Run `pnpm test:visual` for landing-page changes that can affect layout or styling.
- Run `pnpm test:visual:update` only when the new visual result is intentionally accepted.
- Run `pnpm test` to run all unit tests (API handlers and email templates) after backend or email changes.

## Playwright

- Playwright files live under `tests/playwright/`.
- Commit snapshot baselines in `tests/playwright/*-snapshots/`.
