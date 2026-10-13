"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import CartButton from "./CartButton";
import InstallButton from "./InstallApp";
import { CupIcon } from "./Icons";
import { NAV_LINKS } from "./BottomNav";

// Navigation bar for larger screens (tablets and computers).
// On phones the BottomNav is used instead.
export default function TopNav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-30 hidden border-b border-surface-light/60 bg-ink/85 backdrop-blur md:block">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-8 px-8">
        <Link href="/" className="flex items-center gap-2 font-display text-xl">
          <CupIcon className="h-6 w-6 text-caramel" />
          Bean There
        </Link>

        <nav className="flex flex-1 items-center gap-1">
          {NAV_LINKS.map(({ href, label }) => {
            const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`rounded-full px-4 py-2 text-sm transition-colors ${
                  active ? "bg-surface text-caramel" : "text-cream-muted hover:text-cream"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        <InstallButton className="flex items-center gap-2 rounded-full border border-surface-light px-4 py-2 text-sm transition-colors hover:bg-surface" />
        <CartButton />
      </div>
    </header>
  );
}
