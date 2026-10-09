# M4 — Old/New Shadow Replay and Parity Protocol

**Scope:** Read-only, offline. Compare the same frozen observations against (a) the current legacy SD-018 inspector and (b) the new M2 offline engine. M4 must never schedule, spawn, alter task/grants, push or merge.

## Required replay implementation

```text
scripts/icm-next/
  shadow-replay.mjs        # frozen snapshot -> legacy and M2 decisions
  shadow-normalize.mjs     # semantic comparison and safety monotonicity
  shadow-report.mjs        # stable JSON + small manager-readable summary
  shadow-cli.mjs           # replay --fixture <allowlisted synthetic path>, read-only

tests/icm-next/
  shadow-replay.test.mjs
  shadow-differences.test.mjs
  fixture-catalog.test.mjs
  fixtures/shadow/*.json  # mock grant, tasks, journal, GitHub and outcome evidence
```

Use the existing `scripts/icm-automation/core.mjs` `inspectState` for legacy read-only decisions; do **not** modify it. Map legacy classifications `STOP`, `NO AUTHORIZED WORK`, `RECOVER`, `SELECT`, `INTEGRATION PENDING`, `INTEGRATION BLOCKED` to semantic safety values `DENY`, `RECOVER`, `SELECT_BOUND`, `WAIT`, `UNKNOWN`. Keep original reason strings and SHA. For M2, map `STOP/NO_AUTHORIZED_WORK/PLAN_CANDIDATE` to `DENY`; `RECOVER` to `RECOVER`; `WAIT_PR_CI/MASTER_VERIFY_PENDING/MILESTONE_NEEDS_WORK` to `WAIT`; `SELECT_BOUND_ITEM` to `SELECT_BOUND` **only as simulated external authorization**; `OUTCOME_COMPLETE` to `DENY_NEW_WORK`.

## Fair comparisons

- Freeze identical `now`, repository ID, branch/head/dirty state, task content hashes, grant fixture, budgets, journal, PR/CI and reviewer observations for both sides. Document fields that one system cannot represent; mark `NOT_COMPARABLE` rather than silently inventing evidence.
- Same legacy exact-ID grant semantics as current; **do not** test dynamically executable children as if already admitted. Distinguish M2 candidate suggestion capability from actual grant/authorization capability. A better proposal is not extra execution authority.
- Include normal, edge, adversarial and crash/recovery cases: first work, dependency gating, grant denied, expired/revoked, budget exhausted, changed digest, all items complete, unfinished Plan/Build/Verify/PR, stale PR head, journal corruption, wrong repo, old root docs conflict, product journey fails Master Verify, request duplication, phantom manager notification.
- Capture raw output and normalized output, exact source SHA for engine/legacy implementation, fixture digest and seeded references. Never edit source evidence after comparison to make it pass.
- Outputs must be deterministic independent of process locale, machine clock, directory ordering and JSON property insertion order.
- Ensure `shadow-cli.mjs` cannot open a live grant, write a journal, network POST, spawn Codex, run PR merge or install a task. Reject suspicious options, real secrets, non-fixture paths and mutable authority claims.

## Output schema

```json
{
  "schemaVersion": 1,
  "fixtureId": "case-stable-id",
  "fixtureSha256": "...",
  "legacy": {"decision": "...", "reason": "...", "sourceSha": "..."},
  "next": {"decision": "...", "reasonCode": "...", "sourceSha": "..."},
  "normalized": {"legacy": "DENY", "next": "DENY"},
  "classification": "EQUIVALENT_SAFE",
  "evidenceRefs": [],
  "limitations": []
}
```

Test output metadata SHA strings must be real computed values, never ellipses; placeholder is explanatory only. Final summary must include total fixtures; EQUIVALENT_SAFE, STRICTER_SAFE, UNSAFE_REGRESSION, NOT_COMPARABLE, UNKNOWN counts; raw exceptions; and disposition of each unsafe/unknown comparison.

## Non-optional acceptance

At least 30 executable synthetic replay scenarios spanning all case categories; tests include `P01–P08`. Test all legacy selector states and all M2 decision enums; if fewer than 30 meaningful cases exist, document gap and do not invent arbitrary quotas. Generate *real* reproducible fixtures with expected assertions, not 30 names in Markdown. A read-only dual-evaluation must run without mutating source or working tree and without requiring owner secrets or network.
