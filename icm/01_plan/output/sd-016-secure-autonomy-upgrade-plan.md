# SD-016 — Secure Autonomy Upgrade Plan

## Human Review Summary

- **Risk:** R0 by file type, with strong review because this changes the operating policy for future engineering work.
- **Mike's required actions:** None for authorized Plan and Build. Fresh independent Verify and protected integration remain separate.
- **Material decisions or blockers:** None for the scoped document work.
- **Status:** READY FOR BUILD — NO MATERIAL HUMAN DECISION REQUIRED.

## Objective and Current State

Make the existing ICM more capable of research, dependency-aware planning,
reliable execution, independent proof, and useful learning without changing its
four-stage lifecycle or human authority. `main` was clean at the SD-015 PR #10
merge (`4c3eaad`), matching the local `origin/main` ref. A fresh SSH fetch was
unavailable because the host lacks the repository SSH key; the task does not
depend on SSH for local Plan/Build. A non-destructive HTTPS read confirmed
canonical `main` was still `4c3eaadb73e91f5c0bd9d3730f1fd2f48d8f57a0`
on October 8, 2026. Recheck remote state before protected integration.

The existing Plan already owns risk, repository reality, decisions, Build
Readiness, and verification design. Build already owns scope and evidence;
Verify already owns independence, repairs, promotion, and retrospectives. The
upgrade should refine those controls in place.

## Scope and Document Plans

| Package | Existing ownership and smallest change | Scoped check / handoff evidence |
| --- | --- | --- |
| WP-00 `docs/TASKS.md` | Register one SD-016 process task after SD-015; keep In progress. | ID, dependencies, acceptance, and later-phase boundary are explicit. |
| WP-01 Plan context | Add research discipline to objective/current-state and decision sections; add conditional execution readiness to existing Build Readiness; add optional transition review using existing artifacts. | No new stage or blanket infrastructure requirement; decisions remain with Mike. |
| WP-02 Build context | Consume relevant readiness evidence at entry and route missing/stale/unsafe infrastructure through authorized fallback, Plan, or BLOCKED. | No claim of execution without evidence; autonomy and scope controls remain. |
| WP-03 Verify context | Refine independence, evidence provenance, adversarial checks, repair invalidation, and retrospective promotion. | PASS still requires observed satisfaction of requirements. |
| WP-04 root context | Add short routes to existing owners for strategy, conditional external research, readiness, transition review, and Verify learning. | No substantive stage procedure or changing project state copied into router. |
| WP-05 `AGENTS.md` | Add a minimal discoverability rule near lifecycle/evidence rules. | R0–R4, Git, repair, batch, human, and Release authority remain intact. |
| Optional Release | Inspect compatibility with transition review and retrospectives. | No edit if existing Release controls suffice. |

## Acceptance and Verification Targets

1. Each requested capability has an unambiguous owner and clear trigger.
2. Research distinguishes evidence from proposals and does not authorize work.
3. Readiness is task-specific, with verified fallback and early blockers.
4. An optional checkpoint review recommends bounded next work only after the
   appropriate verified integration or authorized Release evidence.
5. Build and Verify use provenance-aware execution evidence; repair invalidates
   affected evidence.
6. No accepted product, security, privacy, architecture, Git, or release policy
   is weakened; application code and product specifications remain untouched.
7. The complete diff is coherent and task-scoped, and available document checks
   pass. SD-016 remains In progress pending fresh independent Verify and
   protected integration.

## Boundaries and Research

No application, test, infrastructure, security requirement, product
specification, or accepted decision edits. No new phase tasks, fifth stage,
deployment, secret, or hosted service. Existing repository policy fully defines
the ICM mechanisms being refined, so external research is not needed to make
this scoped process change. Future task research remains conditional on a
material question and should prefer authoritative sources.

## Build Readiness

READY FOR BUILD — NO MATERIAL HUMAN DECISION REQUIRED. Local file editing and
diff review are available. Network-backed protected integration is reserved for
fresh Verify; SSH transport failure is recorded rather than treated as proof of
remote divergence or silently bypassed. HTTPS read access is verified, while
write access was not needed for this stage.
