"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { AdminSidebar } from "./AdminSidebar";

const BOTTOM_NAV = [
  {
    href: "/admin",
    label: "Home",
    exact: true,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    href: "/admin/requests",
    label: "Requests",
    exact: false,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    href: "/admin/shows",
    label: "Shows",
    exact: false,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
  {
    href: "/admin/merch",
    label: "Merch",
    exact: false,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
      </svg>
    ),
  },
  {
    href: "/admin/media",
    label: "Media",
    exact: false,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </svg>
    ),
  },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    setIsDesktop(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname]);

  function isActive(href: string, exact: boolean) {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  }

  return (
    <div className="flex min-h-screen w-full" style={{ background: "#0b0b0c", overflow: "hidden" }}>
      {/* Desktop sidebar */}
      {isDesktop && (
        <div className="shrink-0">
          <AdminSidebar />
        </div>
      )}

      {/* Mobile overlay */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          style={{ background: "rgba(0,0,0,0.65)" }}
          onClick={() => setDrawerOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <div
        className="fixed inset-y-0 left-0 z-50 md:hidden"
        style={{
          transform: drawerOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.24s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        <AdminSidebar onClose={() => setDrawerOpen(false)} />
      </div>

      {/* Main content column */}
      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        {/* Mobile top bar */}
        <header
          className="md:hidden flex items-center justify-between gap-3 px-4 h-14 sticky top-0 z-30 shrink-0"
          style={{ background: "#0c0c0e", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div className="flex items-center gap-2.5">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black shrink-0"
              style={{
                background: "linear-gradient(135deg, rgba(214,178,94,0.2), rgba(214,178,94,0.08))",
                border: "1px solid rgba(214,178,94,0.2)",
                color: "#d6b25e",
              }}
            >
              ZF
            </div>
            <span className="text-sm font-semibold tracking-tight" style={{ color: "rgba(242,239,233,0.7)" }}>
              Admin
            </span>
          </div>

          {/* ≡ for Content + secondary items */}
          <button
            onClick={() => setDrawerOpen(true)}
            className="flex items-center gap-1.5 px-3 h-9 rounded-xl text-xs font-medium"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "rgba(242,239,233,0.5)",
            }}
            aria-label="More options"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
            <span>More</span>
          </button>
        </header>

        {/* Page content — pb-24 on mobile leaves space for bottom nav */}
        <main
          className="flex-1 overflow-y-auto overflow-x-hidden px-4 py-5 pb-28 md:p-8 md:pb-8"
          style={{ color: "#f2efe9" }}
        >
          {children}
        </main>
      </div>

      {/* ── Bottom nav — mobile only ── */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-30 flex"
        style={{
          background: "rgba(11,11,14,0.97)",
          borderTop: "1px solid rgba(255,255,255,0.08)",
          backdropFilter: "blur(16px)",
          paddingBottom: "env(safe-area-inset-bottom, 0px)",
        }}
      >
        {BOTTOM_NAV.map(({ href, label, icon, exact }) => {
          const active = isActive(href, exact);
          return (
            <Link
              key={href}
              href={href}
              className="flex-1 flex flex-col items-center justify-center gap-1 py-2.5 transition-colors"
              style={{ color: active ? "#d6b25e" : "rgba(242,239,233,0.3)" }}
            >
              <span
                className="transition-transform"
                style={{ transform: active ? "scale(1.1)" : "scale(1)" }}
              >
                {icon}
              </span>
              <span
                className="text-[9px] font-semibold tracking-wide uppercase"
                style={{ color: active ? "#d6b25e" : "rgba(242,239,233,0.3)" }}
              >
                {label}
              </span>
              {active && (
                <span
                  className="absolute"
                  style={{
                    width: 28,
                    height: 2,
                    borderRadius: 1,
                    background: "#d6b25e",
                    top: 0,
                  }}
                />
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
