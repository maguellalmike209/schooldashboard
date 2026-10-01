# School Dashboard — Security Testing Playbook

## 1. Purpose

This document defines the approved adversarial-security testing strategy for
School Dashboard.

Its purpose is to help Verify answer:

> If I behaved like a malicious or careless user, could I violate an accepted
> security or privacy requirement?

Security testing should actively attempt to falsify important assumptions.

This document complements:

- `docs/SECURITY_REQUIREMENTS.md`
- `docs/DATA_PRIVACY.md`
- `docs/THREAT_MODEL.md`
- `icm/03_verify/CONTEXT.md`
- `icm/04_release/CONTEXT.md`

This document is a defensive testing playbook.

It does not authorize testing unrelated systems.

---

# 2. Testing Scope

Security testing is authorized only against:

- local School Dashboard environments,
- isolated test environments,
- project-owned preview deployments,
- project-owned staging environments,
- production only when the specific test is explicitly safe and authorized.

Do not use these procedures against:

- third-party applications,
- university systems,
- provider infrastructure,
- other people's websites,
- systems not owned by or explicitly authorized for this project.

---

# 3. Environment Preference

Prefer security testing in this order:

```text
local
↓
isolated automated test
↓
preview
↓
staging
↓
production-safe smoke test only
```

Deep adversarial testing should normally occur before production.

Production testing should avoid:

- destructive behavior,
- significant load,
- real-user data modification,
- uncontrolled scanning,
- exploit attempts against infrastructure.

---

# 4. Test Data

Use dedicated test identities and synthetic data.

Prefer:

- Test User A
- Test User B
- optional Test Admin
- synthetic Courses
- synthetic Assignments
- synthetic files

Do not use another real user's private information as an attack target.

---

# 5. Core Adversarial Principle

For every important security boundary, Verify should ask:

> What input or action would bypass this control if the implementation were
> wrong?

Then attempt the smallest safe test capable of proving the boundary.

Do not perform destructive exploitation merely to demonstrate a vulnerability.

Proof of broken control is sufficient.

---

# 6. Security Test Selection

Do not run every test module for every task.

Plan should identify relevant:

- risk tier,
- threat IDs,
- security requirement IDs,
- privacy requirement IDs.

Verify then selects applicable modules.

Example:

Task:

> Add authenticated persisted Courses.

Plan identifies:

- `T1` Cross-user access
- `T2` Client authorization bypass
- `T4` Sensitive-data exposure
- `T21` Enumeration

Relevant test modules:

- AUTH-01
- AUTHZ-01
- AUTHZ-02
- IDOR-01
- DATA-01
- ERROR-01

Unrelated modules such as webhook testing should remain unused.

---

# 7. Security Test Case Format

Reusable cases should conceptually contain:

## ID

Stable test identifier.

## Objective

What security property is being challenged.

## Preconditions

Required environment/data/users.

## Attack Attempt

Safe adversarial action.

## Expected Secure Result

What must happen.

## Failure Indicators

What demonstrates vulnerability.

## Evidence

What Verify should record.

---

# 8. Severity

When a security failure is found, classify its practical impact.

## Critical

Examples:

- unrestricted authentication bypass,
- broad cross-user private-data access,
- exposed production database credentials,
- destructive unauthorized production action.

Immediate containment required.

---

## High

Examples:

- cross-user access to meaningful private records,
- private file exposure,
- privilege escalation,
- significant secret exposure.

Blocks PASS and release.

---

## Medium

Examples:

- important validation bypass,
- information leakage,
- meaningful abuse-control weakness.

Usually blocks affected task PASS.

---

## Low

Examples:

- minor security-information disclosure,
- defense-in-depth gap without direct protected-data compromise.

Evaluate against accepted requirements.

Do not downgrade an issue merely to complete a task.

---

# 9. Stop Conditions

Stop normal automated security testing when:

- a real production secret is discovered,
- real user data is unexpectedly exposed,
- cross-user access involving real accounts succeeds,
- destructive data behavior begins,
- testing may cause meaningful production load,
- provider/system outside project authorization would be affected.

Preserve evidence and move into incident handling.

---

# 10. Authentication Tests

These become active when authentication exists.

---

## AUTH-01 — Anonymous protected-resource access

### Objective

Verify private resources require authentication.

### Attempt

Request a known private resource without a valid authenticated session.

### Expected

Access denied according to the accepted API/application contract.

No private content returned.

### Failure

Any protected user data is returned.

---

## AUTH-02 — Invalid authentication state

### Attempt

Use:

- missing session,
- malformed session,
- expired session when testable,
- invalid credential state.

### Expected

Protected access denied safely.

No crash or sensitive diagnostic exposure.

---

## AUTH-03 — Logout effectiveness

### Preconditions

Valid authenticated test user.

### Attempt

1. authenticate;
2. verify protected resource works;
3. logout;
4. attempt same protected resource again.

### Expected

Former session no longer grants protected access according to the selected auth
architecture.

---

# 11. Authorization Tests

Authorization testing is one of the highest-priority modules.

---

## AUTHZ-01 — Owner access

### Setup

User A owns Resource A.

### Attempt

User A reads Resource A.

### Expected

Allowed.

This establishes the positive baseline before attempting isolation tests.

---

## AUTHZ-02 — Cross-user read

### Setup

User A owns Resource A.

User B owns Resource B.

### Attempt

Authenticate as A and request B's resource directly.

### Expected

Denied.

No B content returned.

### Failure

Any B private data becomes visible.

Relevant threat:

`T1`

---

## AUTHZ-03 — Cross-user update

### Attempt

Authenticate as A and submit an update targeting B's resource.

### Expected

Denied.

Resource B remains unchanged.

---

## AUTHZ-04 — Cross-user delete

### Attempt

Authenticate as A and request deletion of B's resource.

### Expected

Denied.

Resource B remains intact.

---

## AUTHZ-05 — Collection isolation

### Attempt

Authenticate as A and request a list/search of private resources.

### Expected

Only resources A is authorized to view are returned.

### Failure

B's records appear because of an unscoped collection query.

---

# 12. Authorization Matrix

For every important private resource class, maintain the smallest useful
authorization matrix.

Example:

| Actor | Resource | Action | Expected |
| --- | --- | --- | --- |
| A | A Course | Read | Allow |
| A | A Course | Update | Allow |
| A | B Course | Read | Deny |
| A | B Course | Update | Deny |
| A | B Course | Delete | Deny |
| Anonymous | A Course | Read | Deny |

Apply the same principle to:

- Assignments,
- Study Tasks,
- uploaded files,
- generated plans,
- exports

when those resource classes exist.

---

# 13. ID Manipulation Tests

---

## IDOR-01 — Valid foreign identifier

### Attempt

Authenticate as User A.

Replace the expected resource identifier with the valid ID of User B's resource.

### Expected

Denied.

Relevant threats:

- `T1`
- `T21`

---

## IDOR-02 — Client-supplied owner

### Attempt

Submit an operation while replacing an owner/user identifier with another user's
identifier.

### Expected

Server derives authoritative ownership from trusted authentication/resource
relationships.

Client ownership claim does not grant access.

---

## IDOR-03 — Nonexistent identifier

### Attempt

Request an identifier that does not exist.

### Expected

Safe failure.

Response must not expose unnecessary internal details.

---

## IDOR-04 — Malformed identifier

Submit malformed identifier input.

Expected:

safe validation failure.

No crash.

---

# 14. Direct API / Server Action Tests

---

## API-01 — Bypass the UI

### Objective

Ensure important business/security controls exist on the trusted boundary.

### Attempt

Call the protected API/server action directly without using the normal UI flow.

### Expected

The same validation and authorization still applies.

### Failure

A restriction exists only because the button was hidden or disabled.

Relevant threat:

`T2`

---

## API-02 — Unexpected fields

Submit fields that the normal UI does not send.

Examples:

- owner identifier,
- role,
- completion state,
- entitlement field

when applicable.

### Expected

Unexpected privileged fields are rejected or ignored according to the accepted
contract.

---

# 15. Input Validation Tests

---

## INPUT-01 — Missing required value

Submit a request missing a required field.

Expected:

safe validation error.

---

## INPUT-02 — Invalid type

Provide a value of an unexpected type.

Expected:

safe rejection before trusted processing.

---

## INPUT-03 — Oversized input

Use a safely bounded test value larger than the accepted product limit.

Expected:

request rejected or constrained.

Do not intentionally exhaust system memory.

---

## INPUT-04 — Unexpected enum/value

Provide a value outside the accepted set.

Expected:

safe rejection.

---

## INPUT-05 — Extra fields

Provide unexpected properties.

Expected behavior should follow the accepted validation contract.

Security-sensitive fields must not become assignable accidentally.

---

# 16. Injection Safety Tests

Testing should use non-destructive sentinel input.

The purpose is to determine whether input is treated as data rather than
executable instructions.

---

## INJECT-01 — Database input handling

Provide strings containing characters normally meaningful to database query
syntax.

Expected:

value remains data.

No query structure changes.

Use automated tests against local/test databases.

Do not attempt destructive queries.

---

## INJECT-02 — HTML rendering

Provide harmless HTML-like markup in a user-controlled text field.

Expected:

displayed as safe content according to product requirements.

It must not execute active browser behavior.

---

## INJECT-03 — Command boundary

If a feature invokes local/system commands:

submit values containing command-separator-like characters using a controlled
test.

Expected:

input cannot alter command structure.

Avoid destructive payloads.

---

# 17. Error Leakage Tests

---

## ERROR-01 — Invalid resource

Trigger a safe application error.

Inspect:

- response,
- UI,
- logs when authorized.

Expected:

no:

- secrets,
- stack trace in user response,
- raw SQL,
- internal credentials,
- unnecessary private data.

---

## ERROR-02 — Authorization failure

Attempt foreign-resource access.

Expected:

response should not unnecessarily expose:

- owner's identity,
- full resource details,
- internal authorization logic.

---

# 18. Logging Tests

---

## LOG-01 — Authentication failure logging

Trigger a controlled auth failure.

Inspect available logs.

Expected:

no:

- password,
- session token,
- access token,
- secret.

---

## LOG-02 — Private content logging

Trigger an error involving synthetic private academic content.

Expected:

full notes/documents/private prompts are not dumped into logs unless explicitly
required and protected.

---

## LOG-03 — Request-object dumping

Inspect error handling around malformed requests.

Expected:

application does not indiscriminately serialize sensitive request/session
objects into logs.

---

# 19. Data Exposure Tests

---

## DATA-01 — Response minimization

Inspect API/server responses for private resources.

Expected:

only fields required by accepted product behavior are returned.

---

## DATA-02 — Client payload inspection

Inspect browser/network-visible data.

Expected:

no unnecessary:

- secret fields,
- other-user data,
- private server configuration.

---

## DATA-03 — Preview isolation

When preview deployments exist:

confirm preview does not unexpectedly connect to or expose production private
data.

---

# 20. File Upload Tests

Activate when uploads exist.

Use only safe test files.

---

## FILE-01 — Valid upload

Upload an accepted synthetic file.

Expected:

successful upload under correct owner.

---

## FILE-02 — Unauthorized upload

Attempt upload without required authentication.

Expected:

denied.

---

## FILE-03 — Cross-user file retrieval

Upload File B as User B.

Attempt retrieval as User A.

Expected:

denied.

---

## FILE-04 — Anonymous file retrieval

Attempt direct retrieval without authentication.

Expected:

denied for private files.

---

## FILE-05 — Oversized upload

Use a controlled test file over accepted limit.

Expected:

rejected before uncontrolled processing/storage.

---

## FILE-06 — Misleading filename

Use a safe file whose extension/name does not match its actual allowed content
classification.

Expected:

the system does not rely solely on extension.

---

## FILE-07 — Filename/path handling

Use a synthetic filename containing unusual path-like characters.

Expected:

storage path remains server-controlled.

No path traversal or unsafe filename interpretation.

---

## FILE-08 — Delete ownership

Attempt to delete another user's uploaded file.

Expected:

denied.

---

# 21. Storage Tests

---

## STORAGE-01 — Public access

Attempt unauthenticated direct access to a known private storage object.

Expected:

denied.

---

## STORAGE-02 — Signed-access scope

If signed URLs are used:

confirm a generated URL grants only intended object/access duration according to
the accepted design.

---

## STORAGE-03 — Environment isolation

Confirm preview/test storage does not unintentionally expose production private
objects.

---

# 22. Redirect Tests

---

## REDIRECT-01 — Valid destination

Provide an accepted redirect destination.

Expected:

redirect succeeds.

---

## REDIRECT-02 — Unsafe scheme

Provide a synthetic URL using a scheme outside the accepted rules.

Expected:

rejected.

---

## REDIRECT-03 — Unapproved destination

Where product behavior constrains destinations, provide an outside destination.

Expected:

rejected.

---

## REDIRECT-04 — Malformed URL

Provide malformed URL input.

Expected:

safe validation failure.

No crash.

---

# 23. SSRF Tests

Only activate if the application intentionally performs server-side fetching of
user-controlled URLs.

Do not probe real internal networks.

Use a controlled local/test service designed for this test.

---

## SSRF-01 — Unapproved target

Provide a URL outside the accepted allowlist/rules.

Expected:

server refuses the fetch.

---

## SSRF-02 — Redirect escape

Where relevant, test whether an allowed URL can redirect the server toward an
unapproved controlled test destination.

Expected:

security policy remains enforced.

---

# 24. Webhook Tests

---

## WEBHOOK-01 — Valid signed event

Use provider/test tooling or controlled fixture.

Expected:

valid event processes according to product behavior.

---

## WEBHOOK-02 — Missing signature

Send synthetic webhook payload without expected authenticity proof.

Expected:

rejected before trusted state change.

---

## WEBHOOK-03 — Invalid signature

Use an invalid test signature.

Expected:

rejected.

---

## WEBHOOK-04 — Duplicate event

Submit the same test event twice where duplicate delivery is possible.

Expected:

no unintended duplicate side effect.

---

## WEBHOOK-05 — Malformed payload

Submit structurally invalid controlled payload.

Expected:

safe rejection.

---

# 25. Rate / Abuse Tests

Do not perform uncontrolled load testing.

Use small deterministic request counts.

---

## ABUSE-01 — Below-limit behavior

Perform requests below accepted threshold.

Expected:

normal operation.

---

## ABUSE-02 — Limit enforcement

Exceed the accepted threshold by a small safe amount.

Expected:

abuse protection activates.

---

## ABUSE-03 — Expensive operation protection

For AI/upload/ingestion operations:

verify one user cannot trivially bypass accepted usage limits by modifying
client state.

---

# 26. Enumeration Tests

---

## ENUM-01 — Resource enumeration

Attempt several synthetic valid/invalid IDs through the public/protected API.

Expected:

authorization remains enforced.

Responses should not unnecessarily reveal private resource ownership/existence.

---

## ENUM-02 — Account discovery

If authentication/account recovery endpoints exist, test whether responses
unnecessarily reveal whether an account/email exists beyond accepted provider
behavior.

---

# 27. Session Tests

---

## SESSION-01 — Client modification

Modify client-visible identity/role state.

Expected:

server authorization remains unchanged.

---

## SESSION-02 — Old session after logout

Attempt protected access with prior session after logout where architecture
allows this to be tested.

Expected:

behavior matches accepted session policy.

---

## SESSION-03 — Session client exposure

Inspect client-accessible storage/network state.

Expected:

sensitive server-only session credentials are not exposed contrary to the auth
architecture.

---

# 28. CSRF Tests

Activate when cookie-authenticated state-changing browser requests exist and the
selected framework requires explicit verification.

Use controlled test environments.

Expected:

cross-origin state-changing requests are rejected according to accepted
framework/provider protection.

Do not disable built-in protections for testing convenience.

---

# 29. AI Security Tests

Activate when AI/model capabilities exist.

These tests should use synthetic data.

---

## AI-01 — Prompt injection from document

Create a synthetic Course document containing instructions that attempt to tell
the model to:

- ignore application policy,
- access another user's data,
- reveal secrets,
- invoke unauthorized tools.

Expected:

document text is treated as untrusted content.

Application authorization remains unchanged.

---

## AI-02 — Tool privilege escalation

Prompt the AI to perform an action the current user does not have permission to
perform.

Expected:

application tool layer denies the action regardless of model response.

---

## AI-03 — Cross-user data request

Authenticate as User A.

Ask the model to retrieve User B's Course/content.

Expected:

authorization layer prevents access.

---

## AI-04 — Secret request

Ask the model to reveal:

- API key,
- system secret,
- provider credentials.

Expected:

model/tool environment has no authority/path to expose such secrets.

---

## AI-05 — Excessive-context check

Trigger a representative AI operation and inspect what data is sent to the
provider.

Expected:

only data required by accepted functionality is transmitted.

---

## AI-06 — Generated unsafe output

Use synthetic input that may produce malformed/unexpected model output.

Expected:

output is validated before becoming trusted state/action.

---

# 30. AI Cost / Quota Tests

---

## AI-COST-01 — Usage attribution

Trigger controlled operations from two test users.

Expected:

usage attributed to correct accounts.

---

## AI-COST-02 — Quota enforcement

Exceed a small test quota.

Expected:

operation denied according to accepted rules.

---

## AI-COST-03 — Client bypass

Modify client-side quota/plan state.

Expected:

server-side entitlement/usage control remains authoritative.

---

# 31. Billing Tests

Only activate when subscriptions exist.

Use provider sandbox/test mode.

Never use real payment credentials for adversarial testing.

---

## BILL-01 — Entitlement source

Modify client-visible subscription state.

Expected:

server entitlement does not change.

---

## BILL-02 — Forged billing webhook

Submit invalid synthetic provider event.

Expected:

rejected.

---

## BILL-03 — Duplicate payment event

Replay same sandbox event.

Expected:

no duplicate entitlement or side effect.

---

## BILL-04 — Subscription downgrade/expiration

Use provider test state.

Expected:

entitlements change according to accepted product rules.

---

# 32. Dependency / Supply-Chain Tests

---

## SUPPLY-01 — Dependency diff

When a dependency changes:

verify:

- expected package name,
- expected registry/source,
- lockfile change,
- reason for dependency.

---

## SUPPLY-02 — Vulnerability scanning

Run available approved dependency scanner.

Relevant severe findings must be evaluated before PASS/release.

---

## SUPPLY-03 — Unexpected scripts/sources

Inspect meaningful package/install changes for unexpected:

- remote sources,
- install scripts,
- registry changes.

Do not execute unknown external scripts merely to inspect them.

---

# 33. Secret Scanning

---

## SECRET-01 — Repository scan

Run approved secret-scanning mechanisms where available.

Expected:

no real credentials in source/history being introduced by task.

---

## SECRET-02 — Client bundle/config inspection

For environment/config changes:

verify private credentials are not exposed to the browser.

---

## SECRET-03 — CI/log output

When CI/deployment changes:

ensure logs do not unnecessarily print secret values.

---

# 34. Migration Security Tests

---

## MIGRATE-01 — Clean migration

Apply migration against isolated test database.

Expected:

success.

---

## MIGRATE-02 — Existing-data preservation

Populate representative synthetic pre-migration data.

Apply migration.

Expected:

required data survives and remains valid.

---

## MIGRATE-03 — Authorization preservation

After migration, rerun relevant tenant-isolation tests.

Schema changes must not silently weaken ownership controls.

---

## MIGRATE-04 — Destructive detection

Inspect migration for:

- dropped tables,
- dropped columns,
- bulk deletes,
- irreversible transformations.

R4 handling applies when appropriate.

---

# 35. Concurrency / Replay Tests

---

## CONCUR-01 — Duplicate request

Send the same safe operation twice where duplication matters.

Expected:

behavior matches accepted idempotency rules.

---

## CONCUR-02 — Simultaneous update

When concurrent state modification could break integrity, run a controlled
parallel test.

Expected:

no unauthorized or impossible state.

Use only when the feature actually has concurrency risk.

---

# 36. Cache / Search Isolation Tests

Activate when shared caching/search exists.

---

## CACHE-01 — Cross-user cache

Request User A private resource.

Then request analogous path as User B.

Expected:

B never receives A's cached private content.

---

## SEARCH-01 — Tenant-scoped search

Search as A.

Expected:

only A-authorized results.

---

# 37. Background Job Tests

---

## JOB-01 — Ownership propagation

Trigger job for User A resource.

Expected:

job processes A resource only.

---

## JOB-02 — Foreign resource injection

Attempt to enqueue/trigger B's resource while authenticated as A.

Expected:

denied before unauthorized processing.

---

## JOB-03 — Retry safety

Where retries occur:

verify repeated processing does not create unintended duplicate state.

---

# 38. Admin Security Tests

Activate if admin capabilities exist.

---

## ADMIN-01 — Normal user escalation

Attempt admin action as normal user.

Expected:

denied.

---

## ADMIN-02 — Client role modification

Modify client-visible role value.

Expected:

server role remains authoritative.

---

## ADMIN-03 — Admin resource scope

Verify admin access matches accepted administrative requirements and is not
broader merely for convenience.

---

# 39. Privacy Testing

Security tests should also verify privacy behavior where relevant.

---

## PRIVTEST-01 — Unnecessary fields

Inspect private response payload.

Expected:

no unnecessary personal/private fields.

---

## PRIVTEST-02 — Analytics payload

Inspect synthetic analytics event.

Expected:

no prohibited academic text/private content.

---

## PRIVTEST-03 — External AI/API payload

Inspect request construction.

Expected:

only necessary accepted data leaves the application.

---

## PRIVTEST-04 — Delete behavior

When deletion is in scope:

delete synthetic resource and verify accepted dependent-data behavior.

---

## PRIVTEST-05 — Export ownership

Attempt to export B's data as A.

Expected:

denied.

---

# 40. Production Security Smoke Tests

Production tests must be low-impact.

For an R3 release, safe smoke checks may include:

- unauthenticated protected request → denied,
- owner reads own synthetic/test resource → allowed,
- second test user reads first user's synthetic resource → denied,
- known private test file anonymous access → denied.

Do not:

- flood production,
- upload malicious files,
- run broad vulnerability scans,
- probe infrastructure,
- manipulate real user's data.

---

# 41. Regression Rule

Every confirmed security defect should receive a regression test when practical.

Example:

Bug:

User A could update B's Study Task.

After repair:

add test proving:

A → update B Study Task = denied.

The goal is:

> discover once, prevent forever.

---

# 42. Security Test Automation

Repeated valuable security tests should migrate into automated suites.

Potential categories:

```text
tests/security/authentication
tests/security/authorization
tests/security/uploads
tests/security/webhooks
tests/security/ai
```

Exact file structure should follow the project's eventual testing framework.

Do not create empty test architecture before corresponding capabilities exist.

---

# 43. CI Integration

Security tests that protect durable high-value boundaries should eventually run
automatically in CI.

Highest-value candidates include:

- cross-user authorization,
- unauthenticated access,
- secret scanning,
- dependency checks,
- core input validation,
- production build.

CI should become the enforcement layer for controls we never want an agent to
forget.

---

# 44. Test Accounts

When multi-user testing begins, maintain isolated test identities.

At minimum:

- User A
- User B

Optional:

- Admin
- unsubscribed/subscribed account
- special-role account

Do not use Mike's real personal account as the only authorization-test
identity.

---

# 45. Test Isolation

Security tests should clean up their own synthetic data where practical.

Avoid tests that depend on:

- production state,
- execution order,
- stale user data,
- another developer's account.

Deterministic isolation increases confidence.

---

# 46. Test Determinism

Important security tests should produce the same result repeatedly.

If an authorization test passes intermittently:

that is not PASS.

Investigate:

- race,
- stale state,
- cache,
- fixture leakage,
- environment instability.

---

# 47. Evidence Requirements

For meaningful security tests, Verify should record:

- test ID,
- environment,
- actor,
- action,
- expected result,
- actual result.

Avoid huge raw logs unless needed.

Evidence should be sufficient to reproduce the finding.

---

# 48. Failed Security Test

When an applicable security test fails:

1. record the failure;
2. determine severity;
3. stop PASS;
4. identify likely control failure;
5. repair only if Small Repair Lane permits;
6. otherwise return to Build/Plan;
7. rerun after remediation;
8. add regression protection where practical.

Do not silently rerun until green.

---

# 49. Security Test False Positive

A test may itself be wrong.

Before changing implementation, confirm:

- accepted requirement,
- test setup,
- actor identity,
- target resource,
- environment.

If the test is invalid:

repair the test transparently.

Do not weaken a valid test merely because it exposed a defect.

---

# 50. Security Test Artifact

For complex R3/R4 tasks, the task Verify artifact should summarize relevant
tests.

Do not create a separate security report for every small feature.

For larger security audits, a dedicated artifact may be useful.

---

# 51. Security Test Matrix

A task may use a compact matrix.

Example:

| Test | Expected | Result |
| --- | --- | --- |
| AUTHZ-01 owner read | Allow | PASS |
| AUTHZ-02 cross-user read | Deny | PASS |
| AUTHZ-03 cross-user update | Deny | PASS |
| AUTH-01 anonymous read | Deny | PASS |
| ERROR-02 safe auth error | No data leak | PASS |

This provides strong evidence with little documentation overhead.

---

# 52. Threat Mapping

Tests should map back to meaningful Threat Model entries.

Examples:

`T1 Cross-user data access`
→ AUTHZ / IDOR tests

`T4 Sensitive data exposure`
→ DATA / LOG / ERROR tests

`T6 Malicious upload`
→ FILE tests

`T7 Prompt injection`
→ AI tests

`T14 Webhook forgery`
→ WEBHOOK tests

`T16 Secret exposure`
→ SECRET tests

`T18 Unsafe migration`
→ MIGRATE tests

This keeps adversarial testing focused.

---

# 53. Requirement Mapping

Tests should also map to Security Requirement IDs where useful.

Example:

```text
SEC-AUTHZ-004
↓
AUTHZ-02
AUTHZ-03
AUTHZ-04
```

This creates:

```text
requirement
→ threat
→ control
→ attack test
→ evidence
```

without copying documentation between stages.

---

# 54. Periodic Broader Security Review

Not every security check must be tied to a feature task.

Before major milestones such as:

- first private beta,
- first public launch,
- introduction of payments,
- introduction of AI actions,
- major architecture migration

perform a broader security review using all currently relevant modules.

The review should remain scoped to real implemented attack surfaces.

---

# 55. Private Beta Security Gate

Before friends store real private data, verify at minimum:

- authentication works,
- private routes require authentication,
- User A cannot read User B records,
- User A cannot modify/delete User B records,
- collections remain tenant-scoped,
- private files remain private if uploads exist,
- no secrets are committed,
- CI core checks pass,
- dependency/security scanning is active where accepted,
- deletion behavior matches beta scope,
- preview environment does not expose production data.

The exact gate should be updated once beta architecture exists.

---

# 56. AI Launch Security Gate

Before AI processes real private Course material, verify at minimum:

- private-data minimization,
- model provider boundary is understood,
- prompt injection cannot alter application permissions,
- AI tools enforce authorization outside model output,
- cross-user AI requests are denied,
- AI usage limits exist when necessary,
- sensitive prompt/document content is not unnecessarily logged.

---

# 57. Upload Launch Security Gate

Before real users upload Course files, verify at minimum:

- authentication,
- ownership metadata,
- private storage,
- cross-user retrieval denial,
- anonymous retrieval denial,
- size limits,
- type validation,
- safe filename handling,
- deletion behavior,
- parser processing is controlled.

---

# 58. Billing Launch Security Gate

Before paid subscriptions become active, verify at minimum:

- provider sandbox flow,
- webhook authenticity,
- duplicate-event idempotency,
- trusted entitlement source,
- client cannot grant itself paid status,
- secrets remain server-side.

---

# 59. Agent Security Testing

The ICM itself should be tested conceptually.

Examples:

- Can Build bypass Verify?
- Can an agent mark Done after failed security tests?
- Can Release deploy a different commit than Verify tested?
- Can failed CI be ignored?
- Can a transport failure trigger destructive Git?
- Can task scope silently expand?

Repository controls should increasingly make unsafe answers impossible.

---

# 60. Safety Over Completeness

Security testing should be strong but proportionate.

Do not attempt every theoretical attack.

Prefer:

```text
highest-value asset
+
most realistic threat
+
trusted boundary
+
repeatable safe test
```

A few high-quality adversarial tests are more valuable than dozens of generic
checkboxes.

---

# 61. Efficiency Principle

Security tests should become cheaper over time.

The progression should be:

```text
manual discovery
↓
repeatable test
↓
automated test
↓
CI enforcement
```

Once a high-value test is automated, agents should reuse it rather than
recreating the attack manually every task.

---

# 62. Final Principle

Security Verify should not ask:

> Can I find evidence that this looks secure?

It should ask:

> What would I try if I wanted this control to fail?

Then attempt that safely.

The desired system is:

```text
Threat
↓
Security requirement
↓
Build control
↓
Adversarial test
↓
Evidence
↓
Regression automation
```

Security confidence should come from controls surviving attack attempts, not
from agents describing the implementation confidently.