# SD-018 — Build Handoff

## Build status and risk

READY FOR VERIFY. R3 process authorization boundary; the delivered pilot is read-only and the writer is disabled.

## Packages completed

- WP-01: `icm/automation/CONTEXT.md` defines authority, recovery-first order, checkpoint, single writer, budgets, safe stops, Manager Review, and the saved read-only prompt.
- WP-02: `scripts/icm-automation/cli.mjs inspect` observes checkout, branch, HEAD, dirty state, origin URL, local tracking, structured tasks, historical completed IDs, and artifact names. Canonical remote/hosted CI remains UNKNOWN without live evidence.
- WP-03: `core.mjs` strictly validates synthetic task, grant, and checkpoint records, binds grant to task definitions, and selects recovery before new work. Fixture-only exclusive lock uses atomic `wx` creation.
- WP-04: `report.mjs` generates seven brief Manager Review sections with explicit unknown resource and integration evidence.
- WP-05: 24 requested adversarial cases plus schema, report, legacy dependency, and work-bound cases are in Node's built-in test runner.
- WP-06: Root router, global invariant, and SD-018 task metadata were integrated. Existing ICM stage contexts and `docs/DECISIONS.md` did not need changes.

## Checks and pilot evidence

- `npm run test:icm-automation`: 28 tests passed, 0 failed after the final logic changes.
- `node --check` passed for all five automation scripts; `git diff --check` passed.
- Real `node scripts/icm-automation/cli.mjs inspect` observed `maguellalmike209/schooldashboard`, branch `codex/sd-018-scheduled-autonomy-foundation`, HEAD `3bb24001a377dacba013deda293b6735bbb13caf`, a dirty Build checkout, 17 registry completed IDs, one active structured SD-018 entry, and 18 verification artifact filenames. Upstream and live canonical remote were UNKNOWN. No external grant was supplied, so decision was `NO AUTHORIZED WORK`.
- Real `report` produced a seven-section Manager Review. Reporting did not edit application files or task status.
- `simulate.mjs twenty` selected only `SD-100` among 20 permitted IDs on repeated calls; `interrupted` recovered `SD-108` at Build on repeated calls; `continue` selected `SD-101` only after synthetic verified integration of `SD-100`.

The existing `node_modules` lacked a Vitest executable before Build. `npm ci` could not replace a locked native binary, so the isolated test-tool install was removed and the SD-018 suite uses Node's built-in runner. Hosted CI must still run its normal locked install and full checks.

## Verify targets and limitations

Independently challenge task/grant parsing, task digest behavior across status changes, checkpoint reconciliation, dependency and integration gates, blocked-task skipping, lock contention, Git observation, report accuracy, and no-write pilot. Inspect every task file and the final diff. The fixture lock is not validated in an actual unattended runtime. The CLI intentionally cannot accept an external grant or execute writes. Live GitHub/CI status and usage/cost are not inferred from local Git. No cadence, schedule, Release, or unattended writer is enabled.
