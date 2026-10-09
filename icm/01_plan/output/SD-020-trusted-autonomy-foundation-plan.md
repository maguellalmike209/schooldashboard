# SD-020 — Disabled Trusted Autonomous Engineering Foundation

## Human Review Summary

- Mike's required actions: none for the disabled implementation; later Windows installation, credentials, GitHub governance and enablement require separate founder action.
- Decisions requiring Mike: none for fixture-only development. Native Scheduled isolation and publisher rights remain installation gates.
- Risk tier: R3. This code models authority, process execution, OS identities and GitHub evidence; no real unattended writer is authorized.
- Current blockers: none for local Build. Real Windows isolation and GitHub protection enforcement are unverified and cannot be counted as local PASS.
- Automation status: READY FOR BUILD — NO MATERIAL HUMAN DECISION REQUIRED.

## Objective and baseline

Implement the 2026-10-09 founder packet's disabled, testable fixed-task foundation. At preflight, clean local `main` and GitHub `main` both point to `8c4c8e558d437d2874dbb1365f3d69c05e295b64`; no SD-020 entry or foundation branch exists. SSH/HTTPS Git transport from this shell is unavailable; the connected read-only GitHub API confirmed main. The SD-018 CLI remains read-only, and `core.mjs` contains strict V1 grant/task validation and advisory selection. SD-019 founder policy and D-066 remain unchanged.

## Frozen requirements and non-goals

R1. External fixed-path grant admission must reuse `validateGrant` and exact task digests; changed identity, revision, source, time, risk, operation or task definition denies before worker launch. A digest alone is not authenticated approval.

R2. One broker-owned lock and a durable, validated journal must fail closed on contention, uncertain ownership and corrupt/truncated history. A crash or unfinished child keeps recovery ahead of selection.

R3. Reconciliation must preserve unfinished Plan/Build/Verify/PR state and demand independent exact-head GitHub evidence before integration. Missing remote evidence is UNKNOWN, never PASS.

R4. The Codex process adapter must have fixed argument structure, explicit sandbox/approval settings, limited environment, finite timeout, cancellation and bounded JSONL capture. Only fake executable tests may run here. The repository entrypoint remains fixture-only; no environment variable enables real Codex.

R5. T01–T22 receive explicit results by proof class: deterministic unit, independent process, installed Windows, authentic GitHub. Existing 67 automation tests and `inspect|report` remain unchanged.

R6. A runbook records ordered later installation, identity/ACL/plugin/credential controls, negative probes, pause/revoke and G1–G8 gates. No live grant, schedule, privileged installation, publisher token, merge or Release.

No product features, billing, production, dynamic executable child tasks, separate ICM framework, or policy redesign.

## Security boundaries and abuse cases

Actors: founder/operator, untrusted Scheduled trigger, protected broker, untrusted Codex worker, independent reviewer, GitHub. Assets: approved grant, broker binary/config, lock/journal, canonical checkout, secrets, PR/CI evidence. Inputs from tasks, source, model output, comments, GitHub and process output are untrusted data. A worker could forge a grant, inject task text, escape a checkout, leave descendants after cancellation, or replay stale CI. The broker must deny when protected installation provenance, OS isolation, live remote evidence or worker lease safety are unproven. The development fixtures demonstrate logic, not installed host containment.

## Impact map

Add focused modules under `scripts/icm-automation/` for bound grant, lock, journal, policy/reconciliation, read-only GitHub, worker and fixture broker; add `tests/icm-automation/trusted-*.test.mjs`; add the installation runbook and concise context link. Add one SD-020 task entry. Change package test command only to include new tests. Keep `AGENTS.md`, root `CONTEXT.md`, SD-019 guide, existing CLI and four ICM stages untouched.

## Verification plan and readiness

Test all T01–T22 where feasible, including separate-process lock/crash probes, stale-head CI, malformed grants, path boundaries, injection, revocation and budgets. Independently inspect changed source/diff and run legacy automation, lint, typecheck, relevant unit/security tests and build. Installed Windows T13–T16 and actual Scheduled/GitHub governance proof remain pending. Task status cannot become Done until protected PR, exact-head hosted checks and final integration are proven.

Ready: local Node/dependencies and disposable test roots; canonical remote read via connected GitHub API; protected task branch. Ready with fallback: Git publish via authenticated connector only after independent Verify and exact tree review, since shell Git transport is blocked. Pending Verify: host-installed isolation and PR/CI evidence.
