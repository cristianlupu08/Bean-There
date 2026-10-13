"use client";

import Link from "next/link";
import { CheckIcon } from "@/components/Icons";
import { STATUSES, useOrders } from "@/lib/orders";
import { formatPrice } from "@/lib/products";

export default function MyOrders() {
  const orders = useOrders();

  if (orders.length === 0) {
    return (
      <div className="mt-16 text-center">
        <p className="font-display text-2xl">No orders yet</p>
        <p className="mt-2 text-cream-muted">When you order, you&apos;ll see it here and can follow its progress.</p>
        <Link
          href="/menu"
          className="mt-6 inline-block rounded-full bg-caramel px-6 py-3 font-semibold text-espresso transition-colors hover:bg-caramel-dark"
        >
          Order now
        </Link>
      </div>
    );
  }

  return (
    <ul className="space-y-4">
      {orders.map((order) => (
        <li key={order.number} className="rounded-3xl bg-bean p-5 shadow-lg shadow-black/20">
          <div className="flex items-baseline justify-between">
            <p className="font-display text-xl">Order #{order.number}</p>
            <p className="font-semibold text-caramel">{formatPrice(order.total)}</p>
          </div>
          <p className="text-xs text-cream-muted">
            {new Date(order.createdAt).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" })}
          </p>
          <p className="mt-2 text-sm text-cream-muted">
            {order.items.map((item) => `${item.qty} × ${item.name}`).join(", ")}
          </p>
          <StatusSteps status={order.status} />
        </li>
      ))}
    </ul>
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
                  done ? "bg-caramel text-espresso" : "border-2 border-bean-light"
                }`}
              >
                {done && <CheckIcon className="h-4 w-4" />}
              </span>
              {!isLast && (
                <span className={`h-6 w-0.5 ${index < current ? "bg-caramel" : "bg-bean-light"}`} />
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
