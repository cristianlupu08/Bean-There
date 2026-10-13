"use client";

import Link from "next/link";
import { CheckIcon } from "@/components/Icons";
import { useOrders } from "@/lib/orders";
import { formatPrice } from "@/lib/products";

export default function OrderPlaced() {
  const [latest] = useOrders();

  return (
    <div className="flex min-h-[75vh] flex-col items-center justify-center text-center">
      <div className="flex h-24 w-24 items-center justify-center rounded-full bg-caramel text-espresso shadow-xl shadow-caramel/20">
        <CheckIcon className="h-12 w-12" />
      </div>
      <h1 className="mt-6 font-display text-3xl">Order placed!</h1>

      {latest ? (
        <>
          <p className="mt-2 text-cream-muted">Thank you, {latest.name}! We&apos;re on it.</p>
          <div className="mt-6 rounded-3xl bg-bean px-10 py-5">
            <p className="text-sm text-cream-muted">Order number</p>
            <p className="font-display text-4xl text-caramel">#{latest.number}</p>
            <p className="mt-1 text-sm text-cream-muted">Total: {formatPrice(latest.total)}</p>
          </div>
        </>
      ) : (
        <p className="mt-2 text-cream-muted">We&apos;re on it.</p>
      )}

      <Link
        href="/orders"
        className="mt-8 w-full rounded-full bg-caramel py-4 font-semibold text-espresso transition-colors hover:bg-caramel-dark"
      >
        Track your order
      </Link>
      <Link href="/" className="mt-4 text-sm text-cream-muted hover:text-cream">
        Back to home
      </Link>
    </div>
  );
}
