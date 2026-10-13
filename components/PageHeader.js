import Link from "next/link";
import CartButton from "./CartButton";
import { BackIcon } from "./Icons";

// Page header: optional back button, title and cart.
export default function PageHeader({ title, backHref, showCart = true }) {
  return (
    <header className="flex items-center gap-3 py-4">
      {backHref && (
        <Link
          href={backHref}
          aria-label="Back"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-bean transition-colors hover:bg-bean-light"
        >
          <BackIcon className="h-5 w-5" />
        </Link>
      )}
      <h1 className="flex-1 font-display text-2xl">{title}</h1>
      {showCart && <CartButton />}
    </header>
  );
}
