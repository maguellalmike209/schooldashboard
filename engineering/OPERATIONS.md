# ICM Next — Trusted Operations and Recovery Contract

**Status:** SHADOW SPECIFICATION; no installed broker, schedule, credentials, grant or live autonomous write capability is created by M0/M1.

## 1. Security boundary is physical/logical, not a prompt

Native Codex Scheduled (when available) may request work, but is not the grant authority. A separate founder-owned approval channel and trusted broker must enforce: operator identity, pinned code/config, grant version/revision, stop/pause/revocation, workspace identity, tool/OS/network restrictions, allowed operations, budgets, single-writer lease and observable worker lifetime.

A Codex worker must not have the ability to edit its own execution rules, founder grants, journal, protected broker, reviewer settings, required CI, canonical main, publisher/production secrets or other repositories. Restrict GitHub plugin actions independently from filesystem sandbox permissions. A worktree is an organization tool, not an OS/security boundary. Different Windows usernames are insufficient if the same remote ChatGPT account/connector still grants write operations.

## 2. Execution roles (future installed system)

**Scheduled requestor (A0):** read/submit opaque work request only; cannot choose task, repository, command or grant. Cannot bypass broker.

**Trusted broker:** installed outside writable source, separate identity; validates owner-controlled grant, acquires exclusive checkout/job lease, checks exact canonical remote and journal, admits only bounded worker actions; owns protected runtime state and idempotency.

**Untrusted worker (A1):** uses pinned `codex exec` or equivalent under a tested restricted host identity and isolated checkout; no protected credentials, write-capable apps, open production paths or unrestricted network.

**Publisher (A2):** independent short-lived narrowly scoped credentials; branch/draft PR only for initial pilots; no privileged merge or deployment. Initially require human approval for merge.

## 3. Recovery-first, crash-safe evidence

At every actual invocation: load authentic current grant, verify installation identity and limits, acquire OS-enforced exclusive lock, prove old child/process tree stopped or contained, independently reconcile journal and Git/PR/CI state, prioritize unfinished authorized item, only then select next eligible work. Persist timestamped events before and after side effects; inspect exact PR head and required check identities. A hash-chain detects accidental tampering but cannot replace protected file ownership or independent evidence.

No automatic lock stealing based on a timestamp/PID alone. Never reset/discard dirty unfinished work. Contradictory evidence means STOP and recovery report. Missed/offline schedules and token refreshes are not invocations. No claim of background execution without actual scheduler evidence.

## 4. Cancellation, pause, revocation and spend

A protected pause/revoke action stops future admission and risky transitions; it should cancel and contain the active job, prove child death and keep lease ownership until then. A revocation cannot undo prior completed effects; report the exact known effects. Enforce per-run and grant-wide wall time/task count/retry/parallelism and measurable financial/usage budgets. If an essential bound cannot be measured or enforced, deny rather than invent remaining allowance. The founder may choose a simpler fixed-task grant when dynamic delegation cannot be constrained.

## 5. Integrating protected GitHub evidence

Current GitHub CI/CodeQL/Dependency Review must remain enabled. Required checks and identities, branch protection, reviewer requirements and bypass settings must be independently inspected from an authorized admin account before any eventual auto-merge or live publisher. The worker must not be able to approve its own PR, rewrite status contexts or push to protected main. Accept only exact head checks, review evidence and canonical integration identity.

## 6. Installation readiness levels

- `DESIGN_ONLY`: M0/M1 shadow documentation, no new privileges. **Current ICM Next state.**
- `OFFLINE_VERIFIED`: M2 schema/logic pass fixture and adversarial tests. Not Windows/connector safety.
- `HOST_PROVEN`: M3 actual token/ACL, egress, connector, descendant lock, cancellation and grants tested with harmless canaries.
- `SHADOW_PROVEN`: M4 comparison old/new on the same evidence without side effects, parity PASS.
- `PILOT_AUTHORIZED`: M5 founder explicitly approves one R0/R1 bounded live task with draft PR only and zero retries.
- `DELEGATION_PILOT`: M6 bounded dynamic children under a separately tested admissibility policy.

Status can only progress with actual named evidence. Do not skip from `DESIGN_ONLY` to `PILOT_AUTHORIZED` because documentation appears complete.

## 7. Manager report telemetry

Source run IDs, clocks, real permission/identity evidence, lock state, exact SHAs, CI links, count of actual attempts/retries and enforceable budgets from trusted runtime. If unobservable, report `UNKNOWN`. A management report is not execution authority. The proposed 20:00 `America/Los_Angeles` daily Manager Review cadence is a preference until a real schedule is created after M3–M5 gates.

## 8. Unverified host facts that must be resolved later

On the previous SchoolDashboard development environment, `codex exec` under one read-only profile reported `Could not find home directory`, the existing checkout had a writable sandbox group ACE, and GitHub plugin write access had been enabled; detailed protected-main governance was not available through the connected read-only GitHub API. Revalidate live on the target host; M0/M1 must not infer those conditions were repaired. SD-020 PR #25 is a draft disabled fixture foundation at the recorded baseline, not an installed broker.
