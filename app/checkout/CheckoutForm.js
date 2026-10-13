"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cartTotal, clearCart, useCart } from "@/lib/cart";
import { placeOrder } from "@/lib/orders";
import { formatPrice } from "@/lib/menu";

const inputClass =
  "mt-2 w-full rounded-2xl border border-surface-light bg-surface p-3.5 text-cream placeholder:text-cream-muted/60 focus:border-caramel focus:outline-none";

export default function CheckoutForm() {
  const cart = useCart();
  const router = useRouter();
  // "idle" → "sending" → "done" (or back to "idle" with an error message)
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);

  if (status === "done") {
    return <p className="mt-16 text-center text-cream-muted">Order placed, one moment…</p>;
  }

  if (cart.items.length === 0) {
    return (
      <div className="mt-16 text-center">
        <p className="text-cream-muted">Your cart is empty.</p>
        <Link href="/menu" className="mt-4 inline-block font-semibold text-caramel hover:underline">
          Go to the menu
        </Link>
      </div>
    );
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setStatus("sending");
    setError(null);
    try {
      await placeOrder({ name: form.get("name").trim(), phone: form.get("phone").trim() }, cart);
      setStatus("done");
      clearCart();
      router.push("/checkout/done");
    } catch (err) {
      setError(err.message);
      setStatus("idle");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <p className="text-cream-muted">
        Leave your name and phone number so we can call you when your order is ready for pickup.
      </p>

      <label className="mt-6 block">
        <span className="font-medium">Name</span>
        <input name="name" required minLength={2} autoComplete="name" placeholder="e.g. Alex" className={inputClass} />
      </label>

      <label className="mt-4 block">
        <span className="font-medium">Phone</span>
        <input
          name="phone"
          type="tel"
          required
          pattern="0[0-9]{9}"
          title="The number must have 10 digits and start with 0, e.g. 0712345678"
          autoComplete="tel"
          placeholder="07xx xxx xxx"
          className={inputClass}
        />
      </label>

      <div className="mt-6 rounded-3xl bg-surface p-5">
        <ul className="space-y-1 text-sm text-cream-muted">
          {cart.items.map((item) => (
            <li key={item.key} className="flex justify-between">
              <span>
                {item.qty} × {item.name}
                {item.sizeMl && ` (${item.sizeMl} ml)`}
              </span>
              <span>{formatPrice(item.unitPrice * item.qty)}</span>
            </li>
          ))}
        </ul>
        {cart.note && <p className="mt-3 text-sm italic text-cream-muted">Note: {cart.note}</p>}
        <div className="mt-4 flex justify-between border-t border-surface-light pt-4 text-xl font-semibold">
          <span>Total</span>
          <span className="text-caramel">{formatPrice(cartTotal(cart))}</span>
        </div>
        <p className="mt-2 text-xs text-cream-muted">Pay at pickup, cash or card.</p>
      </div>

      {error && (
        <p role="alert" className="mt-6 rounded-2xl bg-red-500/10 p-4 text-sm text-red-300">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-6 w-full rounded-full bg-caramel py-4 font-semibold text-ink transition-colors hover:bg-caramel-dark disabled:opacity-60"
      >
        {status === "sending" ? "Placing order…" : "Place order"}
      </button>
    </form>
  );
}
