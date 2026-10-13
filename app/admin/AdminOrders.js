"use client";

import { STATUSES, setOrderStatus, useOrders } from "@/lib/orders";
import { formatPrice } from "@/lib/menu";

export default function AdminOrders() {
  const orders = useOrders();

  return (
    <>
      <p className="rounded-2xl bg-caramel/15 p-3 text-xs text-cream-muted">
        Demo: for now you only see orders placed from this browser. Once the database is connected,
        all orders will show up here.
      </p>

      {orders.length === 0 ? (
        <p className="mt-10 text-center text-cream-muted">No orders yet.</p>
      ) : (
        <ul className="mt-5 grid gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {orders.map((order) => (
            <li key={order.number} className="rounded-3xl bg-surface p-5">
              <div className="flex items-baseline justify-between">
                <p className="font-display text-xl">#{order.number}</p>
                <p className="font-semibold text-caramel">{formatPrice(order.total)}</p>
              </div>
              <p className="text-sm">
                {order.name} · <a href={`tel:${order.phone}`} className="text-caramel">{order.phone}</a>
              </p>
              <ul className="mt-3 space-y-0.5 text-sm text-cream-muted">
                {order.items.map((item) => (
                  <li key={item.key}>
                    {item.qty} × {item.name}
                    {item.sizeMl && ` (${item.sizeMl} ml)`}
                  </li>
                ))}
              </ul>
              {order.note && <p className="mt-2 text-sm italic text-cream-muted">Note: {order.note}</p>}

              <div className="mt-4 grid grid-cols-3 gap-2">
                {STATUSES.map((status) => (
                  <button
                    key={status.id}
                    type="button"
                    onClick={() => setOrderStatus(order.number, status.id)}
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
