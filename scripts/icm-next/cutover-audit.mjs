import { readFileSync, realpathSync } from 'node:fs';
import { resolve, relative } from 'node:path';
import { createHash } from 'node:crypto';

export const sha256Bytes = value => createHash('sha256').update(value).digest('hex');
const ROOT_FILES = ['AGENTS.md', 'CONTEXT.md'];
const OWNER_FILES = [
  'engineering/README.md', 'engineering/CHARTER.md', 'engineering/POLICY.md',
  'engineering/DELIVERY.md', 'engineering/QUALITY.md', 'engineering/OPERATIONS.md',
  'engineering/PRODUCT_OUTCOMES.md', 'engineering/contracts/M6_DELEGATION_ENVELOPE.md',
  'docs/SECURITY_REQUIREMENTS.md', 'docs/DATA_PRIVACY.md', 'docs/PRODUCT_VISION.md',
  'icm/04_release/CONTEXT.md',
];
const CONTROL_OWNERS = {
  authorization: ['engineering/POLICY.md', 'engineering/OPERATIONS.md'],
  isolation: ['engineering/POLICY.md', 'engineering/QUALITY.md', 'docs/SECURITY_REQUIREMENTS.md'],
  privacy: ['docs/DATA_PRIVACY.md', 'engineering/QUALITY.md'],
  product: ['docs/PRODUCT_VISION.md', 'engineering/QUALITY.md'],
  recovery: ['engineering/DELIVERY.md', 'engineering/OPERATIONS.md'],
  ci: ['engineering/QUALITY.md', 'engineering/OPERATIONS.md'],
  release: ['engineering/POLICY.md', 'icm/04_release/CONTEXT.md'],
};
const NEEDLES = {
  authorization: /grant|authority/i,
  isolation: /owner|RLS|cross.user/i,
  privacy: /privacy|retention|deletion/i,
  product: /student|user journey/i,
  recovery: /recover|rollback/i,
  ci: /CI|check|review/i,
  release: /Release|deploy/i,
};

function safeRead(root, path) {
  if (!/^[A-Za-z0-9_./-]+$/.test(path) || path.includes('..') || path.startsWith('/')) throw new Error('unsafe source path');
  const full = resolve(root, path);
  if (relative(resolve(root), full).startsWith('..')) throw new Error('source outside root');
  if (relative(realpathSync(root), realpathSync(full)).startsWith('..')) throw new Error('linked source outside root');
  return readFileSync(full);
}

// Source collection is read-only. No candidate router is ever applied here.
export function collectCutoverSources(root, additionalPaths = []) {
  const paths = [...new Set([...ROOT_FILES, ...OWNER_FILES, ...additionalPaths])].sort();
  return Object.fromEntries(paths.map(path => {
    const bytes = safeRead(root, path);
    return [path, { sha256: sha256Bytes(bytes), bytes: bytes.length, text: bytes.toString('utf8') }];
  }));
}

export function auditLegacyControls(matrixText, sources) {
  const ledger = matrixText.split('## G. Source-heading coverage ledger')[1] ?? '';
  const anchors = [...ledger.matchAll(/^- `([^`:\r\n]+):(\d+)` — (.+)$/gm)].map(([, path, line, heading]) => ({ path, line: Number(line), heading }));
  const holes = [];
  if (anchors.length !== 1105) holes.push(`heading count ${anchors.length}, expected 1105`);
  for (const anchor of anchors) {
    const text = sources[anchor.path]?.text;
    if (!text) { holes.push(`missing ${anchor.path}`); continue; }
    const sourceLine = text.split(/\r?\n/)[anchor.line - 1] ?? '';
    if (!/^\s*#{1,6}\s/.test(sourceLine) || sourceLine.replace(/^\s*#{1,6}\s*/, '').trim() !== anchor.heading.trim())
      holes.push(`invalid heading anchor ${anchor.path}:${anchor.line}`);
  }
  for (const family of Object.keys(CONTROL_OWNERS)) {
    const owners = CONTROL_OWNERS[family];
    if (!owners || !owners.every(path => sources[path]?.text && NEEDLES[family].test(sources[path].text))) holes.push(`missing ${family} owner/control`);
  }
  return Object.freeze({ status: holes.length ? 'FAIL' : 'PASS_FOR_SHADOW', headingCount: anchors.length,
    sourceHashes: Object.fromEntries(Object.entries(sources).map(([path, item]) => [path, item.sha256])), holes: [...new Set(holes)] });
}

export function integrationPreflight({ canonicalMain, prs, dirtyPaths = [], reviewerIdentity = null }) {
  const blockers = [];
  if (!/^[a-f0-9]{40}$/.test(canonicalMain ?? '')) blockers.push('CANONICAL_MAIN_UNKNOWN');
  if (dirtyPaths.some(path => ROOT_FILES.includes(path))) blockers.push('DIRTY_ROOT');
  for (const number of [26, 27]) {
    const pr = prs?.[number];
    if (!pr || pr.state !== 'MERGED' || pr.canonicalAncestor !== true) { blockers.push(`PR${number}_NOT_INTEGRATED`); continue; }
    if (!/^[a-f0-9]{40}$/.test(pr.headSha ?? '') || pr.base !== 'main') blockers.push(`PR${number}_HEAD_OR_BASE_UNKNOWN`);
    for (const name of ['verify', 'CodeQL', 'Dependency review'])
      if (!pr.checks?.some(check => check.name === name && check.headSha === pr.headSha && check.conclusion === 'success' && Number.isSafeInteger(check.appId) && check.appId > 0)) blockers.push(`PR${number}_${name}_PENDING`);
    if (!pr.reviews?.some(review => review.state === 'APPROVED' && review.headSha === pr.headSha && review.actor && review.actor !== pr.author && review.source === 'GITHUB')) blockers.push(`PR${number}_REVIEW_PENDING`);
  }
  if (!reviewerIdentity || reviewerIdentity === 'SELF') blockers.push('INDEPENDENT_REVIEW_UNPROVEN');
  return Object.freeze({ proofClass: 'OFFLINE_ONLY', simulatedCriteriaSatisfied: blockers.length === 0,
    cutoverCandidateEligible: false, activationAuthorized: false, blockers });
}
