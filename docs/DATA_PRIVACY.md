# School Dashboard — Data Privacy Requirements

## 1. Purpose

This document defines the durable privacy and data-handling requirements for
School Dashboard.

It answers:

> What information may the product collect, why may it collect it, where may it
> go, who may access it, how long should it exist, and what should happen when
> the user deletes or exports it?

This document is normative for product and engineering work that handles user
data.

It complements:

- `docs/SECURITY_REQUIREMENTS.md`
- `docs/THREAT_MODEL.md`
- `docs/SECURITY_TESTING.md`
- `docs/ARCHITECTURE.md`
- active product specifications

Security and privacy overlap but are not identical.

Security asks:

> Is access protected?

Privacy asks:

> Should this data exist or be used this way in the first place?

---

# 2. Current Applicability

Milestone 1 uses static/hardcoded academic fixture data.

It does not currently maintain real persistent user accounts or private user
content.

The requirements below become increasingly active when School Dashboard
introduces:

- authentication,
- persistent Courses,
- Assignments,
- Study Tasks,
- schedules,
- notes,
- uploaded Course materials,
- usage analytics,
- AI processing,
- integrations,
- subscriptions.

Do not implement unnecessary privacy infrastructure before the corresponding
data exists.

But privacy requirements must be established before real private user data is
introduced.

---

# 3. Privacy Principles

## PRIV-CORE-001 — Data minimization

Collect only information required for accepted product behavior, operations,
security, or an explicitly accepted future capability.

Do not collect information merely because it may become useful later.

---

## PRIV-CORE-002 — Purpose limitation

Use collected information only for accepted purposes.

A field collected to provide academic planning should not silently become:

- advertising data,
- unrelated profiling data,
- marketing data,
- or third-party enrichment data.

New materially different purposes require review.

---

## PRIV-CORE-003 — Private by default

User academic data should be private by default.

Do not make:

- Courses,
- Assignments,
- Study Tasks,
- schedules,
- notes,
- uploaded documents

public unless the user explicitly invokes an accepted sharing feature.

---

## PRIV-CORE-004 — Least necessary exposure

Only expose data to:

- users,
- services,
- providers,
- logs,
- agents,
- AI models

when that exposure is required for accepted functionality.

---

## PRIV-CORE-005 — User control

Users should retain reasonable control over their own stored content, subject to
accepted product, legal, backup, and operational constraints.

Future product design should support appropriate:

- correction,
- deletion,
- export,
- account closure

when those capabilities become relevant.

---

## PRIV-CORE-006 — No hidden secondary use

Do not silently repurpose private academic content for unrelated internal or
external purposes.

---

# 4. Data Classification

All meaningful stored or transmitted data should conceptually belong to one of
the following classes.

Plan should identify relevant classifications for R2+ tasks involving data.

---

## CLASS 0 — Public

Information intentionally safe for public display.

Examples may include:

- public marketing copy,
- public product documentation,
- intentionally public pages.

Public does not mean:

> automatically safe for every use.

Integrity and abuse controls may still apply.

---

## CLASS 1 — Internal / Operational

Non-public application information that is not normally sensitive personal
content.

Examples:

- internal task IDs,
- feature state,
- non-sensitive operational metrics,
- deployment identifiers.

Avoid unnecessary public exposure.

---

## CLASS 2 — Personal

Information associated with an identifiable user but not necessarily highly
sensitive by itself.

Examples may include:

- name,
- email,
- account ID,
- Course names,
- academic term,
- product usage linked to an account.

Protect from unauthorized disclosure.

---

## CLASS 3 — Private / Sensitive User Content

Private content whose exposure could meaningfully harm or embarrass the user or
reveal personal academic activity.

Examples may include:

- class schedules,
- Assignments,
- Study Tasks,
- study progress,
- personal notes,
- uploaded syllabi,
- lecture notes,
- academic documents,
- extracted Course content,
- generated personal study plans.

Treat as private by default.

---

## CLASS 4 — Secrets / Credentials

Authentication or infrastructure secrets.

Examples:

- passwords,
- access tokens,
- refresh tokens,
- API keys,
- database credentials,
- signing secrets,
- private keys.

These require the strongest handling.

Never place them in user-facing data flows.

---

# 5. Classification Rules

## PRIV-CLASS-001 — Highest applicable class

When data fits several classes, use the most protective applicable
classification.

---

## PRIV-CLASS-002 — Combined data may increase sensitivity

Individually ordinary fields may become more sensitive when combined.

Example:

Course name  
+  
schedule  
+  
user identity

may reveal a student's physical/time routine.

Plan should consider context, not only individual fields.

---

## PRIV-CLASS-003 — Derived data inherits sensitivity

Derived information should generally inherit the sensitivity of the source
information.

Examples:

uploaded private notes  
→ extracted text  
→ AI-generated summary

The summary is still private user content unless intentionally transformed into
non-identifying aggregate information.

---

# 6. Account Data

When accounts are introduced:

## PRIV-ACCOUNT-001 — Minimal account information

Collect only account information required by the authentication/product
architecture.

Avoid collecting unnecessary profile attributes.

---

## PRIV-ACCOUNT-002 — Email use

User email should be used only for accepted purposes such as:

- authentication,
- account communication,
- important service notifications

unless additional uses are explicitly accepted.

---

## PRIV-ACCOUNT-003 — No marketing assumption

Creating an account must not automatically imply unrelated marketing consent.

If marketing is ever introduced, it should be handled separately and clearly.

---

# 7. Academic Data

## PRIV-ACADEMIC-001 — Academic data is private

Persistent academic information should be treated as private user data by
default.

This includes:

- Courses,
- Assignments,
- Learning Objectives,
- Study Tasks,
- completion state,
- schedules,
- planning history,
- notes.

---

## PRIV-ACADEMIC-002 — User ownership

Academic records should have an authoritative relationship to the user/account
that owns them.

---

## PRIV-ACADEMIC-003 — No cross-user exposure

Academic information must not be visible to another user unless an accepted
sharing capability explicitly permits it.

---

## PRIV-ACADEMIC-004 — Avoid unnecessary academic profiling

Do not infer or store unrelated judgments about the user from academic
behavior unless an accepted feature requires them.

Examples of data that should not be invented casually:

- ability labels,
- intelligence assessments,
- behavioral profiles,
- risk labels.

---

# 8. Course Materials

Course Materials may contain more sensitive or externally authored content than
ordinary application records.

## PRIV-MATERIAL-001 — Private by default

Uploaded Course materials are private to the authorized user unless accepted
sharing rules say otherwise.

---

## PRIV-MATERIAL-002 — Minimize duplication

Do not create unnecessary duplicate copies of uploaded materials or extracted
content.

---

## PRIV-MATERIAL-003 — Processing copies

Temporary copies used for:

- extraction,
- parsing,
- AI processing

should be removed when no longer required according to the accepted
architecture.

---

## PRIV-MATERIAL-004 — No repository storage

Real user Course materials must not be committed into Git repositories.

---

## PRIV-MATERIAL-005 — Test material

Prefer:

- synthetic,
- public-domain,
- self-created,
- sanitized

documents for tests.

Do not use a real user's private syllabus/notes as a routine test fixture.

---

# 9. Notes and Free-Text Content

Free-text fields may contain unexpectedly sensitive information.

## PRIV-TEXT-001 — Treat free text as private

Personal notes/comments should be treated as private user content unless the
product explicitly states otherwise.

---

## PRIV-TEXT-002 — Do not infer sensitivity from field name

A field called:

`notes`

may contain:

- personal circumstances,
- grades,
- instructor information,
- scheduling details,
- other private content.

Handle accordingly.

---

## PRIV-TEXT-003 — Logging

Do not log complete free-text user content unless explicitly required for
authorized troubleshooting.

---

# 10. Usage Analytics

If analytics are introduced:

## PRIV-ANALYTICS-001 — Define purpose

Every analytics event should have a legitimate product/operational purpose.

Do not collect events merely because instrumentation is available.

---

## PRIV-ANALYTICS-002 — Minimize payload

Do not send full academic content into analytics systems.

Prefer:

- event name,
- safe identifiers,
- aggregated counts,
- non-sensitive properties.

---

## PRIV-ANALYTICS-003 — Avoid sensitive text

Do not place:

- uploaded text,
- notes,
- Assignment descriptions,
- private AI prompts

into analytics payloads unless specifically justified.

---

## PRIV-ANALYTICS-004 — Account linkage

Link analytics to identifiable users only when the product/operational purpose
requires it.

Prefer aggregate or pseudonymous metrics where sufficient.

---

# 11. Logs

## PRIV-LOG-001 — Data minimization

Logs should contain the minimum user information required for operations and
security.

---

## PRIV-LOG-002 — No private content by default

Do not log:

- uploaded document content,
- private notes,
- complete AI prompts,
- full academic plans,
- authentication tokens,
- secrets.

---

## PRIV-LOG-003 — Safe identifiers

Prefer internal IDs over unnecessary personally identifying fields where
appropriate.

---

## PRIV-LOG-004 — Error logging

Error diagnostics should avoid serializing entire request/user objects when they
contain private information.

---

# 12. Development and Test Data

## PRIV-DEV-001 — Synthetic by default

Use synthetic/test accounts and synthetic academic data for development and
verification.

---

## PRIV-DEV-002 — No production copying by default

Do not copy production user data into:

- local development,
- test databases,
- fixtures,
- preview deployments

merely for convenience.

---

## PRIV-DEV-003 — Sanitization

If production-derived data is ever genuinely required for authorized debugging,
remove or transform unnecessary identifying/private information where
practical.

---

## PRIV-DEV-004 — Screenshots

Do not commit screenshots containing private user information into the
repository.

---

# 13. Environment Separation

## PRIV-ENV-001 — Production data isolation

Production private user data should remain isolated from development/preview
environments unless explicitly required and authorized.

---

## PRIV-ENV-002 — Preview environments

Preview environments should use:

- synthetic data,
- isolated test users,
- non-production storage

where practical.

---

## PRIV-ENV-003 — Secret separation

Production credentials should not be exposed to preview environments unless
strictly required by architecture.

---

# 14. External Services

When user data is sent to an external service:

## PRIV-EXT-001 — Required data only

Send only the information required for the accepted integration.

---

## PRIV-EXT-002 — Provider awareness

Plan must identify which provider receives user/private data.

Do not hide material external data transfer inside implementation details.

---

## PRIV-EXT-003 — Purpose compatibility

External use must match the accepted product purpose.

---

## PRIV-EXT-004 — No uncontrolled forwarding

A third-party integration must not become a mechanism for sending unrelated
user data elsewhere.

---

# 15. AI Providers

AI processing creates an important privacy boundary.

## PRIV-AI-001 — Minimize model input

Send only the Course/user information required for the requested AI operation.

Do not automatically send the user's entire account history.

---

## PRIV-AI-002 — Private prompt handling

User prompts and generated outputs that contain academic/private content should
be treated as private data within School Dashboard.

---

## PRIV-AI-003 — Uploaded content

Do not send an entire private document to an AI provider when smaller extracted
sections are sufficient for the accepted task.

---

## PRIV-AI-004 — Provider choice

Model/provider selection should consider the project's accepted privacy and
security requirements when private user data will be transmitted.

---

## PRIV-AI-005 — No silent training assumptions

Do not make user-facing claims about external provider training/retention unless
verified from the actual provider terms/configuration in use.

---

## PRIV-AI-006 — Cost telemetry

AI usage telemetry should avoid storing complete prompts/content when usage
counts/tokens/model identifiers are sufficient.

---

# 16. Integrations

When connecting external systems such as calendar or drive services:

## PRIV-INTEGRATION-001 — Minimum scopes

Request only the external account permissions necessary for accepted
functionality.

---

## PRIV-INTEGRATION-002 — Selective ingestion

Do not ingest an entire external account when only a specific file/calendar
subset is required.

---

## PRIV-INTEGRATION-003 — User awareness

Material connections to external accounts should be visible to the user.

---

## PRIV-INTEGRATION-004 — Revocation

When an integration can be disconnected, future access should stop according to
the provider/architecture.

---

# 17. Data Storage

## PRIV-STORAGE-001 — Store only required data

Do not persist temporary information when processing can safely occur without
long-term storage.

---

## PRIV-STORAGE-002 — Private storage

Class 3 user content should use storage protected according to
`SECURITY_REQUIREMENTS.md`.

---

## PRIV-STORAGE-003 — Secret separation

Class 4 secrets must use appropriate secret-management mechanisms rather than
ordinary user-data tables/files.

---

## PRIV-STORAGE-004 — Backups

Backup copies inherit the privacy classification of the source data.

---

# 18. Data Retention

Exact retention periods may depend on later product decisions.

Until explicit periods are accepted:

## PRIV-RETENTION-001 — No indefinite-by-default justification

Do not assume all user data must be retained forever.

---

## PRIV-RETENTION-002 — Retention follows purpose

Retain data only while reasonably necessary for:

- active product functionality,
- security/operations,
- accepted recovery requirements,
- accepted legal/business needs.

---

## PRIV-RETENTION-003 — Temporary data

Temporary processing data should have shorter retention than durable user
records when practical.

---

## PRIV-RETENTION-004 — Logs

Operational/security logs should not retain private content longer than required
for their purpose.

Exact durations should be decided when production logging architecture is
established.

---

# 19. Deletion

Deletion policy becomes increasingly important once real users exist.

## PRIV-DELETE-001 — User deletion expectations

When the product supports deleting user-owned resources, deletion behavior must
be clearly defined.

---

## PRIV-DELETE-002 — Referential cleanup

Deleting an entity should handle dependent user data consistently.

Example:

deleting a Course may require defined handling for:

- Assignments,
- Objectives,
- Study Tasks,
- uploaded materials.

Do not leave orphaned private data unintentionally.

---

## PRIV-DELETE-003 — Account deletion

Before public beta/account deletion is offered, define what account deletion
does to:

- profile/account data,
- academic records,
- uploads,
- AI-derived content,
- usage records,
- integration credentials.

---

## PRIV-DELETE-004 — Backup reality

Deletion from the active product may not imply immediate disappearance from all
backups.

Do not promise instantaneous backup erasure unless the infrastructure actually
supports it.

---

## PRIV-DELETE-005 — External providers

Where data was sent to external providers, deletion capabilities depend on the
provider architecture/terms.

Do not make unsupported deletion claims.

---

# 20. Export / Portability

If data export is introduced:

## PRIV-EXPORT-001 — Owner authorization

Only the authorized user may export their private data unless another accepted
role permits it.

---

## PRIV-EXPORT-002 — Export scope

Clearly define which data is included.

---

## PRIV-EXPORT-003 — Export privacy

Exports may contain sensitive private information.

Generate and transmit them through protected mechanisms.

---

# 21. Sharing

Sharing is not currently an accepted default capability.

## PRIV-SHARE-001 — Private until shared deliberately

User-owned academic data remains private until an explicit sharing capability
is accepted.

---

## PRIV-SHARE-002 — Sharing scope

Future sharing must define:

- resource,
- recipient,
- permission,
- duration/revocation where applicable.

---

## PRIV-SHARE-003 — No accidental broad sharing

Do not implement generic public links for private academic data merely because
they are easy.

---

# 22. Administrative Access

If administrative access is introduced:

## PRIV-ADMIN-001 — Minimum necessary access

Administrative functionality should expose only the data necessary for the
accepted operational purpose.

---

## PRIV-ADMIN-002 — No casual browsing

Administrative access should not exist merely to allow developers/operators to
browse private user content.

---

## PRIV-ADMIN-003 — Support access

If support workflows ever require access to user content, design the access
deliberately with appropriate authorization and logging.

---

# 23. Data Provenance

For imported/extracted/generated academic information:

## PRIV-PROV-001 — Preserve source relationships when useful

The product should preserve enough provenance to distinguish:

- user-entered data,
- imported source data,
- extracted data,
- AI-generated data.

This supports:

- user trust,
- correction,
- debugging,
- deletion,
- AI grounding.

---

## PRIV-PROV-002 — Provenance does not make data public

Source metadata associated with private content remains private unless
otherwise accepted.

---

# 24. AI-Generated Data

## PRIV-GEN-001 — Derived content remains user data

AI-generated summaries, objectives, or Study Tasks derived from private user
content should remain associated with and protected as that user's data.

---

## PRIV-GEN-002 — User correction

Future AI-generated academic structures should be designed so the user can
review/correct them according to accepted product behavior.

---

# 25. Personal Data in URLs

## PRIV-URL-001 — Avoid sensitive URL values

Do not place unnecessary private information in URLs/query strings because URLs
may be stored in:

- browser history,
- logs,
- analytics,
- referrers.

Prefer opaque identifiers where appropriate.

Authorization remains required regardless of identifier type.

---

# 26. Caching

## PRIV-CACHE-001 — Private caching

Private responses/content must not be cached in a way that exposes one user's
data to another.

---

## PRIV-CACHE-002 — Shared caches

When shared/CDN caching is introduced, explicitly distinguish:

- public,
- user-specific,
- private

responses.

---

# 27. Notifications

If notifications are introduced:

## PRIV-NOTIFY-001 — Minimize lock-screen/message exposure

Notification content should avoid unnecessarily exposing sensitive academic
details where the notification may be visible outside the app.

---

## PRIV-NOTIFY-002 — Correct recipient

Notifications must be associated with the correct authorized account/device.

---

# 28. Search

If search is introduced:

## PRIV-SEARCH-001 — Search preserves authorization

Search results must respect the same authorization boundaries as direct resource
access.

---

## PRIV-SEARCH-002 — Search indexes are private when source is private

Do not accidentally create public/searchable indexes containing private
academic content.

---

# 29. Background Processing

## PRIV-JOB-001 — Minimum job payload

Background jobs should receive only the data required to perform their task.

---

## PRIV-JOB-002 — Private queue/job data

Private content placed into queues/job systems retains its classification.

---

## PRIV-JOB-003 — Failure logging

Failed jobs must not dump complete sensitive payloads into logs by default.

---

# 30. Data Breach / Privacy Incident

A privacy incident includes unauthorized exposure or improper handling of
private user information.

## PRIV-INCIDENT-001 — Stop ongoing exposure

When real user data is actively exposed, prioritize containment.

---

## PRIV-INCIDENT-002 — Identify affected data

Determine:

- data type,
- classification,
- affected users,
- exposure path,
- duration where known.

---

## PRIV-INCIDENT-003 — Do not conceal evidence

Preserve useful diagnostic evidence while limiting further exposure.

---

## PRIV-INCIDENT-004 — Fix root cause

Do not treat removal of visible data as sufficient if the underlying access
problem remains.

---

# 31. Privacy in Plan

For any task that handles Class 2–4 data, Plan should identify:

- relevant data classes,
- data origin,
- processing,
- storage,
- recipients,
- logging,
- external transfers,
- retention/deletion impact.

For R3 tasks, include meaningful privacy risks in acceptance criteria.

---

# 32. Privacy in Build

Build should implement:

- minimum required data handling,
- accepted storage boundaries,
- safe logging,
- authorization,
- provider transfer rules,
- deletion/retention behavior where in scope.

Do not collect additional data simply because implementation makes it easy.

---

# 33. Privacy in Verify

Verify should independently check relevant:

- response fields,
- database contents,
- logs,
- external payloads,
- client exposure,
- cross-user exposure,
- deletion behavior,
- private-file access.

Privacy documentation alone is not evidence.

---

# 34. Privacy in Release

Release should verify:

- correct production environment,
- correct storage environment,
- no production/private data accidentally enters preview/test,
- private storage remains private,
- production secrets remain isolated.

Deployment must not silently change data handling.

---

# 35. Data Inventory

Before real beta usage becomes substantial, maintain a concise inventory of
persistent user data.

For each meaningful data type record:

- classification,
- purpose,
- owner,
- storage location,
- external recipients,
- retention/deletion behavior.

This may live in this document or a future dedicated inventory if complexity
justifies it.

Do not create a heavyweight data-governance system before necessary.

---

# 36. Initial School Dashboard Data Inventory

The following is directional until production persistence architecture is
accepted.

| Data | Likely class | Purpose |
| --- | --- | --- |
| User/account ID | Class 2 | Account ownership |
| Email | Class 2 | Authentication/account communication |
| Course metadata | Class 2–3 | Academic dashboard |
| Assignments | Class 3 | Academic planning |
| Learning Objectives | Class 3 | Academic planning |
| Study Tasks | Class 3 | Personal study planning |
| Progress/completion | Class 3 | Personal planning/progress |
| Class schedule | Class 3 | Scheduling/planning |
| Personal notes | Class 3 | Private academic context |
| Uploaded Course files | Class 3 | Course understanding/ingestion |
| Extracted document text | Class 3 | Ingestion/AI processing |
| AI-generated study plan | Class 3 | Personalized planning |
| AI usage counts | Class 1–2 | Cost/usage controls |
| API keys/tokens | Class 4 | Infrastructure/integration authentication |

This table should evolve when real persistent architecture is accepted.

---

# 37. Beta User Rule

Friends or invited beta users are real users.

Their data receives the same intended privacy treatment as paid users.

Do not assume:

> free beta

means:

> disposable data.

Before accepting private beta data, the application should have sufficient:

- authentication,
- authorization,
- isolation,
- storage protection,
- deletion behavior,
- CI/security safeguards

for the accepted beta scope.

---

# 38. Monetization Does Not Change Privacy Ownership

Charging a subscription does not grant broader rights to user academic content.

Monetization and privacy are separate.

Do not change private-data use merely because a user is:

- free,
- paid,
- beta,
- trial.

Feature limits may differ.

Privacy/security boundaries should remain explicit.

---

# 39. Legal / Policy Boundary

This engineering document is not a substitute for formal legal review or a
public privacy policy.

Before broader public/commercial launch, the project may need:

- user-facing Privacy Policy,
- Terms of Service,
- provider disclosures,
- age-related considerations,
- applicable legal review.

Engineering requirements should support truthful user-facing policies.

Do not claim legal compliance merely because this document exists.

---

# 40. Requirement Activation

Plan should reference relevant privacy IDs rather than reproducing this entire
document.

Example:

Task:

> Upload private Course PDFs.

Applicable requirements may include:

- `PRIV-MATERIAL-001`
- `PRIV-MATERIAL-003`
- `PRIV-MATERIAL-004`
- `PRIV-STORAGE-002`
- `PRIV-DEV-001`
- `PRIV-EXT-001`

alongside relevant security requirements.

---

# 41. Privacy Traceability

For meaningful R3 tasks:

privacy requirement  
→ implementation control  
→ Verify evidence

Example:

```text id="3y8nbj"
PRIV-MATERIAL-001
Uploaded Course files are private

↓

Build
private object storage + owner metadata

↓

Verify
User A download succeeds
User B denied
anonymous denied
```

---

# 42. Privacy Requirement Changes

Do not weaken privacy requirements merely because implementation is difficult.

Material changes to:

- retention,
- deletion,
- external use,
- data sharing,
- data collection

require deliberate product/privacy review.

---

# 43. No Privacy Theater

Do not add unnecessary privacy complexity with no real data-flow benefit.

Examples:

- complex consent dialogs for data not being collected,
- duplicate encryption layers without a threat,
- elaborate retention automation before any relevant data exists.

Prefer:

data  
→ purpose  
→ classification  
→ minimum handling  
→ control  
→ verification

---

# 44. Current Privacy Baseline

At the end of Milestone 1:

- no real user accounts are stored,
- no private user Course data is persisted,
- no user uploads exist,
- no AI provider receives user data,
- no production analytics containing private academic content exist.

The next privacy boundary arrives with persistent real-user data.

Before that milestone is exposed to beta users, privacy requirements should be
mapped into the accepted architecture and tests.

---

# 45. Reuse Across Projects

The classification/principles in this document are reusable.

Project-specific content is not automatically reusable.

For ReviewTap, privacy concerns would include additional data such as:

- business-account information,
- customer feedback,
- optional customer contact details,
- consent state,
- review/tap analytics.

ReviewTap should receive its own project-specific privacy profile rather than
blindly copying School Dashboard assumptions.

---

# 46. Final Principle

The application should not ask:

> How much user data can we collect?

It should ask:

> What is the minimum information required to provide this user's chosen
> experience safely and reliably?

Private academic data should remain under strong user-centered control.

The intended privacy model is:

> collect deliberately,
> expose minimally,
> protect by default,
> retain purposefully,
> delete predictably,
> and verify every meaningful boundary.