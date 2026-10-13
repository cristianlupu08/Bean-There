"use client";

import { createClient } from "@supabase/supabase-js";

// Supabase client for the browser. It remembers who is signed in,
// so database calls run as that customer.
let client;

export function getSupabase() {
  if (!client) {
    client = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    );
  }
  return client;
}
