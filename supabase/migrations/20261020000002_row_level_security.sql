-- ====================================================================
-- Migration: 20261020000002_row_level_security.sql
-- Description: Row Level Security (RLS) policies for HCM Engineering Portal
-- Target: Supabase / PostgreSQL 16
-- ====================================================================

-- 1. Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tools ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.knowledge_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.equipment ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.equipment_bookings ENABLE ROW LEVEL SECURITY;

-- 2. Helper functions to verify roles from JWT and profiles table
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. Policies for profiles
CREATE POLICY "Profiles are viewable by authenticated users"
ON public.profiles FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Users can update their own profile"
ON public.profiles FOR UPDATE
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- 4. Policies for tools catalogue
CREATE POLICY "Active tools are viewable by authenticated users"
ON public.tools FOR SELECT
TO authenticated
USING (is_active = true OR public.is_admin());

CREATE POLICY "Admins can insert or modify tools"
ON public.tools FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- 5. Policies for knowledge documents
CREATE POLICY "Knowledge documents are viewable by authenticated users"
ON public.knowledge_documents FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Admins can insert or modify knowledge documents"
ON public.knowledge_documents FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- 6. Policies for equipment inventory
CREATE POLICY "Equipment items are viewable by authenticated users"
ON public.equipment FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Admins can manage equipment inventory"
ON public.equipment FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- 7. Policies for equipment bookings
CREATE POLICY "All authenticated users can view bookings"
ON public.equipment_bookings FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Engineers can check out available equipment for themselves"
ON public.equipment_bookings FOR INSERT
TO authenticated
WITH CHECK (
  auth.uid() = user_id
  AND status = 'active'
);

CREATE POLICY "Engineers can return their own active bookings"
ON public.equipment_bookings FOR UPDATE
TO authenticated
USING (
  (auth.uid() = user_id AND status = 'active')
  OR public.is_admin()
)
WITH CHECK (
  (auth.uid() = user_id AND status IN ('active', 'returned'))
  OR public.is_admin()
);
