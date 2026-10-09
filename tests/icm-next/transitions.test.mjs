import { it } from 'node:test';
import assert from 'node:assert/strict';
import { assessTransition } from '../../scripts/icm-next/transitions.mjs';

const external = { sourceKind: 'SYNTHETIC_EXTERNAL_OBSERVATION', ref: 'synthetic:ref', actorRef: 'synthetic:actor' };
it('closed transitions reject self approval, direct integration and completion without Master Verify', () => {
  assert.equal(assessTransition({ kind: 'WorkItem', from: 'CANDIDATE', to: 'ELIGIBLE' }).allowed, false);
  assert.equal(assessTransition({ kind: 'WorkItem', from: 'BUILD', to: 'INTEGRATED', evidence: external }).allowed, false);
  assert.equal(assessTransition({ kind: 'Milestone', from: 'MASTER_VERIFY', to: 'COMPLETE', evidence: external }).code, 'MASTER_VERIFY_REQUIRED');
  assert.equal(assessTransition({ kind: 'Outcome', from: 'PAUSED', to: 'ACTIVE', evidence: external }).code, 'NEW_OWNER_REVISION_REQUIRED');
  assert.equal(assessTransition({ kind: 'WorkItem', from: 'CANDIDATE', to: 'ELIGIBLE', evidence: external }).allowed, true);
  assert.equal(assessTransition({ kind: 'WorkItem', from: 'PR_CI_PENDING', to: 'INTEGRATED', evidence: { ...external, exactHeadIntegrated: true } }).allowed, true);
});
