# ICM Next M0 + M1 — Shadow Foundation Plan

## Human review summary

- Founder action: none for the authorized foreground, documentation-only M0/M1 phase.
- Risk: R0 for changed files. The proposed future system concerns R3/R4 authority and security, so runtime, host and Release claims require later independent proof.
- Boundary: stop after M0/M1. No M2 engine, root cutover, new grant, schedule, unattended writer, production Release or SD-020 integration.

## Objective and baseline

Audit live legacy ICM controls, then add the supplied founder-authored `engineering/` shadow architecture with truthful parity and verification evidence. The clean local canonical `main` and connected GitHub `main` were `8c4c8e558d437d2874dbb1365f3d69c05e295b64`; draft PR #25 was open, unmerged at `d72674e64570487af366d156a8e33ce05caccfca`. The local SD-020 checkout was clean. A separate `codex/icm-next-m0-m1` branch starts from main. Shell Git network transport was unavailable; the connected GitHub API supplied remote observations.

## Frozen requirements

1. M0 maps all meaningful legacy authority, security, privacy, independent review, CI, recovery, product and Release controls to a verified source and disposition. No silent retirement.
2. M1 copies the ten authored target files under `engineering/`, with only grounded source, path and minor editorial corrections. All root/stage/router/runtime/task-parser and product files remain unchanged.
3. Verify source anchors, founder text fidelity, file/link/schema consistency, all 25 adversarial design scenarios, current CLI semantics and applicable repository checks. Separate documentation proof from runtime-only gates.
4. Obtain a distinct reviewer and hosted exact-head `verify`, CodeQL and Dependency Review where available. Integrate only if actual protections and review rules permit; otherwise leave PR pending.
5. Preserve PR #25 and old ICM fallback. Recommend M2 only as a proposal.

## Approach and impact

The M0 matrix is the source-level audit and records unresolved cutover parity. The nine other `engineering/` files are copied directly from the supplied ZIP. Plan and Verify evidence live under their existing output directories. No application, CI, dependency, database, grant, script, credential or active policy file changes.

## Verification plan and stop conditions

Challenge matrix references and each of 25 scenarios independently; compare the nine unedited file hashes with ZIP `SHA256SUMS.txt`; check scope and links; run current read-only CLI, automation regression tests and relevant lint/typecheck/build checks. Inspect final Git tree and PR head. A docs-level PASS may coexist with runtime `NOT TESTED`. Stop merge for missing required hosted checks, reviewer approval, branch protection uncertainty or conflicting remote work. Never convert proposed state strings into live parser values.
