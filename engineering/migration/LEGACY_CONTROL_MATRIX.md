# M0 — Legacy ICM Control Inventory and Disposition Matrix

**Status:** M0 PASS FOR SHADOW M1 — source inventory verified at the commit below. Detailed cutover parity and host enforcement remain PENDING; this audit does not activate ICM Next.

**Verified baseline (2026-10-09):** local clean `main`, connected GitHub canonical `main` and this branch base at `8c4c8e558d437d2874dbb1365f3d69c05e295b64`; SD-020 PR #25 independently observed open/draft at `d72674e64570487af366d156a8e33ce05caccfca`, no submitted reviews, 21 changed files. SSH and HTTPS shell Git transports were unavailable; GitHub connector supplied current remote evidence. PR #25 is separate and untouched.

## Audit method and field definitions

1. Read *actual current* global and conditional sources, active task registry, installed/runtime scripts/tests and active PRs. Snapshot source SHA and applicable headings/line spans. Source paths below are leads; validate precise current location.
2. For each **normative clause**, record source reference and classify: **KEEP** (same rule), **SUPERSEDE** (new explicit rule with parity justification), **RETIRE** (deliberately obsolete, nonsecurity requirement and owner-approved), **HISTORICAL** (preserve provenance, not active instruction), **DEFER** (runtime proof or design reserved for M2+) or **CONFLICT** (must resolve before M1 PASS).
3. Record old and new rule owners, risk if lost, regression test, policy exception, and decision reference. *No missing mapping may be silently counted as PASS.*
4. Distinguish product/security/legal promises from ICM process conventions: do not delete rights or controls affecting live private data merely because a documentation workflow is long.
5. Record M0 results in a `Verified? / source@SHA` column before claiming the matrix complete. The entries below are **proposed dispositions only**.

## A. Agent behavior and engineering process

| ID | Legacy control / source lead | Proposed disposition | ICM Next owner | Must preserve / change | M0 proof |
| --- | --- | --- | --- | --- | --- |
| A01 | `AGENTS.md` purpose and router | SUPERSEDE AT CUTOVER | `README` + future slim root router | Retain route/loading semantics; remove task-first verbosity only after cutover | SOURCE VERIFIED; cutover parity PENDING — see heading ledger |
| A02 | `AGENTS.md` delivery-first / explanation on demand | KEEP | `CHARTER` | No routine founder coding/manual commands/teaching; still surface material decisions | SOURCE VERIFIED; cutover parity PENDING — see heading ledger |
| A03 | `AGENTS.md` progressive context loading | KEEP | `CHARTER` + delivery | Load smallest task/milestone context; evidence scoped | SOURCE VERIFIED; cutover parity PENDING — see heading ledger |
| A04 | `AGENTS.md` one-task foreground authorization | SUPERSEDE AT CUTOVER | `POLICY` | Outcome/milestone operational model; current foreground rules stay live until switch | SOURCE VERIFIED; cutover parity PENDING — see heading ledger |
| A05 | `AGENTS.md` fixed bounded batch and 9A phase-gating | SUPERSEDE AT CUTOVER | `DELIVERY` | Rolling horizon, no speculative distant architecture; old exact task grants remain while running | SOURCE VERIFIED; cutover parity PENDING — see heading ledger |
| A06 | `AGENTS.md` evidence reuse/no-op rules | KEEP | `QUALITY` + `DELIVERY` | Reuse fresh proof; no-op only with verified acceptance | SOURCE VERIFIED; cutover parity PENDING — see heading ledger |
| A07 | `AGENTS.md` source/diff discipline and non-destructive Git | KEEP | `POLICY` + delivery | No destructive branch/reset/force without actual authority | SOURCE VERIFIED; cutover parity PENDING — see heading ledger |
| A08 | `AGENTS.md` R0–R4 risk taxonomy | KEEP UNTIL MAPPED | `POLICY` | No lowering risk by relabeling; M0 must map detailed old requirements | SOURCE VERIFIED; cutover parity PENDING — see heading ledger |
| A09 | `AGENTS.md` human-decision boundary | SUPERSEDE CLARIFY | `CHARTER` + `POLICY` | Material choices, release, privacy and irreversibility still require approval | SOURCE VERIFIED; cutover parity PENDING — see heading ledger |
| A10 | `AGENTS.md` broad process/documentation repetitive narratives | RETIRE CANDIDATE | `README` / archival | Verify no unique security or product right embedded before retiring | SOURCE VERIFIED; cutover parity PENDING — see heading ledger |
| A11 | Root `CONTEXT.md` conditional source routing | KEEP/SIMPLIFY LATER | `README` + future router | Correct owners, avoid duplication | SOURCE VERIFIED; cutover parity PENDING — see heading ledger |
| A12 | Root `CONTEXT.md` Plan/Build/Verify/Release separation | SUPERSEDE STRUCTURE | `DELIVERY` + `QUALITY` | Keep functional stage responsibilities, replace oversized manuals later | SOURCE VERIFIED; cutover parity PENDING — see heading ledger |
| A13 | `icm/01_plan/CONTEXT.md` current-state validation / risk/threat / acceptance | KEEP | `DELIVERY` + `QUALITY` | Preserve frozen acceptance, architecture/research escalation and negative testing | SOURCE VERIFIED; cutover parity PENDING — see heading ledger |
| A14 | `icm/01_plan/CONTEXT.md` full-task continuation without needless approvals | KEEP | `DELIVERY` | Routine bounded decisions should not cause prompts | SOURCE VERIFIED; cutover parity PENDING — see heading ledger |
| A15 | `icm/02_build/CONTEXT.md` scoped implementation/secret safety | KEEP | `DELIVERY` + `POLICY` | In-scope design autonomy, no privilege expansion | SOURCE VERIFIED; cutover parity PENDING — see heading ledger |
| A16 | `icm/03_verify/CONTEXT.md` adversarial verification and small repairs | KEEP | `QUALITY` | Exact proof, real negatives and risk-proportionate repairs | SOURCE VERIFIED; cutover parity PENDING — see heading ledger |
| A17 | `icm/03_verify/CONTEXT.md` finalization and independent authority | SUPERSEDE CLARIFY | `QUALITY` + operations | Separate agent claims from external reviewer/hosted proof | SOURCE VERIFIED; cutover parity PENDING — see heading ledger |
| A18 | `icm/04_release/CONTEXT.md` explicit production Release | KEEP | `POLICY` + `OPERATIONS` | Never infer deployment from PR/merge, maintain environment scope | SOURCE VERIFIED; cutover parity PENDING — see heading ledger |
| A19 | `docs/TASKS.md` as current active task registry | HISTORICAL+ADAPTER LATER | `PRODUCT_OUTCOMES` + contracts | Preserve all stable IDs and pending PR states; no reauthorization via edit | SOURCE VERIFIED; cutover parity PENDING — see heading ledger |
| A20 | `docs/DECISIONS.md` durable D-XXX decisions | KEEP | Existing `docs/DECISIONS.md` for product; future governance mapping | Do not lose D-001 student focus, D-004 source authority, D-005 provenance, D-006 student plan acceptance or security decisions | SOURCE VERIFIED; cutover parity PENDING — see heading ledger |
| A21 | `docs/IMPLEMENTATION.md` verified reality | KEEP | Existing `docs/IMPLEMENTATION.md` | Do not turn proposed ICM system into claimed installed behavior | SOURCE VERIFIED; cutover parity PENDING — see heading ledger |

## B. Security, privacy, product and business commitments

| ID | Legacy control / source lead | Proposed disposition | ICM Next owner | Must preserve / change | M0 proof |
| --- | --- | --- | --- | --- | --- |
| S01 | `docs/SECURITY_REQUIREMENTS.md`, threat model, security testing | KEEP | Existing product/security sources + `QUALITY` | Risk-specific tests and current vuln controls; audit unique requirements | SOURCE VERIFIED; cutover parity PENDING — see heading ledger |
| S02 | `docs/DATA_PRIVACY.md` and accepted retention/deletion | KEEP | Existing privacy sources + conditional `QUALITY` | No silent weakening of student data rights | SOURCE VERIFIED; cutover parity PENDING — see heading ledger |
| S03 | D-061–D-065 style Auth, owner-scoped DAL, RLS decisions | KEEP | Existing decisions/application + `POLICY`/`QUALITY` | Two-user cross-ID and anonymous denial, owner spoof tests; product guards remain | SOURCE VERIFIED; cutover parity PENDING — see heading ledger |
| S04 | Secure secrets, dependency audit, CodeQL, Dependency Review | KEEP | Existing CI/security workflows | Do not disable or lower thresholds / hide advisories | SOURCE VERIFIED; cutover parity PENDING — see heading ledger |
| S05 | Branch protections, exact-head PR/CI integration | KEEP + HOST PROOF DEFERRED | `POLICY` + `OPERATIONS` | Must verify actual protected rules, reviewer identities and bypass actors later | SOURCE VERIFIED; cutover parity PENDING — see heading ledger |
| S06 | User experience and product invariants (`docs/PRODUCT_VISION.md`, V1 spec) | KEEP | Existing product sources + `QUALITY` | Real student workflow over mock fixture success; no speculative changing product model | SOURCE VERIFIED; cutover parity PENDING — see heading ledger |
| S07 | Authoritative course material / provenance / AI student consent | KEEP | Existing D-004–D-006 and product specs | Current-course sources outrank inference; generated plan user-controlled | SOURCE VERIFIED; cutover parity PENDING — see heading ledger |
| S08 | `icm/guides/PRODUCT_AND_BUSINESS_ASSURANCE.md` | SUPERSEDE CONCISELY | `QUALITY` conditional matrix | Preserve lifecycle-triggered research, legal uncertainty and real-user readiness | SOURCE VERIFIED; cutover parity PENDING — see heading ledger |
| S09 | `docs/PRODUCT_READINESS.md` evidence register | KEEP | Existing document | Research register not legal certification/launch approval | SOURCE VERIFIED; cutover parity PENDING — see heading ledger |
| S10 | Existing Release data migration/rollback rules | KEEP | `POLICY`, `OPERATIONS`, existing product migration requirements | Retention, recoverability, incident containment; release separate | SOURCE VERIFIED; cutover parity PENDING — see heading ledger |

## C. Automation, credentials and recovery

| ID | Legacy control / source lead | Proposed disposition | ICM Next owner | Must preserve / change | M0 proof |
| --- | --- | --- | --- | --- | --- |
| R01 | `icm/automation/CONTEXT.md` scheduled trigger is not authority | KEEP | `POLICY` + `OPERATIONS` | External authenticated grant, schedule alone never authorizes writes | SOURCE VERIFIED; cutover parity PENDING — see heading ledger |
| R02 | SD-018 exact task ID/digest and future child limitation | HISTORICAL COMPATIBLE / FUTURE ADAPTER | `POLICY` + `contracts` | Existing grants remain exact bound; future dynamic grant requires M2/M3 verification | SOURCE VERIFIED; cutover parity PENDING — see heading ledger |
| R03 | SD-018 `inspect|report` read-only CLI and synthetic tests | EVALUATE/PORT | `OPERATIONS` (later M2) | No silent service activation; source classification unchanged until new engine passes parity | SOURCE VERIFIED; cutover parity PENDING — see heading ledger |
| R04 | SD-020 draft fixture broker and fake-worker adapters | DEFER/REVIEW PR25 | `OPERATIONS` future M3 | Not installed; do not merge/rebase/absorb draft during M0/M1 | SOURCE VERIFIED; cutover parity PENDING — see heading ledger |
| R05 | Founder-owned grant location/identity, pause/revoke | KEEP | `POLICY` + `OPERATIONS` | Worker's inability to modify grant/broker must be OS-proven | SOURCE VERIFIED; cutover parity PENDING — see heading ledger |
| R06 | Exclusive lock / dirty worktree / crash reconciliation | KEEP | `DELIVERY` + `OPERATIONS` | Resume-first; do not steal stale lock based only on age/PID | SOURCE VERIFIED; cutover parity PENDING — see heading ledger |
| R07 | Journal/PR/CI exact-head and integration pending states | KEEP | `QUALITY` + `OPERATIONS` | Journal is evidence only; no self-reported PASS or stale CI | SOURCE VERIFIED; cutover parity PENDING — see heading ledger |
| R08 | Connector/write privilege isolation | KEEP, HOST-PROOF DEFERRED | `POLICY` + `OPERATIONS` | GitHub plugin write permissions aren't limited by local read-only alone | SOURCE VERIFIED; cutover parity PENDING — see heading ledger |
| R09 | Fixed budgets/retries/concurrent writers/unknown allowance | KEEP | `POLICY` + `OPERATIONS` | No unknown = unlimited and no duplicate work admission | SOURCE VERIFIED; cutover parity PENDING — see heading ledger |
| R10 | Founder steering / milestone delegation (SD-019 D-066) | SUPERSEDE DESIGN / RETAIN POLICY GOAL | `CHARTER` + `DELIVERY` | Brainstorm not grant; new milestone never self-approved; candidate vs eligible distinct | SOURCE VERIFIED; cutover parity PENDING — see heading ledger |
| R11 | Daily factual Manager Review | KEEP/STREAMLINE | `CHARTER` + `OPERATIONS` | Report progress, verified user value, material decisions, actual run metrics | SOURCE VERIFIED; cutover parity PENDING — see heading ledger |
| R12 | OS/Windows real privilege and GitHub branch rule evidence gaps | DEFER GATE TO M3 | `OPERATIONS` + cutover plan | Fixture PASS cannot be promoted to live host PASS | SOURCE VERIFIED; cutover parity PENDING — see heading ledger |

## D. Sources to inventory beyond seed matrix

Read full files and explicitly add rows for unmatched normative clauses in: `AGENTS.md`; root `CONTEXT.md`; `icm/01_plan/CONTEXT.md`; `icm/02_build/CONTEXT.md`; `icm/03_verify/CONTEXT.md`; `icm/04_release/CONTEXT.md`; `icm/automation/CONTEXT.md`; both current ICM guides; `docs/DECISIONS.md`; `docs/TASKS.md`; `docs/ARCHITECTURE.md`; `docs/IMPLEMENTATION.md`; product and security/privacy documents; `.github/workflows/*`; `scripts/icm-automation/*`; `tests/icm-automation/*`; SD-020 draft changes/tests separately. Note nonexistent paths as NOT PRESENT, not silently assumed.

**M0 completeness rule:** every legacy normative heading must either map to a row or be explicitly grouped as non-normative repetition; all security/privacy/Release/authorization controls require *individual* mappings. The audit must describe stale/contradictory rules, historical-only content, and all unknown host facts.

## E. Required M0 outputs

- Actual observed main SHA, PR #25 head/status and local baseline; no Git changes for the inventory stage except writing evidence on a dedicated branch after read-only collection.
- Complete source index and per-control provenance (file/heading/line or content hash), disposition/owner, risk if lost, evidence and unresolved questions.
- Retired/obsolete **candidate** list that genuinely reduces instruction complexity while preserving independent runtime gates.
- Required parity negative test set, rollback map and explicit unresolved decisions.
- `M0 PASS FOR SHADOW M1` only if no unidentified critical control or unresolved authority conflict prevents a coherent *draft*. This is **not cutover authorization**.

## F. Independent M0 findings and decision

- **Risk:** R0 for this documentation-only shadow integration. The subject is R3/R4 authority/security design, so the audit treats runtime claims as unproven and preserves all current enforcement.
- **Audit coverage:** 1105 source headings individually anchored below (724 primary/requirement entries and 381 nested entries) across 13 live files, including every numbered Release heading, every SEC requirement ID, every PRIV/CLASS heading, accepted D-ID, task section and ICM stage heading. The 43 founder seed controls A01–A21, S01–S10 and R01–R12 remain above as the cross-document control families. Product specs, architecture, implementation, threat model, security testing and readiness remain independent sources; no normative product/security rule is moved out of them.
- **Current controls that cannot retire:** external grant and exact task digest, independent Verify, hosted required CI/CodeQL/Dependency Review, protected Git review, server owner/RLS isolation, data retention/deletion and secret safety, recovery/lock, and separate Release authorization. Current requirement IDs and D-IDs remain stable.
- **Supersession candidates, not permissions:** repetitive stage prose, mandatory long teaching/handoff narratives for trivial work, task-first roadmap presentation, duplicate source descriptions, and speculative future task detail. No unique security/privacy/Release clause is approved for retirement. Actual retirement requires M4 parity and M5 founder-approved cutover.
- **Discrepancies:** seed S01 named nonexistent `docs/SECURITY.md`; corrected to `docs/SECURITY_REQUIREMENTS.md`. Seed baseline was historical until checked. SD-020 files exist only on draft PR #25, not on canonical main. The shadow draft has concise Release policy but lacks the old Release manual's detailed 83-section replacement; old manual remains authoritative. New proposed state enums and dynamic delegation are not current parser/grant capabilities.
- **Required negative proof before cutover:** forged/expired/revoked grants and generated child admission; competing writers and crash recovery; stale/wrong-SHA CI and reviewer spoofing; cross-user/anonymous direct-ID and RLS tests; malicious inputs/uploads/AI output; secret/log leakage; destructive migration/rollback; Release without separate authority; connector write escape. M2–M4 must make relevant checks executable and independently observed.
- **Unknown host facts:** exact branch protection/reviewer/bypass configuration, Windows ACL/token/egress/plugin isolation, live broker installation, authentic publisher identity, runtime budgets and actual schedule. Treat each as UNKNOWN, never PASS.
- **M0 verdict:** PASS FOR SHADOW M1 because no critical live control is removed and the proposed owners are identifiable. **Cutover parity: NOT VERIFIED; M5 blocked until detailed Release and all other deferred controls receive tested replacements.**

### Seed-control source anchors

The 43 control-family rows above are grounded at these exact starting anchors; associated neighboring and cross-document clauses are inventoried in the heading ledger. A source anchor verifies the live rule exists, not that a future runtime enforces it.

| Seed ID | Inspected source anchor | Source result |
| --- | --- | --- |
| A01 | `AGENTS.md:3` | Source verified @ `8c4c8e5`; target/runtime proof pending |
| A02 | `AGENTS.md:71` | Source verified @ `8c4c8e5`; target/runtime proof pending |
| A03 | `AGENTS.md:106` | Source verified @ `8c4c8e5`; target/runtime proof pending |
| A04 | `AGENTS.md:347` | Source verified @ `8c4c8e5`; target/runtime proof pending |
| A05 | `AGENTS.md:379` | Source verified @ `8c4c8e5`; target/runtime proof pending |
| A06 | `AGENTS.md:430` | Source verified @ `8c4c8e5`; target/runtime proof pending |
| A07 | `AGENTS.md:1321` | Source verified @ `8c4c8e5`; target/runtime proof pending |
| A08 | `AGENTS.md:478` | Source verified @ `8c4c8e5`; target/runtime proof pending |
| A09 | `AGENTS.md:1467` | Source verified @ `8c4c8e5`; target/runtime proof pending |
| A10 | `AGENTS.md:1640` | Source verified @ `8c4c8e5`; target/runtime proof pending |
| A11 | `CONTEXT.md:34` | Source verified @ `8c4c8e5`; target/runtime proof pending |
| A12 | `CONTEXT.md:149` | Source verified @ `8c4c8e5`; target/runtime proof pending |
| A13 | `icm/01_plan/CONTEXT.md:357` | Source verified @ `8c4c8e5`; target/runtime proof pending |
| A14 | `icm/01_plan/CONTEXT.md:1359` | Source verified @ `8c4c8e5`; target/runtime proof pending |
| A15 | `icm/02_build/CONTEXT.md:397` | Source verified @ `8c4c8e5`; target/runtime proof pending |
| A16 | `icm/03_verify/CONTEXT.md:72` | Source verified @ `8c4c8e5`; target/runtime proof pending |
| A17 | `icm/03_verify/CONTEXT.md:1274` | Source verified @ `8c4c8e5`; target/runtime proof pending |
| A18 | `icm/04_release/CONTEXT.md:91` | Source verified @ `8c4c8e5`; target/runtime proof pending |
| A19 | `docs/TASKS.md:27` | Source verified @ `8c4c8e5`; target/runtime proof pending |
| A20 | `docs/DECISIONS.md:44` | Source verified @ `8c4c8e5`; target/runtime proof pending |
| A21 | `docs/IMPLEMENTATION.md:3` | Source verified @ `8c4c8e5`; target/runtime proof pending |
| S01 | `docs/SECURITY_REQUIREMENTS.md:70` | Source verified @ `8c4c8e5`; target/runtime proof pending |
| S02 | `docs/DATA_PRIVACY.md:69` | Source verified @ `8c4c8e5`; target/runtime proof pending |
| S03 | `docs/DECISIONS.md:1341` | Source verified @ `8c4c8e5`; target/runtime proof pending |
| S04 | `.github/workflows/security.yml:1` | Source verified @ `8c4c8e5`; target/runtime proof pending |
| S05 | `docs/DECISIONS.md:1014` | Source verified @ `8c4c8e5`; target/runtime proof pending |
| S06 | `docs/PRODUCT_VISION.md:35` | Source verified @ `8c4c8e5`; target/runtime proof pending |
| S07 | `docs/DECISIONS.md:99` | Source verified @ `8c4c8e5`; target/runtime proof pending |
| S08 | `icm/guides/PRODUCT_AND_BUSINESS_ASSURANCE.md:35` | Source verified @ `8c4c8e5`; target/runtime proof pending |
| S09 | `docs/PRODUCT_READINESS.md:5` | Source verified @ `8c4c8e5`; target/runtime proof pending |
| S10 | `icm/04_release/CONTEXT.md:489` | Source verified @ `8c4c8e5`; target/runtime proof pending |
| R01 | `icm/automation/CONTEXT.md:5` | Source verified @ `8c4c8e5`; target/runtime proof pending |
| R02 | `scripts/icm-automation/core.mjs:64` | Source verified @ `8c4c8e5`; target/runtime proof pending |
| R03 | `scripts/icm-automation/cli.mjs:14` | Source verified @ `8c4c8e5`; target/runtime proof pending |
| R04 | [draft PR #25](https://github.com/maguellalmike209/schooldashboard/pull/25), head `d72674e`, 21 changed paths | Remote draft source verified; not on main; installed host proof pending |
| R05 | `icm/automation/CONTEXT.md:44` | Source verified @ `8c4c8e5`; target/runtime proof pending |
| R06 | `icm/automation/CONTEXT.md:54` | Source verified @ `8c4c8e5`; target/runtime proof pending |
| R07 | `icm/automation/CONTEXT.md:96` | Source verified @ `8c4c8e5`; target/runtime proof pending |
| R08 | `docs/DECISIONS.md:1405` | Source verified @ `8c4c8e5`; target/runtime proof pending |
| R09 | `icm/automation/CONTEXT.md:34` | Source verified @ `8c4c8e5`; target/runtime proof pending |
| R10 | `icm/guides/FOUNDER_STEERING_AND_OUTCOME_DELEGATION.md:27` | Source verified @ `8c4c8e5`; target/runtime proof pending |
| R11 | `icm/automation/CONTEXT.md:120` | Source verified @ `8c4c8e5`; target/runtime proof pending |
| R12 | `icm/automation/CONTEXT.md:105` | Source verified @ `8c4c8e5`; target/runtime proof pending |

## G. Source-heading coverage ledger

Each listed heading is an individually anchored legacy control at baseline `8c4c8e5`. The file-family disposition below applies to every heading in that family; the seed matrix and section H identify cross-family and exceptional controls. This is source coverage, not implemented parity. Risks are loss of authority, student security/privacy, Release recovery, or required evidence according to the source family.

### `AGENTS.md` — 59 mapped headings

**Disposition for each entry:** Live KEEP; future `CHARTER`/`POLICY`/`DELIVERY`/`QUALITY`/`OPERATIONS` supersession requires M4 parity and M5 cutover.


- `AGENTS.md:3` — 1. Purpose
- `AGENTS.md:40` — 2. Primary Operating Goal
- `AGENTS.md:71` — 3. Delivery-First Mode
- `AGENTS.md:106` — 4. Progressive Context Loading
- `AGENTS.md:129` — 5. Durable Source Responsibilities
- `AGENTS.md:269` — 6. Conflict Handling
- `AGENTS.md:300` — 7. ICM Lifecycle
- `AGENTS.md:347` — 8. One-Task Automation
- `AGENTS.md:379` — 9. Batch Automation
- `AGENTS.md:421` — 9A. Phase-Gated Roadmap Rule
- `AGENTS.md:430` — 9B. Evidence Reuse Rule
- `AGENTS.md:439` — 9C. No-Op Task Rule
- `AGENTS.md:448` — 9D. Scheduled Autonomy and Manager Delegation
- `AGENTS.md:478` — 10. Risk Classification
- `AGENTS.md:598` — 11. Security Is a Lifecycle Requirement
- `AGENTS.md:616` — 12. Security-Triggered Planning
- `AGENTS.md:666` — 13. Multi-User and Tenant Isolation
- `AGENTS.md:713` — 14. Input and Output Safety
- `AGENTS.md:748` — 15. Authentication and Authorization
- `AGENTS.md:773` — 16. Secrets and Credentials
- `AGENTS.md:810` — 17. Sensitive Data and Privacy
- `AGENTS.md:832` — 18. File Uploads and Private Files
- `AGENTS.md:860` — 19. External URLs and Redirects
- `AGENTS.md:877` — 20. APIs and Public Endpoints
- `AGENTS.md:899` — 21. Webhooks
- `AGENTS.md:917` — 22. Dependencies and Supply Chain
- `AGENTS.md:938` — 23. Database and Persistence Safety
- `AGENTS.md:957` — 24. Logging and Error Handling
- `AGENTS.md:982` — 25. AI and Model Integrations
- `AGENTS.md:1014` — 26. Secure Defaults
- `AGENTS.md:1031` — 27. Testing Strategy
- `AGENTS.md:1076` — 28. Adversarial Verification
- `AGENTS.md:1115` — 29. Verify Independence
- `AGENTS.md:1151` — 30. Small Repair Lane
- `AGENTS.md:1175` — 31. CI as an Enforcement Layer
- `AGENTS.md:1202` — 32. Git Workflow by Risk
- `AGENTS.md:1234` — 33. Git Inspection Authority
- `AGENTS.md:1260` — 34. Safe Repository Synchronization
- `AGENTS.md:1278` — 35. Git Transport Fallback
- `AGENTS.md:1321` — 36. Destructive Git Operations
- `AGENTS.md:1340` — 37. Task-Scoped Commits
- `AGENTS.md:1364` — 38. Commit and Push Authority
- `AGENTS.md:1393` — 39. Deployment Is Separate From Code Completion
- `AGENTS.md:1424` — 40. Preview Environments
- `AGENTS.md:1450` — 41. Production Changes
- `AGENTS.md:1467` — 42. Human Review Boundary
- `AGENTS.md:1490` — 43. Decisions Agents May Make
- `AGENTS.md:1507` — 44. Scope Control
- `AGENTS.md:1523` — 45. Security Scope Expansion
- `AGENTS.md:1544` — 46. Documentation Discipline
- `AGENTS.md:1570` — 47. Security Documentation Is Not Proof
- `AGENTS.md:1588` — 48. No Security Theater
- `AGENTS.md:1616` — 49. Failure Handling
- `AGENTS.md:1640` — 50. Operational Efficiency
- `AGENTS.md:1666` — 51. Recovery After Interrupted Execution
- `AGENTS.md:1685` — 52. Current Project State
- `AGENTS.md:1707` — 53. Project-Specific Security
- `AGENTS.md:1726` — 54. Completion Standard
- `AGENTS.md:1745` — 55. Final Principle

### `CONTEXT.md` — 39 mapped headings

**Disposition for each entry:** Live KEEP; future compact root router requires M5 cutover.


- `CONTEXT.md:3` — 1. Purpose
- `CONTEXT.md:34` — 2. Core Operating Flow
- `CONTEXT.md:64` — 3. Global Agent Rules
- `CONTEXT.md:88` — 4. Execution Authorization
- `CONTEXT.md:149` — 5. Active ICM Stage
- `CONTEXT.md:260` — 6. Risk Controls Context Depth
- `CONTEXT.md:375` — 7. Product Context
- `CONTEXT.md:454` — 8. Technical Context
- `CONTEXT.md:500` — 9. Roadmap and Decisions
- `CONTEXT.md:534` — 10. Security Context
- `CONTEXT.md:660` — 11. Security Foundation Transition
- `CONTEXT.md:688` — 12. Security Escalation
- `CONTEXT.md:715` — 13. Data Context
- `CONTEXT.md:738` — 14. Multi-User Context
- `CONTEXT.md:758` — 15. Upload / Private File Context
- `CONTEXT.md:780` — 16. Authentication Context
- `CONTEXT.md:802` — 17. API Context
- `CONTEXT.md:819` — 18. External Integration Context
- `CONTEXT.md:843` — 19. AI Context
- `CONTEXT.md:868` — 20. Billing Context
- `CONTEXT.md:895` — 21. Git Context
- `CONTEXT.md:916` — 22. Task Artifact Context
- `CONTEXT.md:932` — 23. Interrupted Task Recovery
- `CONTEXT.md:952` — 24. Release Context
- `CONTEXT.md:973` — 25. Environment Context
- `CONTEXT.md:1003` — 26. External Research
- `CONTEXT.md:1028` — 27. Source Material
- `CONTEXT.md:1049` — 28. Real User Data
- `CONTEXT.md:1073` — 29. Dependency Context
- `CONTEXT.md:1093` — 30. Context Packs
- `CONTEXT.md:1221` — 31. Do Not Duplicate Context
- `CONTEXT.md:1237` — 32. Context Freshness
- `CONTEXT.md:1262` — 33. Source-of-Truth Conflicts
- `CONTEXT.md:1276` — 34. Missing Durable Context
- `CONTEXT.md:1295` — 35. Efficiency Rule
- `CONTEXT.md:1325` — 36. Context Budget
- `CONTEXT.md:1343` — 37. Current Implementation Transition
- `CONTEXT.md:1367` — 38. Current ICM Transition
- `CONTEXT.md:1404` — 39. Reusable ICM Boundary

### `icm/01_plan/CONTEXT.md` — 56 mapped headings

**Disposition for each entry:** Live KEEP; future `DELIVERY`/`POLICY`/`QUALITY` parity required.


- `icm/01_plan/CONTEXT.md:3` — 1. Purpose
- `icm/01_plan/CONTEXT.md:31` — 2. Plan Is the Risk Gate
- `icm/01_plan/CONTEXT.md:129` — 3. Risk Can Escalate During Planning
- `icm/01_plan/CONTEXT.md:153` — 4. Full-Task Automation
- `icm/01_plan/CONTEXT.md:188` — 5. Batch Automation
- `icm/01_plan/CONTEXT.md:209` — 6. Required Entry Context
- `icm/01_plan/CONTEXT.md:229` — 7. Plan From Repository Reality
- `icm/01_plan/CONTEXT.md:254` — 8. Durable Context Selection
- `icm/01_plan/CONTEXT.md:330` — 9. Security-Foundation Transition Rule
- `icm/01_plan/CONTEXT.md:357` — 10. Planning Workflow
- `icm/01_plan/CONTEXT.md:479` — 11. Data-Flow Planning
- `icm/01_plan/CONTEXT.md:507` — 12. Trust Boundaries
- `icm/01_plan/CONTEXT.md:529` — 13. Actors and Authorization
- `icm/01_plan/CONTEXT.md:554` — 14. Data Classification
- `icm/01_plan/CONTEXT.md:580` — 15. Abuse Cases
- `icm/01_plan/CONTEXT.md:606` — 16. Security Requirements Mapping
- `icm/01_plan/CONTEXT.md:633` — 17. Privacy Planning
- `icm/01_plan/CONTEXT.md:653` — 18. Dependency Planning
- `icm/01_plan/CONTEXT.md:676` — 19. External-Service Planning
- `icm/01_plan/CONTEXT.md:694` — 20. AI Planning
- `icm/01_plan/CONTEXT.md:716` — 21. File-Upload Planning
- `icm/01_plan/CONTEXT.md:739` — 22. API Planning
- `icm/01_plan/CONTEXT.md:757` — 23. Webhook Planning
- `icm/01_plan/CONTEXT.md:772` — 24. Persistence Planning
- `icm/01_plan/CONTEXT.md:793` — 25. Multi-Tenant Planning
- `icm/01_plan/CONTEXT.md:808` — 26. Logging Planning
- `icm/01_plan/CONTEXT.md:821` — 27. Failure and Recovery Planning
- `icm/01_plan/CONTEXT.md:838` — 28. Deployment Impact
- `icm/01_plan/CONTEXT.md:858` — 29. Smallest Secure Coherent Solution
- `icm/01_plan/CONTEXT.md:886` — 30. Impact Map
- `icm/01_plan/CONTEXT.md:921` — 31. Acceptance Criteria
- `icm/01_plan/CONTEXT.md:940` — 32. Positive and Negative Acceptance Criteria
- `icm/01_plan/CONTEXT.md:958` — 33. Verification Is Designed During Plan
- `icm/01_plan/CONTEXT.md:988` — 34. Adversarial Verification Targets
- `icm/01_plan/CONTEXT.md:1010` — 35. Test Strategy
- `icm/01_plan/CONTEXT.md:1051` — 36. CI Requirements
- `icm/01_plan/CONTEXT.md:1064` — 37. Human Decisions
- `icm/01_plan/CONTEXT.md:1090` — 38. Recommendation When Human Decision Is Required
- `icm/01_plan/CONTEXT.md:1116` — 39. Decisions Agents May Resolve
- `icm/01_plan/CONTEXT.md:1134` — 40. Durable Decision Candidates
- `icm/01_plan/CONTEXT.md:1154` — 41. Documentation Planning
- `icm/01_plan/CONTEXT.md:1170` — 42. Plan Output Artifact
- `icm/01_plan/CONTEXT.md:1191` — 43. Plan Artifact Structure
- `icm/01_plan/CONTEXT.md:1235` — 44. Human Review Summary
- `icm/01_plan/CONTEXT.md:1285` — 45. Security Summary for R3+
- `icm/01_plan/CONTEXT.md:1313` — 46. Build Readiness
- `icm/01_plan/CONTEXT.md:1359` — 47. Automatic Plan → Build Transition
- `icm/01_plan/CONTEXT.md:1381` — 48. Planning-Only Requests
- `icm/01_plan/CONTEXT.md:1398` — 49. R4 Approval Boundary
- `icm/01_plan/CONTEXT.md:1416` — 50. Final Plan Handoff
- `icm/01_plan/CONTEXT.md:1468` — 51. Efficiency Rules
- `icm/01_plan/CONTEXT.md:1494` — 52. Plan Self-Review
- `icm/01_plan/CONTEXT.md:1520` — 53. Scope Failure Rule
- `icm/01_plan/CONTEXT.md:1535` — 54. Plan Does Not Own Release Authorization
- `icm/01_plan/CONTEXT.md:1551` — 54A. Optional Strategic Phase Transition Review
- `icm/01_plan/CONTEXT.md:1570` — 55. Final Principle

### `icm/02_build/CONTEXT.md` — 84 mapped headings

**Disposition for each entry:** Live KEEP; future `DELIVERY`/`POLICY`/`QUALITY` parity required.


- `icm/02_build/CONTEXT.md:3` — 1. Purpose
- `icm/02_build/CONTEXT.md:34` — 2. Build Is an Execution Stage
- `icm/02_build/CONTEXT.md:65` — 3. Build Entry Conditions
- `icm/02_build/CONTEXT.md:114` — 4. Required Entry Context
- `icm/02_build/CONTEXT.md:134` — 5. Risk Tier Controls Build Depth
- `icm/02_build/CONTEXT.md:225` — 6. Risk Escalation During Build
- `icm/02_build/CONTEXT.md:249` — 7. Inspect Before Editing
- `icm/02_build/CONTEXT.md:270` — 8. Repository State Before Build
- `icm/02_build/CONTEXT.md:289` — 9. Accepted Plan Is the Build Contract
- `icm/02_build/CONTEXT.md:309` — 10. Local Plan Deviations
- `icm/02_build/CONTEXT.md:335` — 11. Material Plan Conflict
- `icm/02_build/CONTEXT.md:357` — 12. Smallest Secure Coherent Change
- `icm/02_build/CONTEXT.md:379` — 13. Build in Logical Increments
- `icm/02_build/CONTEXT.md:397` — 14. Secure Coding Default
- `icm/02_build/CONTEXT.md:417` — 15. Trust Boundary Enforcement
- `icm/02_build/CONTEXT.md:442` — 16. Input Validation
- `icm/02_build/CONTEXT.md:466` — 17. Output Safety
- `icm/02_build/CONTEXT.md:480` — 18. Authentication
- `icm/02_build/CONTEXT.md:505` — 19. Authorization
- `icm/02_build/CONTEXT.md:529` — 20. Multi-User / Tenant Isolation
- `icm/02_build/CONTEXT.md:558` — 21. Persistence
- `icm/02_build/CONTEXT.md:576` — 22. Database Query Safety
- `icm/02_build/CONTEXT.md:590` — 23. Database Migrations
- `icm/02_build/CONTEXT.md:608` — 24. User Input
- `icm/02_build/CONTEXT.md:628` — 25. APIs
- `icm/02_build/CONTEXT.md:648` — 26. Public Endpoints
- `icm/02_build/CONTEXT.md:674` — 27. Rate Limiting
- `icm/02_build/CONTEXT.md:695` — 28. Secrets
- `icm/02_build/CONTEXT.md:717` — 29. Environment Variables
- `icm/02_build/CONTEXT.md:737` — 30. Privacy
- `icm/02_build/CONTEXT.md:755` — 31. Logging
- `icm/02_build/CONTEXT.md:777` — 32. Error Handling
- `icm/02_build/CONTEXT.md:793` — 33. File Uploads
- `icm/02_build/CONTEXT.md:815` — 34. File Downloads
- `icm/02_build/CONTEXT.md:829` — 35. External URLs
- `icm/02_build/CONTEXT.md:845` — 36. Webhooks
- `icm/02_build/CONTEXT.md:860` — 37. External Integrations
- `icm/02_build/CONTEXT.md:878` — 38. AI Integration
- `icm/02_build/CONTEXT.md:901` — 39. Prompt Injection
- `icm/02_build/CONTEXT.md:914` — 40. AI Cost Controls
- `icm/02_build/CONTEXT.md:933` — 41. Dependencies
- `icm/02_build/CONTEXT.md:952` — 42. Supply Chain Safety
- `icm/02_build/CONTEXT.md:966` — 43. Tests During Build
- `icm/02_build/CONTEXT.md:976` — 44. R1 Testing
- `icm/02_build/CONTEXT.md:989` — 45. R2 Testing
- `icm/02_build/CONTEXT.md:1003` — 46. R3 Testing
- `icm/02_build/CONTEXT.md:1022` — 47. Security Tests Must Test Real Controls
- `icm/02_build/CONTEXT.md:1036` — 48. Test Integrity
- `icm/02_build/CONTEXT.md:1051` — 49. Evidence-Based Debugging
- `icm/02_build/CONTEXT.md:1067` — 50. UI and Accessibility
- `icm/02_build/CONTEXT.md:1087` — 51. Client vs Server Boundaries
- `icm/02_build/CONTEXT.md:1103` — 52. Security Headers and Browser Controls
- `icm/02_build/CONTEXT.md:1122` — 53. Performance and Efficiency
- `icm/02_build/CONTEXT.md:1139` — 54. Resource Bounds
- `icm/02_build/CONTEXT.md:1158` — 55. Concurrency and Idempotency
- `icm/02_build/CONTEXT.md:1176` — 56. Business Logic Integrity
- `icm/02_build/CONTEXT.md:1192` — 57. Scope Discipline
- `icm/02_build/CONTEXT.md:1204` — 58. Future Infrastructure
- `icm/02_build/CONTEXT.md:1221` — 59. Documentation During Build
- `icm/02_build/CONTEXT.md:1236` — 60. Security Documentation
- `icm/02_build/CONTEXT.md:1256` — 61. Threat Model Discoveries
- `icm/02_build/CONTEXT.md:1273` — 62. Security Incidents During Build
- `icm/02_build/CONTEXT.md:1290` — 63. Build Checks
- `icm/02_build/CONTEXT.md:1315` — 64. CI
- `icm/02_build/CONTEXT.md:1333` — 65. Diff Inspection
- `icm/02_build/CONTEXT.md:1352` — 66. Sensitive Diff Review
- `icm/02_build/CONTEXT.md:1370` — 67. Git Discipline
- `icm/02_build/CONTEXT.md:1394` — 68. Task Branch Workflow
- `icm/02_build/CONTEXT.md:1409` — 69. Verified Predecessor Synchronization
- `icm/02_build/CONTEXT.md:1427` — 70. Git Transport Fallback
- `icm/02_build/CONTEXT.md:1451` — 71. Destructive Git
- `icm/02_build/CONTEXT.md:1466` — 72. Build Artifact
- `icm/02_build/CONTEXT.md:1488` — 73. Build Handoff
- `icm/02_build/CONTEXT.md:1544` — 74. Ready for Verify Criteria
- `icm/02_build/CONTEXT.md:1564` — 75. Automatic Build → Verify Transition
- `icm/02_build/CONTEXT.md:1584` — 76. Known Limitations
- `icm/02_build/CONTEXT.md:1599` — 77. Return to Plan
- `icm/02_build/CONTEXT.md:1622` — 78. Blocked
- `icm/02_build/CONTEXT.md:1645` — 79. Build Self-Review
- `icm/02_build/CONTEXT.md:1675` — 80. Efficiency
- `icm/02_build/CONTEXT.md:1701` — 81. Delivery-First Behavior
- `icm/02_build/CONTEXT.md:1718` — 82. Interrupted Build Recovery
- `icm/02_build/CONTEXT.md:1739` — 83. Production Boundary
- `icm/02_build/CONTEXT.md:1759` — 84. Final Principle

### `icm/03_verify/CONTEXT.md` — 54 mapped headings

**Disposition for each entry:** Live KEEP; future `QUALITY` and external independent proof parity required.


- `icm/03_verify/CONTEXT.md:3` — 1. Purpose
- `icm/03_verify/CONTEXT.md:42` — 2. Development Autonomy
- `icm/03_verify/CONTEXT.md:72` — 3. Verification Independence
- `icm/03_verify/CONTEXT.md:120` — 4. When to Use Verify
- `icm/03_verify/CONTEXT.md:153` — 5. Required Context
- `icm/03_verify/CONTEXT.md:171` — 6. Common Verify Context
- `icm/03_verify/CONTEXT.md:258` — 7. Context Minimization
- `icm/03_verify/CONTEXT.md:297` — 8. Primary Verification Target
- `icm/03_verify/CONTEXT.md:331` — 9. Verify Acceptance Criteria Individually
- `icm/03_verify/CONTEXT.md:355` — 10. Verification Methods
- `icm/03_verify/CONTEXT.md:397` — 11. Source Inspection vs Runtime Evidence
- `icm/03_verify/CONTEXT.md:430` — 12. Happy Path Verification
- `icm/03_verify/CONTEXT.md:447` — 13. Edge and Failure Cases
- `icm/03_verify/CONTEXT.md:470` — 14. V1 Invariant Verification
- `icm/03_verify/CONTEXT.md:504` — 15. Shared-Data Verification
- `icm/03_verify/CONTEXT.md:531` — 16. Progress Verification
- `icm/03_verify/CONTEXT.md:560` — 17. Date Verification
- `icm/03_verify/CONTEXT.md:576` — 18. UI Verification
- `icm/03_verify/CONTEXT.md:604` — 19. Responsive Verification
- `icm/03_verify/CONTEXT.md:622` — 20. Accessibility Verification
- `icm/03_verify/CONTEXT.md:638` — 21. Regression Verification
- `icm/03_verify/CONTEXT.md:661` — 22. Dependency Verification
- `icm/03_verify/CONTEXT.md:677` — 23. Security and Privacy Verification
- `icm/03_verify/CONTEXT.md:706` — 24. Git Diff Review Is Required
- `icm/03_verify/CONTEXT.md:740` — 25. Tests Are Evidence, Not Truth
- `icm/03_verify/CONTEXT.md:773` — 26. Small Repair Lane
- `icm/03_verify/CONTEXT.md:817` — 27. What Verify Must NOT Repair Autonomously
- `icm/03_verify/CONTEXT.md:842` — 28. Routing Failures
- `icm/03_verify/CONTEXT.md:884` — 29. Verification Status
- `icm/03_verify/CONTEXT.md:925` — 30. Evidence Standard
- `icm/03_verify/CONTEXT.md:981` — 31. Verification Artifacts
- `icm/03_verify/CONTEXT.md:1006` — 32. Verification Artifact Structure
- `icm/03_verify/CONTEXT.md:1042` — 33. Human Review Summary
- `icm/03_verify/CONTEXT.md:1151` — 34. Autonomous Documentation Promotion
- `icm/03_verify/CONTEXT.md:1246` — 35. Implementation Documentation Quality
- `icm/03_verify/CONTEXT.md:1274` — 36. Automatic Task Finalization
- `icm/03_verify/CONTEXT.md:1323` — 37. Git Authorization
- `icm/03_verify/CONTEXT.md:1350` — 38. Git Operations Allowed After PASS
- `icm/03_verify/CONTEXT.md:1388` — 39. Git Operations That Require Explicit Approval
- `icm/03_verify/CONTEXT.md:1430` — 40. Commit Preconditions
- `icm/03_verify/CONTEXT.md:1462` — 41. Commit Scope
- `icm/03_verify/CONTEXT.md:1484` — 42. Commit Message
- `icm/03_verify/CONTEXT.md:1523` — 43. Push Preconditions
- `icm/03_verify/CONTEXT.md:1585` — 43.1 Push Success
- `icm/03_verify/CONTEXT.md:1597` — 43.2 Push Failure
- `icm/03_verify/CONTEXT.md:1644` — 44. PASS WITH LIMITATIONS and Git
- `icm/03_verify/CONTEXT.md:1675` — 45. Small Verify Repair and Git History
- `icm/03_verify/CONTEXT.md:1697` — 46. Verification Failures Are Useful
- `icm/03_verify/CONTEXT.md:1717` — 47. Retrospective Candidates
- `icm/03_verify/CONTEXT.md:1758` — 48. Verify Quality Check
- `icm/03_verify/CONTEXT.md:1796` — 49. Final Verify Handoff
- `icm/03_verify/CONTEXT.md:1919` — 50. Fast Side-Project Philosophy
- `icm/03_verify/CONTEXT.md:1977` — 51. Current Milestone Reminder
- `icm/03_verify/CONTEXT.md:2016` — 52. Full-Task Automation Boundary

### `icm/04_release/CONTEXT.md` — 83 mapped headings

**Disposition for each entry:** Live KEEP; detailed Release parity DEFERRED. A separate Release contract and host tests are required before cutover.


- `icm/04_release/CONTEXT.md:3` — 1. Purpose
- `icm/04_release/CONTEXT.md:53` — 2. Release Is Optional
- `icm/04_release/CONTEXT.md:76` — 3. Release Answers a Different Question
- `icm/04_release/CONTEXT.md:91` — 4. Required Release Authorization
- `icm/04_release/CONTEXT.md:118` — 5. Release Risk Classification
- `icm/04_release/CONTEXT.md:185` — 6. Required Entry Context
- `icm/04_release/CONTEXT.md:207` — 7. Release Entry Conditions
- `icm/04_release/CONTEXT.md:232` — 8. Exact Version Identity
- `icm/04_release/CONTEXT.md:258` — 9. Verify / Release Version Match
- `icm/04_release/CONTEXT.md:275` — 10. Environment Identity
- `icm/04_release/CONTEXT.md:298` — 11. Environment Separation
- `icm/04_release/CONTEXT.md:319` — 12. Release Preflight
- `icm/04_release/CONTEXT.md:342` — 13. CI Gate
- `icm/04_release/CONTEXT.md:365` — 14. Build Artifact Integrity
- `icm/04_release/CONTEXT.md:380` — 15. Configuration Validation
- `icm/04_release/CONTEXT.md:400` — 16. Secrets
- `icm/04_release/CONTEXT.md:421` — 17. Least Privilege
- `icm/04_release/CONTEXT.md:434` — 18. Database Migration Identification
- `icm/04_release/CONTEXT.md:451` — 19. Non-Destructive Migrations
- `icm/04_release/CONTEXT.md:467` — 20. Destructive Migrations
- `icm/04_release/CONTEXT.md:489` — 21. Backup and Recovery
- `icm/04_release/CONTEXT.md:507` — 22. Rollback Planning
- `icm/04_release/CONTEXT.md:524` — 23. Rollback Is Not Always Safe
- `icm/04_release/CONTEXT.md:544` — 24. Forward Fix
- `icm/04_release/CONTEXT.md:562` — 25. Preview Deployment
- `icm/04_release/CONTEXT.md:580` — 26. Staging
- `icm/04_release/CONTEXT.md:591` — 27. Release Sequencing
- `icm/04_release/CONTEXT.md:611` — 28. Feature Flags
- `icm/04_release/CONTEXT.md:628` — 29. Gradual Rollout
- `icm/04_release/CONTEXT.md:643` — 30. Deployment Execution
- `icm/04_release/CONTEXT.md:660` — 31. Infrastructure as Source-Controlled Configuration
- `icm/04_release/CONTEXT.md:671` — 32. Production Database Access
- `icm/04_release/CONTEXT.md:690` — 33. Production Secret Changes
- `icm/04_release/CONTEXT.md:706` — 34. OAuth / Callback Configuration
- `icm/04_release/CONTEXT.md:721` — 35. Webhook Release
- `icm/04_release/CONTEXT.md:738` — 36. Storage Release
- `icm/04_release/CONTEXT.md:752` — 37. Domain / DNS Changes
- `icm/04_release/CONTEXT.md:768` — 38. Security Headers and Runtime Security
- `icm/04_release/CONTEXT.md:786` — 39. Smoke Testing
- `icm/04_release/CONTEXT.md:811` — 40. Security Smoke Testing
- `icm/04_release/CONTEXT.md:828` — 41. User Journey Smoke Tests
- `icm/04_release/CONTEXT.md:849` — 42. Monitoring
- `icm/04_release/CONTEXT.md:869` — 43. Logging After Release
- `icm/04_release/CONTEXT.md:884` — 44. Release Health Window
- `icm/04_release/CONTEXT.md:899` — 45. Automated Post-Deploy Checks
- `icm/04_release/CONTEXT.md:914` — 46. Failed Deployment
- `icm/04_release/CONTEXT.md:941` — 47. Successful Deployment With Broken Application
- `icm/04_release/CONTEXT.md:957` — 48. Release Regression
- `icm/04_release/CONTEXT.md:975` — 49. Security Incident During Release
- `icm/04_release/CONTEXT.md:1001` — 50. Data Integrity Incident
- `icm/04_release/CONTEXT.md:1019` — 51. Rollback Execution
- `icm/04_release/CONTEXT.md:1040` — 52. Release Statuses
- `icm/04_release/CONTEXT.md:1093` — 53. Release Artifact
- `icm/04_release/CONTEXT.md:1108` — 54. Release Artifact Structure
- `icm/04_release/CONTEXT.md:1152` — 55. Release Evidence
- `icm/04_release/CONTEXT.md:1169` — 56. Release Documentation
- `icm/04_release/CONTEXT.md:1187` — 57. Git Is Not Deployment
- `icm/04_release/CONTEXT.md:1208` — 58. Git-Based Deployment
- `icm/04_release/CONTEXT.md:1227` — 59. Automatic Production Deployment
- `icm/04_release/CONTEXT.md:1242` — 60. Deployment Freeze
- `icm/04_release/CONTEXT.md:1255` — 61. Release Concurrency
- `icm/04_release/CONTEXT.md:1267` — 62. Background Jobs
- `icm/04_release/CONTEXT.md:1285` — 63. Scheduled Jobs
- `icm/04_release/CONTEXT.md:1300` — 64. Feature Activation vs Deployment
- `icm/04_release/CONTEXT.md:1316` — 65. Backward Compatibility
- `icm/04_release/CONTEXT.md:1334` — 66. External API Compatibility
- `icm/04_release/CONTEXT.md:1351` — 67. Performance After Release
- `icm/04_release/CONTEXT.md:1368` — 68. Cost Observation
- `icm/04_release/CONTEXT.md:1386` — 69. Beta User Protection
- `icm/04_release/CONTEXT.md:1403` — 70. Release Rollout for Early Users
- `icm/04_release/CONTEXT.md:1419` — 71. Release Self-Review
- `icm/04_release/CONTEXT.md:1453` — 72. Post-Deploy Self-Review
- `icm/04_release/CONTEXT.md:1475` — 73. Stop Conditions
- `icm/04_release/CONTEXT.md:1497` — 74. Return to Verify
- `icm/04_release/CONTEXT.md:1510` — 75. Return to Build
- `icm/04_release/CONTEXT.md:1525` — 76. Return to Plan
- `icm/04_release/CONTEXT.md:1540` — 77. Operational Efficiency
- `icm/04_release/CONTEXT.md:1566` — 78. Deployment Automation Goal
- `icm/04_release/CONTEXT.md:1587` — 79. Security Automation Goal
- `icm/04_release/CONTEXT.md:1604` — 80. Interrupted Release Recovery
- `icm/04_release/CONTEXT.md:1632` — 81. Release Improvement Candidates
- `icm/04_release/CONTEXT.md:1652` — 82. Final Release Report
- `icm/04_release/CONTEXT.md:1703` — 83. Final Principle

### `icm/automation/CONTEXT.md` — 8 mapped headings

**Disposition for each entry:** Live KEEP; future `POLICY`/`OPERATIONS` broker and host enforcement DEFERRED.


- `icm/automation/CONTEXT.md:5` — Authority and durable sources
- `icm/automation/CONTEXT.md:11` — Foreground batches versus unattended schedules
- `icm/automation/CONTEXT.md:34` — Each invocation
- `icm/automation/CONTEXT.md:44` — Grant and task contract
- `icm/automation/CONTEXT.md:50` — Checkpoint and recovery
- `icm/automation/CONTEXT.md:54` — Single writer and crash behavior
- `icm/automation/CONTEXT.md:58` — Bounded delegation and manager steering
- `icm/automation/CONTEXT.md:120` — Daily Manager Review

### `icm/guides/FOUNDER_STEERING_AND_OUTCOME_DELEGATION.md` — 9 mapped headings

**Disposition for each entry:** Live KEEP; `CHARTER`/`DELIVERY`/`POLICY` supersession requires enforced authority.


- `icm/guides/FOUNDER_STEERING_AND_OUTCOME_DELEGATION.md:5` — 1. Working relationship
- `icm/guides/FOUNDER_STEERING_AND_OUTCOME_DELEGATION.md:11` — 2. Inputs are not all approvals
- `icm/guides/FOUNDER_STEERING_AND_OUTCOME_DELEGATION.md:27` — 3. Approved outcome contract (policy model)
- `icm/guides/FOUNDER_STEERING_AND_OUTCOME_DELEGATION.md:44` — 4. Levels of work and authority
- `icm/guides/FOUNDER_STEERING_AND_OUTCOME_DELEGATION.md:62` — 5. Engineering workflow toward an approved endpoint
- `icm/guides/FOUNDER_STEERING_AND_OUTCOME_DELEGATION.md:79` — 6. Corrections, regressions, and safety work
- `icm/guides/FOUNDER_STEERING_AND_OUTCOME_DELEGATION.md:87` — 7. Manager communication contract
- `icm/guides/FOUNDER_STEERING_AND_OUTCOME_DELEGATION.md:101` — 8. Independent audit scenarios
- `icm/guides/FOUNDER_STEERING_AND_OUTCOME_DELEGATION.md:120` — 9. Change discipline

### `icm/guides/PRODUCT_AND_BUSINESS_ASSURANCE.md` — 8 mapped headings

**Disposition for each entry:** Live KEEP; conditional procedure target `QUALITY`; project readiness remains separate.


- `icm/guides/PRODUCT_AND_BUSINESS_ASSURANCE.md:5` — Purpose and ownership
- `icm/guides/PRODUCT_AND_BUSINESS_ASSURANCE.md:22` — Evidence vocabulary
- `icm/guides/PRODUCT_AND_BUSINESS_ASSURANCE.md:35` — Risk-proportional lifecycle checkpoints
- `icm/guides/PRODUCT_AND_BUSINESS_ASSURANCE.md:47` — Assurance domains — conditional prompts
- `icm/guides/PRODUCT_AND_BUSINESS_ASSURANCE.md:80` — Strategic Phase Transition Review (reuses existing Plan)
- `icm/guides/PRODUCT_AND_BUSINESS_ASSURANCE.md:93` — Daily Manager Review and authorized autonomous batches
- `icm/guides/PRODUCT_AND_BUSINESS_ASSURANCE.md:99` — Human decision brief
- `icm/guides/PRODUCT_AND_BUSINESS_ASSURANCE.md:103` — Project-specific evidence register

### `docs/DECISIONS.md` — 66 mapped headings

**Disposition for each entry:** KEEP all accepted D-IDs in existing owner; future process supersession requires an explicit decision.


- `docs/DECISIONS.md:44` — D-001 — Product Focus
- `docs/DECISIONS.md:57` — D-002 — Milestone 1 Scope
- `docs/DECISIONS.md:79` — D-003 — Primary Milestone 1 Views
- `docs/DECISIONS.md:99` — D-004 — Current-Course Source Authority
- `docs/DECISIONS.md:114` — D-005 — Provenance and Uncertainty
- `docs/DECISIONS.md:133` — D-006 — Human Control Over Generated Plans
- `docs/DECISIONS.md:154` — D-007 — Product Model Before Production Schema
- `docs/DECISIONS.md:177` — D-008 — Initial Application Stack
- `docs/DECISIONS.md:197` — D-009 — Secure Autonomous ICM
- `docs/DECISIONS.md:216` — D-010 — Delivery-First Operation
- `docs/DECISIONS.md:239` — D-011 — Progressive Context Loading
- `docs/DECISIONS.md:259` — D-012 — Four-Stage Lifecycle
- `docs/DECISIONS.md:289` — D-013 — Risk-Tier Model
- `docs/DECISIONS.md:315` — D-014 — Plan Owns Risk and Execution Contract
- `docs/DECISIONS.md:337` — D-015 — Build Implements Rather Than Redesigns
- `docs/DECISIONS.md:359` — D-016 — Verify Is Independent and Adversarial
- `docs/DECISIONS.md:384` — D-017 — Verify Must Validate Tests
- `docs/DECISIONS.md:403` — D-018 — Small Repair Lane
- `docs/DECISIONS.md:427` — D-019 — One-Prompt Task Automation
- `docs/DECISIONS.md:454` — D-020 — Automatic Plan-to-Build Transition
- `docs/DECISIONS.md:472` — D-021 — Automatic Build-to-Verify Transition
- `docs/DECISIONS.md:490` — D-022 — Explicit Bounded Batch Automation
- `docs/DECISIONS.md:515` — D-023 — Security Is a Lifecycle Property
- `docs/DECISIONS.md:541` — D-024 — Durable Security Contract
- `docs/DECISIONS.md:559` — D-025 — Security Requirement IDs Remain Stable
- `docs/DECISIONS.md:577` — D-026 — Server-Side Authorization
- `docs/DECISIONS.md:590` — D-027 — Multi-User Isolation Is a Required Security Property
- `docs/DECISIONS.md:607` — D-028 — Established Security Providers Over Custom Protocols
- `docs/DECISIONS.md:623` — D-029 — Data Minimization
- `docs/DECISIONS.md:640` — D-030 — Private Academic Data by Default
- `docs/DECISIONS.md:662` — D-031 — Privacy Classification Model
- `docs/DECISIONS.md:682` — D-032 — Real Beta Users Are Real Users
- `docs/DECISIONS.md:704` — D-033 — Threat Modeling Is Risk-Driven
- `docs/DECISIONS.md:726` — D-034 — Agent / Automation Error Is a Threat
- `docs/DECISIONS.md:750` — D-035 — Security Testing Is Defensive and Authorized
- `docs/DECISIONS.md:763` — D-036 — Security Tests Are Selected by Risk
- `docs/DECISIONS.md:784` — D-037 — Security Defects Become Regression Tests
- `docs/DECISIONS.md:808` — D-038 — Build Does Not Normally Finalize Current Task
- `docs/DECISIONS.md:833` — D-039 — Verified Predecessor Synchronization
- `docs/DECISIONS.md:855` — D-040 — Verified Task Finalization
- `docs/DECISIONS.md:879` — D-041 — Full PASS Is Required
- `docs/DECISIONS.md:899` — D-042 — Destructive Git Boundary
- `docs/DECISIONS.md:921` — D-043 — Failed Push Does Not Authorize Destructive Recovery
- `docs/DECISIONS.md:939` — D-044 — Safe Git Transport Fallback
- `docs/DECISIONS.md:970` — D-045 — Prompt Rules Are Not the Final Enforcement Layer
- `docs/DECISIONS.md:994` — D-046 — Core CI Before Real Private Multi-User Beta
- `docs/DECISIONS.md:1014` — D-047 — Protected Production Workflow Direction
- `docs/DECISIONS.md:1043` — D-048 — Verify PASS Does Not Authorize Production
- `docs/DECISIONS.md:1058` — D-049 — Release Requires Authorization
- `docs/DECISIONS.md:1074` — D-050 — Verified Version Must Match Released Version
- `docs/DECISIONS.md:1087` — D-051 — Deployment Success Is Not Product Success
- `docs/DECISIONS.md:1102` — D-052 — Production Changes Must Be Recoverable
- `docs/DECISIONS.md:1124` — D-053 — Process Documents Remain Durable
- `docs/DECISIONS.md:1143` — D-054 — Current-State Ownership
- `docs/DECISIONS.md:1176` — D-055 — Security Documents Have Separate Responsibilities
- `docs/DECISIONS.md:1212` — D-056 — Stable Security References
- `docs/DECISIONS.md:1237` — D-057 — Project-Specific Profile, Reusable ICM Pattern
- `docs/DECISIONS.md:1270` — D-058 — Human Review Is Reserved for Material Choices
- `docs/DECISIONS.md:1296` — D-059 — Security Foundation Before Multi-User Private Beta
- `docs/DECISIONS.md:1327` — D-060 — One Supabase Provider for Initial Auth and PostgreSQL
- `docs/DECISIONS.md:1341` — D-061 — Verified Identity and Server-Only DAL
- `docs/DECISIONS.md:1354` — D-062 — Owner Isolation at Application and Database Layers
- `docs/DECISIONS.md:1366` — D-063 — Runtime Validation and SQL Migration Source of Truth
- `docs/DECISIONS.md:1378` — D-064 — Development Configuration and Secret Boundary
- `docs/DECISIONS.md:1391` — D-065 — SD-015 Must Falsify Cross-User Isolation
- `docs/DECISIONS.md:1405` — D-066 — Founder-Steered Outcome Autonomy and Explicit Execution Boundaries

### `docs/TASKS.md` — 26 mapped headings

**Disposition for each entry:** KEEP IDs/status and exact-task semantics; future adapter DEFERRED.


- `docs/TASKS.md:27` — 2. Task Status Model
- `docs/TASKS.md:54` — 3. Task Naming
- `docs/TASKS.md:104` — 4. Current Project State
- `docs/TASKS.md:174` — 5. Milestone 1 — Initial UI With Mock / Hardcoded Data
- `docs/TASKS.md:212` — 6. Secure Automation Foundation
- `docs/TASKS.md:262` — 7. SD-008 — Secure ICM v2 and Security Policy Foundation
- `docs/TASKS.md:341` — 8. SD-009 — Automated Testing Foundation
- `docs/TASKS.md:408` — 9. SD-010 — Continuous Integration Baseline
- `docs/TASKS.md:449` — 10. SD-011 — Security and Supply-Chain Automation
- `docs/TASKS.md:477` — 11. SD-012 — Protected Git / PR Workflow
- `docs/TASKS.md:514` — 12. SD-013 — Secure Automation Foundation Audit
- `docs/TASKS.md:560` — 13. Gate Before Persistent Multi-User Product Work
- `docs/TASKS.md:600` — 13A. SD-014 — Persistent Multi-User Architecture and Provider Selection
- `docs/TASKS.md:615` — 13B. SD-015 — Authenticated Academic Term and Course Vertical Slice
- `docs/TASKS.md:634` — 13C. SD-016 — Secure Autonomy Upgrade
- `docs/TASKS.md:660` — 13D. SEC-2026-10-NEXTJS — Next.js Security Maintenance
- `docs/TASKS.md:678` — 13E. SD-018 — Scheduled Autonomy Foundation & Manager Mode
- `docs/TASKS.md:694` — 13F. SD-017 — Product & Business Assurance ICM
- `docs/TASKS.md:709` — 13G. SD-019 — Founder Steering ICM Integration
- `docs/TASKS.md:724` — 14. Future Capability Roadmap — Direction Only
- `docs/TASKS.md:901` — 15. AI Cost / Usage Direction
- `docs/TASKS.md:921` — 16. Real User Boundary
- `docs/TASKS.md:943` — 17. Roadmap Authorization Rule
- `docs/TASKS.md:967` — 18. Roadmap Maintenance
- `docs/TASKS.md:989` — 19. Current Next Task
- `docs/TASKS.md:997` — 20. Final Principle

### `docs/SECURITY_REQUIREMENTS.md` — 134 mapped headings

**Disposition for each entry:** KEEP each SEC-ID in existing security owner; select negative tests through `QUALITY`. No cutover of product requirement owner.


- `docs/SECURITY_REQUIREMENTS.md:70` — SEC-CORE-001 — Deny by default
- `docs/SECURITY_REQUIREMENTS.md:76` — SEC-CORE-002 — Least privilege
- `docs/SECURITY_REQUIREMENTS.md:83` — SEC-CORE-003 — Server-side trust
- `docs/SECURITY_REQUIREMENTS.md:99` — SEC-CORE-004 — Defense in depth
- `docs/SECURITY_REQUIREMENTS.md:114` — SEC-CORE-005 — Fail safely
- `docs/SECURITY_REQUIREMENTS.md:125` — SEC-CORE-006 — Minimize attack surface
- `docs/SECURITY_REQUIREMENTS.md:137` — SEC-CORE-007 — No security through obscurity
- `docs/SECURITY_REQUIREMENTS.md:156` — SEC-AUTHN-001 — Established authentication
- `docs/SECURITY_REQUIREMENTS.md:166` — SEC-AUTHN-002 — Server-trusted identity
- `docs/SECURITY_REQUIREMENTS.md:182` — SEC-AUTHN-003 — Protected access requires authentication
- `docs/SECURITY_REQUIREMENTS.md:189` — SEC-AUTHN-004 — Authentication failure is safe
- `docs/SECURITY_REQUIREMENTS.md:196` — SEC-AUTHN-005 — No credential leakage
- `docs/SECURITY_REQUIREMENTS.md:210` — SEC-AUTHN-006 — Logout / session termination
- `docs/SECURITY_REQUIREMENTS.md:222` — SEC-AUTHZ-001 — Authentication is not authorization
- `docs/SECURITY_REQUIREMENTS.md:231` — SEC-AUTHZ-002 — User-owned resources
- `docs/SECURITY_REQUIREMENTS.md:249` — SEC-AUTHZ-003 — Server-side ownership enforcement
- `docs/SECURITY_REQUIREMENTS.md:258` — SEC-AUTHZ-004 — Cross-user denial
- `docs/SECURITY_REQUIREMENTS.md:273` — SEC-AUTHZ-005 — Collection isolation
- `docs/SECURITY_REQUIREMENTS.md:280` — SEC-AUTHZ-006 — Indirect-object references
- `docs/SECURITY_REQUIREMENTS.md:288` — SEC-AUTHZ-007 — Role enforcement
- `docs/SECURITY_REQUIREMENTS.md:296` — SEC-AUTHZ-008 — Sharing requires explicit design
- `docs/SECURITY_REQUIREMENTS.md:318` — SEC-SESSION-001 — Secure session handling
- `docs/SECURITY_REQUIREMENTS.md:324` — SEC-SESSION-002 — Session secrets remain protected
- `docs/SECURITY_REQUIREMENTS.md:330` — SEC-SESSION-003 — Secure cookies
- `docs/SECURITY_REQUIREMENTS.md:343` — SEC-SESSION-004 — Expiration
- `docs/SECURITY_REQUIREMENTS.md:350` — SEC-SESSION-005 — Session authorization remains current
- `docs/SECURITY_REQUIREMENTS.md:359` — SEC-CSRF-001 — State-changing requests
- `docs/SECURITY_REQUIREMENTS.md:367` — SEC-CSRF-002 — Do not disable protections casually
- `docs/SECURITY_REQUIREMENTS.md:376` — SEC-INPUT-001 — Treat input as untrusted
- `docs/SECURITY_REQUIREMENTS.md:394` — SEC-INPUT-002 — Server validation
- `docs/SECURITY_REQUIREMENTS.md:402` — SEC-INPUT-003 — Runtime validation
- `docs/SECURITY_REQUIREMENTS.md:410` — SEC-INPUT-004 — Bounded values
- `docs/SECURITY_REQUIREMENTS.md:422` — SEC-INPUT-005 — Reject unexpected dangerous values
- `docs/SECURITY_REQUIREMENTS.md:431` — SEC-INJECT-001 — Safe database operations
- `docs/SECURITY_REQUIREMENTS.md:440` — SEC-INJECT-002 — Safe rendering
- `docs/SECURITY_REQUIREMENTS.md:448` — SEC-INJECT-003 — Rich content sanitization
- `docs/SECURITY_REQUIREMENTS.md:455` — SEC-INJECT-004 — Command execution
- `docs/SECURITY_REQUIREMENTS.md:466` — SEC-API-001 — Every protected operation re-authorizes
- `docs/SECURITY_REQUIREMENTS.md:475` — SEC-API-002 — Minimal responses
- `docs/SECURITY_REQUIREMENTS.md:483` — SEC-API-003 — Safe errors
- `docs/SECURITY_REQUIREMENTS.md:495` — SEC-API-004 — Method/action restrictions
- `docs/SECURITY_REQUIREMENTS.md:501` — SEC-API-005 — Abuse controls
- `docs/SECURITY_REQUIREMENTS.md:508` — SEC-API-006 — Enumeration resistance
- `docs/SECURITY_REQUIREMENTS.md:517` — SEC-DB-001 — Least-privilege database access
- `docs/SECURITY_REQUIREMENTS.md:524` — SEC-DB-002 — User data isolation
- `docs/SECURITY_REQUIREMENTS.md:534` — SEC-DB-003 — Integrity constraints
- `docs/SECURITY_REQUIREMENTS.md:548` — SEC-DB-004 — Migrations are controlled
- `docs/SECURITY_REQUIREMENTS.md:557` — SEC-DB-005 — Client access
- `docs/SECURITY_REQUIREMENTS.md:570` — SEC-FILE-001 — Upload ownership
- `docs/SECURITY_REQUIREMENTS.md:576` — SEC-FILE-002 — Private by default
- `docs/SECURITY_REQUIREMENTS.md:585` — SEC-FILE-003 — File-size limits
- `docs/SECURITY_REQUIREMENTS.md:591` — SEC-FILE-004 — File-type validation
- `docs/SECURITY_REQUIREMENTS.md:599` — SEC-FILE-005 — Filename safety
- `docs/SECURITY_REQUIREMENTS.md:605` — SEC-FILE-006 — Download authorization
- `docs/SECURITY_REQUIREMENTS.md:613` — SEC-FILE-007 — Processing isolation
- `docs/SECURITY_REQUIREMENTS.md:621` — SEC-FILE-008 — Malware/content risk
- `docs/SECURITY_REQUIREMENTS.md:630` — SEC-FILE-009 — Deletion
- `docs/SECURITY_REQUIREMENTS.md:639` — SEC-STORAGE-001 — Private storage configuration
- `docs/SECURITY_REQUIREMENTS.md:646` — SEC-STORAGE-002 — Scoped access
- `docs/SECURITY_REQUIREMENTS.md:652` — SEC-STORAGE-003 — Storage credentials
- `docs/SECURITY_REQUIREMENTS.md:658` — SEC-STORAGE-004 — Environment separation
- `docs/SECURITY_REQUIREMENTS.md:667` — SEC-SECRET-001 — No secrets in Git
- `docs/SECURITY_REQUIREMENTS.md:680` — SEC-SECRET-002 — Environment secret storage
- `docs/SECURITY_REQUIREMENTS.md:686` — SEC-SECRET-003 — Client exposure
- `docs/SECURITY_REQUIREMENTS.md:692` — SEC-SECRET-004 — Minimum scope
- `docs/SECURITY_REQUIREMENTS.md:698` — SEC-SECRET-005 — Exposure response
- `docs/SECURITY_REQUIREMENTS.md:714` — SEC-LOG-001 — No sensitive credentials
- `docs/SECURITY_REQUIREMENTS.md:727` — SEC-LOG-002 — Minimize personal data
- `docs/SECURITY_REQUIREMENTS.md:734` — SEC-LOG-003 — Structured safe context
- `docs/SECURITY_REQUIREMENTS.md:745` — SEC-LOG-004 — Sensitive document contents
- `docs/SECURITY_REQUIREMENTS.md:754` — SEC-ERROR-001 — No sensitive error leakage
- `docs/SECURITY_REQUIREMENTS.md:767` — SEC-ERROR-002 — Authorization errors are safe
- `docs/SECURITY_REQUIREMENTS.md:774` — SEC-ERROR-003 — Internal diagnostics
- `docs/SECURITY_REQUIREMENTS.md:783` — SEC-ABUSE-001 — Expensive/public actions
- `docs/SECURITY_REQUIREMENTS.md:800` — SEC-ABUSE-002 — Identity-aware controls
- `docs/SECURITY_REQUIREMENTS.md:813` — SEC-ABUSE-003 — Security controls cannot rely only on rate limiting
- `docs/SECURITY_REQUIREMENTS.md:823` — SEC-URL-001 — Validate external destinations
- `docs/SECURITY_REQUIREMENTS.md:829` — SEC-URL-002 — Safe schemes
- `docs/SECURITY_REQUIREMENTS.md:837` — SEC-URL-003 — Open redirects
- `docs/SECURITY_REQUIREMENTS.md:844` — SEC-URL-004 — Server-side fetching
- `docs/SECURITY_REQUIREMENTS.md:855` — SEC-WEBHOOK-001 — Authenticate provider
- `docs/SECURITY_REQUIREMENTS.md:862` — SEC-WEBHOOK-002 — Verify before processing
- `docs/SECURITY_REQUIREMENTS.md:869` — SEC-WEBHOOK-003 — Replay/idempotency
- `docs/SECURITY_REQUIREMENTS.md:876` — SEC-WEBHOOK-004 — Secrets
- `docs/SECURITY_REQUIREMENTS.md:882` — SEC-WEBHOOK-005 — Safe errors/logging
- `docs/SECURITY_REQUIREMENTS.md:892` — SEC-AI-001 — Model output is untrusted
- `docs/SECURITY_REQUIREMENTS.md:905` — SEC-AI-002 — Prompt injection
- `docs/SECURITY_REQUIREMENTS.md:920` — SEC-AI-003 — Tool authorization
- `docs/SECURITY_REQUIREMENTS.md:929` — SEC-AI-004 — Private-data minimization
- `docs/SECURITY_REQUIREMENTS.md:936` — SEC-AI-005 — Source grounding
- `docs/SECURITY_REQUIREMENTS.md:944` — SEC-AI-006 — Human-control boundary
- `docs/SECURITY_REQUIREMENTS.md:953` — SEC-AI-007 — Usage controls
- `docs/SECURITY_REQUIREMENTS.md:968` — SEC-INTEGRATION-001 — Minimize shared data
- `docs/SECURITY_REQUIREMENTS.md:974` — SEC-INTEGRATION-002 — Least-privilege credentials/scopes
- `docs/SECURITY_REQUIREMENTS.md:980` — SEC-INTEGRATION-003 — Failure isolation
- `docs/SECURITY_REQUIREMENTS.md:987` — SEC-INTEGRATION-004 — Provider responses are untrusted
- `docs/SECURITY_REQUIREMENTS.md:996` — SEC-SUPPLY-001 — Necessary dependencies only
- `docs/SECURITY_REQUIREMENTS.md:1002` — SEC-SUPPLY-002 — Lock dependencies
- `docs/SECURITY_REQUIREMENTS.md:1008` — SEC-SUPPLY-003 — Security scanning
- `docs/SECURITY_REQUIREMENTS.md:1017` — SEC-SUPPLY-004 — Trusted sources
- `docs/SECURITY_REQUIREMENTS.md:1023` — SEC-SUPPLY-005 — Security controls are not disabled for convenience
- `docs/SECURITY_REQUIREMENTS.md:1033` — SEC-WEB-001 — HTTPS production
- `docs/SECURITY_REQUIREMENTS.md:1039` — SEC-WEB-002 — Security headers
- `docs/SECURITY_REQUIREMENTS.md:1055` — SEC-WEB-003 — Cookies
- `docs/SECURITY_REQUIREMENTS.md:1062` — SEC-WEB-004 — Cross-origin access
- `docs/SECURITY_REQUIREMENTS.md:1073` — SEC-CLIENT-001 — Minimize private client data
- `docs/SECURITY_REQUIREMENTS.md:1080` — SEC-CLIENT-002 — No server secrets
- `docs/SECURITY_REQUIREMENTS.md:1086` — SEC-CLIENT-003 — Client state is modifiable
- `docs/SECURITY_REQUIREMENTS.md:1097` — SEC-ADMIN-001 — Explicit admin authorization
- `docs/SECURITY_REQUIREMENTS.md:1103` — SEC-ADMIN-002 — Admin is not normal-user fallback
- `docs/SECURITY_REQUIREMENTS.md:1109` — SEC-ADMIN-003 — High-impact actions
- `docs/SECURITY_REQUIREMENTS.md:1120` — SEC-BILL-001 — Client cannot grant entitlement
- `docs/SECURITY_REQUIREMENTS.md:1127` — SEC-BILL-002 — Webhook authenticity
- `docs/SECURITY_REQUIREMENTS.md:1133` — SEC-BILL-003 — Idempotency
- `docs/SECURITY_REQUIREMENTS.md:1139` — SEC-BILL-004 — No card data handling without need
- `docs/SECURITY_REQUIREMENTS.md:1148` — SEC-TEST-001 — Security requirements require evidence
- `docs/SECURITY_REQUIREMENTS.md:1157` — SEC-TEST-002 — Negative tests
- `docs/SECURITY_REQUIREMENTS.md:1163` — SEC-TEST-003 — Cross-user tests
- `docs/SECURITY_REQUIREMENTS.md:1170` — SEC-TEST-004 — Test the trusted boundary
- `docs/SECURITY_REQUIREMENTS.md:1177` — SEC-TEST-005 — Security regression tests
- `docs/SECURITY_REQUIREMENTS.md:1183` — SEC-TEST-006 — Adversarial playbook
- `docs/SECURITY_REQUIREMENTS.md:1195` — SEC-CI-001 — CI becomes required before real users
- `docs/SECURITY_REQUIREMENTS.md:1210` — SEC-CI-002 — Security tooling
- `docs/SECURITY_REQUIREMENTS.md:1221` — SEC-CI-003 — Protected production branch
- `docs/SECURITY_REQUIREMENTS.md:1229` — SEC-CI-004 — Required checks
- `docs/SECURITY_REQUIREMENTS.md:1237` — SEC-RELEASE-001 — Verified version
- `docs/SECURITY_REQUIREMENTS.md:1243` — SEC-RELEASE-002 — Environment separation
- `docs/SECURITY_REQUIREMENTS.md:1253` — SEC-RELEASE-003 — Rollback/recovery
- `docs/SECURITY_REQUIREMENTS.md:1259` — SEC-RELEASE-004 — Security smoke tests
- `docs/SECURITY_REQUIREMENTS.md:1268` — SEC-INCIDENT-001 — Stop normal workflow
- `docs/SECURITY_REQUIREMENTS.md:1282` — SEC-INCIDENT-002 — Containment first
- `docs/SECURITY_REQUIREMENTS.md:1289` — SEC-INCIDENT-003 — Preserve useful evidence
- `docs/SECURITY_REQUIREMENTS.md:1295` — SEC-INCIDENT-004 — Credential rotation
- `docs/SECURITY_REQUIREMENTS.md:1301` — SEC-INCIDENT-005 — Regression prevention

### `docs/DATA_PRIVACY.md` — 98 mapped headings

**Disposition for each entry:** KEEP each PRIV-ID/class in existing privacy owner; select privacy tests through `QUALITY`. No cutover of privacy requirement owner.


- `docs/DATA_PRIVACY.md:69` — PRIV-CORE-001 — Data minimization
- `docs/DATA_PRIVACY.md:78` — PRIV-CORE-002 — Purpose limitation
- `docs/DATA_PRIVACY.md:93` — PRIV-CORE-003 — Private by default
- `docs/DATA_PRIVACY.md:110` — PRIV-CORE-004 — Least necessary exposure
- `docs/DATA_PRIVACY.md:125` — PRIV-CORE-005 — User control
- `docs/DATA_PRIVACY.md:141` — PRIV-CORE-006 — No hidden secondary use
- `docs/DATA_PRIVACY.md:157` — CLASS 0 — Public
- `docs/DATA_PRIVACY.md:175` — CLASS 1 — Internal / Operational
- `docs/DATA_PRIVACY.md:191` — CLASS 2 — Personal
- `docs/DATA_PRIVACY.md:209` — CLASS 3 — Private / Sensitive User Content
- `docs/DATA_PRIVACY.md:231` — CLASS 4 — Secrets / Credentials
- `docs/DATA_PRIVACY.md:253` — PRIV-CLASS-001 — Highest applicable class
- `docs/DATA_PRIVACY.md:260` — PRIV-CLASS-002 — Combined data may increase sensitivity
- `docs/DATA_PRIVACY.md:278` — PRIV-CLASS-003 — Derived data inherits sensitivity
- `docs/DATA_PRIVACY.md:298` — PRIV-ACCOUNT-001 — Minimal account information
- `docs/DATA_PRIVACY.md:307` — PRIV-ACCOUNT-002 — Email use
- `docs/DATA_PRIVACY.md:319` — PRIV-ACCOUNT-003 — No marketing assumption
- `docs/DATA_PRIVACY.md:329` — PRIV-ACADEMIC-001 — Academic data is private
- `docs/DATA_PRIVACY.md:347` — PRIV-ACADEMIC-002 — User ownership
- `docs/DATA_PRIVACY.md:354` — PRIV-ACADEMIC-003 — No cross-user exposure
- `docs/DATA_PRIVACY.md:361` — PRIV-ACADEMIC-004 — Avoid unnecessary academic profiling
- `docs/DATA_PRIVACY.md:380` — PRIV-MATERIAL-001 — Private by default
- `docs/DATA_PRIVACY.md:387` — PRIV-MATERIAL-002 — Minimize duplication
- `docs/DATA_PRIVACY.md:394` — PRIV-MATERIAL-003 — Processing copies
- `docs/DATA_PRIVACY.md:407` — PRIV-MATERIAL-004 — No repository storage
- `docs/DATA_PRIVACY.md:413` — PRIV-MATERIAL-005 — Test material
- `docs/DATA_PRIVACY.md:432` — PRIV-TEXT-001 — Treat free text as private
- `docs/DATA_PRIVACY.md:439` — PRIV-TEXT-002 — Do not infer sensitivity from field name
- `docs/DATA_PRIVACY.md:457` — PRIV-TEXT-003 — Logging
- `docs/DATA_PRIVACY.md:468` — PRIV-ANALYTICS-001 — Define purpose
- `docs/DATA_PRIVACY.md:476` — PRIV-ANALYTICS-002 — Minimize payload
- `docs/DATA_PRIVACY.md:489` — PRIV-ANALYTICS-003 — Avoid sensitive text
- `docs/DATA_PRIVACY.md:502` — PRIV-ANALYTICS-004 — Account linkage
- `docs/DATA_PRIVACY.md:513` — PRIV-LOG-001 — Data minimization
- `docs/DATA_PRIVACY.md:520` — PRIV-LOG-002 — No private content by default
- `docs/DATA_PRIVACY.md:533` — PRIV-LOG-003 — Safe identifiers
- `docs/DATA_PRIVACY.md:540` — PRIV-LOG-004 — Error logging
- `docs/DATA_PRIVACY.md:549` — PRIV-DEV-001 — Synthetic by default
- `docs/DATA_PRIVACY.md:556` — PRIV-DEV-002 — No production copying by default
- `docs/DATA_PRIVACY.md:569` — PRIV-DEV-003 — Sanitization
- `docs/DATA_PRIVACY.md:577` — PRIV-DEV-004 — Screenshots
- `docs/DATA_PRIVACY.md:586` — PRIV-ENV-001 — Production data isolation
- `docs/DATA_PRIVACY.md:593` — PRIV-ENV-002 — Preview environments
- `docs/DATA_PRIVACY.md:605` — PRIV-ENV-003 — Secret separation
- `docs/DATA_PRIVACY.md:616` — PRIV-EXT-001 — Required data only
- `docs/DATA_PRIVACY.md:622` — PRIV-EXT-002 — Provider awareness
- `docs/DATA_PRIVACY.md:630` — PRIV-EXT-003 — Purpose compatibility
- `docs/DATA_PRIVACY.md:636` — PRIV-EXT-004 — No uncontrolled forwarding
- `docs/DATA_PRIVACY.md:647` — PRIV-AI-001 — Minimize model input
- `docs/DATA_PRIVACY.md:655` — PRIV-AI-002 — Private prompt handling
- `docs/DATA_PRIVACY.md:662` — PRIV-AI-003 — Uploaded content
- `docs/DATA_PRIVACY.md:669` — PRIV-AI-004 — Provider choice
- `docs/DATA_PRIVACY.md:676` — PRIV-AI-005 — No silent training assumptions
- `docs/DATA_PRIVACY.md:683` — PRIV-AI-006 — Cost telemetry
- `docs/DATA_PRIVACY.md:694` — PRIV-INTEGRATION-001 — Minimum scopes
- `docs/DATA_PRIVACY.md:701` — PRIV-INTEGRATION-002 — Selective ingestion
- `docs/DATA_PRIVACY.md:708` — PRIV-INTEGRATION-003 — User awareness
- `docs/DATA_PRIVACY.md:714` — PRIV-INTEGRATION-004 — Revocation
- `docs/DATA_PRIVACY.md:723` — PRIV-STORAGE-001 — Store only required data
- `docs/DATA_PRIVACY.md:730` — PRIV-STORAGE-002 — Private storage
- `docs/DATA_PRIVACY.md:737` — PRIV-STORAGE-003 — Secret separation
- `docs/DATA_PRIVACY.md:744` — PRIV-STORAGE-004 — Backups
- `docs/DATA_PRIVACY.md:756` — PRIV-RETENTION-001 — No indefinite-by-default justification
- `docs/DATA_PRIVACY.md:762` — PRIV-RETENTION-002 — Retention follows purpose
- `docs/DATA_PRIVACY.md:773` — PRIV-RETENTION-003 — Temporary data
- `docs/DATA_PRIVACY.md:780` — PRIV-RETENTION-004 — Logs
- `docs/DATA_PRIVACY.md:794` — PRIV-DELETE-001 — User deletion expectations
- `docs/DATA_PRIVACY.md:801` — PRIV-DELETE-002 — Referential cleanup
- `docs/DATA_PRIVACY.md:818` — PRIV-DELETE-003 — Account deletion
- `docs/DATA_PRIVACY.md:832` — PRIV-DELETE-004 — Backup reality
- `docs/DATA_PRIVACY.md:842` — PRIV-DELETE-005 — External providers
- `docs/DATA_PRIVACY.md:855` — PRIV-EXPORT-001 — Owner authorization
- `docs/DATA_PRIVACY.md:862` — PRIV-EXPORT-002 — Export scope
- `docs/DATA_PRIVACY.md:868` — PRIV-EXPORT-003 — Export privacy
- `docs/DATA_PRIVACY.md:880` — PRIV-SHARE-001 — Private until shared deliberately
- `docs/DATA_PRIVACY.md:887` — PRIV-SHARE-002 — Sharing scope
- `docs/DATA_PRIVACY.md:898` — PRIV-SHARE-003 — No accidental broad sharing
- `docs/DATA_PRIVACY.md:909` — PRIV-ADMIN-001 — Minimum necessary access
- `docs/DATA_PRIVACY.md:916` — PRIV-ADMIN-002 — No casual browsing
- `docs/DATA_PRIVACY.md:923` — PRIV-ADMIN-003 — Support access
- `docs/DATA_PRIVACY.md:934` — PRIV-PROV-001 — Preserve source relationships when useful
- `docs/DATA_PRIVACY.md:953` — PRIV-PROV-002 — Provenance does not make data public
- `docs/DATA_PRIVACY.md:962` — PRIV-GEN-001 — Derived content remains user data
- `docs/DATA_PRIVACY.md:969` — PRIV-GEN-002 — User correction
- `docs/DATA_PRIVACY.md:978` — PRIV-URL-001 — Avoid sensitive URL values
- `docs/DATA_PRIVACY.md:996` — PRIV-CACHE-001 — Private caching
- `docs/DATA_PRIVACY.md:1003` — PRIV-CACHE-002 — Shared caches
- `docs/DATA_PRIVACY.md:1019` — PRIV-NOTIFY-001 — Minimize lock-screen/message exposure
- `docs/DATA_PRIVACY.md:1026` — PRIV-NOTIFY-002 — Correct recipient
- `docs/DATA_PRIVACY.md:1036` — PRIV-SEARCH-001 — Search preserves authorization
- `docs/DATA_PRIVACY.md:1043` — PRIV-SEARCH-002 — Search indexes are private when source is private
- `docs/DATA_PRIVACY.md:1052` — PRIV-JOB-001 — Minimum job payload
- `docs/DATA_PRIVACY.md:1058` — PRIV-JOB-002 — Private queue/job data
- `docs/DATA_PRIVACY.md:1064` — PRIV-JOB-003 — Failure logging
- `docs/DATA_PRIVACY.md:1075` — PRIV-INCIDENT-001 — Stop ongoing exposure
- `docs/DATA_PRIVACY.md:1081` — PRIV-INCIDENT-002 — Identify affected data
- `docs/DATA_PRIVACY.md:1093` — PRIV-INCIDENT-003 — Do not conceal evidence
- `docs/DATA_PRIVACY.md:1099` — PRIV-INCIDENT-004 — Fix root cause

## H. Retained product, executable, CI and draft-PR evidence

These sources are not replaced by the engineering control plane. They retain their own product, security, implementation or hosted enforcement ownership. References are to canonical `main` `8c4c8e5`, except the separately labeled PR #25.

| Source anchor | Actual control or observed state | Disposition / target | Loss risk and verification |
| --- | --- | --- | --- |
| `docs/PRODUCT_VISION.md:35`, `docs/V1_SPEC.md:398`, `docs/UI_SPEC.md:143` | Student academic result, shared plan and action-first presentation are product constraints, not process grants. | KEEP in product specifications; `QUALITY.md` must verify actual user journey. | Attractive task completion could miss student value; Master Verify scenario 12. |
| `docs/DECISIONS.md:99`, `docs/DECISIONS.md:1341`, `docs/DECISIONS.md:1354`, `docs/DECISIONS.md:1405` | D-004 source authority, D-061 server identity/DAL, D-062 owner isolation, D-066 founder delegation boundary. | KEEP as accepted decisions; any process supersession needs explicit future decision. | Source poisoning, cross-user disclosure or self-authorized work; scenarios 1, 5, 9, 11. |
| `docs/ARCHITECTURE.md:512`, `docs/ARCHITECTURE.md:711`, `docs/ARCHITECTURE.md:1195`, `docs/ARCHITECTURE.md:1225` | Authorization, AI, Release and migration architecture boundaries. | KEEP independent of ICM Next. | Operational policy cannot silently redesign product data or Release. |
| `docs/IMPLEMENTATION.md:1055`, `scripts/icm-automation/cli.mjs:14`, `scripts/icm-automation/core.mjs:64`, `scripts/icm-automation/core.mjs:108` | Verified SD-018 state and read-only CLI; strict V1 grant validator and advisory selector. | KEEP current runtime; future M2 adapter only after tests. | Proposed enum/child could be mistaken for executable current grant; scenarios 5, 24. |
| `scripts/icm-automation/core.mjs:149`, `scripts/icm-automation/core.mjs:198`, `tests/icm-automation/automation.test.mjs`, `tests/icm-automation/review.test.mjs` | Digest-bound exact tasks, integration-pending state and regression tests. | KEEP; M2 must preserve observed inspect/report behavior and exact-ID admission. | Generated work or stale local PASS could become runnable/Done. |
| `supabase/migrations/20261007070000_academic_terms_courses.sql:39`, `tests/security-e2e/` | Owner-scoped SQL RLS policies and security tests exist on main. | KEEP as application/security controls; `QUALITY.md` requires real cross-user negatives. | Student data isolation could regress; scenario 11. |
| `docs/THREAT_MODEL.md:1364`, `docs/SECURITY_TESTING.md:59`, `docs/PRODUCT_READINESS.md:34` | Agent/automation error is a threat; defensive test scope and product-readiness gate retain their owners. | KEEP; `QUALITY.md` routes risk-selected review to these sources. | Security/product claims could be inferred from prose rather than evidence. |
| `.github/workflows/ci.yml:1`, `.github/workflows/security.yml:1` | Hosted `verify`, CodeQL and Dependency Review are configured on PRs; CI includes database/RLS, audit, lint, typecheck, unit, build and browser checks. | KEEP workflows unchanged. Final PR-head status and required-rule settings must be observed on host. | A local PASS or stale SHA could be mistaken for protected integration; scenario 14. |
| [SD-020 draft PR #25](https://github.com/maguellalmike209/schooldashboard/pull/25) at `d72674e` | Open, draft, unmerged, 21 changed paths and no submitted reviews at M0 inspection. Its fixture broker, journal, lock and fake worker are not on main. | DEFER reuse review to M2/M3; preserve separate branch and PR. | Absorbing draft code would imply false host trust or collide with PR #25; scenario 22. |

The source `docs/SECURITY.md` named in the author seed is **NOT PRESENT**. The actual requirement owner is `docs/SECURITY_REQUIREMENTS.md`. The old ICM can operate without this matrix: no root routing, parser, grant, runner, task status, CI, secret, product or Release file was changed in M0.

## I. Nested heading coverage and grouping

The entries below are the remaining Markdown subheadings in the same 13 sources. Each inherits its enclosing numbered section or requirement ID disposition and risk from section G. Template labels and source-owner descriptions are context within that parent, not newly retired permissions. No entry grants cutover parity.

### `AGENTS.md` — 20 nested headings
- `AGENTS.md:135` — `docs/PRODUCT_VISION.md`
- `AGENTS.md:148` — Current product specification documents
- `AGENTS.md:160` — `docs/UI_SPEC.md`
- `AGENTS.md:173` — `docs/ARCHITECTURE.md`
- `AGENTS.md:187` — `docs/SECURITY_REQUIREMENTS.md`
- `AGENTS.md:197` — `docs/DATA_PRIVACY.md`
- `AGENTS.md:211` — `docs/THREAT_MODEL.md`
- `AGENTS.md:224` — `docs/SECURITY_TESTING.md`
- `AGENTS.md:235` — `docs/DECISIONS.md`
- `AGENTS.md:243` — `docs/TASKS.md`
- `AGENTS.md:258` — `docs/IMPLEMENTATION.md`
- `AGENTS.md:488` — R0 — Documentation / non-executable
- `AGENTS.md:503` — R1 — Low-risk application behavior
- `AGENTS.md:520` — R2 — Data / API / dependency behavior
- `AGENTS.md:544` — R3 — Security-sensitive functionality
- `AGENTS.md:579` — R4 — High-impact / destructive / irreversible
- `AGENTS.md:1035` — R0
- `AGENTS.md:1039` — R1
- `AGENTS.md:1049` — R2
- `AGENTS.md:1058` — R3+

### `CONTEXT.md` — 26 nested headings
- `CONTEXT.md:157` — Plan
- `CONTEXT.md:187` — Build
- `CONTEXT.md:210` — Verify
- `CONTEXT.md:238` — Release
- `CONTEXT.md:268` — R0 — Documentation / non-executable
- `CONTEXT.md:281` — R1 — Low-risk application behavior
- `CONTEXT.md:301` — R2 — Data / API / dependency behavior
- `CONTEXT.md:321` — R3 — Security-sensitive functionality
- `CONTEXT.md:357` — R4 — High-impact / destructive / irreversible
- `CONTEXT.md:381` — `docs/PRODUCT_VISION.md`
- `CONTEXT.md:398` — Current Product Specification
- `CONTEXT.md:419` — `docs/UI_SPEC.md`
- `CONTEXT.md:435` — `docs/MOCK_DATA_SPEC.md`
- `CONTEXT.md:458` — `docs/ARCHITECTURE.md`
- `CONTEXT.md:480` — `docs/IMPLEMENTATION.md`
- `CONTEXT.md:504` — `docs/TASKS.md`
- `CONTEXT.md:520` — `docs/DECISIONS.md`
- `CONTEXT.md:541` — `docs/SECURITY_REQUIREMENTS.md`
- `CONTEXT.md:572` — `docs/DATA_PRIVACY.md`
- `CONTEXT.md:604` — `docs/THREAT_MODEL.md`
- `CONTEXT.md:633` — `docs/SECURITY_TESTING.md`
- `CONTEXT.md:1101` — Simple styling task
- `CONTEXT.md:1126` — Persistent Course creation
- `CONTEXT.md:1155` — Private syllabus upload
- `CONTEXT.md:1179` — Authentication
- `CONTEXT.md:1202` — Deployment

### `icm/01_plan/CONTEXT.md` — 63 nested headings
- `icm/01_plan/CONTEXT.md:39` — R0 — Documentation / non-executable
- `icm/01_plan/CONTEXT.md:53` — R1 — Low-risk application behavior
- `icm/01_plan/CONTEXT.md:68` — R2 — Data / API / dependency behavior
- `icm/01_plan/CONTEXT.md:85` — R3 — Security-sensitive functionality
- `icm/01_plan/CONTEXT.md:110` — R4 — High-impact / destructive / irreversible
- `icm/01_plan/CONTEXT.md:258` — Product specifications
- `icm/01_plan/CONTEXT.md:269` — `docs/UI_SPEC.md`
- `icm/01_plan/CONTEXT.md:275` — `docs/ARCHITECTURE.md`
- `icm/01_plan/CONTEXT.md:282` — `docs/IMPLEMENTATION.md`
- `icm/01_plan/CONTEXT.md:290` — `docs/DECISIONS.md`
- `icm/01_plan/CONTEXT.md:296` — `docs/SECURITY_REQUIREMENTS.md`
- `icm/01_plan/CONTEXT.md:305` — `docs/DATA_PRIVACY.md`
- `icm/01_plan/CONTEXT.md:312` — `docs/THREAT_MODEL.md`
- `icm/01_plan/CONTEXT.md:323` — `docs/SECURITY_TESTING.md`
- `icm/01_plan/CONTEXT.md:367` — Step 1 — Define Objective
- `icm/01_plan/CONTEXT.md:394` — Step 2 — Establish Current State
- `icm/01_plan/CONTEXT.md:435` — Step 3 — Define Required Behavior
- `icm/01_plan/CONTEXT.md:439` — Required
- `icm/01_plan/CONTEXT.md:443` — Optional
- `icm/01_plan/CONTEXT.md:448` — Out of scope
- `icm/01_plan/CONTEXT.md:456` — Step 4 — Identify Product Invariants
- `icm/01_plan/CONTEXT.md:464` — Step 5 — Assign Risk Tier
- `icm/01_plan/CONTEXT.md:890` — Expected to change
- `icm/01_plan/CONTEXT.md:894` — Must inspect
- `icm/01_plan/CONTEXT.md:898` — Should remain untouched
- `icm/01_plan/CONTEXT.md:1014` — R0
- `icm/01_plan/CONTEXT.md:1018` — R1
- `icm/01_plan/CONTEXT.md:1027` — R2
- `icm/01_plan/CONTEXT.md:1035` — R3+
- `icm/01_plan/CONTEXT.md:1195` — <Task ID> — <Task Name>
- `icm/01_plan/CONTEXT.md:1197` — Human Review Summary
- `icm/01_plan/CONTEXT.md:1199` — Objective
- `icm/01_plan/CONTEXT.md:1201` — Current State
- `icm/01_plan/CONTEXT.md:1203` — Risk Classification
- `icm/01_plan/CONTEXT.md:1205` — Requirements
- `icm/01_plan/CONTEXT.md:1207` — Non-Goals
- `icm/01_plan/CONTEXT.md:1209` — Relevant Product Invariants
- `icm/01_plan/CONTEXT.md:1211` — Security / Privacy Context
- `icm/01_plan/CONTEXT.md:1213` — Proposed Approach
- `icm/01_plan/CONTEXT.md:1215` — Impact Map
- `icm/01_plan/CONTEXT.md:1217` — Acceptance Criteria
- `icm/01_plan/CONTEXT.md:1219` — Verification Plan
- `icm/01_plan/CONTEXT.md:1221` — Risks / Open Questions
- `icm/01_plan/CONTEXT.md:1223` — Build Readiness
- `icm/01_plan/CONTEXT.md:1241` — Mike's Required Actions
- `icm/01_plan/CONTEXT.md:1249` — Decisions Requiring Mike
- `icm/01_plan/CONTEXT.md:1257` — Risk Tier
- `icm/01_plan/CONTEXT.md:1265` — Current Blockers
- `icm/01_plan/CONTEXT.md:1273` — Automation Status
- `icm/01_plan/CONTEXT.md:1289` — Protected Assets
- `icm/01_plan/CONTEXT.md:1293` — Trust Boundaries
- `icm/01_plan/CONTEXT.md:1297` — Primary Abuse Cases
- `icm/01_plan/CONTEXT.md:1301` — Required Controls
- `icm/01_plan/CONTEXT.md:1305` — Negative Verification
- `icm/01_plan/CONTEXT.md:1420` — Plan Status
- `icm/01_plan/CONTEXT.md:1424` — Risk Tier
- `icm/01_plan/CONTEXT.md:1428` — What Will Be Built
- `icm/01_plan/CONTEXT.md:1432` — Important Boundaries
- `icm/01_plan/CONTEXT.md:1436` — Security / Privacy Requirements
- `icm/01_plan/CONTEXT.md:1440` — Decisions Made Automatically
- `icm/01_plan/CONTEXT.md:1448` — Decisions Requiring Mike
- `icm/01_plan/CONTEXT.md:1454` — Verification Targets
- `icm/01_plan/CONTEXT.md:1458` — Next Stage

### `icm/02_build/CONTEXT.md` — 14 nested headings
- `icm/02_build/CONTEXT.md:140` — R0
- `icm/02_build/CONTEXT.md:152` — R1
- `icm/02_build/CONTEXT.md:166` — R2
- `icm/02_build/CONTEXT.md:182` — R3
- `icm/02_build/CONTEXT.md:206` — R4
- `icm/02_build/CONTEXT.md:1494` — Build Status
- `icm/02_build/CONTEXT.md:1503` — Risk Tier
- `icm/02_build/CONTEXT.md:1507` — What Changed
- `icm/02_build/CONTEXT.md:1511` — Security Controls Implemented
- `icm/02_build/CONTEXT.md:1519` — Tests / Checks
- `icm/02_build/CONTEXT.md:1523` — Important Implementation Decisions
- `icm/02_build/CONTEXT.md:1527` — Plan Deviations
- `icm/02_build/CONTEXT.md:1533` — Known Limitations
- `icm/02_build/CONTEXT.md:1537` — Verification Targets

### `icm/03_verify/CONTEXT.md` — 55 nested headings
- `icm/03_verify/CONTEXT.md:175` — `docs/V1_SPEC.md`
- `icm/03_verify/CONTEXT.md:189` — `docs/UI_SPEC.md`
- `icm/03_verify/CONTEXT.md:203` — `docs/MOCK_DATA_SPEC.md`
- `icm/03_verify/CONTEXT.md:219` — `docs/ARCHITECTURE.md`
- `icm/03_verify/CONTEXT.md:232` — `docs/IMPLEMENTATION.md`
- `icm/03_verify/CONTEXT.md:242` — `docs/DECISIONS.md`
- `icm/03_verify/CONTEXT.md:248` — `docs/TASKS.md`
- `icm/03_verify/CONTEXT.md:844` — Return to Build
- `icm/03_verify/CONTEXT.md:855` — Return to Plan
- `icm/03_verify/CONTEXT.md:867` — Blocked
- `icm/03_verify/CONTEXT.md:888` — PASS
- `icm/03_verify/CONTEXT.md:899` — PASS WITH LIMITATIONS
- `icm/03_verify/CONTEXT.md:913` — FAIL
- `icm/03_verify/CONTEXT.md:919` — BLOCKED
- `icm/03_verify/CONTEXT.md:1011` — <Task ID> — <Task Name> Verification
- `icm/03_verify/CONTEXT.md:1013` — Human Review Summary
- `icm/03_verify/CONTEXT.md:1015` — Verification Target
- `icm/03_verify/CONTEXT.md:1017` — Acceptance Criteria
- `icm/03_verify/CONTEXT.md:1019` — Verification Performed
- `icm/03_verify/CONTEXT.md:1021` — Results
- `icm/03_verify/CONTEXT.md:1023` — Repairs Performed During Verify
- `icm/03_verify/CONTEXT.md:1025` — Regression Checks
- `icm/03_verify/CONTEXT.md:1027` — Git Diff Review
- `icm/03_verify/CONTEXT.md:1029` — Limitations
- `icm/03_verify/CONTEXT.md:1031` — Documentation Promotion
- `icm/03_verify/CONTEXT.md:1033` — Final Status
- `icm/03_verify/CONTEXT.md:1049` — Verification Result
- `icm/03_verify/CONTEXT.md:1062` — What Was Proven
- `icm/03_verify/CONTEXT.md:1074` — What Was Not Proven
- `icm/03_verify/CONTEXT.md:1086` — Automatic Repairs
- `icm/03_verify/CONTEXT.md:1098` — Mike's Review Focus
- `icm/03_verify/CONTEXT.md:1119` — Learning Takeaway
- `icm/03_verify/CONTEXT.md:1133` — Next Action
- `icm/03_verify/CONTEXT.md:1161` — `docs/IMPLEMENTATION.md`
- `icm/03_verify/CONTEXT.md:1179` — `docs/TASKS.md`
- `icm/03_verify/CONTEXT.md:1203` — `docs/ARCHITECTURE.md`
- `icm/03_verify/CONTEXT.md:1212` — `docs/DECISIONS.md`
- `icm/03_verify/CONTEXT.md:1223` — `docs/V1_SPEC.md`
- `icm/03_verify/CONTEXT.md:1231` — `docs/UI_SPEC.md`
- `icm/03_verify/CONTEXT.md:1238` — `docs/MOCK_DATA_SPEC.md`
- `icm/03_verify/CONTEXT.md:1721` — Decision Candidates
- `icm/03_verify/CONTEXT.md:1728` — ICM Improvement Candidates
- `icm/03_verify/CONTEXT.md:1800` — Status
- `icm/03_verify/CONTEXT.md:1813` — What Was Verified
- `icm/03_verify/CONTEXT.md:1819` — Evidence
- `icm/03_verify/CONTEXT.md:1833` — Automatic Repairs
- `icm/03_verify/CONTEXT.md:1845` — Regression Status
- `icm/03_verify/CONTEXT.md:1854` — Remaining Limitations
- `icm/03_verify/CONTEXT.md:1866` — Documentation Updates
- `icm/03_verify/CONTEXT.md:1878` — Git Finalization
- `icm/03_verify/CONTEXT.md:1896` — What Mike Should Understand
- `icm/03_verify/CONTEXT.md:1904` — Next Project Step
- `icm/03_verify/CONTEXT.md:2043` — Plan
- `icm/03_verify/CONTEXT.md:2054` — Build
- `icm/03_verify/CONTEXT.md:2065` — Verify

### `icm/04_release/CONTEXT.md` — 41 nested headings
- `icm/04_release/CONTEXT.md:124` — Low deployment risk
- `icm/04_release/CONTEXT.md:137` — Moderate deployment risk
- `icm/04_release/CONTEXT.md:151` — High deployment risk
- `icm/04_release/CONTEXT.md:169` — R4 / high-impact release
- `icm/04_release/CONTEXT.md:1044` — RELEASED
- `icm/04_release/CONTEXT.md:1050` — RELEASED WITH OBSERVATION
- `icm/04_release/CONTEXT.md:1059` — RELEASE BLOCKED
- `icm/04_release/CONTEXT.md:1067` — RELEASE FAILED — ROLLED BACK
- `icm/04_release/CONTEXT.md:1074` — RELEASE FAILED — CONTAINED
- `icm/04_release/CONTEXT.md:1081` — RETURN TO BUILD
- `icm/04_release/CONTEXT.md:1087` — RETURN TO PLAN
- `icm/04_release/CONTEXT.md:1112` — <Task ID> — <Task Name> Release
- `icm/04_release/CONTEXT.md:1114` — Status
- `icm/04_release/CONTEXT.md:1116` — Effective Risk
- `icm/04_release/CONTEXT.md:1118` — Authorization
- `icm/04_release/CONTEXT.md:1120` — Version
- `icm/04_release/CONTEXT.md:1126` — Target Environment
- `icm/04_release/CONTEXT.md:1128` — Preflight
- `icm/04_release/CONTEXT.md:1130` — Migration / Configuration
- `icm/04_release/CONTEXT.md:1132` — Deployment
- `icm/04_release/CONTEXT.md:1134` — Smoke Tests
- `icm/04_release/CONTEXT.md:1136` — Security Smoke Tests
- `icm/04_release/CONTEXT.md:1138` — Monitoring / Observations
- `icm/04_release/CONTEXT.md:1140` — Rollback Readiness
- `icm/04_release/CONTEXT.md:1142` — Incidents / Repairs
- `icm/04_release/CONTEXT.md:1144` — Remaining Limitations
- `icm/04_release/CONTEXT.md:1146` — Final State
- `icm/04_release/CONTEXT.md:1656` — Release Status
- `icm/04_release/CONTEXT.md:1661` — Effective Risk
- `icm/04_release/CONTEXT.md:1663` — Version
- `icm/04_release/CONTEXT.md:1667` — Environment
- `icm/04_release/CONTEXT.md:1669` — Preflight Result
- `icm/04_release/CONTEXT.md:1671` — Deployment Result
- `icm/04_release/CONTEXT.md:1673` — Migration / Configuration Result
- `icm/04_release/CONTEXT.md:1675` — Smoke Test Result
- `icm/04_release/CONTEXT.md:1677` — Security Smoke Result
- `icm/04_release/CONTEXT.md:1681` — Monitoring Result
- `icm/04_release/CONTEXT.md:1683` — Rollback Readiness
- `icm/04_release/CONTEXT.md:1685` — Incidents
- `icm/04_release/CONTEXT.md:1691` — Limitations
- `icm/04_release/CONTEXT.md:1697` — Improvement Candidates

### `icm/automation/CONTEXT.md` — 3 nested headings
- `icm/automation/CONTEXT.md:96` — Integration-pending handoff
- `icm/automation/CONTEXT.md:105` — Trust and implementation boundaries
- `icm/automation/CONTEXT.md:126` — Read-only pilot prompt for a future native schedule

### `icm/guides/FOUNDER_STEERING_AND_OUTCOME_DELEGATION.md` — 3 nested headings
- `icm/guides/FOUNDER_STEERING_AND_OUTCOME_DELEGATION.md:46` — Level A — Implementation steps
- `icm/guides/FOUNDER_STEERING_AND_OUTCOME_DELEGATION.md:50` — Level B — Candidate child tasks within an approved outcome
- `icm/guides/FOUNDER_STEERING_AND_OUTCOME_DELEGATION.md:58` — Level C — New outcome or material expansion

### `icm/guides/PRODUCT_AND_BUSINESS_ASSURANCE.md` — 5 nested headings
- `icm/guides/PRODUCT_AND_BUSINESS_ASSURANCE.md:51` — Product and student experience
- `icm/guides/PRODUCT_AND_BUSINESS_ASSURANCE.md:58` — Commercial viability and finance
- `icm/guides/PRODUCT_AND_BUSINESS_ASSURANCE.md:65` — Legal, policy, trust and IP
- `icm/guides/PRODUCT_AND_BUSINESS_ASSURANCE.md:73` — Production operations and customer trust
- `icm/guides/PRODUCT_AND_BUSINESS_ASSURANCE.md:107` — Reliable initial sources (entry points, not completed determinations)

### `docs/DECISIONS.md` — 18 nested headings
- `docs/DECISIONS.md:3` — 1. Purpose
- `docs/DECISIONS.md:23` — 2. Decision IDs
- `docs/DECISIONS.md:42` — 3. Product Decisions
- `docs/DECISIONS.md:195` — 4. ICM Architecture Decisions
- `docs/DECISIONS.md:425` — 5. Automation Decisions
- `docs/DECISIONS.md:513` — 6. Security Architecture Decisions
- `docs/DECISIONS.md:621` — 7. Privacy Decisions
- `docs/DECISIONS.md:702` — 8. Threat-Model Decisions
- `docs/DECISIONS.md:748` — 9. Security-Testing Decisions
- `docs/DECISIONS.md:806` — 10. Git Decisions
- `docs/DECISIONS.md:968` — 11. CI and Repository Enforcement Decisions
- `docs/DECISIONS.md:1041` — 12. Release Decisions
- `docs/DECISIONS.md:1122` — 13. Process / Documentation Decisions
- `docs/DECISIONS.md:1268` — 14. Human Decision Boundary
- `docs/DECISIONS.md:1294` — 15. Current Security Transition
- `docs/DECISIONS.md:1325` — 16. Milestone 2 Identity and Persistence Decisions
- `docs/DECISIONS.md:1427` — 17. Decision Maintenance
- `docs/DECISIONS.md:1452` — 18. Final Principle

### `docs/TASKS.md` — 49 nested headings
- `docs/TASKS.md:3` — 1. Purpose
- `docs/TASKS.md:66` — Future accepted task metadata
- `docs/TASKS.md:176` — Status
- `docs/TASKS.md:214` — Purpose
- `docs/TASKS.md:249` — Foundation Tasks
- `docs/TASKS.md:264` — Status
- `docs/TASKS.md:268` — Objective
- `docs/TASKS.md:273` — Expected durable structure
- `docs/TASKS.md:275` — Generic ICM core
- `docs/TASKS.md:284` — School Dashboard security profile
- `docs/TASKS.md:291` — Supporting durable state
- `docs/TASKS.md:298` — Required outcomes
- `docs/TASKS.md:320` — Completion condition
- `docs/TASKS.md:343` — Status
- `docs/TASKS.md:347` — Objective
- `docs/TASKS.md:352` — Expected capability
- `docs/TASKS.md:371` — Initial priorities
- `docs/TASKS.md:391` — Security direction
- `docs/TASKS.md:410` — Status
- `docs/TASKS.md:414` — Objective
- `docs/TASKS.md:418` — Initial CI baseline
- `docs/TASKS.md:434` — Required properties
- `docs/TASKS.md:451` — Status
- `docs/TASKS.md:455` — Objective
- `docs/TASKS.md:479` — Status
- `docs/TASKS.md:483` — Objective
- `docs/TASKS.md:516` — Status
- `docs/TASKS.md:520` — Objective
- `docs/TASKS.md:542` — Audit Model
- `docs/TASKS.md:602` — Status
- `docs/TASKS.md:606` — Completion condition
- `docs/TASKS.md:617` — Status
- `docs/TASKS.md:623` — Required proof
- `docs/TASKS.md:636` — Status
- `docs/TASKS.md:641` — Objective and scope
- `docs/TASKS.md:649` — Acceptance and boundaries
- `docs/TASKS.md:662` — Status
- `docs/TASKS.md:668` — Completion condition
- `docs/TASKS.md:680` — Status
- `docs/TASKS.md:696` — Status
- `docs/TASKS.md:711` — Status
- `docs/TASKS.md:747` — Milestone 2 — Persistent Multi-User Foundation
- `docs/TASKS.md:775` — Milestone 3 — Course Materials and Secure Ingestion
- `docs/TASKS.md:794` — Milestone 4 — Course Intelligence
- `docs/TASKS.md:810` — Milestone 5 — Planning Engine
- `docs/TASKS.md:826` — Milestone 6 — Adaptive Planning
- `docs/TASKS.md:841` — Milestone 7 — Integrations
- `docs/TASKS.md:856` — Later — Production Hardening and Broader Beta
- `docs/TASKS.md:871` — Later — Billing / Monetization

### `docs/SECURITY_REQUIREMENTS.md` — 38 nested headings
- `docs/SECURITY_REQUIREMENTS.md:3` — 1. Purpose
- `docs/SECURITY_REQUIREMENTS.md:39` — 2. Current Applicability
- `docs/SECURITY_REQUIREMENTS.md:66` — 3. Core Security Principles
- `docs/SECURITY_REQUIREMENTS.md:152` — 4. Authentication
- `docs/SECURITY_REQUIREMENTS.md:217` — 5. Authorization
- `docs/SECURITY_REQUIREMENTS.md:314` — 6. Sessions
- `docs/SECURITY_REQUIREMENTS.md:357` — 7. Cross-Site Request Forgery
- `docs/SECURITY_REQUIREMENTS.md:374` — 8. Input Validation
- `docs/SECURITY_REQUIREMENTS.md:429` — 9. Injection and Output Safety
- `docs/SECURITY_REQUIREMENTS.md:464` — 10. APIs and Server Actions
- `docs/SECURITY_REQUIREMENTS.md:515` — 11. Persistence and Database Security
- `docs/SECURITY_REQUIREMENTS.md:566` — 12. File Uploads
- `docs/SECURITY_REQUIREMENTS.md:637` — 13. Object Storage
- `docs/SECURITY_REQUIREMENTS.md:665` — 14. Secrets and Configuration
- `docs/SECURITY_REQUIREMENTS.md:712` — 15. Logging
- `docs/SECURITY_REQUIREMENTS.md:752` — 16. Error Handling
- `docs/SECURITY_REQUIREMENTS.md:781` — 17. Rate Limiting and Abuse Prevention
- `docs/SECURITY_REQUIREMENTS.md:821` — 18. External URLs and Redirects
- `docs/SECURITY_REQUIREMENTS.md:853` — 19. Webhooks
- `docs/SECURITY_REQUIREMENTS.md:888` — 20. AI / Model Integration
- `docs/SECURITY_REQUIREMENTS.md:966` — 21. Third-Party Integrations
- `docs/SECURITY_REQUIREMENTS.md:994` — 22. Dependencies and Supply Chain
- `docs/SECURITY_REQUIREMENTS.md:1029` — 23. Browser / Web Security
- `docs/SECURITY_REQUIREMENTS.md:1071` — 24. Sensitive Data in the Client
- `docs/SECURITY_REQUIREMENTS.md:1093` — 25. Administrative Capabilities
- `docs/SECURITY_REQUIREMENTS.md:1116` — 26. Billing and Entitlements
- `docs/SECURITY_REQUIREMENTS.md:1146` — 27. Security Testing
- `docs/SECURITY_REQUIREMENTS.md:1193` — 28. CI / Repository Enforcement
- `docs/SECURITY_REQUIREMENTS.md:1235` — 29. Deployment Security
- `docs/SECURITY_REQUIREMENTS.md:1266` — 30. Security Incidents
- `docs/SECURITY_REQUIREMENTS.md:1307` — 31. Security Requirement Activation
- `docs/SECURITY_REQUIREMENTS.md:1340` — 32. Requirement Traceability
- `docs/SECURITY_REQUIREMENTS.md:1366` — 33. Requirement Changes
- `docs/SECURITY_REQUIREMENTS.md:1381` — 34. No Security Theater
- `docs/SECURITY_REQUIREMENTS.md:1404` — 35. Security Debt
- `docs/SECURITY_REQUIREMENTS.md:1423` — 36. Current Security Baseline
- `docs/SECURITY_REQUIREMENTS.md:1451` — 37. Reuse Across Projects
- `docs/SECURITY_REQUIREMENTS.md:1481` — 38. Final Principle

### `docs/DATA_PRIVACY.md` — 46 nested headings
- `docs/DATA_PRIVACY.md:3` — 1. Purpose
- `docs/DATA_PRIVACY.md:37` — 2. Current Applicability
- `docs/DATA_PRIVACY.md:67` — 3. Privacy Principles
- `docs/DATA_PRIVACY.md:148` — 4. Data Classification
- `docs/DATA_PRIVACY.md:251` — 5. Classification Rules
- `docs/DATA_PRIVACY.md:294` — 6. Account Data
- `docs/DATA_PRIVACY.md:327` — 7. Academic Data
- `docs/DATA_PRIVACY.md:375` — 8. Course Materials
- `docs/DATA_PRIVACY.md:428` — 9. Notes and Free-Text Content
- `docs/DATA_PRIVACY.md:464` — 10. Usage Analytics
- `docs/DATA_PRIVACY.md:511` — 11. Logs
- `docs/DATA_PRIVACY.md:547` — 12. Development and Test Data
- `docs/DATA_PRIVACY.md:584` — 13. Environment Separation
- `docs/DATA_PRIVACY.md:612` — 14. External Services
- `docs/DATA_PRIVACY.md:643` — 15. AI Providers
- `docs/DATA_PRIVACY.md:690` — 16. Integrations
- `docs/DATA_PRIVACY.md:721` — 17. Data Storage
- `docs/DATA_PRIVACY.md:750` — 18. Data Retention
- `docs/DATA_PRIVACY.md:790` — 19. Deletion
- `docs/DATA_PRIVACY.md:851` — 20. Export / Portability
- `docs/DATA_PRIVACY.md:876` — 21. Sharing
- `docs/DATA_PRIVACY.md:905` — 22. Administrative Access
- `docs/DATA_PRIVACY.md:930` — 23. Data Provenance
- `docs/DATA_PRIVACY.md:960` — 24. AI-Generated Data
- `docs/DATA_PRIVACY.md:976` — 25. Personal Data in URLs
- `docs/DATA_PRIVACY.md:994` — 26. Caching
- `docs/DATA_PRIVACY.md:1015` — 27. Notifications
- `docs/DATA_PRIVACY.md:1032` — 28. Search
- `docs/DATA_PRIVACY.md:1050` — 29. Background Processing
- `docs/DATA_PRIVACY.md:1070` — 30. Data Breach / Privacy Incident
- `docs/DATA_PRIVACY.md:1106` — 31. Privacy in Plan
- `docs/DATA_PRIVACY.md:1123` — 32. Privacy in Build
- `docs/DATA_PRIVACY.md:1138` — 33. Privacy in Verify
- `docs/DATA_PRIVACY.md:1155` — 34. Privacy in Release
- `docs/DATA_PRIVACY.md:1169` — 35. Data Inventory
- `docs/DATA_PRIVACY.md:1190` — 36. Initial School Dashboard Data Inventory
- `docs/DATA_PRIVACY.md:1216` — 37. Beta User Rule
- `docs/DATA_PRIVACY.md:1243` — 38. Monetization Does Not Change Privacy Ownership
- `docs/DATA_PRIVACY.md:1262` — 39. Legal / Policy Boundary
- `docs/DATA_PRIVACY.md:1281` — 40. Requirement Activation
- `docs/DATA_PRIVACY.md:1305` — 41. Privacy Traceability
- `docs/DATA_PRIVACY.md:1334` — 42. Privacy Requirement Changes
- `docs/DATA_PRIVACY.md:1350` — 43. No Privacy Theater
- `docs/DATA_PRIVACY.md:1371` — 44. Current Privacy Baseline
- `docs/DATA_PRIVACY.md:1388` — 45. Reuse Across Projects
- `docs/DATA_PRIVACY.md:1407` — 46. Final Principle
