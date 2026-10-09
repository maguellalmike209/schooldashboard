# M3 — Authentic Enforcement Ledger

**Every gate starts UNKNOWN; fixtures are not host attestations.** Populate with exact date, machine/identity SID, reviewer, source version, SHA, negative probe and redacted evidence. If incomplete, keep its state `NOT TESTED`, `UNKNOWN` or `BLOCKED`. Never write `PASS` from a plan or absent result.

| Gate | Must be established on the actual intended host/identity | Default | Proof class |
| --- | --- | --- | --- |
| G1 Founder-controlled authority | Grant and binding outside every writer root; owner-write, broker-read, revocation and code pin observed | UNKNOWN | HOST |
| G2 Request-only trigger | Scheduled cannot write source, grants, broker, journal, secrets or GitHub; cannot pick commands | UNKNOWN | HOST/CONNECTOR |
| G3 Restricted worker | OS access denied to controls, canonical checkout, other projects and secrets; disposable worktree allowed | UNKNOWN | HOST |
| G4 Lock and descendants | Actual exclusive lease, crash/power interruption/child cleanup proven | UNKNOWN | HOST |
| G5 GitHub governance | Required exact-head checks, reviewer/bypass restrictions, branch/publisher scope verified | UNKNOWN | GITHUB/ADMIN |
| G6 Independent QA | Frozen criteria and separate reviewer/hosted evidence, no Builder self-attestation | UNKNOWN | HOSTED/HUMAN |
| G7 Budgets and revocation | Limits externally enforced, real pause/revoke prevents further effects | UNKNOWN | HOST |
| G8 Reporting and recovery | Proven run journal/canonical reconciliation, no fictional completions on skipped runs | UNKNOWN | HOST/REPLAY |

## Structured evidence item template

```json
{
  "gate": "G1",
  "status": "UNKNOWN",
  "proofClass": "HOST",
  "observedAt": null,
  "hostBuild": null,
  "identitySid": null,
  "componentSha": null,
  "action": null,
  "expected": "DENIED",
  "observed": null,
  "evidenceRef": null,
  "reviewerRef": null,
  "limitations": "Not performed on actual installed worker"
}
```

A locally tested script or fake-child test belongs to separate `FIXTURE` evidence; it cannot satisfy HOST. Actual host tests require an explicit user-authorized procedure and should never expose secret contents. A denied canary under one identity cannot establish GitHub connector denial under another. `M3_HOST_ENFORCEMENT_VERIFIED` requires all relevant gates with observed evidence, no outstanding bypass and independent reviewer challenge; no proxy substitution.

## 2026-10-09 shadow diagnostic entry

Source baseline: PR #26 remote head `b650e5d6d20dac129cc3b911722d685ce43f41dc`; M3 implementation is local WIP until the M2–M4 shadow PR is published. This entry records observations, not installation proof.

| Gate | Actual status | Current observation and missing proof |
| --- | --- | --- |
| G1 | UNKNOWN | No protected owner grant, broker identity or revocation path installed/tested. |
| G2 | UNKNOWN | Native Scheduled trigger identity and connector restrictions not tested. |
| G3 | UNKNOWN | Read-only current-shell SID `S-1-5-21-366693111-3014295117-2025121632-1005`; no intended restricted-worker ACL negative. |
| G4 | UNKNOWN | Separate fake Node parent/descendant and lock fixture passed; no installed OS lease or Job Object proof. |
| G5 | UNKNOWN | Main summary lists required `verify`, `CodeQL`, `Dependency review` with App ID 15368; detailed protection returned 403, bypass/reviewer policy unobserved. PR #26 has no submitted GitHub review. |
| G6 | UNKNOWN | Local tests and this coding-agent review exist; independently authenticated human/GitHub review of M2–M4 absent. |
| G7 | UNKNOWN | Revocation and budget fixture negatives pass; no real protected pause/budget enforcement. |
| G8 | UNKNOWN | Legacy and shadow fixture recovery tested; no real scheduled run or trusted installed journal. |

Current Windows read-only inventory: Windows 11 Home `10.0.26200` x64; `codex-cli 0.160.1`; `codex exec --help` returned successfully in this shell. This does not establish that the intended restricted identity can run it or is isolated. No ACL probe on a protected path, actual secret, or installed worker was performed. The `S01–S10` catalog is covered by seven executable fixture/unknown-classification test groups; host-required intentions remain unproved. See `M3_VERIFY_RESULT.md` and `M3_OWNER_RUNBOOK.md`.
