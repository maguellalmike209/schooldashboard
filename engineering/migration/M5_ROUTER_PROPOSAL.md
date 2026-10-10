# M5 root-router replacement proposal — unapplied

**Status:** SHADOW / PROPOSAL ONLY. This document is not authorization to edit either root file. The exact original files remain at baseline local commit `9eb779099d5e284d962d9389723de60ba26d9220` (tree `a7d8e69da7a952e10e82d82518e8297d2e88ffbe`) and in the current checkout. `M5_SOURCE_MANIFEST.json` pins 42 input files and both before/after hashes. `scripts/icm-next/cutover-plan.mjs` generates these exact proposed bytes; `rollback-plan.mjs` proposes the reverse from frozen original bytes.

| Root path | Current Windows checkout SHA-256 | Canonical Git blob SHA-256 | Proposed SHA-256 |
| --- | --- | --- | --- |
| `AGENTS.md` | `f76bdcbcf2ecb1430eb8d46c7b48905c0396c7136aa60306af9fc914005fc386` | `604bc1a50321b5ec6be999a5934b4028fcb0c7311f3c90c58d313e0205ee4e93` | `464abdd6ee95069eac47d10e296f79f4f1634517a513a9c403d0400ac87bc1d5` |
| `CONTEXT.md` | `3f5b6990e55b8c8c11af0b41941d0aa8c037086248ef187fcc625d81f791c72c` | `87f711d169b0ad90fcb214f3831e0927e15a67c84fe45b0c75bcb13488b387fb` | `48c5669c9fbce772cba08ddc93c14fb2370662bc28e677fe1f01d3c96dc59fd4` |

The current checkout uses Windows line endings for the legacy roots, while Git stores canonical LF blobs. The manifest pins both byte forms. A future approved cutover must regenerate and review the before hash on its actual target checkout; this rehearsal's reverse bytes are exact for the current Windows checkout.

## Proposed `AGENTS.md` bytes

```markdown
# School Dashboard — Engineering Router

Read engineering/CHARTER.md and engineering/POLICY.md before work. This router grants no execution authority. Read CONTEXT.md for task-specific sources. Existing product, security, privacy, protected Git and Release requirements remain binding. Scheduled writes require separately authenticated external authority and installed host proof.
```

## Proposed `CONTEXT.md` bytes

```markdown
# School Dashboard — Context Router

Read engineering/README.md, then the smallest relevant contract: engineering/PRODUCT_OUTCOMES.md for founder outcomes; engineering/DELIVERY.md for planning and recovery; engineering/QUALITY.md for Verify and CI; engineering/OPERATIONS.md for trusted host operation; engineering/contracts/ for schemas and admission. Read relevant docs/ product, security, privacy and implementation sources. For an authorized foreground task, retain Plan → Build → independent Verify. For production Release, read icm/04_release/CONTEXT.md and obtain separate Release authority. Historical SD task evidence and decisions remain in docs/TASKS.md and docs/DECISIONS.md. Until an approved protected cutover, the existing root files remain active.
```

## Reverse proposal

For a separately approved future rollback, restore the exact original `AGENTS.md` and `CONTEXT.md` bytes from the pinned baseline only when the observed current hashes equal the proposed hashes above. The reverse proposal must be reviewed through protected Git after freezing intake and reconciling dirty work, pending PR/CI and any child process. It cannot revive revoked grants. The local fixture rehearsal restored both original hashes byte for byte; it did not exercise an active production cutover.
