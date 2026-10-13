import { Suspense } from "react";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import ProductCard from "@/components/ProductCard";
import { CATEGORIES } from "@/lib/menu";
import { getProducts } from "@/lib/products";

export const metadata = { title: "Menu · Bean There" };

export default function MenuPage({ searchParams }) {
  return (
    <>
      <PageHeader title="Menu" />
      {/* The selected category comes from the URL (?category=Coffee). Next.js wants
          the part that reads the URL inside <Suspense>; until it's read,
          we show the full menu. */}
      <Suspense fallback={<FilteredMenu />}>
        <MenuFromLink searchParams={searchParams} />
      </Suspense>
    </>
  );
}

async function MenuFromLink({ searchParams }) {
  const { category } = await searchParams;
  const selected = CATEGORIES.includes(category) ? category : null;
  return <FilteredMenu selected={selected} />;
}

async function FilteredMenu({ selected = null }) {
  const all = await getProducts();
  const products = selected ? all.filter((p) => p.category === selected) : all;

  return (
    <>
      <div className="flex gap-2 overflow-x-auto pb-1">
        <FilterChip href="/menu" active={!selected}>
          All
        </FilterChip>
        {CATEGORIES.map((category) => (
          <FilterChip
            key={category}
            href={`/menu?category=${encodeURIComponent(category)}`}
            active={selected === category}
          >
            {category}
          </FilterChip>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 md:mt-8 md:gap-6 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}

function FilterChip({ href, active, children }) {
  return (
    <Link
      href={href}
      scroll={false}
      className={`shrink-0 rounded-full px-5 py-2.5 text-sm transition-colors ${
        active ? "bg-caramel font-semibold text-ink" : "bg-surface hover:bg-surface-light"
      }`}
    >
      {children}
    </Link>
  );
}
