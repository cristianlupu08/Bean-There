"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { STATUSES } from "@/lib/orders";
import { formatPrice } from "@/lib/menu";
import { adminSignOut, updateOrderStatus } from "./actions";

export default function AdminOrders({ orders }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState(null);

  // Check for new orders every 20 seconds.
  useEffect(() => {
    const timer = setInterval(() => router.refresh(), 20000);
    return () => clearInterval(timer);
  }, [router]);

  function changeStatus(orderId, status) {
    setError(null);
    startTransition(async () => {
      try {
        await updateOrderStatus(orderId, status);
        router.refresh();
      } catch (err) {
        setError(err.message);
      }
    });
  }

  const open = orders.filter((o) => o.status !== "ready").length;

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-cream-muted">
          {orders.length} orders · <span className="text-caramel">{open} still open</span>
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => router.refresh()}
            className="rounded-full bg-surface px-4 py-2 text-sm transition-colors hover:bg-surface-light"
          >
            Refresh
          </button>
          <form action={adminSignOut}>
            <button
              type="submit"
              className="rounded-full border border-surface-light px-4 py-2 text-sm transition-colors hover:bg-surface"
            >
              Sign out
            </button>
          </form>
        </div>
      </div>

      {error && (
        <p role="alert" className="mt-4 rounded-2xl bg-red-500/10 p-4 text-sm text-red-300">
          {error}
        </p>
      )}

      {orders.length === 0 ? (
        <p className="mt-10 text-center text-cream-muted">No orders yet.</p>
      ) : (
        <ul className={`mt-5 grid gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3 ${pending ? "opacity-70" : ""}`}>
          {orders.map((order) => (
            <li key={order.id} className="rounded-3xl bg-surface p-5">
              <div className="flex items-baseline justify-between">
                <p className="font-display text-xl">#{order.id}</p>
                <p className="font-semibold text-caramel">{formatPrice(order.total)}</p>
              </div>
              <p className="text-xs text-cream-muted">
                {new Date(order.created_at).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" })}
              </p>
              <p className="mt-2 text-sm">
                {order.customer_name} ·{" "}
                <a href={`tel:${order.phone}`} className="text-caramel">
                  {order.phone}
                </a>
              </p>
              <ul className="mt-3 space-y-0.5 text-sm text-cream-muted">
                {order.order_items.map((item) => (
                  <li key={item.id}>
                    {item.quantity} × {item.product_name}
                    {item.size_ml && ` (${item.size_ml} ml)`}
                  </li>
                ))}
              </ul>
              {order.note && <p className="mt-2 text-sm italic text-cream-muted">Note: {order.note}</p>}

              <div className="mt-4 grid grid-cols-3 gap-2">
                {STATUSES.map((status) => (
                  <button
                    key={status.id}
                    type="button"
                    disabled={pending}
                    onClick={() => changeStatus(order.id, status.id)}
                    className={`rounded-xl px-2 py-2 text-xs transition-colors ${
                      order.status === status.id
                        ? "bg-caramel font-semibold text-ink"
                        : "bg-surface-light text-cream-muted hover:text-cream"
                    }`}
                  >
                    {status.label}
                  </button>
                ))}
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
