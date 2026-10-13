"use client";

import { useActionState } from "react";
import { adminSignIn } from "./actions";

export default function AdminLogin() {
  const [state, formAction, pending] = useActionState(adminSignIn, { error: null });

  return (
    <form action={formAction} className="mx-auto mt-6 max-w-sm rounded-3xl bg-surface p-6">
      <p className="font-display text-2xl">Staff only</p>
      <p className="mt-1 text-sm text-cream-muted">Enter the admin password to see all orders.</p>

      <input
        type="password"
        name="password"
        required
        autoFocus
        autoComplete="current-password"
        placeholder="Admin password"
        className="mt-5 w-full rounded-2xl border border-surface-light bg-ink p-3.5 text-cream placeholder:text-cream-muted/60 focus:border-caramel focus:outline-none"
      />

      {state.error && (
        <p role="alert" className="mt-3 text-sm text-red-300">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="mt-5 w-full rounded-full bg-caramel py-3.5 font-semibold text-ink transition-colors hover:bg-caramel-dark disabled:opacity-60"
      >
        {pending ? "Checking…" : "Sign in"}
      </button>
    </form>
  );
}
