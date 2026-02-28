/**
 * src/components/layout/Footer.tsx
 * Parte inferior del sitio con links oficiales.
 */
import { SocialLinks } from "@/components/media/SocialLinks";

export function Footer() {
  return (
    <footer className="border-t border-white/10 mt-16">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="text-white font-semibold mb-4">ZicoFranco</div>
        <SocialLinks />
        <div className="text-white/50 text-sm mt-8">
          © {new Date().getFullYear()} ZicoFranco. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
