import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

/**
 * Server client
 */
export function createSupabaseServerClient() {
  let cookieHeader = "";

  try {
    // Next build sẽ throw nếu không có request context
    const cookieStore = cookies() as any;
    cookieHeader = cookieStore?.toString?.() ?? "";
  } catch {
    cookieHeader = "";
  }

  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        persistSession: false,
      },
      global: {
        headers: {
          Cookie: cookieHeader,
        },
      },
    }
  );
}

/**
 * Admin client
 */
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

/**
 * Config checker
 */
export function hasSupabaseConfig() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}