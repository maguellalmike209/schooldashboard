const gates = {
  G1: 'Founder-controlled authority', G2: 'Request-only trigger', G3: 'Restricted worker', G4: 'Lock and descendants',
  G5: 'GitHub governance', G6: 'Independent QA', G7: 'Budgets and revocation', G8: 'Reporting and recovery',
};
export function buildProofLedger(evidence = []) {
  if (!Array.isArray(evidence)) throw new Error('evidence must be an array');
  return Object.entries(gates).map(([gate, requirement]) => {
    const items = evidence.filter(x => x?.gate === gate);
    // No M3 input path authenticates a protected host or reviewer identity.
    // Never promote caller-supplied claims to PASS in the offline ledger.
    return { gate, requirement, status: items.some(x => x?.result === 'BLOCKED') ? 'BLOCKED' : 'UNKNOWN',
      proofClass: 'UNKNOWN', evidenceRef: null,
      fixtureEvidenceCount: items.filter(x => x.proofClass === 'FIXTURE').length,
      limitations: ['Installed intended identity and independent proof not established'] };
  });
}
