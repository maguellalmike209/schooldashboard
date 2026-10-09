import schema from '../../engineering/contracts/RECORDS_V1.schema.json' with { type: 'json' };
import { criteriaDigest, immutableTaskDigest } from './records.mjs';

const MAX_RECORDS = 500;
const MAX_DEPTH = 12;
const plain = x => x !== null && typeof x === 'object' && !Array.isArray(x) && Object.getPrototypeOf(x) === Object.prototype;
const utc = x => typeof x === 'string' && /^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.\d{3})?Z$/.test(x) &&
  Number.isFinite(Date.parse(x)) && new Date(x).toISOString() === (x.includes('.') ? x : x.replace('Z', '.000Z'));

function check(value, rule, path, depth = 0) {
  if (depth > MAX_DEPTH) throw new Error(`${path}: nesting limit`);
  if (rule.const !== undefined && value !== rule.const) throw new Error(`${path}: invalid constant`);
  if (rule.enum && !rule.enum.includes(value)) throw new Error(`${path}: invalid enum`);
  if (rule.type) {
    const types = Array.isArray(rule.type) ? rule.type : [rule.type];
    const kind = value === null ? 'null' : Array.isArray(value) ? 'array' : Number.isInteger(value) ? 'integer' : typeof value;
    if (!types.includes(kind) && !(kind === 'integer' && types.includes('number'))) throw new Error(`${path}: invalid type`);
  }
  if (rule.pattern && value !== null && typeof value !== 'string') throw new Error(`${path}: invalid string pattern target`);
  if (typeof value === 'string') {
    if (rule.minLength !== undefined && value.length < rule.minLength || rule.maxLength !== undefined && value.length > rule.maxLength) throw new Error(`${path}: invalid length`);
    if (rule.pattern && !new RegExp(rule.pattern).test(value)) throw new Error(`${path}: invalid format`);
    if (rule.format === 'date-time' && !utc(value)) throw new Error(`${path}: invalid UTC time`);
  }
  if (typeof value === 'number') {
    if (!Number.isSafeInteger(value) || rule.minimum !== undefined && value < rule.minimum || rule.maximum !== undefined && value > rule.maximum) throw new Error(`${path}: invalid number`);
  }
  if (Array.isArray(value)) {
    if (rule.minItems !== undefined && value.length < rule.minItems || rule.maxItems !== undefined && value.length > rule.maxItems) throw new Error(`${path}: invalid item count`);
    if (rule.uniqueItems && new Set(value.map(x => JSON.stringify(x))).size !== value.length) throw new Error(`${path}: duplicate item`);
    value.forEach((entry, i) => check(entry, rule.items ?? {}, `${path}[${i}]`, depth + 1));
  }
  if (plain(value)) {
    for (const key of rule.required ?? []) if (!Object.hasOwn(value, key)) throw new Error(`${path}.${key}: missing`);
    if (rule.additionalProperties === false) for (const key of Object.keys(value)) if (!Object.hasOwn(rule.properties ?? {}, key)) throw new Error(`${path}.${key}: unknown`);
    for (const [key, child] of Object.entries(value)) if (rule.properties?.[key]) check(child, rule.properties[key], `${path}.${key}`, depth + 1);
  }
}

export function validateRecord(record) {
  if (!plain(record)) throw new Error('record: invalid object');
  const variant = schema.oneOf.find(x => x.properties.kind.const === record.kind);
  if (!variant) throw new Error('record.kind: invalid enum');
  check(record, { type: 'object', ...variant }, record.id ?? 'record');
  if (Date.parse(record.updatedAt) < Date.parse(record.createdAt)) throw new Error(`${record.id}: revision time reversed`);
  if (record.kind === 'Outcome' && Date.parse(record.expiresAt) <= Date.parse(record.createdAt)) throw new Error(`${record.id}: expiry before creation`);
  if (new Set(record.acceptance.map(x => x.id)).size !== record.acceptance.length) throw new Error(`${record.id}: duplicate criterion ID`);
  if (record.criteriaDigest !== criteriaDigest(record)) throw new Error(`${record.id}: criteria digest mismatch`);
  if (record.kind === 'WorkItem' && record.immutableTaskDigest !== immutableTaskDigest(record)) throw new Error(`${record.id}: immutable task digest mismatch`);
  return record;
}

function acyclic(records, kind) {
  const map = new Map(records.map(x => [x.id, x]));
  const visiting = new Set(), done = new Set();
  function visit(id) {
    if (visiting.has(id)) throw new Error(`${kind}: dependency cycle`);
    if (done.has(id)) return;
    visiting.add(id);
    for (const dep of map.get(id).dependsOn) {
      if (!map.has(dep)) throw new Error(`${id}: missing dependency ${dep}`);
      if (dep === id) throw new Error(`${id}: self dependency`);
      if (map.get(dep).parentId !== map.get(id).parentId) throw new Error(`${id}: cross-parent dependency`);
      visit(dep);
    }
    visiting.delete(id); done.add(id);
  }
  for (const id of map.keys()) visit(id);
}

export function validatePortfolio(outcomes, milestones, workItems) {
  if (![outcomes, milestones, workItems].every(Array.isArray) || outcomes.length + milestones.length + workItems.length > MAX_RECORDS) throw new Error('portfolio: invalid size');
  const all = [...outcomes, ...milestones, ...workItems];
  for (const x of all) validateRecord(x);
  if (new Set(all.map(x => x.id)).size !== all.length) throw new Error('portfolio: duplicate identity');
  const byId = new Map(all.map(x => [x.id, x]));
  for (const x of outcomes) {
    if (x.kind !== 'Outcome') throw new Error('portfolio: wrong Outcome kind');
    if (new Set(x.milestoneIds).size !== x.milestoneIds.length || x.milestoneIds.some(id => byId.get(id)?.parentId !== x.id)) throw new Error(`${x.id}: milestone link mismatch`);
  }
  for (const x of milestones) {
    if (x.kind !== 'Milestone' || x.outcomeId !== x.parentId || byId.get(x.parentId)?.kind !== 'Outcome' || !byId.get(x.parentId).milestoneIds.includes(x.id)) throw new Error(`${x.id}: outcome link mismatch`);
    if (x.workItemIds.some(id => byId.get(id)?.parentId !== x.id)) throw new Error(`${x.id}: work-item link mismatch`);
  }
  for (const x of workItems) {
    if (x.kind !== 'WorkItem' || x.milestoneId !== x.parentId || byId.get(x.parentId)?.kind !== 'Milestone' || !byId.get(x.parentId).workItemIds.includes(x.id)) throw new Error(`${x.id}: parent link mismatch`);
  }
  acyclic(milestones, 'milestone'); acyclic(workItems, 'work item');
  return byId;
}

export const validUtc = utc;
