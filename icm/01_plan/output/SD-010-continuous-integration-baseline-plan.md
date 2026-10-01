# SD-010 — Continuous integration baseline plan

## Plan Status

READY FOR BUILD — NO MATERIAL HUMAN DECISION REQUIRED

## Risk Tier

R2 — repository automation executes dependency and test code on GitHub runners.
It changes no application data flow or production deployment behavior.

## Current state

SD-009 verified a locked npm install; lint, typecheck, nine Vitest tests,
production build, and four Chromium browser tests. No workflow exists. GitHub
repository metadata confirms the canonical public repository and `main`
default branch; actual CI settings and run status must be observed separately.

## Approach and trust boundary

Use one GitHub-hosted Ubuntu job for pushes and pull requests targeting
`main`. Checkout and setup-node use full release commit SHAs. Grant only
`contents: read` to the workflow token. Run `npm ci` once, then lint,
typecheck, unit/integration tests, production build, install Playwright
Chromium, and browser tests. Set a bounded timeout. The PR's code and
dependencies are untrusted input to a disposable runner; no secrets,
deployment permissions, or `pull_request_target` trigger are used (T15, T19;
SEC-SUPPLY-002/003, SEC-CI-001/004).

## Acceptance criteria

- Workflow parses and represents every required command with failure
  propagation and no allow-failure step.
- The locked install and exact check sequence pass locally.
- Browser dependencies are installed in CI without a paid provider or
  repository secret.
- Workflow is committed and pushed after local Verify PASS; resulting GitHub
  run is inspected when available. Documentation names only observed CI state.

## Boundary

Required status checks and branch protection belong to SD-012. This task does
not claim they are active or authorize deployment.
