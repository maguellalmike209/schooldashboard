# SD-015 — Authenticated Academic Term and Course vertical slice

## Entry and risk

Authorized task: SD-015 only. Risk tier: **R3**, because this introduces accounts, sessions, private persistent academic data, and cross-user authorization. On 2026-10-07 the clean `feat/sd-015-authenticated-academic-slice` checkout, local `main`, and `origin/main` all resolved to `d60b637dee703be7396fbd36b31d5e97407da5d9`; GitHub's visible `main` commit history showed the same head. The canonical remote is `maguellalmike209/schooldashboard`. No existing SD-015 work was present.

## Current implementation and scope

Next.js 16 App Router renders five read-only Milestone 1 views from `src/lib/academic-context.ts`. There is no auth, server DAL, database, migration, or private route. Existing audit, lint, typecheck, Vitest, build, browser, CodeQL, and Dependency Review gates must remain. Add one small authenticated term/Course experience; leave the unrelated fixture-backed planning, Assignment, Objective, Study Task, and material views intact. Do not create hosted infrastructure or start later roadmap tasks.

## Accepted architecture and current upstream check

Keep D-060–D-065: Supabase Auth/PostgreSQL; request-scoped `@supabase/ssr` clients; verified server identity; a `server-only` DAL; application ownership and PostgreSQL RLS; Zod validation; reviewed SQL migrations. The current official SSR guide still calls for browser and server clients, a Next.js 16 `proxy.ts` to refresh cookies, `getClaims()` for protected data, `getUser()` when a fresh Auth record is required, and warns that the cookie-derived `getSession()` user is not authoritative. Next.js recommends authorization near the data source in a DAL. Current Supabase RLS guidance requires grants plus explicit SELECT/INSERT/UPDATE/DELETE policies and both `USING` and `WITH CHECK` for UPDATE. Current CLI guidance supports pinned npm CLI, local Docker-compatible stack, `supabase db reset`, and `supabase test db` for pgTAP. Current npm registry metadata checked: `@supabase/ssr` 0.12.7, `@supabase/supabase-js` 2.117.2, Zod 4.6.5, Supabase CLI 2.120.0. Pin exact versions in the lockfile. No accepted architecture change is needed.

Sources: [Supabase SSR clients](https://supabase.com/docs/guides/auth/server-side/creating-a-client?framework=nextjs&queryGroups=framework), [Supabase RLS](https://supabase.com/docs/guides/database/postgres/row-level-security), [Supabase CLI](https://supabase.com/docs/guides/local-development/cli/getting-started), [Supabase database tests](https://supabase.com/docs/guides/local-development/testing/overview), [Next.js authentication/DAL](https://nextjs.org/docs/app/guides/authentication).

## Data, ownership, and schema

Supabase Auth `auth.users.id` is the User identifier; no profile table or extra PII. `academic_terms`: UUID primary key, `owner_id` required FK to Auth User, bounded nonblank `name`, unique `(owner_id, name)` and `(id, owner_id)` for relationship integrity. `courses`: UUID primary key, required `owner_id`, `term_id`, bounded nonblank `code` and `name`; composite FK `(term_id, owner_id)` to the term's `(id, owner_id)`; unique course code within an owner's term; indexes on owner/term access. IDs are stable UUIDs. Do not copy fixture week, schedule, progress, instructor, materials, or timestamps without a present need. Course delete removes only that Course row; no dependent entity exists in this slice. Term deletion with Courses is restricted by FK, and Auth User deletion with academic rows is restricted pending a later accepted account deletion policy. The UI need only create/select terms and perform Course CRUD. Owner IDs come from verified identity, never request input.

Grant no table operations to `anon`; grant only needed term and Course operations to `authenticated`. Enable RLS on both private tables. Explicit owner predicates on SELECT/DELETE, owner checks on INSERT, and old/new row checks on UPDATE. RLS plus the composite FK prevents a user from attaching a Course to another user's term. Direct PostgREST requests remain subject to RLS even if they bypass the UI/DAL.

The selected provider removes browser session storage and revokes refresh tokens at logout, while an already issued access JWT remains valid until its configured expiry ([Supabase sign-out behavior](https://supabase.com/docs/guides/auth/signout)). Set a one-hour JWT lifetime, test that the signing-out browser loses protected access, and report the residual bearer-token window accurately in Verify.

## Trust and privacy

Actors: anonymous, authenticated User A, authenticated User B. Browser form/route/cookie data are untrusted. The server verifies the session before every protected operation, validates identifiers and exact input shapes with Zod, checks owned resources/term relationships in the DAL, and uses a user-session Supabase client subject to RLS. The database independently enforces grants, RLS, FKs, uniqueness, and length/blank constraints. Return minimal DTOs and generic missing/denied errors. Protected responses and refreshed cookie responses must not be shared-cacheable. Logout must remove the browser's effective protected access, subject to the provider JWT expiry behavior noted above. Class 2 email/account ID, term name, Course code/name remain private; Class 4 tokens and secret keys stay out of Git, client bundles, responses, and logs. The public publishable key is configuration, not authorization. Local tests use only synthetic users/data.

## Failure, recovery, and verification

Provider/DB failure denies protected operations and shows safe errors; validation errors do not leak SQL or private content. Local schema replay from committed migrations is the recovery baseline. No remote migration or Release is authorized. RLS tests must challenge anonymous, A, and B across both tables' SELECT/INSERT/UPDATE/DELETE, including owner reassignment and cross-owner FK. App/integration tests must challenge verified identity, direct ID reads/updates/deletes, collection isolation, owner spoof, malformed/nonexistent IDs, empty/oversized/unexpected fields, and browser logout. Browser test the sign-in → Course CRUD → logout path. Inspect repository, logs, and client output for secrets. Run clean install, audit, audit-policy test, migration reset, DB tests, integration tests, lint, typecheck, Vitest, build, and Playwright when supported. CI retains existing gates and adds the local Supabase proof.

## Environment note

Initial inspection found no Docker command on the Codex sandbox PATH. On resumption, Docker Desktop 4.94.0 was found in the host's per-user installation. Invoking its CLI through an approved host execution boundary reached the active `desktop-linux` engine (client/engine 29.8.2); `docker version`, `docker info`, and `docker ps` succeeded. No Docker, Podman, or WSL installation/change was needed. Before local reset, the CLI project link was absent, the API target was `127.0.0.1:54321`, and the disposable containers were named for this repository. The explicit `supabase db reset --local` then replayed the committed migration. This resolves the temporary environment blocker without changing the accepted architecture.

## Material decisions

No material product, privacy, or security decision remains for this local synthetic slice. Account deletion, production retention/backups, hosted project, and SMTP remain outside SD-015.

**READY FOR BUILD — NO MATERIAL HUMAN DECISION REQUIRED**
