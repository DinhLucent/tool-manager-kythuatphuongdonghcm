# Development Roadmap — HCM Engineering Portal

## Project Goal
Deliver a lightweight, highly maintainable engineering hub for the Ho Chi Minh Technical Team (~14 field & integration engineers) supporting Phuong Dong Medical.

---

## Milestone 1: Scaffold & Architecture Foundation (Current)
- [x] Consolidate architecture into a single clean Next.js repository with `src/features/`.
- [x] Configure strict TypeScript compilation and Tailwind CSS.
- [x] Establish testing framework (`vitest`) for business rule validation.
- [x] Create comprehensive architecture and workflow documentation (`docs/*`).
- [x] Deploy unified responsive shell with top navigation and quick stats.

---

## Milestone 2: Feature Implementation (Phase 1 MVP)

### 1. Engineering Tools (`/tools`)
- [x] Strongly typed software catalogue model (`types.ts`).
- [x] Detail view: Name, description, category, version, supported OS list, release notes.
- [x] Download URLs with SHA-256 checksum verification badge.
- [x] Operating system filters (Windows 10/11, Windows Server, Linux, macOS).
- [ ] Direct GitHub Releases API integration for dynamic asset fetching.

### 2. Knowledge Base (`/knowledge`)
- [x] Strongly typed document catalogue model (`types.ts`).
- [x] Detail view: Title, manufacturer, device model, document type, keywords, document URL.
- [x] Multi-facet client-side search & filtering by manufacturer and document type.
- [ ] Google Drive 5TB indexer integration.

### 3. Tool & Equipment Booking (`/booking`)
- [x] Domain model for Equipment and Bookings (`types.ts`).
- [x] State machine rules preventing double checkout (`rules.ts`).
- [x] Interactive checkout, return, and booking history tracking.
- [x] Automated unit test suite verifying business invariants (`rules.test.ts`).
- [ ] Supabase persistence with server-side transaction locks.

### 4. Technical Chat (`/chat`)
- [x] Clean Beta Placeholder UI clearly indicating prototype status.
- [x] Mock prompt response interface with diagnostic quick templates.
- [ ] Connect Edge Runtime streaming proxy to external AI backend.

---

## Milestone 3: Supabase Persistence & Authentication (Phase 2)
- [ ] Execute versioned SQL migrations (`supabase/migrations/`).
- [ ] Enforce Row-Level Security (RLS) for `admin` and `engineer` roles.
- [ ] Configure Google Workspace SSO (`@phuongdong.com.vn`).
- [ ] Server-side validation of checkout state machine using PostgreSQL transactions.

---

## Milestone 4: Operational Automation (Phase 3)
- [ ] Automated keep-alive GitHub Actions workflow for Supabase free-tier preservation.
- [ ] Equipment return reminder notifications via Telegram/Zalo webhook.
