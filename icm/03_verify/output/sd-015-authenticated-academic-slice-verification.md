# SD-015 — Authenticated Academic Term and Course Verification

## Local Verify result

**PASS — R3 local security verification.** This result concerns the SD-015 implementation and local tests at the task branch. Protected PR checks and merge remain separate finalization conditions. Verify independently reviewed source, SQL policies, the test assertions, runtime behavior, generated output, and the task diff. Build's claims were treated as hypotheses.

## Runtime and reproducibility

The Codex sandbox PATH omitted Docker, while the installed per-user Docker Desktop 4.94.0 CLI reached the `desktop-linux` engine through the approved host execution boundary. `docker version`, `docker info`, and `docker ps` succeeded with client/engine 29.8.2. No Docker/Podman reinstall or WSL change occurred. The pinned Supabase CLI is 2.120.0. Before **each** reset, Verify checked that `supabase/.temp/project-ref` was absent, the CLI branch marker was local, API URL was `http://127.0.0.1:54321`, and `supabase_db_schooldashboard` was running. Explicit `supabase db reset --local` recreated the disposable database and replayed `20261007070000_academic_terms_courses.sql`. No linked project or remote migration was used.

## Requirement → control → adversarial attempt → observed evidence

| Accepted requirement | Implementation/control | Independent attack or check | Observed evidence |
| --- | --- | --- | --- |
| Real Auth and trusted identity | Supabase Auth, SSR cookie clients, `getClaims()` in `server-only` DAL before protected queries | Two synthetic users sign up, confirm through local Mailpit, then sign in; anonymous page and forged server-action POST | Both users reached private slice; anonymous page redirected to sign-in; anonymous server action redirected to login without a Course write. |
| Persistent terms/Courses | SQL migration, local PostgreSQL, term creation and Course CRUD | Clean local reset, browser create/read/update/delete | Migration replay succeeded; A created Term/Course, viewed, updated, then deleted the Course; persisted reads reflected changes. |
| RLS and least privilege | No `anon` table grants; both private tables have RLS and four action-specific owner policies each | pgTAP as anon/A/B plus direct user-session Data API requests | 40/40 pgTAP assertions passed. Anonymous SELECT/INSERT/UPDATE/DELETE on both tables denied. A and B collections each returned only their own rows. |
| Direct-ID and cross-user denial | DAL actor filters plus RLS `auth.uid()` ownership; IDs grant no access | A and B open each other's Course URL; A directly reads/updates/deletes B by valid ID; B directly reads A | Foreign URLs returned 404; cross-user reads returned zero rows; update/delete returned zero rows; B's record remained intact. |
| Owner and relationship integrity | DAL derives `owner_id` from claims, strict Zod shapes, RLS old/new owner checks, composite `(term_id, owner_id)` FK | A inserts B owner, adds `owner_id` to server-action form, attaches B Term, updates owner/term in pgTAP | Spoofed insert/form rejected; cross-owner Term insert/update rejected; owner reassignment rejected. |
| Course CRUD authorization | DAL checks term ownership and scopes each Course mutation by actor; RLS independently enforces | A tampers update/delete hidden Course ID to B's and submits actual server forms; own CRUD baseline | Cross-user actions returned generic unavailable state and did not alter B; own create/read/update/delete succeeded. |
| Runtime and durable validation | Strict Zod schemas; PostgreSQL nonblank/length/unique/FK constraints | Malformed and nonexistent IDs; blank and 121-character name; unexpected owner field; DB invalid and duplicate rows | Malformed/nonexistent page IDs returned 404; invalid forms were rejected; database constraints failed as expected in pgTAP. |
| Collection isolation and privacy | Minimal DTO projections; owner-filtered terms/Courses; dynamic private route; `private, no-store` | Both user collections, private response headers/body | A saw no B Course and B saw no A Course. Private response had `private, no-store`; response body had no privileged-key/JWT pattern. |
| Logout/session behavior | Global Supabase sign-out; protected DAL verification | Sign out A, wait for signed-out result, request `/academic` again | A returned to sign-in and remained denied from protected page after navigation. |
| Secret boundary | Public publishable key only in app client; no privileged application credential; ignored local env | Source/config scan, client bundle scan, browser response scan, Next server log scan, Git diff/status | No secret/service key, JWT, or token pattern found in client bundle, response, logs, or task diff. `.env.local` absent; no private fixture staged. |
| Existing Milestone 1 behavior | Fixture routes remain separate | Existing Vitest and Playwright suites | 13/13 Vitest and 4/4 browser tests passed. |

## Gate evidence

- `npm ci --cache ./.npm-cache`: PASS with lockfile. New direct dependencies are official maintained Supabase packages, Zod, `server-only`, and pinned development Supabase CLI. No ORM, fork, privileged runtime credential, or install-script exception was added.
- `npm run audit:ci` and `npm run test:audit-policy`: PASS. The existing narrow development-only braces exception is unchanged.
- `npm run supabase:db:reset`: PASS after local target proof; one committed migration replayed.
- `npm run supabase:test:db`: PASS, 40/40 PostgreSQL pgTAP assertions.
- `npm run test:e2e:security`: PASS, one full synthetic two-user Auth/browser/Data API/server-action attack suite after the fresh reset. Its runner also rejects credential-like Next server logs.
- `npm run lint`, `npm run typecheck`, `npm test`, `npm run build`: PASS.
- `npm run test:e2e`: PASS, 4/4 existing Chromium tests.
- `npm run test:client-bundle-secrets`: PASS over 12 generated static files. Targeted source/Git/response scans found no secret or token material.
- `git diff --check`: PASS. No unrelated or generated private-data file is intended for the task commit.

## Independent challenge and limits

Verify inspected `src/lib/academic/dal.ts`, `src/lib/supabase/server.ts`, `src/proxy.ts`, the migration, pgTAP assertions, browser attack code, and CI. Authorization is in the DAL and database, while proxy redirects/cookie refresh are UX/session support. The browser test exercises actual Auth and direct Data API/server-action paths; pgTAP runs actual PostgreSQL roles and policies. The local stack contains synthetic accounts only.

Supabase's [sign-out contract](https://supabase.com/docs/guides/auth/signout) revokes the refresh session but an already copied access JWT remains valid until its configured one-hour expiry. The passed logout evidence establishes loss of the application's browser session and protected access, not instant revocation of an external copied bearer token. This is accepted provider behavior from Plan, with no custom protocol introduced.

The current local result is full PASS. Hosted CI, CodeQL, Dependency Review, protected-main rules, task-scoped PR review, merge, and local-main synchronization must still complete before SD-015 is **complete**. No hosted Supabase project, deployment, Release, or later roadmap task was started.
