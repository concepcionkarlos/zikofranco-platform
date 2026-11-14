"use client";

import Link from "next/link";
import { Logo } from "@/components/branding/Logo";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { LocaleSwitcher } from "@/components/ui/LocaleSwitcher";

interface NavLabels {
  home: string;
  show: string;
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

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header({ locale, nav }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Shadow + reading-progress bar, throttled with requestAnimationFrame.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      setScrolled(y > 12);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${max > 0 ? Math.min(y / max, 1) : 0})`;
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  // Mobile menu: lock page scroll and close with Escape while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const close = () => setOpen(false);

  const NAV_LINKS = [
    { href: "/show", label: nav.show },
    { href: "/shows", label: nav.shows },
    { href: "/media", label: nav.media },
    { href: "/merch", label: nav.merch },
    { href: "/epk", label: nav.epk },
  ];

  return (
    <>
      <header
        className="w-full sticky top-0 z-40 border-b backdrop-blur-md"
        style={{
          borderColor: "rgba(255,255,255,0.07)",
          background: scrolled || open ? "rgba(11,11,12,0.94)" : "rgba(11,11,12,0.80)",
          boxShadow: scrolled ? "0 4px 32px rgba(0,0,0,0.45)" : "none",
          transition: "background 200ms ease, box-shadow 200ms ease",
        }}
      >
        <div className="mx-auto max-w-6xl px-5 sm:px-6 py-2.5 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" onClick={close} className="no-underline shrink-0 logo-nav" aria-label="ZikoFranco — home">
            <Logo size="nav" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6" aria-label="Main">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="nav-link"
                aria-current={isActive(pathname, href) ? "page" : undefined}
              >
                {label}
              </Link>
            ))}
            <LocaleSwitcher locale={locale} />
            <Link
              href="/booking"
              className="btn-oxblood px-4 py-2 text-xs font-semibold rounded-xl"
              aria-current={isActive(pathname, "/booking") ? "page" : undefined}
            >
              {nav.bookNow}
            </Link>
          </nav>

          {/* Mobile: book + locale + hamburger */}
          <div className="md:hidden flex items-center gap-2">
            {!isActive(pathname, "/booking") && (
              <Link href="/booking" onClick={close} className="btn-oxblood px-3 py-2 text-xs font-semibold rounded-lg">
                {nav.bookNow}
              </Link>
            )}
            <LocaleSwitcher locale={locale} />
            <button
              className="flex flex-col justify-center items-center w-10 h-10 gap-[5px] rounded-lg transition-colors"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-nav"
            >
              <span
                className="block w-[22px] h-px"
                style={{
                  background: "rgba(242,239,233,0.8)",
                  transition: "transform 230ms cubic-bezier(0.22,1,0.36,1)",
                  transform: open ? "translateY(5.5px) rotate(45deg)" : undefined,
                }}
              />
              <span
                className="block w-[22px] h-px"
                style={{ background: "rgba(242,239,233,0.8)", transition: "opacity 180ms ease", opacity: open ? 0 : 1 }}
              />
              <span
                className="block w-[22px] h-px"
                style={{
                  background: "rgba(242,239,233,0.8)",
                  transition: "transform 230ms cubic-bezier(0.22,1,0.36,1)",
                  transform: open ? "translateY(-5.5px) rotate(-45deg)" : undefined,
                }}
              />
            </button>
          </div>
        </div>

        <div ref={progressRef} className="scroll-progress" style={{ transform: "scaleX(0)" }} aria-hidden />

        {/* Mobile drawer */}
        {open && (
          <nav
            id="mobile-nav"
            aria-label="Main"
            className="mobile-drawer md:hidden border-t"
            style={{ borderColor: "rgba(255,255,255,0.06)", background: "rgba(10,10,12,0.98)" }}
          >
            <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-0.5">
              {[{ href: "/", label: nav.home }, ...NAV_LINKS].map(({ href, label }) => {
                const active = href === "/" ? pathname === "/" : isActive(pathname, href);
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={close}
                    aria-current={active ? "page" : undefined}
                    className="mobile-nav-link py-3.5 text-base font-medium transition-colors flex items-center justify-between"
                    style={{
                      color: active ? "#d6b25e" : "rgba(242,239,233,0.75)",
                      borderBottom: "1px solid rgba(255,255,255,0.05)",
                    }}
                  >
                    {label}
                    <span aria-hidden style={{ color: active ? "#d6b25e" : "rgba(242,239,233,0.25)" }}>→</span>
                  </Link>
                );
              })}
              <Link
                href="/booking"
                onClick={close}
                className="mt-4 btn-oxblood px-5 py-3.5 text-sm font-semibold rounded-xl text-center"
              >
                {nav.bookNow}
              </Link>
            </div>
          </nav>
        )}
      </header>

      {/* Tap outside the drawer to close it */}
      {open && (
        <button
          type="button"
          aria-label="Close menu"
          tabIndex={-1}
          onClick={close}
          className="md:hidden fixed inset-0 z-30 cursor-default"
          style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(2px)" }}
        />
      )}
    </>
  );
}
