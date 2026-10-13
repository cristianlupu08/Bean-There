import Image from "next/image";
import Link from "next/link";
import CartButton from "@/components/CartButton";
import ProductCard from "@/components/ProductCard";
import { CATEGORIES, PRODUCTS } from "@/lib/products";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=900&q=75&auto=format&fit=crop";

export default function Home() {
  const popular = PRODUCTS.filter((p) => p.popular);

  return (
    <>
      <header className="flex items-center justify-between py-4">
        <div>
          <p className="text-sm text-cream-muted">Hi! What are you drinking today?</p>
          <p className="font-display text-2xl">Bean There</p>
        </div>
        <CartButton />
      </header>

      {/* Welcome */}
      <section className="relative mt-2 overflow-hidden rounded-3xl shadow-xl shadow-black/40">
        <Image
          src={HERO_IMAGE}
          alt="Cups of coffee with latte art on a wooden table"
          width={900}
          height={1100}
          priority
          className="h-80 w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/50 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-6">
          <h1 className="font-display text-3xl leading-tight">
            Great coffee,
            <br />
            no queue.
          </h1>
          <p className="mt-2 text-sm text-cream-muted">
            Order from your phone, we brew it, you just pick it up.
          </p>
          <Link
            href="/menu"
            className="mt-4 inline-block rounded-full bg-caramel px-6 py-3 font-semibold text-espresso transition-colors hover:bg-caramel-dark"
          >
            See the menu
          </Link>
        </div>
      </section>

      {/* Categories */}
      <section className="mt-8">
        <h2 className="font-display text-xl">Categories</h2>
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {CATEGORIES.map((category) => (
            <Link
              key={category}
              href={`/menu?category=${encodeURIComponent(category)}`}
              className="shrink-0 rounded-full bg-bean px-5 py-2.5 text-sm transition-colors hover:bg-bean-light"
            >
              {category}
            </Link>
          ))}
        </div>
      </section>

      {/* Popular products */}
      <section className="mt-8">
        <div className="flex items-baseline justify-between">
          <h2 className="font-display text-xl">Most loved</h2>
          <Link href="/menu" className="text-sm text-caramel hover:underline">
            See all
          </Link>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-4">
          {popular.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Link to About us */}
      <Link
        href="/about"
        className="mt-8 block rounded-3xl bg-bean p-5 transition-colors hover:bg-bean-light"
      >
        <p className="font-display text-lg">About us, hours and location</p>
        <p className="mt-1 text-sm text-cream-muted">Mon–Fri 7:30–20:00 · 12 Roast Street</p>
      </Link>
    </>
  );
}
