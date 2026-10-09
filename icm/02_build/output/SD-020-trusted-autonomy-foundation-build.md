# SD-020 Build handoff — disabled foundation

## Build status

READY FOR VERIFY (local fixture implementation). Protected PR/CI and installed Windows proof remain separate.

## What changed

`grant-store.mjs` binds an unchanged SD-018 V1 grant to a separate installation-policy shape and rejects mismatched real paths, content hash, revision, repository, checkout and branch. `lock.mjs` uses exclusive creation and never steals a stale lock. `journal.mjs` validates and flushes ordered hash-linked records, stopping on corrupt/truncated tails. `policy.mjs` composes `core.mjs` selection with unfinished-journal priority; `broker.mjs` exposes fixture-only evaluation and a fake worker lifecycle probe. `worker.mjs` builds explicit `codex exec` argv, filters environment, bounds time/output and captures JSONL event types without message bodies. Real Codex launch always throws `STOP_ENVIRONMENT_UNVERIFIED`. `github-read.mjs` validates exact repository/base/head, check app identities and main ancestry, with read-only live-fetch logic; `publisher.mjs` produces a non-executable draft PR proposal. `verify-contract.mjs` models frozen acceptance and negative QA failure. The manual installation runbook keeps G1–G8 pending.

## Security controls and limits

The code has no actual installed authority, native Scheduled trigger, OS ACL/token verification, Windows Job Object, authenticated grant origin, code attestation, publisher credential or real worker launch. `codeSha256` is checked only for shape. Fixture broker decisions are synthetic and cannot turn the checked-out source into a trusted broker. A cancelled fake worker leaves its lock uncertain because descendants are not proven stopped. This is deliberate fail-closed behavior.

## Build checks

Before Verify: existing 67 automation tests plus new fixture/process tests passed; app Vitest 13 passed; lint, typecheck and production build passed; audit policy fixture passed; post-build client bundle secret scan passed. `audit:ci` could not reach its registry service from this shell (`code undefined`); hosted CI must decide that gate. A concurrent client-bundle scan initially hit a `.next` rebuild race, then passed when rerun after Build.

## Verify targets

Independently rederive T01–T22 from the packet, inspect every new trust boundary and diff, rerun relevant tests, challenge stale PR/CI and spoofed evidence, verify no production or activation path, and check the read-only CLI's semantics. Treat T13–T15 host isolation, installed T16/G7 and detailed GitHub protection as unverified. Do not mark SD-020 Done without exact-head hosted checks and protected integration.
