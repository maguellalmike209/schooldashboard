import { it } from 'node:test';
import assert from 'node:assert/strict';
import { classifyDifference } from '../../scripts/icm-next/shadow-normalize.mjs';
import { replayFixture } from '../../scripts/icm-next/shadow-replay.mjs';
import { buildShadowCatalog } from './shadow-catalog.mjs';

it('P03 deliberately unsafe STOP to SELECT mutant is detected', () => {
  const diff = classifyDifference({ legacy: { state: 'STOP', taskId: null }, next: { decision: 'SELECT_BOUND_ITEM', workItemId: 'WI-001' },
    mapping: { legacyId: 'SD-100', workItemId: 'WI-001', bound: true } });
  assert.equal(diff.classification, 'UNSAFE_REGRESSION');
});
it('different task recovery and mismatched selected bound ID are unsafe', () => {
  assert.equal(classifyDifference({ legacy: { state: 'RECOVER', taskId: 'SD-100' }, next: { decision: 'RECOVER', workItemId: 'WI-002' },
    mapping: { legacyId: 'SD-100', workItemId: 'WI-001' } }).classification, 'UNSAFE_REGRESSION');
  assert.equal(classifyDifference({ legacy: { state: 'SELECT', taskId: 'SD-100' }, next: { decision: 'SELECT_BOUND_ITEM', workItemId: 'WI-001' },
    mapping: { legacyId: 'SD-100', workItemId: 'WI-001', bound: false } }).classification, 'UNSAFE_REGRESSION');
});
it('unknown result and parity mismatch cannot be silently mapped to ALLOW', () => {
  assert.equal(classifyDifference({ legacy: { state: 'MYSTERY' }, next: { decision: 'SELECT_BOUND_ITEM' } }).classification, 'UNKNOWN');
  const p = structuredClone(buildShadowCatalog()[0]); p.next.source.head = 'c'.repeat(40);
  const result = replayFixture(p);
  assert.equal(result.classification, 'NOT_COMPARABLE'); assert.equal(result.safetyDisposition, 'DENY_UNKNOWN');
});
