/**
 * src/components/branding/Logo.tsx
 * Componente central del logo.
 * El archivo real debe estar en: public/assets/logo/logo.png
 */
import Image from "next/image";

type LogoProps = {
  size?: "header" | "hero";
};

export function Logo({ size = "header" }: LogoProps) {
  const sizeClass =
    size === "hero" ? "h-24 md:h-32 w-auto" : "h-14 w-auto";

  return (
    <div className="flex items-center">
      <Image
        src="/assets/logo/logo.png"
        alt="ZikoFranco official logo"
        width={500}
        height={500}
        priority
        className={`${sizeClass} logo-glow`}
      />
    </div>
  );
}
