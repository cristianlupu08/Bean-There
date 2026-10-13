"use client";

import { createLocalStore } from "./localStore";
import { cartTotal } from "./cart";

// For now, orders are stored in the browser. Later they will be saved in Supabase.
const ordersStore = createLocalStore("bean-there:orders", []);

export const useOrders = ordersStore.useValue;

export const STATUSES = [
  { id: "received", label: "Order received" },
  { id: "preparing", label: "Preparing" },
  { id: "ready", label: "Ready for pickup" },
];

export function placeOrder({ name, phone }, cart) {
  const order = {
    number: Math.floor(1000 + Math.random() * 9000),
    name,
    phone,
    items: cart.items,
    note: cart.note,
    total: cartTotal(cart),
    status: "received",
    createdAt: new Date().toISOString(),
  };
  ordersStore.set((orders) => [order, ...orders]);
  return order;
}

export function setOrderStatus(number, status) {
  ordersStore.set((orders) =>
    orders.map((order) => (order.number === number ? { ...order, status } : order)),
  );
}
