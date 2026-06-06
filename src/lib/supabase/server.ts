import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

/**
 * =========================
 * SUPABASE SERVER CLIENT
 * =========================
 */
export function createSupabaseServerClient() {
  const cookieStore = cookies();

  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        persistSession: false,
      },
      global: {
        headers: {
          Cookie: cookieStore.toString(),
        },
      },
    }
  );
}

/**
 * =========================
 * SUPABASE ADMIN CLIENT
 * =========================
 * ⚠️ chỉ dùng trong API / server logic
 */
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

/**
 * =========================
 * CONFIG CHECK (FIX BUILD ERROR)
 * =========================
 */
export function hasSupabaseConfig() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}