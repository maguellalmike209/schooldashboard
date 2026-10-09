# M4 shadow replay Verify result — 2026-10-09

**Verdict: M4_SHADOW_PASS_HOST_BLOCKED (local offline).** No M5 cutover, live writer, schedule or M6 child execution follows. The coding agent conducted the adversarial source and diff review; no independently authenticated human or GitHub review is claimed. Hosted final-head PR checks remain a separate integration gate.

## Frozen replay evidence

- `node scripts/icm-next/shadow-cli.mjs replay --fixture tests/icm-next/fixtures/shadow-catalog.json` executed 35 static synthetic old/new comparisons. The machine result is `M4_REPLAY_RESULT.json`; the fixture catalog is `tests/icm-next/fixtures/shadow-catalog.json`.
- Classifications: 29 `EQUIVALENT_SAFE`, five `STRICTER_SAFE` (C29–C33), zero `UNSAFE_REGRESSION`, zero `UNKNOWN`, one `NOT_COMPARABLE` (C35 deliberately changes only the new-side time and yields `DENY_UNKNOWN`). The five stricter cases are intentional negative perturbations: missing host fixture, altered frozen criteria, lower new budget, forbidden Release operation and contradictory journal. They do not imply ordinary authorized work is slower on the equal baseline C01.
- Legacy source file SHA-256: `fb285993a05edec7b475f07efa5b90dc13d1f3b2a849c88a935383fb2bfc4f9f`. New engine file SHA-256: `a76ac7afa9773e681288da90b83a1822c16b421f4330cdcbb42cbfb33149f38e`. PR #26 baseline SHA: `b650e5d6d20dac129cc3b911722d685ce43f41dc` (stacked, not main).
- All six legacy decision families and all nine new decision enums occurred in executed comparisons. P01–P08 intentions were asserted in `shadow-replay.test.mjs` and `shadow-differences.test.mjs`; an injected `STOP → SELECT_BOUND_ITEM` mutant is classified `UNSAFE_REGRESSION`.
- Ten repeated catalog evaluations returned byte-identical JSON. Replay kept frozen fixture objects, root `AGENTS.md`, `CONTEXT.md`, legacy `core.mjs` and `.git/HEAD` unchanged. The old `inspectState` still returned `SELECT` on its admitted synthetic baseline and `NO AUTHORIZED WORK` without a real grant. Actual source and PR mutation are outside the replay path.

## Master Verify scope

Final local regression commands after the last source repair: `npm test` (13 app + 67 legacy + 58 ICM Next = 138 PASS), `npm run lint` (zero warnings), `npm run typecheck`, `npm run build`, `npm run test:audit-policy`, `npm run test:client-bundle-secrets` (12 generated client bundle files), and `npm run test:e2e` (four browser checks) all passed. `git diff --check` passed. `npm run audit:ci` exited without a vulnerability result because its registry call failed in the restricted shell. `npm run test:e2e:security` stopped before tests because local Supabase was unavailable. These two local gaps require hosted verification on the exact PR head.

The M0/M1 shadow baseline remains PR #26 open; PR #25 is an unrelated open draft. The M2 pure engine and M3 diagnostics do not alter the active router, legacy parser/grant, product code, security/privacy documents, CI workflows or separate Release controls. Candidate generation stays proposal-only; task Verify, exact-head PR/CI evidence and frozen end-to-end Milestone Master Verify are distinct. The Course-save/cross-user negative example fails Master Verify when the journey fails despite green item PR evidence.

The legacy inspector has no check App identity or Milestone Master Verify field; replay preserves that limitation and compares execution safety, not equivalent product assurance. The C35 unequal-time fixture is explicitly noncomparable and denied. Actual Windows G1–G8 remain UNKNOWN, and detailed protected-main governance returned 403. These block M5 activation. Usage/cost telemetry is UNKNOWN because no scheduled run or paid worker occurred. Final hosted checks and GitHub reviewer state must be observed on the published M2–M4 PR head.

## Fallback and recovery

**LEGACY_FALLBACK_UNCHANGED:** retain root routing and use current SD-018 `inspect|report`; the shadow modules are inert unless explicitly invoked with marked test fixtures. If final PR checks fail or the M1 base changes, stop integration, preserve this branch and rerun against the reconciled exact head. Do not merge the stacked PR or promote this report to canonical-main integration evidence.
