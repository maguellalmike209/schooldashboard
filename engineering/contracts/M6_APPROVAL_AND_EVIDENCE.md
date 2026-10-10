# M6 — Authoritative approval, evidence and revocation rules

## Trust boundary

Trusted evidence originates in an independently protected broker/owner store or a verifiable hosted API, with pinned identity/version, timestamps, canonical commit and integrity checks. A hash-chain within the same writable agent directory is only corruption detection. Model text, in-repository fixture attestations, handwritten review signatures and opaque source labels cannot authenticate authority.

## Revision

Any founder-approved expansion to milestone IDs, task classes, paths, operations, risk, budgets, period or exception requires **new owner approval and new protected revision**, not merely a Markdown status edit. An amendment that narrows or pauses may be enforced immediately through an owner-authenticated path, subject to safe in-flight cancellation. Child receipts based on expired/revoked revisions stop new effects; retain the audit trail.

## Budget mechanics

External ledger atomically reserves before spawn: one candidate ID+digest+revision+invocation slot, work item count, total running time allocation, retries, publication actions and resource usage when measurable. Check per-execution and cumulative limits. Use monotonic independent ledger sequence, compare-and-swap/transactional reservation and idempotency key; conflicting or missing reservation proof FAILS CLOSED. A failed launch does not silently refund budget or authorize unlimited attempts. Unknown usage or inaccessible ledger stops rather than guessing.

`maxTasksPerRun <= maxTasksTotal`, `maxConcurrentWriters=1` for initial pilot. Global aggregate limits across the envelope and individual child must both hold. Revocation after spawn prevents further dangerous operations and requests child cancellation; retain lock until child tree death proven. Already published effects must be recorded, not erased.

## GitHub / CI / Release

Developer worker cannot obtain publisher or main-write credentials, approve its own PR, edit required CI/reviewer protections, or inherit the owner's GitHub plugin write capability. Trusted publisher supports bounded DRAFT PR preparation only when separately authorized and observed G5 policy permits. Merge requires independently authenticated protected approval; production Release always separately authorized. Work can continue on non-PR local state if authorised; integrated completion cannot be asserted until exact-head hosted evidence and canonical ancestry verified.

## Independence and quality

Acceptance criteria are frozen at owner-approved outcome/milestone level. QA can propose strengthened negatives; it cannot silently delete/modify accepted criteria to make PASS. A PASS requires a distinct authenticated reviewer or independently controlled CI evidence appropriate to risk. Master Verify tests real milestone behavior, not merely counts of Done items; a failed student journey yields NEEDS_WORK even with all PR checks green.

## Endpoints

If no allowed items remain, manager reports waiting, proposes options with clear `CANDIDATE` status; it must not generate filler to spend tokens. If outcome is VERIFIED_COMPLETE, cease all new within-outcome write grants (aside from distinctly authorized post-closeout repairs). If paused or revoked, keep full recoverable evidence and report safely. Daily reporting has no authority effects.
