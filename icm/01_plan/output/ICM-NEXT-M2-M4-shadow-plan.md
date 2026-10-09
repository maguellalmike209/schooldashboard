# ICM Next M2–M4 — Shadow Implementation Plan

## Human review summary

- Mike's required actions: none for the authorized offline build. Actual installed-host identity, ACL, connector and admin GitHub proof remain later owner actions.
- Decisions requiring Mike: none for offline implementation; future M5 activation is separate.
- Risk tier: R3 because this is a security-sensitive control-plane prototype, even though it must remain offline and inert.
- Current blockers: no local Git transport or `gh`; the GitHub connector is the verified remote observation and publication fallback. Installed-host proof is unavailable and will remain UNKNOWN.
- Automation status: READY FOR BUILD — NO MATERIAL HUMAN DECISION REQUIRED.

## Objective and baseline

Implement the attached founder-authored M2 engine, M3 proof diagnostics and M4 legacy shadow replay in that order, preserving existing ICM and CI. On 2026-10-09, main was `8c4c8e558d437d2874dbb1365f3d69c05e295b64`; PR #26 remained open at `b650e5d6d20dac129cc3b911722d685ce43f41dc`, with hosted checks green and no GitHub review; PR #25 remained open draft at `d72674e64570487af366d156a8e33ce05caccfca`. The clean local M1 commit `64e0c7d668319adf77e08f3ee48b3bd63fc8db44` and remote M1 head have the same tree `89dcd462e7409aeee0e2acf4984769d4f4ea6210`. The package's 16 SHA-256 entries matched. The new local branch is task-scoped; publication must parent the verified remote M1 SHA.

## Requirements and boundaries

Use the packaged `engineering/**` files as the M2–M4 contract, with M1 charter/policy/delivery/quality/operations still owning intent. Build pure deterministic records, transitions, admission simulation, recovery-first assessment, legacy adapter and frozen Master Verify. M3 may inventory read-only state and test disposable synthetic canaries/fake workers, never real secrets or permissions. M4 compares identical frozen evidence with live `inspectState` imported read-only and fails on increased execution authority.

No change to root router, active grant/parser, SD-020 branch, GitHub rules, product runtime, CI workflows, ACLs, credentials, scheduler, worker launch, production or Release. `SELECT_BOUND_ITEM` is a simulation result and cannot reach any operational action.

## Trust boundaries and negative targets

Records, Markdown, journal, Git/PR observations, feedback and model text are untrusted. A dedicated external-admission fixture is test input only and must bind exact ID/digest/risk/operations/time/budget; it cannot authenticate the founder. Host and GitHub evidence are separate from offline proof. Challenge forged approvals/reviews, parent/digest/risk changes, journal contradictions, interleaved unfinished work, stale PR checks, unknown usage, expired/revoked grants and false Master Verify product PASS.

## Impact map and acceptance

Change only the packaged `engineering/**`, `scripts/icm-next/**`, `tests/icm-next/**`, task-scoped evidence and a minimal package test script. Inspect legacy `scripts/icm-automation/core.mjs`, tests, active CLI, existing CI and relevant M1 contract. M2 gate requires E01–E26 executable assertions plus compatibility and determinism. M3 requires S01–S10 safely testable fixture intentions and truthful G1–G8 host ledger. M4 requires at least 30 substantive executable comparisons, P01–P08, mutant unsafe detection, legacy fallback and no unresolved unsafe regression. Hosted checks and independent review remain integration gates on the final remote SHA.

## Readiness and verification

Node and existing dependencies are present (verify with execution); no new package is planned. Local source is clean and tree-equal to verified remote M1. GitHub connector can observe main/PRs and safely publish a stacked branch from the exact remote M1 SHA; local shell Git transport is blocked. Verify each phase independently from contract, source and negative tests. Run new and legacy tests, lint, typecheck, build, audit policy and available supply-chain checks; then observe exact-head hosted CI after PR publication. Stop after M4 with M5 host gates open.
