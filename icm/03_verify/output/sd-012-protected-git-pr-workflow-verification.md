# SD-012 — Protected Git / PR Workflow Verification

## Human Review Summary

**PASS for the protected PR controls and hosted checks.** The verified branch
is ready for protected merge. The merge SHA and final synchronization are
recorded in the post-merge handoff; they cannot exist before this artifact is
committed and checked on the PR.

## Verification Target

Compare the SD-012 Plan and `docs/TASKS.md` target with GitHub's actual settings,
the existing Dependabot PR rerun, and this task's protected PR lifecycle.

## Pre-PR Evidence

- Entry `main` was `942390e5230bb1629753665dabe03dc85d243cd6`, unprotected, with no rulesets. Four Dependabot PRs existed. PR #1's Dependency Review job failed with GitHub's unsupported-repository/Dependency graph error.
- `GET /vulnerability-alerts` and SBOM export initially returned 404. After enabling the supported repository prerequisite, alerts returned 204 and SBOM export contained 490 packages. Dependabot security updates read back as enabled. No new paid feature, visibility change, or product provider was introduced.
- Rerun `110723380908` of PR #1's Dependency Review completed successfully. Its log shows an Actions `checkout` dependency change and no detected package of moderate-or-higher severity. This is a real dependency assessment, not a skipped job.
- GitHub's branch-protection read-back reports required PRs with zero human approvals, `enforce_admins: true`, strict up-to-date required checks, conversation resolution, `allow_force_pushes: false`, and `allow_deletions: false`. The required Actions check names/app IDs are `verify`/15368, `CodeQL`/15368, and `Dependency review`/15368. `main` reports `protected: true`.
- Secret scanning and push protection report enabled. Code-scanning and secret-scanning alert endpoints returned empty lists. These settings were inspected; no real secret or vulnerability was introduced for testing.

## Adversarial Review

- A prior failed CI on Dependabot PR #2 demonstrates the job fails on bad lint and skips downstream steps. Admin enforcement plus required `verify` is configured to block merging that result; final PR merge gating still needs observation.
- A read-back of the PR requirement, admin enforcement, and force-push/deletion flags provides non-destructive rule evidence. No risky direct-main write or force-push probe was made.
- Duplicate `CodeQL` check names from GitHub Actions and GitHub Advanced Security were observed. The required check is pinned to GitHub Actions app ID 15368 to disambiguate the source.

## Hosted PR Evidence

- [PR #5](https://github.com/maguellalmike209/schooldashboard/pull/5) targets `main` from `codex/sd-012-protected-git-pr-workflow`; its first head was `f917d09afd68d502a8077746d97c4b4788cb54d5`.
- [CI run 36970779907](https://github.com/maguellalmike209/schooldashboard/actions/runs/36970779907), job `110724102110`, completed successfully. Locked install, `npm audit`, lint, typecheck, Vitest, production build, Chromium installation, and browser tests each report success.
- [Security run 36970779975](https://github.com/maguellalmike209/schooldashboard/actions/runs/36970779975) completed the GitHub Actions `CodeQL` and `Dependency review` checks successfully. GitHub Advanced Security's separate CodeQL result was also successful.
- GitHub reported PR #5 `mergeable_state: blocked` while required checks were in progress and `mergeable_state: clean` after their success. Existing PR #2's failed lint check and this transition challenge the assumption that a failed or pending check could simply be ignored.

## Git Diff and Limitations

The task diff contains only the SD-012 Plan, Verify record, and updated
implementation reality; it contains no application code, dependency, secret,
or production change. GitHub's rule read-back provides enforcement evidence
without attempting a potentially successful direct-main write. A malicious
repository administrator could later change the rule; ongoing governance must
detect that change. The final documentation commit will trigger fresh hosted
checks before merge.

## Final Status

**PASS.** Required controls and checks were observed. Merge remains conditional
on the final PR head satisfying the same protected rule.
