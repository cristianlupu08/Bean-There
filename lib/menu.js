// Menu settings that don't come from the database.
// Safe to import from both server and client components.

export const CATEGORIES = ["Coffee", "Tea", "Juice", "Pastries"];

// Drink sizes and how much each one adds to the price (in euro).
// Keep in sync with place_order in supabase/02-orders.sql, which calculates the real price.
export const SIZES = [
  { ml: 250, extra: 0 },
  { ml: 350, extra: 0.5 },
  { ml: 450, extra: 1 },
];

export function formatPrice(euro) {
  return `€${euro.toFixed(2)}`;
}
