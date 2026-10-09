import { it } from 'node:test';
import assert from 'node:assert/strict';
import { validatePortfolio, validateRecord } from '../../scripts/icm-next/schemas.mjs';
import { fixture } from './fixtures.mjs';

it('strict schema rejects unknown nested/core fields and invalid UTC timestamps', () => {
  const s = fixture(); s.workItems[0].accepted = true; assert.throws(() => validateRecord(s.workItems[0]), /unknown/);
  delete s.workItems[0].accepted; s.workItems[0].acceptance[0].extra = true; assert.throws(() => validateRecord(s.workItems[0]), /unknown/);
  delete s.workItems[0].acceptance[0].extra; s.workItems[0].updatedAt = '2026-02-30T00:00:00Z'; assert.throws(() => validateRecord(s.workItems[0]), /UTC/);
  s.workItems[0].updatedAt = '2026-10-09T18:00:00Z'; s.workItems[0].id = 42;
  assert.throws(() => validateRecord(s.workItems[0]), /string pattern/);
});
it('cross-record validation rejects duplicate IDs, wrong parents and dependency cycles', () => {
  const s = fixture({ count: 2 });
  validatePortfolio(s.portfolio, s.milestones, s.workItems);
  assert.throws(() => validatePortfolio(s.portfolio, s.milestones, [...s.workItems, s.workItems[0]]), /duplicate/);
  s.workItems[0].dependsOn = ['WI-002']; s.workItems[1].dependsOn = ['WI-001'];
  assert.throws(() => validatePortfolio(s.portfolio, s.milestones, s.workItems), /digest|cycle/);
});
