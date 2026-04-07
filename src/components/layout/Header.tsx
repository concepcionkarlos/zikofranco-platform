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
          <Link href="/shows" className="nav-link">
            Shows
          </Link>
          <Link href="/media" className="nav-link">
            Media
          </Link>
          <Link href="/merch" className="nav-link">
            Merch
          </Link>
          <Link href="/epk" className="nav-link">
            EPK
          </Link>
          <Link href="/booking" className="btn-oxblood px-4 py-2 text-xs font-semibold rounded-xl">
            Book Now
          </Link>
        </nav>

        <Link
          href="/admin"
          title="Admin"
          className="ml-4 text-white/20 hover:text-white/50 transition-colors text-xs"
        >
          ⚙
        </Link>
      </div>
    </header>
  );
}
