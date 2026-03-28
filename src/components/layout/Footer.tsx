/**
 * src/components/layout/Footer.tsx
 * Parte inferior del sitio con links oficiales.
 */
import { BrandName } from "@/components/branding/BrandName";
import { SocialLinks } from "@/components/media/SocialLinks";

export function Footer() {
  return (
    <footer className="border-t border-white/10 mt-16">
      <div className="mx-auto max-w-6xl px-6 py-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <div className="text-white font-extrabold text-lg tracking-tight mb-1">
            <BrandName />
          </div>
          <p className="text-white/40 text-xs tracking-widest uppercase">
            Miami, FL &nbsp;·&nbsp; Rock &amp; Funk
          </p>
        </div>
        <SocialLinks />
        <div className="text-white/30 text-xs">
          © {new Date().getFullYear()} ZicoFranco. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
