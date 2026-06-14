# Plan 001: Auto-trigger Linux snapshot regeneration when CI's visual step fails

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` — unless a reviewer dispatched you and told you they
> maintain the index.
>
> **Drift check (run first)**:
> `git diff --stat 8254c2c..HEAD -- .github/workflows/ci.yml .github/workflows/generate-linux-visual-snapshots.yml`
> If either in-scope workflow file changed since this plan was written, compare
> the "Current state" excerpts below against the live files before editing; on a
> mismatch, treat it as a STOP condition. (The three new files in scope are
> created fresh, so they have no drift baseline.)

## Status

- **Priority**: P2
- **Effort**: M
- **Risk**: MED
- **Depends on**: none
- **Category**: dx
- **Planned at**: commit `8254c2c`, 2026-06-14

## Why this matters

Visual tests run on Linux in CI (`mcr.microsoft.com/playwright:v1.60.0-noble`),
but baselines are authored on macOS. When the committed `*-linux.png` baselines
are missing or stale, `pnpm test:visual` fails and the only fix today is to
**manually** open the "Generate Linux visual snapshots" workflow and click "Run
workflow". This plan closes that loop: when — and only when — CI's visual step
fails, CI automatically dispatches the generation workflow, which regenerates
the Linux baselines and gets them in front of a human as a reviewable change
(a PR to `main`, or a commit pushed back onto the failing feature branch). The
human still reviews the image diffs before anything merges, so a genuine visual
regression cannot be silently re-baselined — it just shows up as an obvious diff.

The non-trivial logic (deciding whether/what to dispatch, calling the GitHub
API, committing and pushing baselines) lives in **standalone `scripts/*.mjs`
files with unit tests**, exactly like the rest of this repo's automation — *not*
inline in YAML. That keeps it lintable (`pnpm lint`), testable (`pnpm test`),
and readable. The workflow files only wire steps together.

Two product decisions were made with the maintainer and are binding:

1. **Both PRs and pushes to `main`** trigger regeneration (not main-only).
2. **Any** visual-step failure triggers it (missing baseline *or* pixel
   mismatch) — the regenerate→review gate is the safety net, not log-parsing.

## Current state

### File A — `.github/workflows/ci.yml` (in full, as of `8254c2c`)

```yaml
name: CI

on:
  push:
    branches:
      - main
  pull_request:

jobs:
  check:
    runs-on: ubuntu-latest
    timeout-minutes: 30
    container:
      image: mcr.microsoft.com/playwright:v1.60.0-noble
      options: --ipc=host

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup
        uses: ./.github/actions/setup

      - name: Security audit
        continue-on-error: true
        run: pnpm audit

      - name: Lint
        run: pnpm lint

      - name: Test units and visual snapshots
        run: pnpm test && pnpm test:visual

      - name: Build
        run: pnpm build

      - name: Upload Playwright artifacts
        if: ${{ failure() }}
        uses: actions/upload-artifact@v4
        with:
          name: playwright-artifacts
          path: tests/playwright/.artifacts/
          retention-days: 7

  # Report-only performance/SEO/a11y audit of the built site. Never blocks merge.
  lighthouse:
    runs-on: ubuntu-latest
    timeout-minutes: 15

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup
        uses: ./.github/actions/setup

      - name: Run Lighthouse CI
        run: pnpm lighthouse
```

### File B — `.github/workflows/generate-linux-visual-snapshots.yml` (in full, as of `8254c2c`)

```yaml
name: Generate Linux visual snapshots

on:
  workflow_dispatch: {}

permissions:
  contents: write
  pull-requests: write

jobs:
  generate:
    runs-on: ubuntu-latest
    timeout-minutes: 30
    container:
      image: mcr.microsoft.com/playwright:v1.60.0-noble
      options: --ipc=host

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup
        uses: ./.github/actions/setup

      - name: Generate Linux visual snapshots
        run: pnpm test:visual:update

      - name: Upload Linux visual snapshots
        uses: actions/upload-artifact@v4
        with:
          name: linux-visual-snapshots
          path: tests/playwright/landing-page.visual.spec.js-snapshots/*-linux.png
          if-no-files-found: error
          retention-days: 7

      - name: Create or update snapshots PR
        uses: peter-evans/create-pull-request@v7
        with:
          token: ${{ secrets.SNAPSHOTS_PR_TOKEN }}
          add-paths: tests/playwright/landing-page.visual.spec.js-snapshots/*-linux.png
          base: main
          branch: ci/update-linux-visual-snapshots
          delete-branch: true
          commit-message: "test: update Linux visual snapshots"
          title: "test: update Linux visual snapshots"
          body: |
            Automated update of the Linux Playwright visual baselines, generated by the
            "Generate Linux visual snapshots" workflow (`pnpm test:visual:update`).

            Review the changed `*-linux.png` image diffs in the Files tab and merge if they
            look correct. CI runs on this PR because it is opened with a PAT.
```

### Repo conventions to match (read these exemplars)

- **`scripts/*.mjs` is where automation lives.** `package.json` has
  `"type": "module"`; scripts are ES-module `.mjs`. See
  `scripts/prune-waitlist-backups.mjs` (top-level `main().catch(...)` /
  `process.exitCode = 1` style, `console.log`/`console.error` for output) and
  `scripts/validate-env.mjs` (env reading, `process.exit(1)` on failure).
- **Testable logic uses dependency injection.** `api/count.js` exports a factory
  `createCountHandler({ env, createClientImpl })` so tests inject fakes. Mirror
  this: export pure functions + an orchestrator that takes injectable `fetch`,
  `readHeadSubject`, `logger`. See `tests/countApi.test.js` for the exact test
  style: `import { describe, it } from "node:test"`,
  `import assert from "node:assert/strict"`, hand-rolled stubs, no test
  framework beyond Node's built-in runner.
- **Lint & test already cover new files.** `eslint.config.js` (lines 29-36)
  applies to `tests/**/*.test.js` and `scripts/**/*.mjs` with Node globals, so
  `pnpm lint` lints the new scripts/test. `package.json`'s
  `test` = `node --test "tests/**/*.test.js"`, so a new `tests/*.test.js` runs
  automatically under `pnpm test`. **These are the real correctness gates** — a
  YAML parse only proves the workflows are well-formed.
- **Action pinning**: actions are pinned to their own current major
  (`actions/checkout@v4`, `actions/upload-artifact@v4`, `peter-evans/...@v7`,
  `actions/setup-node@v6`). The PR step (`peter-evans/create-pull-request@v7`)
  is a third-party action configured via YAML — that's idiomatic and stays.
- **Conventional Commits** for commit/PR titles (`feat:`, `chore:`, `ci:`,
  `test:`). Never add an AI-agent co-author/trailer to any commit; the CI bot
  identity `github-actions[bot]` used below is standard, not an AI attribution.

### Established facts the executor must rely on (do not re-derive)

- **The only visual spec** is `tests/playwright/landing-page.visual.spec.js`; its
  baselines live in `tests/playwright/landing-page.visual.spec.js-snapshots/` and
  the Linux ones end in `-linux.png`. The pathspec
  `tests/playwright/landing-page.visual.spec.js-snapshots/*-linux.png` is correct
  and intentional — keep it exact.
- **`SNAPSHOTS_PR_TOKEN`** is an existing Actions secret (a fine-grained PAT with
  Contents: write + Pull requests: write on this repo). It is what lets the PR /
  the pushed commit **trigger CI** — a `GITHUB_TOKEN`-authored push or PR does
  not. Do not replace it with `GITHUB_TOKEN`.
- **`GITHUB_TOKEN` *can* trigger a `workflow_dispatch`.** GitHub's
  recursion-prevention has a documented **exception for `workflow_dispatch` and
  `repository_dispatch`**, so `ci.yml` can dispatch the generate workflow with
  `GITHUB_TOKEN`, provided the job has `actions: write`. No PAT needed for the
  dispatch itself.
- **Dispatch via REST, not `gh`.** `gh` is not guaranteed in the Playwright
  container, so the dispatch script calls the REST API with `fetch` (global in
  Node 26). The `Setup` step runs before any script step, so `node` and the repo
  files are present when the scripts run.
- **A `workflow_dispatch` run executes the workflow file from the *dispatched
  ref*.** The dispatch always uses `ref: 'main'` and passes the branch to operate
  on as an **input** (`target_ref`). That keeps `main`'s copy of
  `generate-linux-visual-snapshots.yml` the single source of truth and avoids
  dispatching against a feature branch whose copy of the file may lack the new
  input (which would error with "Unexpected inputs provided").
- **The CI container runs as root**, so any `git` invocation needs
  `git config --global --add safe.directory "$GITHUB_WORKSPACE"` first (the
  scripts below do this). Without it git aborts with "detected dubious ownership".

## Commands you will need

| Purpose | Command | Expected on success |
|---------|---------|---------------------|
| Install | `pnpm install --frozen-lockfile` | exit 0 |
| Lint (covers new scripts + test) | `pnpm lint` | exit 0, no errors |
| Unit tests (runs the new test file) | `pnpm test` | all pass (exit 0) |
| Run only the new test | `node --test tests/dispatchSnapshotRegen.test.js` | all pass |
| Visual snapshots | `pnpm test:visual` | all pass (see flake note) |
| YAML well-formedness | `python3 -c "import yaml,sys; [yaml.safe_load(open(f)) for f in sys.argv[1:]]" .github/workflows/ci.yml .github/workflows/generate-linux-visual-snapshots.yml` | exit 0, no output |

Notes for the executor's fresh worktree:

- Run `pnpm install --frozen-lockfile` first (a fresh worktree has no
  `node_modules`). Node is pinned to `26.3.0` (`.nvmrc`); pnpm is `11.5.2`.
- `actionlint` is optional and likely absent; **do not install Go tooling**. The
  workflows here are thin wiring, so the Python YAML parse is sufficient for
  them. The logic's correctness is covered by `pnpm test` and `pnpm lint`.
- **`grep` matching**: this environment's `grep` may be ugrep, which treats
  patterns as regexes (`$`, `(`, `|` are special). For any literal-string check,
  use `grep -F`; the anchored `^permissions:` checks intentionally use `-E`.
- **Visual-test flake**: `desktop-chromium › captures full-page snapshot` can
  intermittently fail with "Failed to take two consecutive stable screenshots"
  (animated hero). Pre-existing, unrelated to this change. If `pnpm test:visual`
  fails *only* on that test, re-run once; any other failure → STOP.

## Scope

**In scope** (the only files you may create or modify):
- `.github/workflows/ci.yml` (modify)
- `.github/workflows/generate-linux-visual-snapshots.yml` (modify)
- `scripts/dispatch-snapshot-regen.mjs` (create)
- `scripts/push-linux-snapshots.mjs` (create)
- `tests/dispatchSnapshotRegen.test.js` (create)
- `plans/README.md` (status row only — and only if no reviewer told you they own
  the index)

**Out of scope** (do NOT touch, even though they look related):
- `.github/workflows/maintenance.yml`, `.github/actions/setup/action.yml`,
  `eslint.config.js`, `package.json`, `vercel.json`.
- `tests/playwright/landing-page.visual.spec.js` and **any `*.png` snapshot** —
  never hand-edit or regenerate baselines locally. Do **not** run
  `pnpm test:visual:update`.
- Any `src/` / app code.
- The `SNAPSHOTS_PR_TOKEN` secret and any other repo/Actions setting — already
  provisioned; do not attempt to create, read, or rotate it.

## Git workflow

- Branch: you are running in an isolated worktree; commit on the branch you were
  given. Do **not** push and do **not** open a PR.
- One commit for the whole change is fine; message style is Conventional
  Commits, e.g. `ci: auto-trigger Linux snapshot regeneration on visual failure`
  (matches `git log`: `ci: auto-open a PR with updated Linux visual snapshots`).
- Never add an AI co-author or `Co-authored-by` trailer naming an AI agent.

## Steps

### Step 1: Restructure `ci.yml` — split the test step, add a least-privilege permissions block

In `.github/workflows/ci.yml`:

1. Add a **top-level** `permissions` block between the `on:` block and `jobs:`.
   It must be at **column 0** — a top-level key like `on:` and `jobs:`, with
   `permissions:` in the first character of the line and `contents:` indented
   2 spaces. **Do NOT indent it under `on:`**: nesting it there is still valid
   YAML (no parser catches it), but Actions silently ignores `on.permissions` and
   the `lighthouse` job loses `contents: read`. Place it right before `jobs:`:
   ```yaml
   permissions:
     contents: read
   ```
2. Give the **`check` job** its own `permissions` block (it dispatches a
   workflow). Insert it as a key of the `check` job, right after
   `timeout-minutes: 30` and before `container:`. **Indentation is exact**:
   `permissions:` is indented **4 spaces** (same column as `runs-on:`); its
   children `contents:`/`actions:` are indented **6 spaces**:
   ```yaml
     check:
       runs-on: ubuntu-latest
       timeout-minutes: 30
       permissions:
         contents: read
         actions: write
       container:
   ```
   (A job-level `permissions` block *replaces* the top-level one for that job, so
   it must list `contents: read` too. `lighthouse` needs no write permission and
   inherits the top-level `contents: read`. There is no blank line between
   `timeout-minutes: 30` and `container:` in the live file.)
3. Replace the single step
   ```yaml
         - name: Test units and visual snapshots
           run: pnpm test && pnpm test:visual
   ```
   with two steps (same order, same gating — units first, visual only if units
   pass), giving the visual step an `id`:
   ```yaml
         - name: Test units
           run: pnpm test

         - name: Visual snapshots
           id: visual
           run: pnpm test:visual
   ```

**Verify**: `grep -c "id: visual" .github/workflows/ci.yml` → `1`;
`grep -c "actions: write" .github/workflows/ci.yml` → `1`;
`grep -cE '^permissions:' .github/workflows/ci.yml` → `1` (top-level at column 0 —
if `0`, you mis-nested it under `on:`; fix before continuing);
`grep -cE '^    permissions:' .github/workflows/ci.yml` → `1` (job-level, 4-space
indent). YAML parse → exit 0.

### Step 2: Create the dispatch script `scripts/dispatch-snapshot-regen.mjs`

Create `scripts/dispatch-snapshot-regen.mjs` with **exactly** this content:

```js
/**
 * Dispatches the "Generate Linux visual snapshots" workflow when CI's visual
 * step has failed, so the Linux baselines are regenerated and surfaced for human
 * review (a PR to main, or a commit pushed back onto the failing branch).
 *
 * Invoked by .github/workflows/ci.yml. Inputs come from environment variables
 * (GitHub default vars plus PR_HEAD_REF / PR_HEAD_REPO_FORK passed by the
 * workflow). The GitHub REST API is called directly with fetch, so no `gh` CLI
 * or extra action is required. The decision logic is exported in small, pure
 * pieces for unit testing (tests/dispatchSnapshotRegen.test.js); the orchestrator
 * takes injectable fetch / readHeadSubject / logger. Running directly never
 * throws — a dispatch failure must not mask the visual failure that triggered it.
 */
import { realpathSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const SNAPSHOT_COMMIT_SUBJECT = "test: update Linux visual snapshots";
const GENERATE_WORKFLOW_FILE = "generate-linux-visual-snapshots.yml";

/** Branch the regeneration acts on: the PR's head branch, or the pushed branch. */
export function resolveTargetRef({ eventName, prHeadRef, pushRefName }) {
  return eventName === "pull_request" ? prHeadRef : pushRefName;
}

/** Skip fork PRs (read-only token) and the loop case (HEAD already regenerated). */
export function shouldDispatch({ headSubject, isFork }) {
  if (isFork) return false;
  if (headSubject === SNAPSHOT_COMMIT_SUBJECT) return false;
  return true;
}

/** REST request (url + JSON body) that dispatches the generate workflow on main. */
export function buildDispatchRequest({ apiBaseUrl, repository, targetRef }) {
  return {
    url: `${apiBaseUrl}/repos/${repository}/actions/workflows/${GENERATE_WORKFLOW_FILE}/dispatches`,
    body: { ref: "main", inputs: { target_ref: targetRef } },
  };
}

function defaultReadHeadSubject() {
  execFileSync("git", [
    "config",
    "--global",
    "--add",
    "safe.directory",
    process.env.GITHUB_WORKSPACE ?? "",
  ]);
  return execFileSync("git", ["log", "-1", "--pretty=%s"], {
    encoding: "utf8",
  }).trim();
}

export async function dispatchSnapshotRegen({
  env = process.env,
  fetchImpl = fetch,
  readHeadSubject = defaultReadHeadSubject,
  logger = console,
} = {}) {
  const targetRef = resolveTargetRef({
    eventName: env.GITHUB_EVENT_NAME,
    prHeadRef: env.PR_HEAD_REF,
    pushRefName: env.GITHUB_REF_NAME,
  });

  const isFork = env.PR_HEAD_REPO_FORK === "true";
  const headSubject = readHeadSubject();

  if (!shouldDispatch({ headSubject, isFork })) {
    logger.log(`Not dispatching snapshot regeneration for "${targetRef}".`);
    return false;
  }

  const { url, body } = buildDispatchRequest({
    apiBaseUrl: env.GITHUB_API_URL ?? "https://api.github.com",
    repository: env.GITHUB_REPOSITORY,
    targetRef,
  });

  const response = await fetchImpl(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.GITHUB_TOKEN}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    logger.warn(
      `Could not dispatch snapshot regeneration (HTTP ${response.status}).`,
    );
    return false;
  }

  logger.log(`Dispatched snapshot regeneration for "${targetRef}".`);
  return true;
}

function isDirectRun() {
  try {
    return realpathSync(process.argv[1]) === fileURLToPath(import.meta.url);
  } catch {
    return false;
  }
}

if (isDirectRun()) {
  dispatchSnapshotRegen().catch((error) => {
    // Best-effort: never fail the (already-red) CI step on a dispatch error.
    console.warn(`Snapshot regeneration dispatch errored: ${error.message}`);
  });
}
```

**Verify**: `node --check scripts/dispatch-snapshot-regen.mjs` → exit 0;
`pnpm lint` → exit 0.

### Step 3: Create the unit test `tests/dispatchSnapshotRegen.test.js`

Model it on `tests/countApi.test.js` (Node's built-in runner, injected fakes).
Create `tests/dispatchSnapshotRegen.test.js` with **exactly** this content:

```js
import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  resolveTargetRef,
  shouldDispatch,
  buildDispatchRequest,
  dispatchSnapshotRegen,
} from "../scripts/dispatch-snapshot-regen.mjs";

describe("resolveTargetRef", () => {
  it("uses the PR head branch for pull_request events", () => {
    assert.equal(
      resolveTargetRef({
        eventName: "pull_request",
        prHeadRef: "feat/hero",
        pushRefName: "main",
      }),
      "feat/hero",
    );
  });

  it("uses the pushed branch for push events", () => {
    assert.equal(
      resolveTargetRef({ eventName: "push", prHeadRef: "", pushRefName: "main" }),
      "main",
    );
  });
});

describe("shouldDispatch", () => {
  it("dispatches for a normal failing branch", () => {
    assert.equal(
      shouldDispatch({ headSubject: "feat: add hero", isFork: false }),
      true,
    );
  });

  it("skips fork PRs (read-only token)", () => {
    assert.equal(
      shouldDispatch({ headSubject: "feat: add hero", isFork: true }),
      false,
    );
  });

  it("skips when HEAD is already a snapshot commit (loop guard)", () => {
    assert.equal(
      shouldDispatch({
        headSubject: "test: update Linux visual snapshots",
        isFork: false,
      }),
      false,
    );
  });
});

describe("buildDispatchRequest", () => {
  it("targets the generate workflow on main with the target_ref input", () => {
    const { url, body } = buildDispatchRequest({
      apiBaseUrl: "https://api.github.com",
      repository: "owner/repo",
      targetRef: "feat/hero",
    });

    assert.equal(
      url,
      "https://api.github.com/repos/owner/repo/actions/workflows/generate-linux-visual-snapshots.yml/dispatches",
    );
    assert.deepEqual(body, { ref: "main", inputs: { target_ref: "feat/hero" } });
  });
});

describe("dispatchSnapshotRegen", () => {
  const baseEnv = {
    GITHUB_EVENT_NAME: "pull_request",
    PR_HEAD_REF: "feat/hero",
    PR_HEAD_REPO_FORK: "false",
    GITHUB_REF_NAME: "feat/hero",
    GITHUB_API_URL: "https://api.github.com",
    GITHUB_REPOSITORY: "owner/repo",
    GITHUB_TOKEN: "test-token",
  };

  const silentLogger = { log() {}, warn() {} };

  it("POSTs a dispatch and returns true on success", async () => {
    const calls = [];
    const fetchImpl = async (url, options) => {
      calls.push({ url, options });
      return { ok: true, status: 204 };
    };

    const result = await dispatchSnapshotRegen({
      env: baseEnv,
      fetchImpl,
      readHeadSubject: () => "feat: add hero",
      logger: silentLogger,
    });

    assert.equal(result, true);
    assert.equal(calls.length, 1);
    assert.equal(calls[0].options.method, "POST");
    assert.deepEqual(JSON.parse(calls[0].options.body), {
      ref: "main",
      inputs: { target_ref: "feat/hero" },
    });
  });

  it("does not POST for fork PRs", async () => {
    let called = false;
    await dispatchSnapshotRegen({
      env: { ...baseEnv, PR_HEAD_REPO_FORK: "true" },
      fetchImpl: async () => {
        called = true;
        return { ok: true, status: 204 };
      },
      readHeadSubject: () => "feat: add hero",
      logger: silentLogger,
    });

    assert.equal(called, false);
  });

  it("does not POST when HEAD is already a snapshot commit", async () => {
    let called = false;
    await dispatchSnapshotRegen({
      env: baseEnv,
      fetchImpl: async () => {
        called = true;
        return { ok: true, status: 204 };
      },
      readHeadSubject: () => "test: update Linux visual snapshots",
      logger: silentLogger,
    });

    assert.equal(called, false);
  });

  it("returns false and warns on a non-ok response", async () => {
    const warnings = [];
    const result = await dispatchSnapshotRegen({
      env: baseEnv,
      fetchImpl: async () => ({ ok: false, status: 403 }),
      readHeadSubject: () => "feat: add hero",
      logger: { log() {}, warn: (message) => warnings.push(message) },
    });

    assert.equal(result, false);
    assert.equal(warnings.length, 1);
  });
});
```

**Verify**: `node --test tests/dispatchSnapshotRegen.test.js` → all pass (4
suites, 10 tests); `pnpm test` → all pass (existing tests + these). `pnpm lint`
→ exit 0.

### Step 4: Wire the dispatch step into `ci.yml`

Append this single step **after** the existing `Upload Playwright artifacts`
step (still inside the `check` job's `steps:`):

```yaml
      - name: Auto-trigger Linux snapshot regeneration
        if: ${{ failure() && steps.visual.outcome == 'failure' }}
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          PR_HEAD_REF: ${{ github.event.pull_request.head.ref }}
          PR_HEAD_REPO_FORK: ${{ github.event.pull_request.head.repo.fork }}
        run: node scripts/dispatch-snapshot-regen.mjs
```

Notes (do not change):
- `if: failure() && steps.visual.outcome == 'failure'` fires only when the
  **visual** step is what failed (if `pnpm test` units fail first, the visual
  step is skipped, so its `outcome` is not `'failure'` and this step won't run).
- `GITHUB_EVENT_NAME`, `GITHUB_REF_NAME`, `GITHUB_REPOSITORY`, `GITHUB_API_URL`,
  `GITHUB_WORKSPACE` are GitHub default env vars — the script reads them directly;
  only the token and PR-head fields need passing. The fork skip and loop guard
  live in the (tested) script, which is why they are not in the `if:`.

**Verify**: `grep -c "node scripts/dispatch-snapshot-regen.mjs" .github/workflows/ci.yml`
→ `1`; `grep -c "steps.visual.outcome" .github/workflows/ci.yml` → `1`. YAML parse
→ exit 0.

### Step 5: Parameterize `generate-linux-visual-snapshots.yml` with a `target_ref` input + concurrency

In `.github/workflows/generate-linux-visual-snapshots.yml`:

1. Replace the trigger
   ```yaml
   on:
     workflow_dispatch: {}
   ```
   with:
   ```yaml
   on:
     workflow_dispatch:
       inputs:
         target_ref:
           description: "Branch to regenerate Linux snapshots on. 'main' (default) opens a PR; any other branch pushes the new baselines directly back to it."
           required: false
           default: main
   ```
2. Add a `concurrency` block after the `permissions` block and before `jobs:`:
   ```yaml
   concurrency:
     group: linux-snapshots-${{ github.event.inputs.target_ref || 'main' }}
     cancel-in-progress: true
   ```
3. Update the `Checkout` step to check out the requested branch and persist PAT
   credentials (so a later `git push` triggers CI):
   ```yaml
         - name: Checkout
           uses: actions/checkout@v4
           with:
             ref: ${{ github.event.inputs.target_ref || 'main' }}
             token: ${{ secrets.SNAPSHOTS_PR_TOKEN }}
             fetch-depth: 0
   ```

**Verify**: `grep -c "target_ref" .github/workflows/generate-linux-visual-snapshots.yml`
→ `>= 3`. YAML parse → exit 0.

### Step 6: Create the push-back script `scripts/push-linux-snapshots.mjs`

Create `scripts/push-linux-snapshots.mjs` with **exactly** this content:

```js
/**
 * Commits the regenerated Linux visual baselines and pushes them onto the branch
 * named by TARGET_REF, so that branch's PR re-runs CI against the new baselines.
 * Invoked by .github/workflows/generate-linux-visual-snapshots.yml for the
 * non-main (feature-branch) path. git is invoked via execFileSync with argument
 * arrays (no shell), so the branch name cannot inject shell commands.
 */
import { execFileSync, spawnSync } from "node:child_process";

const SNAPSHOT_PATHSPEC =
  "tests/playwright/landing-page.visual.spec.js-snapshots/*-linux.png";
const COMMIT_SUBJECT = "test: update Linux visual snapshots";

const targetRef = process.env.TARGET_REF;
if (!targetRef) {
  console.error("TARGET_REF is required.");
  process.exit(1);
}

const git = (...args) => execFileSync("git", args, { stdio: "inherit" });

git(
  "config",
  "--global",
  "--add",
  "safe.directory",
  process.env.GITHUB_WORKSPACE ?? "",
);
git("config", "user.name", "github-actions[bot]");
git("config", "user.email", "41898282+github-actions[bot]@users.noreply.github.com");
git("add", "-A", "--", SNAPSHOT_PATHSPEC);

const staged = spawnSync("git", ["diff", "--cached", "--quiet"]);
if (staged.status === 0) {
  console.log("No Linux snapshot changes to push.");
  process.exit(0);
}

git("commit", "-m", COMMIT_SUBJECT);
git("push", "origin", `HEAD:${targetRef}`);
```

**Verify**: `node --check scripts/push-linux-snapshots.mjs` → exit 0;
`pnpm lint` → exit 0.

### Step 7: Gate the PR step to `main` and wire the push-back step into `generate.yml`

Still in `.github/workflows/generate-linux-visual-snapshots.yml`:

1. Add an `if:` guard to the existing `Create or update snapshots PR` step so it
   runs **only** when regenerating against `main` (its `base: main` /
   `branch: ci/update-linux-visual-snapshots` design only fits there). Insert the
   `if:` line directly under the `name:`, leaving every other key unchanged:
   ```yaml
         - name: Create or update snapshots PR
           if: ${{ (github.event.inputs.target_ref || 'main') == 'main' }}
           uses: peter-evans/create-pull-request@v7
           with:
             # ...everything else unchanged...
   ```
2. Append a new **last** step that handles the non-`main` branch case:
   ```yaml
         - name: Push snapshots to the source branch
           if: ${{ (github.event.inputs.target_ref || 'main') != 'main' }}
           env:
             TARGET_REF: ${{ github.event.inputs.target_ref }}
           run: node scripts/push-linux-snapshots.mjs
   ```

**Verify**: `grep -c "node scripts/push-linux-snapshots.mjs" .github/workflows/generate-linux-visual-snapshots.yml`
→ `1`; `grep -cF "(github.event.inputs.target_ref || 'main')" .github/workflows/generate-linux-visual-snapshots.yml`
→ `2` (the PR step's `if:` and the push step's `if:`). **Use `grep -F`** — a
pattern with `(` / `|` is otherwise read as a regex and mis-counts. YAML parse →
exit 0.

### Step 8: Confirm the change is inert to the existing visual suite

Run, in order, and confirm each passes:
- `pnpm lint`
- `pnpm test` (includes the new `dispatchSnapshotRegen` tests)
- `pnpm test:visual` (heed the flake note — re-run once only if it fails on the
  full-page hero screenshot; STOP on any other failure)

The workflow/script edits are CI-only and must not change a single rendered pixel.

## Test plan

- **New unit tests** in `tests/dispatchSnapshotRegen.test.js` (Step 3), modeled
  on `tests/countApi.test.js`, covering: ref resolution (PR vs push), the fork
  skip, the loop-guard skip, the dispatch request shape, a successful POST, and a
  non-ok response (warns, returns false, no throw). The token value is never
  logged or asserted on.
- **No tests for `push-linux-snapshots.mjs`**: it is linear git plumbing with one
  no-diff guard and no branching logic worth unit-testing; `node --check` +
  `pnpm lint` cover it, and the end-to-end push is exercised in the maintainer's
  post-merge verification.
- **Pattern to follow**: `tests/countApi.test.js` — `node:test` `describe`/`it`,
  `node:assert/strict`, hand-rolled fakes passed via the function's injectable
  parameters. No new test dependencies.
- **Verification**: `pnpm test` → all pass, including the new test file (`node
  --test tests/dispatchSnapshotRegen.test.js` → 10 tests pass).

## Done criteria

Machine-checkable. ALL must hold (run from repo root):

- [ ] `pnpm lint` exits 0
- [ ] `pnpm test` exits 0; `node --test tests/dispatchSnapshotRegen.test.js` → all pass
- [ ] `node --check scripts/dispatch-snapshot-regen.mjs` exits 0
- [ ] `node --check scripts/push-linux-snapshots.mjs` exits 0
- [ ] `pnpm test:visual` passes (the hero full-page test may need one re-run)
- [ ] `python3 -c "import yaml,sys; [yaml.safe_load(open(f)) for f in sys.argv[1:]]" .github/workflows/ci.yml .github/workflows/generate-linux-visual-snapshots.yml` exits 0
- [ ] `grep -c "id: visual" .github/workflows/ci.yml` → `1`
- [ ] `grep -c "actions: write" .github/workflows/ci.yml` → `1`
- [ ] `grep -cE '^permissions:' .github/workflows/ci.yml` → `1` (top-level, not nested under `on:`)
- [ ] `grep -cE '^    permissions:' .github/workflows/ci.yml` → `1` (job-level, 4-space indent)
- [ ] `grep -c "node scripts/dispatch-snapshot-regen.mjs" .github/workflows/ci.yml` → `1`
- [ ] `grep -c "target_ref" .github/workflows/generate-linux-visual-snapshots.yml` → `>= 3`
- [ ] `grep -c "node scripts/push-linux-snapshots.mjs" .github/workflows/generate-linux-visual-snapshots.yml` → `1`
- [ ] `git status --porcelain` lists only the six in-scope files — **no** `*.png`, no other `src/`/test files
- [ ] `plans/README.md` status row for 001 updated (unless a reviewer owns it)

## STOP conditions

Stop and report back (do not improvise) if:

- The drift check shows either workflow file changed since `8254c2c` and the live
  content no longer matches the "Current state" excerpts.
- `pnpm test:visual` fails on any test **other than** the known full-page hero
  flake, or the hero test still fails after one re-run.
- `pnpm lint` or `pnpm test` fails in a way the plan's exact file contents don't
  explain (e.g. the eslint flat config rejects an `.mjs` construct) — do not
  rewrite the scripts to chase a green; report the exact error.
- Satisfying a step appears to require editing a file outside the In-scope list
  (e.g. `eslint.config.js`, `package.json`, app code, or a snapshot PNG).
- `tests/playwright/landing-page.visual.spec.js-snapshots/` is no longer where
  `*-linux.png` baselines live, or the spec filename changed — the hard-coded
  pathspec in the scripts/workflows would then be wrong.

## Maintenance notes

For the human/agent who owns this after it lands:

- **First real exercise is post-merge.** `ci.yml` dispatches with `ref: 'main'`
  and a `target_ref` **input**, so the parameterized
  `generate-linux-visual-snapshots.yml` (Steps 5/7) must be on `main` before the
  input is accepted (otherwise "Unexpected inputs provided"). The dispatch script
  treats any error as a warning, so a pre-merge failure won't break CI further —
  but the loop only works end-to-end once this is on `main`.
- **E2E verification (maintainer, after merge to `main`):**
  1. *Main path* — push a commit to `main` that leaves a Linux baseline stale (or
     delete one `*-linux.png`); confirm CI's `Visual snapshots` step goes red, the
     generate workflow auto-runs, and a PR `ci/update-linux-visual-snapshots →
     main` opens with only `*-linux.png` changes and its own CI green.
  2. *PR path* — open a same-repo PR whose visual output differs; confirm CI fails
     on the visual step, the generate workflow auto-runs with `target_ref` = the
     PR branch, a `test: update Linux visual snapshots` commit is pushed onto that
     branch, and the PR's CI re-runs green.
  3. *Loop guard* — confirm a still-failing visual step on the auto-pushed commit
     does **not** dispatch again (HEAD subject matches the guard string).
- **Loop guard keys on the commit *subject*** `test: update Linux visual
  snapshots`. The PR-branch path is fully covered. On the `main` path, if the
  snapshot PR is merged with a non-squash **merge commit**, `main`'s HEAD subject
  won't match, so a still-failing visual step could dispatch once more —
  squash-merging avoids this. Low-risk edge, not a true loop (each dispatch needs
  a fresh failing push).
- **Known limitations / deferred:** fork PRs are intentionally not auto-handled
  (read-only token; the script skips them). If the hero full-page snapshot should
  stop flaking, stabilize that test separately — out of scope here. If a second
  visual spec / snapshot directory is added, update `SNAPSHOT_PATHSPEC` in
  `push-linux-snapshots.mjs`, the `add-paths` in the PR step, and the
  `upload-artifact` `path` together.
- **Token / scope dependencies:** `SNAPSHOTS_PR_TOKEN` (Contents + PRs write)
  drives the PR and the push-back; a `403` there means it expired — rotate it.
  The dispatch uses `GITHUB_TOKEN` with job `actions: write`; if org policy ever
  blocks `GITHUB_TOKEN` from creating `workflow_dispatch` runs, add **Actions:
  write** to `SNAPSHOTS_PR_TOKEN` and set `GITHUB_TOKEN: ${{ secrets.SNAPSHOTS_PR_TOKEN }}`
  on the dispatch step — do not weaken the script's guards.
- **Review focus:** the dispatch logic is unit-tested, so review the *wiring* —
  that the `if:` on the dispatch step is `failure() && steps.visual.outcome ==
  'failure'`, that the PR step is gated to `main`, and that the env vars passed
  to each script are spelled exactly as the scripts read them.
