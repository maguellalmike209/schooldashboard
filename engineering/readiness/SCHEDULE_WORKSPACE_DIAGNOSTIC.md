# Scheduled workspace diagnostic — 2026-10-11 PDT

## Actual observed invocation

The existing five-minute read-only Manager pilot chat `01a12dc6-c77f-7300-b664-56936db15410` ran at `2026-10-12T01:48:11Z` (actual scheduled turn start approximately `01:48:11Z`). Codex reports its execution host as `local` but its bound working directory as `%USERPROFILE%\\Documents\\Codex\\2026-10-11\\new-chat-2`, a projectless directory rather than the saved School Dashboard project checkout. A PowerShell `Get-Location`/directory listing and a search under that Codex Documents tree found no `schooldashboard` checkout. The run reported local branch/HEAD/CLI unavailable and did not invent them. Later actual ticks at `01:53`, `01:58`, and `02:03Z` read remote GitHub and reported no material change. This proves recurring invocation and remote connector reachability only.

The pilot did **not** attempt `git rev-parse` on the intended checkout path, record its scheduled SID, inspect Node availability, or run a canary ACL denial. Thus the exact sandbox reachability of `%USERPROFILE%\\Projects\\schooldashboard` from that scheduled context is **UNKNOWN**. Its current binding itself is wrong for the intended project. The initial result is `SCHEDULE_WORKSPACE_UNAVAILABLE` for the configured pilot; `NATIVE_TRIGGER_UNSUITABLE` for request-only use under the currently broad GitHub permission, pending a separately constrained identity/connector proof.

## Foreground device inventory (different context)

This foreground chat is bound to `%USERPROFILE%\\Projects\\schooldashboard`, Git root `C:/Users/mague/Projects/schooldashboard`, clean initial branch `codex/icm-next-m5-m6`, initial HEAD `512b9f3d0b5b3ccdb96a10cbd11c1a6babc5a0de`. Windows reports build `10.0.26200.0`, PowerShell `7.6.5`, Node `v24.21.0`, Codex CLI `0.162.0-alpha.17.2`. `whoami /user` identified a local interactive SID ending `-1001`; the full SID is deliberately excluded from this repository report. Codex CLI printed a temporary-directory access warning, then its version; this does not prove it works under a future restricted worker.

The current desktop task has workspace-write access to the project. The GitHub connector can perform writes under its **Allow all actions** app setting. Neither a prompt saying READ-ONLY nor a workspace-write sandbox establishes the G2 request-only boundary. Actual scheduled SID, sandbox roots, per-task connector restrictions, and access to the canonical checkout require a separate observational run under the intended schedule binding; no schedule was changed here.

## Safe trigger alternative for founder review

If native Scheduled cannot bind to an isolated project workspace and connector profile, propose a Windows Task Scheduler task under a dedicated request-only identity. Its sole action would submit a fixed opaque wake request to the protected broker; the broker would independently choose the current grant/work item. This is a design proposal, not an installed task. Before activation prove OS denial against disposable labeled canaries and no inherited GitHub write connector.
