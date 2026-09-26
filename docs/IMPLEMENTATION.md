# School Dashboard — Current Implementation

SD-001 established and verified a minimal Next.js application in the existing repository. The project uses npm with `package.json` and `package-lock.json`; the verified direct framework versions are Next.js 16.3.6, React 19.3.0, TypeScript 6.0.3, and Tailwind CSS 4.3.3. The repository still contains its root documentation, eight durable documents under `docs/`, and Plan, Build, and Verify instructions under `icm/`.

The App Router lives in `src/app/`. `layout.tsx` provides the document shell, `page.tsx` renders the single static root page, and `globals.css` imports Tailwind CSS. Root configuration includes TypeScript, ESLint, and PostCSS. `next.config.ts` disables Next.js agent-rule generation so development commands preserve the repository's existing `AGENTS.md`.

From the repository root, use Node.js 20.9 or later and npm:

| Command | Purpose |
| --- | --- |
| `npm ci` | Install dependencies from the lockfile. |
| `npm run dev` | Serve the development app at `http://localhost:3000`. |
| `npm run lint` | Run ESLint. |
| `npm run typecheck` | Generate Next.js route types, then run TypeScript without emitting files. |
| `npm run build` | Create the production build. |
| `npm run start` | Serve the production build after `npm run build`. |

Verification on Node.js 24.21.0 and npm 11.19.0 confirmed `npm ci`, lint, typecheck, and build succeed. Development and production servers returned HTTP 200 for `/` and its Tailwind CSS; `/courses` returned 404 as expected before SD-002 and later views. The root page is only a framework proof. No Dashboard, navigation, academic fixture, persistence, authentication, AI, or integration implementation exists. No application testing framework has been added.

Requirements and future work belong in [V1_SPEC.md](V1_SPEC.md) and [TASKS.md](TASKS.md).
