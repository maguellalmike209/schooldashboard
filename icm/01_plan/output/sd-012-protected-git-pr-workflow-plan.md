# SD-012 — Protected Git / PR Workflow Plan

## Human Review Summary

- **Risk:** R3, repository security governance. The change affects who can integrate code and which security results gate `main`; it does not change production application permissions.
- **Decision:** Use supported no-cost GitHub controls for this public repository, with no paid feature, visibility, ownership, or product architecture change.
- **Automation:** Mike authorized the full lifecycle through PR and merge. Release remains separate.

## Objective and Current State

At Plan entry, branch `codex/sd-012-protected-git-pr-workflow` starts at checkpoint `942390e`. GitHub reports `main` unprotected (`protected: false`), no rulesets, and no branch-protection record. Existing PR #1 has GitHub Actions checks `verify`, `CodeQL`, and `Dependency review`; the last fails before assessment. A second `CodeQL` result is reported by GitHub Advanced Security. The repository is public with admin access. Secret scanning and push protection are enabled. Code scanning returns an empty alert list. Dependabot version updates are observed, while security updates are disabled.

`GET /vulnerability-alerts` and dependency-graph SBOM export both return 404. GitHub's dependency-review job reports that review is unsupported and asks for Dependency graph. This is evidence of a missing graph prerequisite. GitHub documents that enabling vulnerability alerts also enables the graph. The repository has a supported lockfile, `package-lock.json`.

## Trust Boundaries and Failure Modes

- Actors: repository administrator, collaborators, GitHub Actions, Dependabot, and the GitHub merge service.
- Assets: integrity of `main`, source history, CI/security results, and future private-data implementation.
- Boundary: local Git and PR changes become trusted `main` only through GitHub rules and hosted checks.
- Abuse/failure cases: direct `main` push, admin bypass, force push, deletion, failed checks merged, spoofed/ambiguous check names, broken Dependency Review, stale branch, and transport failure.
- No application user data, new secrets, or production deployment are involved. Do not log the existing HTTPS credential.

## Proposed Work

1. Enable GitHub's dependency graph and alerts through its supported repository endpoint; enable no-cost Dependabot security updates if available. Preserve existing secret scanning and push protection.
2. Establish `main` protection with required PR integration, zero required human approvals for this sole-maintainer workflow, admin enforcement, required stable GitHub Actions checks, and no force push or deletion. Prefer a supported branch-protection API over inventing a ruleset capability.
3. Use this branch's Plan, Build/Verify evidence, and legitimate documentation/configuration changes as the human PR validation. Open a PR, observe all hosted results, and merge only if required checks pass.
4. Document verified controls and remaining limitations after independent Verify. Do not infer protection from workflow YAML alone.

## Acceptance and Verification

- GitHub API confirms the dependency graph can produce an SBOM and Dependency Review completes a real PR assessment.
- GitHub API confirms `main` requires PRs and exact observed checks, enforces admins, and forbids force pushes and deletions.
- A non-destructive direct-push probe against the protected `main` is rejected, or equally strong GitHub rule evidence demonstrates rejection without modifying history.
- Failed checks cannot satisfy the merge gate; use GitHub's mergeability/rule response and existing failed PRs, without introducing a vulnerability or secret.
- The SD-012 PR runs CI (including tests, build, browser tests, audit), CodeQL, and Dependency Review, then merges through the protected path. The resulting `origin/main` matches the merge commit.
- Verify records actual settings, negative evidence, limits, and links to hosted runs. Documentation reflects only observed behavior.

## Recovery and Release

Configuration changes can be reversed through GitHub settings/API if they block the intended workflow; do not disable a valid gate merely to merge. If a check name is wrong, identify the actual hosted result and correct the rule before merge. If Git transport fails, use the already authenticated HTTPS transport for the same repository after checking refs; never force push or rewrite history. Merge does not authorize production Release.

## Build Readiness

Ready. No material product or provider decision is required. If GitHub denies necessary settings despite repository admin access, stop at the exact setting and report the smallest manual action.
