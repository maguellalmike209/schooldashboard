# SD-014 — Persistent multi-user architecture and provider selection

## Objective

Accept a secure, economical Milestone 2 auth and persistence architecture and define the evidence needed before trusting its first runtime slice. This task changes documentation only.

## Current State

At `12ca738` (`main` and `origin/main` when planning), Next.js 16.3.6 serves five read-only views from a static fixture. There is no auth, DAL, database, Supabase config, or environment file. npm has a lockfile; CI runs locked install, audit, lint, typecheck, Vitest, build, and Playwright. Hosted security checks include CodeQL and dependency review. An existing uncommitted `docs/TASKS.md` edit reframes Milestone 2; preserve it separately from this task commit.

## Risk Tier

R3. The deliverable is documentation, but it establishes future identity, session, private-data, and authorization boundaries. No R4 action or production operation is in scope.

## Accepted Provider Architecture

Use one provider, Supabase, for Auth and hosted PostgreSQL. This keeps identity-to-RLS integration direct. The relational academic domain benefits from foreign keys, constraints, transactions, and migrations. The Milestone 1 fixture informs concepts but is not a production schema. Firebase Auth + Firestore would substitute a document model and security rules for relational integrity. A split auth/Postgres stack adds identity integration and operational boundaries without a demonstrated benefit. Neither is materially superior here. Do not select an ORM for Milestone 2 without a concrete need.

## Authentication Architecture

Supabase Auth initially supports email/password signup, sign-in, logout, email confirmation, and provider password recovery. No social/phone auth, custom password or token protocol, or MFA mandate. Use current official `@supabase/ssr` cookie-based Next.js 16 pattern with `proxy.ts` for refresh; recheck the docs when SD-015 implements it. The provider's cookie attributes and CSRF/origin protections must satisfy `SEC-SESSION-003` and `SEC-CSRF-001` in the actual deployment setup.

## Session / Identity Flow

Browser → cookie session → Next.js Proxy refresh → trusted server code verifies identity with `getClaims()` (or `getUser()` when a fresh Auth record is needed) → server-only DAL → request-scoped Supabase client using the publishable key and that user's session → PostgreSQL grants and RLS. Do not authorize from `getSession()`'s cookie-derived user object, client IDs/email/role, route IDs, or UI state. Logout must remove effective protected access; private responses and refreshed `Set-Cookie` responses must not be shared-cacheable.

## Trusted Server / DAL Boundary

Next.js Server Actions/Route Handlers validate input and call a `server-only` DAL. The DAL verifies identity on each protected operation, applies ownership/allowed-action checks, and returns minimal DTOs. Provider queries stay behind this boundary. Proxy/page redirects can improve navigation but are not the authorization gate. Normal user queries must carry user context through a request-scoped RLS-subject client; no secret/service-role key on normal pathways.

## Persistence Model

Supabase-hosted PostgreSQL is authoritative. SD-015 scopes an authenticated User, Academic Term, and Course vertical slice. Choose exact columns, deletion semantics, indexes, and relation design in SD-015's Plan from accepted product/privacy requirements, rather than copying fixture fields. Use NOT NULL, foreign keys, uniqueness, CHECK/bounded fields, and appropriate grants. Private records have an authoritative owner relationship to `auth.users`.

## Ownership / Authorization Strategy

DAL enforces actor + operation + owned resource. PostgreSQL enables RLS on every exposed private table, with least-privilege grants and explicit per-operation policies. `auth.uid()` must match the authoritative owner: `USING` for reads/deletes and existing update rows, `WITH CHECK` for inserts and resulting update rows. Relationships must prevent a Course owned by A from pointing at B's Academic Term. IDs are never access grants. Anonymous and cross-user access deny by default; collections return only own rows. Privileged credentials bypass RLS and are excluded from normal traffic.

## Runtime Validation

Use Zod at server action/route boundaries for IDs, required text, length, and allowed input shape; reject owner override. TypeScript checks code at development time; Zod checks requests at runtime; PostgreSQL constraints preserve durable integrity. Sanitize neither ownership nor auth by client form controls alone. Avoid sensitive values in logs/errors.

## Migration Strategy

SD-015 should commit Supabase CLI `supabase/config.toml`, reviewed SQL migrations, and database/RLS tests under `supabase/tests/`. A Docker-compatible local stack can replay migrations with `supabase db reset` and run `supabase test db`; CI must reproduce them. Dashboard edits are not the schema source. Remote migration application requires a later, deliberate stage. No migration or live project in SD-014.

## Local Development / Secrets Strategy

SD-015 may commit an `.env.example` with names and placeholders while `.env.local` remains ignored; current `.gitignore` excludes all `.env*`, so SD-015 must add a narrow exception for the example. Current names: `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`. The publishable key is public application identity, not authorization. Never ship secret/service-role keys, database passwords, PATs, or session tokens in source, browser bundle, or logs. Use synthetic local data; the CLI/Docker stack avoids needing a hosted project for initial work.

## Cost / Privacy / Security / Lock-In Analysis

The official Free plan currently includes 50,000 MAU and 500 MB database per project, with two active projects and pausing after one inactive week. It has no automatic backups; Pro starts at $25/month. SD-014 and the local SD-015 proof require no paid feature. The built-in hosted email sender is restricted to project-team addresses and currently two emails/hour; local CLI testing uses Mailpit. An external-user beta will need deliberate custom SMTP selection/configuration, potentially a separate provider and cost. Paid hosting/backup/reliability decisions belong before real production use. Choose a specific US project region when a hosted project is later approved; region is a data-location choice, not a compliance guarantee. Account ID/email and academic terms/course names are personal data (Class 2); assignments/tasks/notes can be Class 3; credentials/tokens are Class 4. Minimize account fields, logs, and provider exposure. Postgres tables, constraints, and ordinary SQL are portable; Supabase Auth, SSR cookies, `auth.uid()`, client APIs, and project config require replacement work. Narrow auth/DAL boundaries reduce that cost.

## SD-015 Proof Contract

SD-015 must reproduce the schema from migrations, create two synthetic users, verify signup/sign-in and logout, and persist User → Academic Term → Course ownership. Test server identity against attempted client owner override. Exercise Course create/read/update/delete for A's own row; deny A direct-ID read/update/delete of B's row, anonymous private reads, A insert as B, and A list exposure of B. Database tests must cover anonymous/A/B across SELECT/INSERT/UPDATE/DELETE and malformed/invalid relationships; application tests must show A creates and sees a Course while B cannot. Test invalid ID, empty required input, excessive length, and owner override. Inspect client bundles, repository, and logs for privileged keys and tokens. CI must add migration/RLS and relevant auth/integration/E2E security checks alongside existing gates. Any cross-user isolation failure is FAIL.

## Explicit Out of Scope

No runtime auth or persistence code, tables, migrations, hosted project, credentials, production deployment, uploads, social auth, AI, or SD-015 implementation.

## Material Human Decisions

None for this architecture task. Hosted project creation, external-user email delivery, production reliability/backup policy, exact retention, and account deletion behavior remain later task decisions before real users depend on them.

## Sources checked during Plan

- [Supabase SSR Next.js guidance](https://supabase.com/docs/guides/auth/server-side/creating-a-client?framework=nextjs&queryGroups=framework)
- [Supabase package selection](https://supabase.com/docs/guides/auth/choosing-a-server-package)
- [Supabase RLS guide](https://supabase.com/docs/guides/database/postgres/row-level-security)
- [Supabase API key guidance](https://supabase.com/docs/guides/getting-started/api-keys)
- [Supabase CLI local workflow](https://supabase.com/docs/guides/local-development/cli-workflows)
- [Supabase pricing](https://supabase.com/pricing)
- [Supabase SMTP limits](https://supabase.com/docs/guides/auth/auth-smtp)
- [Supabase regions](https://supabase.com/docs/guides/platform/regions)
- [Next.js authentication/DAL guidance](https://nextjs.org/docs/app/guides/authentication)
- [Firestore data model](https://firebase.google.com/docs/firestore/data-model)

READY FOR BUILD — NO MATERIAL HUMAN DECISION REQUIRED
