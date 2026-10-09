# M3 security diagnostics Verify result — 2026-10-09

**Verdict: M3_DIAGNOSTICS_PREPARED.** The diagnostics, disposable-canary probe, read-only GitHub observer, proof ledger and owner runbook exist. No installed Windows identity, protected ACL, native Scheduled capability or connector denial was proven. G1–G8 therefore remain UNKNOWN and block any M5 activation claim.

## Executed evidence

| Check | Result | Class |
| --- | --- | --- |
| `node --test tests/icm-next/m3-diagnostics.test.mjs` | 7/7 PASS; S01–S10 intentions exercised where safely representable | FIXTURE |
| Fake parent/descendant lock rehearsal | Second independent Node process received `EEXIST` while fake descendant held disposable lock | FIXTURE, not installed host |
| `node scripts/icm-next/m3-cli.mjs inventory` | Windows 11 Home `10.0.26200`; current shell SID `S-1-5-21-366693111-3014295117-2025121632-1005`; `codex-cli 0.160.1`; `codex exec --help` observed | READ_ONLY HOST |
| GitHub PR #26 exact head | `b650e5d6d20dac129cc3b911722d685ce43f41dc`; `verify`, CodeQL and Dependency Review succeeded with required App ID 15368; no submitted reviews | READ_ONLY GITHUB |
| GitHub PR #25 exact head | `d72674e64570487af366d156a8e33ce05caccfca`; same three required checks succeeded; still separate open draft, no submitted reviews | READ_ONLY GITHUB |
| `main` protection summary | Required contexts/App ID 15368 observed, canonical SHA `8c4c8e558d437d2874dbb1365f3d69c05e295b64` | READ_ONLY GITHUB |
| Detailed protection and rulesets | Protection endpoint 403 `Resource not accessible by integration`; rulesets list empty; reviewer/bypass/force-push settings UNKNOWN | READ_ONLY GITHUB LIMIT |

The first fake-child test failed because the harness did not wait for lock acquisition, then because its timeout handle kept the parent alive. The harness was corrected and the full M3 test was rerun green. A failed harness does not establish OS isolation. No real secrets, ACL changes, admin actions, broker install, credential provisioning or active schedule were used.

## Later founder-controlled proof

Use the bounded `M3_OWNER_RUNBOOK.md` under intended SIDs and disposable canaries. Record actual negative access, connector denial, process-tree containment, revocation, protected GitHub reviewer/bypass policy and an independent reviewer before considering M5. Neither this script success nor `codex exec --help` changes the G1–G8 statuses.
