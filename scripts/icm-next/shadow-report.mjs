export function summarizeReplay(results) {
  const classes = ['EQUIVALENT_SAFE', 'STRICTER_SAFE', 'UNSAFE_REGRESSION', 'UNKNOWN', 'NOT_COMPARABLE'];
  const counts = Object.fromEntries(classes.map(x => [x, results.filter(r => r.classification === x).length]));
  return { schemaVersion: 1, total: results.length, counts,
    unsafe: results.filter(r => r.classification === 'UNSAFE_REGRESSION').map(r => r.fixtureId),
    unknown: results.filter(r => ['UNKNOWN', 'NOT_COMPARABLE'].includes(r.classification)).map(r => ({ id: r.fixtureId, limitations: r.limitations })),
    sourceHashes: results.length ? { legacy: results[0].legacy.sourceSha, next: results[0].next.sourceSha } : null,
    usageCost: 'UNKNOWN', hostGates: 'UNKNOWN', cutoverAuthorized: false };
}

export function managerReplaySummary(summary) {
  return `M4 shadow replay: ${summary.total} frozen comparisons; ${summary.counts.EQUIVALENT_SAFE} equivalent safe, ${summary.counts.STRICTER_SAFE} stricter safe, ${summary.counts.UNSAFE_REGRESSION} unsafe, ${summary.counts.UNKNOWN} unknown, ${summary.counts.NOT_COMPARABLE} not comparable. Host G1–G8: UNKNOWN. Usage/cost: UNKNOWN. Cutover: not authorized.`;
}
