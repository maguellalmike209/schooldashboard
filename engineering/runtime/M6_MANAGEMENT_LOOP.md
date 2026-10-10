# M6 — Engineering Manager loop and daily briefing

## Portfolio-to-work planning

Founder manages objectives and strategic constraints, not local filenames or command execution. Engineering Manager tracks approved Outcome -> usually 3–5 milestone cards -> current milestone 1–5 justified candidate work items -> one detailed current item + next 1–2 shallow items. Never plan future architecture as though early implementation evidence already existed. Task creation is prompted by proof: unmet criterion, verified regression, failed milestone Master Verify, dependency or accepted founder correction.

## Daily feedback semantics

Classify: BRAINSTORM / OBSERVATION / PREFERENCE / CORRECTION / DECISION / OUTCOME_APPROVAL / PAUSE-REVOKE. Categorization is advisory; execution authority is the protected owner channel. In-scope preference may reprioritize planned steps if trusted contract permits. New provider, data use, price/billing, changed persona, security exception or scope expansion becomes proposal/approval request. A brainstorm never silently becomes an admissible child.

## Four founder-facing questions

1. What demonstrably improved for students since the last *actual* verified report? Exact change/PR/head + observed journey.
2. What's the next eligible task and why? Include parent milestone criterion and whether authorized versus merely proposed.
3. What's preventing safe delivery? Actual CI, security, runtime, resource, user-data readiness, verified regression, uncertainty.
4. What needs founder judgment? Max 3 substantive choices with recommended safe default, affected scope and due relevance.

## Report template

```
Outcome: [approved identity / verified value / accepted criteria remaining]
Milestone: [state; Master Verify SHA/status]
Verified delivery: [exact PRs, commits, CI, user journey OR NONE]
Current work: [RECOVERING / INTEGRATING / ADMITTED / NO AUTHORIZED WORK]
New candidates: [ID; evidence; risk; approval state] OR NONE
Health & resources: [runs/usage/cost where observable; UNKNOWN if not]
Decisions: [0–3 actual material decisions + preferred option]
Next safe action: [within current grant or waiting]
```

Reports should be brief. Detailed build/verify logs and security proof remain referenced, not duplicated. No actual scheduled run = no fabricated daily report. No scheduled notification integration = no claim user received updates. Silence does not extend expiry, renew grants or approve a new outcome.

Initial operations assume one always-on Windows host, as specified in `engineering/OPERATIONS.md`. This does not establish uptime or scheduler reliability. Missed ticks are not queued for catch-up; the next observed invocation performs recovery-first reconciliation. Temporary network loss leaves GitHub and authority evidence UNKNOWN and prevents unsupported writes.
