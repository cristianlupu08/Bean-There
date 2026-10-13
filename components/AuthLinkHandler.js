"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getSupabase } from "@/lib/supabaseBrowser";

// Email confirmation links can land on any page with login details (or an error)
// after the "#" in the URL. Starting the Supabase client reads and saves the login.
// If the link was expired or already used, we send the customer to /login,
// which explains what happened.
export default function AuthLinkHandler() {
  const router = useRouter();

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash.includes("access_token") && !hash.includes("error")) return;

    getSupabase(); // reads the login from the URL

    if (hash.includes("error") && window.location.pathname !== "/login") {
      router.replace(`/login${hash}`);
    }
  }, [router]);

  return null;
}
