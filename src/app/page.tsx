import Link from "next/link";
import { Logo } from "@/components/branding/Logo";
import { BrandName } from "@/components/branding/BrandName";
import { links, platformLinks } from "@/content/links";

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="vintage-container pt-8 pb-16 text-center">
        <div className="flex justify-center mb-6">
          <Logo size="hero" />
        </div>

        <h1 className="hero-title text-6xl md:text-8xl font-extrabold leading-none tracking-tight">
          <BrandName />
        </h1>

        <p className="mt-4 text-xs tracking-[0.2em] uppercase vintage-muted">
          Miami, FL &nbsp;·&nbsp; Rock &nbsp;·&nbsp; Funk &nbsp;·&nbsp; Live Shows
        </p>

        <p className="mt-6 vintage-muted max-w-lg mx-auto text-base leading-relaxed">
          Modern rock power fused with funk-forward groove and a
          Santana-inspired edge — built for big stages and unforgettable nights.
        </p>

        <div className="mt-9 flex justify-center gap-3 flex-wrap">
          <Link href="/booking" className="btn-oxblood px-7 py-3 font-semibold text-sm tracking-wide">
            Book a Show
          </Link>
          <a
            href={links.spotify}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline px-7 py-3 font-semibold text-sm tracking-wide"
          >
            Listen on Spotify
          </a>
        </div>

        <div className="mt-14 vintage-divider" />
      </section>

      {/* BIO + PLATFORMS */}
      <section className="vintage-container pb-20 grid md:grid-cols-5 gap-5">
        <div className="vintage-card p-7 md:col-span-3 flex flex-col gap-4">
          <p className="text-[10px] tracking-[0.18em] uppercase text-gold font-semibold">
            About the Band
          </p>
          <h2 className="text-lg font-semibold leading-snug text-white">
            A Miami rock project built for big stages
          </h2>
          <p className="vintage-muted leading-relaxed text-sm flex-1">
            ZikoFranco is led by Ziko as the main figure, backed by a tight
            band with a signature sound. Modern rock power meets funk-forward
            groove and a Santana-inspired flavor — reimagining covers with a
            unique identity while progressively introducing original songs.
          </p>
          <Link
            href="/booking"
            className="self-start text-gold text-sm font-medium hover:opacity-75 transition-opacity"
          >
            Book for your event →
          </Link>
        </div>

        <div className="vintage-card p-7 md:col-span-2 flex flex-col gap-4">
          <p className="text-[10px] tracking-[0.18em] uppercase text-gold font-semibold">
            Listen &amp; Follow
          </p>
          <div className="flex flex-col gap-2">
            {platformLinks.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="platform-link"
              >
                {label}
                <span className="ml-auto text-gold opacity-50 text-xs">↗</span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
