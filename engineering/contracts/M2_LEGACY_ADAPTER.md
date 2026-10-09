# M2 — Lossless Read-Only Adapter and Evidence Reconciliation

## Strict scope

Build a **read-only** bridge from active legacy ICM data to shadow records. No writes to `docs/TASKS.md`, existing stage files, SD-018 grant formats, old task IDs, current branches, or the SD-020 draft. Adapter output is tagged `LEGACY_OBSERVED` with source SHA/commit and cannot be fed back as an accepted founder grant.

## Sources and authoritative weighting

1. Live Git and GitHub PR/CI at exact head (when supplied by read-only fixture or read-only client).
2. Existing committed stage artifacts and explicit test outcomes, including limitations.
3. Structured `icm-task` blocks in `docs/TASKS.md` (metadata/status, not authorization).
4. Legacy prose tasks (descriptive context only; preserve ambiguous status as UNKNOWN).
5. SD-018 `inspectState` observations: selection/recovery simulation, not authority.
6. SD-020 PR #25 fixture modules: optional explicitly imported **untrusted candidate evidence** after independent audit; never silently treat as merged or operational.

If these disagree, preserve all sources and return a conflict record; do not overwrite newer facts with old markdown.

## Specific mapping rules

| Legacy datum | Shadow representation | Prohibited inference |
| --- | --- | --- |
| `SD-XXX` ID | `legacyId` + original status + source hash | Rename to `WI-XXX` or grant a new ID |
| `Not started` | Candidate/observed not-started, eligibility UNKNOWN | Assume authorized |
| `In progress` | Potential recovery required (inspect journal/Git) | Restart at Plan without reconciliation |
| `Ready for verification` | Pending independent Verify/PR reconciliation | Mark INTEGRATED |
| `Done` | Historical claim until exact evidence verified | Create new Master Verify PASS |
| `Blocked` | Blocked with extracted reason if grounded | Skip dependency automatically |
| SD-018 exact-ID grant | Evidence of **legacy test admission rules** | Treat as dynamic delegation |
| SD-020 PR #25 draft | Dependency reference marked UNMERGED/REVIEW_PENDING | Trust it as installed broker |
| `docs/DECISIONS.md` D-IDs | Stable read-only decision references | Rewrite history or create new approval |
| `docs/PRODUCT_READINESS.md` | Conditional evidence expectations | Legal certification |

Historical milestones may be grouped for reporting only if a recorded accepted source supports the grouping; never retroactively assert an approved outcome grant. Preserve original source text/link and conflicting observations.

## Deterministic parser rules

- Scan only `icm-task` fenced blocks in `docs/TASKS.md`; JSON parse each strict block with bounded size. Do not evaluate Markdown, execute code blocks, run arbitrary shell commands, follow user-specified paths or dereference web URLs embedded in the source.
- Duplicate IDs, duplicate fields, missing required metadata, malformed JSON, incompatible status or changed accepted fields produce `CONFLICT`/`BLOCKED` in shadow; no silent correction.
- Exact task hash derivation must reuse or faithfully cross-check `taskDigest` from the current SD-018 `core.mjs` in tests. No rewriting historical grant digests.
- Parse **historical prose** into a separate lossy observation list, not authoritative machine records.
- Show input source commit/branch/dirty state, PR and test evidence freshness; unknown remote means UNKNOWN, not current.
- Adapter exposes two APIs: `readLegacyTasks(text, sourceRef)` and `mapLegacySnapshot({ legacyTasks, evidence, git, pr, ...})`, both pure and JSON serializable.

## Recovery and integration safeguards

- Multiple unfinished legacy items: reconcile each independently by task ID. Global `latest INTEGRATED` for another task must not hide unfinished work.
- Pending PR belongs to a specific head and base. Check exact head, app IDs and final canonical ancestry, not only a green-check screenshot.
- Merely marking `Done` cannot make a new outcome complete.
- Keep read-only smoke checks of the original `inspect|report` CLI to prove compatibility.
- A PR #26-only shadow file may be read from its explicit HEAD for tests, but is not canonical `main` or an active source of authority.
