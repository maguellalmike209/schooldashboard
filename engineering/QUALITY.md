# ICM Next — Independent Quality, Security and Master Verify

**Status:** SHADOW M1 CONTRACT. Existing CI and security tests remain enabled/authoritative.

## 1. Evidence hierarchy and independence

A claimed PASS is supported by actual test commands/results, environment, commit SHA, frozen acceptance and independently observable evidence. Distinguish: `VERIFIED`, `HISTORICAL`, `LOCAL`, `PROPOSED`, `ACCEPTED`, `UNKNOWN`, `BLOCKED` and `FAILED`. A role label, prompt instruction or different chat window is not proof of independent identity; independently enforced CI and scoped reviewer approvals supply stronger evidence. An agent cannot modify the test/acceptance baseline to make its own implementation look correct without crossing the relevant approval boundary.

**Three different checks must remain distinct:**

- **Work Item Verify:** target behavior, negative cases, regression, data authorization and applicable failure state; reproduce against exact code version.
- **Integration Verify:** required hosted CI/security jobs, exact PR head, correct app identities, reviewers and protected main reconciliation (as independently observed).
- **Milestone Master Verify:** original approved **student/user journey**, rather than whether all work-item checkboxes turned green.

Master Verify **never substitutes** for the first two, and neither CI PASS nor all work items Done establishes product quality or legal compliance.

## 2. Master Verify acceptance template

For each milestone, freeze and independently retain:

1. User persona, baseline, intended end-to-end workflow and evidence of student value.
2. Positive behavior and negative/failure/empty/loading/save/error/cancel conditions.
3. Data ownership, authentication/authorization and cross-user isolation when applicable.
4. Input validation and security controls affected by the milestone; applicable privacy, retention/deletion and secret exposure threats.
5. Accessibility/usability criteria meaningful for the actual UI and user population.
6. Performance, reliability, audit, backup/recovery, provider cost and operational readiness as **applicable**, not ceremonial.
7. Regressions against nearby verified behavior and final integrated SHA.
8. Unresolved limitations, their impact and founder decision boundary.

Run Master Verify *after* final relevant integration, not merely at Plan or local Build. If appropriate real-user testing or environment validation is unavailable, label it pending; do not claim full production-ready PASS. An end-to-end browser test may require separate negative ownership tests. Output `PASS`, `NEEDS_WORK` or `BLOCKED` with evidence-linked reasons; for `NEEDS_WORK`, generate only necessary candidate repairs.

## 3. Risk-proportional quality profiles

| Surface | Must challenge | Additional product/commercial trigger |
| --- | --- | --- |
| Internal docs/low-risk UI | Clarity, regression, links/docs, required existing CI | None unless it changes substantive claims |
| Student interaction | Usability, accessible names/status, save success/error, loading and truthful navigation | User pilot/adoption evidence as relevant |
| Auth/private persistence | Actor resolution, server-side ownership, DB RLS, cross-user negatives, injection and data integrity | Deletion/retention/support and real-user privacy readiness |
| Uploads and external materials | Private file access, malicious content, size/type, deletion, provenance/licensing | Copyright and vendor data processing |
| AI-generated plans | Source grounding, uncertainty, student acceptance, prompt injection and budgets | Provider model data usage, unit cost, disclosures |
| Real-user beta | Incident response, monitoring, accessible workflows, backup restore tests | Privacy/terms/consent/support obligations verified by relevant source |
| Billing/paid | Accurate entitlement, renewal/cancellation/refund, exception handling and audit | Jurisdiction-specific legal/tax/consumer obligations and business viability |
| Production Release | Exact artifact, deployment privileges, rollback, observability, aftercare | Separate current release authorization |

Apply checks to the actual risk/lifecycle stage. Do not run an entire market/legal research program for a CSS fix. Do not represent an AI legal summary as a compliance certificate. Consult relevant accepted `docs/SECURITY*`, `docs/DATA_PRIVACY.md`, `docs/PRODUCT_READINESS.md`, and currently authoritative sources when a real product gate requires it.

## 4. Negative evidence and suspicious success

Challenge spoofed checks, stale PR commits, forged review identity, untested cross-user behavior, unreviewed migrations, poisoned fixture expectations, disabled CI, unsupported claims about CodeQL/branch protections, and direct edits to verifier-owned acceptance. Fail closed where control-plane authority cannot be established. Local replay of fixture evidence cannot establish Windows host/connector security.

## 5. Quality efficiency and reporting

Use risk-based test selection while preserving mandatory status checks. Cache/reuse evidence only if exact tested state and relevant environment are unchanged; otherwise rerun. Link technical artifacts instead of copying logs into every report. Repair verified low-risk defects within grant boundaries; material changes return to Plan/authority. A completed milestone should produce a short outcome proof and a small issues/limitations register.
