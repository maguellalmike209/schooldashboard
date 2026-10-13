import { join } from 'node:path';
import { acquireBrokerLock } from '../../../scripts/icm-automation/lock.mjs';
import { appendJournal } from '../../../scripts/icm-automation/journal.mjs';

const [stateRoot, event, repository, branch, head] = process.argv.slice(2);
await acquireBrokerLock(stateRoot);
await appendJournal(join(stateRoot, 'journal.jsonl'), { invocationId: 'crash-probe',
  event, grantId: 'mike-batch-1', grantRevision: 1, taskId: 'SD-100', repo: repository,
  branch, head, stage: event.startsWith('PLAN') ? 'Plan' : event.startsWith('BUILD') ? 'Build' : 'Verify',
  nextSafeAction: 'Reconcile same task' });
process.exit(88); // Deliberate abrupt exit without lock release.
