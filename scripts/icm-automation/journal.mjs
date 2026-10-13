import { createHash } from 'node:crypto';
import { open, readFile } from 'node:fs/promises';

export const EVENTS = new Set(['REQUESTED', 'DENIED', 'LOCK_ACQUIRED', 'GRANT_VALIDATED',
  'RECOVERY_REQUIRED', 'PLAN_STARTED', 'BUILD_STARTED', 'VERIFY_PENDING', 'VERIFY_FAILED',
  'VERIFY_PASSED_LOCAL', 'PR_PENDING', 'INTEGRATED', 'BLOCKED', 'REVOKED', 'RUN_STOPPED']);
const SHA = /^[a-f0-9]{64}$/;
const sha = value => createHash('sha256').update(value).digest('hex');
const keys = ['schemaVersion', 'sequence', 'invocationId', 'recordedAt', 'grantId', 'grantRevision',
  'taskId', 'event', 'repo', 'branch', 'head', 'stage', 'evidenceRefs', 'nextSafeAction', 'previousHash', 'hash'];
const exact = x => x && typeof x === 'object' && !Array.isArray(x) &&
  Object.keys(x).sort().join('|') === [...keys].sort().join('|');
function validate(row, sequence, previousHash) {
  if (!exact(row) || row.schemaVersion !== 1 || row.sequence !== sequence ||
      row.previousHash !== previousHash || !SHA.test(row.hash ?? '') ||
      typeof row.invocationId !== 'string' || !/^[\w-]{1,100}$/.test(row.invocationId) ||
      !Number.isFinite(Date.parse(row.recordedAt)) || new Date(row.recordedAt).toISOString() !== row.recordedAt ||
      typeof row.grantId !== 'string' || row.grantId.length > 200 ||
      !Number.isSafeInteger(row.grantRevision) || row.grantRevision < 0 ||
      (row.taskId !== null && !/^SD-\d{3}$/.test(row.taskId)) || !EVENTS.has(row.event) ||
      typeof row.repo !== 'string' || row.repo.length > 200 ||
      typeof row.branch !== 'string' || row.branch.length > 200 ||
      (row.head !== null && !/^[a-f0-9]{40}$/.test(row.head)) ||
      (row.stage !== null && !['Plan', 'Build', 'Verify'].includes(row.stage)) ||
      !Array.isArray(row.evidenceRefs) || row.evidenceRefs.length > 20 ||
      row.evidenceRefs.some(x => typeof x !== 'string' || x.length > 500) ||
      typeof row.nextSafeAction !== 'string' || row.nextSafeAction.length > 1000) {
    throw new Error('journal record invalid');
  }
  const { hash, ...body } = row;
  if (sha(JSON.stringify(body)) !== hash) throw new Error('journal integrity mismatch');
}

export async function readJournal(path) {
  let raw;
  try { raw = await readFile(path, 'utf8'); } catch (error) {
    if (error.code === 'ENOENT') return [];
    throw error;
  }
  if (Buffer.byteLength(raw) > 16 * 1024 * 1024 || (raw.length > 0 && !raw.endsWith('\n'))) {
    throw new Error('journal truncated or oversized');
  }
  const lines = raw ? raw.trimEnd().split('\n') : [];
  const rows = [];
  let previousHash = '0'.repeat(64);
  for (const [index, line] of lines.entries()) {
    let row;
    try { row = JSON.parse(line); } catch { throw new Error('journal JSON corrupt'); }
    validate(row, index + 1, previousHash);
    previousHash = row.hash;
    rows.push(row);
  }
  return rows;
}

export async function appendJournal(path, record) {
  const rows = await readJournal(path);
  const body = {
    schemaVersion: 1, sequence: rows.length + 1,
    invocationId: record.invocationId, recordedAt: record.recordedAt ?? new Date().toISOString(),
    grantId: record.grantId ?? '', grantRevision: record.grantRevision ?? 0,
    taskId: record.taskId ?? null, event: record.event, repo: record.repo ?? '',
    branch: record.branch ?? '', head: record.head ?? null, stage: record.stage ?? null,
    evidenceRefs: record.evidenceRefs ?? [], nextSafeAction: record.nextSafeAction ?? '',
    previousHash: rows.at(-1)?.hash ?? '0'.repeat(64),
  };
  const row = { ...body, hash: sha(JSON.stringify(body)) };
  validate(row, row.sequence, row.previousHash);
  const handle = await open(path, 'a', 0o600);
  try { await handle.writeFile(`${JSON.stringify(row)}\n`); await handle.sync(); }
  finally { await handle.close(); }
  return row;
}
