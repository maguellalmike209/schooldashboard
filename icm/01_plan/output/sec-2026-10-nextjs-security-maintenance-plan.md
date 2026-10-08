# SEC-2026-10-NEXTJS — Patch Next.js security advisories

## Plan decision

READY FOR BUILD — NO MATERIAL HUMAN DECISION REQUIRED. Mike explicitly
authorized this separate security-maintenance task and the two package files.
It does not change SD-016's documentation-only contract. Risk is **R2**:
existing runtime and development dependencies change, so authentication,
authorization, and private-data behavior require regression evidence.

## Evidence, scope, and ownership

Canonical `main` and local `main` were both `4c3eaad` at branch creation; the
working tree was clean. The new branch is
`codex/nextjs-16-3-8-security-maintenance`. `package.json` allows 16.3.x but
the committed lockfile resolves `next` and `eslint-config-next` to 16.3.6.
SD-016 PR #12's hosted CI passed migration replay and 40 database/RLS checks,
then failed `npm run audit:ci` on five Next.js advisories. The independent
Security workflow passed; later CI steps were skipped. The official
[Next.js 16.3.8 release](https://github.com/vercel/next.js/releases/tag/v16.3.8)
lists those security fixes; the
[high-severity advisory](https://github.com/advisories/GHSA-cjq9-62q9-8jv4)
identifies 16.3.8 as patched. Research checked 2026-10-08.

Update only `next` and matching `eslint-config-next` to exact 16.3.8 and
regenerate `package-lock.json` through npm. Task-scoped Plan/Build/Verify
artifacts and a concise `docs/TASKS.md` status are allowed. Preserve
`audit-ci.jsonc`, including the previously approved, expiring braces path.
Do not alter source, tests, CI policy, other direct dependencies, production,
or SD-016 content. Any technically required transitive lockfile change must be
identified in diff review. A major version, new advisory exception, policy
change, or material application rewrite returns to Plan.

## Verification contract

1. Clean `npm ci` resolves both direct packages to 16.3.8 from the lockfile.
2. `npm run audit:ci` and `npm run test:audit-policy` pass without a new
   exception; inspect raw audit results and the dependency diff for new risks,
   registry changes, scripts, and unrequested direct packages.
3. Lint, typecheck, unit/integration tests, build, bundle credential scan, and
   relevant Playwright tests pass on the changed dependency set.
4. A disposable **local** Supabase target runs committed migrations, 40 RLS
   assertions, and authenticated two-user security tests. Verify no remote or
   production database target is used. Hosted PR CI may provide this evidence
   when the local host lacks Docker, but must run on the final PR head.
5. Independent Verify checks scope, security regressions, source provenance,
   and all affected evidence before task completion. Required CI and Security
   workflows pass before protected merge, then canonical `main` is confirmed.

## Readiness and recovery

Local Node 24/npm 11, package registry, branch, and GitHub HTTPS transport are
READY. Local Docker is unavailable, so local database reset and Auth security
tests are **READY WITH VERIFIED FALLBACK** through existing GitHub CI, which
already started disposable Supabase and ran RLS checks on PR #12. The final
maintenance PR must rerun that pipeline; absent hosted evidence is BLOCKED,
not PASS. Local browser readiness remains a Verify target. No destructive
database command may run until exact local target identity is established.
The change is reversible through ordinary follow-up Git work; no production
Release is authorized. Independent Verify must determine whether the patch
actually clears the audit and preserves authenticated behavior.

The disposable hosted test environment is available only after a branch
commit/PR exists. A non-final candidate commit and draft PR may carry the
maintenance change for hosted Verify while the task stays In progress. This
transport step is not a full Verify PASS or completion commit. After hosted
evidence is independently reviewed, promote verified current-state docs and
task status, rerun affected hosted checks on the final PR head, and merge only
after all required gates pass.
