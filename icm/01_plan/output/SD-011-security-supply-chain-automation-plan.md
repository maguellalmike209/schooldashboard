# SD-011 — Security and supply-chain automation plan

## Plan Status

READY FOR BUILD — NO MATERIAL HUMAN DECISION REQUIRED

## Risk Tier

R2 — adds repository security workflows and a narrow `security-events: write`
permission for CodeQL findings. No application runtime, private data, or
production deployment flow changes.

## Observed state

SD-010 GitHub CI run passed. `npm audit --audit-level=moderate` currently
reports zero vulnerabilities. The repository is public. GitHub's public
dependency graph is available by platform policy, but this session's
unauthenticated security-alert API returns 401 and the browser is not signed in;
Dependabot alerts, secret scanning, push protection, and CodeQL settings cannot
be asserted active from those responses. No CodeQL run appeared among the
repository's existing workflow runs.

## Controls to add

- Require `npm audit --audit-level=moderate` in the existing CI job after the
  locked install. This scans the current lockfile, including development
  dependencies, on pushes and pull requests.
- Add a minimal weekly Dependabot configuration for npm and GitHub Actions.
  It proposes updates by pull request; no automatic merge or secret is added.
- Add a GitHub-native CodeQL workflow for JavaScript/TypeScript on pushes and
  pull requests to `main`. Pin the official action to a full release commit
  SHA, grant only the upload permission it needs, and observe its hosted run.
- Add a GitHub-native dependency-review job on pull requests. Pin the official
  action and fail on newly introduced moderate-or-higher vulnerabilities.
  This checks a different question from whole-lockfile npm audit.

These controls address dependency/supply-chain compromise and automation
error (T15, T19, T28; SEC-SUPPLY-002/003/005, SEC-CI-002/004). The public
dependency graph supports dependency review. Existing GitHub secret-scanning
and push-protection settings remain a separate repository-settings audit for
SD-012. No duplicate third-party secret scanner is introduced without knowing
whether GitHub's native protection is already active.

## Acceptance criteria

- Dependabot and workflows parse and use supported ecosystems, triggers,
  permissions, and immutable action references.
- `npm audit` passes with no suppressed finding; existing CI commands still
  pass.
- CodeQL and CI hosted jobs are inspected after push. A pull-request-only
  dependency-review job is described as configured until a PR run proves it.
- Documentation distinguishes observed controls, configured future behavior,
  and unverified GitHub settings.

## Completion boundary

Do not change GitHub security settings, branch protections, production
credentials, product behavior, or SD-012/SD-013 work.
