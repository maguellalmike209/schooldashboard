# SD-019 — Founder Steering ICM Integration Build

## Status

Ready for independent Verify. Risk R0; no executable behavior changed.

## Changed policy

- Copied the packet's canonical founder steering guide into `icm/guides/FOUNDER_STEERING_AND_OUTCOME_DELEGATION.md`.
- Added the packet's small routing and stage-specific provisions to `AGENTS.md`, root `CONTEXT.md`, Plan, Build, Verify, the automation contract, and the conditional assurance guide.
- Added D-066 and one SD-019 task registry entry, initially `In progress` pending Verify and protected integration.
- Replaced the obsolete no-cadence sentence with the founder's proposed 20:00 Pacific preference while explicitly leaving scheduling disabled.

## Boundaries and deviations

The packet's wording is preserved with Markdown line wrapping. Its guide is copied directly from the marked canonical block. The SD-019 task entry and three stage artifacts are task bookkeeping authorized by the foreground integration request. Release context, product readiness, application source, grant runtime, checkpoint schemas, and automation tests remain untouched. No schedule or grant was created.

## Verification targets

Independently compare the entire packet and final diff, especially brainstorming versus authorization, exact-ID current grants versus future child delegation, foreground batches, recovery-first behavior, independent Verify, protected exact-head checks, conditional assurance, separate Release, and all twelve guide audit scenarios. Run applicable local checks and confirm hosted required checks after the PR is opened.
