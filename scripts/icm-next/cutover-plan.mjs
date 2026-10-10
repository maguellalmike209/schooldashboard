import { sha256Bytes } from './cutover-audit.mjs';

export const ROOT_ROUTER_PATHS = Object.freeze(['AGENTS.md', 'CONTEXT.md']);
const AGENTS = `# School Dashboard — Engineering Router\n\nRead engineering/CHARTER.md and engineering/POLICY.md before work. This router grants no execution authority. Read CONTEXT.md for task-specific sources. Existing product, security, privacy, protected Git and Release requirements remain binding. Scheduled writes require separately authenticated external authority and installed host proof.\n`;
const CONTEXT = `# School Dashboard — Context Router\n\nRead engineering/README.md, then the smallest relevant contract: engineering/PRODUCT_OUTCOMES.md for founder outcomes; engineering/DELIVERY.md for planning and recovery; engineering/QUALITY.md for Verify and CI; engineering/OPERATIONS.md for trusted host operation; engineering/contracts/ for schemas and admission. Read relevant docs/ product, security, privacy and implementation sources. For an authorized foreground task, retain Plan → Build → independent Verify. For production Release, read icm/04_release/CONTEXT.md and obtain separate Release authority. Historical SD task evidence and decisions remain in docs/TASKS.md and docs/DECISIONS.md. Until an approved protected cutover, the existing root files remain active.\n`;

// Text and hashes only: deliberately no apply/write API.
export function proposeRootRouter(snapshot) {
  if (!snapshot || ROOT_ROUTER_PATHS.some(path => !snapshot[path]?.text || snapshot[path].sha256 !== sha256Bytes(Buffer.from(snapshot[path].text)))) throw new Error('unfrozen root source');
  const replacements = { 'AGENTS.md': AGENTS, 'CONTEXT.md': CONTEXT };
  return Object.freeze({ mode: 'PROPOSAL_ONLY', allowlistedPaths: ROOT_ROUTER_PATHS,
    files: Object.fromEntries(ROOT_ROUTER_PATHS.map(path => [path, {
      beforeSha256: snapshot[path].sha256, afterSha256: sha256Bytes(Buffer.from(replacements[path])),
      beforeText: snapshot[path].text, proposedText: replacements[path],
    }])) });
}
