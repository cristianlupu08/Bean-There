"use client";

import { createLocalStore } from "./localStore";

const cartStore = createLocalStore("bean-there-cart", { items: [], note: "" });

export const useCart = cartStore.useValue;

// The same product in a different size is a separate line in the cart.
export function addToCart(product, size, qty) {
  const key = size ? `${product.id}-${size.ml}` : product.id;
  const unitPrice = product.price + (size?.extra ?? 0);

  cartStore.set((cart) => {
    const existing = cart.items.find((item) => item.key === key);
    const items = existing
      ? cart.items.map((item) => (item.key === key ? { ...item, qty: item.qty + qty } : item))
      : [
          ...cart.items,
          {
            key,
            productId: product.id,
            name: product.name,
            image: product.image,
            sizeMl: size?.ml ?? null,
            unitPrice,
            qty,
          },
        ];
    return { ...cart, items };
  });
}

export function changeQty(key, qty) {
  if (qty < 1) return removeFromCart(key);
  cartStore.set((cart) => ({
    ...cart,
    items: cart.items.map((item) => (item.key === key ? { ...item, qty } : item)),
  }));
}

export function removeFromCart(key) {
  cartStore.set((cart) => ({ ...cart, items: cart.items.filter((item) => item.key !== key) }));
}

export function setNote(note) {
  cartStore.set((cart) => ({ ...cart, note }));
}

export function clearCart() {
  cartStore.set({ items: [], note: "" });
}

export function cartTotal(cart) {
  return cart.items.reduce((sum, item) => sum + item.unitPrice * item.qty, 0);
}

export function cartCount(cart) {
  return cart.items.reduce((sum, item) => sum + item.qty, 0);
}
