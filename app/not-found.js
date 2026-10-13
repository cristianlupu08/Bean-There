import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[75vh] flex-col items-center justify-center text-center">
      <p className="font-display text-6xl text-caramel">404</p>
      <h1 className="mt-4 font-display text-2xl">This page went cold</h1>
      <p className="mt-2 text-cream-muted">We couldn&apos;t find what you were looking for.</p>
      <Link
        href="/"
        className="mt-6 rounded-full bg-caramel px-6 py-3 font-semibold text-ink transition-colors hover:bg-caramel-dark"
      >
        Back to home
      </Link>
    </div>
  );
}
