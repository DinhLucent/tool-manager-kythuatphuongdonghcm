# Development Workflow & Standards — HCM Engineering Portal

This guide provides operational and quality instructions for developers working on the HCM Engineering Portal.

---

## 1. Local Environment Prerequisites

- **Node.js**: `v20.x` or later (LTS recommended).
- **Package Manager**: `pnpm` (v9.x or later).
- **TypeScript**: `v5.x` (enforced via project dependencies).

---

## 2. Standard Commands

| Command | Action | Verification Purpose |
|---|---|---|
| `pnpm install` | Install dependencies | Lockfile alignment (`pnpm-lock.yaml`) |
| `pnpm dev` | Start development server on port 3000 | Interactive testing & local UI preview |
| `pnpm test` | Run Vitest unit tests | Validates domain business logic (e.g., booking rules) |
| `pnpm test:run` | Single test execution pass | CI verification |
| `pnpm typecheck` | Strict TypeScript validation (`tsc --noEmit`) | Verifies zero type errors across the project |
| `pnpm lint` | Next.js / ESLint validation | Enforces code quality and formatting |
| `pnpm build` | Production Next.js compilation | Validates bundle, tree-shaking, and static routes |

---

## 3. Engineering Protocols & Code Organization

### 3.1. Feature-Driven Architecture
- Place all domain-specific logic, UI components, state management, and mock data under `src/features/<feature-name>/`.
- Do not import directly from the internal files of a sibling feature.
- Cross-cutting components (Navbar, Footer, generic Card, Badge) belong in `src/components/`.
- General utility functions (date manipulation, string formatters) belong in `src/lib/`.

### 3.2. Strict Type Safety
- All data models must be backed by explicit TypeScript interfaces or types.
- Never use `any`. Use `unknown` with runtime type narrowing if needed.
- Enable `strict: true` in `tsconfig.json`.

### 3.3. Business Rule Validation
- Critical state machine transitions (such as equipment booking, cancellation, and return) must be implemented as pure, testable functions in `<feature>/rules.ts`.
- Every transition rule must have accompanying unit tests in `<feature>/rules.test.ts` covering both nominal paths and edge cases (e.g. double checkout attempts, invalid state transitions).

### 3.4. Security & Healthcare Compliance (Zero PHI)
- The portal is an engineering and logistics support tool.
- Never store, process, or test with real patient health information (PHI), clinical test values, or medical records.
- All secrets (API keys, Supabase Service Role keys) must remain server-side and never be exposed in client code or `.env.local` committed to Git.

---

## 4. Pre-Commit / Pre-Push Checklist

Before pushing changes or submitting for code review, verify that all three quality gates pass:
```bash
pnpm typecheck
pnpm test:run
pnpm build
```
Any failure in these commands blocks production deployment.
