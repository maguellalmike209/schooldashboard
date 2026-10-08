# SEC-2026-10-NEXTJS — Build Handoff

## Status

READY FOR INDEPENDENT VERIFY, with hosted database/Auth regression evidence
still required. No maintenance PASS or integration is claimed here.

## Change

- `next` and `eslint-config-next`: exact 16.3.8 in `package.json` and
  `package-lock.json`, replacing ranges `^16.3.6` that resolved to 16.3.6.
- Npm regenerated matching `@next/env`, ESLint plugin, and SWC optional
  platform entries. Npm 11 also materialized six unrelated bundled Tailwind
  WASM metadata entries. Independent diff review found they were unnecessary,
  so Build removed those entries and validated the narrowed lockfile with a
  fresh `npm ci` in a new disposable checkout. No new package key, registry
  host, or install script remains in the diff.
- `audit-ci.jsonc`, source, tests, CI workflows, and SD-016 content are
  untouched. The existing exact-path braces exception is preserved.

## Build checks and environment

`npm ci` in the existing Windows checkout could not unlink a locked native
Lightning CSS file (`EPERM`); it did not validate the new package set. To avoid
interfering with another running process, Build created disposable directories
from `git archive HEAD` plus the two modified package files. A clean `npm ci`
succeeded both before and after narrowing the lockfile; the initial isolated
copy's `npm ls` resolved both target packages to 16.3.8.

The following checks passed in the initial isolated copy against the same
source and patched package versions. The later lockfile narrowing removed
only unrelated bundled metadata; clean-install validation was rerun and the
affected audit gate was rerun with network access on the final lockfile.

| Check | Result |
| --- | --- |
| `npm run audit:ci` | PASS on the final lockfile with network access; only the pre-approved braces path remains |
| `npm run test:audit-policy` | PASS; unrelated moderate, high, and critical fixtures remain rejected |
| `npm run lint` | PASS |
| `npm run typecheck` | PASS |
| `npm test` | PASS; 13 tests |
| `npm run build` | PASS; Next.js 16.3.8 production build |
| `npm run test:client-bundle-secrets` | PASS; 12 client bundle files inspected |
| `npm run test:e2e` | PASS; four Chromium tests |
| `git diff --check` | PASS at handoff |

The independent reviewer confirmed the narrowed lockfile package set and
fresh `npm ci`/version resolution. Their own audit invocation could not reach
npm's advisory endpoint on two attempts. That transport failure is not audit
PASS; the final-head hosted CI audit remains required independent evidence.

This host has no Docker command. No local database reset or authenticated
security browser test was run. Existing PR #12 hosted CI demonstrated that the
repository workflow can start disposable Supabase, replay migrations, and run
40 database/RLS assertions. The maintenance PR must rerun those and the
authenticated two-user browser suite on its own final head. A hosted pass is
required; the older PR #12 result is readiness evidence only.

## Verify targets and limits

Independently compare accepted task scope with package/lockfile diff; check
direct and transitive changes, npm registry sources, scripts, audit policy,
secrets, and relevant app security assumptions. Recheck local evidence and
hosted CI/Security results on the final PR head. `docs/IMPLEMENTATION.md`
currently names Next.js 16.3.6; promote it to 16.3.8 only after independent
verification supports the new state. Mark the task Done only as part of
protected integration. No production deployment is authorized.
