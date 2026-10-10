# M5 — Compatibility, recovery and rollback protocol

## Legacy identity is permanent

Preserve all `SD-XXX`, `D-XXX`, SEC/security decisions, old PR links and evidence references. New engine may show an outcome/milestone wrapper but must not rewrite historical acceptance, grant digest, integration proof or preexisting task status. An unmerged task marked `Ready for verification` never becomes `INTEGRATED` by mapping.

## Compatibility adapter (read-only)

Input from **real observation, never guessed**: legacy task JSON blocks and their prior SHA; legacy checkpoint/status; exact Git state; PR and CI; new outcome/milestone/work-item source; actor/approval provenance. Output `{legacyId, proposedWorkItemId, mappingStatus, evidenceRefs, authorizationStatus, unresolvedConflicts}`. Allowed statuses `MAPPED_EVIDENCE`, `HISTORICAL_ONLY`, `PR_PENDING`, `UNRESOLVED`; never an automatic `ACCEPTED_BY_FOUNDER`. `legacyId` to new ID must be stable/versioned; duplicates and unknown IDs FAIL. A migration adapter may not mint a newer grant. Missing model of old state is **unresolved**, not success.

## Snapshot and rollback planning

Read exact tracked bytes/hash of `AGENTS.md`, `CONTEXT.md`, `engineering/**` and related source pin before proposing a switch. Record known dirty state and pending PRs, old routing semantics, current active invocation state, Windows host and GitHub policy evidence. Generate a **readable, non-applying** replacement and reverse patch using pinned versions. Dry-run on an isolated copied repository and verify that reversing restores byte-identical routing and old CLI semantics. Preserve the new branch/historical artifacts for traceability.

Rollback requires a distinct authorized operator action; never let an unattended writer self-rollback to gain a looser permission configuration. An uncertain active child tree, dirty checkout, interrupted PR/CI or unverified review blocks direct rollback. First freeze intake and reconcile current trusted ownership; preserve work/journal.

## Operational fallback

If a policy router cutover later breaks foreground navigation, pause new admissions, record failure evidence, revert through a protected reviewed PR or owner-authorized mechanism, restore original router, revalidate inherited risk controls, and reopen work only after prior unfinished tasks are reconciled. Reverting policy routing does **not** revive revoked grants or reactivate legacy untrusted writers.

## No accidental parallel writers

Shadow comparison is observational only. At most one trusted write process owns any checkout; two separate branches are not proof of isolated credentials/identity when they share filesystem or plugin access. Repeated idempotency requests must not create duplicate work, reprocess an integrated task or inflate budget.

## M5 final evidence

Provide `M5_CUTOVER_REHEARSAL.md` with old/new snapshot hashes, parity numbers, coverage holes, injected failures, rollback byte comparison, proposer vs reviewer identity, known blocker and `CUTOVER_CANDIDATE | M5_CUTOVER_BLOCKED`. A reviewer should challenge missing proof rather than sign a generic success statement.
