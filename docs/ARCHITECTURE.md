# School Dashboard — Architecture

## 1. Purpose

This document defines the durable technical boundaries of School Dashboard.

It answers:

> What major parts of the system exist or are expected to exist, what is each
> part responsible for, and where do trust/data boundaries belong?

This document should remain more stable than implementation details.

It does NOT own:

- current task status,
- exact current file inventory,
- detailed implementation history,
- product requirements,
- security policy,
- privacy policy,
- threat-test procedures,
- provider selection.

Use:

- `docs/IMPLEMENTATION.md` for verified current implementation reality,
- `docs/TASKS.md` for roadmap/task state,
- `docs/PRODUCT_VISION.md` for product direction,
- `docs/V1_SPEC.md` and later accepted product specs for product behavior,
- `docs/SECURITY_REQUIREMENTS.md` for mandatory security properties,
- `docs/DATA_PRIVACY.md` for data-handling requirements,
- `docs/THREAT_MODEL.md` for attack surfaces and trust boundaries,
- `docs/SECURITY_TESTING.md` for adversarial verification,
- `docs/DECISIONS.md` for accepted durable choices.

Repository source remains authoritative for actual implementation.

---

# 2. Architecture Status Vocabulary

Architecture descriptions must distinguish among three states.

## Implemented

Exists in the repository/runtime and has sufficient verification evidence.

## Accepted direction

A conceptual boundary or responsibility that the product is expected to need,
but whose implementation details may remain unselected.

## Unselected

A provider, schema, protocol, service, algorithm, or infrastructure choice that
has not yet been accepted.

Do not describe accepted direction as though it were implemented.

Do not describe an unselected option as though it were chosen.

---

# 3. Current Implemented Architecture

Milestone 1 is a static read-only Next.js application.

The implemented application currently consists approximately of:

```text
Static academic fixture
        ↓
Selectors / derived helpers
        ↓
Shared presentation components
        ↓
Five primary views
```

The five primary views are:

```text
Dashboard
Courses
Course Page
Weekly Plan
Today
```

The canonical academic fixture currently lives in:

`src/lib/academic-context.ts`

The App Router lives in:

`src/app/`

There is currently no application persistence, authentication, private object
storage, external integration, AI service, queue, or background-processing
system.

For exact current routes, versions, components, commands, and verified behavior,
use:

`docs/IMPLEMENTATION.md`

---

# 4. Current Technical Stack

The current application uses:

| Technology | Role |
| --- | --- |
| Next.js | Application framework, routing, server/client application boundary |
| React | Student-facing UI |
| TypeScript | Application/domain typing |
| Tailwind CSS | UI styling |
| npm | Package management and lockfile-based dependency installation |

The existence of Next.js does not require every future feature to use a
particular server/data pattern.

Later Plans should use the framework's appropriate current capabilities while
preserving the boundaries defined in this document.

---

# 5. Milestone 1 Data Flow

Current data flow is entirely local to the application source.

```text
src/lib/academic-context.ts
            ↓
       domain selectors
            ↓
   shared derived context
            ↓
┌───────────┼───────────┬─────────────┐
↓           ↓           ↓             ↓
Dashboard  Courses   Course Page   Weekly Plan
                                      ↓
                                    Today
```

The exact diagram is conceptual.

All views derive from the same canonical fixture so that shared concepts do not
silently diverge.

Current display logic includes derived:

- daily Study Tasks,
- weekly progress,
- upcoming Assignment ordering,
- Course-scoped context.

This is not currently:

- a scheduling engine,
- a recommendation engine,
- a persistence service,
- a Course-ingestion system.

---

# 6. Academic Domain Boundary

School Dashboard should preserve the distinctions established during Milestone
1.

Important domain concepts include:

- User
- Academic Term
- Course
- Course Fact
- Class Meeting / schedule context
- Course Material
- Learning Objective
- Assignment
- Study Task
- Study Plan
- Progress / completion
- source/provenance information

These concepts may later gain additional implementation fields.

They should not be collapsed merely because two concepts appear together in the
UI.

---

# 7. Assignment / Study Task Boundary

Assignment and Study Task are separate concepts.

An Assignment represents an academic obligation/deadline.

A Study Task represents planned work.

Therefore:

```text
Assignment due date
≠
Study Task planned date
```

and:

```text
Assignment existence
does not automatically imply
Study Task existence
```

and:

```text
Study Task completion
does not automatically imply
Assignment submission/completion
```

This distinction should survive future persistence and AI planning.

---

# 8. Course Fact / Personal Plan Boundary

Course-backed information and student planning choices must remain
distinguishable.

Conceptually:

```text
Course Facts
    ↓
student understanding
    ↓
planning suggestions
    ↓
student-approved personal plan
```

Course Facts may come from:

- instructor/current-course material,
- imported Course sources,
- supplemental research.

Personal planning may include:

- suggested Objectives,
- Study Tasks,
- duration estimates,
- planned dates,
- revisions.

The system should not silently turn an AI inference into an authoritative Course
Fact.

---

# 9. Provenance Boundary

Important academic information should preserve enough provenance to answer:

> Where did this information come from?

Potential provenance classes include:

- current Course source,
- student entry,
- imported integration,
- supplemental research,
- extraction,
- AI inference,
- AI-generated planning suggestion.

Exact storage representation remains unselected.

Provenance should remain meaningful through:

- ingestion,
- reconciliation,
- AI generation,
- student review.

---

# 10. Future System Shape

The expected future architecture can be understood as several conceptual layers.

```text
Browser / Student UI
        ↓
Application boundary
        ↓
Authentication + Authorization
        ↓
Domain / Use-case logic
        ↓
Data access
   ┌────┴──────────────┐
   ↓                   ↓
Database          Private storage
   ↓                   ↓
Domain data       Course materials
        \             /
         \           /
          ↓         ↓
        Ingestion / processing
                ↓
        Grounded Course context
                ↓
          AI / planning layer
                ↓
          Student review
```

External integrations may connect through controlled boundaries.

This diagram describes responsibilities.

It does not prescribe specific providers or file structure.

---

# 11. Application Boundary

The application server/trusted server-side runtime is the primary enforcement
boundary for protected behavior.

The browser is untrusted.

Client-visible data may help render UI, but the browser must not be authoritative
for:

- identity,
- ownership,
- permissions,
- roles,
- quotas,
- billing entitlement,
- security-sensitive workflow state.

Protected state transitions must be checked at trusted boundaries.

---

# 12. Presentation Layer

The presentation layer owns:

- navigation,
- screen composition,
- forms,
- student review controls,
- responsive behavior,
- accessible interaction,
- representation of facts vs suggestions.

It should not own authoritative security decisions.

Client-side filtering may improve user experience.

It does not replace server-side authorization.

---

# 13. Domain / Use-Case Layer

Future non-trivial product behavior should have a clear application/domain
boundary rather than placing all business logic directly inside presentation
components.

Potential responsibilities include:

- Course creation/update rules,
- Assignment management,
- Study Task management,
- progress behavior,
- planning approval,
- ingestion review,
- source reconciliation,
- permission-aware operations.

Exact folder/service decomposition should be chosen when real complexity
requires it.

Do not build abstraction layers solely because they may become useful later.

---

# 14. Persistence Boundary

Future persistent academic data will require an authoritative durable data
store.

Conceptual responsibilities include storing:

- users/account relationships,
- academic terms,
- Courses,
- Assignments,
- Learning Objectives,
- Study Tasks,
- accepted plans,
- progress state,
- provenance,
- integration metadata,
- AI usage metadata where appropriate.

The following remain unselected:

- database provider,
- ORM/query layer,
- exact schema,
- migration framework,
- ID strategy.

Milestone 1 TypeScript fixture shapes are product-model evidence.

They are not automatically production tables.

---

# 15. Ownership in Persistence

Every private persistent resource should have an authoritative ownership or
tenant relationship.

Conceptually:

```text
Authenticated User
        ↓
authorized ownership/membership
        ↓
private resource
```

Private resource access must not depend only on:

- resource ID secrecy,
- client filtering,
- URL structure.

Data access must preserve:

- ownership,
- authorization,
- tenant isolation.

See:

`docs/SECURITY_REQUIREMENTS.md`

---

# 16. Authentication Boundary

Authentication will establish:

> Who is making this request?

Authentication is not yet implemented.

Provider selection remains unselected.

When introduced, architecture should use an established authentication mechanism
rather than custom authentication protocols.

Potential implementation concerns include:

- login,
- logout,
- sessions/tokens,
- account identity,
- provider callbacks.

Authentication does not itself answer:

> Is this user allowed to access this resource?

That belongs to authorization.

---

# 17. Authorization Boundary

Authorization answers:

> May this authenticated actor perform this action on this resource?

Authorization should be evaluated at trusted server/data boundaries.

Future resource classes likely requiring authorization include:

- Courses,
- Assignments,
- Learning Objectives,
- Study Tasks,
- plans,
- Course Materials,
- uploads,
- exports,
- integration state.

Cross-user isolation is a core architecture requirement.

---

# 18. Data-Access Boundary

Application/domain logic should access persistent data through a structure that
makes ownership and authorization difficult to omit accidentally.

The exact implementation may use:

- framework server functions,
- repository helpers,
- query functions,
- another appropriate abstraction.

The architecture does not currently require a dedicated repository/service class
for every entity.

The important property is:

> trusted data access preserves security and domain rules consistently.

---

# 19. Private File Storage Boundary

Course Material uploads should not be stored as ordinary repository files.

Future private storage is expected to handle:

- original uploads,
- possibly safe processing artifacts,
- authorization-aware downloads,
- deletion.

Private Course materials should be private by default.

The following remain unselected:

- object-storage provider,
- bucket/container structure,
- signed URL mechanism,
- scanning provider.

---

# 20. Upload Boundary

Uploads cross a high-risk trust boundary.

Conceptually:

```text
User-selected file
        ↓
validation
        ↓
authorized private storage
        ↓
safe ingestion/processing
```

The system should not trust:

- filename,
- extension,
- user-provided MIME metadata,
- file contents.

Actual upload architecture must satisfy:

- size controls,
- type validation,
- ownership,
- private storage,
- authorization,
- safe processing.

---

# 21. Course-Material Ingestion Boundary

Future ingestion will transform source materials into candidate structured
academic information.

Conceptually:

```text
Private Course Material
        ↓
extraction
        ↓
candidate facts / structure
        ↓
provenance + uncertainty
        ↓
student review where needed
```

Extraction output is not automatically authoritative truth.

Ingestion should preserve:

- source identity,
- relevant location/context,
- uncertainty,
- conflicts.

---

# 22. Temporary Processing Boundary

Document processing may require temporary artifacts.

Temporary processing data should:

- remain private,
- receive appropriate resource limits,
- not become durable accidentally,
- be removed according to accepted retention behavior.

Exact temporary-storage mechanism remains unselected.

---

# 23. Background Processing Boundary

Some future operations may become too slow or unreliable for a synchronous
request.

Potential examples:

- large document extraction,
- ingestion,
- AI processing,
- external synchronization.

If asynchronous/background processing becomes necessary, architecture should
preserve:

- user/resource ownership,
- idempotency where needed,
- retry safety,
- visibility of failure,
- privacy classification.

A queue/worker system is not currently selected or required.

Do not introduce one before a concrete task needs it.

---

# 24. Course Intelligence Boundary

Course intelligence should operate on grounded academic context.

Conceptually:

```text
authoritative Course sources
        +
supplemental information
        +
provenance
        +
uncertainty
        ↓
grounded Course understanding
```

Current-course instructor/source material should retain higher authority than
generic/historical sources where conflicts exist according to product rules.

Course intelligence must not silently overwrite authoritative facts with model
inference.

---

# 25. AI Boundary

AI/model functionality is a future external-processing boundary.

Conceptually:

```text
Authorized application context
        ↓
minimum necessary model input
        ↓
AI provider/model
        ↓
untrusted model output
        ↓
validation / grounding / product rules
        ↓
student-visible suggestion or safe action
```

Model output is never inherently trusted application state.

The model does not own:

- authorization,
- permissions,
- tenant selection,
- secret access,
- final security decisions.

---

# 26. Prompt-Injection Boundary

Content from:

- uploaded files,
- Course materials,
- external sources,
- user text

must be treated as untrusted model input.

Document text must not become trusted system instruction.

Application permissions must exist outside model-generated text.

AI tools/actions, if later introduced, must enforce authorization independently
of model intent.

---

# 27. AI Grounding and Provenance

Where AI generates academic claims or plans based on source materials, the
architecture should preserve enough context to distinguish:

- source-backed fact,
- extracted candidate,
- AI inference,
- planning suggestion.

Exact retrieval, embedding, vector search, or context-construction architecture
remains unselected.

No vector database is currently implied by this architecture.

---

# 28. Student Approval Boundary

AI-generated planning should remain advisory until accepted according to product
requirements.

Conceptually:

```text
generated suggestion
        ↓
student review
   ┌────┼────┐
   ↓    ↓    ↓
accept edit reject
        ↓
accepted plan state
```

The application should preserve a meaningful distinction between:

- generated proposal,
- accepted personal plan.

---

# 29. AI Usage / Cost Boundary

If cost-bearing AI operations are introduced, application architecture should be
capable of measuring useful usage information.

Potential records may include:

- user/account,
- operation type,
- provider/model,
- input usage,
- output usage,
- estimated cost,
- timestamp.

Cost accounting should not require retaining complete private prompt content
when metadata is sufficient.

Billing is a separate later capability.

---

# 30. External Integration Boundary

Future integrations may include services such as:

- calendar providers,
- file providers,
- academic platforms.

Each integration introduces a new trust boundary.

Conceptually:

```text
School Dashboard
        ↕
authorized integration adapter
        ↕
external provider
```

Integration architecture should preserve:

- minimum permissions/scopes,
- user authorization,
- source provenance,
- validation of provider responses,
- revocation/disconnection behavior,
- failure isolation.

No integration provider is selected by this document.

---

# 31. Webhook Boundary

If an external provider sends server-to-server events:

```text
External Provider
        ↓
public webhook endpoint
        ↓
signature/authenticity validation
        ↓
payload validation
        ↓
idempotent domain operation
```

Trusted state must not change before authenticity validation succeeds.

Webhook architecture is not currently implemented.

---

# 32. Billing Boundary

Billing remains a later optional capability.

If implemented, payment-card handling should preferably remain with an
established payment provider rather than entering School Dashboard directly.

Conceptually:

```text
payment provider
        ↓
authenticated billing event
        ↓
trusted entitlement state
        ↓
application capability
```

Client-visible subscription state must not grant entitlement by itself.

No billing provider is selected.

---

# 33. Search Boundary

If search is later introduced over private academic information:

- search authorization must match direct resource authorization,
- indexes must preserve tenant/user isolation,
- private source material must not become public through indexing.

The architecture does not currently select:

- full-text search provider,
- vector search,
- indexing technology.

---

# 34. Caching Boundary

Caching may be introduced for performance only when useful.

Private user responses must not be shared across users through incorrect cache
keys or public caches.

Architecture must distinguish:

- public content,
- user-specific content,
- private content.

No caching service is currently required.

---

# 35. Observability Boundary

Production operation should eventually provide enough observability to detect
meaningful failure.

Potential categories include:

- application errors,
- failed requests,
- background-job failures,
- integration failures,
- webhook failures,
- deployment health,
- performance,
- AI usage/cost.

Observability must respect privacy requirements.

Logs should not become a secondary store of private academic content.

Provider/tool selection remains unselected.

---

# 36. Error Boundary

Internal failures should be diagnosable without exposing implementation details
or private information to users.

Conceptually:

```text
internal failure
   ├── safe user response
   └── privacy-aware operational evidence
```

Errors must not expose:

- secrets,
- tokens,
- raw database details,
- another user's information.

---

# 37. Environment Architecture

The system should conceptually distinguish:

```text
local
test
preview
staging when justified
production
```

Not every environment must exist immediately.

Environment complexity should increase only when project risk requires it.

Production private data and credentials should not be casually reused by:

- local,
- preview,
- test

environments.

---

# 38. Configuration Boundary

Configuration should distinguish:

- public configuration,
- server-only configuration,
- secrets.

Secrets must not enter client bundles or source control.

Exact secret-management provider depends on future hosting/provider decisions.

---

# 39. Repository / Delivery Architecture

The engineering system is itself part of the architecture.

The intended mature development flow is:

```text
Mike authorizes task
        ↓
Plan
        ↓
Build
        ↓
Verify
        ↓
task branch / PR integration
        ↓
CI + security checks
        ↓
merge
        ↓
Release when authorized
        ↓
production
```

The exact repository enforcement state is recorded in:

`docs/IMPLEMENTATION.md`

The intended workflow is not evidence that all controls already exist.

---

# 40. ICM Architecture

The reusable engineering core consists of:

```text
AGENTS.md
CONTEXT.md

icm/
  01_plan/CONTEXT.md
  02_build/CONTEXT.md
  03_verify/CONTEXT.md
  04_release/CONTEXT.md
```

Responsibilities are separated intentionally.

```text
Plan
= architect + risk assessor + execution contract

Build
= secure executor

Verify
= independent adversarial inspector

Release
= controlled production operator
```

Release is not an automatic consequence of Verify PASS.

---

# 41. Project Security Profile

School Dashboard-specific security architecture is defined through:

```text
docs/SECURITY_REQUIREMENTS.md
docs/DATA_PRIVACY.md
docs/THREAT_MODEL.md
docs/SECURITY_TESTING.md
```

These documents define:

```text
required security property
        ↓
relevant threat
        ↓
implementation control
        ↓
adversarial test
        ↓
evidence
```

They do not themselves implement security controls.

---

# 42. Automated Test Architecture

The future test system should support multiple evidence levels.

Conceptually:

```text
unit / invariant tests
        ↓
integration tests
        ↓
browser / E2E tests
        ↓
security regression tests
```

Not every task requires every layer.

Testing depth should follow task risk.

The exact test framework remains unselected until SD-009 Plan.

---

# 43. CI Architecture

Future CI should enforce repeatable repository checks.

Expected baseline categories include:

```text
locked dependency installation
        ↓
lint
        ↓
typecheck
        ↓
automated tests
        ↓
production build
```

Security-sensitive development should later add appropriate:

- secret detection,
- dependency/security analysis,
- code analysis,
- security regression tests.

Exact CI implementation belongs to SD-010 and later foundation tasks.

---

# 44. Security Automation Architecture

Security instructions should increasingly become machine-enforced controls.

Potential enforcement includes:

- secret scanning,
- dependency scanning,
- code/security scanning,
- required status checks,
- branch protections,
- authorization regression tests.

Exact GitHub controls depend on actual repository/account capability and must be
verified before being documented as active.

---

# 45. Release Architecture

Production deployment belongs to Release.

Conceptually:

```text
verified commit
        ↓
release authorization
        ↓
preflight
        ↓
migration/config preparation
        ↓
deployment
        ↓
smoke tests
        ↓
security smoke tests when applicable
        ↓
monitoring
```

The architecture must retain exact version identity.

A provider reporting successful deployment does not prove product correctness.

---

# 46. Migration Boundary

Persistence changes may eventually require schema/data migrations.

Migrations should be treated as controlled application changes rather than
incidental setup.

Architecture should support reasoning about:

- compatibility,
- ordering,
- data preservation,
- rollback,
- forward fixes,
- destructive operations.

Destructive production migrations are high-risk operations.

Exact migration technology remains unselected.

---

# 47. Recovery Boundary

Meaningful production changes should have an understood recovery path.

Potential recovery strategies include:

- redeploy previous application version,
- revert,
- feature disablement,
- forward fix,
- data restoration.

Application rollback and database/data rollback are not always equivalent.

Recovery planning belongs to Release for meaningful changes.

---

# 48. Initial Multi-User Architecture Direction

When Milestone 2 is authorized, the product will need at least the conceptual
path:

```text
Browser
   ↓
Authentication
   ↓
Trusted User Identity
   ↓
Server-side Authorization
   ↓
Domain Operation
   ↓
Owner-scoped Data Access
   ↓
Persistent Store
```

For every private resource:

```text
User A → A resource = allowed when permitted
User A → B resource = denied
Anonymous → private resource = denied
```

This is an architecture invariant, not a provider decision.

---

# 49. Initial Course Upload Direction

When Course Material upload is authorized:

```text
Authenticated User
        ↓
Upload request
        ↓
server authorization
        ↓
file validation
        ↓
private object storage
        ↓
owner association
        ↓
safe processing
        ↓
extracted candidate content
        ↓
provenance
```

The user should not need to commit Course materials into the repository.

---

# 50. Initial Ingestion Direction

Ingestion should conceptually produce structured candidates rather than silently
mutating accepted Course truth.

```text
source material
        ↓
extraction
        ↓
candidate information
        ↓
source/provenance linkage
        ↓
conflict / uncertainty handling
        ↓
student review where appropriate
        ↓
accepted Course information
```

The exact extraction libraries/services remain unselected.

---

# 51. Initial Planning-Engine Direction

Planning should conceptually consume accepted Course context rather than raw
uncontrolled source text whenever possible.

```text
accepted Course context
+
Assignments
+
Objectives
+
student availability/preferences
        ↓
planning engine
        ↓
suggested Study Tasks / schedule
        ↓
student review
        ↓
accepted personal plan
```

Generated plans remain proposals until accepted.

---

# 52. Adaptive Planning Direction

Future adaptive planning may consume:

- accepted plan,
- completion state,
- remaining work,
- deadlines,
- availability.

It should produce:

- suggested revisions,

not silently rewrite student plans unless future product requirements explicitly
change that principle.

---

# 53. Architecture Scaling Principle

Do not create infrastructure because large applications commonly have it.

Introduce a new architectural component only when a concrete responsibility
requires it.

Examples:

Do not add:

- queue,
- cache,
- vector database,
- search cluster,
- microservice,
- event bus

without a demonstrated need.

Prefer the smallest architecture that preserves:

- product semantics,
- security,
- privacy,
- testability,
- maintainability.

---

# 54. Service Separation Principle

Conceptual layers in this document do not imply separate deployed services.

A responsibility may initially exist inside the primary Next.js application.

Separate deployment/service boundaries should be introduced only when justified
by needs such as:

- scaling,
- isolation,
- security,
- long-running processing,
- independent reliability requirements.

Do not create microservices for organizational neatness alone.

---

# 55. Dependency Principle

Prefer existing platform/framework capability when it safely satisfies the
requirement.

Add dependencies when they provide clear value.

Meaningful dependencies should be:

- justified,
- maintained,
- reviewed,
- represented in the lockfile,
- evaluated for security impact.

---

# 56. Provider Selection Principle

Provider choice is an architectural decision when it materially affects:

- security,
- privacy,
- cost,
- data portability,
- system boundaries,
- deployment,
- external dependency.

Examples include:

- authentication provider,
- database provider,
- object storage provider,
- AI provider,
- payment provider,
- deployment provider.

Such choices should be made during an authorized Plan with current provider
information.

Do not let a Build task select them incidentally.

---

# 57. Currently Unselected Major Technologies

The architecture currently does NOT establish a provider for:

- authentication,
- database,
- ORM,
- object storage,
- document extraction,
- background jobs/queue,
- AI/model inference,
- embeddings/vector search,
- search,
- analytics,
- observability,
- deployment/hosting,
- payments,
- email,
- notifications.

Some may never be needed.

Do not scaffold them merely because they appear in this list.

---

# 58. Supabase Status

Supabase has previously been considered as a possible persistence option.

It is not selected by this architecture document.

If persistence planning later evaluates Supabase, it should be compared against
the actual accepted requirements at that time.

Do not treat prior consideration as provider approval.

---

# 59. Google Integration Status

Google Calendar and Google Drive are possible future integrations.

They are not implemented or selected as mandatory integrations.

Any later implementation must separately address:

- OAuth scopes,
- user authorization,
- imported data,
- synchronization,
- failure handling,
- privacy,
- revocation.

---

# 60. Deployment Provider Status

No deployment provider is selected by this architecture document.

Provider selection should account for actual requirements such as:

- Next.js support,
- environment separation,
- secrets,
- preview deployments,
- observability,
- deployment traceability,
- rollback/recovery,
- cost.

Do not infer a hosting provider from framework choice alone.

---

# 61. Data Privacy Architecture

Architecture must preserve the data classes defined in:

`docs/DATA_PRIVACY.md`

Conceptually:

```text
Class 0 — Public
Class 1 — Internal / Operational
Class 2 — Personal
Class 3 — Private / Sensitive User Content
Class 4 — Secrets / Credentials
```

A data flow should become more controlled as sensitivity increases.

Derived private content generally remains private.

---

# 62. Security Trust Boundaries

Important future trust boundaries include:

```text
Browser
→ Application

Anonymous
→ Authenticated session

Authenticated user
→ Private resource

Application
→ Database

Application
→ Private storage

Upload
→ Parser / ingestion

Private content
→ AI provider

Untrusted text
→ AI model

AI output
→ Application state/action

Application
→ External integration

Provider
→ Webhook endpoint

Repository
→ CI

CI / deployment system
→ Production
```

The authoritative detailed threat model lives in:

`docs/THREAT_MODEL.md`

---

# 63. Secure Defaults

When architecture leaves a choice open, implementations should prefer secure
defaults.

Examples:

- private storage over public storage for Course files,
- deny over allow when authorization is uncertain,
- server verification over client trust,
- minimal external data transfer,
- least-privilege credentials,
- safe framework defaults over custom security protocols.

---

# 64. Failure Isolation

Future external systems should not become single paths for silent data
corruption.

Where practical:

- external provider failures should produce explicit failure state,
- AI failure should not corrupt accepted Course truth,
- integration failure should not bypass authorization,
- background-job failure should remain observable/retryable when appropriate.

Failure behavior should be designed with the feature rather than added only
after incidents.

---

# 65. Idempotency Boundary

Operations likely to be repeated should define safe repeat behavior where
necessary.

Potential examples:

- webhook delivery,
- ingestion jobs,
- external synchronization,
- billing events,
- retried background tasks.

Not every operation requires idempotency infrastructure.

Plan should identify it where duplicate execution could create harmful side
effects.

---

# 66. Concurrency Boundary

Concurrent operations should preserve important invariants.

Potential future examples:

- simultaneous edits,
- duplicate Course creation,
- repeated ingestion,
- usage/quota updates,
- subscription events.

Concurrency controls should be introduced where actual race risk exists.

Do not add complex locking without a demonstrated need.

---

# 67. Performance Boundary

Optimize based on observed or reasonably expected bottlenecks.

Potential concerns may include:

- large Course documents,
- repeated AI calls,
- expensive data queries,
- client bundle size,
- large lists.

Do not compromise:

- authorization,
- provenance,
- correctness,
- privacy

for speculative optimization.

---

# 68. Accessibility Architecture

Accessibility remains part of the presentation architecture.

Shared interactive components should support:

- keyboard interaction,
- visible focus,
- semantic controls,
- useful labels,
- responsive presentation.

Accessibility should be verified proportionally whenever relevant UI behavior
changes.

---

# 69. Current Architectural Invariants

Until deliberately superseded, preserve these principles:

1. the same conceptual Study Task remains the same task across views;
2. Assignment and Study Task remain distinct;
3. Course Fact and personal plan remain distinguishable;
4. missing source information is not fabricated;
5. important academic information can retain provenance;
6. AI-generated plans remain advisory until accepted;
7. client state is not an authorization boundary;
8. private user data is private by default;
9. product fixture shapes do not automatically become production schema;
10. Verify PASS does not authorize Release;
11. security policy documents do not imply runtime security implementation;
12. providers remain unselected until explicitly planned and accepted.

---

# 70. Architecture Change Rule

Update this document when a durable system boundary changes.

Examples:

- authentication architecture accepted,
- persistence architecture accepted,
- object storage introduced,
- background-job architecture introduced,
- AI boundary materially changes,
- deployment architecture established,
- service separation introduced.

Do not update this document for:

- trivial file moves,
- helper functions,
- temporary implementation details,
- routine UI changes.

Material architecture changes should also be reflected in:

`docs/DECISIONS.md`

when they represent durable accepted choices.

---

# 71. Relationship to Current Implementation

`docs/IMPLEMENTATION.md` should answer:

> What exists today?

This document should answer:

> How are the major technical responsibilities separated, and what boundaries
> must future implementation preserve?

If the two documents appear to conflict:

inspect actual repository state.

Do not rewrite current reality merely to match intended architecture.

---

# 72. Relationship to Tasks

`docs/TASKS.md` determines when architecture becomes implementation work.

This document does not authorize:

- authentication,
- persistence,
- uploads,
- AI,
- integrations,
- deployment.

A conceptual layer remains dormant until an authorized task needs it.

---

# 73. Final Principle

School Dashboard should grow through deliberate boundaries rather than premature
infrastructure.

The desired evolution is:

```text
static product model
        ↓
secure engineering foundation
        ↓
authenticated private persistence
        ↓
secure Course materials
        ↓
grounded ingestion
        ↓
Course intelligence
        ↓
AI-assisted planning
        ↓
adaptive planning
        ↓
external integrations
        ↓
production maturity
```

At each step:

> introduce the smallest architecture that safely supports the accepted product
> requirement while preserving security, privacy, provenance, testability, and
> student control.

The architecture should make later growth possible without pretending that
future systems already exist.