# AGENTS.md — Engineering Protocols & Agent Directives
> **Project**: HCM Engineering Portal  
> **Audience**: Ho Chi Minh Technical Team (~14 Engineers) — Phuong Dong Medical  
> **Architecture**: Single Next.js Application with Feature-Driven Architecture (`src/features/*`)

---

## 1. Core Engineering Principles

1. **Simplicity & Maintainability First**:
   - Single Next.js application and single repository.
   - Do NOT introduce microservices, Docker, message queues, or a dynamic plugin engine.
   - Keep the codebase lightweight, pragmatic, and directly maintainable by a team of ~14 engineers.

2. **Feature-Driven Architecture (`src/features/<feature-name>/`)**:
   - Every domain feature lives inside `src/features/<feature-name>/`:
     - `src/features/knowledge/` — Technical document catalogue & search.
     - `src/features/tools/` — Engineering software catalogue, versions, and downloads.
     - `src/features/booking/` — Equipment checkout, return, and custody tracking.
     - `src/features/chat/` — Technical assistant beta placeholder (UI prototype only).
   - Each feature encapsulates its own types, components, business rules, and mock/client data.
   - Do NOT couple the internal implementation of one feature to another feature.

3. **Thin Routing Layer (`src/app/`)**:
   - `src/app/` is strictly for route definition, layouts, metadata, and page composition.
   - Page files (`src/app/**/page.tsx`) should import and render feature root components, not house dense business logic.

4. **Shared Components Discipline (`src/components/`)**:
   - Use `src/components/` only for genuinely shared, feature-agnostic UI (e.g., `Navbar`, `Footer`, `Badge`, `Button`, `Card`).
   - If a component is specific to one domain (e.g., `ToolCard`, `BookingModal`), keep it inside that feature's directory.

5. **Strict TypeScript & Zero `any`**:
   - TypeScript is configured in strict mode. All interfaces and props must be explicitly typed.
   - Use domain models defined in `<feature>/types.ts`.

6. **Healthcare & Data Privacy Baseline (Zero PHI)**:
   - This portal is strictly for internal equipment, technical documentation, and software utilities.
   - NEVER store or process patient-identifiable data (PHI) or clinical diagnostic results.

7. **Free-Tier Discipline ($0 Infrastructure)**:
   - Hosting on Vercel Hobby tier.
   - Database persistence on Supabase Free Tier (PostgreSQL with Row Level Security).
   - Only connect to Supabase when environment variables are actively configured. Never pretend the app is connected to Supabase if it is unconfigured.

---

## 2. Business Rules & Invariants

1. **Equipment Booking Lifecycle**:
   - An equipment item can only transition: `available` -> `in_use` -> `available` (or `maintenance`).
   - Double-booking prevention: An equipment item with an `active` booking cannot be checked out again until returned.
   - Pure validation functions in `src/features/booking/rules.ts` enforce these rules and must be tested via unit tests (`src/features/booking/rules.test.ts`).

2. **Software Catalogue & Integrity**:
   - Software versions must specify supported operating systems (e.g., Windows 10/11, Windows Server, Linux).
   - Download URLs must point to valid endpoints (e.g., GitHub Releases CDN or internal storage).
   - Release metadata must be separated from UI presentation components.

3. **Technical Chat Constraint**:
   - Marked clearly as Beta / Prototype.
   - Do not implement an AI backend yet; provide diagnostic prompt templates and clear user expectation management.

---

## 3. Development & Verification Sequence

Before declaring any task or ticket complete, the following commands must be run and pass without errors:
1. `pnpm typecheck` — Strict TypeScript compile.
2. `pnpm test:run` — Unit test suite execution.
3. `pnpm lint` — ESLint validation.
4. `pnpm build` — Production Next.js build.
