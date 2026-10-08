import { execFileSync } from 'node:child_process';
import { readFile, readdir, realpath } from 'node:fs/promises';
import { join } from 'node:path';
import { parseTasks } from './core.mjs';

function git(root, args) {
  try { return execFileSync('git', ['--no-optional-locks', '-C', root, ...args], { encoding: 'utf8', timeout: 5000, stdio: ['ignore', 'pipe', 'ignore'] }).trim(); }
  catch { return null; }
}
function githubIdentity(url) {
  const match = url?.match(/^(?:git@github\.com:|https:\/\/github\.com\/)([\w.-]+\/[\w.-]+?)(?:\.git)?$/i);
  return match ? match[1].toLowerCase() : null;
}

export async function inspectRepository(root) {
  const checkout = await realpath(root);
  const branch = git(root, ['symbolic-ref', '--quiet', '--short', 'HEAD']);
  const head = git(root, ['rev-parse', 'HEAD']);
  const remoteUrl = git(root, ['remote', 'get-url', 'origin']);
  const upstream = git(root, ['rev-parse', '--abbrev-ref', '--symbolic-full-name', '@{upstream}']);
  const status = git(root, ['status', '--porcelain=v1', '--untracked-files=normal']);
  const tracking = upstream ? git(root, ['rev-list', '--left-right', '--count', `${upstream}...HEAD`]) : null;
  const [behind, ahead] = tracking?.split(/\s+/).map(Number) ?? [null, null];
  const remoteStatus = behind === 0 && ahead === 0 ? 'LOCAL_TRACKING_EQUAL' :
    behind > 0 && ahead > 0 ? 'DIVERGED' : behind > 0 ? 'AHEAD' : ahead > 0 ? 'LOCAL_AHEAD' : 'UNKNOWN';
  const taskText = await readFile(join(root, 'docs', 'TASKS.md'), 'utf8');
  const tasks = parseTasks(taskText);
  const completedSection = taskText.match(/Completed tasks:\s*\r?\n([\s\S]*?)(?:\r?\n\r?\n)/);
  const historicalCompletedIds = completedSection ?
    [...completedSection[1].matchAll(/^- (SD-\d{3}|SEC-[A-Z0-9-]+)$/gm)].map(match => match[1]) : [];
  const verifyFiles = await readdir(join(root, 'icm', '03_verify', 'output'));
  return {
    observedAt: new Date().toISOString(),
    repository: githubIdentity(remoteUrl), branch, head, checkout,
    dirty: status === null ? null : status.length > 0,
    changedEntries: status === null ? null : status.split(/\r?\n/).filter(Boolean).length,
    remoteUrl: remoteUrl ?? 'UNKNOWN', upstream: upstream ?? 'UNKNOWN',
    localTracking: { behind, ahead, status: remoteStatus },
    remoteStatus: 'UNKNOWN', // No live canonical GitHub query was made.
    acceptedTasks: tasks,
    historicalCompletedIds,
    verificationArtifacts: verifyFiles.filter(name => /verification\.md$/i.test(name)).sort(),
    authorization: 'NONE',
  };
}
