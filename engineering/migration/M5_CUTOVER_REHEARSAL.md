# M5 cutover and rollback rehearsal — 2026-10-09

**Result:** `M5_IMPLEMENTATION_VERIFIED / M5_CUTOVER_BLOCKED`. The root router was not changed. The proposed replacement and reverse content are reviewable in `M5_ROUTER_PROPOSAL.md` and are SHA-bound in `M5_SOURCE_MANIFEST.json`. No operational rollback was attempted.

## Frozen source and scope

- Baseline local commit `9eb779099d5e284d962d9389723de60ba26d9220`, tree `a7d8e69da7a952e10e82d82518e8297d2e88ffbe`; this tree matches the previously published PR #27 head tree, while its commit SHA differs.
- Live canonical `main` observed at `8c4c8e558d437d2874dbb1365f3d69c05e295b64`. PR #26 head `b650e5d6d20dac129cc3b911722d685ce43f41dc` is open with hosted jobs but no submitted review. PR #27 head `10d535f192bad252294fe34ac7585830f5fd9284` is open, stacked on #26, with no hosted workflow runs or submitted reviews. PR #25 is a separate open draft.
- Proposed change scope is exactly two root paths. No apply function exists in the cutover or rollback modules. The current two root hashes remain `f76bdc...386` and `3f5b69...72c` respectively; full hashes are in the proposal and manifest.

## Executed fixture challenge

- `node --test tests/icm-next/m5-acceptance.test.mjs`: M5-01..24 all passed in the final targeted run.
- The M0 matrix's 1,105 heading anchors resolve to current source headings. Seven critical family destinations for authority, isolation, privacy, student value, recovery, CI and Release are present; injected removal of security, Release or product owner content fails audit.
- Existing M4 frozen replay on local source: 35 comparisons, 29 equivalent-safe, five stricter-safe, zero unsafe, one deliberately not comparable and denied. This is **not** an integrated-main replay.
- On a disposable temporary copy, replacing both root files with proposed bytes and restoring the reverse proposal returned both original SHA-256 values byte for byte. Dirty root and unfinished/unknown child, pending PR/review and missing operator authority each block rollback readiness.
- The original `scripts/icm-automation/cli.mjs inspect` still exited successfully after the rehearsal. This proves fallback in the current checkout, not a post-cutover production restore.

## Review and activation boundary

The coding agent performed the local source/test challenge. No distinct GitHub reviewer approved this M5 implementation or the proposed root patch. Current PR #26/#27 integration and final main-targeting exact-head CI are pending. The M0 matrix itself says cutover parity was pending; this rehearsal does not turn source-heading coverage into full replacement proof. The 83-section old Release manual remains preserved and explicitly reachable from the proposed router. Real G1–G8 are UNKNOWN; that blocks any writer, while policy-only candidacy requires its own separately proven upstream and review gates. A separate authenticated founder YES is required for the root switch after those gates.
