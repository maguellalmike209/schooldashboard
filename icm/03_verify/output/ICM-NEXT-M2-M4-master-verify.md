# ICM Next M2–M4 — Independent Master Verify record

## Result and provenance

**PASS WITH LIMITATIONS for the authorized shadow implementation; M4_SHADOW_PASS_HOST_BLOCKED.** The same coding agent separately reconstructed targets from the founder packet, M1 contracts, legacy source and active ICM, then challenged source, negative fixtures and replay. This is independent analysis in method, not an independent human, different credential or GitHub approval. Protected PR integration remains pending.

## Requirement-to-evidence challenge

| Requirement | Fresh evidence | Result / limit |
| --- | --- | --- |
| Old ICM functional and fallback | Existing 67 automation tests, live read-only `inspect`, source/diff review and P06/P07 unchanged-file assertions | PASS local |
| No unauthorized privilege expansion | E01/E04/E05/E08/E09/E20/E21/E25; direct CLI path denial; P03 unsafe mutant caught; zero replay unsafe | PASS offline; no host claim |
| Recovery and PR/CI before new work | E10–E15/E22/E26, interleaved A/B, C15–C23/C34 | PASS synthetic |
| Separate task Verify and Milestone Master Verify | E16–E19, C24–C26; green CI plus failed Course journey yields NEEDS_WORK | PASS synthetic |
| Security, privacy, product-readiness, Release and root policy retained | Diff scope excludes all active root/stage/product/security/privacy/Release files; original required CI scripts still run | PASS source scope |
| Authentic host and GitHub governance | M3 ledger G1–G8 UNKNOWN; current shell inventory only; protection detail 403, reviewer approval absent | BLOCKS M5 |
| Reproducible decisions | 35 frozen fixtures, exact source hashes and 10 byte-identical reruns | PASS offline |
| Legacy vs new safe parity | 29 equivalent, five controlled stricter, zero unsafe, one noncomparable denied | PASS shadow with limitation |

## Repairs and remaining gates

Adversarial review repaired dirty recovery without journal, incomplete recovery admission, unpinned hosted check App list, pattern/type validation, dependency ordering, multiple-active-outcome selection, and the M3 ledger's potential self-attested PASS. Relevant tests were rerun after each repair. No accepted founder requirement was weakened. Actual host isolation, owner/admin GitHub governance, independently authenticated reviewer approval, and hosted checks on the final stacked PR head remain open; no M5 readiness claim is made.

## Integration boundary

Final local commands: `npm test` (138 passing tests), `npm run lint`, `npm run typecheck`, `npm run build`, `npm run test:audit-policy`, `npm run test:client-bundle-secrets` and `npm run test:e2e` (four browser tests) passed. `npm run audit:ci` did not return a vulnerability result under restricted registry access. `npm run test:e2e:security` stopped before tests because local Supabase was unavailable. These two local gaps remain explicit pending hosted checks.

The local checkout began at tree `89dcd462e7409aeee0e2acf4984769d4f4ea6210`, matching open PR #26's remote exact head tree. Shell Git SSH/HTTPS transport was unavailable; publication must create the remote stacked branch from PR #26's exact SHA and upload only this task's verified tree. PR #25 remains separate. No canonical-main merge or Release is authorized by this verification.
