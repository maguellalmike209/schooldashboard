# ICM Next operational readiness audit — 2026-10-11 PDT

Scope: founder packet `ICM_Next_Operational_Readiness_and_Autonomous_Pilot_Packet_2026-10-11.md`, O0–O2 foreground only. Risk R3 because a future worker would cross grant, host, and GitHub authority boundaries. This audit does not activate that worker.

## Canonical GitHub observations

Repository ID `1388346227`, `maguellalmike209/schooldashboard`; live `main` is `8c4c8e558d437d2874dbb1365f3d69c05e295b64`. The local clean checkout began at `512b9f3d0b5b3ccdb96a10cbd11c1a6babc5a0de` on `codex/icm-next-m5-m6`. Its three local commits descend from the same main; the published PR commits have different SHAs but previously recorded identical trees. No new remote fetch or ancestry mutation occurred in this audit.

| PR | Current head | Base, state | Exact-head hosted checks | Submitted reviews | Integration |
| --- | --- | --- | --- | --- | --- |
| [#25](https://github.com/maguellalmike209/schooldashboard/pull/25) SD-020 | `d72674e64570487af366d156a8e33ce05caccfca` | `main`, draft | CI and Security workflow runs succeeded; separate security review required | 0 | Separate; do not import/merge incidentally |
| [#26](https://github.com/maguellalmike209/schooldashboard/pull/26) M0/M1 | `b650e5d6d20dac129cc3b911722d685ce43f41dc` | `main`, open | `verify`, `CodeQL`, `Dependency review` succeeded from GitHub Actions App 15368. An additional CodeQL check came from App 57789. | 0 | **BLOCKED** pending eligible independent review and policy detail |
| [#27](https://github.com/maguellalmike209/schooldashboard/pull/27) M2–M4 | `10d535f192bad252294fe34ac7585830f5fd9284` | #26 branch, open | 0 check runs / 0 PR workflow runs | 0 | Stacked; main-targeting checks absent |
| [#28](https://github.com/maguellalmike209/schooldashboard/pull/28) M5/M6 | `0ba357174480cb3aecbf16424763fb5bb61a2cb3` | #27 branch, draft | 0 check runs / 0 PR workflow runs | 0 | Stacked; main-targeting checks absent |

Live main branch summary reports `protected: true` and required contexts `verify`, `CodeQL`, `Dependency review`, each pinned to App 15368. Detailed branch protection returned HTTP 403 to the GitHub installation. Reviewer count, eligible actors, bypass actors, force-push and workflow-edit controls therefore remain **UNKNOWN**. Repository metadata reporting `admin: true` for the current connection does not fill that gap. The connected GitHub app's desktop permission is **Allow all actions**, a G2 concern for any schedule inheriting it.

## Independent source challenge

The M0–M6 local branch adds 94 files against main and leaves root `AGENTS.md`, root `CONTEXT.md`, current app routes, and CI workflow files unchanged. The executable M6 admission returns `OFFLINE_ONLY` and `launchCapability: false`; its reservation is a fixture compare-and-swap model, not an atomic protected host store. M3 inventory/canary utilities do not prove worker token ACLs. Existing M5/M6 Verify explicitly identifies its author as the same coding agent; no authenticated GitHub review is recorded. These facts support shadow preparation, not cutover or host PASS.

The separate #25 `grant-store.mjs` rejects a grant inside checkout or worker roots but **does not reject a grant inside `stateRoot`**. Its `loadBoundGrant` path checks compare state and checkout/worker roots, omitting `inside(stateRoot, grantPath)`. If broker state is writable by its runtime identity, this placement crosses G1's independent founder authority boundary. #25 remains isolated. The disabled preflight added on this branch rejects that topology in an offline test; it does not repair #25 or prove host ACLs. A future reuse decision needs a scoped review and negative test on #25 itself.

## Dependency-ordered reconciliation

1. Obtain an eligible distinct GitHub reviewer for #26 and an authorized admin observation of actual review, bypass, force-push and workflow-edit policy. Recheck exact head/check App IDs; merge #26 only if existing protection allows it.
2. After canonical main changes, reconcile #27 nondestructively (merge main into the branch or create a fresh reviewed branch), target main, verify the resulting exact head through hosted `verify`, CodeQL and Dependency Review, obtain eligible review, then integrate.
3. Repeat for draft #28 only after #27; retain disabled status and separate M5 cutover decision. Keep #25 as a separate security review.

No path is currently eligible for integration. `CANONICAL_SOURCE_VERIFIED` is false; verdict `PR_INTEGRATION_BLOCKED`. No review was fabricated or requested on behalf of another person.
