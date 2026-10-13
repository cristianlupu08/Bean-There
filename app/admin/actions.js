"use server";

import { endAdminSession, isAdmin, isCorrectPassword, startAdminSession } from "@/lib/adminAuth";
import { getSupabaseAdmin, isAdminConfigured } from "@/lib/supabaseAdmin";

// Server actions: these functions run on the server, even though
// the admin page calls them from buttons and forms in the browser.

const VALID_STATUSES = ["received", "preparing", "ready"];

export async function adminSignIn(_previousState, formData) {
  if (!isAdminConfigured()) return { error: "The admin panel isn't configured yet." };

  // A short pause makes guessing passwords slow.
  await new Promise((resolve) => setTimeout(resolve, 600));

  if (!isCorrectPassword(formData.get("password") ?? "")) {
    return { error: "Wrong password." };
  }
  await startAdminSession();
  return { error: null };
}

export async function adminSignOut() {
  await endAdminSession();
}

export async function updateOrderStatus(orderId, status) {
  if (!(await isAdmin())) throw new Error("Not signed in as admin.");
  if (!VALID_STATUSES.includes(status)) throw new Error("Invalid status.");

  const { error } = await getSupabaseAdmin().from("orders").update({ status }).eq("id", orderId);
  if (error) throw new Error(error.message);
}
