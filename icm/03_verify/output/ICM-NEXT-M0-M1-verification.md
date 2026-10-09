# ICM Next M0 + M1 — Task-Scoped Verify

## Result and independent actor

**Local documentation integration: PASS. Protected PR integration: PENDING.** A separate read-only reviewer agent independently inspected the ZIP, packet, live legacy sources, all 25 scenarios and final matrix, challenged two incorrect source anchors and missing nested-heading coverage, then rechecked the repairs. This is a separate analytical review, **not** an independently enforced GitHub reviewer approval. No runtime, host isolation or cutover PASS is claimed.

## Baseline, scope and acceptance

Canonical main and branch base: `8c4c8e558d437d2874dbb1365f3d69c05e295b64`. SD-020 PR #25 independently remained open/draft/unmerged at `d72674e64570487af366d156a8e33ce05caccfca`, 21 changed files, no submitted reviews. The requested phase permits only `engineering/**` plus task-scoped Plan/Verify evidence. Current root `AGENTS.md`, `CONTEXT.md`, ICM manuals, grant/parser/runtime, workflows, task registry, product code and Release sources are unmodified.

## M0 result

The 43 founder-seed control families were retained and corrected. The audit indexes 1,105 exact headings across 13 live ICM/decision/task/security/privacy sources; an independent line-and-title check found all anchors valid after repair. The only omitted headings are 13 document titles. Existing product, architecture, implementation, threat-model, security-testing, CI, SQL RLS, automation source/tests and PR #25 are mapped separately. The nonexistent seed path `docs/SECURITY.md` was corrected to `docs/SECURITY_REQUIREMENTS.md`.

**Verdict:** `M0 PASS FOR SHADOW M1`. No live control was removed. The concise proposed Release text does not replace the existing detailed Release manual; detailed cutover parity, host enforcement, branch-rule settings and future dynamic delegation remain pending.

## M1 result and fidelity

Eight authored files outside the matrix match the supplied ZIP SHA-256 sums exactly. `engineering/README.md` differs only by replacing two Markdown hard-break trailing spaces with paragraph breaks to pass diff whitespace validation. The matrix preserves the author seed A/S/R IDs and adds factual source anchors, dispositions, source coverage, risk, negative-proof obligations and explicit deferrals. No other authored target file was edited. README/CHARTER/POLICY/DELIVERY/QUALITY/OPERATIONS/PRODUCT_OUTCOMES/STATE_AND_SCHEMA/CUTOVER_AND_ACCEPTANCE remain shadow design only. No current task status, parser enum, grant schema, launcher or schedule was changed.

## Checks performed on the M0/M1 branch

| Check | Result | Scope/limit |
| --- | --- | --- |
| 1,105 source-heading line/title anchors | PASS | Baseline files at `8c4c8e5`; not future parity proof |
| Nine authored-file SHA-256 comparisons | PASS WITH EDITORIAL DEVIATION | Eight byte-identical; README paragraph whitespace only |
| `npm run lint` | PASS | Local checkout |
| `npm test` | PASS | 13 Vitest plus 67 SD-018 automation tests |
| `npm run typecheck` | PASS | Local checkout |
| `npm run build` | PASS | Local checkout |
| `npm run test:audit-policy` | PASS | Synthetic exception policy fixtures |
| `npm run test:client-bundle-secrets` | PASS | 12 built client bundle files |
| `node scripts/icm-automation/cli.mjs inspect` | PASS | Reports `NO AUTHORIZED WORK`, no active grant; sees dirty task checkout |
| `node scripts/icm-automation/cli.mjs report` | PASS | Factual actual invocation; GitHub/usage unknown, no fabricated completion |
| Hosted `verify`, CodeQL, Dependency Review | PENDING | Must be observed on final PR head |
| Protected reviewer/branch governance | UNKNOWN | No independent GitHub approval or ruleset evidence yet |

The current workflows still define the hosted `verify`, CodeQL and Dependency Review jobs. Docker/Supabase and browser/security E2E are not claimed locally; hosted `verify` is the required enforcement for the final PR. No dependency or executable code changed.

## Diff and residual gates

The final diff must contain only ten `engineering/` files and this phase's Plan/Verify artifacts. Recheck that scope, remote main and PR #25 before publication. A distinct GitHub reviewer approval is not supplied by an agent role label. Do not mark integration Done or merge unless exact-head hosted checks, actual review and branch policy permit it. Old ICM remains the fallback without any router change.
