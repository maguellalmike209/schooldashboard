# M2 — Closed State Machines and Evidence Rules

**Shadow parser only.** Do NOT inject these enums into the existing `docs/TASKS.md`, SD-018 grant parser or SD-020 branch. Stable legacy `SD-XXX` IDs must retain original meaning.

## Record identities and revisions

- Outcome `OUT-###`, Milestone `MS-###`, new Work Item `WI-###` (in this shadow model). Existing `SD-XXX` is a **legacy reference**, never automatically reapproved or renumbered.
- `id`, `kind`, `parentId`, `schemaVersion`, `revision`, `state`, `criteriaDigest`, `sourceRef`, `riskTier`, `scope`, `exclusions` are immutable within a single approved version. Material change requires a new version + independent approval observation.
- Actor identity is an *observed* source reference; a model can suggest actor text but not authenticate a reviewer or founder.

## Outcome transitions

| From | To | Required independently observed evidence |
| --- | --- | --- |
| PROPOSED | APPROVED | Owner approval record from external authenticated authority (simulation fixture in M2) |
| APPROVED | ACTIVE | Valid owner-controlled execution envelope and admitted milestone scope |
| ACTIVE | MASTER_VERIFY | All required milestone integration evidence, no unresolved security/privilege violations |
| MASTER_VERIFY | VERIFIED_COMPLETE | Independent end-to-end acceptance at exact integrated version |
| ACTIVE / MASTER_VERIFY | PAUSED / BLOCKED / REVOKED | Fresh owner status or reliable blocker evidence |
| PAUSED | ACTIVE | New authenticated owner revision; old grant never self-reopens |

No `VERIFIED_COMPLETE → ACTIVE` transition by model text. New goals require a new Outcome identity/authorization.

## Milestone transitions

| From | To | Required evidence |
| --- | --- | --- |
| CANDIDATE | ACCEPTED | Parent outcome approves milestone scope (offline fixture only) |
| ACCEPTED | ACTIVE | Admission within current parent authority, parent dependency met |
| ACTIVE | MASTER_VERIFY | Work integrated and frozen journey eligible for challenge |
| MASTER_VERIFY | COMPLETE | Independent Master Verify, frozen criteria match, exact integrated head, negative journeys pass |
| MASTER_VERIFY | NEEDS_WORK | Failed frozen criterion / verified regression with evidence |
| NEEDS_WORK | ACTIVE | Repair admitted under same valid parent bounds (else remains candidate) |
| ACTIVE / MASTER_VERIFY | BLOCKED | Unresolved material dependency or missing external proof |

Master Verify FAIL cannot be relabeled into ACCEPTED or COMPLETE to clear a queue.

## Work-item transitions

| From | To | Required evidence |
| --- | --- | --- |
| CANDIDATE | ELIGIBLE | Independently validated **exact item ID + immutable digest** grant simulation; no M2 live grant |
| ELIGIBLE | PLAN | External admission and valid workspace/lock observations |
| PLAN | BUILD | Frozen scoped Plan + risk/negative acceptance; actual approval where necessary |
| BUILD | VERIFY | Build artifacts and code SHA; required local check evidence |
| VERIFY | PR_CI_PENDING | Independent verification result; PR/hosted review still separate |
| PR_CI_PENDING | INTEGRATED | Exact-head required hosted check identities, independent reviewer/protection evidence where required, canonical integration observation |
| PLAN / BUILD / VERIFY / PR_CI_PENDING | BLOCKED / CANCELLED | Reason, exact prior state, actor and recoverable evidence |

Allow only bounded task-local `VERIFY → BUILD` repair loops with a new evidence revision; the accepted goal remains frozen. PR head changing invalidates the prior hosted check observation.

## Invocation transitions

`REQUESTED → ADMITTED → RUNNING → RECONCILING → STOPPED` with separate denial paths `REQUESTED → DENIED` and interruption `RUNNING → INTERRUPTED → RECONCILING`. Duplicate invocation id is idempotent (cannot start twice, cannot double-charge budgets). Current M2 records are simulated; real process leases and durable operational journal ownership belong to M3/M5.

## Invariants requiring hard negative tests

- Cross-parent work-item move is forbidden without revision/approval; a model may not silently repoint a work item at a broader milestone.
- A task digest binds accepted content excluding mutable status but including scope, negative acceptance, exclusions, parent and risk ceiling.
- A milestone cannot complete merely because all child statuses read INTEGRATED; verified end-to-end criteria are mandatory.
- An integrated task cannot depend on CI from a different SHA or PR/repo.
- Reviewer display name != independent reviewer approval. A model-reported score is never authenticated GitHub review.
- A revoked or expired parent masks all child candidates and active work from selection; preserving state is not permission to continue writes.
- Changing `riskTier` from R3 to R0 to fit authority is denied; semantic effects require independent review.
- Every state-changing journal observation must carry time, stable event ID, source, reference and expected prior state. Corruption/duplicate contradictory events stop the affected work.
- Invalid and unknown enums/fields fail closed. No guess-based mapping of old statuses such as `Ready for verification` into new completed states.
