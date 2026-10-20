-- ====================================================================
-- Migration: 20261020000001_initial_schema.sql
-- Description: Core tables for HCM Engineering Portal (Profiles, Tools, Knowledge, Equipment, Bookings)
-- Target: Supabase / PostgreSQL 16
-- ====================================================================

-- 1. Profiles Table (Linked to auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('engineer', 'admin')) DEFAULT 'engineer',
  department TEXT NOT NULL DEFAULT 'HCM Field Engineering',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Engineering Tools Catalogue Table
CREATE TABLE IF NOT EXISTS public.tools (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('lis_bridge', 'serial_driver', 'diagnostic', 'utility')),
  version TEXT NOT NULL,
  supported_os TEXT[] NOT NULL DEFAULT '{}',
  release_notes TEXT NOT NULL,
  download_url TEXT NOT NULL,
  sha256_checksum TEXT NULL,
  file_size_bytes BIGINT NULL,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. Knowledge Documents Catalogue Table
CREATE TABLE IF NOT EXISTS public.knowledge_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  manufacturer TEXT NOT NULL,
  device_model TEXT NOT NULL,
  doc_type TEXT NOT NULL CHECK (doc_type IN ('service_manual', 'user_guide', 'interface_spec', 'troubleshooting_guide', 'wiring_diagram')),
  keywords TEXT[] NOT NULL DEFAULT '{}',
  document_url TEXT NOT NULL,
  file_size_bytes BIGINT NULL,
  summary TEXT NULL,
  language TEXT NOT NULL DEFAULT 'en' CHECK (language IN ('vi', 'en')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. Equipment Inventory Table
CREATE TABLE IF NOT EXISTS public.equipment (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  asset_code TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('interface_converter', 'calibrator', 'measuring', 'toolkit')),
  serial_number TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('available', 'in_use', 'maintenance')) DEFAULT 'available',
  location TEXT NOT NULL DEFAULT 'HCM Office Cabinet A',
  description TEXT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. Equipment Bookings (Custody tracking) Table
CREATE TABLE IF NOT EXISTS public.equipment_bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  equipment_id UUID NOT NULL REFERENCES public.equipment(id) ON DELETE RESTRICT,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE RESTRICT,
  purpose TEXT NOT NULL,
  site_name TEXT NOT NULL,
  checkout_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  expected_return_date TIMESTAMPTZ NOT NULL,
  actual_return_date TIMESTAMPTZ NULL,
  status TEXT NOT NULL CHECK (status IN ('active', 'returned', 'cancelled')) DEFAULT 'active',
  notes TEXT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ====================================================================
-- BUSINESS INVARIANT CONSTRAINTS
-- ====================================================================

-- Crucial: Enforce at the database level that an equipment item can have AT MOST ONE active booking
CREATE UNIQUE INDEX IF NOT EXISTS idx_unique_active_booking_per_equipment
ON public.equipment_bookings (equipment_id)
WHERE status = 'active';

-- Index for fast user booking lookup
CREATE INDEX IF NOT EXISTS idx_equipment_bookings_user_id
ON public.equipment_bookings (user_id);

-- Index for searching tools by slug & category
CREATE INDEX IF NOT EXISTS idx_tools_category
ON public.tools (category);

-- Index for searching knowledge by manufacturer & doc_type
CREATE INDEX IF NOT EXISTS idx_knowledge_manufacturer_doc_type
ON public.knowledge_documents (manufacturer, doc_type);
