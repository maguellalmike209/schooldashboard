import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { buildShadowCatalog } from './shadow-catalog.mjs';
import { replayCatalog } from '../../scripts/icm-next/shadow-replay.mjs';
import { summarizeReplay, managerReplaySummary } from '../../scripts/icm-next/shadow-report.mjs';
import { assessOfflineSnapshot } from '../../scripts/icm-next/engine.mjs';
import { inspectState } from '../../scripts/icm-automation/core.mjs';
import { loadReplayFixture } from '../../scripts/icm-next/shadow-cli.mjs';

const fixtures = buildShadowCatalog();
const results = replayCatalog(fixtures);
const byId = Object.fromEntries(results.map(x => [x.fixtureId, x]));

describe('35 frozen substantive shadow comparisons', () => {
  it('all fixtures execute and assert their safety classification', () => {
    assert.ok(fixtures.length >= 30); assert.equal(results.length, fixtures.length);
    for (const [i, f] of fixtures.entries()) {
      assert.equal(results[i].fixtureId, f.fixtureId); assert.equal(results[i].classification, f.expectedClassification, `${f.fixtureId}: ${f.intent}`);
      assert.match(results[i].fixtureSha256, /^[a-f0-9]{64}$/);
      assert.match(results[i].legacy.sourceSha, /^[a-f0-9]{64}$/); assert.match(results[i].next.sourceSha, /^[a-f0-9]{64}$/);
    }
  });
  it('covers every old selector state and every new decision enum', () => {
    assert.deepEqual(new Set(results.map(x => x.legacy.decision)), new Set(['STOP', 'NO AUTHORIZED WORK', 'RECOVER', 'SELECT', 'INTEGRATION PENDING', 'INTEGRATION BLOCKED']));
    assert.deepEqual(new Set(results.map(x => x.next.decision)), new Set(['STOP', 'NO_AUTHORIZED_WORK', 'RECOVER', 'WAIT_PR_CI', 'PLAN_CANDIDATE',
      'SELECT_BOUND_ITEM', 'MASTER_VERIFY_PENDING', 'MILESTONE_NEEDS_WORK', 'OUTCOME_COMPLETE']));
  });
  it('has no unresolved unsafe increase and keeps unknown comparison denied', () => {
    const summary = summarizeReplay(results); assert.equal(summary.total, 35); assert.equal(summary.counts.UNSAFE_REGRESSION, 0);
    assert.equal(summary.counts.NOT_COMPARABLE, 1); assert.equal(byId.C35.safetyDisposition, 'DENY_UNKNOWN');
    assert.match(managerReplaySummary(summary), /35 frozen comparisons/);
  });
  it('P01 same denial, P02 stricter stop, P04 unrepresentable time, P05 Master failure', () => {
    assert.equal(byId.C02.classification, 'EQUIVALENT_SAFE');
    assert.equal(byId.C29.classification, 'STRICTER_SAFE');
    assert.equal(byId.C35.classification, 'NOT_COMPARABLE');
    assert.equal(byId.C25.next.decision, 'MILESTONE_NEEDS_WORK');
  });
  it('P06 old root and inspector remain functional; P07 replay makes no source or Git mutation', () => {
    const paths = ['AGENTS.md', 'CONTEXT.md', 'scripts/icm-automation/core.mjs', '.git/HEAD'];
    const before = paths.map(x => readFileSync(x).toString('hex'));
    assert.equal(inspectState(fixtures[0].legacy).state, 'SELECT');
    replayCatalog(fixtures);
    assert.deepEqual(paths.map(x => readFileSync(x).toString('hex')), before);
  });
  it('P08 proposed candidate never becomes executable or an admitted work item', () => {
    assert.equal(byId.C03.next.decision, 'PLAN_CANDIDATE');
    const next = assessOfflineSnapshot(fixtures.find(x => x.fixtureId === 'C03').next);
    assert.ok(next.proposedChanges.length > 0); assert.ok(next.proposedChanges.every(x => x.executable === false));
  });
  it('replay is byte-stable and does not alter frozen snapshots', () => {
    const before = JSON.stringify(fixtures);
    const expected = JSON.stringify(results);
    for (let i = 0; i < 10; i++) assert.equal(JSON.stringify(replayCatalog(buildShadowCatalog())), expected);
    assert.equal(JSON.stringify(fixtures), before);
  });
  it('CLI fixture loader accepts only explicit synthetic JSON under test fixtures', async () => {
    const loaded = await loadReplayFixture('tests/icm-next/fixtures/shadow-catalog.json');
    assert.equal(loaded.length, 35);
    await assert.rejects(() => loadReplayFixture('AGENTS.md'), /Only tests/);
  });
});
