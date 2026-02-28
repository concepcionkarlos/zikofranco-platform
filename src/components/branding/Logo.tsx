/**
 * src/components/branding/Logo.tsx
 * Componente central del logo.
 * El archivo real debe estar en: public/assets/logo/logo.png
 */
import Image from "next/image";

export function Logo() {
  return (
    <div className="flex items-center gap-3">
      <Image
        src="/assets/logo/logo.png"
        alt="ZicoFranco official logo"
        width={300}
        height={300}
        priority
      />
      <span className="text-white font-semibold tracking-wide">ZicoFranco</span>
    </div>
  );
}
