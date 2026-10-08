#!/usr/bin/env node
import { resolve } from 'node:path';
import { inspectRepository } from './inspect.mjs';
import { inspectState } from './core.mjs';
import { renderReport } from './report.mjs';

const [command = 'report', extra] = process.argv.slice(2);
if (!['inspect', 'report'].includes(command) || extra) {
  process.stderr.write('Usage: node scripts/icm-automation/cli.mjs [inspect|report]\n');
  process.exit(2);
}
const root = resolve(import.meta.dirname, '..', '..');
const observation = await inspectRepository(root);
const decision = inspectState({ repo: observation, tasks: observation.acceptedTasks, legacyCompletedIds: observation.historicalCompletedIds, grant: null, now: observation.observedAt });
if (command === 'inspect') process.stdout.write(`${JSON.stringify({ observation, decision }, null, 2)}\n`);
else process.stdout.write(renderReport({ observation, decision }));
