"use client";

import { useCallback, useEffect, useState } from "react";
import { createLocalStore } from "./localStore";
import { getSupabase } from "./supabaseBrowser";

// Orders are saved in Supabase. This device remembers the tracking token of every
// order it placed, so guests can follow their orders without an account.
const tokensStore = createLocalStore("bean-there:order-tokens", []);
// The last order placed, shown on the "Order placed!" page.
const lastOrderStore = createLocalStore("bean-there:last-order", null);

export const useLastOrder = lastOrderStore.useValue;

export const STATUSES = [
  { id: "received", label: "Order received" },
  { id: "preparing", label: "Preparing" },
  { id: "ready", label: "Ready for pickup" },
];

export async function placeOrder({ name, phone }, cart) {
  const { data, error } = await getSupabase().rpc("place_order", {
    p_name: name,
    p_phone: phone,
    p_note: cart.note,
    p_items: cart.items.map((item) => ({
      product_id: item.productId,
      size_ml: item.sizeMl,
      quantity: item.qty,
    })),
  });
  if (error) throw new Error(error.message);

  tokensStore.set((tokens) => [data.tracking_token, ...tokens].slice(0, 50));
  lastOrderStore.set({ id: data.id, name, total: Number(data.total) });
  return data;
}

// Loads this customer's orders and refreshes them every 15 seconds,
// so status changes made in the admin panel show up on their own.
export function useMyOrders(user) {
  const tokens = tokensStore.useValue();
  const [state, setState] = useState({ orders: [], loading: true, error: null });

  const load = useCallback(async () => {
    const { data, error } = await getSupabase().rpc("get_my_orders", { p_tokens: tokens });
    if (error) {
      setState((s) => ({ ...s, loading: false, error: error.message }));
      return;
    }
    setState({
      loading: false,
      error: null,
      orders: data.map((order) => ({
        ...order,
        total: Number(order.total),
        items: order.items.map((item) => ({ ...item, unit_price: Number(item.unit_price) })),
      })),
    });
    // The user id is a dependency so the list reloads after signing in or out.
  }, [tokens, user?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const first = setTimeout(load, 0);
    const timer = setInterval(load, 15000);
    return () => {
      clearTimeout(first);
      clearInterval(timer);
    };
  }, [load]);

  return state;
}
