"use client";

import { useEffect, useState } from "react";
import { getSupabase } from "./supabaseBrowser";

// Returns the signed-in customer (or null) and keeps it up to date.
// `ready` is false until we know whether someone is signed in.
export function useUser() {
  const [state, setState] = useState({ user: null, ready: false });

  useEffect(() => {
    const supabase = getSupabase();
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setState({ user: session?.user ?? null, ready: true });
    });
    return () => data.subscription.unsubscribe();
  }, []);

  return state;
}

export async function signIn(email, password) {
  const { error } = await getSupabase().auth.signInWithPassword({ email, password });
  if (error) throw new Error(error.message);
}

// Returns true if the customer still has to confirm their email address.
export async function signUp(email, password) {
  const { data, error } = await getSupabase().auth.signUp({
    email,
    password,
    options: { emailRedirectTo: `${window.location.origin}/login` },
  });
  if (error) throw new Error(error.message);
  return !data.session;
}

export async function signOut() {
  await getSupabase().auth.signOut();
}
