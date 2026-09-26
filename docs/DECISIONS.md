# School Dashboard — Durable Decisions

Only established decisions belong here. Task-local choices remain in their plans; future possibilities are not decisions.

| Decision | Established choice | Basis |
| --- | --- | --- |
| Product focus | Personal academic planning centered on what to do today to stay on track in classes. | [PRODUCT_VISION.md](PRODUCT_VISION.md) |
| First milestone | Use mock/hardcoded data in a read-only UI for one fictional student and one current term. No persistence, uploads, authentication, external research/integrations, or intelligence engine is included. | Approved product-foundation scope; [V1_SPEC.md](V1_SPEC.md) |
| Primary V1 views | Dashboard, Courses, Course Page, Weekly Plan, and Today are required primary views. Weekly Plan and Today cannot be satisfied only by Dashboard sections. | Approved five-view UX; [V1_SPEC.md](V1_SPEC.md) |
| Course-source authority | Current instructor/current-course sources outrank historical or general sources for course facts. External research enriches understanding and must not silently replace authoritative current materials. | Approved source-grounding principle; [PRODUCT_VISION.md](PRODUCT_VISION.md) |
| Provenance and uncertainty | Important course information retains its origin; current-course facts, supplemental research, and AI inference/suggestions remain distinguishable. Preserve uncertainty rather than invent certainty or numerical confidence scores. | Approved research-accuracy principles; [PRODUCT_VISION.md](PRODUCT_VISION.md) |
| Student approval of generated plans | Future AI plans and revisions remain advisory: the student can accept, edit, reject, or request regeneration. Suggestions do not silently become or replace an accepted student plan. | Approved human-control principle; [PRODUCT_VISION.md](PRODUCT_VISION.md) |
| Product model boundary | Define academic concepts and UI behavior before implementation; conceptual entities do not establish database tables, schemas, or infrastructure. | Product-definition task scope; [V1_SPEC.md](V1_SPEC.md), [ARCHITECTURE.md](ARCHITECTURE.md) |
| Planned initial stack | Next.js, React, TypeScript, and Tailwind CSS; not yet initialized or installed. | [ARCHITECTURE.md](ARCHITECTURE.md) |
| Engineering workflow | Reuse Plan → Build → Verify, with progressive disclosure, human review, and verification before claiming established implementation. | [AGENTS.md](../AGENTS.md) and its linked stage instructions |
| Documentation and task conventions | Use the six durable documents routed from root CONTEXT.md and the SD-XXX task prefix. | [CONTEXT.md](../CONTEXT.md), [TASKS.md](TASKS.md) |
