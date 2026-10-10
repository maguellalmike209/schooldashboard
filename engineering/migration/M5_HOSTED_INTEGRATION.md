# M5 — Stacked PR recovery and hosted integration decision tree

PR #26 has hosted checks on its own head. PR #27 is stacked on PR #26 and has **zero hosted jobs** in the inspected snapshot because workflow triggers are limited to main-targeting PRs. This is an integration *blocker*, not an offline regression.

1. Verify current `main`, both branches, exact heads, open changes, review actors and real protection. If upstream source changed, record it and re-plan. Do not mutate user work.
2. Obtain independent GitHub review for PR #26 if policy requires and branch settings confirm. Ensure required checks on its exact final head. Merge only with authorized repository policy; if unavailable leave open.
3. Once #26 integrated, reconcile PR #27 branch against new canonical `main`, preserve diff/evidence, retarget/create proper main-based PR without hiding history or bypassing policies. Avoid destructive rebase/reset unless separately approved.
4. Run required `verify`, CodeQL and Dependency Review again on its *new exact head* and obtain required distinct reviewer evidence. Local passing 138 tests does not satisfy this step.
5. Merge #27 only once permitted; observe canonical ancestry and rerun integrated M4 parity. New M5/M6 code should be based on this actual integrated tree or remain a clearly stacked shadow PR pending it.
6. Review PR #25 separately. No imported `SD-020` fixture module is treated as a trusted installed launch capability; known state-path and journal reconciliation review concerns remain separate.

No one step may self-declare completed based on a local report. Record `OPEN`, `CHECKS_PENDING`, `REVIEW_PENDING`, `MERGE_BLOCKED`, `INTEGRATED` with live timestamps and commit IDs. Retargeting a PR or modifying its head invalidates prior exact-head approvals/check assumptions.
