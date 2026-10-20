/**
 * Supabase Client Configuration
 * 
 * Safety Rules:
 * 1. Never pretend the application is connected if environment variables are missing.
 * 2. Never expose SUPABASE_SERVICE_ROLE_KEY to the browser (client uses ANON key only).
 * 3. Gracefully reports connection status to features so they fall back to offline/mock data.
 */

export interface SupabaseConfigStatus {
  isConfigured: boolean;
  url: string | null;
  hasAnonKey: boolean;
}

export function getSupabaseConfigStatus(): SupabaseConfigStatus {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || null;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || null;

  return {
    isConfigured: Boolean(url && anonKey),
    url,
    hasAnonKey: Boolean(anonKey),
  };
}
