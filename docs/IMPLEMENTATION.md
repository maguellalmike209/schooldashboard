# School Dashboard — Current Implementation

SD-001 established the Next.js application foundation. SD-002 added the read-only shell and navigation. SD-003 added the Courses overview and reusable Course Cards. SD-004 added course-specific current-week and material context to Course Page. The project uses npm with `package.json` and `package-lock.json`; the verified direct framework versions are Next.js 16.3.6, React 19.3.0, TypeScript 6.0.3, and Tailwind CSS 4.3.3. No dependency was added for SD-002 through SD-004.

The App Router lives in `src/app/`. The root layout provides School Dashboard identity, a responsive sidebar/mobile header, four primary links, and one main region. The small client component `src/components/primary-navigation.tsx` marks the active link from the pathname; Courses remains active on a Course Page. `globals.css` imports Tailwind CSS. Root configuration includes TypeScript, ESLint, and PostCSS. `next.config.ts` disables Next.js agent-rule generation so development commands preserve the repository's existing `AGENTS.md`.

The implemented routes are `/` (Dashboard), `/courses`, `/courses/[courseId]`, `/weekly-plan`, and `/today`. Dashboard is the root view. Courses lists both shared static courses as linked Course Cards; Dashboard reuses compact versions. Known course IDs show their matching identity and supplied course-specific context. Unknown course IDs return a clear 404. Weekly Plan and Today remain intentionally limited until SD-005 and SD-006 add their owned content. Course Page is reached through course selection, not a top-level nav item.

`src/lib/academic-context.ts` is the small shared static source for Fall Quarter 2026, fixed reference date September 25, 2026, academic week September 21–27, 2026, PHY 009D / Modern Physics, and date-only Lecture #02 on September 25. It now also contains a lightweight fictional WRT 101 / Academic Writing course for multi-course UI behavior. Dashboard displays the PHY lecture through its Course ID and an honest placeholder for later study-plan content. The lecture entry is course schedule context; it has no supplied time or room and is not a timed Class Meeting. Course Cards currently show “No study tasks planned” because no Study Tasks exist; weekly progress calculations arrive with SD-005. No Assignments, Next Action, persistence, authentication, AI, or integrations are implemented.

Course Page filters static week context and materials by Course ID. PHY 009D shows the source-supported course beginning, scheduled Lecture #02 topics, and assigned textbook as reference context. WRT 101 has no supplied week topic or materials and displays explicit missing-context states. Neither route adds reading assignments or Study Tasks from Course Facts; objectives, Study Tasks, progress, and deadlines remain for SD-005 through SD-007.

From the repository root, use Node.js 20.9 or later and npm:

| Command | Purpose |
| --- | --- |
| `npm ci` | Install dependencies from the lockfile. |
| `npm run dev` | Serve the development app at `http://localhost:3000`. |
| `npm run lint` | Run ESLint. |
| `npm run typecheck` | Generate Next.js route types, then run TypeScript without emitting files. |
| `npm run build` | Create the production build. |
| `npm run start` | Serve the production build after `npm run build`. |

SD-002 Verify confirmed `npm ci`, lint, typecheck, and build succeed. Production HTTP returned 200 for all five intended routes and 404 for an unknown course. Browser inspection at approximately 373 px mobile and 1273 px desktop found visible navigation, readable content, and no horizontal overflow; keyboard Tab showed a visible focus outline and Enter activated a primary link. No application testing framework has been added.

SD-003 Verify confirmed lint, typecheck, and production build pass. Production HTTP returned 200 for Dashboard, Courses, and both known course routes, and 404 for an unknown course. Browser inspection confirmed both card links on Courses and Dashboard, the matching WRT 101 route, and no horizontal overflow at mobile and desktop widths. The course-card focus style was inspected in source; a separate keyboard activation check was not completed for SD-003.

SD-004 Verify confirmed lint, typecheck, and production build pass. Production HTTP returned 200 for Dashboard, Courses, and both known Course Pages, and 404 for an unknown course. Browser inspection confirmed correct PHY content, WRT isolation and empty states, a clear unknown-course page, and no horizontal overflow at mobile and desktop widths. No Course Material links or uploads were added.

Requirements and future work belong in [V1_SPEC.md](V1_SPEC.md) and [TASKS.md](TASKS.md).
