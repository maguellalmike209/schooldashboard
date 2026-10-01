# School Dashboard — Security Requirements

## 1. Purpose

This document defines the durable application-security requirements for School
Dashboard.

It answers:

> What security properties must the application preserve as it evolves from a
> static prototype into a real multi-user product?

This document is normative.

When a requirement applies to an active task, Plan, Build, Verify, and Release
must treat it as a constraint.

This document does NOT define:

- product features,
- UI behavior,
- privacy policy,
- detailed attack scenarios,
- implementation provider,
- database schema,
- deployment procedure.

Related responsibilities belong to:

- `docs/DATA_PRIVACY.md`
- `docs/THREAT_MODEL.md`
- `docs/SECURITY_TESTING.md`
- `docs/ARCHITECTURE.md`
- active product specifications
- ICM stage instructions

---

# 2. Current Applicability

Milestone 1 is a static, read-only prototype.

It currently has:

- no authentication,
- no persistence,
- no private user accounts,
- no uploads,
- no billing,
- no webhooks,
- no AI integration,
- no protected APIs.

Many requirements below are therefore dormant today.

They automatically become relevant when their corresponding capability is
introduced.

Do not implement security infrastructure merely because it appears in this
document.

Activate requirements according to the task and risk tier.

---

# 3. Core Security Principles

The application should follow these default principles.

## SEC-CORE-001 — Deny by default

Private or privileged access should be denied unless explicitly authorized.

---

## SEC-CORE-002 — Least privilege

Users, services, credentials, database roles, storage policies, and automation
should receive only the permissions required for their responsibilities.

---

## SEC-CORE-003 — Server-side trust

Security decisions must be enforced at trusted server/data boundaries.

Client state is not authoritative for:

- identity,
- roles,
- ownership,
- authorization,
- quotas,
- billing status,
- protected workflow state.

---

## SEC-CORE-004 — Defense in depth

Important security properties should not depend on a single easily bypassed
control when practical.

Examples:

authentication  
+  
application authorization  
+  
database/storage isolation

---

## SEC-CORE-005 — Fail safely

Unexpected failure should not grant broader access or expose sensitive
information.

If authorization or security state cannot be established:

deny the protected operation.

---

## SEC-CORE-006 — Minimize attack surface

Do not expose:

- unnecessary endpoints,
- unnecessary fields,
- unnecessary services,
- unnecessary privileges,
- unnecessary public storage.

---

## SEC-CORE-007 — No security through obscurity

Security must not depend on:

- unguessable-looking IDs,
- hidden UI controls,
- undocumented URLs,
- secret endpoint locations.

Identifiers may reduce accidental discovery.

They do not replace authorization.

---

# 4. Authentication

These requirements become active when user accounts are introduced.

## SEC-AUTHN-001 — Established authentication

Use a well-established authentication provider/framework rather than designing
a custom authentication protocol.

Custom password hashing, token formats, authentication cryptography, or session
protocols require exceptional justification and explicit review.

---

## SEC-AUTHN-002 — Server-trusted identity

Authenticated identity must be established through trusted server-side session
or token verification.

Do not trust client-provided:

- user IDs,
- email addresses,
- role claims,
- ownership claims

without server verification.

---

## SEC-AUTHN-003 — Protected access requires authentication

Resources classified as private user data must require valid authentication
unless an accepted product requirement explicitly makes them public.

---

## SEC-AUTHN-004 — Authentication failure is safe

Invalid, expired, malformed, or absent authentication must fail without granting
protected access.

---

## SEC-AUTHN-005 — No credential leakage

Authentication credentials, tokens, session values, and provider secrets must
not appear in:

- URLs when avoidable,
- application logs,
- analytics payloads,
- client-visible source,
- error messages,
- committed files.

---

## SEC-AUTHN-006 — Logout / session termination

When logout is supported, it must terminate or invalidate the user's effective
authenticated session according to the selected authentication architecture.

---

# 5. Authorization

Authorization is one of the highest-priority requirements for the future
multi-user School Dashboard.

## SEC-AUTHZ-001 — Authentication is not authorization

Being logged in does not automatically authorize access to every resource.

Every protected resource operation must evaluate whether the authenticated actor
may perform the requested action.

---

## SEC-AUTHZ-002 — User-owned resources

Every private user-owned resource must be associated with an authoritative
owner or tenant relationship.

Examples may include:

- Courses,
- Assignments,
- Learning Objectives,
- Study Tasks,
- Course Materials,
- uploaded files,
- generated plans,
- usage records.

---

## SEC-AUTHZ-003 — Server-side ownership enforcement

Private resource reads and writes must enforce ownership or membership on the
trusted server/data-access boundary.

Client-side filtering is insufficient.

---

## SEC-AUTHZ-004 — Cross-user denial

User A must not be able to:

- read,
- modify,
- delete,
- export,
- or otherwise act on

User B's private resources without an explicitly accepted sharing/administrative
rule.

---

## SEC-AUTHZ-005 — Collection isolation

List/search/query endpoints must not return records belonging to another user or
tenant because of missing filters or broad queries.

---

## SEC-AUTHZ-006 — Indirect-object references

Knowing or guessing another resource identifier must not grant access.

Every protected operation must re-check authorization.

---

## SEC-AUTHZ-007 — Role enforcement

If roles are introduced, role authorization must be enforced server-side.

Client-visible role state may improve UI behavior but is not authoritative.

---

## SEC-AUTHZ-008 — Sharing requires explicit design

Do not introduce Course/resource sharing implicitly.

Sharing behavior must define:

- who can share,
- who receives access,
- allowed actions,
- revocation,
- ownership.

Until accepted:

private resources remain owner-only.

---

# 6. Sessions

These requirements apply when session-based authentication exists.

## SEC-SESSION-001 — Secure session handling

Session credentials must use provider/framework-supported secure mechanisms.

---

## SEC-SESSION-002 — Session secrets remain protected

Session signing/encryption secrets must remain server-side.

---

## SEC-SESSION-003 — Secure cookies

When cookies contain authentication/session state, configure security properties
appropriate to the framework/environment, including relevant:

- Secure,
- HttpOnly,
- SameSite

behavior.

---

## SEC-SESSION-004 — Expiration

Sessions must have explicit expiration/lifetime behavior determined by the
accepted authentication architecture.

---

## SEC-SESSION-005 — Session authorization remains current

Authorization must not rely indefinitely on stale client state after relevant
permissions/ownership change.

---

# 7. Cross-Site Request Forgery

## SEC-CSRF-001 — State-changing requests

State-changing browser requests using cookie-based authentication must be
protected against cross-site request forgery through framework/provider controls
or equivalent accepted design.

---

## SEC-CSRF-002 — Do not disable protections casually

Framework CSRF/origin protections must not be disabled merely to simplify
implementation.

---

# 8. Input Validation

## SEC-INPUT-001 — Treat input as untrusted

Treat all external input as untrusted until validated.

This includes:

- forms,
- query parameters,
- route parameters,
- JSON payloads,
- headers,
- uploads,
- webhooks,
- AI-generated values,
- third-party responses.

---

## SEC-INPUT-002 — Server validation

Security-relevant validation must occur at the trusted server boundary.

Client validation is useful for UX but is not sufficient.

---

## SEC-INPUT-003 — Runtime validation

Static TypeScript types do not validate runtime input.

Use runtime validation appropriate to input complexity.

---

## SEC-INPUT-004 — Bounded values

User-controlled values should have reasonable limits when unbounded values could
cause:

- abuse,
- excessive cost,
- memory/processing pressure,
- storage exhaustion.

---

## SEC-INPUT-005 — Reject unexpected dangerous values

Invalid or disallowed values should be rejected safely rather than coerced into
privileged or unexpected behavior.

---

# 9. Injection and Output Safety

## SEC-INJECT-001 — Safe database operations

Database queries must use parameterized queries or safe ORM/query-builder
mechanisms.

Do not interpolate untrusted values into raw queries.

---

## SEC-INJECT-002 — Safe rendering

Use framework escaping/safe rendering for user-controlled text.

Avoid direct unsafe HTML rendering.

---

## SEC-INJECT-003 — Rich content sanitization

If user-generated rich HTML is ever supported, sanitize it using an accepted
maintained strategy before rendering.

---

## SEC-INJECT-004 — Command execution

Do not pass untrusted values into shell/system command execution.

If command execution becomes necessary, use strict argument handling and
explicit allowlists.

---

# 10. APIs and Server Actions

## SEC-API-001 — Every protected operation re-authorizes

Every protected API route/server action must independently authenticate and
authorize the actor.

Do not assume previous UI navigation proves authorization.

---

## SEC-API-002 — Minimal responses

Responses should contain only fields required by the accepted product behavior.

Avoid unnecessary private/internal data exposure.

---

## SEC-API-003 — Safe errors

API errors must not expose:

- stack traces,
- SQL,
- secrets,
- internal infrastructure,
- unnecessary private data.

---

## SEC-API-004 — Method/action restrictions

Endpoints must restrict operations to expected methods/actions.

---

## SEC-API-005 — Abuse controls

Public or expensive endpoints must receive appropriate abuse controls when risk
justifies them.

---

## SEC-API-006 — Enumeration resistance

Where resource enumeration could expose private information, responses should
avoid revealing unnecessary existence/ownership information.

---

# 11. Persistence and Database Security

## SEC-DB-001 — Least-privilege database access

Application database credentials should have only the permissions required for
application behavior.

---

## SEC-DB-002 — User data isolation

Persistent private user data must be queryable only within accepted
authorization boundaries.

Database-native row-level/tenant controls should be considered where supported,
but they do not remove the need for correct application authorization.

---

## SEC-DB-003 — Integrity constraints

Important data relationships should use database/application constraints
appropriate to their importance.

Examples may include:

- ownership,
- references,
- uniqueness,
- required fields.

---

## SEC-DB-004 — Migrations are controlled

Database migrations must be reviewable and verified before production
application.

Destructive migrations require higher risk handling.

---

## SEC-DB-005 — Client access

Do not expose privileged database credentials to clients.

If the architecture allows direct client-to-database APIs, authorization/storage
policies must enforce equivalent trusted access controls.

---

# 12. File Uploads

These requirements become active when Course Material uploads are introduced.

## SEC-FILE-001 — Upload ownership

Every private uploaded file must have authoritative ownership/access metadata.

---

## SEC-FILE-002 — Private by default

Course/student uploads must be private by default.

A file must not become publicly accessible unless an explicit product feature
requires public access.

---

## SEC-FILE-003 — File-size limits

Uploads must enforce accepted size limits.

---

## SEC-FILE-004 — File-type validation

Do not trust filename extensions alone.

Validate accepted file characteristics using available safe mechanisms.

---

## SEC-FILE-005 — Filename safety

User-controlled filenames must not become trusted filesystem/storage paths.

---

## SEC-FILE-006 — Download authorization

Private-file retrieval must re-check authorization.

Knowing the storage key/URL is not authorization.

---

## SEC-FILE-007 — Processing isolation

Uploaded content must be treated as untrusted during parsing/extraction.

Do not execute embedded code/macros/content.

---

## SEC-FILE-008 — Malware/content risk

Where uploaded file risk justifies it, introduce appropriate scanning or safe
processing controls before broader production use.

The exact mechanism should be selected when upload architecture is planned.

---

## SEC-FILE-009 — Deletion

Deleting a Course/account/material should follow accepted data-retention policy
and remove or render inaccessible associated uploaded content as required.

---

# 13. Object Storage

## SEC-STORAGE-001 — Private storage configuration

Storage containing private user files must not use public-read access by
default.

---

## SEC-STORAGE-002 — Scoped access

Use authorization or appropriately scoped signed access for private downloads.

---

## SEC-STORAGE-003 — Storage credentials

Privileged storage credentials remain server-side.

---

## SEC-STORAGE-004 — Environment separation

Production private storage should not be casually shared with development or
preview environments.

---

# 14. Secrets and Configuration

## SEC-SECRET-001 — No secrets in Git

Never commit real:

- API keys,
- passwords,
- tokens,
- private keys,
- database credentials,
- signing secrets.

---

## SEC-SECRET-002 — Environment secret storage

Use provider/platform secret management or secure environment configuration.

---

## SEC-SECRET-003 — Client exposure

Secrets must not use client-public configuration mechanisms.

---

## SEC-SECRET-004 — Minimum scope

Credentials should have the narrowest practical permissions.

---

## SEC-SECRET-005 — Exposure response

If a real secret is exposed:

- treat it as compromised,
- stop normal completion,
- remove exposure,
- rotate/revoke where required,
- investigate repository/history/log exposure.

Deleting the visible string alone is not sufficient remediation.

---

# 15. Logging

## SEC-LOG-001 — No sensitive credentials

Never log:

- passwords,
- session tokens,
- access tokens,
- refresh tokens,
- API secrets,
- private keys.

---

## SEC-LOG-002 — Minimize personal data

Do not log personal/private user content unless operationally required and
accepted by privacy requirements.

---

## SEC-LOG-003 — Structured safe context

Prefer safe operational information such as:

- event type,
- timestamp,
- non-sensitive identifiers,
- error category.

---

## SEC-LOG-004 — Sensitive document contents

Do not log full uploaded Course documents, extracted private text, or private
student notes.

---

# 16. Error Handling

## SEC-ERROR-001 — No sensitive error leakage

User-visible errors must not expose:

- secrets,
- stack traces,
- raw SQL,
- internal service credentials,
- private filesystem paths,
- unnecessary private information.

---

## SEC-ERROR-002 — Authorization errors are safe

Authorization failures should not expose unnecessary information about another
user's private resource.

---

## SEC-ERROR-003 — Internal diagnostics

Internal diagnostics should retain sufficient information for debugging while
respecting privacy/logging requirements.

---

# 17. Rate Limiting and Abuse Prevention

## SEC-ABUSE-001 — Expensive/public actions

Operations susceptible to automation, spam, or significant cost should have
proportionate abuse protection.

Examples may include:

- authentication,
- password reset,
- public forms,
- AI generation,
- upload,
- ingestion,
- public ReviewTap routes in another project.

---

## SEC-ABUSE-002 — Identity-aware controls

Rate/usage controls should use the most appropriate available identity such as:

- authenticated user,
- operation,
- IP,
- resource

depending on risk.

---

## SEC-ABUSE-003 — Security controls cannot rely only on rate limiting

Rate limiting slows abuse.

It does not replace authorization or validation.

---

# 18. External URLs and Redirects

## SEC-URL-001 — Validate external destinations

Externally controlled redirect URLs must be validated before use.

---

## SEC-URL-002 — Safe schemes

Reject unsafe/unexpected URL schemes.

Use accepted schemes such as HTTPS where appropriate.

---

## SEC-URL-003 — Open redirects

Do not allow arbitrary redirect destinations when product behavior requires a
constrained destination.

---

## SEC-URL-004 — Server-side fetching

If the application later fetches user-supplied URLs, SSRF risk must be
explicitly planned and mitigated.

Do not introduce arbitrary server-side URL fetching without security review.

---

# 19. Webhooks

## SEC-WEBHOOK-001 — Authenticate provider

Use provider-supported cryptographic signature/authenticity verification when
available.

---

## SEC-WEBHOOK-002 — Verify before processing

Do not perform trusted state changes before authenticity and basic payload
validation succeed.

---

## SEC-WEBHOOK-003 — Replay/idempotency

Webhook handlers must handle duplicate/replayed events safely where provider
delivery may repeat.

---

## SEC-WEBHOOK-004 — Secrets

Webhook signing secrets remain server-side.

---

## SEC-WEBHOOK-005 — Safe errors/logging

Webhook failures must not expose signing secrets or sensitive payload data.

---

# 20. AI / Model Integration

These requirements become active when AI functionality is introduced.

## SEC-AI-001 — Model output is untrusted

Treat AI output as untrusted data.

It must not bypass:

- input validation,
- authorization,
- product rules,
- approval boundaries.

---

## SEC-AI-002 — Prompt injection

Text from:

- uploaded documents,
- Course materials,
- third-party websites,
- users

must be treated as untrusted content.

It cannot redefine trusted system/tool permissions.

---

## SEC-AI-003 — Tool authorization

If AI can invoke application tools/actions, authorization must be enforced by
the application outside the model.

The model must never determine its own privileges.

---

## SEC-AI-004 — Private-data minimization

Only send private user data to model providers when required by an accepted
feature and consistent with privacy requirements.

---

## SEC-AI-005 — Source grounding

When generated academic claims are expected to derive from uploaded/source
materials, preserve provenance sufficient for the product's accepted grounding
behavior.

---

## SEC-AI-006 — Human-control boundary

Generated plans/actions should follow the accepted product rule for student
review/approval.

AI should not silently perform privileged user actions outside accepted scope.

---

## SEC-AI-007 — Usage controls

Cost-bearing AI operations should support appropriate:

- rate limits,
- quotas,
- usage measurement,
- per-user accounting

when material.

---

# 21. Third-Party Integrations

## SEC-INTEGRATION-001 — Minimize shared data

Send external services only the data required for accepted functionality.

---

## SEC-INTEGRATION-002 — Least-privilege credentials/scopes

OAuth/API scopes should be the minimum required.

---

## SEC-INTEGRATION-003 — Failure isolation

Failure of an external integration should not silently compromise core
authorization or data integrity.

---

## SEC-INTEGRATION-004 — Provider responses are untrusted

Validate security-relevant third-party responses before persisting or acting on
them.

---

# 22. Dependencies and Supply Chain

## SEC-SUPPLY-001 — Necessary dependencies only

Add dependencies only when they provide justified value.

---

## SEC-SUPPLY-002 — Lock dependencies

Use the repository lockfile and reproducible package installation.

---

## SEC-SUPPLY-003 — Security scanning

Use available dependency vulnerability tooling as the project matures.

Known severe vulnerabilities affecting active code paths must be evaluated
before release.

---

## SEC-SUPPLY-004 — Trusted sources

Do not install packages or scripts from arbitrary untrusted locations.

---

## SEC-SUPPLY-005 — Security controls are not disabled for convenience

Do not suppress valid dependency/security warnings merely to achieve green CI.

---

# 23. Browser / Web Security

The exact controls should follow the selected hosting/framework architecture.

## SEC-WEB-001 — HTTPS production

Production user traffic must use HTTPS.

---

## SEC-WEB-002 — Security headers

Production should use appropriate browser security headers based on accepted
architecture.

Potential controls include:

- Content Security Policy,
- MIME sniffing protection,
- referrer policy,
- frame/embedding policy.

Exact values should be determined when production architecture is established.

---

## SEC-WEB-003 — Cookies

Authentication cookies must use appropriate secure configuration according to
the session architecture.

---

## SEC-WEB-004 — Cross-origin access

Do not broadly permit cross-origin access unless an accepted integration
requires it.

CORS is not an authorization mechanism.

---

# 24. Sensitive Data in the Client

## SEC-CLIENT-001 — Minimize private client data

Do not send private fields to the browser unless needed for the current user
experience.

---

## SEC-CLIENT-002 — No server secrets

Server credentials must never be embedded in client bundles.

---

## SEC-CLIENT-003 — Client state is modifiable

Do not trust hidden fields, local storage, browser state, or client JavaScript
as authoritative security state.

---

# 25. Administrative Capabilities

If administrative functionality is later introduced:

## SEC-ADMIN-001 — Explicit admin authorization

Administrative actions require explicit server-side role/permission checks.

---

## SEC-ADMIN-002 — Admin is not normal-user fallback

Do not implement hidden universal bypasses for convenience.

---

## SEC-ADMIN-003 — High-impact actions

High-impact administrative actions should receive stronger confirmation,
logging, and/or review proportional to impact.

---

# 26. Billing and Entitlements

If subscriptions are later added:

## SEC-BILL-001 — Client cannot grant entitlement

Paid/free entitlement state must be determined from trusted server/provider
state.

---

## SEC-BILL-002 — Webhook authenticity

Payment-provider webhook state changes require authenticated webhook processing.

---

## SEC-BILL-003 — Idempotency

Duplicate billing events must not produce duplicate entitlements/side effects.

---

## SEC-BILL-004 — No card data handling without need

Prefer hosted/provider payment interfaces so School Dashboard does not directly
store/process raw payment-card credentials.

---

# 27. Security Testing

## SEC-TEST-001 — Security requirements require evidence

Documentation is not proof.

Relevant security requirements must have implementation and verification
evidence.

---

## SEC-TEST-002 — Negative tests

R3 features require relevant automated or reproducible negative tests.

---

## SEC-TEST-003 — Cross-user tests

Every private multi-user resource type should have cross-user isolation
verification.

---

## SEC-TEST-004 — Test the trusted boundary

Tests should exercise the actual authorization/input/security boundary rather
than mocking it away.

---

## SEC-TEST-005 — Security regression tests

A discovered security defect should receive a regression test when practical.

---

## SEC-TEST-006 — Adversarial playbook

Use:

`docs/SECURITY_TESTING.md`

for reusable defensive attack scenarios.

---

# 28. CI / Repository Enforcement

## SEC-CI-001 — CI becomes required before real users

Before production use with real user accounts/private data, the repository must
have automated CI covering at least the core appropriate checks.

Expected baseline:

- locked dependency install,
- lint,
- typecheck,
- automated tests,
- production build.

---

## SEC-CI-002 — Security tooling

As security-sensitive features are introduced, add available appropriate:

- secret scanning,
- dependency scanning,
- code scanning,
- security tests.

---

## SEC-CI-003 — Protected production branch

Before mature production usage, direct uncontrolled modification of the
production branch should be restricted using repository rules/protected
workflow appropriate to the project.

---

## SEC-CI-004 — Required checks

Required automated checks should not be bypassed simply to ship faster.

---

# 29. Deployment Security

## SEC-RELEASE-001 — Verified version

Production should deploy the version that received required verification/CI.

---

## SEC-RELEASE-002 — Environment separation

Development/preview environments should not unnecessarily share:

- production secrets,
- production private data,
- privileged credentials.

---

## SEC-RELEASE-003 — Rollback/recovery

Meaningful production changes should have an understood recovery strategy.

---

## SEC-RELEASE-004 — Security smoke tests

R3 production releases should include safe post-deploy checks for critical
security boundaries when applicable.

---

# 30. Security Incidents

## SEC-INCIDENT-001 — Stop normal workflow

Confirmed serious security incidents interrupt ordinary task completion.

Examples:

- real secret exposure,
- cross-user private data leak,
- auth bypass,
- publicly exposed private files,
- unintended destructive data action.

---

## SEC-INCIDENT-002 — Containment first

When real users/data are at risk, prioritize stopping ongoing exposure or damage
before normal feature work.

---

## SEC-INCIDENT-003 — Preserve useful evidence

Do not destroy useful diagnostic evidence while attempting to hide the symptom.

---

## SEC-INCIDENT-004 — Credential rotation

Exposed credentials should be revoked/rotated according to actual exposure.

---

## SEC-INCIDENT-005 — Regression prevention

After remediation, add a regression control/test where practical.

---

# 31. Security Requirement Activation

Not every requirement applies to every task.

Plan should identify the relevant requirement IDs.

Example:

Task:

> Add authenticated persisted Courses.

Possible applicable requirements:

- `SEC-AUTHN-001`
- `SEC-AUTHN-002`
- `SEC-AUTHZ-002`
- `SEC-AUTHZ-003`
- `SEC-AUTHZ-004`
- `SEC-AUTHZ-005`
- `SEC-DB-001`
- `SEC-DB-002`
- `SEC-INPUT-001`
- `SEC-TEST-003`

Build implements those controls.

Verify independently produces evidence for them.

This is preferred over copying this entire document into every task artifact.

---

# 32. Requirement Traceability

For R3/R4 tasks, Plan should map important security requirements to controls and
verification.

Example:

```text
SEC-AUTHZ-004
Cross-user access must be denied

↓

Build
server-owned Course query scoped to authenticated user

↓

Verify
User A requests User B Course ID → denied
```

This provides useful traceability without excessive process.

---

# 33. Requirement Changes

Do not modify these requirements simply because implementation is inconvenient.

A requirement may change when:

- product design changes,
- architecture changes,
- stronger security design supersedes it,
- requirement is found incorrect or incomplete.

Meaningful changes should be reviewed as durable security decisions.

---

# 34. No Security Theater

A security control should answer:

> What risk does this reduce?

Do not add:

- unnecessary security libraries,
- custom cryptography,
- arbitrary restrictions,
- meaningless scanner output,
- complexity with no threat.

Prefer:

risk  
→ requirement  
→ control  
→ test

---

# 35. Security Debt

If an accepted task temporarily cannot satisfy a desirable non-blocking control:

do not hide it.

Record:

- exact gap,
- reason,
- risk,
- intended follow-up.

Do not label a material active vulnerability as ordinary technical debt.

Material violations of applicable requirements block PASS.

---

# 36. Current Security Baseline

At the completion of Milestone 1:

School Dashboard is a static read-only application with no persistent private
user data.

The next major security boundary will arrive when the application introduces:

- authentication,
- persistent user-owned data,
- multiple users,
- private Course content,
- uploads,
- AI/integrations.

Before exposing those capabilities to real beta users, the project should
establish:

- automated tests,
- CI,
- relevant repository security controls,
- accepted Data Privacy requirements,
- accepted Threat Model,
- accepted Security Testing playbook.

---

# 37. Reuse Across Projects

This document contains School Dashboard's security contract.

The broader concepts may be reused in another project such as ReviewTap, but
project-specific requirements should be reconsidered.

Example:

School Dashboard emphasizes:

- student data,
- private academic content,
- uploaded documents,
- AI planning.

ReviewTap additionally emphasizes:

- public NFC endpoints,
- business/customer tenancy,
- review redirects,
- customer contact/consent,
- public abuse,
- external handoff.

Do not blindly copy project-specific requirements without reviewing the target
threat model.

---

# 38. Final Principle

The security target is not:

> impossible to attack.

The target is:

> explicitly define important security properties, implement them at trusted
> boundaries, attempt to break them independently, and prevent a single agent
> mistake from silently becoming a user-facing vulnerability.

Security should become part of normal engineering rather than a special event.