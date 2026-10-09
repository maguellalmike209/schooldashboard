# M2 offline Verify result — 2026-10-09

**Gate: M2_OFFLINE_VERIFIED (fixture behavior only).** Source baseline: remote M1 `b650e5d6d20dac129cc3b911722d685ce43f41dc`, tree `89dcd462e7409aeee0e2acf4984769d4f4ea6210`; local WIP branch `codex/icm-next-m2-m4` uses the identical baseline tree. Final published source commit will be recorded in the M4 manager report. This report is by the coding agent's separate adversarial pass; no independent human or GitHub approval is claimed.

## Executed evidence

| Command / challenge | Observed result | Proof class |
| --- | --- | --- |
| `npm run test:icm-next` | Final combined M2–M4 suite: 58/58 PASS; E01–E26 each executed, plus schema, transitions, adapter, Master Verify, determinism and forged App ID/budget negatives | LOCAL OFFLINE |
| `npm test` | Final run: 13 app + 67 SD-018 + 58 ICM Next = 138 tests PASS | LOCAL REGRESSION |
| `npm run lint` | Final run: PASS, zero warnings | LOCAL STATIC |
| `npm run typecheck` | PASS | LOCAL STATIC |
| `npm run build` | PASS | LOCAL BUILD |
| `npm run test:audit-policy` | PASS synthetic audit-policy rejection fixtures | LOCAL SUPPLY-CHAIN POLICY |
| `npm run audit:ci` | Could not complete in this network-restricted shell (`code undefined: Exiting...`); hosted Dependency Review on exact PR head is required | LOCAL CHECK UNAVAILABLE |
| `npm run test:client-bundle-secrets` | PASS, 12 built bundle files | LOCAL STATIC |
| `node scripts/icm-next/cli.mjs simulate --fixture tests/icm-next/fixtures/basic.json` | `SELECT_BOUND_ITEM`, `externalAuthorization: UNVERIFIED`, `confidence: VERIFIED_FIXTURE` | LOCAL SYNTHETIC |
| `node scripts/icm-next/cli.mjs simulate --fixture AGENTS.md` | Rejected with exit 2 | LOCAL NEGATIVE |
| `node scripts/icm-automation/cli.mjs inspect` | `NO AUTHORIZED WORK`; WIP checkout accurately reported dirty; remote status UNKNOWN | LOCAL LEGACY FALLBACK |

## Adversarial findings and repairs

The first source challenge found that dirty recovery needed matching journal evidence, full admission bounds had to be rechecked during recovery, and hosted check App IDs had to match the frozen required list. Later adversarial review also found a schema `pattern` type gap, multiple-active-outcome ambiguity and dependency ordering; these were repaired and the affected suite rerun. A claimed completed outcome with unfinished work now waits for Master evidence. Cross-record parent/digest edits and journal contradictions stop. Candidate proposals contain `executable: false`; no module in the pure engine path launches a worker, issues a grant or writes to GitHub.

## Limits

The admission and reviewer observations are explicitly synthetic caller fixtures. Record schema validation, hashes and source references do not authenticate founder approval. Hosted checks on the eventual M2–M4 PR, actual independent reviewer approval, installed-host identity and connector isolation are pending. M2 creates no live selection, scheduler or write authority. The M3 host ledger remains UNKNOWN until real protected identities can be tested.
