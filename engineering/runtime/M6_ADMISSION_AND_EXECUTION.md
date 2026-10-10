# M6 — Admission / execution pipeline (implementation target)

## Modules

- `delegation-v2.mjs`: **pure** `assessCandidate({envelope, authenticatedBindingObservation, parentRecords, candidate, evidenceObservation, resources, now})` -> `DENY|CANDIDATE_ONLY|ADMIT_FIXTURE`; explicit `OFFLINE_ONLY` provenance until trusted broker wired. No secret, network or child process.
- `delegation-ledger.mjs`: replayable fixture with deterministic reservation and failure semantics; production requires independently owned durable atomic store/lock, not JSON under checkout.
- `management-review.mjs`: read-only explanation of candidates, integrated work, status, budgets and decisions; source-specific timestamps and UNKNOWN labels.
- Versioned route adapter for M2 `assessOfflineSnapshot()`: **only** add new optional V2 fields behind a versioned interface; old exact-ID policy and existing tests must not weaken. Do not turn `SELECT_BOUND_ITEM` fixture return into an executable capability.
- Host broker/worker/writable scheduled adapter: **not to be implemented live until G1–G8 verified**; if stubs are added they must deterministically deny real launch.

## Pipeline order

1. Receive a request from untrusted schedule/manager. Record request ID; do not accept caller-selected grant path, command or secrets.
2. Trusted host checks OS identity, installed code pin, protected grant/binding location, revocation epoch, authority validity, checkout/branch HEAD, exclusive lock/child lease, publisher isolation and budget health. UNKNOWN -> STOP.
3. Reconcile unfinished admitted work and PR/CI before considering a new candidate. Prevent an integrated event for task B from resolving unfinished task A.
4. Verify child candidate schema, parent, evidence and class/path/operation/criteria, negative acceptance, dependencies, risk, total/per-run limits. Unknown semantically relevant work -> CANDIDATE_ONLY.
5. Atomically reserve one child slot and emit single-use narrowed receipt in broker-protected storage. Validate again before each high-risk effect; never give worker parent grant.
6. Launch one restricted worker in own workspace with fixed sandbox/tool/network policy and isolated GitHub access. No real launch in this M6 coding run.
7. Perform scoped Plan → Build → independently evidenced Verify → protected draft PR/CI under permitted publication rights. The builder cannot bypass approval via direct GitHub connector.
8. Reconcile actual results, update independent journal, do Master Verify at milestone completion, deliver concise manager report. Continue only in a later actual invocation within valid parent authority.

## Deterministic decision precedence

`REVOKED / EXPIRED / HOST_UNVERIFIED / SOURCE_CONFLICT -> DENY` first; `UNFINISHED_RECOVERY -> RECOVER_OR_STOP`, `PR_PENDING -> WAIT_PR_CI`, `MILESTONE_MASTER_VERIFY -> VERIFY_OR_NEEDS_WORK`, `OUTCOME_COMPLETE -> STOP/REPORT`, then eligible candidate admission. A candidate never jumps a dependency or existing incomplete work; unsupported state transition and wrong policy version FAIL CLOSED.

## Dual-authority failure test

A token derived only from protected V2 parent approval must not be admissible in legacy V1. Conversely V1 fixed-ID grants cannot accidentally turn on V2 dynamic selection. Coexistence demands explicit version/issuer mode, no fallback to model-written permission and negative tests for cross-version replay.

## Notifications

Whenever a new candidate is proposed, include its ID, parent criterion, observed necessity, proposed risk, intended acceptance and status in manager reporting; urgent issues are surfaced only through an actually installed notification channel. Do not claim push notifications, daily recurrence or user review occurred when no invocation/delivery evidence exists.
