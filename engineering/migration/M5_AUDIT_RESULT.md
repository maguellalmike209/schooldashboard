# M5 Master Architecture Verify — 2026-10-09

**Technical verdict:** `M5_IMPLEMENTATION_VERIFIED` in SHADOW. **Integration/cutover verdict:** `M5_CUTOVER_BLOCKED`. This is a separate source-and-evidence challenge after Build, conducted by the same coding agent; it is **not** an independent GitHub approval or an authenticated second reviewer.

## Requirement versus observed implementation

| Requirement | Independent challenge and result |
| --- | --- |
| No legacy control disappears | Active `AGENTS.md`, `CONTEXT.md`, all four old stage manuals, SD-018 selector, product/security/privacy docs, CI workflows and Release instructions remain unchanged. The M0 matrix has 43 family rows and 1,105 heading anchors; all anchors resolve to actual current headings. Static destination-owner checks pass for authority, isolation, privacy, student control, recovery, CI and Release. Full post-cutover behavioral parity remains unproven and cannot be inferred from headings. |
| Exact source and proposal | `M5_SOURCE_MANIFEST.json` pins 42 source files, the verified ZIP manifest digest and two before/after router hashes. `M5_ROUTER_PROPOSAL.md` shows the complete proposed short routers. The implementation exposes text/hash proposals only. |
| Old evidence survives | `legacy-compat.mjs` preserves SD IDs, source hash, PR pending and unresolved status, while all mappings say `NOT_AUTHORIZED_BY_MIGRATION`. Done without exact integration evidence and unknown IDs stay unresolved. V1 files were not edited. |
| Rollback and recovery | Disposable two-file copy restored both original SHA-256 hashes. Unknown/dirty/unfinished/pending/unauthorized rollback states are blocked. Original CLI inspect still runs. Real active rollback is untested and needs a separate authorized operator. |
| Selection parity | Frozen M4 catalog replay yielded 29 equivalent-safe, five stricter-safe, zero unsafe, one not comparable denied. An injected old-deny/new-select mutant is classified unsafe. The replay is local against the unintegrated stacked source, not canonical main. |
| Protected integration | Live GitHub `main` is `8c4c8e558d437d2874dbb1365f3d69c05e295b64`. #26 is open with successful hosted `verify`, CodeQL and Dependency Review on `b650e5d6d20dac129cc3b911722d685ce43f41dc`, but zero submitted reviews. #27 is open and stacked on #26, with zero workflow runs/reviews on `10d535f192bad252294fe34ac7585830f5fd9284`. #25 is an unrelated open draft. Candidate eligibility therefore fails. |
| Separate decisions | No root file was edited, no writer installed and no grant/schedule issued. M5 policy routing, M6 live writer and production Release retain distinct later decisions. |

## Acceptance accounting

`M5-01..24`: **24 fixture/local intentions PASS, zero FAIL** in the named acceptance suite. M5-02/03/19/23 are observed as blocked in live GitHub even though their negative fixture assertions pass. Integrated-source replay, independent GitHub root-patch review and a real activated rollback are **UNTESTED**. A direct assertion of `CUTOVER_CANDIDATE` would be false.

The source challenge also found and repaired two fail-open modeling edges before final Verify: rollback observation fields now require explicit known-safe values, and the cutover preflight can only return simulated criteria, never an actual candidate authorization. Critical heading-owner checks cannot be disabled by an optional caller family list. The final targeted M5 suite passes after these repairs.

## Next gate

Obtain actual distinct review and permitted integration of #26, then reconcile #27 to `main` without destructive history edits, run required exact-head hosted checks and distinct review, and repeat M4/M5 Master Verify on the integrated source. Only then present the pinned router patch and rollback to the founder for a separate cutover decision.
