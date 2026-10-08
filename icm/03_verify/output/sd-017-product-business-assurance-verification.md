# SD-017 — Product & Business Assurance Independent Verification

## Human review summary

**Result: PASS for local SD-017 content and ICM integration.** Protected PR checks, merge, and canonical-main confirmation remain pending; `docs/TASKS.md` must remain In progress until they finish. No product, legal, tax, financial, accessibility, operational, or production-launch certification is implied.

No material decision is required to integrate this documentation. Future real-user, commercial, provider, pricing, jurisdiction, and Release decisions remain separate.

## Verification target and method

I independently read the ZIP's `adoption/README_FOR_CODEX.md`, `adoption/MINIMAL_ROUTING_EDITS.md`, and `adoption/SD017_VERIFICATION_MATRIX.md`, then compared the working tree with root and stage instructions, the SD-018 automation contract, and relevant product, security, privacy, architecture, decision, implementation, and prior SD-015/SD-018 verification evidence. The supplied guide and register were treated as candidate text, not proof of readiness. The scope was R0 documentation and routing; no application trust boundary changed.

## Adoption-matrix challenge

| Scenario | Independent result |
| --- | --- |
| Internal CSS/layout work | PASS: router and Plan make assurance conditional; guide explicitly excludes routine styling from a full commercial review. |
| Broad AI vision or research recommendation | PASS: proposals, accepted decisions, authorized tasks, and execution grants are distinct; no provider or work authorization follows from research. |
| First real-user beta | PASS: guide requires applicable identity, privacy, retention/deletion, support, accessibility, and incident evidence; register adds pilot operations and backup/restore questions. These remain pending, not certified. |
| Verified SD-015 Term/Course slice | PASS: register limits its security claim to SD-015 scope; the earlier independent artifact documents local RLS/auth and cross-user denial, not whole-SaaS readiness. |
| Textbooks sent to AI | PASS: guide calls for rights/licensing, provenance, consent, privacy, provider terms, and cost assessment before the feature launches. |
| Paid student subscription | PASS: guide covers renewal, cancellation, refunds, tax applicability, payment fees/security-related controls, chargebacks, entitlement, and support; legal claims require current jurisdiction-specific sources. |
| Free internal prototype | PASS: unrelated paid-launch formalities are expressly excluded. |
| PMO/workflow pivot | PASS: unvalidated option requires product-owner acceptance; no schema generalization or new product line is authorized. |
| ReviewTap NFC plus subscription and review steering | PASS after a localized wording repair: physical goods and service obligations stay scenario-specific; Google review policy and FTC or other applicable guidance are research triggers, without a legality verdict or ReviewTap code change. |
| Unit economics request | PASS: guide separates observed provider prices from assumptions, requires base/downside cases, acquisition/churn, usage variation, and cost caps. |
| Stale or unspecified legal guidance | PASS: record source type, jurisdiction, research/effective dates, limitations, and professional-review need; unresolved material obligations block launch claims. |
| Instructions embedded in research page | PASS: guide explicitly treats external pages as untrusted information, not agent instructions. |
| Outage without restore proof | PASS: guide calls for recovery exercises; register marks backup/restoration evidence pending, so CI alone cannot establish operations readiness. |
| Shutdown with user data | PASS: notices, export, retention/deletion, vendor/subscription obligations, and separate authority for high-impact operations are covered. |
| Unanswered Manager Review question | PASS: affected work pauses; unrelated previously authorized work may proceed only within the existing grant's batch policy. Silence does not widen or renew authority. |
| Software or configuration change after evidence | PASS after a localized wording repair: affected readiness evidence is invalid until scope is reassessed and relevant checks repeat. |

## Scope and boundary checks

The working-tree changes are the two supplied assurance documents, a Plan artifact, `docs/TASKS.md`, and short routing additions in root CONTEXT, Plan, Verify, and Release. `AGENTS.md`, Build instructions, automation contract, scripts, application code, schema, dependencies, workflows, and ReviewTap were untouched. No fifth ICM stage, standing business checklist, new roadmap implementation task, live schedule, writer, payment feature, provider account, or deployment was introduced. The existing R0–R4, independent Verify, protected Git, and separate Release rules remain in force. `docs/TASKS.md` accurately lists SD-018 Done and SD-017 In progress.

The new guide owns a conditional research procedure; `docs/PRODUCT_READINESS.md` owns the SchoolDashboard-specific evidence register. Product specs, security/privacy requirements, decisions, task status, implementation facts, and automation grants retain their existing owners. The guide and register expressly disclaim blanket compliance, launch permission, and execution authority. Initial register rows distinguish scoped verified evidence from pending research and unknowns.

## Fresh checks

- `git diff --check`: PASS.
- `npm run lint`: PASS.
- `npm run typecheck`: PASS.
- `npm test`: PASS, including 13 Vitest tests and 67 SD-018 automation tests. Relevant negative cases include no grant, stale evidence, unapproved task, daily silence, blocked dependency, and Release rejection.
- `node scripts/icm-automation/cli.mjs inspect`: read-only; parsed SD-018 Done and SD-017 In progress, reported no active grant and `NO AUTHORIZED WORK`.
- Final file/status inspection: only SD-017 documents and task artifact changed; no trailing whitespace in new files. No browser, database, production, legal, or financial validation was attempted for this R0 documentation task.

## Limitations and next action

This checkout could not connect to GitHub over HTTPS during my independent `ls-remote` attempt; hosted state was therefore not proven by this Verify run. Before Done, a dedicated PR must receive required hosted `verify`, CodeQL, and Dependency Review results on its final head, merge through protected rules, and be confirmed on canonical main. Recheck this local PASS if the content changes materially. Do not use this artifact as legal sign-off or real-user/paid-launch readiness evidence.
