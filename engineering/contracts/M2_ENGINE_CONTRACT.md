# M2 — Offline Orchestration Engine Contract (normative)

**State:** SHADOW / OFFLINE ONLY. Implements data/decision logic, never an execution entitlement.

## Purpose and trust model

Implement a deterministic, pure **decider** for the hierarchy `Approved Outcome → Milestone → Work Item → implementation steps`. Work item changes are admitted only by observed authority, not by their existence in `engineering/`, a model-generated proposal, or a status field. The engine can propose rolling work and compare evidence. It may **never** spawn Codex, write to Git, issue/revise grants, send GitHub mutations, deploy, or schedule anything.

The input consists of *untrusted observations* (`records`, `legacy`, `journal`, `workspace`, `PR/CI`, `resources`, `founder feedback`) and a **trusted admission observation fixture** supplied by the test caller. The latter is a **simulation of an external enforcement result**; in M2 there is no production source that can produce it. No caller-provided `trusted: true`, `approved: true`, digest string, role label or user-authored YAML may establish authentication. Code must separate `policyDecision` from `externalAuthorization` (unverified in M2) in naming and output.

## Pure evaluation API

Implement a function equivalent to:

```js
assessOfflineSnapshot({ schemaVersion: 1, now, source, portfolio, milestones, workItems,
  legacy, events, workspace, externalAdmissionFixture, githubFixture, resources,
  proposedFeedback })
```

- Validate input shape strictly, disallow unknown keys for core structured records, and bound sizes/depth.
- Canonicalize IDs, revisions, ISO UTC timestamps, SHA-40 code heads, SHA-256 requirement digests, paths and class enums.
- Never use local wall clock or nondeterministic task ordering inside the decision; `now` must be explicit and test-controlled.
- Return an immutable object `{decision, reasonCode, outcomeId, milestoneId, workItemId, stage, requiredEvidence, proposedChanges, observations, confidence, sourceHashes}`.
- `decision` **only** one of `STOP`, `RECOVER`, `WAIT_PR_CI`, `PLAN_CANDIDATE`, `SELECT_BOUND_ITEM`, `MASTER_VERIFY_PENDING`, `MILESTONE_NEEDS_WORK`, `OUTCOME_COMPLETE`, `NO_AUTHORIZED_WORK`.
- `SELECT_BOUND_ITEM` means **a simulation result only**; never pass it as a capability to an operational worker. `PLAN_CANDIDATE` authorizes no work.
- `confidence`: `VERIFIED_FIXTURE`, `HISTORICAL`, `UNKNOWN` (no numerical probability). `VERIFIED_FIXTURE` is a simulation provenance label, **not** actual owner/host verification.
- Reason codes are closed: `AUTHORITY_UNKNOWN`, `REVOKED`, `EXPIRED`, `BUDGET_EXHAUSTED`, `USAGE_UNKNOWN`, `HOST_UNVERIFIED`, `WORKSPACE_CONFLICT`, `JOURNAL_CONTRADICTION`, `RECOVER_SAME_WORK`, `PR_HEAD_PENDING`, `REVIEW_PENDING`, `CI_PENDING`, `TASK_DIGEST_MISMATCH`, `RISK_EXCEEDS_LIMIT`, `UNMET_DEPENDENCY`, `CANDIDATE_ONLY`, `ADMITTED_BOUND_ITEM`, `MASTER_EVIDENCE_MISSING`, `MASTER_FAILED`, `MASTER_PASS`, `NO_ELIGIBLE_WORK`. Optional future additions require versioned schema/test changes.

## Decision precedence (highest wins)

1. Current authenticated (simulated) pause/revoke/expiry and hard host/permission/identity failures → `STOP` for new writes. Preserve any unfinished-work observation for recovery reporting, **never** permit continuation.
2. Contradictory or corrupt journal, mismatched checkout/repo/branch/head, uncertain writer lock or child lifetime → `STOP` with precise reason; preserve state.
3. In-progress work or pending PR/CI already admitted under the same verified fixture authority → `RECOVER` or `WAIT_PR_CI`, **before** considering new work. Reconcile **by work-item identity**, not global latest event.
4. Completed and integrated work must have separate exact-head hosted check/reviewer evidence and canonical-branch integration observation. Stale/ambiguous proof → `WAIT_PR_CI`/`STOP`.
5. If milestone acceptance may have been met, require a frozen **Master Verify** against the observed integrated code SHA; tasks-completed does **not** equal milestone-complete.
6. If Master Verify establishes a concrete failure → `MILESTONE_NEEDS_WORK` with minimal evidence-linked candidate repair(s), **not executable without admission**.
7. Admit at most one next work item only if an external admission fixture explicitly binds its ID and immutable accepted digest, operations, scope/risk/budget/validity and independent dependencies. Otherwise output `PLAN_CANDIDATE` or `NO_AUTHORIZED_WORK`.
8. Upon verified outcome completion, return `OUTCOME_COMPLETE` with proposals for the *next* outcome only; no next-outcome work selection.

For competing same-priority items, use stable deterministic tie-breaking by milestone priority, dependency order then stable ID; never by generated prose or arbitrary object insertion order. If two records conflict on parent or digest, return `STOP`, not a best guess.

## Rolling planning contract

- Upon intake, manager normally proposes **3–5 milestone cards** for an outcome and **1–5 justified candidate work items** in the current milestone. Fewer are fine; never add filler.
- Only the *current* work item gets detailed Build acceptance; the next 1–2 remain provisional; later milestones contain success criteria and uncertainty, not committed distant architecture.
- Every new candidate cites a specific unmet frozen criterion, failed Master Verify, proven prerequisite/dependency, verified regression or authenticated founder steering reference. Include *why existing admitted work cannot cover it*.
- The decider may propose/retire/reorder candidates but **may not mint accepted status, a founder grant, a reviewer identity, a protected CI success, or a new execution privilege**.
- A correction that materially changes parent scope, sensitive-data behavior, risk ceiling, vendor/provider, compliance posture or acceptance needs a new founder decision/grant revision. Do not claim the current envelope covers it by rewriting description text.

## Frozen acceptance and Master Verify

Freeze original founder-accepted `criteriaDigest`, milestone scope and test references from an independently identified approval source. Shadow records can refer to that source but not authenticate it. A Master Verify observation must bind code SHA, tested environment, positive and negative user journey evidence, unresolved risks, and independent reviewer provenance. A record saying `pass` is not enough; mismatch of SHA, criteria digest or evidence source ⇒ `MASTER_VERIFY_PENDING` or `MILESTONE_NEEDS_WORK`.

## Determinism and resource bounds

Same canonical snapshot → byte-identical decider JSON. No network, process execution or filesystem write in pure evaluation. Fixture readers must accept max size (suggest <=2 MiB each), max nesting, bounded journal entries, and verify raw input provenance before parsing. Unknown budget/token allowance cannot be treated as unlimited. Cap candidate generation per evaluation (suggest <=5) and never auto-loop until cap as a reason to perform more work. At most one work-item selection per evaluation. A denied output cannot be converted into an authorization token by downstream formatting.

## Acceptance examples

- 2 justified initial items → exactly those 2, no quota fill.
- Evidence of a failed Course persistence journey → scoped repair candidate and Master Verify NEEDS_WORK, even with all task PRs green.
- An unapproved model-generated item has perfect acceptance → CANDIDATE; selection denied.
- A stale PR check at a previous head → cannot integrate.
- Grant revoked midway → stop and preserve unfinished journal; no retry loophole.
- A screenshot/report says item completed but repository says unmerged → PR pending, not complete.
- No schedule invocation occurred → no invented execution or daily work.
