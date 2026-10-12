# AI-first review governance — verification record

**Status:** local policy/fixture verification; protected PR integration pending.
**Risk:** R3 governance-sensitive. **Source:** founder-approved 2026-10-11
attachment SHA-256
`c6989cedf7530a0ce4139dbedee8b8dbf74307ddf86262cae6bccbbc419e1b28`.
**Baseline canonical main:** `8c4c8e558d437d2874dbb1365f3d69c05e295b64`.
This is evidence about policy content and disabled fixtures, not a trusted
reviewer attestation or GitHub approval.

## Independent observations and limits

- Connected GitHub reports `main` protected with required `verify`, `CodeQL`,
  `Dependency review`, each bound to Actions App 15368. Detailed protection
  read returned 403. The attachment's founder-supplied screenshot says required
  approvals OFF at its observation time; the **current effective count and
  bypass settings remain UNKNOWN** to this connector. No rule was changed.
- At observed exact heads, #26 `b650e5d6d20dac129cc3b911722d685ce43f41dc`
  has all three required successful App-15368 checks (and a separate App-57789
  CodeQL result). #27 `10d535f192bad252294fe34ac7585830f5fd9284`,
  #28 `0ba357174480cb3aecbf16424763fb5bb61a2cb3` and #29
  `c77798ad191a82617447751ac34fc9a6983bd6a9` have zero check runs.
  #25–#29 have zero submitted GitHub reviews. #27→#28→#29 still target their
  predecessor branches; no ancestor was merged or retargeted.
- Live root ICM is still active. The shadow governance diff is local on
  `codex/icm-next-ai-review-shadow` tree
  `d7d876784ccc908dbe511f2f16466a9a7d48d956`, preserving #29's original
  tree and historical M5 manifest with an explicit source-delta record. The
  shadow branch was **not published**: automatic publication review rejected
  creating a public descendant of #29 due existing sensitive readiness
  material. Two proposed edits to those readiness evidence files were removed
  from the diff. No attempt was made to bypass that rejection.
- The M5/M6 offline code still models GitHub approval as an unconditional
  fixture requirement. This is disabled shadow behavior, not a live merge gate.
  It requires reconciliation and fresh tests before any later root cutover or
  trusted host use; this policy PR does not claim runtime enforcement parity.

## GV01–GV16 adversarial scenarios

Command: `node --test tests/icm-automation/ai-review-governance-fixture.test.mjs`.
**16/16 PASS as disabled decision fixtures.** A fixture PASS means the modeled
decision rejects or allows the supplied synthetic case; it is not a live
GitHub, host, security or merge probe.

| ID | Executed challenge and observed decision | Proof class / live limit |
| --- | --- | --- |
| GV01 | R0/R1, no native approval required, separate review + checks → manual eligible; auto merge false | Fixture; actual approval setting still 403/UNKNOWN |
| GV02 | Missing, stale-head, failed and wrong-App checks → blocked | Fixture; #26 real checks pass, #27–#29 absent |
| GV03 | Builder review claim → separate-review insufficient | Fixture; report provenance must be observed separately |
| GV04 | Simulated missed security regression with negative gate failure → blocked | Fixture; no app regression inserted |
| GV05 | Protected-control edit without material approval → blocked | Fixture; this PR is itself R3 and founder-accepted |
| GV06 | Auth/provider effect mislabeled R0 → security negative blocks | Fixture; classification by effect in live/shadow policy |
| GV07 | Review at previous SHA → blocked | Fixture; final PR head review still pending |
| GV08 | New scope without founder decision → blocked | Fixture; Release not exercised |
| GV09 | Native approval required by effective rule but absent → blocked | Fixture; live detailed rule UNKNOWN |
| GV10 | Author approval or PR-text `APPROVED` → blocked | Fixture; zero real submitted reviews |
| GV11 | Separate model review without protected host → advisory, auto merge false | Fixture; no verifier host installed |
| GV12 | R3 private-data cross-user negative fails → blocked | Fixture; no production/student-data change |
| GV13 | Green PR with failed student journey → milestone closure false | Fixture; actual Master Verify remains phase-specific |
| GV14 | AI reviewer unavailable → insufficient evidence | Fixture; no trusted AI-review service exists |
| GV15 | Host G1–G8 unknown → no writer/schedule authority | Fixture plus repository observation; no host PASS claimed |
| GV16 | Policy PR tries to use its own proposed rule → blocked | Fixture; existing protection and founder manual decision govern this PR |

## Repository checks

| Check | Result | Limit |
| --- | --- | --- |
| `git diff --check` | PASS | Policy branch working diff |
| `npm run lint` | PASS | No code lint errors |
| `npm test` | PASS: 13 app + 83 automation/fixture tests, including GV01–GV16 | First two runs failed on sandbox temp SSR file; rerun with workspace-local `TEMP`/`TMP` passed; temp directory removed after checks |
| `npm run typecheck` | PASS | Generated route types, TypeScript |
| `npm run build` | FAIL locally | Turbopack PostCSS helper exited before connection; same local failure class recorded in #29, no source error shown |
| `npx next build --webpack` | PASS | Production compile and route generation |
| `npm run test:audit-policy` | PASS | Synthetic advisory-policy cases |
| `npm run test:client-bundle-secrets` | PASS | 34 built client files |
| `npm run test:icm-next` on shadow branch | PASS: 143/143 after preserving historical M5 manifest via source delta | Offline/fixture only; hosted checks absent on stacked heads |

## Separate source review

A separate read-only reviewer execution challenged the live diff and local
shadow branch. Its initial verdict was `NEEDS_REWORK` on an uncommitted
snapshot. It found ambiguous autonomous-merge wording in the live Verify
contract, omission of GV fixtures from `npm test`, a GV10 fixture comparing
against the literal string `author`, and shadow disabled code that still
requires a GitHub `APPROVED` event unconditionally. The first three were
repaired and the 83-test automation suite and lint rerun. On immutable live
commit `cdabd742ad79ab2f47fa2ee53eac2fc53d2e673b`, that reviewer found
**no remaining actionable source finding** and independently ran the committed
GV fixture (16/16). The shadow runtime discrepancy is now an explicit
M5 cutover/reuse blocker in the local shadow contract; 143/143 offline tests
pass. Policy-only integration cannot claim runtime enforcement is fixed. This
review is advisory from a separate agent using the shared workspace, not an
externally protected attestation or GitHub review.

Required hosted `verify`, `CodeQL` and `Dependency review` on the new
main-based PR's **final exact head** remain pending. This record update changes
that head after the separate source review, so its final text and diff need a
fresh scoped review before a technical review verdict can cover the final PR.
No `AI_REVIEW_PASS`, GitHub `APPROVED`, G1–G8 PASS, root cutover, autonomous
publisher, Master Verify completion or Release is asserted by this record.
