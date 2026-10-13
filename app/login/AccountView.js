"use client";

import { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { signIn, signOut, signUp, useUser } from "@/lib/auth";
import { UserIcon } from "@/components/Icons";

const inputClass =
  "mt-2 w-full rounded-2xl border border-surface-light bg-surface p-3.5 text-cream placeholder:text-cream-muted/60 focus:border-caramel focus:outline-none";

export default function AccountView() {
  const { user, ready } = useUser();
  const linkError = useLinkError();

  if (!ready) {
    return <p className="mt-16 text-center text-cream-muted">Loading…</p>;
  }

  return (
    <>
      {linkError && !user && <LinkErrorNotice code={linkError} />}
      {user ? <SignedIn user={user} /> : <AuthForm />}
    </>
  );
}

// Reads an error left in the URL by an email confirmation link (e.g. #error_code=otp_expired).
function subscribeToHash(callback) {
  window.addEventListener("hashchange", callback);
  return () => window.removeEventListener("hashchange", callback);
}

function useLinkError() {
  const hash = useSyncExternalStore(subscribeToHash, () => window.location.hash, () => "");
  const params = new URLSearchParams(hash.replace(/^#/, ""));
  return params.get("error_code") || params.get("error");
}

function LinkErrorNotice({ code }) {
  function dismiss() {
    history.replaceState(null, "", window.location.pathname);
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  }

  return (
    <div role="alert" className="mt-4 rounded-2xl bg-caramel/15 p-4 text-sm text-cream-muted">
      <p className="font-semibold text-cream">This email link can&apos;t be used anymore</p>
      <p className="mt-1">
        {code === "otp_expired"
          ? "It was already used or has expired. If you already confirmed your email, just sign in below."
          : "Something went wrong with the link. Try signing in, or sign up again to get a new link."}
      </p>
      <button type="button" onClick={dismiss} className="mt-2 font-semibold text-caramel hover:underline">
        OK
      </button>
    </div>
  );
}

function SignedIn({ user }) {
  return (
    <div className="mt-4 text-center">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-caramel/15 text-caramel">
        <UserIcon className="h-10 w-10" />
      </div>
      <p className="mt-4 font-display text-3xl">Hello!</p>
      <p className="mt-1 text-cream-muted">{user.email}</p>

      <Link
        href="/orders"
        className="mt-8 block rounded-full bg-caramel py-4 font-semibold text-ink transition-colors hover:bg-caramel-dark"
      >
        My orders
      </Link>
      <button
        type="button"
        onClick={() => signOut()}
        className="mt-3 w-full rounded-full border border-surface-light py-4 font-semibold transition-colors hover:bg-surface"
      >
        Sign out
      </button>
    </div>
  );
}

function AuthForm() {
  const [mode, setMode] = useState("signin"); // "signin" or "signup"
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);
  const [checkEmail, setCheckEmail] = useState(false);

  const isSignUp = mode === "signup";

  async function handleSubmit(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = form.get("email").trim();
    const password = form.get("password");

    setBusy(true);
    setError(null);
    try {
      if (isSignUp) {
        const needsConfirmation = await signUp(email, password);
        if (needsConfirmation) setCheckEmail(true);
      } else {
        await signIn(email, password);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  if (checkEmail) {
    return (
      <div className="mt-8 rounded-3xl bg-surface p-6 text-center">
        <p className="font-display text-2xl">Check your inbox</p>
        <p className="mt-2 text-cream-muted">
          We sent you a link to confirm your email. Click it, then come back and sign in.
        </p>
        <button
          type="button"
          onClick={() => {
            setCheckEmail(false);
            setMode("signin");
          }}
          className="mt-6 font-semibold text-caramel hover:underline"
        >
          Back to sign in
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="mt-4 text-center">
        <p className="font-display text-3xl">{isSignUp ? "Create an account" : "Welcome back"}</p>
        <p className="mt-2 text-cream-muted">
          {isSignUp ? "Track your orders from any device." : "Sign in to see your orders from any device."}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-8">
        <label className="block">
          <span className="font-medium">Email</span>
          <input
            type="email"
            name="email"
            required
            autoComplete="email"
            placeholder="name@example.com"
            className={inputClass}
          />
        </label>
        <label className="mt-4 block">
          <span className="font-medium">Password</span>
          <input
            type="password"
            name="password"
            required
            minLength={6}
            autoComplete={isSignUp ? "new-password" : "current-password"}
            placeholder={isSignUp ? "At least 6 characters" : "••••••••"}
            className={inputClass}
          />
        </label>

        {error && (
          <p role="alert" className="mt-4 rounded-2xl bg-red-500/10 p-4 text-sm text-red-300">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={busy}
          className="mt-6 w-full rounded-full bg-caramel py-4 font-semibold text-ink transition-colors hover:bg-caramel-dark disabled:opacity-60"
        >
          {busy ? "One moment…" : isSignUp ? "Sign up" : "Sign in"}
        </button>
      </form>

      <p className="mt-8 text-center text-sm text-cream-muted">
        {isSignUp ? "Already have an account? " : "Don't have an account? "}
        <button
          type="button"
          onClick={() => {
            setMode(isSignUp ? "signin" : "signup");
            setError(null);
          }}
          className="font-semibold text-caramel hover:underline"
        >
          {isSignUp ? "Sign in" : "Sign up"}
        </button>
      </p>
    </>
  );
}
