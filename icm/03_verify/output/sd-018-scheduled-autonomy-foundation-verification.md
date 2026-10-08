# SD-018 — Scheduled Autonomy Foundation & Manager Mode Verification

## Status

**Scoped technical PASS.** Independent review found the authorized read-only
foundation consistent with the accepted SD-018 requirements. Protected PR and
hosted CI integration are still pending, so SD-018 remains **In progress** and
must not be marked Done on this local result alone.

This result does not approve or establish unattended repository writing, a live
recurring schedule, a trusted external grant loader, runtime lock enforcement,
or Release authority.

## Independent verification scope

The reviewer reconstructed the requirements from Mike's SD-018 authorization,
the task Plan, `icm/03_verify/CONTEXT.md`, the automation operating contract,
`docs/TASKS.md`, and the current repository diff. The review inspected the
selector, Git inspector, CLI, report generator, simulations, fixtures, and both
test suites. Build claims and Build-authored tests were treated as hypotheses.

The final diff is confined to SD-018 process documentation, the automation
scripts and tests, and the package test command. No SchoolDashboard application
behavior, production infrastructure, ReviewTap, or SD-017 file was changed.

## Findings and repair rechecks

Independent probes initially exposed five defects. Build repaired them before
this PASS, and the reviewer reran the original probes against the final code:

1. Invalid invocation time previously selected a task because `Date.parse`
   produced `NaN`. It now returns `STOP`.
2. An `integrated` checkpoint with only Plan evidence previously resumed Build.
   It now returns `STOP` for contradictory checkpoint state.
3. A valid Build checkpoint paired with `Not started` registry status previously
   restarted the task at Plan. It now returns `STOP`.
4. Bare Done flags without Plan/Build proof previously unlocked a dependent
   task. They now return `STOP`.
5. Failed hosted CI previously produced `INTEGRATION BLOCKED` while the daily
   report claimed no verified blocking issue. The report now names the CI
   failure under Blocking issues.

These probes directly challenged grant expiry, recovery, dependency and
integration gates, and report accuracy. The other adversarial cases cover
unauthorized IDs, changed task definitions, revocation, pause, dirty checkout,
stale Verify, dependency cycles, usage limits, independent blocked work,
fixture lock contention, malicious task text, and final-batch completion.

## Checks and observations

- `npm run test:icm-automation`: **66 passed, 0 failed**.
- `npm test`: **3 files, 13 tests passed**.
- `npm run lint`: passed.
- `node --check` for all automation scripts: passed.
- `git diff --check`: passed.
- Repeated `simulate.mjs twenty` selected only `SD-100` from 20 permitted
  synthetic IDs; `interrupted` recovered `SD-108` at Build; `continue` selected
  `SD-101` only after synthetic integrated proof for `SD-100`.
- The real read-only `cli.mjs inspect` and `report` commands observed
  `maguellalmike209/schooldashboard` on
  `codex/sd-018-scheduled-autonomy-foundation`, HEAD
  `3bb24001a377dacba013deda293b6735bbb13caf`, a dirty SD-018 Build tree,
  17 historical registry-completed IDs, and one active structured SD-018 task.
  No external grant was supplied, so the decision was `NO AUTHORIZED WORK`.
  The report labeled live GitHub, hosted CI, usage, and cost evidence UNKNOWN or
  unavailable rather than claiming success.

The inspection/report commands did not modify application files or task status.
The working tree changes remained the authorized SD-018 Build files.

## Remaining limits and completion gate

The synthetic selector accepts abstract evidence flags and a synthetic
`remoteStatus: CURRENT` input. Those are not live exact-head GitHub/CI proof.
The fixture lock demonstrates atomic contention in disposable tests, not
exclusive ownership in the eventual unattended runtime. The trusted launcher,
Mike-controlled external grant enforcement, persistent journal, and actual
unattended writer are future work and remain disabled.

Protected PR and hosted checks must pass before final task completion or
documentation promotion to implemented reality. No separate Release or
production action is authorized by this Verify result.

## Verify housekeeping

- Automatic Verify repairs: none; the implementing agent repaired the five
  findings and the reviewer independently rechecked them.
- Regression status: scoped automation and existing Vitest checks passed.
- Durable documentation promotion: pending protected integration.
- Git finalization: not performed by this reviewer; the implementing agent
  owns the protected PR workflow after this independent review.

## CI test-gate recheck

After PR #18 was created, the implementing agent changed only the `package.json`
`test` script from `vitest run` to
`vitest run && npm run test:icm-automation`. I independently inspected that
single-line change and ran `npm test`: the existing Vitest suite passed
**13/13**, and the SD-018 Node adversarial suite passed **66/66** through the
same command. The scoped technical **PASS remains valid**. Hosted PR checks and
protected integration still require observation before SD-018 becomes Done.
