import { win32 } from 'node:path';

// Static, disabled preflight for an operator's proposed Windows layout. These
// strings are untrusted configuration; this function cannot prove ACLs, SID,
// reparse-point containment, connector isolation, or installation authenticity.
const decision = (status, code) => Object.freeze({
  status, code, proofClass: 'OFFLINE_ONLY', launchCapability: false,
});

function canonical(path) {
  if (typeof path !== 'string' || !win32.isAbsolute(path) ||
      path.startsWith('\\\\?\\') || path.startsWith('\\\\.\\') ||
      path.includes('\0') || path.trim() !== path) return null;
  const normalized = win32.normalize(path);
  if (normalized !== path || normalized.startsWith('\\\\')) return null;
  const parts = normalized.slice(win32.parse(normalized).root.length).split(win32.sep);
  if (parts.some(part => !part || /[. ]$/.test(part) || part.includes(':') || part.includes('~'))) return null;
  return normalized.toLowerCase();
}

function within(parent, child) {
  const relative = win32.relative(parent, child);
  return relative === '' || relative !== '..' && !relative.startsWith(`..${win32.sep}`) && !win32.isAbsolute(relative);
}

export function assessDisabledHostPreflight({ layout, triggerGitHubPermission } = {}) {
  const names = ['grantPath', 'brokerCodeRoot', 'brokerStateRoot', 'checkoutRoot', 'workerRoot'];
  if (!layout || Object.keys(layout).sort().join('|') !== [...names].sort().join('|'))
    return decision('UNKNOWN', 'LAYOUT_INCOMPLETE');
  const paths = Object.fromEntries(names.map(name => [name, canonical(layout[name])]));
  if (Object.values(paths).some(path => path === null)) return decision('BLOCKED', 'PATH_UNSAFE_OR_UNCANONICAL');
  const { grantPath, brokerCodeRoot, brokerStateRoot, checkoutRoot, workerRoot } = paths;
  if ([brokerCodeRoot, brokerStateRoot, checkoutRoot, workerRoot].some(root => within(root, grantPath)) ||
      [checkoutRoot, workerRoot].some(root => within(root, brokerCodeRoot) || within(root, brokerStateRoot)) ||
      within(brokerStateRoot, brokerCodeRoot) || within(brokerCodeRoot, brokerStateRoot) ||
      within(checkoutRoot, workerRoot) || within(workerRoot, checkoutRoot))
    return decision('BLOCKED', 'CONTROL_PATH_OVERLAP');
  if (triggerGitHubPermission === 'ALLOW_ALL_ACTIONS' || triggerGitHubPermission === 'WRITE_CAPABLE')
    return decision('BLOCKED', 'TRIGGER_GITHUB_WRITE_CAPABLE');
  if (triggerGitHubPermission !== 'NO_GITHUB_CONNECTOR' && triggerGitHubPermission !== 'READ_ONLY_ENFORCED')
    return decision('UNKNOWN', 'TRIGGER_CONNECTOR_PERMISSION_UNKNOWN');
  return decision('HOST_PROOF_REQUIRED', 'STATIC_LAYOUT_ONLY');
}
