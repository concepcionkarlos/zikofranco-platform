"use client";

import Link from "next/link";
import { Logo } from "@/components/branding/Logo";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/shows", label: "Shows" },
  { href: "/media", label: "Media" },
  { href: "/merch", label: "Merch" },
  { href: "/epk", label: "EPK" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close drawer on navigation
  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <header className="w-full sticky top-0 z-40 border-b border-white/[0.07] backdrop-blur-md bg-[#0b0b0c]/80">
      <div className="mx-auto max-w-6xl px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="no-underline shrink-0" aria-label="ZikoFranco — home">
          <Logo size="nav" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-5">
          {NAV_LINKS.map(({ href, label }) => (
            <Link key={href} href={href} className="nav-link">
              {label}
            </Link>
          ))}
          <Link href="/booking" className="btn-oxblood px-4 py-2 text-xs font-semibold rounded-xl">
            Book Now
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5 rounded-lg transition-colors"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          <span
            className="block w-5 h-px transition-all duration-200 origin-center"
            style={{
              background: "rgba(242,239,233,0.7)",
              transform: open ? "translateY(4px) rotate(45deg)" : undefined,
            }}
          />
          <span
            className="block w-5 h-px transition-all duration-200"
            style={{
              background: "rgba(242,239,233,0.7)",
              opacity: open ? 0 : 1,
            }}
          />
          <span
            className="block w-5 h-px transition-all duration-200 origin-center"
            style={{
              background: "rgba(242,239,233,0.7)",
              transform: open ? "translateY(-4px) rotate(-45deg)" : undefined,
            }}
          />
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <nav
          className="md:hidden border-t"
          style={{
            borderColor: "rgba(255,255,255,0.06)",
            background: "rgba(11,11,15,0.97)",
            backdropFilter: "blur(20px)",
          }}
        >
          <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-1">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="py-3 text-sm font-medium transition-colors"
                style={{
                  color: "rgba(242,239,233,0.65)",
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                }}
              >
                {label}
              </Link>
            ))}
            <Link
              href="/booking"
              className="mt-3 btn-oxblood px-5 py-3 text-sm font-semibold rounded-xl text-center"
            >
              Book Now
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
