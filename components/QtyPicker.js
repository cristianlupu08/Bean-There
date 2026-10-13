"use client";

// The − / + buttons for quantity.
export default function QtyPicker({ qty, onChange, min = 1, small = false }) {
  const size = small ? "h-8 w-8" : "h-10 w-10";
  const buttonClass = `flex ${size} items-center justify-center rounded-full bg-bean-light text-lg transition-colors hover:bg-caramel hover:text-espresso disabled:opacity-40 disabled:hover:bg-bean-light disabled:hover:text-cream`;

  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        aria-label="Decrease quantity"
        disabled={qty <= min}
        onClick={() => onChange(qty - 1)}
        className={buttonClass}
      >
        −
      </button>
      <span className="w-6 text-center font-semibold">{qty}</span>
      <button
        type="button"
        aria-label="Increase quantity"
        onClick={() => onChange(qty + 1)}
        className={buttonClass}
      >
        +
      </button>
    </div>
  );
}
