# Architecture Documentation — HCM Engineering Portal

## 1. Overview & Context

HCM Engineering Portal is an internal workspace designed specifically for the Ho Chi Minh Technical Team (~14 field & integration engineers) at Phuong Dong Medical.

The portal provides a unified, reliable entry point for four core functional domains:
1. **Knowledge Catalogue**: Indexed repository of medical equipment manuals, LIS connection protocols (ASTM, HL7 v2.x), and troubleshooting runbooks.
2. **Engineering Tools**: Authoritative distribution hub for internal software utilities (LIS bridges, serial port sniffers, calibrators), with version tracking, OS requirements, and SHA-256 checksums.
3. **Tool & Equipment Booking**: Inventory checkout and return system for shared field equipment (Moxa converters, optical calibrators, multimeters), preventing double-booking and tracking custody history.
4. **Technical Chat (Beta)**: Low-friction UI placeholder for a future technical assistant, designed to interface with an external backend without burdening the portal host.

---

## 2. Architectural Constraints & Decision Principles

- **Single Next.js Application & Single Repository**: Eliminates unnecessary monorepo overhead, microservice boundaries, or dynamic plugin engines for a 14-person team.
- **Strict Separation by Feature (`src/features/<feature-name>/`)**:
  - Each feature is encapsulated in its own folder containing its types, components, business logic, and mock/client data services.
  - Features do not couple or import from the internal implementation details of sibling features.
- **Thin Routing Layer (`src/app/`)**:
  - `src/app/` is strictly reserved for Next.js file-system routing, layouts, and page-level composition.
  - Page components delegate immediately to feature root components.
- **Strict TypeScript & Minimal Dependencies**:
  - Strict type checking enabled (`strict: true`, no implicit `any`).
  - Standard UI primitives and Tailwind CSS; no heavy external UI component suites.
- **Zero Clinical Data**:
  - The portal strictly handles hardware/software engineering assets. No patient-identifiable data (PHI) or clinical diagnostic results are processed or stored.
- **Free-Tier Infrastructure Ready**:
  - Deployed on Vercel Hobby ($0).
  - Persistence backed by Supabase PostgreSQL ($0 Free Tier).

---

## 3. Directory Layout

```text
hcm-engineering-portal/
├── docs/
│   ├── ARCHITECTURE.md          # Architectural baseline and conventions
│   ├── ROADMAP.md               # Milestones and progression plan
│   ├── DATA_MODEL.md            # Entity schemas and database mappings
│   └── DEVELOPMENT_WORKFLOW.md  # Engineering workflows and testing practices
├── supabase/
│   └── migrations/              # Versioned SQL migrations for Supabase
├── src/
│   ├── app/                     # Routing and page composition
│   │   ├── layout.tsx           # Global shell & responsive navigation
│   │   ├── page.tsx             # Home dashboard & status overview
│   │   ├── knowledge/           # Knowledge catalogue route
│   │   │   └── page.tsx
│   │   ├── tools/               # Engineering tools route
│   │   │   └── page.tsx
│   │   ├── booking/             # Equipment booking route
│   │   │   └── page.tsx
│   │   └── chat/                # Technical chat route (Beta)
│   │       └── page.tsx
│   ├── components/              # Genuinely shared UI elements
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── Badge.tsx
│   │   └── Card.tsx
│   ├── features/                # Domain-driven feature modules
│   │   ├── knowledge/           # Technical document catalogue & search
│   │   │   ├── types.ts
│   │   │   ├── data.ts
│   │   │   └── components/
│   │   ├── tools/               # Software distribution & release notes
│   │   │   ├── types.ts
│   │   │   ├── data.ts
│   │   │   └── components/
│   │   ├── booking/             # Equipment booking & checkout rules
│   │   │   ├── types.ts
│   │   │   ├── rules.ts         # Pure business logic (transitions & validation)
│   │   │   ├── rules.test.ts    # Unit tests for double checkout & transitions
│   │   │   ├── data.ts
│   │   │   └── components/
│   │   └── chat/                # Technical chat beta placeholder
│   │       ├── types.ts
│   │       └── components/
│   └── lib/                     # Cross-cutting utilities (formatting, date)
├── AGENTS.md                    # Engineering protocols for developers & agents
├── README.md                    # Project documentation & local setup
└── package.json
```

---

## 4. Visual Identity & Design System

The visual style follows a professional, clean **medical-technical blue & neutral palette**:
- **Primary / Action**: Tech Blue (`#0284c7` / `text-sky-600`, `bg-sky-600`) and Navy Slate (`#0f172a` / `slate-900`).
- **Surface**: Clean light slate background (`bg-slate-50`) with white elevated cards (`bg-white border-slate-200`) and subtle shadows.
- **Accents**: Emerald for available/healthy states, Amber for checked-out/in-use states, Rose for overdue/error states.
- **Typography**: Clean sans-serif with monospace font for technical codes (SHA-256, ASTM/HL7, Serial Numbers).
