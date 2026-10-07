# SD-015 — Authenticated Academic Term and Course Build handoff

## Build status and risk

**READY FOR INDEPENDENT VERIFY — R3.** The local Auth/database stack, implementation, and security tests run. Build does not itself establish final PASS or hosted-check status.

## What changed

- Added exact-pinned `@supabase/ssr`, `@supabase/supabase-js`, Zod, `server-only`, and Supabase CLI dependencies with a lockfile.
- Added local Supabase configuration, local email templates, one committed SQL migration, and 40 pgTAP assertions.
- Added email/password signup with local confirmation, sign-in, sign-out, recovery, SSR cookie refresh, and an authenticated Academic Term/Course interface.
- Added a server-only DAL using `getClaims()` for verified identity, actor-scoped term/Course queries, Course CRUD, and minimal DTOs. Strict Zod schemas reject malformed or unexpected inputs.
- Extended CI with local Supabase startup, explicit local migration replay, database/RLS tests, application security browser tests, and client-bundle credential scanning. Existing gates remain.

## Security controls built

Normal application requests use only the public publishable key with a request-scoped user session; no service-role or RLS-bypassing client is in the app path. Both private tables have explicit grants and RLS SELECT/INSERT/UPDATE/DELETE policies. UPDATE checks both existing and resulting ownership. A composite foreign key enforces Course/Term same-owner integrity. Private page responses carry `private, no-store`. User-visible failures avoid database detail.

## Local Build evidence

- Codex's sandbox PATH did not include Docker. The host's per-user Docker Desktop CLI reached the `desktop-linux` engine when invoked through the approved execution boundary. `docker version`, `docker info`, and `docker ps` succeeded; no host installation or WSL change was required.
- Before reset, there was no CLI project link or branch target; the API was loopback `127.0.0.1:54321`, and the running containers were this repository's local stack. `supabase db reset --local` applied `20261007070000_academic_terms_courses.sql` successfully.
- `supabase test db --local` passed all 40 assertions. The two-user security browser suite passed, including local email confirmation, own Course CRUD, cross-user Data API and server-action attacks, anonymous denial, validation, collection isolation, and logout.
- Clean `npm ci --cache ./.npm-cache`, `npm run audit:ci`, `npm run test:audit-policy`, lint, typecheck, 13 Vitest tests, production build, four existing browser tests, the security browser test, client-bundle scan, and `git diff --check` passed.
- The first browser run exposed a confirmation redirect/session timing issue and test races. The callback now lands at the sign-in page after confirmation; the test signs in explicitly. Test selectors, post-tampering navigation, form submission, and logout waits were corrected, then the full security browser test passed.

## Verify targets

Independently inspect the identity/DAL path, live RLS policies and data constraints, migration replay, anonymous and cross-user attacks, server-action bypass attempts, logout, validation, response caching, secrets/logs/client bundle, CI reproducibility, dependency scope, and Milestone 1 regressions. Supabase global sign-out revokes refresh sessions, while an already issued access JWT remains valid until its configured one-hour expiry; report this provider behavior accurately.
