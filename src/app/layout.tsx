import type { Metadata } from "next";
import type { ReactNode } from "react";
import { PrimaryNavigation } from "@/components/primary-navigation";
import { academicContext, formatReferenceDate } from "@/lib/academic-context";
import "./globals.css";

export const metadata: Metadata = {
  title: "School Dashboard",
  description: "A clear view of your academic day and week.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900 antialiased">
        <div className="min-h-screen lg:grid lg:grid-cols-[240px_minmax(0,1fr)]">
          <aside className="bg-slate-950 px-5 py-5 text-white sm:px-8 lg:min-h-screen lg:px-6 lg:py-9">
            <div className="flex items-center gap-3">
              <div aria-hidden="true" className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-sky-300 text-sm font-black tracking-tight text-slate-950">
                SD
              </div>
              <div className="min-w-0">
                <p className="text-base font-semibold leading-tight">School Dashboard</p>
                <p className="mt-0.5 text-xs text-slate-300">{academicContext.term}</p>
              </div>
            </div>
            <PrimaryNavigation />
          </aside>

          <main id="main-content" className="min-w-0 px-5 py-8 sm:px-8 lg:px-10 lg:py-11">
            <div className="mx-auto w-full max-w-5xl">
              <div className="mb-8 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium text-slate-600">
                <span>{academicContext.term}</span>
                <span aria-hidden="true">·</span>
                <span>Reference day:</span>
                <time dateTime={academicContext.referenceDate}>{formatReferenceDate()}</time>
              </div>
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
