# M5 — Foundation Cutover Contract

**Classification:** Replacement of repository **operating-policy routing**, not production deployment; a separate technical risk/approval boundary nonetheless. The target root source after eventual cutover is a small, stable router to `engineering/`, not a copy of the old task-first manuals.

## Target control plane

```
AGENTS.md  -> engineering/CHARTER.md, POLICY.md (short default conduct)
CONTEXT.md -> engineering/README.md (source router)
  founder outcomes/portfolio -> engineering/PRODUCT_OUTCOMES.md
  management/roll horizon   -> engineering/DELIVERY.md
  risk/reviewer/master QA   -> engineering/QUALITY.md
  hosting/agents/reporting  -> engineering/OPERATIONS.md
  implementation contracts -> engineering/contracts/*
  product specifications     -> docs/PRODUCT_VISION.md + relevant current specs
  current application truth  -> code / docs/IMPLEMENTATION.md
  accepted historic decisions-> docs/DECISIONS.md
  historic task evidence     -> docs/TASKS.md + task stage artifacts
```

No `AGENTS.md` or `CONTEXT.md` rewrite may take place in the initial M5/M6 work session. Implement a **generated cutover proposal** that can later be reviewed and applied with explicit founder approval. A separate post-approval PR must include the exact old/new hashes, safety gates, review evidence, reversible diff and independent Master Verify.

The intended runtime host is one always-on Windows computer. `engineering/OPERATIONS.md` owns the availability assumption and recovery rules; a policy-router cutover grants no scheduler or worker capability.

## Distinguish four states

- `SHADOW`: new code/docs exist, old instructions and old runtime are operative; M2/M4 evaluation only.
- `CUTOVER_CANDIDATE`: complete reconciled M0–M4 history, parity, mapping, branch protection/review evidence, rollback package and reviewed root patch. No root change.
- `POLICY_ACTIVE`: *after* a separately approved, verified root-router change on protected `main`, the new engineering contract is active **for authorized foreground work only**. Does NOT imply native schedule/worker/grants are active.
- `RUNNER_ACTIVE`: distinct later operator decision after installed G1–G8 real proof and revocation test. Not authorized by this packet.

No state may imply the next one. `CUTOVER_CANDIDATE` is the maximum automatic achievement for this Codex prompt.

## Required M5 preconditions before CUTOVER_CANDIDATE

1. M0/M1 PR #26 independently reviewed, hosted checks passed at final exact head, integrated into current `main`.
2. M2–M4 PR #27 independently reviewed after base reconciliation, hosted checks passed on actual final main-targeting head, integrated into current `main`. Stacked-head tests are not an adequate substitute.
3. PR #25 recorded and isolated; no accidental duplicate/trusted-writer path. Security review of its defective or unproven pieces before any reuse.
4. M0 legacy-control matrix audited: security/privacy/authorization, protected CI and Release rules each have an explicit new owner + parity proof. Document retired ceremony versus preserved safety, with no orphan controls.
5. M4 replay against the **integrated source**: canonical source hashes, same observation fixtures, zero unsafe authority regressions, justified stricter differences, reproducible results, old fallback still works.
6. Synthetic end-to-end task lifecycle through Master Verify, including a failed student journey despite passing unit/CI. No invented user outcome.
7. Exact root proposed patch with before/after hashes and traceable rollback, no unrelated edits or history rewriting.
8. External review of permission and reviewer enforcement for proposed switch. Actual README claim cannot substitute.

If any check cannot be established, output `M5_CUTOVER_BLOCKED` with named evidence; do not mechanically replace root routing.

## Task lifecycle after future policy cutover

`Approved Outcome -> Milestone -> candidate work -> admitted work item -> Plan -> Build -> independent Verify -> PR/CI -> integrated -> Milestone Master Verify -> next within SAME approved Outcome`.

Distinct outcome completion stops new feature coding pending a founder-approved outcome; production Release is another boundary.

## Risk equivalence

The old R0–R4 effects and security/privacy rules remain in force until independently mapped and approved otherwise. Lighten documentation bureaucracy, NOT security checks, release rules, auth/RLS negatives, branch governance, independent review, grant/budget enforcement or recoverability. Refactor stage documents to historical/read-only references only at the later deliberate cutover, never by deletion of evidence.
