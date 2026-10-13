import { Suspense } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import PageHeader from "@/components/PageHeader";
import AddToCart from "./AddToCart";
import { getProduct, getProducts } from "@/lib/products";

// Tell Next.js which products exist, so their pages are built ahead of time.
export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({ id: product.id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = await getProduct(id);
  return { title: product ? `${product.name} · Bean There` : "Product not found" };
}

export default function ProductPage({ params }) {
  // Reading the product id from the URL happens inside <Suspense>,
  // so the page shell can show instantly while it loads.
  return (
    <Suspense fallback={<ProductSkeleton />}>
      <ProductDetails params={params} />
    </Suspense>
  );
}

async function ProductDetails({ params }) {
  const { id } = await params;
  const product = await getProduct(id);
  if (!product) notFound();

  return (
    <>
      <PageHeader title={product.category} backHref="/menu" />

      <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-xl shadow-black/40">
        <Image
          src={product.image}
          alt={product.name}
          fill
          priority
          sizes="(max-width: 448px) 100vw, 448px"
          className="object-cover"
        />
      </div>

      <h2 className="mt-5 font-display text-3xl">{product.name}</h2>
      <p className="mt-2 leading-relaxed text-cream-muted">{product.description}</p>

      <AddToCart product={product} />
    </>
  );
}

function ProductSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-[76px]" />
      <div className="aspect-[4/3] rounded-3xl bg-bean" />
      <div className="mt-5 h-9 w-2/3 rounded-xl bg-bean" />
      <div className="mt-3 h-4 w-full rounded bg-bean" />
    </div>
  );
}
