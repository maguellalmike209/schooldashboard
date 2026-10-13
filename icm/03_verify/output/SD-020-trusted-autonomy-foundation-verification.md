# SD-020 Verify — disabled trusted foundation

## Verdict and independence

**PASS_LOCAL for the disabled fixture foundation; PR/CI PENDING for task completion.** This Verify stage reconstructed the packet's T01–T22 targets separately from Build notes, challenged exact-head, spoofed-status, grant-path, journal-corruption and descendant-lock assumptions, and added/ran negative tests. The same foreground agent performed Build and this adversarial Verify stage; a distinct human reviewer and hosted CI have **not** yet reviewed this head. No installed Windows runner is verified. SD-020 remains In progress until exact-head hosted checks and protected integration complete.

## Baseline and changed source

The attached packet copies have identical SHA-256 `afc776ba1e4503c7fe2e45009f67fa7bd426edd2abc0447ceb4253e34d4feeea`. Local and live GitHub `main` were `8c4c8e558d437d2874dbb1365f3d69c05e295b64` at preflight. Branch `codex/sd-020-trusted-autonomy-foundation` began clean at that commit. No SD-020 existed before this task. The SD-018 CLI, `core.mjs`, SD-019 guide, D-066, product code, security policy and ICM stage files were not edited. The changed scope is task/process documentation, focused automation modules, package test script and fixture tests.

## Independent challenge results by packet scenario

Proof classes: **A** deterministic fixture/unit, **B** separate local process, **C** installed Windows identity, **D** authentic hosted GitHub. A/B passing never implies C/D.

| ID | Local result and test evidence | Remaining proof |
| --- | --- | --- |
| T01 | A PASS: missing, unknown-field and revision-mismatched grants deny before fake worker | Owner-protected host path C pending |
| T02 | A PASS: caller-selected/worker-root forged grant and alias denied | Actual ACL denial C pending |
| T03 | A PASS: future/expired, paused/revoked, run-budget denial | Authenticated owner revocation C pending |
| T04 | A PASS: bound task digest mutation denied; new accepted child outside grant ignored | External grant authentication C pending |
| T05 | A PASS: wrong branch, dirty checkout, path traversal and junction rejected | Actual Windows checkout/ACL C pending |
| T06 | B PASS: two Node processes contend; one gets lock | Installed broker owner and OS lock C pending |
| T07 | B PASS: abrupt exit leaves lock; truncated/tampered journal stops | Crash-resistant installed storage C pending |
| T08 | B PASS: five separate crash probes preserve same task and lock across Plan, Build, Verify, local PASS and PR pending | Real workspace/PR recovery C/D pending |
| T09 | B PASS for fail-closed outcome: fake child cancellation reports descendant proof false and lock remains | Windows Job Object/process-tree containment C pending |
| T10 | A PASS: stale branch/check head and missing/failed check do not integrate | Authentic PR-head hosted check D pending |
| T11 | A PASS: wrong repository, spoofed `INTEGRATED`, corrupt journal and HTTP 401 do not establish completion | Live read/publisher identity D pending |
| T12 | A PASS: malicious task/prompt text cannot change digest-bound authority; JSONL content omitted from event summaries | Actual tool/plugin isolation C pending |
| T13 | NOT TESTED: no installed worker identity exists | Actual Windows canary denial C required |
| T14 | NOT TESTED: no native restricted Scheduled identity exists | Actual plugin/privilege denial C required |
| T15 | A PASS for explicit no-network flag and env allowlist; real process has no proven egress isolation | Windows network/credential denial C required |
| T16 | B PASS: protected grant change cancels fake worker and preserves uncertain lock/journal | Authenticated mid-run revocation and child cleanup C required |
| T17 | A/B PASS: run/task/retry limits via SD-018 core; fake timeout finite; unknown allowance denied | Installed wall/usage reporting C pending |
| T18 | A PASS: local verification contract fails a negative student journey despite green unit test | Actual future user-facing journey Verify not applicable to this process-only change |
| T19 | A PASS: subscription proposal outside exact grant remains non-executable | None for fixture contract |
| T20 | A PASS: no self-approved next milestone after grant scope | Actual unattended behavior C pending |
| T21 | A PASS: 67 legacy automation tests; `inspect|report` still show no authorization and remote UNKNOWN | Hosted CI regression D pending |
| T22 | A PASS: no invocation yields no journal entry; report command labels unknown completed-today | Actual missed Scheduled invocation C pending |

The new test file is `tests/icm-automation/trusted-foundation.test.mjs`; helper processes are under `tests/icm-automation/helpers/`. T13/T14 and real host parts of T15/T16 cannot PASS without later installation, which this task excludes.

## Checks actually run

- `npm run lint`: PASS, no warnings after final edits.
- `npm test`: PASS, 13 Vitest cases plus 77 Node automation cases (67 legacy + 10 new).
- `npm run typecheck`: PASS.
- `npm run build`: PASS, Next.js 16.3.8 production compilation and route generation.
- `npm run test:e2e`: PASS, 4 Chromium primary-view checks.
- `npm run test:audit-policy`: PASS, synthetic exception-scope negative cases.
- `npm run test:client-bundle-secrets`: PASS after build, 12 client files scanned. An earlier concurrent scan raced the `.next` rebuild and was rerun sequentially.
- `npm run audit:ci`: BLOCKED locally by registry/network access (`code undefined`); hosted CI required. Authenticated Course security E2E and local Supabase DB tests require Docker/Supabase, unavailable in this Windows shell.
- `node scripts/icm-automation/cli.mjs inspect|report`: read-only result `authorization: NONE`, `NO AUTHORIZED WORK`, `remoteStatus: UNKNOWN`; SD-020 shown In progress.
- `git diff --check`: PASS on tracked changes; full staged diff review still required before commit.

## Actual Windows/GitHub gates

Current Windows shell: `mental_lab\codexsandboxoffline`, Windows `10.0.26200.0`, Codex CLI `0.160.1`; CLI warns `Could not find home directory`. Canonical checkout ACL includes a sandbox-user Modify ACE. No real Scheduled or worker identity/connector isolation or installed broker code hash/ACL has been proven. GitHub branch endpoint reports `main` protected with `verify`, `CodeQL`, `Dependency review` check names; detailed protection returns HTTP 403 and rulesets `[]`. Required independent review, bypass actors and force-push/deletion enforcement remain UNKNOWN. The read-only GitHub connection confirmed main; HTTPS Git read works as a transport fallback, SSH does not authenticate.

## Security conclusion and next gate

No schedule, founder grant, publication token, real worker, merge or Release was created by the new runtime. `runCodexExec()` always denies. The fixture broker cannot authenticate its own code or enforce OS permissions; its code hash field is only syntactic. The manual runbook states G1–G8. Next: inspect full staged diff, commit this scoped branch, push safely over the same repository's authenticated HTTPS transport, open a protected PR, and require exact-head hosted checks and independent review before any merge or Done status. Installation remains separate and requires founder approval.
