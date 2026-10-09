# M3 — GitHub Review, Check, Token and Publisher Assurance

**No branch rules or credentials will be changed by M3.** Investigate via read-only APIs and provide the founder with precise owner-admin review instructions.

## GitHub trust properties

1. Record exact `owner/repo`, PR number, base, branch, head SHA, merge SHA, source identity and timestamps on every observation.
2. Required checks must be verified by **context name and App identity** and tied to the **final exact PR head**. A green screenshot or check from a former commit is not admissible.
3. For protected `main`, inspect actual applicable branch rules/rulesets, required approvals, CODEOWNERS (if any), dismissal of stale approvals, review bypass actors, force-push/deletion controls, permissions to alter workflow/check definitions, and merge methods. `protected: true` and a list of check contexts do not prove reviewer policy. A 403 means UNKNOWN, not success.
4. Branch/PR mutation, if eventually needed, belongs to separately isolated publisher credentials and allowlisted scopes. A worker or Scheduled model cannot have the repository's all-action GitHub connector, owner PAT/SSH or admin identity. M3 does not provision any publisher.
5. No automatic merging, reviewer spoofing, status spoofing, changes to CodeQL/dependency gates, privileged release or direct `main` push.
6. If one contributor/account cannot obtain independent GitHub approval, record this as a governance limitation. Do not silently reinterpret a model's review text as independent GitHub approval.
7. GitHub read errors, stale remote, inconsistent PR heads, `404/403`, missing status or branch ancestry uncertainty lead to UNKNOWN/BLOCKED; do not issue INTEGRATED.

## Read-only audit output contract

```text
repository, observed_at_utc, api_source, base_sha, pr_id, head_sha,
required_check_contexts_with_app_ids, observed_check_runs_at_exact_head,
PR_review_evidence, actual_ruleset_policy_evidence, bypass_actors_visibility,
merge_and_canonical_ancestry, limitations, verdict
```

Expected results may be `PASS_HOSTED_CHECKS`, `PENDING_REVIEW`, `PROTECTION_UNKNOWN`, `HEAD_CHANGED`, `FAIL`, `UNKNOWN`. A PR marked merged is not enough until canonical ancestry is read independently. Read-only check clients may be tested with mocked GitHub responses, but those prove only software semantics.

## Existing tracked PR separation

- **PR #26** is M0/M1 SHADOW work; read latest HEAD, review and CI before treating it as integrated.
- **PR #25** is SD-020's disabled trusted writer; keep it separate and do not merge/rebase/close under M2–M4 authority.
- M2–M4's own PR should be stacked on PR #26 if M1 remains open, or target protected `main` when M1 actually merges. Never claim protected-main integration based on a stacked-branch merge alone.
