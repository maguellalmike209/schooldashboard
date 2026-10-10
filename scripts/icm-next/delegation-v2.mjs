import schema from '../../engineering/contracts/M6_GRANT_V2.schema.json' with { type: 'json' };
import { sha256Bytes } from './cutover-audit.mjs';

const plain = x => x !== null && typeof x === 'object' && !Array.isArray(x) && Object.getPrototypeOf(x) === Object.prototype;
const DIGEST = /^[a-f0-9]{64}$/;
const SHA = /^[a-f0-9]{40}$/;
const ID = /^[A-Za-z0-9_-]{3,100}$/;
const UTC = /^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.\d{3})?Z$/;
const RISK = { R0: 0, R1: 1 };
const DENIED_PREFIXES = [
  '.git/', '.github/', 'engineering/', 'icm/', 'scripts/', 'supabase/',
  'tests/icm-automation/', 'tests/icm-next/', 'tests/security-e2e/',
  'src/app/api/', 'src/lib/auth/', 'src/lib/supabase/',
  'docs/SECURITY_REQUIREMENTS.md', 'docs/SECURITY_TESTING.md',
  'docs/DATA_PRIVACY.md', 'docs/DECISIONS.md', 'docs/TASKS.md',
  'docs/PRODUCT_VISION.md', 'docs/PRODUCT_READINESS.md', 'docs/ARCHITECTURE.md',
  'docs/IMPLEMENTATION.md', 'docs/THREAT_MODEL.md',
  'AGENTS.md', 'CONTEXT.md', 'package.json', 'package-lock.json',
];
const FORBIDDEN_EFFECTS = new Set(['AUTH', 'RLS', 'PRIVATE_DATA', 'NEW_PROVIDER', 'BILLING', 'MIGRATION', 'RELEASE', 'DEPLOY', 'SECURITY_POLICY', 'CI_POLICY', 'BRANCH_RULE', 'RUNTIME_AUTHORITY', 'UPLOAD', 'AI_DATA', 'SECRET']);
const CANDIDATE_KEYS = new Set(['candidateId', 'parentOutcomeId', 'milestoneId', 'parentCriterionIds', 'evidenceRefs', 'taskKind', 'proposalDigest', 'allowedPathsRequested', 'riskRequested', 'operationsRequested', 'workBudgetRequested', 'dependencies', 'createdBy', 'proposedAt', 'acceptancePositive', 'acceptanceNegative', 'reasonExistingItemsInsufficient']);

function check(value, rule, path = 'envelope') {
  if (rule.const !== undefined && value !== rule.const) throw new Error(`${path}: const`);
  if (rule.enum && !rule.enum.includes(value)) throw new Error(`${path}: enum`);
  if (rule.type) {
    const kind = Array.isArray(value) ? 'array' : Number.isInteger(value) ? 'integer' : value === null ? 'null' : typeof value;
    if (kind !== rule.type) throw new Error(`${path}: type`);
  }
  if (typeof value === 'string') {
    if (rule.minLength !== undefined && value.length < rule.minLength || rule.maxLength !== undefined && value.length > rule.maxLength) throw new Error(`${path}: length`);
    if (rule.pattern && !new RegExp(rule.pattern).test(value)) throw new Error(`${path}: pattern`);
    if (rule.format === 'date-time' && !validUtc(value)) throw new Error(`${path}: UTC timestamp`);
  }
  if (typeof value === 'number' && (!Number.isSafeInteger(value) || rule.minimum !== undefined && value < rule.minimum || rule.maximum !== undefined && value > rule.maximum)) throw new Error(`${path}: bounds`);
  if (Array.isArray(value)) {
    if (rule.minItems !== undefined && value.length < rule.minItems || rule.maxItems !== undefined && value.length > rule.maxItems) throw new Error(`${path}: size`);
    if (rule.uniqueItems && new Set(value.map(x => JSON.stringify(x))).size !== value.length) throw new Error(`${path}: duplicate`);
    value.forEach((x, i) => check(x, rule.items ?? {}, `${path}[${i}]`));
  }
  if (plain(value)) {
    for (const required of rule.required ?? []) if (!Object.hasOwn(value, required)) throw new Error(`${path}.${required}: missing`);
    if (rule.additionalProperties === false) for (const key of Object.keys(value)) if (!Object.hasOwn(rule.properties ?? {}, key)) throw new Error(`${path}.${key}: unknown`);
    for (const [key, x] of Object.entries(value)) if (rule.properties?.[key]) check(x, rule.properties[key], `${path}.${key}`);
  }
}

export function validUtc(value) {
  return typeof value === 'string' && UTC.test(value) && Number.isFinite(Date.parse(value)) &&
    new Date(value).toISOString() === (value.includes('.') ? value : value.replace('Z', '.000Z'));
}

export function validateV2Envelope(envelope) {
  if (!plain(envelope)) throw new Error('envelope: object required');
  check(envelope, schema);
  if (envelope.maxTasksPerRun > envelope.maxTasksTotal) throw new Error('maxTasksPerRun exceeds total');
  if (Date.parse(envelope.expiresAt) <= Date.parse(envelope.startsAt)) throw new Error('expiry precedes start');
  if (new Set(envelope.approvedMilestones.map(x => x.milestoneId)).size !== envelope.approvedMilestones.length) throw new Error('duplicate milestone ID');
  if (new Set(envelope.requiredChecks.map(x => x.name)).size !== envelope.requiredChecks.length ||
      ['verify', 'CodeQL', 'Dependency review'].some(name => !envelope.requiredChecks.some(x => x.name === name))) throw new Error('required check identity incomplete');
  for (const path of [...envelope.allowedPaths, ...envelope.deniedPaths]) if (!validPathPattern(path)) throw new Error('unsafe path pattern');
  if (envelope.allowedPaths.some(path => DENIED_PREFIXES.some(prefix => matches(path.replace(/\/\*\*$/, '/example.md'), prefix)))) throw new Error('protected path in allowlist');
  return envelope;
}

function validPathPattern(path) {
  if (typeof path !== 'string' || !/^[A-Za-z0-9_./* -]+$/.test(path) || path.startsWith('/') || path.includes('\\') || path.includes('..') || path.includes('//') || path.includes('**/') || path === '*' || path === '**' || path.includes(':')) return false;
  return !path.includes('*') || (path.endsWith('/**') && path.indexOf('*') === path.length - 2);
}
function validPath(path) {
  return validPathPattern(path) && !path.includes('*') && !path.split('/').some(part => !part || /[. ]$/.test(part) ||
    /^\.(git|github)$/i.test(part) || /^(CON|PRN|AUX|NUL|COM[1-9]|LPT[1-9])$/i.test(part));
}
function matches(path, pattern) {
  const p = path.toLowerCase(), q = pattern.toLowerCase();
  return q.endsWith('/**') ? p.startsWith(q.slice(0, -2)) : q.endsWith('/') ? p.startsWith(q) : p === q;
}
export const digestEnvelope = envelope => sha256Bytes(Buffer.from(JSON.stringify(envelope)));
export const digestCandidate = candidate => sha256Bytes(Buffer.from(JSON.stringify(Object.fromEntries(Object.entries(candidate).filter(([key]) => key !== 'proposalDigest')))));
const result = (decision, code, extra = {}) => Object.freeze({ decision, code, proofClass: 'OFFLINE_ONLY', launchCapability: false, ...extra });

export function assessCandidate({ envelope, authenticatedBindingObservation, parentRecords, candidate, evidenceObservation, resources, now }) {
  try { validateV2Envelope(envelope); } catch (error) { return result('DENY', 'SCHEMA_INVALID', { detail: error.message }); }
  if (!validUtc(now)) return result('DENY', 'TIME_UNKNOWN');
  if (envelope.revoked || envelope.paused) return result('DENY', 'REVOKED_OR_PAUSED');
  if (Date.parse(now) < Date.parse(envelope.startsAt) || Date.parse(now) >= Date.parse(envelope.expiresAt)) return result('DENY', 'EXPIRED_OR_NOT_STARTED');
  const binding = authenticatedBindingObservation;
  if (!plain(binding) || binding.proofClass !== 'OFFLINE_FIXTURE' || binding.issuer !== 'INDEPENDENT_FIXTURE' ||
      binding.envelopeDigest !== digestEnvelope(envelope) || binding.envelopeId !== envelope.envelopeId || binding.revision !== envelope.revision ||
      binding.founderApprovalRef !== envelope.founderApprovalRef || binding.revocationEpoch !== 0 || binding.valid !== true)
    return result('DENY', 'ISSUER_UNAUTHENTICATED');
  if (!plain(parentRecords) || parentRecords.repository !== envelope.repository || parentRecords.branch !== envelope.canonicalBranch ||
      parentRecords.outcome?.id !== envelope.outcomeId || parentRecords.outcome?.criteriaDigest !== envelope.outcomeCriteriaDigest ||
      parentRecords.outcome?.state !== 'ACTIVE') return result('DENY', 'PARENT_OUTCOME_MISMATCH');
  const milestone = envelope.approvedMilestones.find(x => x.milestoneId === candidate?.milestoneId);
  if (!milestone || parentRecords.milestone?.id !== milestone.milestoneId || parentRecords.milestone?.criteriaDigest !== milestone.criteriaDigest ||
      parentRecords.milestone?.state !== 'ACTIVE') return result('DENY', 'PARENT_MILESTONE_MISMATCH');
  let candidateDigest;
  try { candidateDigest = digestCandidate(candidate); } catch { return result('DENY', 'CANDIDATE_INVALID'); }
  if (!plain(candidate) || Object.keys(candidate).some(key => !CANDIDATE_KEYS.has(key)) || !ID.test(candidate.candidateId ?? '') || candidate.parentOutcomeId !== envelope.outcomeId ||
      JSON.stringify(candidate).length > 64 * 1024 ||
      !DIGEST.test(candidate.proposalDigest ?? '') || candidateDigest !== candidate.proposalDigest ||
      !validUtc(candidate.proposedAt) || Date.parse(candidate.proposedAt) > Date.parse(now) ||
      !Array.isArray(candidate.parentCriterionIds) || !candidate.parentCriterionIds.length || candidate.parentCriterionIds.length > 20 ||
      new Set(candidate.parentCriterionIds).size !== candidate.parentCriterionIds.length ||
      !candidate.parentCriterionIds.every(id => parentRecords.milestone.criteriaIds?.includes(id)) ||
      !Array.isArray(candidate.acceptancePositive) || !candidate.acceptancePositive.length || candidate.acceptancePositive.length > 20 ||
      !Array.isArray(candidate.acceptanceNegative) || !candidate.acceptanceNegative.length || candidate.acceptanceNegative.length > 20 ||
      !candidate.acceptancePositive.every(x => typeof x === 'string' && x.trim() && x.length <= 500) ||
      !candidate.acceptanceNegative.every(x => typeof x === 'string' && x.trim() && x.length <= 500) ||
      typeof candidate.reasonExistingItemsInsufficient !== 'string' || candidate.reasonExistingItemsInsufficient.length > 1000 ||
      typeof candidate.createdBy !== 'string' || candidate.createdBy.length > 120 ||
      !Array.isArray(candidate.dependencies) || candidate.dependencies.length > 20 || new Set(candidate.dependencies).size !== candidate.dependencies.length ||
      !candidate.dependencies.every(id => ID.test(id) && id !== candidate.candidateId)) return result('DENY', 'CANDIDATE_INVALID');
  if (!envelope.allowedTaskKinds.includes(candidate.taskKind)) return result('DENY', 'TASK_KIND_DENIED');
  if (!(candidate.riskRequested in RISK) || RISK[candidate.riskRequested] > RISK[envelope.maxRisk]) return result('DENY', 'RISK_EXCEEDS_LIMIT');
  if (!Array.isArray(candidate.operationsRequested) || !candidate.operationsRequested.length || new Set(candidate.operationsRequested).size !== candidate.operationsRequested.length ||
      candidate.operationsRequested.some(op => !envelope.allowedOperations.includes(op) || op === 'prepare-draft-pr' && envelope.publisherMode !== 'DRAFT_ONLY')) return result('DENY', 'OPERATION_DENIED');
  if (!Array.isArray(candidate.allowedPathsRequested) || !candidate.allowedPathsRequested.length || candidate.allowedPathsRequested.length > 30 ||
      !candidate.allowedPathsRequested.every(x => typeof x === 'string') || new Set(candidate.allowedPathsRequested.map(x => x.toLowerCase())).size !== candidate.allowedPathsRequested.length) return result('DENY', 'PATH_DENIED');
  for (const path of candidate.allowedPathsRequested) {
    if (!validPath(path) || DENIED_PREFIXES.some(prefix => matches(path, prefix)) || envelope.deniedPaths.some(pattern => matches(path, pattern)) ||
        !envelope.allowedPaths.some(pattern => matches(path, pattern))) return result('DENY', 'PATH_DENIED');
    const fact = evidenceObservation?.pathFacts?.[path];
    if (fact?.withinRoot !== true || fact?.symlink !== false || fact?.junction !== false || fact?.proofClass !== 'OFFLINE_FIXTURE') return result('DENY', 'PATH_SAFETY_UNKNOWN');
  }
  if (candidate.taskKind === 'DOCS_LOCAL' && candidate.allowedPathsRequested.some(path => !/\.md$/i.test(path)) ||
      candidate.taskKind === 'TEST_LOCAL' && candidate.allowedPathsRequested.some(path => !/^tests\//i.test(path))) return result('DENY', 'TASK_KIND_PATH_MISMATCH');
  if (!plain(resources) || resources.known !== true || !Number.isSafeInteger(resources.tasksUsed) || resources.tasksUsed < 0 ||
      !Number.isSafeInteger(resources.tasksThisRun) || resources.tasksThisRun < 0 ||
      !Number.isSafeInteger(resources.retriesUsed) || resources.retriesUsed < 0 ||
      !Number.isSafeInteger(resources.wallSecondsReserved) || resources.wallSecondsReserved < 0 ||
      !plain(candidate.workBudgetRequested) || Object.keys(candidate.workBudgetRequested).join('|') !== 'wallSeconds' ||
      !Number.isSafeInteger(candidate.workBudgetRequested.wallSeconds) || candidate.workBudgetRequested.wallSeconds <= 0) return result('DENY', 'BUDGET_UNKNOWN');
  if (resources.tasksUsed >= envelope.maxTasksTotal || resources.tasksThisRun >= envelope.maxTasksPerRun ||
      resources.retriesUsed > envelope.maxRetriesTotal || resources.wallSecondsReserved + candidate.workBudgetRequested.wallSeconds > envelope.maxWallSecondsTotal) return result('DENY', 'BUDGET_EXHAUSTED');
  if (resources.concurrentWriters !== 0) return result('DENY', 'WRITER_BUSY');
  if (!Array.isArray(candidate.evidenceRefs) || !candidate.evidenceRefs.length || candidate.evidenceRefs.length > 20 ||
      !candidate.evidenceRefs.every(ref => typeof ref === 'string' && ref.length > 0 && ref.length <= 256) ||
      new Set(candidate.evidenceRefs).size !== candidate.evidenceRefs.length ||
      evidenceObservation?.proofClass !== 'OFFLINE_FIXTURE' || evidenceObservation?.candidateDigest !== candidate.proposalDigest ||
      evidenceObservation?.verifiedRefs?.some(ref => !candidate.evidenceRefs.includes(ref)) ||
      !candidate.evidenceRefs.every(ref => evidenceObservation?.verifiedRefs?.includes(ref))) return result('CANDIDATE_ONLY', 'EVIDENCE_UNVERIFIED');
  if (!candidate.reasonExistingItemsInsufficient || evidenceObservation.existingItemsInsufficient !== true) return result('CANDIDATE_ONLY', 'NECESSITY_UNPROVEN');
  if (!Array.isArray(evidenceObservation.effectTags)) return result('CANDIDATE_ONLY', 'EFFECT_UNKNOWN');
  if (evidenceObservation.effectTags.some(tag => FORBIDDEN_EFFECTS.has(tag))) return result('DENY', 'FORBIDDEN_EFFECT');
  if (evidenceObservation.scopeProven !== true || evidenceObservation.independentClassification !== true) return result('CANDIDATE_ONLY', 'SCOPE_UNPROVEN');
  if (candidate.dependencies?.some(id => !parentRecords.completedItemIds?.includes(id))) return result('DENY', 'UNMET_DEPENDENCY');
  return result('ADMIT_FIXTURE', 'BOUNDED_OFFLINE_EVALUATION', { candidateId: candidate.candidateId, candidateDigest: candidate.proposalDigest });
}

export function selectDelegatedWork({ envelope, state, candidates = [], assessmentInputs = [], now }) {
  try { validateV2Envelope(envelope); } catch { return result('DENY', 'SCHEMA_INVALID'); }
  if (envelope.revoked || envelope.paused || !validUtc(now) || Date.parse(now) < Date.parse(envelope.startsAt) || Date.parse(now) >= Date.parse(envelope.expiresAt)) return result('DENY', 'REVOKED_EXPIRED_OR_TIME_UNKNOWN');
  if (state?.hostVerified !== true || state?.grantCurrent !== true || state?.lockExclusive !== true ||
      state?.childTreeStopped !== true || state?.ledgerCurrent !== true) return result('DENY', 'HOST_UNVERIFIED');
  if (state?.githubCurrent !== true || state?.networkCurrent !== true) return result('DENY', 'EXTERNAL_EVIDENCE_UNKNOWN');
  if (state?.sourceConflict || state?.journalConflict) return result('DENY', 'SOURCE_CONFLICT');
  if (!Array.isArray(state?.items) || state.items.some(x => !ID.test(x?.id ?? '') || !['CANDIDATE', 'ELIGIBLE', 'PLAN', 'BUILD', 'VERIFY', 'BLOCKED', 'PR_CI_PENDING', 'INTEGRATED', 'CANCELLED'].includes(x.state)) ||
      new Set(state.items.map(x => x.id)).size !== state.items.length || !Array.isArray(candidates) ||
      candidates.some(x => !ID.test(x?.candidateId ?? ''))) return result('DENY', 'STATE_INVALID');
  const unfinished = [...(state?.items ?? [])].filter(x => ['PLAN', 'BUILD', 'VERIFY', 'BLOCKED'].includes(x.state)).sort((a, b) => a.id.localeCompare(b.id));
  if (unfinished.length) return result('RECOVER_OR_STOP', 'UNFINISHED_RECOVERY', { workItemId: unfinished[0].id });
  const pending = [...(state?.items ?? [])].filter(x => x.state === 'PR_CI_PENDING').sort((a, b) => a.id.localeCompare(b.id));
  if (pending.length) return result('WAIT_PR_CI', 'PR_PENDING', { workItemId: pending[0].id });
  if (state?.milestoneMasterPending) return result('VERIFY_OR_NEEDS_WORK', 'MILESTONE_MASTER_VERIFY');
  if (state?.outcomeComplete) return result('DENY', 'OUTCOME_COMPLETE');
  const ordered = [...candidates].sort((a, b) => a.candidateId.localeCompare(b.candidateId));
  for (const candidate of ordered) {
    if (state?.items?.some(x => x.id === candidate.candidateId && x.state === 'INTEGRATED')) continue;
    const input = assessmentInputs.find(x => x.candidate?.candidateId === candidate.candidateId);
    if (!input) continue;
    const assessed = assessCandidate({ ...input, envelope, now });
    if (assessed.decision === 'ADMIT_FIXTURE') return assessed;
  }
  return result('CANDIDATE_ONLY', 'NO_ADMISSIBLE_CHILD');
}

export function assessIntegrationEvidence({ pr, requiredChecks, reviewer, builderActor, milestone }) {
  if (!pr || !SHA.test(pr.headSha ?? '') || pr.base !== 'main' || pr.canonicalAncestor !== true || pr.merged !== true) return result('WAIT_PR_CI', 'PR_PENDING');
  if (!Array.isArray(requiredChecks) || requiredChecks.length !== 3 || ['verify', 'CodeQL', 'Dependency review'].some(name => !requiredChecks.some(x => x.name === name && Number.isSafeInteger(x.appId) && x.appId > 0)) ||
      !requiredChecks.every(required => pr.checks?.some(check => check.name === required.name && check.appId === required.appId && check.headSha === pr.headSha && check.conclusion === 'success'))) return result('WAIT_PR_CI', 'STALE_OR_MISSING_CI');
  if (!reviewer || reviewer.actor === builderActor || reviewer.source !== 'GITHUB' || reviewer.headSha !== pr.headSha || reviewer.state !== 'APPROVED') return result('WAIT_PR_CI', 'INDEPENDENT_REVIEW_MISSING');
  if (milestone?.studentJourneyPassed !== true || milestone?.negativeCriteriaPassed !== true || milestone?.criteriaDigest !== milestone?.frozenCriteriaDigest ||
      !SHA.test(milestone?.codeSha ?? '') || milestone.codeSha !== pr.canonicalHead) return result('VERIFY_OR_NEEDS_WORK', 'MASTER_NEEDS_WORK');
  return result('INTEGRATED_FIXTURE', 'EXACT_HEAD_AND_MASTER_PASS');
}

export function acceptsPolicyVersion(version, policy) {
  return version === policy && (policy === 1 || policy === 2);
}
