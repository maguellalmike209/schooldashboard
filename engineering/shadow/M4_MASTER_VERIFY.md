# M4 — Shadow Master Verify, Migration Exit and Rollback

**Status:** Pre-cutover evidence contract. Even a fully green M4 is not M5 permission.

## Evidence requirements for M4 SHADOW PASS

- M0/M1 baseline independently verified and integrated or explicitly labeled stacked/not canonical; latest PR #26 and PR #25 states re-observed.
- M2 schema validator, state machine, read-only adapter, offline engine, Master Verify and deterministic tests pass; old inspection code/test results are unchanged.
- At least 30 meaningful executable old/new synthetic comparisons, with no unresolved `UNSAFE_REGRESSION`. All `UNKNOWN`/`NOT_COMPARABLE` cases are transparently enumerated and contain a safe stop behavior.
- Product privacy/security/owner-isolation controls, task acceptance, risk escalation, separate PR/CI reviewer, Master Verify, recovery and Release still have traceable replacement owners against the M0 matrix. No old critical control silently retired.
- Exactly specified report: covered sample set, last checked SHAs, evidence classes, diffs, risks, estimated operating cost/usage if available, founder decisions, and honest readiness verdict.
- Authentic Windows/GitHub G1–G8 in M3 ledger may remain UNKNOWN for M4 **shadow-only** verification, but MUST be called out as **blocking M5 live cutover/activation**, not silently converted to PASS.
- Current root `AGENTS.md`, `CONTEXT.md`, active automation CLI/parser, GitHub protection, SD-020 draft and product code remain unmodified unless already changed independently with explicit authorization.

## Master verdicts

- `M4_SHADOW_PASS_HOST_BLOCKED`: offline decision parity and quality passed; authentic M3 enforcement remains unproven. This is a normal valid end state for M2–M4 implementation.
- `M4_SHADOW_FAIL`: unresolved unsafe permission/integration/regression mismatch or missing required contract/test evidence.
- `M4_SHADOW_BLOCKED`: missing legacy baseline, irreconcilable PR branch or unknown critical evidence that prevents meaningful parity challenge.

No `PRODUCTION_READY`, `LEGAL_COMPLIANT`, `AUTO_RUN_ACTIVE`, `M5_READY` or `MILESTONE_VERIFIED_COMPLETE` claim from a shadow report. The actual product milestone Master Verify is a different verification type.

## Rollback/fallback test

Simulate rejecting ICM Next entirely: old `AGENTS.md`, `CONTEXT.md`, old SD-018 `inspect|report`, legacy task registry and current CI remain intact, while `engineering/` and `scripts/icm-next/` are merely inert files. No need to delete or reset source to continue legacy work. Verify this in a disposable checkout/replay, not by destructive Git commands on user's workspace. Record outcome as `LEGACY_FALLBACK_UNCHANGED` or `FAILED`.

## M5 admission conditions (future, not authorized now)

Separate founder decision after: independent completed PR review, all required exact-head CI, risk/security parity, real authentic M3 permissions tests, canary pilot plan, owner-approved grant installation, separate Release controls, documented emergency pause/rollback and any necessary admin GitHub settings verification. M5 should first test one low-risk fixed-ID task, draft PR only; dynamic child execution remains later M6 with its own independently enforced delegation extension.
