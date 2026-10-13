"use client";

// Shown when something fails while loading a page (for example, the database is unreachable).
export default function Error({ reset }) {
  return (
    <div className="flex min-h-[75vh] flex-col items-center justify-center text-center">
      <p className="font-display text-5xl text-caramel">Oops</p>
      <h1 className="mt-4 font-display text-2xl">Something spilled</h1>
      <p className="mt-2 text-cream-muted">We couldn&apos;t load this page. Please try again.</p>
      <button
        type="button"
        onClick={() => reset()}
        className="mt-6 rounded-full bg-caramel px-6 py-3 font-semibold text-ink transition-colors hover:bg-caramel-dark"
      >
        Try again
      </button>
    </div>
  );
}
