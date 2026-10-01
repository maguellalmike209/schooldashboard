# SD-011 — Security and supply-chain automation verification

## Verification Result

PASS for repository configuration and local dependency checks. Hosted runs are
inspected after the task commit is pushed.

## Risk

R2 — repository security automation and a scoped CodeQL findings-upload
permission; no application data path or production deployment changes.

## Evidence

- Parsed `.github/dependabot.yml`, `.github/workflows/ci.yml`, and
  `.github/workflows/security.yml` as YAML. Dependabot has supported npm and
  GitHub Actions ecosystems at repository root on a weekly schedule.
- Resolved checkout v6.0.3, CodeQL v4.38.2, and dependency-review v5.0.0
  to full commit SHAs from the official upstream repositories. CodeQL's
  annotated release tag was dereferenced to the commit SHA.
- Security workflow uses only `push` and `pull_request`, never
  `pull_request_target`. CodeQL receives `contents: read` and
  `security-events: write`; dependency review receives only
  `contents: read`. Checkout does not persist credentials.
- The CI audit step has no skip or allow-failure behavior.
  `npm audit --audit-level=moderate` returned zero vulnerabilities locally.
- SD-010's preceding hosted CI run passed every step. No application source,
  runtime dependency, private-data behavior, or deployment configuration was
  changed in SD-011.

## Activation and limits

The CodeQL and CI hosted jobs are checked after this commit reaches GitHub.
Dependency review runs only on a pull request and therefore has not been
observed by this push. Dependabot configuration is present, while scheduled
update execution has not yet been observed. The available unauthenticated
security-alert APIs returned 401, and the browser was not signed in; GitHub
secret scanning, push protection, and Dependabot alert switches are not
verified. SD-012 owns the repository-settings review.
