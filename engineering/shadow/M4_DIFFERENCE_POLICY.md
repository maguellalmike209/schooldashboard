# M4 — Safety-First Difference Classification

## Core rule

**Never permit more execution authority merely because the new engine is more permissive.** M4 is a comparative test, not a new approver. A difference must be reviewed against independently frozen founder authority, product/user acceptance, branch/host evidence and the active legacy limits.

| Legacy | New | Class | Default action |
| --- | --- | --- | --- |
| DENY | DENY | EQUIVALENT_SAFE | Continue offline review |
| RECOVER | RECOVER | EQUIVALENT_SAFE | Compare exact task/stage and evidence |
| WAIT | WAIT | EQUIVALENT_SAFE | Compare exact PR/criteria scope |
| SELECT_BOUND | SELECT_BOUND | EQUIVALENT_SAFE *only with same exact ID/digest/authority* | Compare details; otherwise UNSAFE |
| SELECT_BOUND | DENY/WAIT | STRICTER_SAFE | Report productivity change; inspect false blocks |
| DENY/WAIT | SELECT_BOUND | UNSAFE_REGRESSION | Fail M4 immediately; no cutover |
| RECOVER | SELECT_BOUND other task | UNSAFE_REGRESSION | Fail; old unfinished task was bypassed |
| WAIT_PR | INTEGRATED or COMPLETE without exact proof | UNSAFE_REGRESSION | Fail; stale/unreviewed integration |
| NO_AUTHORIZED_WORK | Candidate proposal only | EQUIVALENT_SAFE | Proposal allowed; no worker action |
| Any | UNKNOWN / NOT_COMPARABLE | UNKNOWN / NOT_COMPARABLE | Preserve input/evidence; do not grant permission |

A stricter engine may still contain a **functional** bug (it needlessly blocks legitimate work). Classify security safety and productivity impact separately. `STRICTER_SAFE` is not automatic overall PASS.

## Diff triage

1. Compare exact source snapshots, normalized interpretations and original reasons; check mapping compatibility.
2. Determine whether changed output is caused by *new evidence* (invalid comparison), schema mismatch (adapter error), intended additional safety restriction, or actual inconsistent decision.
3. Run a fresh negative fixture isolating the deviation. Attach SHA, expected actual authority and risk tier.
4. Only routine code defects may be fixed within M2–M4; **never revise accepted policy/grant/criteria or lower tests** to make the diff pass.
5. Record owner-action-required matters in a manager decision brief. A new milestone, provider, privacy scope or Release may not be self-approved.

## What comparisons cannot prove

- Offline agreement does not prove real Windows ACL, GitHub connector restrictions or process-tree containment.
- A `PASS` from the same model is not proof of independent human/GitHub review.
- Read-only GitHub check observations do not prove installed publisher scope or branch bypass actors.
- No shadow fixture proves legal compliance or real-user product readiness without relevant external evidence.
- M4 cannot establish M5 cutover or live scheduler activation by itself.
