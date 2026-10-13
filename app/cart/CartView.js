"use client";

import Image from "next/image";
import Link from "next/link";
import QtyPicker from "@/components/QtyPicker";
import { TrashIcon } from "@/components/Icons";
import { cartTotal, changeQty, removeFromCart, setNote, useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/menu";

export default function CartView() {
  const cart = useCart();

  if (cart.items.length === 0) {
    return (
      <div className="mt-16 text-center">
        <p className="font-display text-2xl">Your cart is empty</p>
        <p className="mt-2 text-cream-muted">Pick something tasty from the menu.</p>
        <Link
          href="/menu"
          className="mt-6 inline-block rounded-full bg-caramel px-6 py-3 font-semibold text-ink transition-colors hover:bg-caramel-dark"
        >
          See the menu
        </Link>
      </div>
    );
  }

  return (
    <div className="md:grid md:grid-cols-[1fr_360px] md:items-start md:gap-10">
      <div>
        <ul className="space-y-3">
          {cart.items.map((item) => (
            <li key={item.key} className="flex gap-3 rounded-3xl bg-surface p-3 shadow-lg shadow-black/20">
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl md:h-24 md:w-24">
                <Image src={item.image} alt={item.name} fill sizes="96px" className="object-cover" />
              </div>
              <div className="flex flex-1 flex-col justify-between">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-medium leading-tight">{item.name}</p>
                    {item.sizeMl && <p className="text-xs text-cream-muted">{item.sizeMl} ml</p>}
                  </div>
                  <button
                    type="button"
                    aria-label={`Remove ${item.name}`}
                    onClick={() => removeFromCart(item.key)}
                    className="text-cream-muted transition-colors hover:text-caramel"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-caramel">{formatPrice(item.unitPrice * item.qty)}</p>
                  <QtyPicker small qty={item.qty} onChange={(qty) => changeQty(item.key, qty)} />
                </div>
              </div>
            </li>
          ))}
        </ul>

        <label className="mt-6 block">
          <span className="font-medium">Note for the barista (optional)</span>
          <textarea
            value={cart.note}
            onChange={(event) => setNote(event.target.value)}
            rows={3}
            placeholder="e.g. oat milk, no sugar"
            className="mt-2 w-full resize-none rounded-2xl border border-surface-light bg-surface p-3 text-cream placeholder:text-cream-muted/60 focus:border-caramel focus:outline-none"
          />
        </label>
      </div>

      {/* Order summary: sticks to the side while scrolling on computers */}
      <aside className="md:sticky md:top-24">
        <div className="mt-6 rounded-3xl bg-surface p-5 md:mt-0">
          <div className="flex justify-between text-cream-muted">
            <span>Pickup</span>
            <span>at the café, free</span>
          </div>
          <div className="mt-3 flex justify-between text-xl font-semibold">
            <span>Total</span>
            <span className="text-caramel">{formatPrice(cartTotal(cart))}</span>
          </div>
        </div>

        <Link
          href="/checkout"
          className="mt-6 block rounded-full bg-caramel py-4 text-center font-semibold text-ink transition-colors hover:bg-caramel-dark"
        >
          Checkout
        </Link>
      </aside>
    </div>
  );
}
