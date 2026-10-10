import { digestCandidate, validateV2Envelope } from './delegation-v2.mjs';

const deny = code => Object.freeze({ decision: 'DENY', code, proofClass: 'OFFLINE_ONLY', launchCapability: false });

// This models a CAS transaction. The caller must provide the latest fixture
// sequence; it is not a durable atomic store or a live budget enforcer.
export function reserveFixture({ ledger, envelope, candidate, admission, invocationId, expectedSequence, now }) {
  try { validateV2Envelope(envelope); } catch { return deny('SCHEMA_INVALID'); }
  if (!ledger || ledger.proofClass !== 'OFFLINE_FIXTURE' || ledger.known !== true ||
      !Number.isSafeInteger(ledger.sequence) || ledger.sequence !== expectedSequence ||
      !Array.isArray(ledger.reservations)) return deny('LEDGER_UNKNOWN_OR_STALE');
  if (envelope?.schemaVersion !== 2 || ledger.envelopeId !== envelope.envelopeId || ledger.revision !== envelope.revision ||
      ledger.revocationEpoch !== 0 || envelope.revoked || envelope.paused) return deny('PARENT_REVOKED_OR_REVISED');
  if (admission?.decision !== 'ADMIT_FIXTURE' || admission.proofClass !== 'OFFLINE_ONLY' || admission.launchCapability !== false ||
      admission.candidateId !== candidate?.candidateId || admission.candidateDigest !== candidate?.proposalDigest) return deny('ADMISSION_MISSING');
  if (!Number.isFinite(Date.parse(now)) || Date.parse(now) >= Date.parse(envelope.expiresAt)) return deny('EXPIRED');
  if (typeof invocationId !== 'string' || !/^[A-Za-z0-9_-]{8,100}$/.test(invocationId) ||
      !candidate || candidate.proposalDigest !== digestCandidate(candidate)) return deny('IDENTITY_OR_DIGEST_MISMATCH');
  const key = `${envelope.envelopeId}@${envelope.revision}:${invocationId}:${candidate.candidateId}`;
  const existing = ledger.reservations.find(x => x.key === key);
  if (existing) return existing.candidateDigest === candidate.proposalDigest
    ? Object.freeze({ decision: 'REPLAY_NO_NEW_RESERVATION', code: 'IDEMPOTENT', proofClass: 'OFFLINE_ONLY', launchCapability: false, ledger, reservation: existing })
    : deny('REPLAY_DIGEST_CONFLICT');
  if (ledger.reservations.some(x => x.candidateId === candidate.candidateId || x.invocationId === invocationId)) return deny('DUPLICATE_CHILD_OR_INVOCATION');
  if (!Number.isSafeInteger(ledger.tasksUsed) || !Number.isSafeInteger(ledger.tasksThisRun) ||
      !Number.isSafeInteger(ledger.wallSecondsReserved) || !Number.isSafeInteger(ledger.retriesUsed) ||
      !Number.isSafeInteger(candidate.workBudgetRequested?.wallSeconds) || candidate.workBudgetRequested.wallSeconds <= 0 ||
      !Number.isSafeInteger(ledger.activeWriters) || ledger.activeWriters < 0) return deny('BUDGET_UNKNOWN');
  if (ledger.tasksUsed >= envelope.maxTasksTotal || ledger.tasksThisRun >= envelope.maxTasksPerRun ||
      ledger.wallSecondsReserved + candidate.workBudgetRequested.wallSeconds > envelope.maxWallSecondsTotal ||
      ledger.retriesUsed > envelope.maxRetriesTotal || ledger.activeWriters !== 0) return deny('BUDGET_OR_WRITER_EXHAUSTED');
  const reservation = Object.freeze({ key, envelopeId: envelope.envelopeId, revision: envelope.revision,
    candidateId: candidate.candidateId, candidateDigest: candidate.proposalDigest, invocationId,
    wallSeconds: candidate.workBudgetRequested.wallSeconds, reservedAt: now, mode: 'OFFLINE_ONLY' });
  const updated = Object.freeze({ ...ledger, sequence: ledger.sequence + 1, tasksUsed: ledger.tasksUsed + 1,
    tasksThisRun: ledger.tasksThisRun + 1, wallSecondsReserved: ledger.wallSecondsReserved + reservation.wallSeconds,
    activeWriters: 1, reservations: [...ledger.reservations, reservation] });
  return Object.freeze({ decision: 'RESERVED_FIXTURE', code: 'SIMULATED_CAS', proofClass: 'OFFLINE_ONLY', launchCapability: false, ledger: updated, reservation });
}

export function reconcileFixture({ ledger, event, expectedSequence }) {
  if (!ledger || ledger.proofClass !== 'OFFLINE_FIXTURE' || ledger.sequence !== expectedSequence || !event ||
      !['CHILD_STOPPED', 'CHILD_TREE_UNKNOWN', 'REVOKED'].includes(event.kind)) return deny('RECONCILIATION_UNKNOWN');
  const reservation = ledger.reservations?.find(x => x.key === event.reservationKey);
  if (!reservation) return deny('RESERVATION_UNKNOWN');
  if (event.kind === 'CHILD_TREE_UNKNOWN' || event.kind === 'REVOKED') return Object.freeze({ decision: 'STOP', code: 'LEASE_RETAINED', proofClass: 'OFFLINE_ONLY', launchCapability: false,
    ledger: event.kind === 'REVOKED' ? Object.freeze({ ...ledger, revoked: true }) : ledger });
  return Object.freeze({ decision: 'RECONCILED_FIXTURE', code: event.kind, proofClass: 'OFFLINE_ONLY', launchCapability: false,
    ledger: Object.freeze({ ...ledger, sequence: ledger.sequence + 1, activeWriters: 0 }) });
}
