# SD-018 — Review Bundle Adoption Addendum

The original SD-018 Plan and Build handoffs remain historical evidence. Mike later supplied `schooldashboard_icm_review_bundle.zip` and `sd018_manager_mode_proposed.patch` as accepted SD-018 revision guidance. `REVIEW_AND_ADOPTION.md` was read before adoption. The SD-017 Product & Business Assurance guide and readiness register were deliberately excluded.

The SD-018 patch passed `git apply --check` after excluding its new `tests/icm-automation/fixtures.mjs` hunk, because that local fixture already existed. The existing fixture and test matrix were preserved. The bundle's fixture was added as `review-fixtures.mjs`, and its supplemental review suite was added without overwriting the original suite. The patch's global, router, task, automation contract, selector, report, and simulation changes were applied cleanly. A positive retry budget was corrected to stop at the exact consumed limit while a zero-retry grant still permits an initial attempt.

Revised behavior explicitly models protected integration pending/blocked, rejects unmet dependencies during recovery, honors stop-batch order, rejects cycles and changed grant-bound task definitions, allows zero retries, and checks fixture lock ownership on release. The report states that daily silence does not expand permission. These are synthetic advisory decisions only; no trusted writer, live grant loader, schedule, or Release was added.

## Fresh Build checks

- `npm run test:icm-automation`: 61 passed, 0 failed (28 original and 33 supplemental).
- `npm test`: 3 files and 13 Vitest tests passed.
- `npm run lint`: passed with no warnings after task-local cleanup.
- `npm run typecheck`: passed.
- `npm run build`: passed.
- `npm run audit:ci`: passed using the existing narrow, dated development-only advisory exception; no audit policy changed.
- `npm run test:audit-policy`: passed.
- `git diff --check`: passed.
- `node scripts/icm-automation/cli.mjs report`: real read-only pilot observed the SD-018 branch at `3bb24001a377dacba013deda293b6735bbb13caf`, dirty Build tree, 17 historical registry-completed IDs, one active SD-018 structured entry, and `NO AUTHORIZED WORK` because no external grant exists. Live GitHub/CI, usage, and cost were reported UNKNOWN/unavailable.
- Repeated `simulate.mjs twenty|interrupted|continue` calls selected only permitted synthetic work and recovered interrupted SD-108 before new selection.

The reporting command itself did not alter application files or task status. The working tree changes are this authorized SD-018 Build. The downloaded SD-017 draft files were not copied into the repository. Independent Verify and protected PR/CI integration remain pending.
