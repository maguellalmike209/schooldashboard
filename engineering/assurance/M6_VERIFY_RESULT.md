# M6 Master Delegation Verify — 2026-10-09

**Technical verdict:** `M6_OFFLINE_VERIFIED / M6_HOST_BLOCKED`. This is a separate adversarial source/test review after Build, conducted by the same coding agent; it is **not** an authenticated independent reviewer or a live broker security attestation.

## Frozen contract challenge

The founder-authored V2 JSON Schema is copied under `engineering/contracts/`. `delegation-v2.mjs` validates its closed shape and semantic bounds: unique milestones/check names, UTC ordered expiry, finite count and wall limits, safe paths, allowed classes and no Release. A valid shape alone denies without a matching **fixture** issuer binding. The only positive admission is `ADMIT_FIXTURE`, explicitly `OFFLINE_ONLY` with `launchCapability: false`. No live issuer authentication, key, receipt, worker or publisher was added.

The candidate evaluator compares frozen outcome/milestone digests, exact parent repository/branch, bounded acceptance with a negative target, candidate digest, task kind, risk, operations, path facts, independently classified fixture effects and verified fixture evidence. Protected policy/CI/authority files are categorically denied. Changed digests, malicious paths, fabricated refs, new providers, RLS/auth, Release and unknown budgets deny or remain candidate-only. Free-text relevance cannot be independently proven by this code, so host activation still requires a protected classifier and exact approval for ambiguity.

`selectDelegatedWork()` checks parent state, current external/network evidence, exclusive lease and child-tree state before recovery-first selection. An unfinished item outranks a new candidate, another item's integration does not resolve it, and an entire completed outcome selects no new work. The fixture ledger models sequence-checked single-child reservation, replay/digest conflict and retained lease on unknown descendants or revocation. It is not an atomic OS/host ledger; two genuinely concurrent processes were **not** proven safe. V1 exact-ID code remains untouched and version mismatch denies both directions.

`management-review.mjs` emits no report without an observed invocation. It distinguishes verified student value from proposals, limits material decisions to three and emits `UNKNOWN` for unobserved resources. A model report cannot renew a founder grant. The intended deployment assumes one always-on Windows host, with missed ticks creating no catch-up work and outages stopping unsupported writes.

## Acceptance and check evidence

- `M6-01..50`: **50 named fixture intentions PASS, zero FAIL**. Six additional negative/recovery/report checks cover outage, overlapping trigger, restart, founder silence, revocation lease and actual-invocation-only reporting. The full M6 targeted file has 58 passing tests including catalog integrity and one positive offline baseline.
- `npm test` passed 13 app tests, 67 legacy automation tests and 140 ICM Next tests after the final source-hardening edits. `npm run lint` and `npm run typecheck` also passed after those edits. Final exact-head hosted CI remains required.
- `npm run build`, audit-policy fixture validation, client bundle secret scan and four primary-view Chromium E2E tests passed locally; these product/CI surfaces did not change in the final delegation hardening.
- `npm run audit:ci` returned exit 1 with `code undefined`, so no local vulnerability conclusion is claimed. `npm run test:e2e:security` stopped before tests because local Supabase is unavailable. Hosted #26 checks cannot be reused as M6 proof.

## Real host and integration proof

The actual M3 G1–G8 ledger remains **UNKNOWN for every gate**. G1 protected owner grant/code/ACL; G2 request-only trigger; G3 restricted worker/connector; G4 OS lock/process containment; G5 publisher/main/reviewer policy; G6 separately authenticated QA; G7 atomic external budget/revoke; G8 trusted journal and actual scheduler reporting are all untested on the intended identity. M6-24, M6-28/29 and M6-35..37/45 have passing *fixture denial* tests but their HOST/GITHUB side is **UNTESTED**. A real parallel writer, mid-run revoke, Windows junction escape, direct GitHub plugin denial and hosted exact-head QA have not been exercised.

No M6 grant, credential, schedule, worker launch, OS permission, GitHub rule or production resource was created or changed. Current code is disabled and must remain so until G1–G8, protected integration and a separate founder-controlled canary decision are actually proven.
