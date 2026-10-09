import { it } from 'node:test';
import assert from 'node:assert/strict';
import { assessMasterVerify } from '../../scripts/icm-next/master-verify.mjs';
import { fixture, masterFor, CANONICAL } from './fixtures.mjs';

it('Master Verify requires frozen digest, exact integrated SHA and distinct actor evidence', () => {
  const s = fixture(); const [m] = s.milestones, [o] = s.portfolio;
  assert.equal(assessMasterVerify(m, o, masterFor(s), CANONICAL).verdict, 'PASS');
  assert.equal(assessMasterVerify(m, o, masterFor(s, { negativeRefs: [] }), CANONICAL).verdict, 'PENDING');
  assert.equal(assessMasterVerify(m, o, masterFor(s, { codeSha: 'c'.repeat(40) }), CANONICAL).verdict, 'PENDING');
  const forged = masterFor(s); forged.reviewerActorId = forged.builderActorId; forged.independentReviewer = true;
  assert.equal(assessMasterVerify(m, o, forged, CANONICAL).verdict, 'PENDING');
  assert.equal(assessMasterVerify(m, o, masterFor(s, { failedCriteria: ['C1'] }), CANONICAL).verdict, 'NEEDS_WORK');
});
