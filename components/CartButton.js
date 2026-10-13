"use client";

import Link from "next/link";
import { cartCount, useCart } from "@/lib/cart";
import { BagIcon } from "./Icons";

export default function CartButton() {
  const count = cartCount(useCart());

  return (
    <Link
      href="/cart"
      aria-label={`Cart (${count} items)`}
      className="relative flex h-11 w-11 items-center justify-center rounded-full bg-surface text-cream transition-colors hover:bg-surface-light"
    >
      <BagIcon className="h-5 w-5" />
      {count > 0 && (
        <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-caramel px-1 text-[11px] font-semibold text-ink">
          {count}
        </span>
      )}
    </Link>
  );
}
