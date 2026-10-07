"use client";

import { usePathname } from "next/navigation";

export function SidebarContextLabel({ term }: { term: string }) {
  const pathname = usePathname();
  return <p className="mt-0.5 text-xs text-slate-300">
    {pathname.startsWith("/academic") || pathname.startsWith("/auth") || pathname === "/login" || pathname === "/signup"
      ? "Private academic workspace" : term}
  </p>;
}

export function MainContextLabel({ term, referenceDate, formattedDate }: { term: string; referenceDate: string; formattedDate: string }) {
  const pathname = usePathname();
  if (pathname.startsWith("/academic") || pathname.startsWith("/auth") || pathname === "/login" || pathname === "/signup") {
    return null;
  }
  return <div className="mb-8 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium text-slate-600">
    <span>{term}</span>
    <span aria-hidden="true">·</span>
    <span>Reference day:</span>
    <time dateTime={referenceDate}>{formattedDate}</time>
  </div>;
}
