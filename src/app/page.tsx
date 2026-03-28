import Link from "next/link";
import { Logo } from "@/components/branding/Logo";
import { BrandName } from "@/components/branding/BrandName";
import { links, platformLinks } from "@/content/links";

const testimonials = [
  {
    quote:
      "ZikoFranco completely transformed our corporate gala. The energy was electric — guests were on their feet the entire night.",
    name: "Maria V.",
    event: "Corporate Gala · Miami, FL",
  },
  {
    quote:
      "Booked them for our wedding reception and it was the best decision we made. They read the room perfectly.",
    name: "Carlos & Ana",
    event: "Wedding Reception · Coral Gables, FL",
  },
  {
    quote:
      "Incredible stage presence. The crowd went crazy. We're already planning the next show together.",
    name: "DJ Renzo",
    event: "Venue Show · Wynwood, FL",
  },
];

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
      <section className="vintage-container pb-16 grid md:grid-cols-5 gap-5">
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
            href="/epk"
            className="self-start text-gold text-sm font-medium hover:opacity-75 transition-opacity"
          >
            Download Press Kit →
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

      {/* SPOTIFY EMBED */}
      <section className="vintage-container pb-16">
        <div className="space-y-4">
          <p className="text-[10px] tracking-[0.2em] uppercase text-gold font-semibold">
            Now Streaming
          </p>
          <iframe
            src="https://open.spotify.com/embed/artist/0xyaYBhWaHUExO14cfrdqL?utm_source=generator&theme=0"
            width="100%"
            height="352"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            className="rounded-2xl border border-white/10"
          />
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="vintage-container pb-20">
        <div className="space-y-6">
          <div>
            <p className="text-[10px] tracking-[0.2em] uppercase text-gold font-semibold">
              What People Say
            </p>
            <h2 className="text-xl font-bold text-white mt-1">Trusted by event organizers</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {testimonials.map(({ quote, name, event }) => (
              <div key={name} className="vintage-card p-6 flex flex-col gap-4">
                <p className="text-gold text-2xl leading-none">"</p>
                <p className="vintage-muted text-sm leading-relaxed flex-1">{quote}</p>
                <div>
                  <p className="text-white font-semibold text-sm">{name}</p>
                  <p className="text-white/30 text-xs mt-0.5">{event}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/booking"
              className="btn-gold inline-flex px-8 py-3 text-sm font-semibold rounded-xl"
            >
              Book ZikoFranco for Your Event
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
