# SD-009 — Automated testing foundation plan

## Plan Status

READY FOR BUILD — NO MATERIAL HUMAN DECISION REQUIRED

## Risk Tier

R2 — adds development dependencies and repeatable browser execution. No
application data flow, private data, API, or production runtime behavior changes.

## Current state and scope

The Next.js 16/React 19 application is static and read-only. Selectors in
`src/lib/academic-context.ts` derive the five views from a single fixture.
There is no committed automated test suite. The existing `lint`, `typecheck`,
and `build` scripts remain required.

Use Vitest for TypeScript selector/invariant tests and integration-style server
rendering of the existing synchronous presentation components. Use Playwright
with Chromium for a small route/navigation/browser suite. These two dependencies
cover distinct levels; DOM emulation and React Testing Library are unnecessary
for the current read-only interface. Async Course Page behavior is covered in
the browser, consistent with Next.js testing guidance.

## Data and security boundary

Tests consume only the committed synthetic/static fixture. Browser tests run
against a local Next.js server and use no credentials or external application
data. Future private-resource tests can add distinct users and assert owner
access, cross-user denial, and anonymous denial at the server boundary; no such
behavior is invented now. Lockfile review and `npm audit` apply to the new
dependencies (SEC-SUPPLY-001/002/003; T15).

## Acceptance criteria

- Repeatable unit tests independently challenge Today filtering, authored order,
  upcoming Assignment sorting, task/Assignment date separation, and progress.
- Integration-style tests check fixture relationships and actual rendered
  missing-duration/zero-task behavior without mirroring markup.
- A small Chromium suite checks all five primary routes, Course selection,
  unknown Course 404, navigation, narrow viewport, keyboard operation, and
  cross-view Today/Next Action consistency.
- `npm test` and `npm run test:e2e` are clear scripts; existing lint,
  typecheck, and production build continue to pass.
- `npm ci`, lint, typecheck, tests, browser tests, and build pass. Test design is
  inspected for meaningful assertions and false positives.

## Completion boundary

No authentication, persistence, uploads, AI, or Milestone 2 behavior. SD-010 CI
and SD-011 security automation remain separate tasks.
