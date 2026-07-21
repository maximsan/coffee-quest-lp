# CI/CD and visual baseline automation

## Pull request and main-branch checks

`.github/workflows/ci.yml` runs for every pull request and every push to `main`.
The blocking `check` job runs:

1. dependency installation with the pinned Node and pnpm versions;
2. a report-only dependency audit;
3. ESLint;
4. unit tests;
5. Playwright visual comparisons in the pinned Linux container; and
6. the production build.

Failed Playwright artifacts are retained for seven days. Lighthouse runs in a
separate report-only job, so audit or Lighthouse findings do not currently block
a merge.

The repository does not contain a deployment job. Preview and production
deployments are expected to come from the Vercel Git integration; `main` should
be configured as Vercel's production branch. Repository branch protection should
require the blocking CI check before `main` can be merged. Those hosted settings
cannot be verified from this checkout.

## Local visual workflow

The committed baselines are in
`tests/playwright/landing-page.visual.spec.js-snapshots/`:

- run `pnpm test:visual` to compare the page with the current macOS or Linux
  baselines;
- run `pnpm test:visual:update` only for an intentional visual change; and
- review every changed PNG before committing it.

## Automatic Linux baseline recovery

Linux rendering can differ from macOS. When the visual step fails, CI calls
`scripts/dispatch-snapshot-regen.mjs`, which dispatches
`.github/workflows/generate-linux-visual-snapshots.yml`.

- For a push to `main`, the workflow regenerates Linux PNGs and opens or updates
  `ci/update-linux-visual-snapshots` as a pull request to `main`.
- For a same-repository pull request, it pushes a
  `test: update Linux visual snapshots` commit to the pull request's source
  branch so CI can rerun.
- Fork pull requests are intentionally skipped because their CI token is
  read-only.
- Concurrent regeneration runs for the same target branch cancel the older run.
- The exact snapshot commit subject is a loop guard. On pull requests, the
  dispatcher reads the pull request head SHA rather than GitHub's synthetic
  merge commit.

Any visual-step failure triggers regeneration; the automation does not try to
distinguish a missing baseline from a genuine regression or a test failure.
Consequently, green CI after an automated update is not approval of the visual
change. The PNG diff in the pull request still requires human review.

The workflow must first exist on `main` before the automatic dispatch path can
accept its `target_ref` input. Until this feature is merged, use the manual
workflow only with the version of the inputs available on `main`.

## Credential boundary

CI dispatches the regeneration workflow with the repository-provided
`GITHUB_TOKEN` and the job-level `actions: write` permission.

The regeneration workflow separates generation from publication:

1. `generate` checks out the target branch with a read-only, non-persisted
   `GITHUB_TOKEN`, runs the visual update, and uploads only Linux PNGs.
2. `publish` downloads those PNGs, checks out executable automation from
   `main`, and uses `SNAPSHOTS_PR_TOKEN` only while creating the update pull
   request or pushing to the same-repository source branch.

This separation prevents feature-branch code and dependency lifecycle scripts
from receiving the write-capable personal access token.

`SNAPSHOTS_PR_TOKEN` must be a fine-grained token scoped to this repository with:

- Contents: read and write; and
- Pull requests: read and write.

A personal access token is used for publication because commits and pull
requests created with the normal `GITHUB_TOKEN` do not reliably start the next
CI run. Rotate the secret if publication starts returning authentication or
authorization errors.

## Maintenance

The automation currently assumes one visual spec and one Linux snapshot
directory. If either changes, update these locations together:

- the artifact path and `add-paths` in
  `.github/workflows/generate-linux-visual-snapshots.yml`;
- `SNAPSHOT_PATHSPEC` in `scripts/push-linux-snapshots.mjs`; and
- the Playwright snapshot directory itself.

Use the generated artifact and workflow logs to diagnose failures. A successful
generation with no PNG diff exits without creating a commit or pull request.
