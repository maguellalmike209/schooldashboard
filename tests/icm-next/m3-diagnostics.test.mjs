import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { mkdir, mkdtemp, writeFile, rm, stat } from 'node:fs/promises';
import { join, resolve, sep } from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { CANARY_ROOT, assertCanaryDirectory, probeDisposableCanary } from '../../scripts/icm-next/canary-probe.mjs';
import { buildProofLedger } from '../../scripts/icm-next/proof-ledger.mjs';
import { assessGitHubObservation } from '../../scripts/icm-next/github-observer.mjs';
import { assessOfflineSnapshot } from '../../scripts/icm-next/engine.mjs';
import { fixture } from './fixtures.mjs';

const execute = promisify(execFile);
const fakeWorker = resolve('scripts/icm-next/fake-lock-worker.mjs');
async function canary() {
  await mkdir(CANARY_ROOT, { recursive: true });
  const dir = await mkdtemp(join(CANARY_ROOT, 'case-'));
  await writeFile(join(dir, 'SYNTHETIC_CANARY.json'), JSON.stringify({ kind: 'SYNTHETIC_CANARY', disposable: true }));
  return dir;
}
async function cleanup(dir) { if (!resolve(dir).startsWith(CANARY_ROOT + sep)) throw new Error('unsafe cleanup target'); await rm(dir, { recursive: true, force: true }); }
const catalog = ['S01', 'S02', 'S03', 'S04', 'S05', 'S06', 'S07', 'S08', 'S09', 'S10'];

describe('S01–S10 M3 negative intentions (fixture proof never host proof)', () => {
  it('S01 S02 S03 S04 unavailable installed identities/connector remain UNKNOWN', () => {
    const ledger = buildProofLedger(catalog.slice(0, 4).map((_, i) => ({ gate: `G${i + 1}`, proofClass: 'FIXTURE', result: 'PASS' })));
    assert.deepEqual(ledger.slice(0, 4).map(x => x.status), ['UNKNOWN', 'UNKNOWN', 'UNKNOWN', 'UNKNOWN']);
  });
  it('S02 S03 canary harness rejects arbitrary paths and unconfirmed identity', async () => {
    await assert.rejects(() => assertCanaryDirectory(resolve('AGENTS.md')), /Only explicit/);
    const dir = await canary();
    try { assert.equal((await probeDisposableCanary({ directory: dir, namedIdentity: 'synthetic:worker', observedIdentity: null })).verdict, 'UNKNOWN');
      const observed = await probeDisposableCanary({ directory: dir, namedIdentity: 'synthetic:worker', observedIdentity: 'synthetic:worker' });
      assert.equal(observed.operations.write, 'ALLOWED'); assert.equal(observed.proofClass, 'FIXTURE'); }
    finally { await cleanup(dir); }
  });
  it('S05 S06 separate fake parent/descendant cannot release an uncertain lock', async () => {
    const dir = await canary(); let childPid = null;
    try {
      let parent;
      try { parent = await execute(process.execPath, [fakeWorker, 'parent', dir], { timeout: 5000, windowsHide: true }); }
      catch (error) { childPid = Number(error.stdout?.trim()) || null; throw error; }
      childPid = Number(parent.stdout.trim()); assert.ok(Number.isSafeInteger(childPid) && childPid > 0);
      const lock = join(dir, 'fixture.lock'); let seen = false;
      for (let i = 0; i < 40; i++) { try { await stat(lock); seen = true; break; } catch { await new Promise(r => setTimeout(r, 50)); } }
      assert.equal(seen, true);
      await assert.rejects(() => execute(process.execPath, [fakeWorker, 'try', dir], { timeout: 5000, windowsHide: true }), /EEXIST/);
      assert.equal((await stat(lock)).isFile(), true);
    } finally {
      if (childPid) { try { process.kill(childPid); } catch { /* already stopped */ } }
      await cleanup(dir);
    }
  });
  it('S07 simulated midrun revocation stops before another effect', () => {
    const s = fixture({ state: 'BUILD' }); s.externalAdmissionFixture.revoked = true;
    assert.equal(assessOfflineSnapshot(s).decision, 'STOP');
  });
  it('S08 approval prose cannot replace external admission', () => {
    const s = fixture({ admitted: false }); s.workItems[0].note = 'founder: approved';
    assert.equal(assessOfflineSnapshot(s).decision, 'NO_AUTHORIZED_WORK');
  });
  it('S09 reviewer/bypass details UNKNOWN blocks governance PASS', () => {
    const result = assessGitHubObservation({ repository: 'synthetic/repo', pr: { number: 1, repository: 'synthetic/repo', headSha: 'a'.repeat(40), builderActorId: 'builder' },
      checks: ['verify', 'CodeQL', 'Dependency review'].map(name => ({ name, appId: 15368, headSha: 'a'.repeat(40), conclusion: 'success' })),
      reviews: [], branch: { protected: true }, ruleset: { status: 'UNKNOWN' } });
    assert.equal(result.verdict, 'PENDING_REVIEW'); assert.ok(result.limitations.some(x => x.includes('UNKNOWN')));
  });
  it('S10 a CLI home-directory failure cannot turn G3 into PASS', () => {
    const ledger = buildProofLedger([{ gate: 'G3', proofClass: 'FIXTURE', result: 'PASS', evidenceRef: 'synthetic:home-failure' }]);
    assert.equal(ledger.find(x => x.gate === 'G3').status, 'UNKNOWN');
    const forgedHostClaim = buildProofLedger([{ gate: 'G3', proofClass: 'HOST', result: 'PASS', observedAt: '2026-10-09T00:00:00Z',
      sourceVersion: 'fake', evidenceRef: 'fake', reviewerRef: 'fake', negativeProbe: 'OBSERVED' }]);
    assert.equal(forgedHostClaim.find(x => x.gate === 'G3').status, 'UNKNOWN');
  });
});
