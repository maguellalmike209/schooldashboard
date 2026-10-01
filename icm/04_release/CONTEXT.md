# ICM — Release Stage

## 1. Purpose

The Release stage safely promotes verified software into an authorized runtime
environment.

Release is separate from implementation completion.

A task may receive:

`Verify PASS`

without being authorized for production deployment.

Release owns:

- release authorization confirmation,
- exact version/commit identification,
- target environment identification,
- deployment readiness,
- configuration validation,
- secret/config dependency checks,
- migration coordination,
- backup/rollback preparation,
- deployment sequencing,
- preview/staging promotion when applicable,
- production deployment,
- post-deploy smoke testing,
- health verification,
- monitoring,
- failed-deployment recovery,
- release evidence,
- and final release reporting.

Release does NOT own:

- redefining product requirements,
- redesigning implementation,
- weakening verification,
- bypassing CI,
- changing security/privacy requirements,
- inventing production policy,
- performing unauthorized destructive actions.

The objective is:

> deliver an already-verified version to an authorized environment while
> minimizing the probability and impact of deployment failure.

---

# 2. Release Is Optional

Plan → Build → Verify may complete without Release.

A task being:

- implemented,
- verified,
- committed,
- merged,
- or present on `main`

does NOT independently authorize production deployment.

Release requires explicit deployment authorization or an already accepted
continuous-deployment policy that clearly covers the change.

If deployment authorization does not exist:

stop after Verify/merge.

---

# 3. Release Answers a Different Question

Verify answers:

> Is this implementation correct and sufficiently evidenced?

Release answers:

> Is this exact verified version safe to promote into this exact environment
> under current operational conditions?

Do not collapse these questions.

---

# 4. Required Release Authorization

Before modifying a deployed environment, establish:

- deployment is authorized,
- target environment is known,
- intended version is known,
- actor has required access,
- release is within accepted scope.

Examples of valid authorization:

- Mike explicitly requests deployment,
- an accepted CI/CD policy automatically deploys merged verified `main`,
- an accepted release task explicitly includes production promotion.

Do not infer authorization from:

- a successful build,
- Verify PASS,
- a merged pull request,
- availability of deployment credentials.

Capability is not authorization.

---

# 5. Release Risk Classification

Use the task's existing risk tier and add deployment risk.

The release stage should use the highest applicable effective risk.

## Low deployment risk

Examples:

- static text/style change,
- no database/config change,
- easy rollback,
- no sensitive-data effect.

May use highly automated release.

---

## Moderate deployment risk

Examples:

- server logic,
- API change,
- new dependency,
- non-destructive persistence change,
- environment configuration change.

Requires stronger preflight and post-deploy verification.

---

## High deployment risk

Examples:

- authentication/authorization changes,
- private user-data behavior,
- uploads,
- billing,
- webhook changes,
- public API security changes,
- database migration affecting real user data,
- secret rotation,
- significant infrastructure change.

Requires strong release evidence and rollback planning.

---

## R4 / high-impact release

Examples:

- destructive migration,
- irreversible data transformation,
- bulk deletion,
- broad permission change,
- major security-policy change,
- migration that may permanently destroy production information.

Requires explicit human approval before executing the high-impact production
action.

---

# 6. Required Entry Context

Before meaningful release work:

1. read root `AGENTS.md`;
2. read root `CONTEXT.md`;
3. read this Release-stage context;
4. identify the verified task/version;
5. read the relevant Verify artifact;
6. inspect current Git/repository state;
7. inspect deployment configuration;
8. identify target environment;
9. inspect relevant architecture/security/privacy context;
10. inspect migration/configuration requirements;
11. confirm deployment authorization.

Do not automatically load every project document.

Use progressive disclosure.

---

# 7. Release Entry Conditions

Release should not begin unless:

- implementation received sufficient Verify PASS,
- release authorization exists,
- intended commit/version is known,
- target environment is known,
- no known blocking security defect exists,
- no unresolved release-critical blocker exists.

If any are missing:

return:

`RELEASE BLOCKED`

with the smallest required next action.

---

# 8. Exact Version Identity

Before deployment, identify exactly what is being released.

Record:

- branch,
- commit SHA,
- tag/version when applicable,
- build artifact identity when applicable.

Never deploy:

> whatever happens to be latest

without confirming it matches the verified version.

The deployed version should be traceable back to:

task  
→ verification  
→ commit  
→ release

---

# 9. Verify / Release Version Match

Confirm the version being deployed is the same version that received Verify
evidence.

If additional commits were added after Verify:

determine whether they affect release safety.

Do not assume Verify evidence still applies to changed code.

If meaningful code changed:

return to Verify.

---

# 10. Environment Identity

Before environment-sensitive action, identify:

- local,
- preview,
- test,
- staging,
- production.

Also identify relevant:

- deployment provider,
- project/application,
- region when material,
- database/environment,
- storage environment,
- external integrations.

Never make a production assumption based on a preview environment.

---

# 11. Environment Separation

Production and non-production environments should remain logically separated.

Where practical, separate:

- secrets,
- database,
- storage,
- OAuth configuration,
- webhooks,
- API credentials,
- user data.

Do not point preview/test environments at production data merely for
convenience.

Do not expose production secrets unnecessarily to preview builds.

---

# 12. Release Preflight

Before deployment, perform proportionate preflight checks.

Potential checks include:

- correct commit,
- clean/expected Git state,
- required CI passed,
- required build artifact exists,
- required environment variables exist,
- migration requirements understood,
- secrets configured,
- external services reachable/configured,
- rollback approach known,
- backup status when required,
- monitoring available,
- deployment window acceptable.

Use risk-based depth.

---

# 13. CI Gate

When CI is part of repository policy:

confirm required CI checks passed for the release commit.

Examples:

- lint,
- typecheck,
- unit tests,
- integration tests,
- E2E,
- production build,
- dependency checks,
- security scanning,
- secret scanning.

Do not deploy an unverified replacement commit merely because a previous commit
passed CI.

---

# 14. Build Artifact Integrity

When deployment uses a generated artifact:

confirm the artifact corresponds to the verified commit.

Avoid rebuilding with uncontrolled differences when artifact reproducibility is
important.

If the deployment platform builds directly from Git:

confirm the platform is deploying the intended commit.

---

# 15. Configuration Validation

Production behavior often depends on configuration not stored in source.

Before release, identify relevant:

- environment variables,
- feature flags,
- provider configuration,
- domains,
- callback URLs,
- database connection,
- storage configuration,
- API configuration.

Missing configuration should fail preflight rather than surprise production
users.

---

# 16. Secrets

Release must not expose secrets.

Do not:

- print secrets into release artifacts,
- copy secrets into source,
- place secrets into client-exposed variables,
- include secret values in logs or reports.

Verify only:

- presence,
- expected configuration,
- access scope

without unnecessarily revealing values.

---

# 17. Least Privilege

Deployment credentials and production services should use the minimum practical
permissions.

Do not expand production permissions merely to make deployment succeed.

If broader permissions are genuinely required:

treat that as a security-impacting change.

---

# 18. Database Migration Identification

Before deploying a version with persistence changes, determine:

- whether migration is required,
- migration ordering,
- compatibility with old/new application versions,
- data transformation behavior,
- whether migration is reversible,
- expected duration,
- lock/downtime risk,
- rollback implications.

Do not treat database migration as an incidental deployment step.

---

# 19. Non-Destructive Migrations

Prefer migration strategies that preserve compatibility.

When practical:

1. add compatible schema,
2. deploy compatible application code,
3. migrate/backfill data,
4. remove deprecated structure only later.

Avoid combining destructive schema removal with application rollout unless
strongly justified.

---

# 20. Destructive Migrations

Destructive production migrations are high impact.

Examples:

- dropping populated columns/tables,
- irreversible type conversion,
- deleting user data,
- destructive ownership changes.

Do not execute them without explicit required approval.

Before execution, establish:

- exact affected data,
- backup/recovery,
- rollback limitations,
- expected impact.

---

# 21. Backup and Recovery

Before high-impact data changes, determine whether a usable backup or recovery
mechanism exists.

A backup is useful only if restoration is possible.

For meaningful risk, know:

- backup exists,
- backup scope,
- recovery path,
- expected restoration constraints.

Do not claim rollback safety solely because a provider says “backups enabled.”

---

# 22. Rollback Planning

Before meaningful deployment, know what happens if the release fails.

Possible rollback strategies:

- redeploy previous commit,
- revert commit,
- disable feature flag,
- restore previous configuration,
- roll back migration when safe,
- forward-fix when rollback is unsafe.

Rollback strategy should fit the specific change.

---

# 23. Rollback Is Not Always Safe

Do not assume application rollback is safe after a data migration.

If new code wrote data incompatible with the old version:

rolling back application code may make the situation worse.

For persistence changes, consider:

application version  
+  
schema version  
+  
data state

together.

---

# 24. Forward Fix

Sometimes safest recovery is:

> keep current version and deploy a corrective patch

rather than rollback.

Use forward-fix only when:

- impact is understood,
- users/data remain sufficiently protected,
- fix path is faster/safer than rollback.

Severe security/data exposure may require immediate containment first.

---

# 25. Preview Deployment

When supported, preview environments are preferred before production for
meaningful UI/integration changes.

Typical flow:

task branch  
→ preview  
→ browser/E2E/security checks  
→ Verify PASS  
→ merge  
→ production release

Preview does not replace production smoke tests.

---

# 26. Staging

If staging exists, use it for higher-risk release validation when useful.

Staging should approximate production where practical without unnecessarily
containing production private data.

Do not create staging complexity if the project does not yet benefit from it.

---

# 27. Release Sequencing

Deployment order matters when multiple systems change.

Possible sequence:

database-compatible migration  
→ server/API  
→ client  
→ background worker  
→ external webhook configuration

or another accepted ordering.

Plan the smallest safe sequence.

Do not update several coupled systems in arbitrary order.

---

# 28. Feature Flags

Feature flags may reduce release risk when product maturity justifies them.

Useful cases:

- gradual rollout,
- separating deployment from activation,
- risky new feature,
- emergency disable.

Do not introduce feature-flag infrastructure for trivial work.

A flag is not a substitute for verification.

---

# 29. Gradual Rollout

For larger production systems, high-risk changes may benefit from:

- internal users,
- small percentage,
- selected accounts,
- progressive rollout.

The current project may not require percentage-based rollout initially.

Do not add rollout complexity before scale justifies it.

---

# 30. Deployment Execution

Use the deployment mechanism accepted by project architecture.

Examples:

- Vercel Git deployment,
- GitHub Actions,
- provider CLI,
- approved infrastructure workflow.

Prefer reproducible automated deployment over manual server mutation.

Do not make ad-hoc production edits that cannot be traced to source.

---

# 31. Infrastructure as Source-Controlled Configuration

When practical, infrastructure/configuration should be represented through
reviewable configuration rather than undocumented manual state.

Do not require premature Infrastructure-as-Code for a small application.

But avoid production setup that exists only in one person's memory.

---

# 32. Production Database Access

Do not manually alter production records during routine release unless the
release procedure explicitly requires it.

Avoid:

- arbitrary SQL changes,
- manual ownership edits,
- direct deletion

outside controlled procedures.

If manual action is required:

record exactly what was done.

---

# 33. Production Secret Changes

Secret changes/rotation require careful sequencing.

Consider:

- which service reads the secret,
- whether old/new values overlap,
- deployment order,
- revocation timing.

Do not revoke an old credential before the new version can use its replacement
unless the situation requires immediate containment.

---

# 34. OAuth / Callback Configuration

When deploying authentication/integration changes verify:

- production domain,
- redirect URI,
- callback URL,
- allowed origin,
- provider project/environment.

A localhost callback succeeding does not prove production configuration is
correct.

---

# 35. Webhook Release

For webhook integrations confirm:

- production endpoint,
- signing secret,
- provider configuration,
- expected event types,
- retry behavior,
- observability,
- idempotent processing.

Do not enable production webhook traffic before the application can safely
process it.

---

# 36. Storage Release

For file/storage features verify production:

- bucket/container identity,
- private/public configuration,
- access-control strategy,
- upload/download permissions,
- retention configuration where relevant.

Do not accidentally use public storage for private user files.

---

# 37. Domain / DNS Changes

Domain or DNS changes may have delayed propagation and broad impact.

Before changing:

- identify exact record,
- understand current value,
- know target,
- know rollback,
- avoid unnecessary simultaneous changes.

Treat high-impact domain changes cautiously.

---

# 38. Security Headers and Runtime Security

If project security requirements define runtime/browser controls:

verify deployed responses/configuration where practical.

Examples:

- CSP,
- secure cookies,
- transport security,
- frame policy,
- referrer policy.

Source configuration alone does not prove deployed behavior.

---

# 39. Smoke Testing

Immediately after deployment, run safe smoke checks.

Smoke tests should answer:

> Is the application alive?

> Can users reach critical functionality?

> Did deployment break obvious production behavior?

Examples:

- home/dashboard loads,
- authentication works,
- protected access works,
- critical API responds,
- database connectivity exists,
- upload flow works when relevant.

Keep smoke tests small and high-value.

---

# 40. Security Smoke Testing

For R3 releases, include safe production-appropriate security smoke tests.

Examples:

- anonymous protected route remains denied,
- authenticated owner access works,
- obvious cross-user access remains denied,
- private object is not publicly exposed.

Do not run destructive penetration tests against production.

Deep adversarial tests belong in local/preview/staging.

---

# 41. User Journey Smoke Tests

For important commercial workflows test a minimal real journey.

School Dashboard example:

login  
→ view own Courses  
→ open own Course  
→ logout

ReviewTap example:

public NFC URL  
→ valid business resolution  
→ deliberate Google review handoff

Select journeys based on release scope.

---

# 42. Monitoring

A release should have enough observability to detect major failure.

As the product matures, this may include:

- error monitoring,
- request failures,
- deployment health,
- latency,
- database errors,
- background-job failure,
- webhook failure.

Do not build enterprise observability prematurely.

But a production application should not be completely blind.

---

# 43. Logging After Release

Inspect logs when release risk warrants it.

Look for:

- unexpected errors,
- auth failures,
- migration failures,
- external-service errors.

Do not expose or copy sensitive production log contents unnecessarily.

---

# 44. Release Health Window

Some defects appear immediately.

Others appear only after traffic.

For higher-risk releases, use an appropriate observation window before
considering the release fully stable.

Do not invent a long waiting period for every minor UI deployment.

Risk determines depth.

---

# 45. Automated Post-Deploy Checks

As infrastructure matures, automate high-value smoke checks after deployment.

Examples:

deployment  
→ health endpoint  
→ critical E2E path  
→ release status

Automation reduces reliance on memory.

---

# 46. Failed Deployment

If deployment itself fails:

do not immediately make unrelated code changes.

Determine whether failure is:

- build,
- configuration,
- provider,
- migration,
- credentials,
- network,
- runtime.

Use evidence.

Then choose:

- retry,
- configuration repair,
- rollback,
- return to Build/Verify.

---

# 47. Successful Deployment With Broken Application

A deployment provider reporting:

`SUCCESS`

does not prove the application works.

Run smoke tests.

Deployment success means infrastructure accepted the release.

Product success requires observed behavior.

---

# 48. Release Regression

If post-deploy checks reveal regression:

assess impact.

Choose safest response:

- rollback,
- disable feature,
- forward fix,
- contain affected functionality.

Do not leave a known serious regression active because deployment technically
completed.

---

# 49. Security Incident During Release

If release reveals:

- exposed credential,
- cross-user data leak,
- public private-data access,
- severe auth bypass,
- destructive unintended data operation,

STOP normal release flow.

Prioritize containment.

Possible actions may include:

- disable affected feature,
- revoke/rotate credential,
- roll back,
- restrict access,
- preserve evidence.

Do not continue ordinary release reporting as if this were a routine defect.

---

# 50. Data Integrity Incident

If release may have corrupted production data:

avoid additional speculative writes.

Determine:

- affected scope,
- ongoing impact,
- recoverability,
- backup state,
- safest containment.

Do not attempt broad manual repair without understanding the data state.

---

# 51. Rollback Execution

Before rollback:

confirm:

- rollback target,
- compatibility,
- migration/data implications,
- configuration implications.

After rollback:

run smoke tests again.

A rollback is itself a production release.

Verify it.

---

# 52. Release Statuses

Use one final release status.

## RELEASED

Deployment completed and required post-deploy checks passed.

---

## RELEASED WITH OBSERVATION

Deployment completed, required checks passed, but an accepted monitoring period
or known non-blocking operational condition remains.

Use sparingly.

---

## RELEASE BLOCKED

Release cannot safely begin.

State blocker and next action.

---

## RELEASE FAILED — ROLLED BACK

Deployment failed or introduced unacceptable behavior and previous safe state
was restored.

---

## RELEASE FAILED — CONTAINED

A problem occurred and affected functionality was safely disabled/restricted
but full previous state was not restored.

---

## RETURN TO BUILD

Deployment exposed an implementation defect requiring code change.

---

## RETURN TO PLAN

Deployment exposed a material architecture/security/policy issue.

---

# 53. Release Artifact

For meaningful releases create:

`icm/04_release/output/<TASK-ID>-<name>-release.md`

or an appropriate release identifier.

Trivial automatically deployed R0/R1 changes may not need a large artifact if
CI/deployment history already provides sufficient evidence.

Security-sensitive releases should normally produce concise release evidence.

---

# 54. Release Artifact Structure

A substantial Release artifact should normally include:

# <Task ID> — <Task Name> Release

## Status

## Effective Risk

## Authorization

## Version

- branch
- commit
- build/artifact where relevant

## Target Environment

## Preflight

## Migration / Configuration

## Deployment

## Smoke Tests

## Security Smoke Tests

## Monitoring / Observations

## Rollback Readiness

## Incidents / Repairs

## Remaining Limitations

## Final State

Include only relevant sections.

---

# 55. Release Evidence

Good evidence may include:

- deployment provider result,
- deployed commit identity,
- successful migration output,
- health endpoint result,
- browser smoke test,
- safe API test,
- production security smoke test,
- monitoring evidence.

Do not expose secrets in artifacts.

---

# 56. Release Documentation

After successful release, update durable documentation only when needed.

Potential updates:

- `docs/IMPLEMENTATION.md`
- operational/deployment documentation

Do not update product/security/privacy policy merely because something was
deployed.

Deployment proves runtime state.

It does not automatically redefine requirements.

---

# 57. Git Is Not Deployment

Git tracks repository state.

A deployment system promotes repository versions into runtime environments.

Do not conflate:

`git push`

with:

`production deployed`

unless the accepted CI/CD configuration explicitly makes that relationship
true.

When automatic deployment exists, still confirm deployment result.

---

# 58. Git-Based Deployment

A common mature workflow is:

task branch  
→ preview deployment  
→ Verify  
→ pull request  
→ CI  
→ merge to protected `main`  
→ production deployment  
→ Release smoke checks

This is preferred when supported.

The exact platform may vary.

---

# 59. Automatic Production Deployment

Automatic deployment after merge may be accepted when:

- protected branch policy exists,
- required CI passes,
- deployment configuration is controlled,
- rollback is available,
- risk level is compatible.

R4 actions may still require explicit approval even when ordinary production
deploys are automatic.

---

# 60. Deployment Freeze

During serious incidents, broad migrations, or other defined conditions, the
project may temporarily stop normal deployments.

Do not create a freeze process unless the project needs one.

If an accepted freeze exists:

respect it.

---

# 61. Release Concurrency

Avoid overlapping production releases when their interactions are unclear.

Before a meaningful deployment, determine whether another deployment/migration
is currently active.

Do not create ambiguous production state through simultaneous incompatible
changes.

---

# 62. Background Jobs

When releasing background processing:

verify:

- worker version,
- queue compatibility,
- retry behavior,
- duplicate processing,
- deployment ordering.

Workers and web application versions may temporarily differ.

Plan compatibility accordingly.

---

# 63. Scheduled Jobs

For scheduled tasks verify:

- schedule,
- timezone,
- idempotency,
- duplicate execution behavior,
- permissions,
- failure visibility.

Do not activate a production schedule until safe handler behavior is verified.

---

# 64. Feature Activation vs Deployment

Deployment and feature activation may be distinct.

A feature may be deployed disabled.

This is useful when:

- production configuration needs staged setup,
- migrations must run first,
- controlled rollout is desired.

Do not assume deployed code must immediately become user-visible.

---

# 65. Backward Compatibility

Where multiple application versions may coexist temporarily:

preserve compatibility where practical.

Examples:

- rolling deployments,
- browser clients with old JS,
- background workers,
- external webhook senders.

Avoid schema/API changes that immediately break old instances without a
coordinated rollout plan.

---

# 66. External API Compatibility

When changing an externally consumed API:

do not silently break accepted clients.

Consider:

- versioning,
- optional fields,
- migration period,
- compatibility.

Internal-only APIs may use simpler coordination.

---

# 67. Performance After Release

For performance-sensitive changes, verify production behavior after deployment.

Examples:

- latency,
- database query performance,
- external API call volume,
- AI cost volume.

Do not optimize based solely on hypothetical scale.

Use evidence.

---

# 68. Cost Observation

When a release introduces cost-bearing services:

observe relevant usage.

Examples:

- AI model calls,
- storage,
- database usage,
- external APIs,
- background compute.

Cost monitoring does not automatically imply user billing.

---

# 69. Beta User Protection

When friends/early users begin using School Dashboard:

treat their data as real user data.

Do not:

- wipe beta data casually,
- use their content as debug fixtures,
- expose one user's records to another,
- copy private files into Git.

"Beta" does not mean security/privacy protections are optional.

---

# 70. Release Rollout for Early Users

During early beta, simple rollout may be sufficient:

preview  
→ Verify  
→ production  
→ Mike/test account smoke check  
→ small beta group

Do not introduce enterprise rollout infrastructure before traffic justifies it.

Maintain safe rollback and isolation.

---

# 71. Release Self-Review

Before production action ask:

> Is deployment actually authorized?

> Am I deploying the verified commit?

> Do I know the exact target environment?

> Did required CI pass?

> Are production secrets/config present without being exposed?

> Is a migration required?

> Could rollback be unsafe?

> Is user data at risk?

> Do I know how to detect failure?

> Do I know the safest recovery action?

> Am I assuming provider deployment success equals product success?

> Are there simultaneous releases that could conflict?

If an answer exposes a material risk:

resolve it before release.

---

# 72. Post-Deploy Self-Review

Before declaring RELEASED ask:

> Does the deployed version match the intended commit?

> Did critical smoke tests pass?

> Did security smoke tests pass where required?

> Did migrations/configuration complete?

> Are logs/health signals acceptable?

> Is there an unresolved production regression?

> Can we still recover if a delayed problem appears?

Do not declare success prematurely.

---

# 73. Stop Conditions

Stop release when:

- authorization is absent,
- wrong environment is selected,
- intended commit cannot be established,
- required CI failed,
- configuration is incomplete,
- migration risk is unresolved,
- backup/recovery requirements are unmet for high-risk work,
- severe security defect exists,
- real secret is exposed,
- production data safety is uncertain,
- destructive action lacks approval,
- release/version mismatch exists,
- concurrent change creates unsafe ambiguity.

State the smallest actionable next step.

---

# 74. Return to Verify

Return to Verify when:

- release candidate changed after verification,
- production-like environment reveals behavior requiring renewed validation,
- CI reveals a product/security failure,
- additional implementation was added during release preparation.

Do not stretch old Verify evidence across changed code.

---

# 75. Return to Build

Return to Build when release reveals:

- implementation bug,
- configuration validation bug requiring code,
- runtime incompatibility requiring implementation,
- missing error handling.

After Build repair:

Verify again before another production release.

---

# 76. Return to Plan

Return to Plan when release reveals:

- architecture problem,
- migration strategy problem,
- security-policy conflict,
- unresolved production data policy,
- material scope expansion,
- provider/infrastructure choice requiring reconsideration.

Do not solve architecture policy ad hoc during deployment.

---

# 77. Operational Efficiency

Release should be safe without becoming ceremonial.

Prefer:

- automated CI/CD,
- reproducible builds,
- automated migrations where safe,
- automated smoke tests,
- clear environment configuration,
- small release artifacts.

Avoid:

- repetitive manual clicking,
- undocumented production changes,
- copying commands from memory,
- unnecessary release meetings/checklists for trivial changes.

Automate repeated safe actions.

Keep high-impact decisions explicit.

---

# 78. Deployment Automation Goal

As the project matures, routine releases should become:

merge verified code  
→ automated production deployment  
→ automated smoke checks  
→ release evidence

with humans involved only for:

- material product launch decisions,
- high-impact migrations,
- security-sensitive infrastructure changes,
- incidents,
- R4 operations.

This preserves high autonomy without reducing production safety.

---

# 79. Security Automation Goal

Where tooling supports it, Release should rely on machine-enforced controls such
as:

- required CI,
- protected branches,
- secret scanning,
- code scanning,
- dependency checks,
- deployment environment protections,
- least-privilege credentials.

Prompt instructions should not be the only safety layer.

---

# 80. Interrupted Release Recovery

If Release is interrupted:

inspect:

- deployment provider state,
- intended commit,
- actual deployed version,
- migration status,
- database state,
- logs,
- Git history,
- release artifact.

Determine whether the environment is:

- old version,
- new version,
- partially migrated,
- partially configured.

Do not blindly rerun deployment.

Resume from observed runtime state.

---

# 81. Release Improvement Candidates

After meaningful releases, identify reusable improvements.

Examples:

- automate smoke test,
- add missing monitoring,
- add deployment check,
- improve rollback,
- document configuration,
- automate migration validation,
- reduce manual secret setup.

Do not automatically mutate the ICM during ordinary release.

Record candidates for later process review.

---

# 82. Final Release Report

End meaningful Release work with:

## Release Status

RELEASED / RELEASE BLOCKED / RELEASE FAILED — ROLLED BACK /
RELEASE FAILED — CONTAINED / RETURN TO BUILD / RETURN TO PLAN

## Effective Risk

## Version

Branch / commit / artifact.

## Environment

## Preflight Result

## Deployment Result

## Migration / Configuration Result

## Smoke Test Result

## Security Smoke Result

When applicable.

## Monitoring Result

## Rollback Readiness

## Incidents

If none:

`None.`

## Limitations

If none:

`None.`

## Improvement Candidates

Only meaningful candidates.

---

# 83. Final Principle

Release is where verified software meets real users.

Treat that boundary differently from coding.

The objective is not:

> deploy as quickly as possible.

The objective is:

> make routine safe deployments highly automated while keeping high-impact
> production actions controlled, observable, and recoverable.

A successful release should be:

- traceable,
- reproducible,
- verified,
- observable,
- and recoverable.