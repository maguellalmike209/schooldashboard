# SD-018 — Scheduled Autonomy Foundation & Manager Mode Plan

## Human review summary

- Status: READY FOR BUILD. Mike authorized Plan, Build, scoped testing, independent Verify, and protected PR finalization for SD-018.
- Risk: R3. The increment implements authorization and recovery decision logic for a future security-sensitive writer, though the actual repository pilot and scheduled mode remain read-only.
- Material decision needed now: none. This Plan does not authorize unattended writes, Release, or a recurring schedule.

## Objective and current state

Build a small, deterministic, recovery-first ICM inspection and reporting foundation. `docs/TASKS.md` is the accepted task registry; the current checkout has no automation contract, external grant loader, checkpoint validator, or Manager Review command. Existing Plan, Build, Verify, and Release stages remain distinct. `main` was clean at `3bb2400` when work began; this task uses `codex/sd-018-scheduled-autonomy-foundation`.

## Trust and scope

Actors: Mike grants authority; a future trusted launcher validates an out-of-workspace grant; the agent performs bounded work; independent Verify challenges it. Protected assets are repository integrity, authorization scope, and evidence of completion. The grant crosses a trust boundary only after independent launcher validation. `TASKS.md`, prompts, checkpoints, and model summaries are untrusted for permission. The command in this increment never writes to the SchoolDashboard repository; disposable tests may write fixtures and locks in temporary directories.

No SchoolDashboard application behavior, production infrastructure, ReviewTap, cryptography, or unattended writer is in scope. Release remains separate.

## Implementation and verification contract

WP-01: Add `icm/automation/CONTEXT.md` with invocation order, strict grant and checkpoint contracts, single-writer rule, bounds, stop conditions, and daily report expectations.

WP-02: Add a standard-library Node CLI that reads live local Git/task/evidence state; remote GitHub evidence is UNKNOWN absent an independently obtained observation. No fetch or repository mutation.

WP-03: Strictly validate synthetic grants/tasks/checkpoints, reconcile rather than trust checkpoints, recover unfinished authorized work before selecting a new task, enforce dependencies and integration gates, and model exclusive lock acquisition in disposable fixture directories. The lock cannot enable real unattended writing.

WP-04: Render a brief Manager Review with actual observations and explicit unknowns, including resources and proposed work separated from permitted work.

WP-05: Exercise all 24 requested adversarial scenarios, including simultaneous lock attempts and interrupted recovery. Add independent challenge during Verify.

WP-06: Route from root context, add minimal global invariants, register SD-018 and future task-entry metadata. Do not rewrite historical tasks or duplicate stage procedures.

Acceptance requires a read-only real pilot, repeatable synthetic invocations, no silent grant expansion, no false Done/PASS, no progression past dependency/integration gates, and a clean application/task-status diff. The future writer is only specified and remains disabled.

## Recovery and failure boundaries

If Git identity, branch, HEAD, dirty state, grant revision, task metadata, checkpoint, or evidence conflict, fail closed or report recovery inspection. An uncertain stale lock is not stolen. No automatic restart from Plan. Budgets and expiry are checked per invocation. Offline or missed runs produce no fabricated activity. Revocation stops execution; silence preserves only an otherwise valid grant.

## Build readiness

Node and Vitest already exist. No new dependency, credential, production access, or remote service is needed. Static local evidence supports implementation. Hosted CI and independent Verify remain required before Done.
