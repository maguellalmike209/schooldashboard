# AI-first review governance integration — Plan

**Authority:** founder's 2026-10-11 request and attached accepted direction.
**Risk:** R3, because reviewer/merge policy and root agent guidance are
governance-sensitive by effect. **Scope:** live policy supersession, shadow
contract reconciliation, disabled fixture scenarios, review evidence and
protected PRs. No GitHub setting, grant, broker, schedule, auto-merge,
root-policy cutover or Release change.

## Observed baseline and trust boundaries

Canonical GitHub `main` is `8c4c8e558d437d2874dbb1365f3d69c05e295b64`.
The live branch summary reports protected `main` and required `verify`,
`CodeQL`, `Dependency review` contexts from Actions App 15368. Full protection
read returns 403 to the connector; effective reviewer/bypass settings must
remain `UNKNOWN` until an owner-admin observation. The founder attachment
contains a screenshot observation that approvals are OFF; do not promote that
historical screenshot into a fresh API read. PR #25 is separate draft;
#26 targets main, #27 targets #26, #28 targets #27 and #29 targets #28.
All five show zero submitted reviews at this Plan observation. The stack is
shadow/disabled and root ICM remains live.

The Builder can edit the repository, including Markdown and fixture code.
GitHub rules, frozen founder acceptance, protected reviewer host and status
publisher are separate trust boundaries. This task creates no such host.
Threats include stale or spoofed review/check evidence, author self-approval,
risk laundering, changed acceptance/workflow definitions, wrong-App results,
model confidence hiding a security regression, and a policy PR approving its
own merge. Re-review and manual founder integration preserve these boundaries
until real external enforcement exists. Rollback is a reviewed revert of the
policy PR; historical manifests/evidence stay intact.

## Accepted outcomes

1. Live ICM names separate technical Verify, effective GitHub-native approval,
   exact-head required checks, manual founder integration and separate Release.
2. ICM Next shadow contracts describe the same governance without enabling the
   shadow runner or rewriting prior evidence.
3. GV01–GV16 are executed as disabled fixtures or challenged against actual
   observations, with each proof class and remaining gap explicit.
4. Existing application, CI and old runtime are unchanged. A separate source
   review challenges the final diff. Publication uses protected PRs and keeps
   #26–#29 history intact; any blocked publication is reported precisely.
