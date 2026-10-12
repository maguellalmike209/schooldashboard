# ICM Next — Candidate State and Interface Contracts

**Status:** TYPE/STATE DESIGN ONLY (M1). Not a JSON-schema migration, database migration or executable grant. No current parser/status values are changed.

## 1. Record envelope

Every future durable control-plane record should carry at least:

```json
{
  "schemaVersion": 1,
  "id": "example-stable-id",
  "kind": "Outcome | Milestone | WorkItem | Invocation | Evidence | Grant",
  "parentId": null,
  "revision": 1,
  "state": "PROPOSED",
  "createdAt": "ISO-8601-UTC",
  "updatedAt": "ISO-8601-UTC",
  "actor": "authenticated-or-observed-actor-reference",
  "authorityRef": null,
  "evidenceRefs": []
}
```

**Example only; JSON string enums are illustrative** and `ISO-8601-UTC` is a placeholder, not a parseable timestamp. Precise, closed schemas with validation and migration tests belong to M2. The actor field must derive from an independent authenticated source when establishing authority, not from model text.

## 2. Target transitions

| Entity | Candidate transitions | Admission evidence |
| --- | --- | --- |
| Outcome | PROPOSED → APPROVED → ACTIVE → MASTER_VERIFY → VERIFIED_COMPLETE | Authenticated founder approval, external authority, final Master Verify |
| Outcome exceptional | ACTIVE/MASTER_VERIFY → PAUSED/BLOCKED/REVOKED | Current owner state or independent blocker proof |
| Milestone | CANDIDATE → ACCEPTED → ACTIVE → MASTER_VERIFY → COMPLETE | Approved parent, admitted work, exact Master Verify evidence |
| Milestone repair | MASTER_VERIFY → NEEDS_WORK → ACTIVE | Failed criterion, evidence-linked authorized repair |
| Work item | CANDIDATE → ELIGIBLE → PLAN → BUILD → VERIFY → PR_CI_PENDING → INTEGRATED | Trusted delegated admission or exact-ID grant, frozen acceptance, verified SHA, hosted PR/CI |
| Work item exceptional | PLAN/BUILD/VERIFY/PR_CI_PENDING → BLOCKED/CANCELLED | Source and authority/recovery proof |
| Invocation | REQUESTED → ADMITTED → RUNNING → RECONCILING → STOPPED | Request identity, broker admission, lock/child lease, journal/CI evidence |

Invalid or ambiguous transitions must fail closed. States and actor rules are proposed; no runtime implementation is claimed here. In particular, `ELIGIBLE` is **not** a new value to insert in current `docs/TASKS.md` or SD-018 inspector until M2 adapter/parser acceptance.

## 3. Transition invariant candidates

- A child record cannot change its parent ID or accepted constraints without a new approved revision and independent provenance.
- A builder may propose a candidate but cannot issue its own admission/approval event.
- A frozen acceptance digest cannot be redefined by a subsequent model output or source-tree edit alone.
- An integrated item must refer to the exact tested head, required check identities and canonical integration observation.
- A COMPLETE milestone must include Master Verify of user-facing acceptance at an observed integrated version, not a mere all-items-done count.
- A revoked/expired outcome stops further new write effects; unfinished evidence is retained for recovery.
- Journals and event streams are independently owned; a hash or checksum is not authentication.
- Repeated requests must not consume extra task budget or start two workers; exact semantics tested at M2/M3.

## 4. Migration adapters (future)

Map historical `SD-XXX` tasks to preserved evidence and a legacy reference. Do not silently convert historical completion statuses to new enums or re-approve tasks. Adapter must represent `VERIFY PASSED LOCAL / PR PENDING / INTEGRATED` without claiming merged status early. SD-020's draft fixture components should be independently reviewed and reused only where trusted, not imported as a live runtime by default.

## 5. Contract acceptance in M1

Review these transitions and invariants against actual legacy constraints, identify rejected/unmapped states, and record unresolved alternatives. M1 does **not** implement parser, migrations, grant minting, scheduler configuration, reviewer identity or independent Windows isolation.
