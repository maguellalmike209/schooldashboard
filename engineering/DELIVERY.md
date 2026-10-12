# ICM Next — Outcome-Driven Delivery Contract

**Status:** M1 SHADOW SPECIFICATION. No change to current task selection/execution.

## 1. Manage outcomes, not lists of tasks

The hierarchy is Founder Portfolio → Approved Outcome → Milestone → Work Item → Ephemeral Steps. All durable records need stable identity, parent linkage, version, provenance, clear owner, negative/positive acceptance and authoritative evidence reference. Legacy `SD-XXX` IDs remain historical identity and must not be renumbered.

**Outcome intake:** articulate student user/problem, currently observable baseline, desired user result, milestone candidates, meaningful exclusions, cost/risk envelope, completion evidence and founder decision boundaries. Initially sketch 3–5 coherent milestone cards as revisable hypotheses; if one or two are sufficient, do not invent more.

**Milestone intake:** define user journey and milestone Master Verify target. Propose 1–5 necessary work items based on present repository evidence, with 1 current item detailed, next 1–2 light, and remaining items provisional. Do not lock in step-10 architecture while still implementing step 1.

**After real work:** re-evaluate unmet milestone criteria and current evidence. Add a new candidate only if traceable to failed acceptance, demonstrable missing prerequisite, verified bug/regression, accepted founder correction, or newly established dependency. Record: cause, evidence, parent criterion, scope/exclusion, risk, dependencies, expected test and why current items cannot satisfy it. Never generate for quota, idle tokens or agent entertainment.

## 2. One work-item lifecycle

```text
Observe actual repository + authority
  → Recover unfinished authorized work, if any
  → Admit eligible work item (outside-grant candidate stays candidate)
  → Focused PLAN / frozen acceptance / risk
  → BUILD and scoped executable checks
  → INDEPENDENT VERIFY and negative/regression checks
  → Protected PR/CI reconciliation
  → INTEGRATED only upon exact-head evidence
  → Update milestone evidence and rolling plan
```

Plan/Build/Verify are *responsibilities*, not an obligation to write three large essays or to create three paid agents for trivial work. For riskier changes, leave readable evidence with exact checks, stage ownership, actor/provenance, code SHAs and known gaps. Separate human/hosted checks from model self-assessment. A no-op task is possible only if acceptance is independently established and no work was necessary.

## 3. Recovery-first admission

At each actual invocation, independently reconcile: verified founder grant and revocation, OS identity/permissions, exclusive writer lock, prior child lifetime, exact workspace/branch/HEAD, uncommitted state, trusted journal, in-flight work, tests, PR head and hosted checks. An incomplete or contradictory work item takes precedence over selecting the next item. Never assume token refill auto-resumes an invocation, or discard changes to appear clean. If the last safe stage cannot be reconstructed, stop the affected path; preserve evidence and request operational review.

If two work streams are independent, continue only if active authority explicitly permits bypassing a blocked dependency and workspace isolation is verified. A dirty PR/CI-pending work item cannot be silently marked Done because its task document says PASS.

## 4. Completion must be student-visible

Finishing the planned items is not the same as achieving a milestone. Once candidate items appear integrated, execute **Milestone Master Verify** against frozen founder-approved milestone acceptance at the final integrated SHA (see `QUALITY.md`). Result:

- `PASS` → mark milestone COMPLETE, record actual student value, proceed to another milestone **inside the same still-valid approved outcome** if allowed.
- `NEEDS_WORK` → produce evidence-linked minimal repair candidates; admit only if runtime/founder authority permits.
- `BLOCKED` → preserve state and escalate material decision or missing proof; do not fake completion.

After the approved Outcome's final criteria are independently met, stop new coding; report success, options and risks. New outcomes require founder authorization.

## 5. Founder steering loop

Daily feedback is categorized as BRAINSTORM, OBSERVATION, PREFERENCE, CORRECTION, DECISION, OUTCOME APPROVAL, or PAUSE/REVOKE. For a safe in-scope adjustment, manager updates priority/near-term candidate plan with explanation. For material scope change, produce a compact option brief and keep previous grant unaffected unless revised by authenticated owner action. Respect user's limited attention: no routine approval questions between eligible lifecycle stages.

## 6. Work queue selection (future, not runnable yet)

Selection precedence:

1. Safety incident/owner revocation/expired grant (STOP relevant writes).
2. Unresolved recovery or PR/CI obligation from a previously admitted item.
3. In-scope regression threatening an accepted milestone requirement.
4. Eligible dependent item on the current milestone critical path.
5. Evidence-linked candidate admissible under a *future verified delegation grant*.
6. Otherwise report `NO AUTHORIZED WORK`, or pause for a specific founder decision.

Selection must account for dependency direction, risk ceiling, resource/time budget, max concurrent writer count and bounded retries. The system must not dynamically create a high-risk task and declare it low-risk to fit the grant.

## 7. State and source integrity

State strings and transitions are specified in `contracts/STATE_AND_SCHEMA.md` as **design contracts**. They are not implemented parser values. M1 must not replace the existing `docs/TASKS.md` statuses or SD-018 schema with new strings. Store proof references and stable IDs; do not duplicate or hand-edit false machine-verified totals. Management brief describes actual user outcome, important candidate additions, exact integration evidence and risks.
