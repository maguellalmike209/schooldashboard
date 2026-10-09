# M3 — Windows Host, Tool, Connector and Process-Isolation Proof

**Status:** Security test specification / evidence harness; no installation or privilege changes authorized by this document. User-approved device actions required for actual host proof.

## Purpose

Distinguish *offline simulated safeguards* (M2) from *real enforcement* on the founder's Windows desktop, Codex native Scheduled task, tool capabilities, GitHub permissions, OS identities, process descendants and secrets. **A worktree, prompt instruction, test fixture, passed lint, or agent role is not a sandbox boundary.** Real test execution must use owner-approved identities and disposable canaries with harmless deny probes.

## Required trust separation

1. **Founder/operator**: controls product objectives, authenticated approvals, pause/revoke and high-impact business/Release decisions. The worker cannot impersonate this identity.
2. **Trigger**: native Scheduled is request-only (or use a separately configured OS scheduler if native Scheduled cannot achieve this); must not retain GitHub write plugin capability, owner secrets or the ability to call direct Codex with elevated privileges. It cannot select grant path/task/command/risk.
3. **Broker**: pin the reviewed binary/code OUTSIDE the writable repository; only broker identity has read access to authentic owner grants and write access to journal/lock. Broker does not trust arguments from trigger or worker.
4. **Worker**: distinct restricted Windows identity and isolated disposable task worktree; no read/write to founder home, owner grant, broker code/state, canonical `main`, other projects, publisher/Release credentials. Explicit sandbox/approval flags are necessary but not sufficient.
5. **Publisher**: separate restricted action identity, if later approved; only allowed draft branch/PR mutation, never `main` merge or Release. Keep missing publisher as **unimplemented**, not a reason to use the worker's GitHub admin credentials.
6. **Reviewer/CI**: independent evidence and protected hosted checks at exact head; privilege boundary not controlled by Builder.

## M3 deliverables codex may implement now

- **Read-only host inventory utility** using supported Windows commands and Node scripts. Print Windows build/version, Sid identity, actual `codex --version`/`codex exec --help` result, sandbox configuration, ACL summary for *approved harmless paths*, plugin capability inventory if connector exposes it, GitHub branch protection summary, and redacted versions. Do not print secrets or mutate settings.
- **Negative-probe harness** accepting only founder-supplied disposable canary directories and a named test identity. It may attempt harmless create/read on canary files and classify `DENIED/ALLOWED/UNKNOWN` with `testMode: true`. Absolutely no probing private keys, actual `.env`, real tokens, forbidden OS paths, browser cookies, credentials or production data. No test script changes ACLs.
- **Separate-process lock and descendant-death rehearsal** against a disposable Node fake worker (not installed Codex); demonstrate that parent exit while child lives leaves lock held or `STOP_LOCK_UNCERTAIN`. An OS Job Object or equivalent real process containment is **deferred** until owner-approved installed host run.
- **Revocation/timeout rehearsal** with only simulated owner grant under test roots; record pre/post writer process status and unresolved descendants. A kill signal returning success is not proof all descendants stopped.
- **Evidence-ledger generator** that emits only observed facts; expected/unknown results remain UNKNOWN/NOT TESTED. No auto PASS for M3 based solely on setup instructions.
- **Owner operator runbook**, with concrete canary setup/cleanup and exact intended identity, privileges and proof. Separate commands that require admin approval from read-only checks; never run privileged commands automatically.

## Current known blockers from SD-020 historical evidence (REVERIFY; do not assume still true)

- Codex CLI `0.160.1` previously emitted `Could not find home directory` in the restricted shell. A broken CLI is BLOCKED, not proof of denied file access.
- The old canonical checkout ACL reportedly included a Modify ACE for `CodexSandboxUsers`.
- Native Scheduled lacked proven identity/plugin write restrictions independent of the mutable Codex default.
- Connected GitHub permission could include broad write actions independently of OS filesystem sandbox.
- Real branch reviewer/bypass governance required owner/admin inspection.

A later test must record current device state and source/version before replacing any of these with PASS.

## Proof methodology

- For each canary: baseline founder/operator creates dummy path; observer records hash+ACL; worker identity attempts explicit read, write, rename, delete **only on named canary**. Show denied on owner-grant, broker code/state and canonical checkout *canaries*, but allowed inside a disposable workspace. Denial must be OS/kernel/API-backed, not a model refusal.
- Verify Scheduled identity has no write-capable GitHub plugin, no bypass via separate shell/SSH/PAT/environment, no access to broker service configuration and no direct `codex exec` outside request-only path. If this cannot be isolated in the desktop app, native Scheduled **cannot serve as secure trigger** and alternative request-only trigger must be designed later.
- Test no credential leakage in environment/stdout/journal and limited network capability. Avoid claiming complete network isolation based solely on a command-line flag.
- Concurrency: two independent processes attempt same exact-workspace exclusive lease; only one admitted. Stale lock is never stolen based only on PID/age.
- Child containment: terminate parent unexpectedly while child tries *disposable* writes; broker lease persists/denies until trusted host can prove descendant death. If uncertain → BLOCKED, not unlocked.
- Revocation: owner changes test grant through authenticated owner path. Deny new operations promptly; state what already happened, which descendants remain and why further work stops.

## Allowed phase verdicts

`M3_DIAGNOSTICS_PREPARED`: scripts and manuals independently reviewed but real identities or permissions not tested.
`M3_HOST_PARTIAL`: some actual signed-off negative host probes observed, others UNKNOWN/BLOCKED.
`M3_HOST_ENFORCEMENT_VERIFIED`: every required G1–G8 item actually observed, reviewed and source-bound **on installed intended identities**. This status is unlikely in an unattended Codex foreground sandbox and **may not be claimed from fixture tests**.

No M3 verdict itself installs/enables a writer. Owner must independently approve M5 activation, after M4 parity and policy conditions.
