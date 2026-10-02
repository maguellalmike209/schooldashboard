# SD-012 — Protected Git / PR Workflow Verification

## Human Review Summary

The pre-PR controls and Dependency Review prerequisite are verified below.
The final result remains pending this task branch's hosted PR checks and merge.

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

## Pending Hosted Evidence

- SD-012 task PR number and head SHA.
- CI's locked install, audit, lint, typecheck, Vitest, build, and Playwright results.
- CodeQL, Dependency Review, required-check/mergeability result, and merge SHA.
- Final `origin/main` synchronization and Git diff review.

## Final Status

Pending hosted PR validation. This is not yet a Verify PASS.
