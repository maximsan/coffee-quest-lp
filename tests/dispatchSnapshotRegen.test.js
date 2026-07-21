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
    PR_HEAD_SHA: "abc123",
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

  it("checks the PR head commit instead of the synthetic merge commit", async () => {
    let called = false;
    await dispatchSnapshotRegen({
      env: baseEnv,
      fetchImpl: async () => {
        called = true;
        return { ok: true, status: 204 };
      },
      readHeadSubject: (ref) =>
        ref === baseEnv.PR_HEAD_SHA
          ? "test: update Linux visual snapshots"
          : "Merge abc123 into main",
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
