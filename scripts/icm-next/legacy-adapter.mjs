import { parseTasks, taskDigest } from '../icm-automation/core.mjs';
import { sha256 } from './records.mjs';

export function readLegacyTasks(text, sourceRef) {
  if (typeof text !== 'string' || Buffer.byteLength(text, 'utf8') > 2 * 1024 * 1024 || typeof sourceRef !== 'string' || !sourceRef.trim()) throw new Error('legacy: invalid source');
  for (const block of text.matchAll(/```icm-task\s*\r?\n([\s\S]*?)\r?\n```/g)) if (Buffer.byteLength(block[1], 'utf8') > 64 * 1024) throw new Error('legacy: oversized block');
  const tasks = parseTasks(text);
  return { tag: 'LEGACY_OBSERVED', sourceRef, sourceSha256: sha256(text), tasks: tasks.map(t => ({
    legacyId: t.id, originalStatus: t.status, acceptedFlag: t.accepted, taskDigest: taskDigest(t), original: structuredClone(t),
  })) };
}

export function mapLegacySnapshot({ legacyTasks, evidence = {}, git = null, pr = null }) {
  if (legacyTasks?.tag !== 'LEGACY_OBSERVED' || !Array.isArray(legacyTasks.tasks)) throw new Error('legacy: invalid parsed tasks');
  return { tag: 'LEGACY_OBSERVED', sourceRef: legacyTasks.sourceRef, sourceSha256: legacyTasks.sourceSha256,
    observations: legacyTasks.tasks.map(t => ({ legacyId: t.legacyId, originalStatus: t.originalStatus,
      taskDigest: t.taskDigest, eligibility: 'UNKNOWN', integration: t.originalStatus === 'Done' && evidence[t.legacyId]?.integrated === true &&
        pr?.[t.legacyId]?.head === git?.head && pr[t.legacyId].canonicalAncestor === true ? 'OBSERVED_EXACT_HEAD' : 'UNKNOWN',
      original: structuredClone(t.original) })), conflicts: legacyTasks.tasks.filter(t => t.originalStatus === 'Done' && evidence[t.legacyId]?.integrated !== true)
      .map(t => ({ legacyId: t.legacyId, code: 'DONE_WITHOUT_INTEGRATION_PROOF' })) };
}
