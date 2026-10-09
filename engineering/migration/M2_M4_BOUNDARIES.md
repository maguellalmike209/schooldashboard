# M2–M4 Integration, Dependencies and Zero-Cutover Rules

## Existing live-state protection

M0/M1 PR #26 is open at source snapshot; SD-020 PR #25 remains open draft. Their actual latest state must be rechecked. No part of M2–M4 may close, merge, modify, squash, rebase, incorporate or overwrite either PR. Canonical main and old ICM must remain functional until later separately authorized cutover.

## Branch strategy

1. If PR #26 is **merged and canonical `main` contains its final verified tree**, create `codex/icm-next-m2-m4` from latest main (after reconciling user changes).
2. If PR #26 is **open but its latest head is verified and clean**, create a **stacked branch** from that exact head, and open a PR whose base is `codex/icm-next-m0-m1` to isolate the new diff. Mark title/body `M2–M4 SHADOW / STACKED — NO CUTOVER`. This does not imply a valid protected-main merge.
3. If an upstream branch changed, has a dirty checkout, is inaccessible, or integration/review policy cannot be preserved, stop and report rather than inventing a base or destructively resetting/rebasing.
4. Do not simultaneously let an old and new writer modify one shared workspace. This foreground work may use a separate safely verified worktree or fresh task branch; no installed scheduler.
5. After PR #26 eventually merges, refresh against canonical main, reconcile the stacked branch through a reviewed nondestructive integration strategy and re-run tests/checks at the **new exact final head**. A successful CI on the old stacked head is not proof for the changed head.
6. If actual GitHub independent review approval is missing, leave PR open; a Codex self-review is not an independent GitHub approval.

## Permission-safe outputs

Allowed: author the specified `engineering/` target documents, new `scripts/icm-next/` **pure offline** evaluator/read-only host inventory/shadow replay code, `tests/icm-next/` fixtures, task-scoped Plan/Verify artifacts and a limited reporter. A minimal `package.json` test-script update to register new read-only tests is allowed, but existing tests, CI, lockfile, dependencies and security gates may not be removed or weakened. Existing `engineering/` M1 normative files should not be rewritten for convenience; record a concrete inconsistency and propose focused correction if necessary.

Disallowed: old root router and agent manuals, existing SD-018/SD-020 scripts, grant/fixture mutation outside synthetic tests, real owner grant, installed broker/service, scheduled tasks, Win ACL/permission changes, admin app settings, credential provisioning, GitHub branch rule changes, automatic merges, product runtime, DB/schema/production, new AI task-generation privilege, real user data processing, payment/provider launch and Release.

## Sequential gates within one authorized foreground session

**Gate M2:** schemas + offline engine + read-only adapters + 26 coded negative cases; no worker or writes. If M2 FAIL, stop M3/M4 dependency work unless a safe independent subtask is clearly useful; do not claim downstream PASS.

**Gate M3:** implement and test offline diagnostic/probe harness and operator runbook; run only nonprivileged inspection in the current sandbox. Real host canary/ACL/admin/connector negatives require separately authorized founder operator actions. If host unavailable, publish `DIAGNOSTICS_PREPARED` and keep G1–G8 UNKNOWN; do not block *offline* M4 replay merely because no installed worker exists.

**Gate M4:** compare old/new decisions using exact same fixtures, classify safety regressions, generate manager-oriented report and run offline Master Verify. Treat M3 host UNKNOWN as a formal blocker to cutover, NOT as a reason to fabricate host PASS.

## Completion and evidence

Separate reports per phase, plus one `M2–M4 Shadow Master Verify`. Each includes actual SHA, reviewer provenance, test command/outcome, proof class, open decision, reuse vs reinvented module, and limitations. The PR description must state the conditional status of stacked baseline and outstanding host gates. Preserve an exact resume checkpoint on interruption; do not begin M5/M6.
