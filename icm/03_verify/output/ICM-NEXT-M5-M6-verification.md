# ICM Next M5/M6 foreground Verify — 2026-10-09

**Status:** `PASS WITH LIMITATIONS` for disabled local implementation; `M5_CUTOVER_BLOCKED` and `M6_HOST_BLOCKED` for activation. The coding agent rebuilt verification targets from the founder acceptance catalog and challenged the source after Build. This is a separate Verify stage, but it is not a distinct authenticated GitHub reviewer.

## Scope and source

Baseline local M2–M4 tree `a7d8e69da7a952e10e82d82518e8297d2e88ffbe` matches published PR #27 tree. The 15-entry ZIP passed its SHA-256 manifest. Ten of twelve copied founder `engineering/**` target files remain byte-identical; `M5_CUTOVER_CONTRACT.md` and `M6_MANAGEMENT_LOOP.md` have the required always-on clarification. Existing `OPERATIONS.md` has the same clarification. Root `AGENTS.md`, `CONTEXT.md`, V1 selector/grants, workflows and product code were not edited.

## Independent challenge and repairs

The M5 audit resolves all 1,105 M0 heading anchors and detects missing critical security/privacy/product/Release owners. The router proposal and reverse are SHA-bound and output-only. A disposable two-root-file rehearsal restores original bytes; old inspect CLI still runs. Real upstream PR integration and post-cutover rollback remain unverified. See `engineering/migration/M5_AUDIT_RESULT.md` and `M5_CUTOVER_REHEARSAL.md`.

The M6 challenge tested forged issuer, changed parent criteria, path traversal/symlink facts, protected paths, risk laundering, missing negatives, fabricated evidence, replay, exhausted/unknown budget, revocation, stale CI/reviewer, failed student journey, V1/V2 rejection, network outage and missed schedule. It repaired fail-open unknown rollback fields, revocation lease release, insufficient path exclusions and unbounded candidate data. All M6 positives remain fixture-only with `launchCapability: false`. See `engineering/assurance/M6_VERIFY_RESULT.md`.

## Commands and results

| Command | Result |
| --- | --- |
| `node --test tests/icm-next/m5-acceptance.test.mjs tests/icm-next/m6-acceptance.test.mjs` | 24/24 M5 and 50/50 M6 named intentions passed; six extra always-on negatives plus catalog/positive baseline passed. |
| `npm test` | PASS: 13 app, 67 legacy automation and 140 ICM Next tests. |
| `npm run lint`; `npm run typecheck`; `npm run build` | PASS after final source repairs. |
| `npm run test:audit-policy`; `npm run test:client-bundle-secrets`; `npm run test:e2e` | PASS: audit policy fixtures; 12 client bundles scanned; four Chromium primary-view tests. |
| `npm run audit:ci` | No vulnerability conclusion: exited 1 with `code undefined` in this shell. |
| `npm run test:e2e:security` | Did not start tests: local Supabase unavailable. |
| `git diff --check` | PASS for tracked diff; final staged diff and remote tree still require inspection before PR. |

Hosted #26 CI passed on its exact head, but #26 has no submitted review. #27 has zero hosted workflow runs while stacked on #26 and no submitted review. The new M5/M6 PR must stay stacked and unmerged until ancestors are safely integrated and final main-targeting CI plus independent review pass. No G1–G8 host gate has authentic PASS. No production Release is authorized.
