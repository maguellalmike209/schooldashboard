# SchoolDashboard — Product Readiness Register

**Status: INITIAL RESEARCH REGISTER / NOT A LAUNCH APPROVAL.** Do not create a scheduled grant or treat these entries as legally evaluated. This register is intentionally small until actual lifecycle milestones require more evidence.

## Current observed product boundary

The published project has an authenticated academic Term/Course slice and a legacy read-only/mock study dashboard. There is no verified public production Release, payment/subscription feature, uploaded private-course-material pipeline, or commercial launch in the source materials reviewed for this draft. Validate latest repository and deployment state before relying on these observations.

Long-term intended user: students who need dependable organization of academic courses, work, assignments, study plans, and eventually grounded course materials and AI assistance. A future workplace/project-management offering is speculative and outside current authorized SchoolDashboard scope.

## Conditional product lifecycle register

| Topic | Current status | Evidence / question to resolve | Trigger / owner |
| --- | --- | --- | --- |
| Student problem, real demand | RESEARCH REQUIRED | Student interviews, repeated pain point, alternative-workflow comparison, willingness to return | Product owner before major expansion |
| User experience and accessibility | EVIDENCE PENDING | Test save confirmation, Save semantics, distinction between mock and persisted Courses, and accessibility of beta workflows | Accepted product phase / UX verification |
| Account security and cross-user isolation | VERIFIED FOR SD-015 SCOPE, NOT WHOLE PRODUCT | Refer to independent SD-015 RLS/auth verification and hosted checks; reassess on every new private-data surface | Engineering Verify |
| Privacy, data retention and deletion | EVIDENCE PENDING FOR REAL-USER SCALE | Match `docs/DATA_PRIVACY.md` and accepted requirements; verify actual deletion/export/support scenarios | Before broader real-user beta |
| Uploaded course materials and AI data use | CONDITIONAL / FUTURE | Copyright/licensing, consent, source provenance, model transfer rules, malware/security, cost | Before enabling ingestion/AI |
| Accessibility and user trust | RESEARCH REQUIRED | Applicable accessibility requirements, tested student workflows, support and complaint channel | Before public launch |
| Real-user pilot operations | EVIDENCE PENDING | Hosting, support owner, incident procedure, monitored reliability, backup and restoration proof | Before real-user pilot |
| Paid subscription model | NOT IMPLEMENTED / FUTURE | Pricing willingness, processor, renewal/cancellation/refund, chargebacks and failed entitlement handling | Before payments / commercial launch |
| Tax/entity/registration and insurance | PROFESSIONAL / JURISDICTION RESEARCH REQUIRED WHEN APPLICABLE | Operating entity/location, physical vs digital supply, nexus, applicable registration, filings and coverage | Before paid launch; professional owner |
| Unit economics and AI cost controls | RESEARCH REQUIRED | Hosting/storage/database/AI/API/payment costs under base and downside cases, usage caps | Before cost-bearing AI and pricing |
| Customer terms, marketing and IP | CONDITIONAL / FUTURE | Evidence for performance claims, contract terms, copyright/licensing and provider policies | Before real users / paid launch as applicable |
| Recovery, shutdown and offboarding | EVIDENCE PENDING | Backup restore exercise, customer notice, export/deletion, subscription termination | Before production reliance |

## Evidence record template for future reviews

For each material row, record when relevant: **applicability** (Applicable / Conditional / Not applicable with rationale / Research required), **responsible owner**, **evidence URL or artifact reference**, **jurisdiction and source type** for legal claims, **observation/research date**, **effective date when established**, **verification scope and expiration/recheck trigger**, **next action**, and **decision status** (Proposed / Accepted / Professional review required / Blocked). Do not assert that an unsourced row has been legally vetted.

Do not recreate this whole table daily. The Manager Review should include only changed statuses, imminent gates, and meaningful human decisions, with links here for detail.

## Gate discipline

- `VERIFIED` applies only to precisely linked evidence and test scope; an RLS PASS does not establish full production safety.
- Missing evidence does not mean a legal obligation is absent. Investigate applicability with qualified professionals when material.
- During prototype work, do not impose unrelated paid-launch checklist items.
- Before real-user exposure or payment, Plan must enumerate applicable obligations and Verify/Release must challenge actual controls.
- Release remains separately authorized. A proposed readiness recommendation is never an execution grant.

## Next product-owner review (proposal only)

Evaluate student interviews and current UX evidence during the next accepted SchoolDashboard product phase. No product-development or billing tasks are authorized by this document.
