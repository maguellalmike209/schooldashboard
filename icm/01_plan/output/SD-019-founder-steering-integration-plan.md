# SD-019 — Founder Steering ICM Integration Plan

## Objective and authority

Integrate the founder-approved 2026-10-08 packet as one foreground documentation task. The current user instruction authorizes Plan → Build → independent Verify and protected Git integration. It does not authorize scheduled writing, grants, application changes, or Release.

## Current state and risk

Risk: **R0**, documentation and routing only. Local `main` is clean at `3f130e15e62b5af1ccdb216ac9decf6bd8a7a57b`; the connected GitHub repository reports the same published `main` SHA and requires `verify`, `CodeQL`, and `Dependency review`. The packet baseline matches. SSH fetch is unavailable; live GitHub was checked through the connected integration. Existing SD-018 code still enforces exact task IDs/digests in a read-only synthetic pilot. No unattended writer or live schedule exists.

## Integration map

| Packet provision | Owning destination |
| --- | --- |
| Canonical founder input, outcome contract, delegation levels, workflow, recovery, reporting and audit scenarios | New `icm/guides/FOUNDER_STEERING_AND_OUTCOME_DELEGATION.md` |
| Global boundary and context routing | `AGENTS.md`, `CONTEXT.md` |
| Scheduled grant authority and cadence clarification | `icm/automation/CONTEXT.md` |
| Stage-specific outcome checks | Plan, Build and Verify stage contexts |
| Conditional assurance cross-reference | `icm/guides/PRODUCT_AND_BUSINESS_ASSURANCE.md` |
| Proposal versus accepted task metadata and one task-scoped registry entry | `docs/TASKS.md` |
| Durable operating-model decision | `docs/DECISIONS.md` D-066, currently unused |

`icm/04_release/CONTEXT.md` and `docs/PRODUCT_READINESS.md` remain unchanged unless Verify finds a concrete inconsistency. Existing foreground batch, exact-ID grant, recovery, lock, protected PR and separate Release rules are preserved.

## Acceptance and verification

Apply the packet's final text with only heading/placement adjustments. Verify every required provision, reference path and ownership boundary against the final diff. Challenge the packet's twelve audit scenarios and the user's ten required checks. Run documentation consistency checks, `git diff --check`, and applicable existing ICM and repository checks. Record actual results. Complete task bookkeeping only after independent PASS, then commit on a task branch, open a protected PR, confirm required checks on the final head, merge only if policy allows, and reconcile `main`.

## Exclusions and stop conditions

No grant/schema/selector/checkpoint/test change, task-selection implementation, application feature, new schedule, unattended writer, Release, provider or production change. Stop affected integration for a material policy conflict, security issue, unknown remote divergence, or failed required protection without safe repair.
