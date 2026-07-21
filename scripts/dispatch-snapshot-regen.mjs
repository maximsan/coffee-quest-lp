/**
 * Best-effort dispatcher for Linux visual baseline regeneration.
 * A dispatch error is reported without masking the visual failure that invoked it.
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

function defaultReadHeadSubject(ref = "HEAD") {
  execFileSync("git", [
    "config",
    "--global",
    "--add",
    "safe.directory",
    process.env.GITHUB_WORKSPACE ?? "",
  ]);
  return execFileSync("git", ["log", "-1", "--pretty=%s", ref], {
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
  const headRef =
    env.GITHUB_EVENT_NAME === "pull_request" ? env.PR_HEAD_SHA : "HEAD";
  const headSubject = readHeadSubject(headRef || "HEAD");

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
