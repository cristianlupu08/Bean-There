import { createClient } from "@supabase/supabase-js";

// The URL and publishable key live in .env.local (never committed to GitHub).
// The publishable key is safe to expose: Row Level Security in Supabase
// decides what it can read or write.
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

if (!url || !key) {
  throw new Error(
    "Missing Supabase settings. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY to .env.local",
  );
}

export const supabase = createClient(url, key, {
  auth: { persistSession: false },
});
