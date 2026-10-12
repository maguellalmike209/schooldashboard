# ICM Next — Shadow Engineering Control Plane

**Lifecycle:** M0/M1 CANDIDATE — NOT ADOPTED.

**Authority:** Informational and design-only. No scheduler, runner, grant, task admission, process permissions, merge authority, or Release authority is changed by this folder.
**Current operational instructions remain:** repository-root `AGENTS.md`, `CONTEXT.md`, applicable `icm/` contracts and existing protected Git workflows until an explicitly authorized and independently verified cutover.

## Purpose

ICM Next is the proposed *replacement* engineering-management system for SchoolDashboard, not another layer added to the active task-first procedures. The founder steers the user problem, outcomes, strategic boundaries, cost and escalation decisions. Engineering management translates that into milestones, rolling work items, implementation, independently tested quality, and concise factual reports. The runtime security boundary must be outside agent-writable source.

## Intended sources of truth (AFTER cutover only)

| Source | Sole responsibility |
| --- | --- |
| `CHARTER.md` | Mission, hierarchy, roles, founder/engineering decision rights and communication |
| `POLICY.md` | Authority levels, risk/privilege boundaries, approvals, immutable constraints |
| `DELIVERY.md` | Intake, rolling planning, work lifecycle, recovery-first selection, milestone closure |
| `QUALITY.md` | Verification/evidence, Master Verify, conditional product/business quality profiles |
| `OPERATIONS.md` | Trusted host, schedule, grants, isolation, locks, revocation, telemetry, reporting operations |
| `PRODUCT_OUTCOMES.md` | Outcome/milestone proposal template and explicit non-authorizing portfolio state |
| `contracts/STATE_AND_SCHEMA.md` | Proposed typed record shapes, transitions, actor/evidence rules (NO runnable grants) |
| `migration/LEGACY_CONTROL_MATRIX.md` | Source-by-source policy parity, intentional retirements and open evidence |
| `migration/CUTOVER_AND_ACCEPTANCE.md` | Phased migration, adversarial checks and rollback/cutover gates |

## Immediate operating truth

- M0 inventories and challenges old controls. M1 authors and verifies the shadow contract. M2–M6 require separate approval.
- Existing `docs/TASKS.md` remains the live task registry. Existing SD-018 exact-ID grants and SD-020's *draft, disabled* foundation are not replaced by this proposal.
- A newly drafted milestone, task, acceptance record, reviewer label or report grants **zero** permission to run unattended code.
- No active task status or product-security promise is updated solely because these files exist.
- Product architecture (`docs/PRODUCT_VISION.md`, implemented code and security/privacy decisions) is distinct from the engineering control plane.

## Reading order for M0/M1 implementation

1. `migration/LEGACY_CONTROL_MATRIX.md` — complete auditable inventory against live repository state.
2. `CHARTER.md` and `POLICY.md` — organizational mandate and authority boundaries.
3. `DELIVERY.md`, `QUALITY.md`, `OPERATIONS.md` — execution/quality/operations contracts.
4. `contracts/STATE_AND_SCHEMA.md` — proposed data/control model.
5. `migration/CUTOVER_AND_ACCEPTANCE.md` — no-cutover/rollback gates.

Do not route production agents here as an active instruction source before a separately authorized cutover.
