import { randomUUID } from 'node:crypto';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadBoundGrant, validateRepositoryIdentity } from './grant-store.mjs';
import { acquireBrokerLock } from './lock.mjs';
import { appendJournal, readJournal } from './journal.mjs';
import { decideBrokerState } from './policy.mjs';
import { runFakeCodexExec } from './worker.mjs';

// This repository entrypoint is deliberately incapable of launching a real
// worker. The binding/observation arguments exist solely for disposable tests.
// A protected installation must authenticate its own config and OS identity.
export async function evaluateFixtureBroker({ binding, repo, tasks, now = new Date().toISOString(),
  usage, checkpoint = null, evidence = {}, legacyCompletedIds = [], remotePR = null }) {
  let grant;
  try { grant = await loadBoundGrant(binding); }
  catch (error) { return { status: 'STOP_GRANT_INVALID', reason: error.message, workerStarted: false }; }
  let lock;
  try { lock = await acquireBrokerLock(binding.stateRoot); }
  catch (error) { return { status: 'STOP_LOCK_UNCERTAIN', reason: error.message, workerStarted: false }; }
  try {
    // Re-read protected authority while the sole-writer lock is held. A grant
    // changed between preflight and lock is denied, never silently accepted.
    grant = await loadBoundGrant(binding);
    validateRepositoryIdentity(binding, repo);
    const journalPath = join(binding.stateRoot, 'journal.jsonl');
    const journal = await readJournal(journalPath);
    const decision = decideBrokerState({ grant, tasks, repo, now, usage, checkpoint, evidence,
      journal, legacyCompletedIds, remotePR, requiredChecks: binding.requiredChecks });
    const invocationId = randomUUID();
    await appendJournal(journalPath, {
      invocationId, event: decision.status === 'READY_TO_PLAN' ? 'REQUESTED' :
        decision.status === 'RECOVERY_REQUIRED' ? 'RECOVERY_REQUIRED' :
        decision.status === 'PR_CI_PENDING' ? 'PR_PENDING' :
        decision.status === 'INTEGRATION_BLOCKED' ? 'BLOCKED' :
        decision.status === 'STOP_GRANT_PAUSED_OR_REVOKED' ? 'REVOKED' :
        decision.status === 'NO_AUTHORIZED_WORK' ? 'RUN_STOPPED' : 'DENIED',
      grantId: grant.id, grantRevision: grant.revision, taskId: decision.taskId,
      repo: repo.repository, branch: repo.branch, head: repo.head, stage: decision.stage,
      nextSafeAction: decision.nextAction,
    });
    return { ...decision, workerStarted: false, invocationId };
  } catch (error) {
    return { status: 'RECOVERY_REQUIRED', reason: error.message, workerStarted: false };
  } finally {
    await lock.release({ childrenStopped: true }); // No worker is ever spawned here.
  }
}

// Process-lifecycle probe for disposable roots only. Even a successful fake
// child cannot prove descendant containment, so this deliberately strands its
// lock for operator/test cleanup. It cannot launch the real Codex executable.
export async function exerciseFixtureWorker({ binding, repo, tasks, usage, prompt, executable,
  executableArgs = [], pollMs = 50, now = new Date().toISOString() }) {
  const grant = await loadBoundGrant(binding);
  const lock = await acquireBrokerLock(binding.stateRoot);
  let workerStarted = false;
  try {
    validateRepositoryIdentity(binding, repo);
    const decision = decideBrokerState({ grant, tasks, repo, usage, now, journal: [] });
    if (decision.status !== 'READY_TO_PLAN') {
      await lock.release({ childrenStopped: true });
      return { ...decision, workerStarted: false };
    }
    const journalPath = join(binding.stateRoot, 'journal.jsonl');
    const invocationId = randomUUID();
    await appendJournal(journalPath, { invocationId, event: 'PLAN_STARTED', grantId: grant.id,
      grantRevision: grant.revision, taskId: decision.taskId, repo: repo.repository,
      branch: repo.branch, head: repo.head, stage: 'Plan', nextSafeAction: 'Reconcile same task after interruption' });
    const controller = new AbortController();
    let authorityChanged = false;
    let checking = false;
    const check = async () => {
      if (checking) return;
      checking = true;
      try {
        const latest = await loadBoundGrant(binding);
        if (latest.paused || latest.revoked) throw new Error('grant paused or revoked');
      } catch { authorityChanged = true; controller.abort(); }
      finally { checking = false; }
    };
    await check();
    if (authorityChanged) {
      await lock.release({ childrenStopped: true });
      return { status: 'STOP_GRANT_PAUSED_OR_REVOKED', workerStarted: false };
    }
    const timer = setInterval(check, pollMs);
    workerStarted = true;
    let result;
    try { result = await runFakeCodexExec({ executable, executableArgs, workspace: binding.workerRoot,
      prompt, maxWallMs: binding.maxWallMs, signal: controller.signal }); }
    finally { clearInterval(timer); }
    await appendJournal(journalPath, { invocationId, event: authorityChanged ? 'REVOKED' : 'BLOCKED',
      grantId: grant.id, grantRevision: grant.revision, taskId: decision.taskId,
      repo: repo.repository, branch: repo.branch, head: repo.head, stage: 'Plan',
      nextSafeAction: 'Operator must prove child tree stopped before clearing fixture lock' });
    return { status: authorityChanged ? 'STOP_GRANT_PAUSED_OR_REVOKED' : 'STOP_LOCK_UNCERTAIN',
      workerStarted, result, lockHeld: true };
  } catch (error) {
    if (!workerStarted) await lock.release({ childrenStopped: true });
    throw error;
  }
}

if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) {
  process.stderr.write('Disabled foundation: no standalone broker execution or live grant is installed.\n');
  process.exitCode = 2;
}
