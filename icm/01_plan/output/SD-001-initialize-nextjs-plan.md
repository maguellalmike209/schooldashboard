# SD-001 — Initialize Next.js Application Plan

## Human Review Summary

- **Objective:** Establish a minimal, runnable Next.js + React + TypeScript + Tailwind CSS application in this existing repository. Preserve the documentation and ICM structure.
- **Proposed approach:** Add the framework files directly at the repository root using npm and the standard App Router under `src/app`. Keep only a small static page that proves rendering and Tailwind styling work.
- **Material decisions requiring Mike:** None. The stack is already accepted; npm, `src/app`, and ordinary framework configuration are reversible setup choices. This request authorizes Plan only, so Build awaits a separate instruction to start that stage.
- **Learning focus:** `src/app/page.tsx` defines `/`, while `src/app/layout.tsx` supplies the required document shell. The package scripts are the repeatable commands for development and verification. These concepts can be learned during Build; no concept requires study before a material approval.
- **Plan status:** Ready for Build after this Plan-only handoff; no blocker or material decision remains.

## Current Repository State

- On inspection, `main` tracks `origin/main`; `git status --short --branch` showed no staged, modified, or untracked files before this Plan artifact. No application or package-manager files exist.
- Tracked content consists of `AGENTS.md`, `CONTEXT.md`, `README.md`, eight durable documents in `docs/`, and the three ICM stage instructions. The ICM output directories exist and the Plan output directory is empty before this artifact.
- `docs/IMPLEMENTATION.md` agrees with inspection: there is no Next.js source, package manifest, dependency lockfile, runtime configuration, or application test/build command. `docs/TASKS.md` lists SD-001 as Not started, ahead of SD-002.
- Local tools: Node.js `v24.21.0` and npm `11.19.0`. A `pnpm` command is available only from a Codex runtime fallback path; the repository gives no reason to adopt it. There is no package-manager convention to preserve.
- Context read for this Plan: `AGENTS.md`, `CONTEXT.md`, `icm/01_plan/CONTEXT.md`, `docs/ARCHITECTURE.md`, `docs/TASKS.md`, `docs/IMPLEMENTATION.md`, `docs/DECISIONS.md`, and the short root `README.md`. No product/UI/fixture specifications or course materials were needed for a framework-only task.

## Scope

- Initialize the accepted Next.js, React, TypeScript, and Tailwind CSS stack **inside this repository**, with npm as the package manager and a committed `package-lock.json` after Build/Verify.
- Provide one root App Router page, its required root layout, and minimal global Tailwind CSS. The page should identify School Dashboard as an application foundation without presenting academic information or pretending the product is implemented.
- Provide a private package manifest with `dev`, `build`, `start`, `lint`, and `typecheck` scripts; standard TypeScript, PostCSS, ESLint, and Git ignore configuration; and only framework-required dependencies and conventional development tooling.
- Preserve all existing documentation and ICM content. After a verified PASS, update current-state documentation and SD-001 status to describe the actual installed setup and working commands.

## Out of Scope

- SD-002 Dashboard shell/navigation and every later view: Courses, Course Page, Weekly Plan, Today, or upcoming assignments.
- Academic mock/fixture data, shared academic plan, dates, tasks, progress calculations, and product interactions.
- Supabase, persistence, authentication, AI, ingestion, Google Calendar, Google Drive, uploads, APIs, route handlers, service layers, or future-service scaffolding.
- A component library, state-management layer, design system, testing framework, deployment configuration, CI, or additional packages unrelated to this foundation.
- Application initialization, package installation, commits, and pushes **during this Plan stage**.

## Proposed Implementation

1. **Use manual installation in the existing root.** The repository already has valuable files, and the Create Next App flow is oriented to creating a new project directory. Build should create a controlled manifest/configuration and install the standard packages directly so generated starter files cannot replace project documentation. [Next.js installation](https://nextjs.org/docs/app/getting-started/installation) documents manual installation and App Router's required layout/page.
2. **Use npm.** It is installed locally, needs no extra package-manager setup, and will produce `package-lock.json`. Record resolved compatible package versions in the manifest/lockfile. At Build time, check current stable package and Node requirements before installation; the inspected Node version exceeds the minimum in the [current Next.js installation guide](https://nextjs.org/docs/app/getting-started/installation). Do not select a canary release.
3. **Use `src/app` with App Router.** This keeps application code distinct from root configuration and the existing `docs/` and `icm/` trees. Create `src/app/layout.tsx`, `src/app/page.tsx`, and `src/app/globals.css`. The root layout imports global CSS and renders `<html>`/`<body>`; the page is static, brief, and uses at least one Tailwind utility so styling can be verified. No client component is needed.
4. **Configure only the accepted stack.** Install `next`, `react`, `react-dom` as runtime dependencies. Install TypeScript and React/Node types, `tailwindcss`, `@tailwindcss/postcss`, `postcss`, `eslint`, and `eslint-config-next` as development dependencies. Use `postcss.config.mjs` with `@tailwindcss/postcss` and `@import "tailwindcss"` in global CSS, following [Tailwind's Next.js guide](https://tailwindcss.com/docs/installation/framework-guides/nextjs). Use ESLint flat config with Next's core-web-vitals and TypeScript presets, following [Next.js ESLint guidance](https://nextjs.org/docs/app/api-reference/config/eslint). No Tailwind v3 config, custom Next config, fonts, icons, images, or extra runtime library is required.
5. **Keep checks explicit.** Manifest scripts: `dev: next dev`, `build: next build`, `start: next start`, `lint: eslint .`, and `typecheck: next typegen && tsc --noEmit`. Current Next.js uses the ESLint CLI and documents `next typegen` before standalone type checking; Build should confirm those commands against the actual installed major version. [Next.js ESLint](https://nextjs.org/docs/app/api-reference/config/eslint), [Next.js CLI](https://nextjs.org/docs/app/api-reference/cli/next).
6. **Keep generated content minimal.** Replace generic Next starter marketing, sample logos, external links, and unused sample assets with a small School Dashboard foundation page. Keep only the required framework files and configuration. Add a `.gitignore` for `node_modules/`, `.next/`, generated type/cache/build output, and local `.env*` files; keep `package-lock.json` tracked. The generated `next-env.d.ts` should be ignored, per [Next.js TypeScript guidance](https://nextjs.org/docs/app/api-reference/config/typescript).

## Expected File Changes

| Stage | Expected files/directories | Purpose |
| --- | --- | --- |
| Plan now | `icm/01_plan/output/SD-001-initialize-nextjs-plan.md` | Durable Build handoff only. |
| Build | `package.json`, `package-lock.json`, `.gitignore`, `tsconfig.json`, `eslint.config.mjs`, `postcss.config.mjs` | Dependencies, scripts, and standard configuration. |
| Build | `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/globals.css` | Minimal working root route and Tailwind proof. |
| Verify after PASS | `README.md`, `docs/IMPLEMENTATION.md`, `docs/TASKS.md`, and the current-state wording in `docs/ARCHITECTURE.md` and `docs/DECISIONS.md` if needed | Replace statements that the app is not initialized with verified facts and commands; mark SD-001 Done only after PASS. |

Do not overwrite or delete `AGENTS.md`, `CONTEXT.md`, the existing `docs/` and `icm/` trees, or `.git`. Build may omit an optional config file if the installed framework works without it and the acceptance checks still pass. No `public/` assets are needed unless the minimal page genuinely requires one.

## Acceptance Criteria

- [ ] The existing documentation, ICM instructions, and Git history are preserved, with no unrelated changes.
- [ ] The repository root has a valid private npm manifest and lockfile declaring compatible stable Next.js, React, TypeScript, and Tailwind CSS packages, without unrelated product or service dependencies.
- [ ] `npm run dev` serves `/` successfully and displays a minimal School Dashboard foundation page; at least one Tailwind utility visibly applies.
- [ ] `npm run build` produces a successful production build, and `npm run start` serves that build.
- [ ] `npm run lint` and `npm run typecheck` pass with the installed framework version.
- [ ] Only the root starter page exists; no Dashboard functionality, navigation, academic fixture, persistence, authentication, AI, or integration code is present.
- [ ] Generated dependencies/build artifacts and local environment secrets are ignored; the lockfile remains tracked.
- [ ] After Verify PASS, README/current-state docs give accurate setup/run/check commands and `docs/TASKS.md` records SD-001 as Done. No documentation claims functionality beyond the scaffold.

## Verification Plan

1. Inspect `git diff`, `git status --short`, package dependencies, and tracked files; confirm the original docs/ICM remain intact and no generated files, secrets, or out-of-scope code are staged.
2. Run `npm run lint`, `npm run typecheck`, and `npm run build`. If a framework-generated type/config change is required, make the smallest correction and repeat affected checks.
3. Start the development server, request `/`, and inspect the rendered page (including a Tailwind-styled element). Stop it. Start the production server from the successful build and confirm `/` responds, then stop it.
4. Compare observed commands and files with README/IMPLEMENTATION/TASKS updates. Verify should report evidence and limitations, then finalize only after a full PASS according to the repository ICM. No separate automated testing framework is justified for this scaffold.

## Risks / Blockers

- **Blockers:** None identified at Plan time.
- **Build-time uncertainty:** Registry/network access and the exact stable dependency versions may change before Build. Confirm the resolved versions and compatibility when installing; a download failure is an environment issue to report, not a reason to alter product scope.
- **Scope risk:** A generic scaffold can introduce sample assets, content, or extra config. Review and remove unused defaults before verification. Do not start SD-002 to make the page feel more complete.
- **Documentation timing:** `IMPLEMENTATION.md` and task status must continue to describe actual reality until verification establishes a PASS. The present Plan artifact itself is not implementation evidence.
- **Material human decision:** None. Any unexpected requirement for a significant dependency or durable architecture change returns to Plan/Human Review.

## Build Handoff

1. Reinspect Git status and this Plan. Do not overwrite pre-existing work if the repository changes before Build.
2. In the existing repository root, use npm to initialize the manifest and install the planned packages (illustrative commands below). Set the manifest to `private: true`, supply the specified scripts, and keep the resulting `package-lock.json`.

   ```powershell
   npm init -y
   npm install next@latest react@latest react-dom@latest
   npm install -D typescript @types/node @types/react @types/react-dom tailwindcss @tailwindcss/postcss postcss eslint eslint-config-next
   ```

3. Add the small `src/app` page/layout/CSS and standard configuration listed above. Use current official guidance if a setup detail changed. Remove unnecessary starter content; leave all existing project documents and ICM instructions intact.
4. Run `npm run lint`, `npm run typecheck`, `npm run build`, then development and production `/` smoke checks. Report any deviation from this Plan. Hand off for independent Verify; Build does not commit or push.
5. Prevent accidental SD-002 expansion: no Dashboard shell, navigation, summary panels, academic data, or additional routes in this task.

READY FOR BUILD — NO MATERIAL HUMAN DECISION REQUIRED
