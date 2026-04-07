"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: "◈" },
  { href: "/admin/requests", label: "Requests", icon: "✉" },
  { href: "/admin/shows", label: "Shows", icon: "♪" },
  { href: "/admin/merch", label: "Merch", icon: "◎" },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  function isActive(href: string) {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  }

  return (
    <aside
      className="flex flex-col h-screen w-56 shrink-0 sticky top-0"
      style={{
        background: "#0d0d0f",
        borderRight: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      {/* Brand */}
      <div className="px-5 py-5 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold" style={{ color: "#d6b25e" }}>ZF</span>
          <div>
            <div className="text-xs font-semibold tracking-widest" style={{ color: "rgba(242,239,233,0.45)", letterSpacing: "0.15em" }}>
              ADMIN
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {NAV.map(({ href, label, icon }) => {
          const active = isActive(href);
          return (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all"
              style={{
                background: active ? "rgba(214,178,94,0.1)" : "transparent",
                color: active ? "#d6b25e" : "rgba(242,239,233,0.5)",
                borderLeft: active ? "2px solid #d6b25e" : "2px solid transparent",
              }}
            >
              <span className="text-base leading-none">{icon}</span>
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom actions */}
      <div className="px-3 py-4 space-y-1 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs transition"
          style={{ color: "rgba(242,239,233,0.35)" }}
        >
          <span>↗</span>
          View site
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs transition text-left"
          style={{ color: "rgba(242,239,233,0.35)" }}
        >
          <span>→</span>
          Sign out
        </button>
      </div>
    </aside>
  );
}
