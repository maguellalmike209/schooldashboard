# Device-specific host installation change plan — FOR REVIEW ONLY

Target device observed in the foreground: Windows build `10.0.26200.0`, PowerShell `7.6.5`, Node `v24.21.0`, Codex CLI `0.162.0-alpha.17.2`, current canonical checkout `%USERPROFILE%\\Projects\\schooldashboard`. The scheduled pilot currently binds to `%USERPROFILE%\\Documents\\Codex\\2026-10-11\\new-chat-2`. The interactive account SID ends `-1001`; no intended runtime SIDs have been created or verified. This plan proposes one host only. **No command below was executed.**

## Proposed identities and paths

Owner/operator: existing interactive founder account. Proposed local identities: `ICMNextTrigger` (request only), `ICMNextBroker` (read owner grant, write lock/journal), `ICMNextWorker` (one isolated worktree), `ICMNextPublisher` (later draft PR only). Real names/SIDs, credential provisioning, service logon rights and use of local accounts versus managed identities require founder/administrator review. Do not share the founder account or broad desktop GitHub plugin with these identities.

Proposed control paths: `C:\\ProgramData\\SchoolDashboardICMNext\\owner\\grant.json`, `...\\broker\\` pinned executable, `...\\state\\` journal/lock, and `C:\\SchoolDashboardICMNextWork\\` disposable worker checkout. The grant must be outside broker-writable state, worker checkout and source checkout. Protected owner config must pin the reviewed broker code SHA. The static `host-preflight.mjs` can reject obvious overlaps but cannot authenticate reparse points or ACLs.

## Reviewable staged procedure and commands

1. **Read-only preflight, allowed now:** `whoami /user`; `Get-ComputerInfo | Select-Object WindowsProductName,OsVersion,OsBuildNumber`; `node --version`; `codex --version`; `git -C "$env:USERPROFILE\\Projects\\schooldashboard" rev-parse HEAD`; `icacls "$env:USERPROFILE\\Projects\\schooldashboard"`. Capture only relevant ACEs; never dump secrets or `.env` values.
2. **Privileged identity creation, separate YES required:** proposed exact elevated PowerShell commands below create Trigger/Broker/Worker only. Publisher creation remains a separate later decision after G5. Passwords are entered interactively and never written to the repository. Record resulting SIDs and confirm account groups with `Get-LocalGroupMember`; prohibit administrator membership. The founder must approve names, account type, password rotation and service logon rights before these commands can run.

   ```powershell
   New-LocalUser -Name 'ICMNextTrigger' -Password (Read-Host 'Trigger password' -AsSecureString) -AccountNeverExpires
   New-LocalUser -Name 'ICMNextBroker' -Password (Read-Host 'Broker password' -AsSecureString) -AccountNeverExpires
   New-LocalUser -Name 'ICMNextWorker' -Password (Read-Host 'Worker password' -AsSecureString) -AccountNeverExpires
   Get-LocalUser -Name 'ICMNextTrigger','ICMNextBroker','ICMNextWorker' | Select-Object Name,SID,Enabled
   ```

3. **Privileged path/ACL installation, separate YES required:** the proposed elevated commands below use the observed device path and the new actual SIDs. They must be reviewed as a unit, with a protected ACL backup and no real grant present. Windows `icacls` rights are Owner/SYSTEM/Admin full, Broker read on owner/code and modify state, Worker modify only disposable work, and Trigger no control-root ACL. A fixed request endpoint still needs its own design and proof; these ACLs do not install one.

   ```powershell
   $root = 'C:\ProgramData\SchoolDashboardICMNext'
   $work = 'C:\SchoolDashboardICMNextWork'
   $ownerSid = [Security.Principal.WindowsIdentity]::GetCurrent().User.Value
   $brokerSid = (Get-LocalUser -Name 'ICMNextBroker').SID.Value
   $workerSid = (Get-LocalUser -Name 'ICMNextWorker').SID.Value
   New-Item -ItemType Directory -Path "$root\owner","$root\broker","$root\state",$work -Force
   icacls.exe "$root\owner" /inheritance:r /grant:r "*${ownerSid}:(OI)(CI)F" '*S-1-5-18:(OI)(CI)F' '*S-1-5-32-544:(OI)(CI)F' "*${brokerSid}:(OI)(CI)R"
   icacls.exe "$root\broker" /inheritance:r /grant:r "*${ownerSid}:(OI)(CI)F" '*S-1-5-18:(OI)(CI)F' '*S-1-5-32-544:(OI)(CI)F' "*${brokerSid}:(OI)(CI)R"
   icacls.exe "$root\state" /inheritance:r /grant:r "*${ownerSid}:(OI)(CI)F" '*S-1-5-18:(OI)(CI)F' '*S-1-5-32-544:(OI)(CI)F' "*${brokerSid}:(OI)(CI)M"
   icacls.exe $work /inheritance:r /grant:r "*${ownerSid}:(OI)(CI)F" '*S-1-5-18:(OI)(CI)F' '*S-1-5-32-544:(OI)(CI)F' "*${workerSid}:(OI)(CI)M"
   ```

   Before those changes, save any existing target ACLs in an owner-protected location with `icacls.exe <approved-target> /save <approved-backup> /t`; if a target is newly created, record its parent ACL and creation time. Afterward inspect effective access under each real SID and run only labeled disposable canary deny/allow probes, including junction aliases. Do not put a real grant in place or infer canonical-checkout denial from absence of an explicit ACE.
4. **Pinned broker and issuer, separate YES required:** copy a reviewed build to `...\\broker\\`, record SHA-256 and code-signing provenance, bind the grant digest/revision/expiry to owner-controlled storage, install a broker service or scheduled task under the Broker identity only after the OS/process lease and revocation design passes review. No repository script currently implements this installed boundary.
5. **Trigger and worker, separate YES required:** if native Scheduled cannot expose a fixed request-only identity without the GitHub write app, propose a Windows Task Scheduler task under `ICMNextTrigger` whose fixed executable sends a constant wake request. The broker alone selects work. Configure Worker token/worktree restrictions and Windows Job Object lifecycle. Run canary allow/deny, concurrency, descendant and revoke rehearsals under actual identities. Install Publisher last, with draft branch/PR rights only after G5 admin proof.

## Operator checkpoints and rollback

At every step, stop if actual SID, canonical/reparse path, ACL, connector scope, pinned SHA, cost bound or CI/reviewer policy differs from the approved record. Owner pause/revoke must be available before any writer exists. Keep the trigger disabled during installation. If a canary fails, stop service/task, preserve journal and logs, revoke any test grant/credential, prove child tree stopped, restore saved ACLs using the operator-reviewed backup, and leave all schedules disabled. Do not remove an uncertain lease or discard dirty work. Root router cutover, real grants, live canary, auto merge and Release require separate decisions.
