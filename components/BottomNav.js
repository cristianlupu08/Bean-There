"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CupIcon, HomeIcon, ReceiptIcon, UserIcon } from "./Icons";

// Shared with TopNav, so both menus always have the same links.
export const NAV_LINKS = [
  { href: "/", label: "Home", Icon: HomeIcon },
  { href: "/menu", label: "Menu", Icon: CupIcon },
  { href: "/orders", label: "Orders", Icon: ReceiptIcon },
  { href: "/login", label: "Profile", Icon: UserIcon },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-surface-light bg-ink/95 backdrop-blur md:hidden">
      <ul className="mx-auto flex max-w-md justify-around px-2 pb-[env(safe-area-inset-bottom)]">
        {NAV_LINKS.map(({ href, label, Icon }) => {
          const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <li key={href}>
              <Link
                href={href}
                className={`flex flex-col items-center gap-1 px-3 py-2.5 text-xs transition-colors ${
                  active ? "text-caramel" : "text-cream-muted hover:text-cream"
                }`}
              >
                <Icon className="h-6 w-6" />
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
