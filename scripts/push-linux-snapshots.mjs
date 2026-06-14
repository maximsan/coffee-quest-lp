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
