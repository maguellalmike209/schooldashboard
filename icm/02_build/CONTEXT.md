# ICM — Build Stage

## 1. Purpose

The Build stage converts an accepted Plan into working implementation.

Build owns:

- implementation,
- task-local engineering decisions,
- secure coding,
- targeted tests,
- dependency changes when accepted,
- implementation checks,
- diff inspection,
- and a trustworthy handoff to Verify.

Build does NOT own:

- redefining product behavior,
- inventing security policy,
- changing privacy policy,
- expanding accepted scope,
- declaring final PASS,
- or authorizing production deployment.

The objective is:

> implement the smallest secure coherent solution that satisfies the accepted
> Plan and leaves strong evidence for independent Verify.

---

# 2. Build Is an Execution Stage

Build should not repeatedly reconsider decisions already resolved by Plan.

Use the accepted Plan as the task-specific execution contract.

Build may autonomously decide ordinary local details such as:

- helper names,
- component decomposition,
- safe file organization,
- local TypeScript types,
- framework conventions,
- implementation syntax,
- test organization,
- straightforward accessibility details,
- small task-local refactors.

Build should NOT stop merely because several equivalent implementation options
exist.

Choose the clearest option compatible with:

- the Plan,
- project conventions,
- architecture,
- security requirements,
- and existing code.

---

# 3. Build Entry Conditions

Before meaningful implementation, Build should have:

- an authorized task,
- an accepted Plan when required,
- a risk tier,
- defined scope,
- relevant requirements,
- acceptance criteria,
- verification targets,
- no unresolved material blocker.

For substantial work, Build should be able to answer:

> What am I implementing?

> What am I explicitly not implementing?

> What risk tier applies?

> Which security/privacy rules constrain the task?

> What behavior must remain unchanged?

> What evidence must exist before Verify?

If Build still has to invent a major product or security rule:

return to Plan.

---

# 4. Required Entry Context

Before implementing:

1. read root `AGENTS.md`;
2. read root `CONTEXT.md`;
3. read this Build-stage context;
4. read the accepted active task Plan;
5. inspect relevant current implementation;
6. inspect Git state;
7. load only the durable context required by the task/risk tier.

Do not load every repository document automatically.

Do not load every historical artifact.

Use progressive disclosure.

---

# 5. Risk Tier Controls Build Depth

Build must preserve the risk tier assigned during Plan.

Use the highest applicable tier.

## R0

Typical Build behavior:

- documentation edits,
- formatting,
- non-executable metadata.

Minimal technical verification.

---

## R1

Typical Build behavior:

- UI,
- styling,
- read-only application behavior,
- safe refactors,
- ordinary client-side functionality.

Use normal engineering checks.

---

## R2

Typical Build behavior:

- persistence,
- APIs,
- database behavior,
- server actions,
- background jobs,
- significant dependencies,
- data transformations.

Requires stronger validation, failure handling, and automated tests.

---

## R3

Typical Build behavior:

- authentication,
- authorization,
- multi-user data,
- tenant isolation,
- PII,
- uploads,
- private files,
- webhooks,
- OAuth,
- billing,
- external redirects,
- public write endpoints,
- AI actions involving private data,
- secrets.

Requires implementation of explicit security controls and relevant negative
tests.

---

## R4

High-impact work.

Build may prepare:

- code,
- migrations,
- tests,
- simulations,
- dry runs,

when safe.

Do not execute the high-impact action without the approval required by Plan and
`AGENTS.md`.

---

# 6. Risk Escalation During Build

Implementation may reveal a higher-risk boundary that Plan did not anticipate.

Examples:

- a UI feature suddenly needs a server API;
- a database feature introduces multi-user ownership;
- an integration requires OAuth;
- a document feature requires private uploads;
- an AI feature requires sending private data externally.

When this occurs:

1. stop the affected implementation path;
2. identify the new boundary;
3. reassess the risk tier;
4. return to Plan when security, privacy, architecture, or acceptance criteria
   materially change.

Do not continue under an obsolete low-risk Plan.

---

# 7. Inspect Before Editing

Before changing an existing area:

inspect:

- relevant source files,
- existing tests,
- existing types,
- existing utilities,
- current routes/APIs,
- dependencies,
- configuration,
- nearby patterns.

Prefer extending established project patterns when they remain appropriate.

Do not replace working code solely because another design is possible.

---

# 8. Repository State Before Build

Inspect Git state before meaningful edits.

At minimum understand:

- current branch,
- configured upstream,
- working tree,
- staged files,
- untracked files,
- existing unrelated changes.

Do not overwrite unrelated user work.

Do not assume the repository is clean because a previous stage reported it.

---

# 9. Accepted Plan Is the Build Contract

Build should follow the accepted Plan's:

- objective,
- risk classification,
- requirements,
- non-goals,
- invariants,
- security/privacy requirements,
- proposed approach,
- impact map,
- acceptance criteria,
- verification targets.

Do not reopen settled decisions merely because another implementation would be
easier.

---

# 10. Local Plan Deviations

Build may deviate from low-level Plan details when repository reality makes
another implementation clearly better.

Allowed examples:

- slightly different file placement,
- equivalent framework primitive,
- helper extraction,
- type organization,
- test organization.

A local deviation is acceptable when:

- product behavior does not change,
- security properties do not change,
- privacy behavior does not change,
- architecture does not materially change,
- scope does not expand,
- acceptance criteria remain valid.

Record meaningful deviations in the Build handoff.

---

# 11. Material Plan Conflict

Return to Plan when implementation reveals that the accepted approach would
materially change:

- product behavior,
- architecture,
- security policy,
- privacy policy,
- ownership/authorization,
- persistence semantics,
- task scope,
- acceptance criteria,
- external provider choice,
- significant dependency strategy.

Do not force an invalid Plan.

Do not silently redesign the system either.

---

# 12. Smallest Secure Coherent Change

Implement the smallest coherent solution that fully satisfies the accepted
task.

Avoid:

- unrelated refactors,
- speculative infrastructure,
- future-feature scaffolding,
- premature abstractions,
- unnecessary dependencies,
- giant framework rewrites.

Smallest does NOT mean:

> remove required validation or security controls.

Security required by the accepted Plan is part of the minimum solution.

---

# 13. Build in Logical Increments

A useful implementation sequence is often:

1. establish required types/contracts;
2. implement core behavior;
3. implement security/authorization boundaries;
4. connect UI/API/data flow;
5. implement failure states;
6. add targeted tests;
7. run Build checks;
8. inspect the diff;
9. hand off to Verify.

Do not build several speculative layers before validating the core path.

---

# 14. Secure Coding Default

For relevant tasks:

assume external input is hostile until validated.

Assume resource identifiers can be guessed.

Assume client-side values can be modified.

Assume public endpoints can be automated or abused.

Assume external systems can fail.

Assume AI output can be wrong or maliciously influenced.

Implement accordingly.

---

# 15. Trust Boundary Enforcement

Security checks belong at trusted boundaries.

Examples:

browser  
→ server validation

authenticated request  
→ server authorization

server  
→ database access

external webhook  
→ signature verification

file upload  
→ validation/storage boundary

Do not rely on client-side controls for security.

---

# 16. Input Validation

Validate untrusted data at server/trust boundaries.

Depending on the input, validate:

- type,
- format,
- allowed values,
- length,
- size,
- ownership relationship,
- required fields,
- URL scheme/domain,
- file properties.

Prefer explicit schemas when complexity justifies them.

Client validation may improve UX.

It is not the security boundary.

---

# 17. Output Safety

Use framework-safe output rendering by default.

Avoid unsafe HTML execution.

If rendering user-supplied rich content becomes necessary:

use an accepted sanitization strategy.

Do not manually concatenate untrusted content into executable contexts.

---

# 18. Authentication

When authentication is in scope:

use accepted project/provider mechanisms.

Do not invent custom password/session/token protocols unless explicitly
approved.

Authentication logic should remain server-trusted.

Never expose server credentials to the browser.

Build must preserve the distinction:

Authentication:

> Who is this actor?

Authorization:

> May this actor perform this action?

---

# 19. Authorization

Authorization is required for every protected action/resource.

Do not assume authorization because:

- UI hides the object,
- user supplied the object ID,
- route is nested under a user page,
- identifier is difficult to guess,
- request is authenticated.

Check permission at the server/data boundary.

For private user resources, conceptually verify:

authenticated actor  
+  
requested action  
+  
resource ownership / tenant membership

---

# 20. Multi-User / Tenant Isolation

For multi-user functionality:

every private data read/write must preserve tenant isolation.

Do not trust client-supplied ownership identifiers.

Prefer deriving ownership from authenticated server context.

Example:

unsafe:

user sends:

`userId = "123"`

and server trusts it.

Safer:

server resolves authenticated user  
→ server scopes query to authenticated owner

Build should make cross-user access difficult by architecture, not only by UI.

---

# 21. Persistence

When implementing persistence:

- preserve product relationships,
- enforce ownership,
- validate writes,
- enforce integrity constraints where appropriate,
- use safe query mechanisms,
- consider delete/update behavior,
- avoid duplicated canonical data unless intentionally required.

Do not mechanically translate mock fixture shapes into production schemas.

The accepted Plan owns production data modeling.

---

# 22. Database Query Safety

Use parameterized ORM/query-builder/database operations.

Do not create SQL by concatenating untrusted strings.

Database identifiers are not secrets.

Authorization cannot depend on ID obscurity.

Use least-privilege credentials where supported.

---

# 23. Database Migrations

Migrations are controlled changes.

For meaningful migrations:

- make intent explicit,
- preserve existing data where required,
- understand rollback/recovery,
- avoid destructive changes without authorization,
- test migration behavior where practical.

R4 destructive migrations require the approval defined by Plan.

Build may prepare them without executing production impact.

---

# 24. User Input

Forms, APIs, server actions, and URL parameters must be treated as untrusted.

Validate:

- required fields,
- allowed formats,
- length,
- enum/value boundaries,
- ownership relationships,
- numeric/date constraints.

Do not persist arbitrary client data merely because TypeScript says the type is
correct.

Runtime validation is separate from static typing.

---

# 25. APIs

For APIs consider:

- authentication,
- authorization,
- validation,
- response minimization,
- status/error behavior,
- rate/abuse control,
- idempotency where relevant,
- enumeration risks,
- logging.

Do not expose internal database structures unnecessarily.

Do not return private objects simply because the caller knows their ID.

---

# 26. Public Endpoints

Public endpoints must assume automated hostile use.

Examples include:

- NFC tap routes,
- public review handoffs,
- signup,
- password reset,
- public forms,
- webhooks.

Consider:

- spam,
- enumeration,
- replay,
- abuse volume,
- malicious payloads,
- resource exhaustion.

Implement accepted abuse controls.

---

# 27. Rate Limiting

When Plan requires rate/abuse protection:

apply it to the meaningful trust boundary.

Do not add arbitrary limits without product/security rationale.

Rate limits should consider:

- user,
- IP,
- resource,
- operation type

where appropriate.

Verify should later prove abuse controls rather than merely inspect configuration.

---

# 28. Secrets

Never hardcode secrets.

Never expose secrets to client bundles.

Never log secrets.

Never commit secrets.

Use accepted environment-secret mechanisms.

If Build discovers a real committed/exposed secret:

STOP.

Treat it as an incident requiring remediation/rotation.

Do not simply remove the visible string and continue.

---

# 29. Environment Variables

Distinguish:

server-only configuration

from:

intentionally client-exposed configuration.

Do not use public environment-variable naming for secrets.

When adding configuration:

- document required variable names,
- avoid real values in committed examples,
- validate required server configuration when appropriate.

---

# 30. Privacy

For tasks involving personal/private data:

follow `docs/DATA_PRIVACY.md`.

Build should minimize:

- collection,
- duplication,
- exposure,
- logging,
- unnecessary retention.

Do not use real user data in ordinary fixtures/tests.

---

# 31. Logging

Logs should provide operational value without becoming a privacy leak.

Do not log:

- passwords,
- access tokens,
- refresh tokens,
- private keys,
- full sensitive payloads,
- private document contents,
- unnecessary PII.

Prefer:

- event type,
- safe identifiers,
- structured error metadata.

---

# 32. Error Handling

User-facing errors should not leak:

- stack traces,
- database internals,
- environment configuration,
- credentials,
- internal service details.

Internal diagnostics should preserve enough evidence to debug safely.

Never silently swallow meaningful errors.

---

# 33. File Uploads

Upload features require the controls accepted by Plan.

Typical implementation concerns:

- ownership,
- size bounds,
- content/type validation,
- safe filenames,
- private storage,
- access-controlled retrieval,
- metadata,
- deletion,
- processing isolation.

Do not treat the filename extension as proof of content type.

Do not store private uploads in public locations by default.

---

# 34. File Downloads

Private files require authorization on retrieval.

Do not rely solely on obscure URLs.

When using signed URLs:

- keep lifetime appropriate,
- scope access appropriately,
- avoid exposing broader storage permissions.

---

# 35. External URLs

Validate user/external URLs before redirecting or fetching.

Consider:

- allowed protocol,
- expected domain rules,
- malformed URLs,
- unsafe schemes,
- open redirects.

ReviewTap-style external review handoffs should use accepted redirect rules.

---

# 36. Webhooks

When implementing webhooks:

- verify authenticity using provider-supported signing;
- verify payload before trusted processing;
- consider freshness/replay;
- use idempotent processing where relevant;
- avoid duplicate side effects;
- handle retry/failure safely.

Do not trust a webhook because its URL is difficult to discover.

---

# 37. External Integrations

Treat third-party APIs as external trust boundaries.

Validate important responses before treating them as trusted state.

Handle:

- timeout,
- failure,
- malformed data,
- rate limit,
- partial availability.

Do not expose provider credentials.

---

# 38. AI Integration

AI/model output is untrusted.

Do not permit model output to bypass:

- validation,
- authentication,
- authorization,
- product approval requirements.

For private data:

send only accepted information.

Do not casually include entire user records/documents in prompts.

When AI can perform actions:

authorization must be checked by the application, not by the model.

---

# 39. Prompt Injection

When AI operates over user/external documents:

treat document text as untrusted content, not privileged instructions.

Do not allow uploaded Course materials or website content to override system
rules/tool permissions.

Tool/action permissions remain controlled outside the model's generated text.

---

# 40. AI Cost Controls

When AI usage has meaningful cost:

implement accepted limits/telemetry such as:

- operation count,
- model usage,
- token/usage measurement,
- per-user accounting,
- rate limits,
- quotas.

Do not introduce billing merely because cost tracking exists.

Cost visibility and monetization are separate concerns.

---

# 41. Dependencies

Before adding a meaningful dependency:

confirm the accepted Plan allows it.

Use existing platform capability when reasonable.

When adding:

- update lockfile normally,
- do not bypass security warnings,
- do not install unrelated packages,
- avoid abandoned/unknown dependencies where practical.

Build should record meaningful dependency additions in its handoff.

---

# 42. Supply Chain Safety

Do not:

- install packages from random URLs,
- execute unreviewed remote scripts,
- disable lockfiles,
- bypass package-integrity controls,
- downgrade security controls merely to satisfy compatibility.

Prefer official package registries and maintained packages.

---

# 43. Tests During Build

Build should create automated tests appropriate to risk.

Do not wait for Verify to invent all test coverage.

Tests should be part of implementation when behavior is important.

---

# 44. R1 Testing

Typical evidence may include:

- lint,
- typecheck,
- build,
- component/browser checks.

Automated tests are useful when regression value justifies them.

---

# 45. R2 Testing

Typically include:

- unit tests,
- data invariant tests,
- integration tests,
- failure cases,
- API/data behavior.

Do not rely only on manual UI inspection for persistent/server behavior.

---

# 46. R3 Testing

Add relevant automated negative/security cases.

Examples:

- unauthorized request denied,
- cross-user access denied,
- malformed payload rejected,
- invalid redirect denied,
- forged webhook rejected,
- invalid upload rejected,
- sensitive fields excluded,
- unauthenticated access denied.

The happy path alone is insufficient.

---

# 47. Security Tests Must Test Real Controls

Weak test:

> function exists named `authorizeUser`.

Strong test:

> authenticated User A requests User B's resource and receives denial.

Prefer behavioral evidence over naming/implementation trivia.

---

# 48. Test Integrity

Do not:

- weaken tests to make implementation pass,
- delete failing tests without justification,
- mock away the security control being tested,
- change acceptance criteria because a test fails.

When a valid test exposes a defect:

fix the defect.

---

# 49. Evidence-Based Debugging

When something fails:

failure  
→ inspect evidence  
→ form hypothesis  
→ targeted change  
→ rerun relevant check

Avoid broad speculative edits.

One supported fix is better than several guesses.

---

# 50. UI and Accessibility

For student/user-facing interfaces:

use semantic elements and normal accessibility practices.

Where relevant:

- keyboard access,
- focus visibility,
- heading structure,
- meaningful labels,
- status not communicated only through color,
- reasonable responsive behavior.

Accessibility improvements that are local and compatible with scope may be
implemented autonomously.

---

# 51. Client vs Server Boundaries

Do not move sensitive/security logic to the client merely for convenience.

Client components should not receive unnecessary secrets/private data.

Server-side behavior should enforce:

- authentication,
- authorization,
- protected reads/writes.

Do not assume `"use client"` code is trusted.

---

# 52. Security Headers and Browser Controls

When the application becomes production-facing, follow accepted project
security requirements for relevant browser protections.

Examples may include:

- Content Security Policy,
- frame protections,
- MIME sniffing protections,
- referrer controls,
- secure cookie behavior.

Do not add random headers without understanding deployment/framework behavior.

These should be established by `SECURITY_REQUIREMENTS.md`.

---

# 53. Performance and Efficiency

Build should avoid obviously inefficient designs.

Consider performance when it materially matters:

- unbounded queries,
- N+1 access,
- loading unnecessary private data,
- repeated expensive AI calls,
- large uploads,
- unnecessary client bundles.

Do not prematurely optimize trivial paths.

---

# 54. Resource Bounds

User-controlled operations should have reasonable bounds when abuse could cause
cost/resource problems.

Examples:

- text lengths,
- upload sizes,
- pagination,
- query sizes,
- AI operations,
- expensive searches.

Bounds should come from accepted product/security requirements rather than
arbitrary guesses when material.

---

# 55. Concurrency and Idempotency

When duplicate operations can cause harm:

consider concurrency and idempotency.

Examples:

- billing webhooks,
- account creation,
- payment processing,
- ingestion jobs,
- destructive actions.

Do not introduce elaborate distributed coordination for ordinary UI updates.

---

# 56. Business Logic Integrity

Security includes protecting product invariants.

Do not permit API/client manipulation to bypass:

- ownership,
- workflow status,
- quotas,
- consent,
- required transitions.

Business rules that matter must be enforced on trusted server boundaries.

---

# 57. Scope Discipline

Do not build adjacent roadmap items.

When implementation reveals useful future work:

record it as a candidate.

Do not implement it unless required to complete the accepted task.

---

# 58. Future Infrastructure

Do not scaffold future systems merely because they are likely later.

Examples:

- billing,
- AI,
- queues,
- analytics,
- integrations,
- uploads

should be introduced only when accepted tasks require them.

---

# 59. Documentation During Build

Build may update documentation necessary to support development when the change
is already accepted.

Do not promote unverified behavior into:

`docs/IMPLEMENTATION.md`

Do not mark the active task Done.

Verify owns final verified state promotion.

---

# 60. Security Documentation

Do not rewrite:

- `SECURITY_REQUIREMENTS.md`,
- `DATA_PRIVACY.md`,
- `THREAT_MODEL.md`

merely to make implementation easier.

If accepted requirements prove invalid/incomplete:

return to Plan.

Implementation follows policy.

Implementation does not silently rewrite policy.

---

# 61. Threat Model Discoveries

If Build discovers a meaningful new attack surface not represented in the
accepted Plan:

record it.

If it materially changes controls or acceptance criteria:

return to Plan.

If it is low-impact and already covered by existing requirements:

implement the control and document the discovery in the handoff.

---

# 62. Security Incidents During Build

Stop normal execution if Build discovers:

- exposed real secret,
- unexpected sensitive data in Git,
- confirmed cross-user data leak,
- production credential exposure,
- destructive unauthorized action,
- serious active security defect involving real users.

Do not bury the issue inside routine implementation.

Surface the incident and safest next action.

---

# 63. Build Checks

Before handoff, run checks proportional to the task.

Examples:

- lint,
- typecheck,
- unit tests,
- integration tests,
- production build,
- browser tests,
- API tests,
- database tests,
- security tests,
- dependency checks,
- static analysis,
- `git diff --check`.

Do not run irrelevant expensive checks for ceremony.

Do not skip relevant security tests to save time.

---

# 64. CI

If CI exists:

local checks should anticipate CI requirements.

Before handoff when practical:

run the same important checks locally.

Do not modify CI merely to suppress valid failures.

If CI fails after local success:

investigate rather than assuming CI is wrong.

---

# 65. Diff Inspection

Before declaring Build ready:

inspect the complete task diff.

Confirm:

- expected files changed,
- unrelated files did not,
- no secrets were introduced,
- no private/raw files were introduced,
- no generated junk is tracked,
- no unexpected dependency was added,
- no security control was accidentally removed,
- no future-scope implementation leaked in.

---

# 66. Sensitive Diff Review

For R3+ work, specifically inspect for:

- client-exposed secrets,
- missing authorization,
- broad database queries,
- unsafe user-controlled IDs,
- logging of sensitive values,
- public storage exposure,
- unsafe redirects,
- disabled security checks,
- accidental debug endpoints.

Build should try to catch these before Verify.

---

# 67. Git Discipline

Build may autonomously inspect repository state.

Build should not normally commit unfinished current-task implementation.

The current task remains owned by:

Build  
→ implementation  
→ checks  
→ handoff

then:

Verify  
→ independent validation  
→ full PASS  
→ finalization

unless repository workflow defines branch commits/PR preparation differently.

---

# 68. Task Branch Workflow

When repository policy uses feature/task branches:

Build may create/use the accepted task branch according to repository rules.

Build may commit work when branch workflow requires intermediate commits and
the accepted ICM explicitly permits it.

Do not merge to protected production branches during Build.

Verify/CI/repository policy own merge readiness.

---

# 69. Verified Predecessor Synchronization

If an already-verified predecessor task is committed but not synchronized:

Build may perform safe normal synchronization according to `AGENTS.md`.

Confirm:

- repository identity,
- branch,
- no divergence,
- no conflict,
- no unsafe unrelated content.

A simple local-ahead state is not a blocker.

---

# 70. Git Transport Fallback

If Git synchronization fails solely because of transport/authentication:

follow the safe fallback process from `AGENTS.md`.

Confirm the SAME:

- repository,
- branch,
- history.

An authenticated HTTPS fallback may replace unavailable SSH when safe.

Transport fallback does not authorize:

- force push,
- rebase,
- reset,
- history rewrite,
- repository change.

---

# 71. Destructive Git

Do not automatically:

- force push,
- hard reset,
- rewrite history,
- discard user work,
- overwrite divergent remote work,
- perform destructive conflict resolution.

Stop when safe reconciliation requires human judgment.

---

# 72. Build Artifact

A Build artifact is optional.

Use:

`icm/02_build/output/`

when durable Build notes provide real value.

Examples:

- complex migration execution notes,
- substantial implementation deviation,
- multi-service change map.

Do not generate Build artifacts merely for process completeness.

Source code + tests + diff are normally the Build evidence.

---

# 73. Build Handoff

Meaningful Build work should end with a concise handoff.

Use:

## Build Status

One:

- `READY FOR VERIFY`
- `READY FOR VERIFY WITH KNOWN LIMITATION`
- `RETURN TO PLAN`
- `BLOCKED`

## Risk Tier

R0–R4.

## What Changed

Concise implementation summary.

## Security Controls Implemented

For R2+ when relevant.

If none:

`None.`

## Tests / Checks

Actual checks and results.

## Important Implementation Decisions

Only meaningful task-local choices.

## Plan Deviations

If none:

`None.`

## Known Limitations

Separate deferred scope from actual defects.

## Verification Targets

Important positive/regression/negative cases Verify must independently
challenge.

---

# 74. Ready for Verify Criteria

Build is ready when:

1. accepted implementation exists;
2. accepted scope is satisfied;
3. relevant security controls are implemented;
4. required tests exist;
5. Build checks are acceptable;
6. no known blocking defect remains;
7. Plan remains valid;
8. diff is task-scoped;
9. Verify has sufficient evidence/targets.

Then state:

`READY FOR VERIFY`

---

# 75. Automatic Build → Verify Transition

When Build status is:

`READY FOR VERIFY`

and the active instruction authorizes the complete lifecycle:

finish the Build handoff,

load:

`icm/03_verify/CONTEXT.md`

and continue automatically.

Do not ask Mike for permission merely because implementation completed.

---

# 76. Known Limitations

A limitation does not automatically prevent Verify.

Examples of potentially acceptable limitation:

- deferred unrelated capability,
- environment constraint that does not affect accepted requirements.

A known security defect affecting accepted behavior IS a blocker.

Do not downgrade a security problem into a harmless limitation.

---

# 77. Return to Plan

Use:

`RETURN TO PLAN`

when implementation reveals a material issue requiring redesign.

Examples:

- accepted authorization strategy cannot work,
- schema cannot preserve required ownership,
- provider lacks required security feature,
- scope must materially expand,
- privacy policy is unresolved,
- risk tier changed materially.

Provide the precise discovery.

Do not restart planning from zero.

---

# 78. Blocked

Use:

`BLOCKED`

when execution cannot proceed because of a concrete unresolved blocker.

State:

- blocker,
- evidence,
- smallest next action.

Do not use Blocked simply because implementation is difficult.

---

# 79. Build Self-Review

Before handoff, challenge the implementation:

> Did I implement accepted behavior or reinterpret it?

> Did risk increase during Build?

> Is authorization enforced server-side?

> Can another user manipulate an ID?

> Did I trust client data?

> Did I expose private data unnecessarily?

> Did I add an unnecessary dependency?

> Did I log sensitive information?

> Are tests checking real behavior?

> Did I weaken security to make something work?

> Did unrelated changes enter the diff?

Fix supported issues before handoff.

---

# 80. Efficiency

Build should optimize execution efficiency.

Prefer:

- existing project patterns,
- focused context,
- small diffs,
- targeted tests,
- existing utilities,
- repository source of truth.

Avoid:

- tutorials,
- repeated Plan reasoning,
- unnecessary documentation,
- speculative refactors,
- needless dependencies,
- broad rewrites.

Spend more effort on high-risk boundaries than ordinary boilerplate.

---

# 81. Delivery-First Behavior

Build should execute rather than narrate.

Do not produce frequent progress commentary unless:

- useful for a long task,
- a decision is needed,
- a blocker occurs,
- security issue appears.

Routine coding should proceed autonomously.

The final handoff contains the important explanation.

---

# 82. Interrupted Build Recovery

When resuming Build:

inspect:

- Git state,
- current Plan,
- task status,
- existing implementation,
- tests,
- any Build artifact.

Determine what has already been completed.

Continue from trustworthy repository evidence.

Do not restart blindly.

---

# 83. Production Boundary

Build may create production-capable code.

Build does not independently authorize production deployment.

Production release belongs to:

`icm/04_release/CONTEXT.md`

when explicitly authorized.

Do not deploy because:

- Build succeeded,
- tests passed,
- or Verify is expected to pass.

---

# 84. Final Principle

Build should require very little human involvement when Plan is good.

The ideal flow is:

accepted contract  
→ focused implementation  
→ secure defaults  
→ automated tests  
→ evidence  
→ independent Verify

The goal is:

> move quickly on routine engineering while making dangerous mistakes difficult.