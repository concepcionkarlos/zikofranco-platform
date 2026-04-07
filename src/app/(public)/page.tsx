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
  { value: "200+", label: "Events" },
  { value: "8+", label: "Years on Stage" },
  { value: "5★", label: "Client Rating" },
  { value: "Miami", label: "Based in" },
];

export default function Home() {
  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section className="vintage-container pt-12 pb-20 text-center relative">
        <div
          className="absolute left-1/2 -translate-x-1/2 top-0 w-[500px] h-64 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse, rgba(214,178,94,0.09) 0%, rgba(122,28,28,0.06) 40%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />

        <div className="flex justify-center mb-7 relative">
          <Logo size="hero" />
        </div>

        <h1 className="hero-title text-6xl md:text-8xl font-extrabold leading-none tracking-tight relative">
          <BrandName />
        </h1>

        <p className="mt-4 text-[10px] tracking-[0.28em] uppercase vintage-muted">
          Miami, FL &nbsp;·&nbsp; Rock &nbsp;·&nbsp; Funk &nbsp;·&nbsp; Live Shows
        </p>

        <p className="mt-6 vintage-muted max-w-md mx-auto text-sm leading-relaxed">
          Modern rock power fused with funk-forward groove and a Santana-inspired
          edge — built for big stages and unforgettable nights.
        </p>

        <div className="mt-9 flex justify-center gap-3 flex-wrap">
          <Link
            href="/booking"
            className="btn-oxblood px-8 py-3 font-semibold text-sm tracking-wide rounded-xl"
          >
            Book a Show
          </Link>
          <a
            href={links.spotify}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline px-8 py-3 font-semibold text-sm tracking-wide rounded-xl"
          >
            Listen on Spotify
          </a>
        </div>

        <div className="mt-16 vintage-divider" />
      </section>

      {/* ── STATS ─────────────────────────────────────────────────────── */}
      <section className="vintage-container pb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {stats.map(({ value, label }) => (
            <div
              key={label}
              className="text-center py-6 rounded-2xl"
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.055)",
              }}
            >
              <div
                className="text-2xl font-extrabold tracking-tight"
                style={{ color: "#d6b25e" }}
              >
                {value}
              </div>
              <div
                className="text-[10px] mt-1.5 uppercase tracking-widest"
                style={{ color: "rgba(242,239,233,0.35)" }}
              >
                {label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── BIO + LISTEN ──────────────────────────────────────────────── */}
      <section className="vintage-container pb-16 grid md:grid-cols-5 gap-5">
        {/* Bio */}
        <div className="vintage-card p-8 md:col-span-3 flex flex-col gap-5">
          <p
            className="text-[10px] tracking-[0.2em] uppercase font-semibold"
            style={{ color: "#d6b25e" }}
          >
            About the Band
          </p>
          <div>
            <h2 className="text-xl font-bold leading-snug tracking-tight">
              A Miami rock project built for big stages
            </h2>
          </div>
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
              className="text-sm font-semibold hover:opacity-70 transition-opacity"
              style={{ color: "#d6b25e" }}
            >
              Press Kit →
            </Link>
            <Link
              href="/shows"
              className="text-xs hover:opacity-70 transition-opacity"
              style={{ color: "rgba(242,239,233,0.35)" }}
            >
              Upcoming shows →
            </Link>
          </div>
        </div>

        {/* Listen & Follow */}
        <div className="vintage-card p-8 md:col-span-2 flex flex-col gap-4">
          <p
            className="text-[10px] tracking-[0.2em] uppercase font-semibold"
            style={{ color: "#d6b25e" }}
          >
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
                <span
                  className="ml-auto text-xs opacity-40"
                  style={{ color: "#d6b25e" }}
                >
                  ↗
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── MUSIC ─────────────────────────────────────────────────────── */}
      <section className="vintage-container pb-16">
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            background: "rgba(13,13,15,0.7)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          {/* Header row */}
          <div
            className="flex items-center justify-between px-7 py-5"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
          >
            <div>
              <p
                className="text-[10px] tracking-[0.22em] uppercase font-semibold"
                style={{ color: "#d6b25e" }}
              >
                Music
              </p>
              <h2 className="text-base font-bold mt-0.5">Now Streaming</h2>
            </div>
            <a
              href={links.spotify}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs px-4 py-2 rounded-full font-semibold transition hover:opacity-80"
              style={{
                background: "rgba(29,185,84,0.1)",
                color: "#1db954",
                border: "1px solid rgba(29,185,84,0.18)",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
              </svg>
              Open Spotify
            </a>
          </div>

          {/* Embed */}
          <iframe
            src="https://open.spotify.com/embed/artist/0xyaYBhWaHUExO14cfrdqL?utm_source=generator&theme=0"
            width="100%"
            height="352"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            style={{ display: "block" }}
          />

          {/* Platform strip */}
          <div
            className="px-7 py-4 flex flex-wrap gap-2"
            style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
          >
            {platformLinks.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] px-3 py-1.5 rounded-full transition hover:opacity-70"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  color: "rgba(242,239,233,0.5)",
                }}
              >
                {label} ↗
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ──────────────────────────────────────────────── */}
      <section className="vintage-container pb-16">
        <div className="space-y-8">
          <div className="flex items-end justify-between">
            <div>
              <p
                className="text-[10px] tracking-[0.22em] uppercase font-semibold"
                style={{ color: "#d6b25e" }}
              >
                What People Say
              </p>
              <h2 className="text-xl font-bold mt-1 tracking-tight">
                Trusted by event organizers
              </h2>
            </div>
            <Link
              href="/booking"
              className="text-xs hidden md:block hover:opacity-70 transition-opacity"
              style={{ color: "rgba(242,239,233,0.35)" }}
            >
              Book now →
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {testimonials.map(({ quote, name, event }) => (
              <div
                key={name}
                className="flex flex-col gap-4 p-6 rounded-2xl"
                style={{
                  background: "rgba(15,15,17,0.7)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <span
                  className="text-3xl leading-none"
                  style={{ color: "rgba(214,178,94,0.5)", fontFamily: "Georgia, serif" }}
                >
                  "
                </span>
                <p
                  className="text-sm leading-relaxed flex-1"
                  style={{ color: "rgba(242,239,233,0.65)" }}
                >
                  {quote}
                </p>
                <div
                  className="pt-4"
                  style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
                >
                  <p className="text-sm font-semibold" style={{ color: "#f2efe9" }}>
                    {name}
                  </p>
                  <p
                    className="text-xs mt-0.5"
                    style={{ color: "rgba(242,239,233,0.28)" }}
                  >
                    {event}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOOKING CTA ───────────────────────────────────────────────── */}
      <section className="vintage-container pb-24">
        <div
          className="rounded-2xl px-8 py-14 text-center relative overflow-hidden"
          style={{
            background: "rgba(14,14,16,0.9)",
            border: "1px solid rgba(214,178,94,0.1)",
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 70% 60% at 50% 110%, rgba(214,178,94,0.07), transparent)",
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 50% 40% at 50% -10%, rgba(122,28,28,0.06), transparent)",
            }}
          />

          <p
            className="text-[10px] tracking-[0.3em] uppercase font-semibold relative"
            style={{ color: "#d6b25e" }}
          >
            Book ZikoFranco
          </p>
          <h2 className="text-2xl md:text-4xl font-extrabold mt-3 mb-4 tracking-tight relative leading-tight">
            Ready to make your event<br className="hidden md:block" /> unforgettable?
          </h2>
          <p
            className="text-sm max-w-sm mx-auto leading-relaxed mb-9 relative"
            style={{ color: "rgba(242,239,233,0.5)" }}
          >
            Private events, corporate shows, festivals, weddings — we bring the
            energy every time. Let's talk.
          </p>
          <Link
            href="/booking"
            className="btn-gold inline-flex px-10 py-3.5 text-sm font-bold rounded-xl relative"
          >
            Request a Quote
          </Link>
          <p
            className="text-xs mt-5 relative"
            style={{ color: "rgba(242,239,233,0.25)" }}
          >
            We respond within 24–48 hours
          </p>
        </div>
      </section>
    </>
  );
}
