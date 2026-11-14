/**
 * src/components/branding/Logo.tsx
 * Logo ZF (sombrero de copa), recortado sin márgenes transparentes.
 *
 * Animaciones (CSS puro, en globals.css → "Logo"):
 * - hero: entrada (cae y se acomoda), flotación suave, destello dorado periódico
 * - todos: "hat tip" al pasar el mouse (el sombrero se inclina como saludo)
 * Todo se desactiva con prefers-reduced-motion.
 */
import Image from "next/image";

type LogoProps = {
  size?: "hero" | "nav" | "header";
};

const SIZE_CLASS: Record<NonNullable<LogoProps["size"]>, string> = {
  hero: "h-28 sm:h-36 md:h-44 w-auto",
  nav: "h-9 w-auto",
  header: "h-14 w-auto",
};

export function Logo({ size = "nav" }: LogoProps) {
  const hero = size === "hero";

  return (
    <span className={`logo-wrap${hero ? " logo-hero-animate" : ""}`}>
      <span className={`logo-inner${hero ? " logo-float" : ""}`}>
        <Image
          src="/assets/logo/logo-mark.png"
          alt="ZikoFranco official logo"
          width={621}
          height={519}
          priority
          sizes={hero ? "(min-width: 768px) 210px, 170px" : "48px"}
          className={`${SIZE_CLASS[size]} logo-img${hero ? " logo-glow" : ""}`}
        />
        {hero && <span className="logo-shine" aria-hidden />}
      </span>
    </span>
  );
}
