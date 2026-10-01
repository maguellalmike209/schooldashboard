# SD-010 — CI baseline verification

## Verification Result

PASS

## Risk

R2 — automated execution of repository code and dependencies on GitHub runners.

## Evidence

- Parsed `.github/workflows/ci.yml` with the installed YAML parser. It has
  push/pull_request triggers for `main`, one verification job, and all required
  steps in the intended order.
- Verified checkout v6.0.3 and setup-node v6.5.0 full commit SHAs against their
  upstream release tags. The workflow grants only `contents: read` and checkout
  does not persist credentials. No secrets or deployment permissions are used.
- Local CI sequence passed: `npm ci` (398 locked packages, zero reported
  vulnerabilities), `npm run lint`, `npm run typecheck`, `npm test` (9),
  `npm run build`, `npx playwright install chromium`, and
  `npm run test:e2e` (4). Chromium's Linux system dependencies are installed
  by the CI-only `--with-deps` option.
- Required commands have no `continue-on-error` or conditional skip. A failed
  step fails the single job. CI does not use local-only state.
- Source and diff inspection found no application behavior or production
  deployment change.

## Boundary

This verifies the repository workflow and local command equivalence. A GitHub
run is inspected separately after this commit is pushed. Branch protection,
required checks, and security scanners are outside SD-010.
