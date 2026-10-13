import { Suspense } from "react";
import { connection } from "next/server";
import PageHeader from "@/components/PageHeader";
import { isAdmin } from "@/lib/adminAuth";
import { getSupabaseAdmin, isAdminConfigured } from "@/lib/supabaseAdmin";
import AdminLogin from "./AdminLogin";
import AdminOrders from "./AdminOrders";

export const metadata = { title: "Admin · Bean There" };

export default function AdminPage() {
  return (
    <>
      <PageHeader title="Admin panel" showCart={false} />
      {/* Checking the admin cookie happens per request, so it lives inside <Suspense>. */}
      <Suspense fallback={<p className="mt-10 text-center text-cream-muted">Loading…</p>}>
        <AdminArea />
      </Suspense>
    </>
  );
}

async function AdminArea() {
  // Always render this part per request, never as a prebuilt static page.
  await connection();

  if (!isAdminConfigured()) {
    return (
      <p className="rounded-2xl bg-caramel/15 p-4 text-sm text-cream-muted">
        The admin panel isn&apos;t configured yet. Add <code>SUPABASE_SECRET_KEY</code> and{" "}
        <code>ADMIN_PASSWORD</code> to <code>.env.local</code>, then restart the site.
      </p>
    );
  }

  if (!(await isAdmin())) {
    return <AdminLogin />;
  }

  const { data, error } = await getSupabaseAdmin()
    .from("orders")
    .select("id, customer_name, phone, note, total, status, created_at, order_items (id, product_name, size_ml, quantity)")
    .order("created_at", { ascending: false })
    .limit(100);

  if (error) {
    return (
      <p role="alert" className="rounded-2xl bg-red-500/10 p-4 text-sm text-red-300">
        Couldn&apos;t load orders: {error.message}
      </p>
    );
  }

  const orders = data.map((order) => ({ ...order, total: Number(order.total) }));
  return <AdminOrders orders={orders} />;
}
