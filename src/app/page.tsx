/**
 * src/app/page.tsx
 * Home principal del sitio.
 *
 * Nota:
 * - Header/Footer vienen desde src/app/layout.tsx (layout global)
 * - Este archivo solo contiene el contenido del Home.
 */

import Link from "next/link";
import { homepage } from "@/content/homepage";
import { SocialLinks } from "@/components/media/SocialLinks";

export default function HomePage() {
  return (
    <section className="space-y-10">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
          {homepage.hero.headline}
        </h1>
        <p className="text-white/80 mt-4 max-w-2xl">
          {homepage.hero.subheadline}
        </p>

        <div className="flex flex-wrap gap-3 mt-6">
          <Link
            href={homepage.hero.primaryCTA.href}
            className="px-5 py-3 rounded-xl bg-[#B11226] hover:bg-[#D4142C] transition font-semibold"
          >
            {homepage.hero.primaryCTA.label}
          </Link>

          <Link
            href={homepage.hero.secondaryCTA.href}
            className="px-5 py-3 rounded-xl border border-white/15 hover:border-white/30 transition font-semibold text-white/90"
          >
            {homepage.hero.secondaryCTA.label}
          </Link>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
          <h2 className="text-2xl font-semibold">Biography</h2>
          <p className="text-white/80 mt-4 leading-relaxed">
            {homepage.biography}
          </p>
        </div>

        <div
          id="music"
          className="rounded-2xl border border-white/10 bg-white/5 p-8"
        >
          <h2 className="text-2xl font-semibold">Listen & Follow</h2>
          <p className="text-white/70 mt-2">Official platforms and channels.</p>
          <div className="mt-5">
            <SocialLinks />
          </div>
        </div>
      </div>
    </section>
  );
}
