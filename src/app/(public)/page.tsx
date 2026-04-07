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

const stats = [
  { value: "200+", label: "Events Performed" },
  { value: "8+", label: "Years on Stage" },
  { value: "5★", label: "Avg. Client Rating" },
  { value: "3", label: "Genres, One Sound" },
];

export default function Home() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="vintage-container pt-10 pb-16 text-center relative">
        {/* Glow halo behind logo */}
        <div
          className="absolute left-1/2 -translate-x-1/2 top-12 w-72 h-72 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(214,178,94,0.10) 0%, rgba(122,28,28,0.07) 50%, transparent 70%)",
            filter: "blur(32px)",
          }}
        />

        <div className="flex justify-center mb-6 relative">
          <Logo size="hero" />
        </div>

        <h1 className="hero-title text-6xl md:text-8xl font-extrabold leading-none tracking-tight relative">
          <BrandName />
        </h1>

        <p className="mt-4 text-[10px] tracking-[0.25em] uppercase vintage-muted">
          Miami, FL &nbsp;·&nbsp; Rock &nbsp;·&nbsp; Funk &nbsp;·&nbsp; Live Shows
        </p>

        <p className="mt-5 vintage-muted max-w-md mx-auto text-sm leading-relaxed">
          Modern rock power fused with funk-forward groove and a Santana-inspired
          edge — built for big stages and unforgettable nights.
        </p>

        <div className="mt-8 flex justify-center gap-3 flex-wrap">
          <Link
            href="/booking"
            className="btn-oxblood px-7 py-3 font-semibold text-sm tracking-wide rounded-xl"
          >
            Book a Show
          </Link>
          <a
            href={links.spotify}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline px-7 py-3 font-semibold text-sm tracking-wide rounded-xl"
          >
            Listen on Spotify
          </a>
        </div>

        <div className="mt-14 vintage-divider" />
      </section>

      {/* ── STATS STRIP ──────────────────────────────────────────────── */}
      <section className="vintage-container pb-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {stats.map(({ value, label }) => (
            <div
              key={label}
              className="text-center py-5 rounded-2xl"
              style={{
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div
                className="text-2xl font-extrabold tracking-tight"
                style={{ color: "#d6b25e" }}
              >
                {value}
              </div>
              <div className="text-xs mt-1 uppercase tracking-widest" style={{ color: "rgba(242,239,233,0.4)" }}>
                {label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── BIO + PLATFORMS ──────────────────────────────────────────── */}
      <section className="vintage-container pb-16 grid md:grid-cols-5 gap-5">
        <div className="vintage-card p-7 md:col-span-3 flex flex-col gap-4">
          <p className="text-[10px] tracking-[0.18em] uppercase font-semibold" style={{ color: "#d6b25e" }}>
            About the Band
          </p>
          <h2 className="text-lg font-semibold leading-snug">
            A Miami rock project built for big stages
          </h2>
          <p className="vintage-muted leading-relaxed text-sm flex-1">
            ZikoFranco is led by Ziko as the main figure, backed by a tight
            band with a signature sound. Modern rock power meets funk-forward
            groove and a Santana-inspired flavor — reimagining covers with a
            unique identity while progressively introducing original songs.
          </p>
          <div className="vintage-divider" />
          <div className="flex items-center justify-between">
            <Link
              href="/epk"
              className="text-sm font-medium hover:opacity-75 transition-opacity"
              style={{ color: "#d6b25e" }}
            >
              Download Press Kit →
            </Link>
            <Link
              href="/shows"
              className="text-xs font-medium hover:opacity-75 transition-opacity"
              style={{ color: "rgba(242,239,233,0.4)" }}
            >
              Upcoming shows →
            </Link>
          </div>
        </div>

        <div className="vintage-card p-7 md:col-span-2 flex flex-col gap-4">
          <p className="text-[10px] tracking-[0.18em] uppercase font-semibold" style={{ color: "#d6b25e" }}>
            Listen &amp; Follow
          </p>
          <div className="flex flex-col gap-2 flex-1">
            {platformLinks.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="platform-link"
              >
                {label}
                <span className="ml-auto text-xs opacity-40" style={{ color: "#d6b25e" }}>↗</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── NOW STREAMING ────────────────────────────────────────────── */}
      <section className="vintage-container pb-16">
        <div className="vintage-card p-6 md:p-8 space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] tracking-[0.2em] uppercase font-semibold" style={{ color: "#d6b25e" }}>
                Now Streaming
              </p>
              <h2 className="text-base font-semibold mt-0.5">On Spotify</h2>
            </div>
            <a
              href={links.spotify}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs px-4 py-1.5 rounded-full font-medium transition hover:opacity-80"
              style={{
                background: "rgba(29,185,84,0.12)",
                color: "#1db954",
                border: "1px solid rgba(29,185,84,0.2)",
              }}
            >
              Open in Spotify ↗
            </a>
          </div>

          <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.06)" }}>
            <iframe
              src="https://open.spotify.com/embed/artist/0xyaYBhWaHUExO14cfrdqL?utm_source=generator&theme=0"
              width="100%"
              height="380"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              style={{ display: "block" }}
            />
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────── */}
      <section className="vintage-container pb-16">
        <div className="space-y-8">
          <div>
            <p className="text-[10px] tracking-[0.2em] uppercase font-semibold" style={{ color: "#d6b25e" }}>
              What People Say
            </p>
            <h2 className="text-xl font-bold mt-1">Trusted by event organizers</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {testimonials.map(({ quote, name, event }) => (
              <div
                key={name}
                className="flex flex-col gap-4 p-6 rounded-2xl"
                style={{
                  background: "rgba(18,18,20,0.6)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <span className="text-3xl leading-none font-serif" style={{ color: "#d6b25e" }}>"</span>
                <p className="vintage-muted text-sm leading-relaxed flex-1">{quote}</p>
                <div className="pt-2" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                  <p className="text-sm font-semibold" style={{ color: "#f2efe9" }}>{name}</p>
                  <p className="text-xs mt-0.5" style={{ color: "rgba(242,239,233,0.3)" }}>{event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ADMIN ACCESS ─────────────────────────────────────────────── */}
      <section className="vintage-container pb-8">
        <div className="flex justify-center">
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all hover:opacity-80"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "rgba(242,239,233,0.55)",
            }}
          >
            <span style={{ fontSize: "0.85em" }}>⚙</span>
            Acceso Admin
          </Link>
        </div>
      </section>

      {/* ── BOOKING CTA ──────────────────────────────────────────────── */}
      <section className="vintage-container pb-24">
        <div
          className="rounded-2xl px-8 py-12 text-center relative overflow-hidden"
          style={{
            background: "rgba(18,18,20,0.8)",
            border: "1px solid rgba(214,178,94,0.12)",
          }}
        >
          {/* Subtle glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(214,178,94,0.06), transparent)",
            }}
          />

          <p className="text-[10px] tracking-[0.25em] uppercase font-semibold relative" style={{ color: "#d6b25e" }}>
            Book ZikoFranco
          </p>
          <h2 className="text-2xl md:text-3xl font-extrabold mt-3 mb-3 tracking-tight relative">
            Ready to make your event unforgettable?
          </h2>
          <p className="vintage-muted text-sm max-w-md mx-auto leading-relaxed mb-8 relative">
            Private events, corporate shows, festivals, weddings — we bring the
            energy every time. Let's talk.
          </p>
          <Link
            href="/booking"
            className="btn-gold inline-flex px-9 py-3.5 text-sm font-bold rounded-xl relative"
          >
            Request a Quote
          </Link>
          <p className="text-xs mt-4 relative" style={{ color: "rgba(242,239,233,0.3)" }}>
            We respond within 24–48 hours
          </p>
        </div>
      </section>
    </>
  );
}
