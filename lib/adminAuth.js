import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

// The admin signs in with ADMIN_PASSWORD (from .env.local).
// After that, a cookie proves they are signed in. The cookie value is a signature
// that only the server can calculate, so it can't be guessed or faked.

export const ADMIN_COOKIE = "bean-there-admin";

function sessionValue() {
  return createHmac("sha256", process.env.SUPABASE_SECRET_KEY)
    .update(`admin:${process.env.ADMIN_PASSWORD}`)
    .digest("hex");
}

// Compares two strings without leaking timing information.
function safeEqual(a, b) {
  const bufA = Buffer.from(String(a));
  const bufB = Buffer.from(String(b));
  return bufA.length === bufB.length && timingSafeEqual(bufA, bufB);
}

export function isCorrectPassword(password) {
  return safeEqual(password, process.env.ADMIN_PASSWORD);
}

export async function isAdmin() {
  const value = (await cookies()).get(ADMIN_COOKIE)?.value;
  return Boolean(value) && safeEqual(value, sessionValue());
}

export async function startAdminSession() {
  (await cookies()).set(ADMIN_COOKIE, sessionValue(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8, // 8 hours
  });
}

export async function endAdminSession() {
  (await cookies()).delete(ADMIN_COOKIE);
}
