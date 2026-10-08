function value(v) { return v === null || v === undefined ? 'UNKNOWN' : String(v); }
export function renderReport({ observation, decision = null, activity = null, proposals = [] }) {
  const tasks = observation.acceptedTasks ?? [];
  const done = tasks.filter(t => t.status === 'Done').map(t => t.id);
  const active = tasks.filter(t => ['In progress', 'Ready for verification', 'Blocked'].includes(t.status)).map(t => `${t.id} (${t.status})`);
  const lines = [
    '# Daily Manager Review',
    '',
    `Observed: ${value(observation.observedAt)}. This report covers an actual invocation only.`,
    '',
    '## A. Executive Summary',
    `- Accepted phase outcome: ${value(activity?.outcome ?? 'UNKNOWN — no active batch grant supplied')}.`,
    `- Overall progress: ${observation.historicalCompletedIds?.length ?? 0} historical completed IDs listed; ${done.length} structured accepted tasks Done; ${active.length} structured active.`,
    `- Completed today: ${value(activity?.completedToday ?? 'UNKNOWN — no run journal supplied')}.`,
    `- Active work: ${active.length ? active.join(', ') : 'none observed in structured entries'}.`,
    `- Blocking issues: ${value(['STOP', 'INTEGRATION BLOCKED', 'INTEGRATION PENDING'].includes(decision?.state) ? decision.reason : activity?.blockers ?? 'none verified; execution authorization may be absent')}.`,
    '',
    '## B. Verified Delivery',
    `- Completed task IDs: ${[...(observation.historicalCompletedIds ?? []), ...done].join(', ') || 'none observed'} (registry claims; not independently reverified today).`,
    `- Local Git: ${value(observation.branch)} at ${value(observation.head)}; dirty=${value(observation.dirty)} (${value(observation.changedEntries)} entries).`,
    `- GitHub/hosted CI/protected integration: UNKNOWN — no live canonical observation was made. Local upstream ${value(observation.upstream)} is cached evidence only.`,
    `- Verification artifact names observed: ${observation.verificationArtifacts?.length ?? 0}; contents and freshness were not established by this report.`,
    '',
    '## C. Engineering Health',
    `- Tests/security: ${value(activity?.tests ?? 'UNKNOWN — no checks run by reporting command')}.`,
    `- Recoverability: ${value(decision?.state ?? 'Inspection only')}; ${value(decision?.reason ?? 'no external grant supplied')}.`,
    `- Technical debt: ${value(activity?.debt ?? 'UNKNOWN — no assessment supplied')}.`,
    '',
    '## D. Resources',
    `- Runs/retries: ${value(activity?.runs)}/${value(activity?.retries)}.`,
    `- Usage/cost: ${value(activity?.usage ?? 'unavailable')}; consumption estimate: ${value(activity?.cost ?? 'unavailable')}.`,
    '',
    '## E. Tomorrow / Next Few Days',
    `- Next eligible authorized task: ${decision?.state === 'SELECT' || decision?.state === 'RECOVER' ? `${decision.taskId} (${decision.nextStage})` : 'none established'}.`,
    `- Dependencies, expected work, and risks: ${value(activity?.next ?? 'UNKNOWN without a validated grant and current evidence')}.`,
    '',
    '## F. Manager Decisions',
    `- ${value(activity?.decisionBrief ?? 'No material decision established by this read-only inspection. Scheduled writing remains disabled.')}`,
    '',
    '## G. Strategic Recommendations',
    ...(proposals.length ? proposals.map(p => `- PROPOSED: ${String(p).replace(/[\r\n]+/g, ' ').slice(0, 500)}`) : ['- None. No proposal is execution authorization.']),
    '',
    '## H. Manager Response Policy',
    '- Response optional. Existing external, unexpired authorization continues unchanged; silence never approves proposed tasks or expanded scope.',
    '- SchoolDashboard application writes, real recurring schedules, and production Release are DISABLED in this SD-018 read-only pilot.',
    '',
  ];
  return lines.join('\n');
}
