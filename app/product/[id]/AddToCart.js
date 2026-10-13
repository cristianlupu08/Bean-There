"use client";

import { useState } from "react";
import Link from "next/link";
import { addToCart } from "@/lib/cart";
import { SIZES, formatPrice } from "@/lib/menu";
import { CheckIcon } from "@/components/Icons";
import QtyPicker from "@/components/QtyPicker";

export default function AddToCart({ product }) {
  const [size, setSize] = useState(product.hasSizes ? SIZES[0] : null);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const unitPrice = product.price + (size?.extra ?? 0);

  function handleAdd() {
    addToCart(product, size, qty);
    setAdded(true);
  }

  return (
    <div className="mt-6">
      {product.hasSizes && (
        <>
          <h3 className="font-medium">Size</h3>
          <div className="mt-3 grid grid-cols-3 gap-3">
            {SIZES.map((option) => {
              const active = size?.ml === option.ml;
              return (
                <button
                  key={option.ml}
                  type="button"
                  onClick={() => {
                    setSize(option);
                    setAdded(false);
                  }}
                  className={`rounded-2xl border px-2 py-3 text-center transition-colors ${
                    active
                      ? "border-caramel bg-caramel/15 text-cream"
                      : "border-bean-light bg-bean text-cream-muted hover:text-cream"
                  }`}
                >
                  <span className="block font-semibold">{option.ml} ml</span>
                  <span className="block text-xs">
                    {option.extra ? `+${formatPrice(option.extra)}` : "standard"}
                  </span>
                </button>
              );
            })}
          </div>
        </>
      )}

      <div className="mt-6 flex items-center justify-between">
        <h3 className="font-medium">Quantity</h3>
        <QtyPicker
          qty={qty}
          onChange={(value) => {
            setQty(value);
            setAdded(false);
          }}
        />
      </div>

      <div className="mt-8 flex items-center gap-4">
        <div>
          <p className="text-xs text-cream-muted">Total</p>
          <p className="text-2xl font-semibold text-caramel">{formatPrice(unitPrice * qty)}</p>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          className="flex-1 rounded-full bg-caramel py-4 font-semibold text-espresso transition-colors hover:bg-caramel-dark"
        >
          Add to cart
        </button>
      </div>

      {added && (
        <div className="mt-4 flex items-center justify-between rounded-2xl bg-bean p-4 text-sm">
          <span className="flex items-center gap-2">
            <CheckIcon className="h-5 w-5 text-caramel" />
            Added to cart!
          </span>
          <Link href="/cart" className="font-semibold text-caramel hover:underline">
            View cart
          </Link>
        </div>
      )}
    </div>
  );
}
