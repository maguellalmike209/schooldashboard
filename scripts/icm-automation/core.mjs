import { open, readFile, unlink } from 'node:fs/promises';
import { createHash } from 'node:crypto';

const ID = /^SD-\d{3}$/;
const RISK = ['R0', 'R1', 'R2', 'R3', 'R4'];
const STATUS = ['Not started', 'In progress', 'Ready for verification', 'Done', 'Blocked'];
const STAGE = ['Plan', 'Build', 'Verify'];
const OPERATIONS = ['plan', 'build', 'verify', 'git-branch', 'git-commit', 'git-push', 'pr'];
const canonical = value => Array.isArray(value) ? value.map(canonical) : value && typeof value === 'object' ?
  Object.fromEntries(Object.keys(value).sort().map(key => [key, canonical(value[key])])) : value;
export const taskDigest = task => {
  const acceptedDefinition = { ...task };
  delete acceptedDefinition.status;
  return createHash('sha256').update(JSON.stringify(canonical(acceptedDefinition))).digest('hex');
};

function exact(value, keys, name) {
  if (!value || typeof value !== 'object' || Array.isArray(value) ||
      Object.keys(value).sort().join('|') !== [...keys].sort().join('|')) {
    throw new Error(`${name}: missing or unknown field`);
  }
}
function str(value, name) {
  if (typeof value !== 'string' || !value.trim() || value.length > 2000) throw new Error(`${name}: invalid string`);
}
function strings(value, name, { unique = false } = {}) {
  if (!Array.isArray(value) || value.some(x => typeof x !== 'string' || !x.trim() || x.length > 2000) ||
      (unique && new Set(value).size !== value.length)) throw new Error(`${name}: invalid array`);
}
function time(value, name) {
  if (typeof value !== 'string' || !/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.\d{3})?Z$/.test(value) ||
      !Number.isFinite(Date.parse(value))) throw new Error(`${name}: invalid UTC timestamp`);
  const canonicalValue = value.includes('.') ? value : value.replace('Z', '.000Z');
  if (new Date(value).toISOString() !== canonicalValue) throw new Error(`${name}: invalid UTC timestamp`);
}
function positive(value, name) {
  if (!Number.isSafeInteger(value) || value < 1) throw new Error(`${name}: invalid positive integer`);
}

export function validateTask(value) {
  exact(value, ['id', 'accepted', 'result', 'priority', 'dependencies', 'scope', 'exclusions', 'risk', 'acceptance', 'verification', 'status', 'completion'], 'task');
  if (!ID.test(value.id) || typeof value.accepted !== 'boolean') throw new Error('task: invalid identity/acceptance');
  for (const key of ['result', 'scope', 'completion']) str(value[key], `task.${key}`);
  for (const key of ['dependencies', 'exclusions', 'acceptance', 'verification']) strings(value[key], `task.${key}`, { unique: true });
  if (value.acceptance.length === 0 || value.verification.length === 0 ||
      value.dependencies.some(id => !ID.test(id) || id === value.id) ||
      !Number.isSafeInteger(value.priority) || value.priority < 1 ||
      !RISK.includes(value.risk) || !STATUS.includes(value.status)) throw new Error('task: invalid metadata');
  return value;
}

export function parseTasks(markdown) {
  const tasks = [];
  const blocks = [...markdown.matchAll(/```icm-task\s*\r?\n([\s\S]*?)\r?\n```/g)];
  for (const block of blocks) {
    let value;
    try { value = JSON.parse(block[1]); } catch { throw new Error('task: malformed JSON block'); }
    tasks.push(validateTask(value));
  }
  if (new Set(tasks.map(t => t.id)).size !== tasks.length) throw new Error('task: duplicate ID');
  return tasks;
}

export function validateGrant(value) {
  exact(value, ['schemaVersion', 'id', 'revision', 'repository', 'outcome', 'taskIds', 'taskDigests', 'order', 'maxRisk', 'operations', 'startsAt', 'expiresAt', 'paused', 'revoked', 'budgets', 'decisionBoundaries', 'blockedPolicy', 'completion'], 'grant');
  if (value.schemaVersion !== 1) throw new Error('grant: unsupported schema');
  for (const key of ['id', 'repository', 'outcome']) str(value[key], `grant.${key}`);
  positive(value.revision, 'grant.revision');
  strings(value.taskIds, 'grant.taskIds', { unique: true });
  strings(value.order, 'grant.order', { unique: true });
  strings(value.operations, 'grant.operations', { unique: true });
  strings(value.decisionBoundaries, 'grant.decisionBoundaries', { unique: true });
  if (!value.taskDigests || typeof value.taskDigests !== 'object' || Array.isArray(value.taskDigests) ||
      Object.keys(value.taskDigests).sort().join('|') !== [...value.taskIds].sort().join('|') ||
      Object.values(value.taskDigests).some(digest => typeof digest !== 'string' || !/^[a-f0-9]{64}$/.test(digest))) throw new Error('grant: invalid task digests');
  if (!value.taskIds.length || value.taskIds.some(id => !ID.test(id)) ||
      value.order.length !== value.taskIds.length || value.order.some(id => !value.taskIds.includes(id)) ||
      !RISK.includes(value.maxRisk) || value.operations.some(op => !OPERATIONS.includes(op)) ||
      typeof value.paused !== 'boolean' || typeof value.revoked !== 'boolean' ||
      !['stop-batch', 'skip-independent'].includes(value.blockedPolicy) ||
      value.completion !== 'verified-and-integrated') throw new Error('grant: invalid bounds');
  time(value.startsAt, 'grant.startsAt');
  time(value.expiresAt, 'grant.expiresAt');
  if (Date.parse(value.expiresAt) <= Date.parse(value.startsAt)) throw new Error('grant: invalid window');
  exact(value.budgets, ['maxRuns', 'maxRetries', 'maxTasksPerRun'], 'grant.budgets');
  for (const key of Object.keys(value.budgets)) {
    const count = value.budgets[key];
    if (!Number.isSafeInteger(count) || count < (key === 'maxRetries' ? 0 : 1)) {
      throw new Error(`grant.budgets.${key}: invalid bound`);
    }
  }
  return value;
}

export function validateCheckpoint(value) {
  exact(value, ['grantId', 'grantRevision', 'taskId', 'stage', 'repository', 'branch', 'head', 'checkout', 'lastStep', 'evidence', 'pending', 'blockers', 'nextAction', 'timestamp', 'result'], 'checkpoint');
  for (const key of ['grantId', 'taskId', 'repository', 'branch', 'head', 'checkout', 'lastStep', 'nextAction', 'result']) str(value[key], `checkpoint.${key}`);
  positive(value.grantRevision, 'checkpoint.grantRevision');
  if (!ID.test(value.taskId) || !STAGE.includes(value.stage)) throw new Error('checkpoint: invalid task/stage');
  if (!['active', 'waiting', 'blocked', 'integration-pending', 'interrupted', 'integrated'].includes(value.result)) {
    throw new Error('checkpoint: invalid observed result');
  }
  for (const key of ['evidence', 'pending', 'blockers']) strings(value[key], `checkpoint.${key}`);
  time(value.timestamp, 'checkpoint.timestamp');
  return value;
}

export function inspectState({ repo, tasks, legacyCompletedIds = [], grant = null, checkpoint = null, evidence = {}, usage = {}, now }) {
  const fail = (state, reason) => ({ state, reason, taskId: null, nextStage: null });
  if (!repo || !repo.repository || !repo.branch || !repo.head || !repo.checkout) return fail('STOP', 'Repository identity unavailable');
  if (typeof repo.dirty !== 'boolean') return fail('STOP', 'Working tree state unavailable');
  if (!grant) return fail('NO AUTHORIZED WORK', 'No active grant');
  try { validateGrant(grant); } catch (error) { return fail('STOP', error.message); }
  if (repo.repository !== grant.repository) return fail('STOP', 'Wrong repository');
  if (grant.revoked || grant.paused) return fail('STOP', grant.revoked ? 'Grant revoked' : 'Grant paused');
  try { time(now, 'invocation.now'); } catch (error) { return fail('STOP', error.message); }
  if (Date.parse(now) < Date.parse(grant.startsAt) || Date.parse(now) >= Date.parse(grant.expiresAt)) return fail('STOP', 'Grant outside time window');
  if (!Number.isSafeInteger(usage.runs) || !Number.isSafeInteger(usage.retries) ||
      !Number.isSafeInteger(usage.tasksThisRun) || usage.runs < 0 || usage.retries < 0 || usage.tasksThisRun < 0) return fail('STOP', 'Usage evidence unavailable');
  if (usage.runs >= grant.budgets.maxRuns ||
      (usage.retries > 0 && usage.retries >= grant.budgets.maxRetries)) return fail('STOP', 'Execution budget exhausted');
  if (usage.tasksThisRun >= grant.budgets.maxTasksPerRun) return fail('STOP', 'Per-invocation work bound reached');
  if (usage.allowance === 'exhausted') return fail('STOP', 'Runtime usage exhausted');
  if (usage.allowance !== 'available') return fail('STOP', 'Runtime usage unknown');
  if (repo.remoteStatus !== 'CURRENT') return fail('STOP', 'Canonical remote evidence unavailable or unsafe');
  const byId = new Map(tasks.map(t => [t.id, t]));
  if (byId.size !== tasks.length) return fail('STOP', 'Duplicate task ID');
  // Cross-grant dependency cycles cannot become executable, even if the task
  // registry is otherwise syntactically valid. Legacy dependencies are checked
  // against independent integration evidence at selection time.
  const visiting = new Set();
  const visited = new Set();
  const cyclic = id => {
    if (visiting.has(id)) return true;
    if (visited.has(id)) return false;
    visiting.add(id);
    for (const dep of byId.get(id)?.dependencies ?? []) {
      if (grant.taskIds.includes(dep) && cyclic(dep)) return true;
    }
    visiting.delete(id);
    visited.add(id);
    return false;
  };
  if (grant.taskIds.some(cyclic)) return fail('STOP', 'Authorized task dependencies contain a cycle');
  for (const id of grant.taskIds) {
    const task = byId.get(id);
    if (!task) return fail('STOP', `Authorized task ${id} missing from registry`);
    try { validateTask(task); } catch (error) { return fail('STOP', error.message); }
    if (taskDigest(task) !== grant.taskDigests[id]) return fail('STOP', `Task ${id} changed after authorization`);
    if (!task.accepted || RISK.indexOf(task.risk) > RISK.indexOf(grant.maxRisk)) return fail('STOP', `Task ${id} exceeds grant`);
  }
  if (checkpoint) {
    try { validateCheckpoint(checkpoint); } catch (error) { return fail('STOP', error.message); }
    if (checkpoint.grantId !== grant.id || checkpoint.grantRevision !== grant.revision ||
        !grant.taskIds.includes(checkpoint.taskId) || checkpoint.repository !== repo.repository ||
        checkpoint.branch !== repo.branch || checkpoint.head !== repo.head || checkpoint.checkout !== repo.checkout) return fail('STOP', 'Checkpoint identity or grant revision contradicts current state');
    const checkpointTask = byId.get(checkpoint.taskId);
    const checkpointProof = evidence[checkpoint.taskId] ?? {};
    if (checkpointTask.status === 'Not started' || (checkpointTask.status === 'Done' && checkpoint.result !== 'integrated')) {
      return fail('STOP', 'Checkpoint contradicts authoritative task status');
    }
    if (checkpoint.result === 'integrated' && (checkpointTask.status !== 'Done' || checkpointProof.integrated !== true)) {
      return fail('STOP', 'Checkpoint integration claim contradicts registry or evidence');
    }
    if (checkpoint.result === 'integration-pending' && (checkpointProof.verify !== 'PASS' || checkpointProof.integrated === true)) {
      return fail('STOP', 'Checkpoint pending-integration claim contradicts evidence');
    }
    if (checkpoint.result === 'blocked' && checkpointTask.status !== 'Blocked' && checkpoint.blockers.length === 0) {
      return fail('STOP', 'Checkpoint blocked claim has no supporting blocker');
    }
  }
  const done = id => {
    const task = byId.get(id);
    const proof = evidence[id];
    const registryDone = task ? task.accepted === true && task.status === 'Done' : legacyCompletedIds.includes(id);
    return registryDone && proof?.plan === true && proof?.build === true &&
      proof?.verify === 'PASS' && proof?.ci === 'PASS' && proof?.integrated === true &&
      typeof proof?.head === 'string' && proof.head.length > 0;
  };
  const unfinished = grant.order.filter(id => ['In progress', 'Ready for verification', 'Blocked'].includes(byId.get(id).status));
  for (const id of unfinished) {
    const task = byId.get(id);
    if (task.status === 'Blocked' || (checkpoint?.taskId === id && checkpoint.blockers.length > 0)) {
      if (grant.blockedPolicy === 'stop-batch') return fail('STOP', `Task ${id} blocked`);
      continue;
    }
    if (!task.dependencies.every(done)) return fail('STOP', `Unfinished ${id} no longer has proven completed dependencies`);
    const proof = evidence[id] ?? {};
    if (proof.verify === 'PASS' && proof.head !== repo.head) return fail('STOP', `Stale Verify evidence for ${id}`);
    // A locally verified task is not DONE until its protected integration is
    // independently established for this exact revision. The read-only pilot
    // reports this status; it never performs the pending Git operation.
    if (proof.verify === 'PASS' && !proof.build) return fail('STOP', `Verify claim for ${id} lacks Build evidence`);
    if (proof.verify === 'PASS' && proof.ci === 'FAIL') {
      return { state: 'INTEGRATION BLOCKED', reason: `Hosted CI failed for ${id}; inspect exact-head checks`, taskId: id, nextStage: null };
    }
    if (proof.verify === 'PASS' && proof.integrated !== true) {
      return { state: 'INTEGRATION PENDING', reason: `Verified ${id} awaits exact-head PR/CI integration proof`, taskId: id, nextStage: null };
    }
    if (proof.integrated === true && task.status !== 'Done') {
      return fail('STOP', `Task ${id} integration evidence conflicts with registry status`);
    }
    if (checkpoint && checkpoint.taskId !== id) return fail('STOP', 'Checkpoint points to another unfinished task');
    if (repo.dirty && !checkpoint) return fail('STOP', 'Dirty checkout without a matching checkpoint');
    if (checkpoint?.stage === 'Verify' && !proof.build) return fail('STOP', `Checkpoint Verify claim lacks Build evidence for ${id}`);
    if (checkpoint?.stage === 'Build' && !proof.plan) return fail('STOP', `Checkpoint Build claim lacks Plan evidence for ${id}`);
    if (!checkpoint && !proof.plan && !proof.build) return fail('STOP', `Cannot reconstruct ${id} without checkpoint or stage evidence`);
    if (repo.dirty && !proof.plan) return fail('STOP', `Dirty recovery lacks independent Plan evidence for ${id}`);
    const nextStage = proof.build ? 'Verify' : proof.plan ? 'Build' : 'Plan';
    if (!grant.operations.includes(nextStage.toLowerCase())) return fail('STOP', `${nextStage} operation not granted`);
    return { state: 'RECOVER', reason: `Resume unfinished ${id}`, taskId: id, nextStage };
  }
  if (repo.dirty) return fail('STOP', 'Dirty checkout before task selection');
  for (const id of grant.order) {
    const task = byId.get(id);
    if (task.status === 'Done') {
      if (!done(id)) return fail('STOP', `Done status lacks independent integration evidence for ${id}`);
      continue;
    }
    if (task.status !== 'Not started') continue;
    if (!task.dependencies.every(done)) {
      if (grant.blockedPolicy === 'stop-batch') return fail('STOP', `Task ${id} is awaiting verified dependencies`);
      continue;
    }
    if (grant.blockedPolicy === 'stop-batch' && unfinished.length) return fail('STOP', 'Unfinished task blocks batch');
    if (!grant.operations.includes('plan')) return fail('STOP', 'Plan operation not granted');
    return { state: 'SELECT', reason: `Next eligible authorized task ${id}`, taskId: id, nextStage: 'Plan' };
  }
  return fail('NO AUTHORIZED WORK', grant.order.every(done) ? 'All authorized tasks verified and integrated' : 'No eligible task');
}

// Test-only primitive. The future launcher must own a trusted, non-runner-writable lock path.
export async function acquireFixtureLock(path, owner) {
  const handle = await open(path, 'wx', 0o600);
  await handle.writeFile(owner);
  await handle.close();
  let released = false;
  return async () => {
    if (released) return;
    released = true;
    // Fixture-only ownership check; not a security-grade unlock protocol.
    if (await readFile(path, 'utf8') !== owner) {
      throw new Error('Fixture lock ownership changed; refusing release');
    }
    await unlink(path);
  };
}

export async function loadFixture(path) {
  return JSON.parse(await readFile(path, 'utf8'));
}
