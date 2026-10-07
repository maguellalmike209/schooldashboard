# October 2026 dependency audit remediation — Plan

## Human review summary

Remediate patched dependency advisories on `fix/security-audit-2026-10` without changing product code, PR #8, or SD-015. If the remaining `braces` advisory requires a CI exception, stop for a security-policy decision.

## Risk classification

R2 — changes locked dependency versions and may expose a decision about the accepted security gate. No application data flow or trust boundary is added.

## Current state

- Branch and `origin/main` both point to `a2655e3`; the worktree started clean.
- `npm ci` succeeds. The unchanged lockfile now fails `npm audit --audit-level=moderate` with seven reported nodes from three root advisories. The advisory database changed after the earlier zero-finding verification; no lockfile change caused this failure.
- `next@16.3.6` brings `sharp@0.35.4` and `source-map-js@1.2.1` through PostCSS. `@tailwindcss/postcss` and direct `postcss` also bring `source-map-js`.
- `eslint-config-next@16.3.6` brings `braces@3.0.3` through `@next/eslint-plugin-next -> fast-glob -> micromatch`. This is a development dependency chain. The current `braces` advisory lists no patched release.

## Requirements and approach

- Preserve `SEC-SUPPLY-002` through `005`, `SEC-CI-002/004`, and the existing moderate audit gate.
- Update only supported transitive packages within accepted ranges. Confirm `sharp >=0.35.5` and `source-map-js >=1.2.2` from a fresh locked install and audit.
- Determine whether any supported current Next/ESLint chain removes the vulnerable `braces`. If not, document exact reachability and residual risk without claiming a fix or introducing an unapproved exception.
- Keep `package.json`, application source, Milestone 2 roadmap, and PR #8 unchanged unless a strictly necessary dependency declaration change is justified.

## Acceptance and verification

- Inspect the lockfile diff, registry sources, and install scripts.
- Run fresh `npm ci`, audit, lint, typecheck, tests, build, and browser tests when local tooling permits.
- A full PASS and PR finalization require an accepted audit gate. If the `braces` advisory remains and a narrowly scoped exception is a material policy choice, stop after safe fixes and verification evidence for Mike and ChatGPT review.

## Build readiness

READY FOR BUILD — NO MATERIAL HUMAN DECISION REQUIRED for the patched package updates. A remaining `braces` exception is a separate decision gate.

## October 6 approved policy amendment

Mike authorized a temporary exception for GHSA-vfj7-8cjw-p6xm (CVE-2026-93687) **only** on the `eslint-config-next > @next/eslint-plugin-next > fast-glob > micromatch > braces` development-only path. The review deadline is 2026-11-06, with earlier removal when a supported patched upstream path exists. This resolves the prior material decision gate without broadening product scope.

Revalidation: raw `npm audit --audit-level=moderate` still reports only this high-severity advisory and proposes a breaking `eslint-config-next@14.2.35` downgrade. Registry metadata still lists `braces@3.0.3` as latest and `@next/eslint-plugin-next@16.4.0` depending on `fast-glob@3.3.1`. `npm explain braces` traces the exact approved path from the root development dependency; `npm ls braces --omit=dev --all` is empty. The lockfile marks each node on the path `dev`, while the app source and build do not import the lint chain. The residual risk is that malicious/pathological lint glob or configuration input could terminate the lint Node process through stack exhaustion. A runtime/user-request path, another dependency chain, or a production occurrence is not accepted.

Build will use an exact-pinned `audit-ci` development dependency and its documented full-path advisory allowlist, retaining moderate-or-higher enforcement for all other findings. The config itself will record the rationale, expiry, and removal trigger. Verify must independently establish the reported path, production absence, allowlisted-path PASS, unrelated-advisory FAIL, locked install, application checks, and no runtime source change. No release, PR #8 edit, or SD-015 implementation is in scope.

READY FOR BUILD — NO MATERIAL HUMAN DECISION REQUIRED.
