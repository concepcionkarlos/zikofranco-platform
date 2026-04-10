"use client";

import Link from "next/link";
import { Logo } from "@/components/branding/Logo";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { LocaleSwitcher } from "@/components/ui/LocaleSwitcher";

interface NavLabels {
  shows: string;
  media: string;
  merch: string;
  epk: string;
  bookNow: string;
}

interface HeaderProps {
  locale: string;
  nav: NavLabels;
}

export function Header({ locale, nav }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => { setOpen(false); }, [pathname]);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 12);
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const NAV_LINKS = [
    { href: "/shows", label: nav.shows },
    { href: "/media", label: nav.media },
    { href: "/merch", label: nav.merch },
    { href: "/epk", label: nav.epk },
  ];

  return (
    <header
      className="w-full sticky top-0 z-40 border-b backdrop-blur-md"
      style={{
        borderColor: "rgba(255,255,255,0.07)",
        background: scrolled ? "rgba(11,11,12,0.92)" : "rgba(11,11,12,0.80)",
        boxShadow: scrolled ? "0 4px 32px rgba(0,0,0,0.45)" : "none",
        transition: "background 200ms ease, box-shadow 200ms ease",
      }}
    >
      <div className="mx-auto max-w-6xl px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="no-underline shrink-0 logo-nav" aria-label="ZikoFranco — home">
          <Logo size="nav" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-5">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="nav-link"
              aria-current={pathname === href ? "page" : undefined}
            >
              {label}
            </Link>
          ))}
          <LocaleSwitcher locale={locale} />
          <Link href="/booking" className="btn-oxblood px-4 py-2 text-xs font-semibold rounded-xl">
            {nav.bookNow}
          </Link>
        </nav>

        {/* Mobile: locale switcher + hamburger */}
        <div className="md:hidden flex items-center gap-3">
          <LocaleSwitcher locale={locale} />
          <button
            className="flex flex-col justify-center items-center w-9 h-9 gap-[5px] rounded-lg transition-colors"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            <span
              className="block w-[22px] h-px"
              style={{
                background: "rgba(242,239,233,0.75)",
                transition: "transform 230ms cubic-bezier(0.22,1,0.36,1), opacity 180ms ease",
                transform: open ? "translateY(5.5px) rotate(45deg)" : undefined,
              }}
            />
            <span
              className="block w-[22px] h-px"
              style={{
                background: "rgba(242,239,233,0.75)",
                transition: "opacity 180ms ease",
                opacity: open ? 0 : 1,
              }}
            />
            <span
              className="block w-[22px] h-px"
              style={{
                background: "rgba(242,239,233,0.75)",
                transition: "transform 230ms cubic-bezier(0.22,1,0.36,1), opacity 180ms ease",
                transform: open ? "translateY(-5.5px) rotate(-45deg)" : undefined,
              }}
            />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <nav
          id="mobile-nav"
          className="mobile-drawer md:hidden border-t"
          style={{
            borderColor: "rgba(255,255,255,0.06)",
            background: "rgba(10,10,12,0.97)",
            backdropFilter: "blur(20px)",
          }}
        >
          <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-0.5">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="py-3.5 text-sm font-medium transition-colors"
                style={{
                  color: pathname === href ? "#d6b25e" : "rgba(242,239,233,0.65)",
                  borderBottom: "1px solid rgba(255,255,255,0.045)",
                }}
              >
                {label}
              </Link>
            ))}
            <Link
              href="/booking"
              className="mt-4 btn-oxblood px-5 py-3.5 text-sm font-semibold rounded-xl text-center"
            >
              {nav.bookNow}
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
