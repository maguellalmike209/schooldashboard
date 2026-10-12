# Build handoff — ICM Next O0–O2 readiness

Created branch `codex/icm-next-operational-readiness` from local M5/M6 shadow commit `512b9f3d0b5b3ccdb96a10cbd11c1a6babc5a0de`, preserving all existing stacked branches. Added disabled `scripts/icm-next/host-preflight.mjs` and three negative tests for control-path overlap, broad GitHub trigger permission and unknown/unsafe layout. This is a static diagnostic only; every result has `launchCapability: false` and `OFFLINE_ONLY` proof.

Added six packet-named readiness documents under `engineering/readiness/` and the Verify artifact. Existing root policy, scheduler, credentials, grant, CI workflows, product source and student data were untouched. Found a potential G1 reuse defect in separate #25 `grant-store.mjs`: it omits a grant-under-state-root exclusion. No #25 code was absorbed.

The local unit suite passed with workspace-scoped TEMP/TMP (13 app, 67 legacy, 143 ICM Next). Lint, typecheck, audit-policy fixture and client-bundle scan passed. Standard Turbopack build failed at PostCSS helper process startup in both sandbox modes; `npx next build --webpack` passed. Four Chromium primary-view E2E tests passed outside the restricted loopback sandbox. `npm run audit:ci` passed with normal network access, using the repository's existing scoped development-dependency exception. Hosted exact-head evidence remains a Verify obligation.

Verify should independently compare this diff with the founder packet and live GitHub, challenge the preflight's inability to authenticate real paths/ACLs, classify OP01–OP24 by proof class, and keep all unproved host gates UNKNOWN/BLOCKED. No completion/activation label is authorized from this Build handoff.
