"use client";

import Link from "next/link";
import { CheckIcon } from "@/components/Icons";
import { useUser } from "@/lib/auth";
import { STATUSES, useMyOrders } from "@/lib/orders";
import { formatPrice } from "@/lib/menu";

export default function MyOrders() {
  const { user, ready } = useUser();
  const { orders, loading, error } = useMyOrders(user);

  if (!ready || loading) {
    return <p className="mt-16 text-center text-cream-muted">Loading your orders…</p>;
  }

  if (error) {
    return (
      <p role="alert" className="mt-16 rounded-2xl bg-red-500/10 p-4 text-center text-sm text-red-300">
        Couldn&apos;t load your orders: {error}
      </p>
    );
  }

  return (
    <>
      {!user && (
        <p className="mb-5 rounded-2xl bg-surface p-4 text-sm text-cream-muted">
          You see the orders placed from this device.{" "}
          <Link href="/login" className="font-semibold text-caramel hover:underline">
            Sign in
          </Link>{" "}
          to see your orders on any device.
        </p>
      )}

      {orders.length === 0 ? (
        <div className="mt-16 text-center">
          <p className="font-display text-2xl">No orders yet</p>
          <p className="mt-2 text-cream-muted">When you order, you&apos;ll see it here and can follow its progress.</p>
          <Link
            href="/menu"
            className="mt-6 inline-block rounded-full bg-caramel px-6 py-3 font-semibold text-ink transition-colors hover:bg-caramel-dark"
          >
            Order now
          </Link>
        </div>
      ) : (
        <ul className="grid gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {orders.map((order) => (
            <li key={order.id} className="rounded-3xl bg-surface p-5 shadow-lg shadow-black/20">
              <div className="flex items-baseline justify-between">
                <p className="font-display text-xl">Order #{order.id}</p>
                <p className="font-semibold text-caramel">{formatPrice(order.total)}</p>
              </div>
              <p className="text-xs text-cream-muted">
                {new Date(order.created_at).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" })}
              </p>
              <p className="mt-2 text-sm text-cream-muted">
                {order.items.map((item) => `${item.quantity} × ${item.product_name}`).join(", ")}
              </p>
              <StatusSteps status={order.status} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

function StatusSteps({ status }) {
  const current = STATUSES.findIndex((s) => s.id === status);

  return (
    <ol className="mt-5">
      {STATUSES.map((step, index) => {
        const done = index <= current;
        const isLast = index === STATUSES.length - 1;
        return (
          <li key={step.id} className="flex gap-3">
            <div className="flex flex-col items-center">
              <span
                className={`flex h-7 w-7 items-center justify-center rounded-full ${
                  done ? "bg-caramel text-ink" : "border-2 border-surface-light"
                }`}
              >
                {done && <CheckIcon className="h-4 w-4" />}
              </span>
              {!isLast && (
                <span className={`h-6 w-0.5 ${index < current ? "bg-caramel" : "bg-surface-light"}`} />
              )}
            </div>
            <p
              className={`pt-0.5 text-sm ${
                index === current ? "font-semibold text-cream" : done ? "text-cream-muted" : "text-cream-muted/50"
              }`}
            >
              {step.label}
            </p>
          </li>
        );
      })}
    </ol>
  );
}
