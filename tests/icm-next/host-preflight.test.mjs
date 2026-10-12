import test from 'node:test';
import assert from 'node:assert/strict';
import { assessDisabledHostPreflight } from '../../scripts/icm-next/host-preflight.mjs';

const layout = {
  grantPath: 'C:\\ICMNext\\owner\\grant.json',
  brokerCodeRoot: 'C:\\ICMNext\\broker',
  brokerStateRoot: 'C:\\ICMNext\\state',
  checkoutRoot: 'C:\\SchoolDashboard\\canonical',
  workerRoot: 'C:\\ICMNext\\workspace',
};
const assess = (changes = {}, permission = 'NO_GITHUB_CONNECTOR') =>
  assessDisabledHostPreflight({ layout: { ...layout, ...changes }, triggerGitHubPermission: permission });

test('OP07: founder grant nested under broker-writable state is blocked', () => {
  const result = assess({ grantPath: 'C:\\ICMNext\\state\\grant.json' });
  assert.equal(result.code, 'CONTROL_PATH_OVERLAP');
  assert.equal(result.launchCapability, false);
  assert.equal(assess({ grantPath: 'c:\\icmnext\\STATE\\grant.json' }).status, 'BLOCKED');
});

test('OP04: broad scheduled GitHub capability blocks the request-only trigger', () => {
  assert.equal(assess({}, 'ALLOW_ALL_ACTIONS').code, 'TRIGGER_GITHUB_WRITE_CAPABLE');
  assert.equal(assess({}, 'WRITE_CAPABLE').status, 'BLOCKED');
});

test('uncertain, alias and overlapping paths never become host PASS', () => {
  assert.equal(assess({}, 'UNKNOWN').status, 'UNKNOWN');
  assert.equal(assess({ grantPath: 'C:\\ICMNext\\owner\\..\\state\\grant.json' }).status, 'BLOCKED');
  assert.equal(assess({ brokerCodeRoot: 'C:\\ICMNext\\workspace\\broker' }).status, 'BLOCKED');
  assert.equal(assess().status, 'HOST_PROOF_REQUIRED');
  assert.equal(assess().proofClass, 'OFFLINE_ONLY');
  assert.equal(assess().launchCapability, false);
});
