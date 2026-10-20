# 🏥 HCM Engineering Portal

> **Internal engineering workspace for the Ho Chi Minh Technical Team (~14 field & integration engineers)**  
> *Phuong Dong Medical Equipment Co., Ltd.*

[![Next.js 15](https://img.shields.io/badge/Next.js-15_(App_Router)-000000?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict_Mode-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-Modern_UI-38BDF8?logo=tailwindcss)](https://tailwindcss.com/)
[![Vitest](https://img.shields.io/badge/Vitest-Unit_Tests-6E9F18?logo=vitest)](https://vitest.dev/)
[![License](https://img.shields.io/badge/License-Internal_Confidential-red)](#)

---

## 📌 1. Project Purpose

The HCM Engineering Portal consolidates technical resources, field equipment custody, and specialized software into a single, high-performance web workspace for the 14 engineers servicing hospital laboratories across Southern Vietnam.

The portal provides four primary features:
1. **Knowledge (`/knowledge`)**: Searchable repository of instrument service manuals, wiring schematics, and ASTM/HL7 interface specifications (Roche, Sysmex, Beckman Coulter, Mindray).
2. **Engineering Tools (`/tools`)**: Software download catalogue for LIS middleware, virtual COM port drivers, and test utilities, complete with version tracking, supported operating systems, release notes, and SHA-256 checksums.
3. **Tool & Equipment Booking (`/booking`)**: Real-time checkout and return tracking for shared field equipment (Moxa converters, optical calibrators, multimeters), enforcing business rules to prevent double-booking.
4. **Technical Chat (`/chat`)**: Beta placeholder for a technical diagnostic assistant, providing rapid prompt templates and offline diagnostic guides.

---

## 🏛️ 2. Architecture Overview

Built as a **single Next.js application** in a **single repository**, avoiding microservices or complex plugin architectures:

- **Routing Layer (`src/app/`)**: Thin Next.js App Router layer responsible for layout and page composition.
- **Feature Modules (`src/features/<feature-name>/`)**: Independent, self-contained domain modules containing their own types, components, business logic, and mock/client data:
  - `src/features/knowledge/`
  - `src/features/tools/`
  - `src/features/booking/`
  - `src/features/chat/`
- **Shared Components (`src/components/`)**: Genuinely shared UI elements (`Navbar`, `Footer`, `Badge`, `Card`).
- **Database Migrations (`supabase/migrations/`)**: Ready-to-apply PostgreSQL migrations with Row-Level Security (RLS) for Supabase Free Tier.

---

## 🚀 3. Quick Start & Commands

### Prerequisites
- Node.js >= 20.x
- pnpm >= 9.x

### Installation & Local Run
```bash
# 1. Install dependencies
pnpm install

# 2. Configure environment variables (optional for local mock mode)
cp .env.example .env.local

# 3. Start development server
pnpm dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Quality Verification Commands
```bash
# Run unit tests (Vitest)
pnpm test:run

# Verify strict TypeScript types
pnpm typecheck

# Lint codebase
pnpm lint

# Production build
pnpm build
```

---

## 📁 4. Project Structure

```text
AllinOne/
├── docs/
│   ├── ARCHITECTURE.md          # System design & constraints
│   ├── ROADMAP.md               # Milestones & planned enhancements
│   ├── DATA_MODEL.md            # Database schema & entity specifications
│   └── DEVELOPMENT_WORKFLOW.md  # Standards & testing requirements
├── supabase/
│   └── migrations/              # Versioned SQL migrations (RLS, schema)
├── src/
│   ├── app/                     # Routing & page composition
│   │   ├── layout.tsx           # Global shell & navigation
│   │   ├── page.tsx             # Home dashboard
│   │   ├── knowledge/page.tsx   # Knowledge document catalogue
│   │   ├── tools/page.tsx       # Engineering software catalogue
│   │   ├── booking/page.tsx     # Equipment booking & tracking
│   │   └── chat/page.tsx        # Technical assistant (Beta)
│   ├── components/              # Shared UI components (Navbar, Badge, etc.)
│   ├── features/                # Domain-specific feature modules
│   │   ├── knowledge/           # Document search & filters
│   │   ├── tools/               # Software distribution & release notes
│   │   ├── booking/             # State machine & double-booking prevention
│   │   └── chat/                # Beta chat placeholder UI
│   └── lib/                     # Shared utilities
├── AGENTS.md                    # Engineering protocols for AI & team
├── README.md                    # Project documentation
├── tsconfig.json                # Strict TypeScript configuration
└── package.json                 # Project dependencies & scripts
```

---

## 🔒 5. Healthcare Compliance & Security
- **No Protected Health Information (PHI)**: The portal is strictly for technical and logistics operations. No patient, sample, or diagnostic test results are handled.
- **Server-Side Secrets**: All database and future AI provider keys are kept strictly on the server side.
