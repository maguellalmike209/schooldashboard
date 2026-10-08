#!/usr/bin/env node
// Disposable synthetic state only. This script never opens the SchoolDashboard checkout.
import { inspectState } from './core.mjs';
import { scenario, checkpoint, markDone } from '../../tests/icm-automation/fixtures.mjs';

const mode = process.argv[2] ?? 'twenty';
if (!['twenty', 'interrupted', 'continue'].includes(mode)) {
  process.stderr.write('Usage: node scripts/icm-automation/simulate.mjs [twenty|interrupted|continue]\n');
  process.exit(2);
}
const s = scenario(20);
if (mode === 'interrupted') {
  for (let i = 0; i < 8; i++) markDone(s, i);
  s.tasks[8].status = 'In progress';
  s.evidence['SD-108'] = { plan: true };
  s.checkpoint = checkpoint(s, 8);
  s.repo.dirty = true;
}
if (mode === 'continue') markDone(s, 0);
const first = inspectState(s);
const second = inspectState(s);
process.stdout.write(`${JSON.stringify({ source: 'SYNTHETIC FIXTURE', mode, authorizedCount: s.grant.taskIds.length, first, repeatedInvocation: second }, null, 2)}\n`);
