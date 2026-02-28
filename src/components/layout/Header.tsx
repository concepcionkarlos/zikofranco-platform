/**
 * src/components/layout/Header.tsx
 * Barra superior con logo y navegación.
 */
import Link from "next/link";
import { Logo } from "@/components/branding/Logo";

export function Header() {
  return (
    <header className="w-full border-b border-white/10">
      <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
        <Link href="/" className="no-underline">
          <Logo />
        </Link>

        <nav className="flex items-center gap-6 text-white/80">
          <Link className="hover:text-white transition" href="/booking">
            Booking
          </Link>
          <Link className="hover:text-white transition" href="/media">
            Media
          </Link>
          <Link className="hover:text-white transition" href="/merch">
            Merch
          </Link>
        </nav>
      </div>
    </header>
  );
}
