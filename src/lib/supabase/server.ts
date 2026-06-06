import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

/**
 * Server client (SSR safe)
 */
export function createSupabaseServerClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY; // ✅ FIX Ở ĐÂY

  if (!url || !key) {
    throw new Error("Missing Supabase public env");
  }

  let cookieHeader = "";

  try {
    cookieHeader = cookies().toString();
  } catch {}

  return createClient(url, key, {
    auth: {
      persistSession: false,
    },
    global: {
      headers: {
        Cookie: cookieHeader,
      },
    },
  });
}