"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const destinations = [
  { href: "/", label: "Dashboard" },
  { href: "/courses", label: "Courses" },
  { href: "/weekly-plan", label: "Weekly Plan" },
  { href: "/today", label: "Today" },
  { href: "/academic", label: "My workspace" },
] as const;

export function PrimaryNavigation() {
  const pathname = usePathname();

  return (
    <nav aria-label="Primary" className="mt-7 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:flex lg:flex-col">
      {destinations.map(({ href, label }) => {
        const active =
          pathname === href ||
          (href === "/courses" && pathname.startsWith("/courses/"));

        return (
          <Link
            key={href}
            href={href}
            prefetch={href === "/academic" ? false : undefined}
            aria-current={active ? "page" : undefined}
            className={`rounded-xl px-3 py-2.5 text-center text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300 lg:text-left ${
              active
                ? "bg-white text-slate-950 shadow-sm"
                : "text-slate-200 hover:bg-slate-800 hover:text-white"
            }`}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
