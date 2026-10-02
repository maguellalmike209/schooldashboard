# Post-SD-011 Repository Reality Snapshot

## A. Executive State

As of 2026-10-01, SD-008–SD-011 have produced process/security documents, repeatable tests, hosted CI, npm audit, Dependabot version-update PRs, and successful hosted CodeQL jobs. The intended PR path is exercised but incomplete: dependency review fails on every observed PR, and GitHub merge protections/settings are unverified. This is an R0 read-only assessment, not SD-012 implementation or SD-013 closeout.

## B. Repository / Git State

- Repository: `maguellalmike209/schooldashboard`, public, default branch `main` ([GitHub repository metadata](https://github.com/maguellalmike209/schooldashboard)). Local `origin` is its SSH URL.
- At inspection, local branch `main`, `HEAD` and local `origin/main` all equal `35023cedecc2f348a935370254fc6164da6ad419` (`security(sd-011): automate dependency and code analysis`). Each new Dependabot PR reports this SHA as its `main` base, corroborating the hosted base at PR creation. No fetch was performed.
- Recent task commits: `805e76b` SD-008, `5f61850` SD-009, `bc191d8` SD-010, `35023ce` SD-011. `457c5ff` established the initial secure automation documents before the SD-008 Verify commit.
- **The working tree was not clean before inspection.** `docs/MOCK_DATA_SPEC.md` had a pre-existing unstaged modification (986 insertions, 1,281 deletions by `git diff --numstat`). It was not edited or included in this report.
- `AGENTS.md` and root `CONTEXT.md` route Plan/Build/Verify/Release, separate accepted requirements from repository truth, and reserve production Release. `docs/TASKS.md` marks SD-008–SD-011 Done and SD-012/SD-013 Not started; that status is roadmap evidence, not proof of controls.

## C. SD-008 → SD-011 Reconciliation

| Task | Documented objective | Actual implementation and evidence | Discrepancy / confidence |
| --- | --- | --- | --- |
| SD-008 | Durable secure ICM v2 and School Dashboard security/privacy policy foundation. | Tracked `AGENTS.md`, `CONTEXT.md`, all four `icm/*/CONTEXT.md` stages, `docs/SECURITY_REQUIREMENTS.md`, `DATA_PRIVACY.md`, `THREAT_MODEL.md`, `SECURITY_TESTING.md`, `DECISIONS.md`; `805e76b` contains the R0 consistency Verify report and a Release-status repair. The security/privacy documents explicitly describe current static fixture data and future, dormant private-data requirements. | High confidence in document presence and routing; prior comprehensive consistency PASS was not independently rerun here. Documents do not implement runtime auth or GitHub controls. |
| SD-009 | Unit/invariant, integration, and browser test capability. | `5f61850` added Vitest/Playwright to `package.json` and lockfile, `vitest.config.mts`, `playwright.config.ts`, the loopback production-server runner, six unit, three rendered-component integration, and four Chromium E2E tests. Tests cover selectors, fixture relationships, five views, 404, keyboard/viewport, and Dashboard/Today agreement. SD-009 Verify records 9+4 local passes; current hosted CI also passes these on `main` and two PRs. | High confidence for current prototype tests. No auth/isolation/upload security tests exist because corresponding runtime does not exist. |
| SD-010 | Locked install, lint, typecheck, tests, build in CI with meaningful failure. | `bc191d8` added `.github/workflows/ci.yml`: push/PR to `main`, Ubuntu 24.04, Node 24, `npm ci`, lint, typecheck, Vitest, build, Chromium install, E2E. SD-011 added audit to this job. [Hosted CI on SD-011 `main`](https://github.com/maguellalmike209/schooldashboard/actions) succeeded. [PR #2 CI](https://github.com/maguellalmike209/schooldashboard/actions/runs/36842059607) and [PR #4 CI](https://github.com/maguellalmike209/schooldashboard/actions/runs/36842086942) fail at lint and skip downstream steps; [PR #1](https://github.com/maguellalmike209/schooldashboard/actions/runs/36842049958) and [PR #3](https://github.com/maguellalmike209/schooldashboard/actions/runs/36842059783) pass all steps. | High confidence the hosted job executes and fails meaningfully. Whether failure prevents merge is unknown. SD-010 Verify had only local/config evidence at its commit; later hosted evidence now exists. |
| SD-011 | Practical security and supply-chain automation. | `35023ce` added CI `npm audit --audit-level=moderate`, weekly npm/GitHub Actions `.github/dependabot.yml`, and `.github/workflows/security.yml` with CodeQL JS/TS on push/PR and dependency review on PR. [SD-011 `main` Security run](https://github.com/maguellalmike209/schooldashboard/actions/runs/36841863104): CodeQL success; dependency review skipped as designed on push. Four [Dependabot PRs](https://github.com/maguellalmike209/schooldashboard/pulls) opened on 2026-10-01, proving version-update activity. All four PR CodeQL jobs succeed, but all four dependency-review jobs fail. [PR #1 dependency-review log](https://github.com/maguellalmike209/schooldashboard/actions/runs/36842049945) says: “Dependency review is not supported on this repository. Please ensure that Dependency graph is enabled.” | High confidence on configured and observed jobs; dependency review is **not operational**. The log suggests Dependency graph availability/configuration but does not prove the switch's state. `docs/IMPLEMENTATION.md` §§30 says Dependabot PR creation and PR dependency review have not been observed; both claims are now stale. GitHub secret scanning/push protection remain unverified, not implemented by SD-011 repo config. |

`docs/IMPLEMENTATION.md` also retains older snapshot text in §§33, 43–44 stating that a test framework, CI, and security automation do not yet exist and that a test command should not be invented. Its newer §§28–31 and actual files/runs supersede those statements for current implementation facts. This report records the drift without editing durable documentation.

## D. Capability Evidence Matrix

“Enforced” means either the job itself fails on a bad result or GitHub prevents merge, as specified in each cell; these are distinct.

| Capability | Configured | Exercised | Enforced | Evidence | Gap / unknown |
| --- | --- | --- | --- | --- | --- |
| Unit/integration tests | Yes, Vitest `npm test` | Local SD-009 Verify; hosted `main`, PR #1/#3 | CI job fails on test failure by step wiring; merge gate unknown | `vitest.config.mts`, 2 files/9 tests, `ci.yml` | No future auth tests yet |
| Playwright/E2E | Yes, Chromium `npm run test:e2e` after build | Local SD-009/010 Verify; hosted `main`, PR #1/#3 | CI job step; merge gate unknown | `playwright.config.ts`, 4 E2E tests, runner, hosted CI steps | Single browser; only current static behavior |
| CI | Yes, push/PR to `main` | `main` and four Dependabot PRs | Job failures observed; merge gate unknown | `ci.yml`; PR #2/#4 lint failures | No verified required-check rule |
| Dependency audit | Yes, `npm audit --audit-level=moderate` in CI | Local SD-011 Verify, `main` and four PR CI jobs | CI step; merge gate unknown | `ci.yml`; audit succeeds on all four PRs | Results are point-in-time; not a GitHub alert setting |
| Dependabot | Yes, weekly npm and Actions version updates | Four open bot PRs plus hosted Dependabot Updates runs | Updates are active; merge control unknown | `dependabot.yml`; PRs #1–#4 | Dependabot security-alert/update setting unknown |
| CodeQL | Yes, JS/TS push/PR job | `main` and four PR CodeQL jobs succeed | Job runs; merge gate unknown | `security.yml`; Security run #1 and PR runs | Alert state/settings not inspected |
| Dependency review | Yes, PR job, moderate threshold | Four PR jobs executed and failed | Job failure active; **review cannot assess dependencies**; merge gate unknown | `security.yml`; PR #1–#4 job logs | Repository support/Dependency graph state needs inspection |
| PR-required workflow | PR event triggers CI/Security; PR rule not in repository files | Four bot PRs trigger both workflows | **Unknown** | Workflow YAML and PR runs | No settings/rules evidence |
| Required status checks | No required-check declaration in tracked config | CI/Security checks appear on PRs | **Unknown** | Hosted PR runs; settings unavailable | Do not infer from job execution |
| Main branch protection/ruleset | Not defined in repository files | Direct `main` pushes occurred for SD-010/011 | **Unknown currently** | Commit/Actions history; settings unavailable | Historical direct pushes do not prove today's setting |
| Secret scanning | No repo workflow/control found | Unknown | **Unknown** | `.github/` inventory; settings unavailable | GitHub-side feature state unknown |
| Push protection | No repo workflow/control found | Unknown | **Unknown** | `.github/` inventory; settings unavailable | GitHub-side feature state unknown |

## E. GitHub Enforcement State

- **Present in repository config:** CI, npm audit, CodeQL, dependency review, Dependabot version updates. No separate CodeQL query/config file or secret-scanning workflow was found; CodeQL is configured in `security.yml`.
- **Verified active on GitHub:** CI and CodeQL on `main` and PRs; Dependabot version-update runs and four bot PRs; dependency-review job invocations on PRs.
- **Verified enforced at job level:** CI stops on lint failure on PR #2/#4. Dependency review returns failure on all PRs, but fails for unsupported repository capability rather than a vulnerability decision. No merge enforcement was verified.
- **Unknown / access unavailable:** Current `main` branch protection, rulesets, required PR/reviews/status checks, direct-push/force-push/deletion restrictions, Dependency graph setting, Dependabot alerts/security-update settings, code-scanning alert settings, secret scanning, and push protection. The authenticated GitHub connector exposes repository metadata (including admin permission), PRs, Actions jobs/logs, but no settings endpoints. The in-app browser was signed out and returned 404 for repository settings; public API navigation was blocked. Neither outcome proves any setting on or off.

## F. Intended Branch → PR → CI → Merge Workflow

Dependabot has demonstrated branch creation, PR creation, and automatic CI/Security runs against `main`. CI can pass or fail; CodeQL succeeds; dependency review currently fails on every observed PR. No observed PR was merged, no human task PR was observed, and required PR/check rules were not verified. Thus `task branch → PR → automated verification` is partly operational, while `passing required checks → merge` and prohibition of bypass/direct push are unproven. The SD-010/011 commits reached `main` by push, showing the previous direct-main path was used.

## G. Verified Missing

- A **working** PR dependency-review result: all four observed invocations fail with GitHub's “not supported on this repository” error before a vulnerability decision.
- Current runtime authentication, authorization, private persistence, and corresponding isolation tests are absent by source/test inventory and accepted documentation; they are future product scope, not an SD-008–SD-011 shortfall.
- An observed end-to-end task-branch → human PR → required checks → merge cycle is absent from available history.

## H. Not Yet Exercised

- Successful dependency review on a supported PR and its moderate-severity decision path. The claim that dependency review has never run is false; it ran and failed four times.
- Any observed merge under required checks/reviews or attempted blocked direct push/force push. Do not perform a write probe for this snapshot.
- Future security regression tests for multi-user resources, because those resources do not exist.

## I. Unknown / Unable to Verify

All GitHub-side controls listed under §E, especially whether failed CI/Security checks block merging, remain unknown. The dependency-review error is evidence of unusability, not conclusive proof that Dependency graph is disabled. No configuration was changed to resolve this unknown.

## J. Already Covered / Potentially Unnecessary Work

- SD-009's basic test architecture and SD-010's CI execution exist and run in hosted PRs; rebuilding them from scratch would duplicate work.
- SD-011's Dependabot version-update activation and CodeQL execution are now observed, correcting its post-push uncertainty. A future task need not manufacture a PR merely to prove PR triggers run.
- Dependency review was exercised by actual PRs, so only its failed operation and any merge enforcement need resolution/verification. Secret scanning and push protection cannot be counted as covered.

## K. Roadmap Implications

1. After SD-011, the foundation has accepted process/security documents, current-prototype test suites, CI with audit, working Dependabot version updates, and working CodeQL jobs.
2. A usable dependency-review gate is genuinely missing. Repository-level PR and required-check enforcement are not verified and must not be claimed; the historical direct-main path shows why a protected workflow matters.
3. GitHub protection/rules/security settings and merge behavior remain unknown because available authenticated tools do not expose them.
4. **SD-012 still appears justified** as the existing protected Git/PR workflow task, with actual GitHub capability inspection and the failed PR review result as inputs. This report does not design its implementation.
5. **SD-013 still appears justified** for independent foundation closeout after the workflow gap is resolved; existing SD-008 R0 document Verify and SD-009–011 task Verify do not establish end-to-end enforcement or remove documentation drift.
6. Observed hosted CI, Dependabot PRs, CodeQL, and PR-triggered jobs remove the need for future work whose sole purpose is to establish those facts. No new task IDs are proposed.
7. The current roadmap's explicit gate (`docs/TASKS.md` §13) keeps private multi-user development behind SD-012 and SD-013. The broken dependency-review job and unverified repository protections are concrete foundation issues; later product architecture/provider choices remain outside this snapshot.

## L. ICM Process Observations

- **Phase-Gated Roadmap Rule:** Evidence supports keeping the present foundation phase precise. The current SD-012/013 boundaries exist while later multi-user capabilities remain directional in `TASKS.md`; the failed dependency review shows why later decomposition should follow verified foundation state.
- **Evidence Reuse Rule:** The fresh hosted `main`/PR runs plus SD-009–011 local Verify records answer the command-execution questions without rerunning `npm ci`, build, or Chromium merely for this read-only snapshot. Changed or contradictory state (Dependabot PRs and failed dependency review) required new inspection.
- **No-Op Task Rule:** Dependabot activity and PR triggers needed no new implementation to establish. Evidence-only closure is sensible when an entire task target already exists, but it would not justify closing SD-012/013 now while merge enforcement is unknown and dependency review fails.

## M. Evidence / Commands Used

- Local read-only commands: `git status --short --branch`, `git rev-parse HEAD origin/main`, `git log -8 --oneline --decorate`, `git remote -v`, `git show --stat` for SD-008–011, `git diff --numstat -- docs/MOCK_DATA_SPEC.md`, `rg --files`, targeted `rg`, and `Get-Content` of the named durable/config/test/Verify files. `package-lock.json` is lockfile v3 and matches the root `package.json` dependency declarations. `node_modules` and `npm` are present locally; no test was rerun.
- Files inspected: `AGENTS.md`, `CONTEXT.md`, Plan stage context, `docs/TASKS.md`, `IMPLEMENTATION.md`, `DECISIONS.md`, `SECURITY_REQUIREMENTS.md`, `DATA_PRIVACY.md`, `THREAT_MODEL.md`, `SECURITY_TESTING.md`; SD-008–011 Verify artifacts; `package.json`, `package-lock.json`, Vitest/Playwright configs, test files, E2E runner, `.github/workflows/ci.yml`, `.github/workflows/security.yml`, `.github/dependabot.yml`.
- GitHub connector: repository metadata, PR #1–#4 metadata, their commit workflow runs, run jobs/steps, and dependency-review job logs. [GitHub Actions history](https://github.com/maguellalmike209/schooldashboard/actions) confirms 15 hosted runs including successful SD-011 `main` CI/Security; [SD-011 Security run](https://github.com/maguellalmike209/schooldashboard/actions/runs/36841863104) shows CodeQL success and expected push-event dependency-review skip. [PR #1](https://github.com/maguellalmike209/schooldashboard/pull/1), [#2](https://github.com/maguellalmike209/schooldashboard/pull/2), [#3](https://github.com/maguellalmike209/schooldashboard/pull/3), and [#4](https://github.com/maguellalmike209/schooldashboard/pull/4) are open Dependabot PRs.
- Settings access attempts: unauthenticated GitHub settings page returned 404; browser API request was blocked; direct shell API request was blocked by the local network sandbox. These are access limits, not negative settings evidence.
