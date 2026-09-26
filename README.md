# School Dashboard

A personal academic planning application centered on one question:

> What should I do today to stay on track in my classes?

The first UI milestone is read-only and will use mock/hardcoded data across five primary views: **Dashboard, Courses, Course Page, Weekly Plan, and Today**. The application foundation uses Next.js, React, TypeScript, and Tailwind CSS. Product views and academic data have not been implemented yet.

## Run locally

Use Node.js 20.9 or later and npm. From the repository root:

```powershell
npm ci
npm run dev
```

Open `http://localhost:3000` to see the minimal foundation page.

## Checks

```powershell
npm run lint
npm run typecheck
npm run build
npm run start
```

Run `npm run start` after `npm run build`. The only application page is the root route in `src/app/page.tsx`; it does not contain Dashboard functionality.

Start with the [documentation router](CONTEXT.md), [V1 scope](docs/V1_SPEC.md), or [task roadmap](docs/TASKS.md). See the [product vision](docs/PRODUCT_VISION.md) for longer-term possibilities and [agent instructions](AGENTS.md) for the development workflow.
