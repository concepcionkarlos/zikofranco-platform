/**
 * src/components/layout/Header.tsx
 * Barra superior con logo y navegación.
 */
import Link from "next/link";
import { Logo } from "@/components/branding/Logo";

export function Header() {
  return (
    <header className="w-full sticky top-0 z-40 border-b border-white/10 backdrop-blur-md bg-[#0b0b0c]/70">
      <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
        <Link href="/" className="no-underline">
          <Logo />
        </Link>

        <nav className="flex items-center gap-6">
          <Link href="/booking" className="nav-link">
            Booking
          </Link>
          <Link href="/media" className="nav-link">
            Media
          </Link>
          <Link href="/merch" className="nav-link">
            Merch
          </Link>
        </nav>
      </div>
    </header>
  );
}
