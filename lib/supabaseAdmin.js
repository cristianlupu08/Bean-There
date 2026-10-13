import "server-only";
import { createClient } from "@supabase/supabase-js";

// Supabase client with the SECRET key. It can read and change everything,
// so it must only ever run on the server (the "server-only" import guarantees that).
export function isAdminConfigured() {
  return Boolean(process.env.SUPABASE_SECRET_KEY && process.env.ADMIN_PASSWORD);
}

let client;

export function getSupabaseAdmin() {
  if (!client) {
    client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SECRET_KEY, {
      auth: { persistSession: false },
    });
  }
  return client;
}
