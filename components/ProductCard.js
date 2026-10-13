import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/menu";

export default function ProductCard({ product }) {
  return (
    <Link
      href={`/product/${product.id}`}
      className="group block overflow-hidden rounded-3xl bg-bean shadow-lg shadow-black/30 transition-colors hover:bg-bean-light"
    >
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 448px) 50vw, 220px"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-3">
        <p className="text-xs text-cream-muted">{product.category}</p>
        <h3 className="mt-0.5 font-medium leading-tight">{product.name}</h3>
        <p className="mt-2 font-semibold text-caramel">
          {product.hasSizes && <span className="text-xs font-normal text-cream-muted">from </span>}
          {formatPrice(product.price)}
        </p>
      </div>
    </Link>
  );
}
