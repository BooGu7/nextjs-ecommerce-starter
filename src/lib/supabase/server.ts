import { createClient } from "@supabase/supabase-js"

const defaultSupabaseUrl = "https://amukhgkamrokbbcjgusf.supabase.co"
const defaultSupabasePublishableKey =
  "sb_publishable_n7U664J9No0uwIXuUrAgYQ_Q4JEipC6"

export function hasSupabaseConfig() {
  return Boolean(
    getSupabaseUrl() &&
    getSupabaseServiceRoleKey()
  )
}

function getSupabaseUrl() {
  return process.env.NEXT_PUBLIC_SUPABASE_URL ?? defaultSupabaseUrl
}

function getSupabasePublishableKey() {
  return (
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
    defaultSupabasePublishableKey
  )
}

function getSupabaseServiceRoleKey() {
  return process.env.SUPABASE_SERVICE_ROLE_KEY
}

/**
 * Dùng cho API routes / server actions
 */
export function createSupabaseServerClient() {
  const url = getSupabaseUrl()
  const key = getSupabaseServiceRoleKey()

  if (!url || !key) {
    throw new Error(
      "SUPABASE_SERVICE_ROLE_KEY is not configured"
    )
  }

  return createClient(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  })
}

/**
 * Dùng cho frontend nếu cần
 */
export function createSupabaseBrowserClient() {
  const url = getSupabaseUrl()
  const key = getSupabasePublishableKey()

  if (!url || !key) {
    throw new Error(
      "Supabase publishable key is not configured"
    )
  }

  return createClient(url, key)
}