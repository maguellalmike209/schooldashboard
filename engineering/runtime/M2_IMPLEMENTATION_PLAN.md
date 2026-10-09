# M2 — Offline Engine: Required Implementation and Tests

**Scope:** Code an executable **offline**, deterministic control-plane evaluator. No operating-system writer/worker/scheduler, no network mutations, no real grant minting. Existing ICM stays the active system.

## Target implementation layout (new files; Codex implements)

```text
scripts/icm-next/
  schemas.mjs              # strict shape validators + cross-record invariants; no authority
  records.mjs              # immutable normalization, stable IDs, canonical digests
  transitions.mjs          # pure closed state transitions and rejection codes
  legacy-adapter.mjs       # read-only SD task/legacy evidence mapping
  admission-fixture.mjs    # simulated exact-ID grant checker; never auth backend
  planner.mjs              # evidence-linked candidate suggestions, deterministic priority
  engine.mjs               # assessOfflineSnapshot pure top-level orchestrator
  master-verify.mjs        # criteria/identity/evidence gate; no model self-attestation
  cli.mjs                  # `simulate --fixture <allowlisted local file>` ONLY; read-only

tests/icm-next/
  records.test.mjs
  transitions.test.mjs
  legacy-adapter.test.mjs
  engine.test.mjs
  master-verify.test.mjs
  fixtures/                # synthetic; cannot refer to real owner grant paths
```

Module names may vary only to fit repository style without changing ownership. Build small functional modules; no parallel giant ICM framework, no database, no web UI, no additional AI agent orchestration library. **Do not modify** `scripts/icm-automation/core.mjs`, live CLI or schema to retrofit M2. Never read or write owner credentials.

## Pure source contracts

`schemas.mjs`: validate the attached `RECORDS_V1.schema.json` with a deterministic supported validator or a hand-written equivalent, including cross-record constraints not expressible in the JSON Schema. All unknown fields and enums are rejected. Validate parent ID, duplicate identities, cycles, linked dependencies, ordering, SHA-40/256, immutable revision anchors, time windows, empty criteria, contradictory evidence and invalid actor sources.

`records.mjs`: compute canonical digests of admitted *task content* without mutable state; maintain original source SHA and observed revision. No hash is an authentication token. Preserve raw legacy references; never overwrite old status.

`transitions.mjs`: consume explicit previous state and evidence; reject illegal transitions with stable codes. See `M2_STATE_TRANSITIONS.md`. Forbidden transition remains denied if textual status is edited to a later state; evidence is required.

`legacy-adapter.mjs`: import only `read-only` `icm-task` blocks and evidence without executing Markdown. Assert compatibility with current `taskDigest` and `inspectState` via fixture tests. Keep historical prose as **untrusted**, not executable.

`admission-fixture.mjs`: accept only a `test fixture` object injected via dedicated test code and clearly labeled synthetic. Exact task ID/digest/risk/operations/time/revocation/budget semantics. Never produce real grant files or make live authority claims.

`planner.mjs`: generate a small deterministic list of **proposed candidate records** from explicit unmet acceptance evidence. Candidate content must preserve parent, original frozen criterion, reason, risk ceiling and why existing work cannot cover it. Since actual model reasoning is not machine-provably complete, no generative AI completion needed in M2; use fixed declarative candidate fixtures. If no grounded next candidate exists, return empty proposal + UNKNOWN instead of speculative tasks.

`engine.mjs`: implement `assessOfflineSnapshot` from `M2_ENGINE_CONTRACT.md`; no `spawn`, `exec`, timers, network, `fs.write*`, `git`, GitHub POST/PATCH, credentials or scheduled task APIs anywhere in the engine path.

`master-verify.mjs`: verify original acceptance digest and accepted outcome/milestone linkage, observed integration commit, functional positive+negative results, independent actor provenance if available, remaining blockers, conditional assurance triggers and completion state. `VERIFIED_COMPLETE` is unavailable without credible externally observed verification. Do not accept a string `independentReviewer: true` as proof.

`cli.mjs`: support dry-run invocation on **synthetic fixtures only**, with output JSON to stdout and no side effects. Reject path traversal, arbitrary working-directory scan and real grant storage by default. No `--enable`, `--run`, `--execute`, `--grant`, `--push`, `--merge`, `--release`, `--install`, or `--schedule` commands.

## Deterministic test discipline

- Run all `E01–E26` cases in `engineering/tests/M2_M4_CASES.json` with actual independent negative inputs and expected decisions; an entry in JSON alone is not a passing test.
- Repeat snapshot 10 times with randomized object property insertion order, but stable semantics; normalized output must match exactly.
- Inject forged `accepted`, forged reviewer, malicious instructions, wrong parent, scope/cost expansion, stale head, invalid timestamp, expired grant and corrupt journal. No simulated authority may derive from the forged input.
- Include the real prior `SD-020` interleaved journal edge case: last integrated task B must not clear unfinished task A. Test if SD-020 patch is pending; do not modify its draft branch in this run.
- Confirm `npm test` legacy suite remains green and `node scripts/icm-automation/cli.mjs inspect` stays read-only and reports `NO AUTHORIZED WORK` without grant.
- Run node unit tests, lint/typecheck/build, audit-policy and required hosted CI as applicable. Never claim local audit success if unavailable.
- Record exact SHA and proof class for all results; synthetic tests are not actual Windows or hosted GitHub proof.

## Phase completion rubric

`M2_OFFLINE_VERIFIED` requires: strict schemas, pure engine, read-only adapter, legal/illegal transition tests, Master Verify logic, deterministic replay, no write-capable entrypoint and independent review. If anything is blocked, report precisely and leave the engine untrusted. Even with PASS: **no actual unattended write permission**.
