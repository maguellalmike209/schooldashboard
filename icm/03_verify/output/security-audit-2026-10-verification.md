# October 2026 dependency audit remediation — Verification

## Earlier verification result (before Mike's approved exception)

BLOCKED — two patched advisories were remediated, but the required full audit still fails on one unpatched development-tool advisory. No security-gate exception, commit, push, or PR was made.

## Dependency findings

| Advisory | Before | Final lockfile | Path and assessment |
| --- | --- | --- | --- |
| [GHSA-wq5f-xc86-pv6w](https://github.com/advisories/GHSA-wq5f-xc86-pv6w) | `sharp@0.35.4` | `0.35.5`, patched | `next -> sharp`. Optional production package; sharp's prebuilt platform packages and libvips moved with it. |
| [GHSA-68fv-2mgg-jv7q](https://github.com/advisories/GHSA-68fv-2mgg-jv7q) | `source-map-js@1.2.1` | `1.2.2`, patched | `next -> postcss`, direct `postcss`, and `@tailwindcss/postcss -> @tailwindcss/node`. Build-tool paths; the lockfile has one deduplicated version. |
| [GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm) | `braces@3.0.3` | `3.0.3`, vulnerable | `eslint-config-next -> @next/eslint-plugin-next -> fast-glob -> micromatch -> braces`. Every package in this chain is marked `dev` in the lockfile. The advisory lists no patched version. |

The full audit reports five high-severity *nodes* for the single `braces` advisory and its upstream dependency chain. `npm audit --omit=dev --audit-level=moderate` reports zero, but that command is reachability evidence only and has **not** replaced the required CI command.

## Upstream and reachability review

- npm registry metadata on October 6, 2026 lists `braces@3.0.3` as latest. `micromatch@4.0.8` requires `braces@^3.0.3`; `fast-glob@3.3.3` still requires `micromatch@^4.0.8`; `@next/eslint-plugin-next@16.4.0` still requires `fast-glob@3.3.1`. The newest supported Next ESLint path does not remove this advisory.
- npm proposes `eslint-config-next@14.2.35` only through `npm audit fix --force`, a breaking downgrade outside the accepted range. It was not applied.
- The plugin calls `fast-glob.globSync` on ESLint's `settings.next.rootDir` in `dist/utils/get-root-dirs.js`. This repository's `eslint.config.mjs` does not set that option. Its ESLint configuration is trusted development configuration, and the app has no runtime import of this lint chain. No untrusted runtime request or user input path into this `braces` instance was found.
- A malicious contributor able to change lint configuration could reach developer/CI tooling. Development-only does not make the advisory false; it limits the observed exposure of the current application.

## Verification performed

- Final minimized lockfile passed fresh `npm ci`; `npm ls` resolved `sharp@0.35.5`, `source-map-js@1.2.2`, `braces@3.0.3`.
- Full `npm audit --audit-level=moderate`: FAIL, one advisory/five high-severity nodes. Production-only audit: zero findings.
- `npm run lint`: PASS.
- `npm run typecheck`: PASS.
- `npm test`: PASS, nine tests.
- `npm run build`: PASS, six routes generated.
- `npm run test:e2e`: PASS, four Chromium tests.
- After removing unrelated optional bundled-package metadata introduced by npm lockfile regeneration, a second `npm ci`, full audit, production-only audit, and `npm ls` reproduced the same dependency and audit results. The earlier functional checks remain applicable because the installed packages and application source did not change.
- `git diff --check`: PASS. The only implementation diff is `package-lock.json`; `package.json`, application code, and CI workflow are unchanged. All changed resolved packages use `registry.npmjs.org`; no install-script flag was added. The existing `unrs-resolver` install-script warning is unchanged.

The prior SD-011 verification recorded zero audit findings with the earlier lockfile. The new sharp, source-map-js, and braces advisories were published or revised afterward. The audit failure arose from advisory database changes while the prior lockfile stayed unchanged.

## Decision required

A temporary exception would change the accepted `SEC-SUPPLY-005` / `SEC-CI-004` enforcement behavior, so it is a material security-policy decision for Mike and ChatGPT review. The narrow candidate is an audit wrapper that continues to run a full `npm audit --json` and fails on every moderate/high/critical advisory except **GHSA-vfj7-8cjw-p6xm**, only while it appears through this exact development-only ESLint chain. It should fail if the package becomes a production dependency, an additional advisory appears, or the chain changes; it should display the residual finding and have an explicit removal trigger when upstream patches or removes the dependency. No wrapper or exception has been implemented.

Until the exception is accepted or upstream fixes the chain, Verify cannot give a full PASS. Per ICM, no task completion, commit, branch push, or pull request is authorized from this result. PR #8 and SD-015 were untouched.

## October 6 continuation check

Mike authorized a bounded attempt to finish the security PR and then reconcile PR #8, conditional on a genuine security Verify PASS. A new `npm ci` succeeded, and the required `npm audit --audit-level=moderate` again failed with the same five high-severity dependency nodes from GHSA-vfj7-8cjw-p6xm. Current npm metadata still lists `braces@3.0.3` as latest, `eslint-config-next@16.4.0` as latest, and the latest Next ESLint plugin still depends on `fast-glob@3.3.1`. The official GitHub advisory still lists no patched `braces` version. No supported compatible upstream repair is available.

GitHub reports PR #8 open at `fc42e37`, changing only `docs/TASKS.md`. Read-only HTTPS remote inspection confirms `main` and `fix/security-audit-2026-10` remain at `a2655e3`; this local branch has zero commits ahead or behind. An SSH fetch failed for lack of a public key, but remote identity and state were confirmed through the GitHub connector and HTTPS without changing refs.

Local `main` is already at `fc42e37` (the PR #8 head commit), one commit ahead of `origin/main`. This pre-existing local state was not changed or treated as an upstream merge.

The existing Verify result remains **BLOCKED**. No exception was introduced; the full audit gate remains intact. No security PR was opened, and PR #8 was not updated or merged. Mike independently verified Docker Desktop; this task made no Docker or Supabase change.

## Resumed independent verification — PASS locally

Mike approved a temporary exception for GHSA-vfj7-8cjw-p6xm on only the verified development ESLint path, with review by 2026-11-06. This resolves the earlier policy blocker. Hosted PR checks remain a separate required integration gate.

### Advisory and dependency evidence

- Fresh raw `npm audit --audit-level=moderate` still fails on one GHSA-vfj7-8cjw-p6xm root advisory (five high-severity reported nodes). npm offers only a breaking `eslint-config-next@14.2.35` downgrade. No force fix was used.
- Current registry metadata: `braces@3.0.3` remains latest; `eslint-config-next@16.4.0` remains latest; current `@next/eslint-plugin-next` still requires `fast-glob@3.3.1`. The official braces advisory still lists no patched version.
- Fresh `npm ci` installed the exact lockfile. `npm ls` resolves `sharp@0.35.5`, `source-map-js@1.2.2`, `braces@3.0.3`, and `audit-ci@7.1.0`. The sharp and source-map-js versions meet their published patched thresholds.
- `npm explain braces` yields only `eslint-config-next@16.3.6 -> @next/eslint-plugin-next@16.3.6 -> fast-glob@3.3.1 -> micromatch@4.0.8 -> braces@3.0.3`. `package.json` places `eslint-config-next` in `devDependencies`; every lockfile node on the chain has `dev: true`. `npm ls braces --omit=dev --all` is empty and `npm audit --omit=dev --audit-level=moderate` finds zero. The latter is reachability evidence, not the CI gate.
- Next's ESLint plugin calls `fast-glob.globSync` on trusted ESLint `settings.next.rootDir`; this project does not set that option. Source searches of `src`, `scripts`, and `tests` found no imports of this chain; the production server trace contains no `node_modules/braces`. No observed application request or user data path reaches this instance. The residual lint-process denial-of-service risk remains accepted only until the exception expires or upstream patches it.

### Audit-policy challenge

- `audit-ci@7.1.0` is exact-pinned as a development dependency. Its official documentation defines full-path allowlist records, expiry, `moderate: true` semantics, and continued display of allowlisted findings.
- `audit-ci.jsonc` contains one record: `GHSA-vfj7-8cjw-p6xm|eslint-config-next>@next/eslint-plugin-next>fast-glob>micromatch>braces`. It sets `moderate: true`, `show-found: true`, and 2026-11-06 expiry; it does not set `skip-dev` or any broad module/advisory allowance.
- `npm run audit:ci`: PASS on the exact live finding while visibly reporting the braces advisory and its five affected nodes.
- Two live negative checks changed only the allowlist in temporary configs. An incorrect path with the same GHSA failed, printing the exact found path. The exact path with a different GHSA also failed. Both exited 1.
- `npm run test:audit-policy`: PASS. It feeds synthetic, non-installed unrelated moderate, high, and critical findings through the installed `audit-ci` implementation and requires each to reject. No vulnerable fixture dependency was added. The test also asserts the exact configured path, threshold, and expiry.

### Regression and diff

- `npm run lint`: PASS; `npm run typecheck`: PASS; `npm test`: 9/9 PASS; `npm run build`: PASS, six routes; `npm run test:e2e`: 4/4 Chromium PASS.
- The lockfile adds 31 packages for `audit-ci`; existing version changes are restricted to `sharp` and its platform/libvips packages plus `source-map-js`. No existing package was removed. The new package resolves from npm. `git diff --check` passes.
- No application product source, route, fixture, privacy data flow, or runtime behavior changed. CI audit wiring, a focused security regression test, lockfile patches, the exact-path config, and security/current-state documentation are the task scope.

The local Verify decision is **PASS**. The protected security PR may be created; merge still requires all hosted checks to PASS. PR #8 remains untouched until the security PR merges.
