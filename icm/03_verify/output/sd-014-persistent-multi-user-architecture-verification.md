# SD-014 — Persistent multi-user architecture verification

## Status

PASS — architecture/documentation decision only. No authentication, database, RLS policy, or private-data runtime has been implemented or verified.

## Independent challenge

| Challenge | Evidence and result |
| --- | --- |
| Framework/provider fit | Repository uses Next.js 16.3.6 App Router. Current Supabase SSR guide specifies `@supabase/ssr`, Next.js 16 `proxy.ts`, server/browser clients, and `getClaims()` for protected data. Next.js recommends a server-only DAL. Coherent. |
| Server identity | Plan rejects cookie-derived `getSession()` user, browser IDs/emails/roles, and Proxy-only authorization. DAL verifies claims or uses fresh Auth lookup per protected operation. Coherent; runtime must prove it in SD-015. |
| Owner and RLS isolation | Supabase RLS guide documents grants plus per-operation `USING`/`WITH CHECK` and `auth.uid()`. Plan requires owner consistency across Academic Term → Course. A forged owner, guessed ID, anonymous request, and broad list query are explicit SD-015 denial tests. Coherent, not yet proven. |
| Secret boundary | Current code has no Supabase secret. Plan uses public publishable key for user-scoped normal traffic and forbids secret/service-role credentials that bypass RLS. SD-015 requires client bundle, repository, and log checks. |
| Migration reproducibility | Supabase CLI supports Docker-compatible local stack, SQL migration replay, and pgTAP database tests. SD-015 must demonstrate a clean rebuild. No migration exists yet. |
| Dependency/provider count | One provider for Auth + PostgreSQL; no ORM or second service introduced for the local proof. Firebase/Firestore's document model and a split auth/DB stack offer no demonstrated material advantage for this relational, RLS-dependent slice. |
| Cost and email | Free plan currently includes 50,000 MAU and 500 MB database, with inactivity pausing and no automatic backup. Hosted default SMTP is restricted to team addresses and two emails/hour. Local Mailpit supports development proof; real-user beta needs a later SMTP/reliability decision. No paid requirement for SD-014/local SD-015 proof. |
| Privacy and lock-in | Class 2 account ID/email and Course/term metadata, Class 3 richer academic content, Class 4 credentials align with `DATA_PRIVACY.md`. Specific US region is required later. Ordinary Postgres schema is portable; Supabase Auth/SSR/`auth.uid()` are contained behind boundaries. |
| Evidence contract | SD-015 requires two users, Course CRUD allow/deny, anonymous and spoof denial, list isolation, invalid inputs, reproducible migrations, auth/logout, app flow, secret checks, and CI. A cross-user failure explicitly fails the task. |
| Scope and truth | Diff adds architecture, decisions, task records, Plan, and Verify only. `docs/IMPLEMENTATION.md` remains unchanged and accurately says runtime auth/persistence do not exist. SD-015 remains Not started. |

## Requirement trace

- `SEC-AUTHN-001`–`006`, `SEC-SESSION-001`–`005`, `SEC-CSRF-001`: established provider, verified identity, cookie handling, logout, expiry, and later CSRF/cookie verification.
- `SEC-AUTHZ-001`–`006`, `SEC-DB-001`–`005`: DAL checks, least-privilege grants, RLS, owner constraints, and cross-user denial matrix.
- `SEC-INPUT-001`–`004`: Zod server validation plus PostgreSQL constraints.
- `SEC-SECRET-001`–`004`, `PRIV-ACCOUNT-001`, `PRIV-ACADEMIC-001`–`003`: public/secret key separation, minimal personal data, private ownership.
- Threat boundaries `TB-01`–`TB-04` and Security Testing `AUTH-01`–`03`, `AUTHZ-01`–`05`, `INPUT-01`–`05`, `SESSION-01`–`03`, `SECRET-01`–`03` inform SD-015's negative tests.

## Verification performed

- Inspected `AGENTS.md`, router and stage instructions, task/security/privacy/threat/testing documents, current code/dependencies, CI workflows, `.gitignore`, status, HEAD, and origin/main.
- Challenged official Supabase SSR/package, RLS, API key, CLI/database testing, pricing, SMTP, and region guidance; compared Next.js DAL guidance and Firestore's official data model.
- Found and corrected a stale architecture statement that migration technology remained unselected; identified `.env.example` exclusion by the current `.gitignore` for SD-015.
- Reviewed task diff and ran `git diff --check`. No runtime tests are probative for a documentation-only change; required hosted CI/security checks remain the PR gate.

## Remaining limits

No live provider account, runtime, migration, email delivery, or RLS policy exists. SD-015 must prove the contract before private multi-user capability can be called implemented. Hosted email to external users and production backups/reliability require later decisions before beta or release.

## Sources independently checked

- [Supabase SSR Next.js client and identity guidance](https://supabase.com/docs/guides/auth/server-side/creating-a-client?framework=nextjs&queryGroups=framework)
- [Supabase SSR package selection](https://supabase.com/docs/guides/auth/choosing-a-server-package)
- [Supabase RLS guide](https://supabase.com/docs/guides/database/postgres/row-level-security)
- [Supabase API keys](https://supabase.com/docs/guides/getting-started/api-keys)
- [Supabase CLI workflow](https://supabase.com/docs/guides/local-development/cli-workflows)
- [Supabase database tests](https://supabase.com/docs/guides/local-development/cli/testing-and-linting)
- [Supabase pricing](https://supabase.com/pricing)
- [Supabase SMTP](https://supabase.com/docs/guides/auth/auth-smtp)
- [Supabase regions](https://supabase.com/docs/guides/platform/regions)
- [Next.js authentication and DAL](https://nextjs.org/docs/app/guides/authentication)
- [Firestore data model](https://firebase.google.com/docs/firestore/data-model)

## Finalization

After this PASS, mark SD-014 Done, keep SD-015 Not started, then commit only SD-014 changes and merge through required protected-branch checks.
