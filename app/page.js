import Image from "next/image";
import Link from "next/link";
import CartButton from "@/components/CartButton";
import { InstallCard } from "@/components/InstallApp";
import ProductCard from "@/components/ProductCard";
import { CATEGORIES } from "@/lib/menu";
import { getProducts } from "@/lib/products";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1400&q=75&auto=format&fit=crop";

export default async function Home() {
  const popular = (await getProducts()).filter((p) => p.popular);

  return (
    <>
      {/* Phone header (on computers the TopNav is used) */}
      <header className="flex items-center justify-between py-4 md:hidden">
        <div>
          <p className="text-sm text-cream-muted">Hi! What are you drinking today?</p>
          <p className="font-display text-2xl">Bean There</p>
        </div>
        <CartButton />
      </header>

      {/* Welcome: stacked on phones, side by side on computers */}
      <section className="relative mt-2 overflow-hidden rounded-3xl shadow-xl shadow-black/40 md:mt-10 md:grid md:grid-cols-2 md:items-center md:gap-12 md:overflow-visible md:rounded-none md:shadow-none">
        <div className="relative h-80 md:order-2 md:h-[460px] md:overflow-hidden md:rounded-[2rem] md:shadow-2xl md:shadow-black/50">
          <Image
            src={HERO_IMAGE}
            alt="Cups of coffee with latte art on a wooden table"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 560px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-transparent md:hidden" />
        </div>

        <div className="absolute inset-x-0 bottom-0 p-6 md:static md:p-0">
          <p className="hidden text-sm uppercase tracking-[0.2em] text-caramel md:block">
            Order ahead · Pick up
          </p>
          <h1 className="font-display text-3xl leading-tight md:mt-4 md:text-6xl">
            Great coffee,
            <br />
            no queue.
          </h1>
          <p className="mt-2 text-sm text-cream-muted md:mt-6 md:max-w-md md:text-lg">
            Order from your phone, we brew it, you just pick it up.
          </p>
          <div className="mt-4 flex gap-3 md:mt-8">
            <Link
              href="/menu"
              className="inline-block rounded-full bg-caramel px-6 py-3 font-semibold text-ink transition-colors hover:bg-caramel-dark md:px-8 md:py-4"
            >
              See the menu
            </Link>
            <Link
              href="/about"
              className="hidden rounded-full border border-surface-light px-8 py-4 font-semibold transition-colors hover:bg-surface md:inline-block"
            >
              Find us
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mt-8 md:mt-16">
        <h2 className="font-display text-xl md:text-3xl">Categories</h2>
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1 md:mt-5 md:gap-3">
          {CATEGORIES.map((category) => (
            <Link
              key={category}
              href={`/menu?category=${encodeURIComponent(category)}`}
              className="shrink-0 rounded-full bg-surface px-5 py-2.5 text-sm transition-colors hover:bg-surface-light md:px-7 md:py-3 md:text-base"
            >
              {category}
            </Link>
          ))}
        </div>
      </section>

      {/* Popular products */}
      <section className="mt-8 md:mt-16">
        <div className="flex items-baseline justify-between">
          <h2 className="font-display text-xl md:text-3xl">Most loved</h2>
          <Link href="/menu" className="text-sm text-caramel hover:underline">
            See all
          </Link>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-4 sm:grid-cols-3 md:mt-5 md:gap-6 lg:grid-cols-4">
          {popular.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Install the app (hidden if already installed) */}
      <InstallCard />

      {/* Link to About us */}
      <Link
        href="/about"
        className="mt-4 block rounded-3xl bg-surface p-5 transition-colors hover:bg-surface-light md:mt-16 md:flex md:items-center md:justify-between md:p-8"
      >
        <p className="font-display text-lg md:text-2xl">About us, hours and location</p>
        <p className="mt-1 text-sm text-cream-muted md:mt-0">Mon–Fri 7:30–20:00 · 12 Roast Street</p>
      </Link>
    </>
  );
}
