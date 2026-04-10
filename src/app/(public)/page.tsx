import Link from "next/link";
import { Logo } from "@/components/branding/Logo";
import { BrandName } from "@/components/branding/BrandName";
import { links, platformLinks } from "@/content/links";
import { Reveal } from "@/components/ui/Reveal";
import { prisma } from "@/lib/db";
import { getLocale, getMessages, createT } from "@/lib/i18n";

const DEFAULT_SPOTIFY_EMBED =
  "https://open.spotify.com/embed/artist/0xyaYBhWaHUExO14cfrdqL?utm_source=generator&theme=0";

export const revalidate = 300;

async function getSpotifyEmbedUrl(): Promise<string> {
  try {
    const row = await prisma.siteContent.findUnique({ where: { key: "spotify_embed_url" } });
    return row?.value || DEFAULT_SPOTIFY_EMBED;
  } catch {
    return DEFAULT_SPOTIFY_EMBED;
  }
}

export default async function Home() {
  const [spotifyEmbedUrl, locale] = await Promise.all([getSpotifyEmbedUrl(), getLocale()]);
  const messages = await getMessages(locale);
  const t = createT(messages, "home");

  const stats = [
    { value: "200+", label: t("stats.events") },
    { value: "8+",   label: t("stats.years") },
    { value: "5★",   label: t("stats.rating") },
    { value: "Miami", label: t("stats.based") },
  ];

  type Testimonial = { quote: string; name: string; event: string };
  const testimonials = t.raw("testimonials.items") as Testimonial[];

  return (
    <>
      {/* ── HERO ── */}
      <section className="vintage-container pt-12 pb-20 sm:pt-16 sm:pb-24 text-center relative overflow-hidden">
        <div
          className="absolute left-1/2 -translate-x-1/2 top-0 w-[90vw] max-w-[500px] h-64 pointer-events-none"
          aria-hidden
          style={{ background: "radial-gradient(ellipse, rgba(214,178,94,0.09) 0%, rgba(122,28,28,0.06) 40%, transparent 70%)", filter: "blur(40px)" }}
        />
        <div className="flex justify-center mb-6 sm:mb-7 relative">
          <Logo size="hero" />
        </div>
        <h1 className="hero-title text-5xl sm:text-6xl md:text-8xl font-extrabold leading-none tracking-tight relative">
          <BrandName />
        </h1>
        <p className="mt-4 sm:mt-5 text-[10px] tracking-[0.3em] uppercase vintage-muted">{t("tagline")}</p>
        <p className="mt-4 sm:mt-5 vintage-muted max-w-sm mx-auto text-sm leading-relaxed px-2">{t("heroText")}</p>
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row justify-center gap-3 px-4 sm:px-0">
          <Link href="/booking" className="btn-oxblood px-8 py-3.5 font-semibold text-sm tracking-wide rounded-xl">
            {t("bookShow")}
          </Link>
          <a href={links.spotify} target="_blank" rel="noopener noreferrer"
            className="btn-outline px-8 py-3.5 font-semibold text-sm tracking-wide rounded-xl">
            {t("listenSpotify")}
          </a>
        </div>
        <div className="mt-14 sm:mt-16 vintage-divider" />
      </section>

      {/* ── STATS ── */}
      <Reveal className="vintage-container pb-16 sm:pb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {stats.map(({ value, label }) => (
            <div key={label} className="text-center py-6 sm:py-7 rounded-2xl"
              style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="text-2xl sm:text-3xl font-extrabold tracking-tight tabular-nums" style={{ color: "#d6b25e" }}>{value}</div>
              <div className="text-[10px] mt-2 uppercase tracking-widest" style={{ color: "rgba(242,239,233,0.35)" }}>{label}</div>
            </div>
          ))}
        </div>
      </Reveal>

      {/* ── BIO + LISTEN ── */}
      <Reveal className="vintage-container pb-16 sm:pb-20">
        <div className="grid md:grid-cols-5 gap-4 sm:gap-5">
          <div className="vintage-card p-5 sm:p-8 md:col-span-3 flex flex-col gap-4 sm:gap-5">
            <p className="text-[10px] tracking-[0.2em] uppercase font-semibold" style={{ color: "#d6b25e" }}>{t("about.label")}</p>
            <h2 className="text-lg sm:text-xl font-bold leading-snug tracking-tight">{t("about.heading")}</h2>
            <p className="vintage-muted leading-relaxed text-sm flex-1">{t("about.body")}</p>
            <div className="vintage-divider" />
            <div className="flex items-center justify-between">
              <Link href="/epk" className="text-sm font-semibold hover:opacity-70 transition-opacity" style={{ color: "#d6b25e" }}>
                {t("about.pressKit")}
              </Link>
              <Link href="/shows" className="text-xs hover:opacity-70 transition-opacity" style={{ color: "rgba(242,239,233,0.35)" }}>
                {t("about.upcoming")}
              </Link>
            </div>
          </div>
          <div className="vintage-card p-5 sm:p-8 md:col-span-2 flex flex-col gap-4">
            <p className="text-[10px] tracking-[0.2em] uppercase font-semibold" style={{ color: "#d6b25e" }}>{t("listenFollow")}</p>
            <div className="flex flex-col gap-2 flex-1">
              {platformLinks.map(({ label, href }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="platform-link">
                  {label}
                  <span className="ml-auto text-xs opacity-40" style={{ color: "#d6b25e" }}>↗</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </Reveal>

      {/* ── MUSIC ── */}
      <Reveal className="vintage-container pb-16 sm:pb-20">
        <div className="rounded-2xl overflow-hidden" style={{ background: "rgba(13,13,15,0.7)", border: "1px solid rgba(255,255,255,0.07)" }}>
          <div className="flex items-center justify-between px-4 sm:px-7 py-4 sm:py-5" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
            <div>
              <p className="text-[10px] tracking-[0.22em] uppercase font-semibold" style={{ color: "#d6b25e" }}>{t("music.label")}</p>
              <h2 className="text-base font-bold mt-0.5">{t("music.heading")}</h2>
            </div>
            <a href={links.spotify} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs px-3 sm:px-4 py-2 rounded-full font-semibold transition hover:opacity-80"
              style={{ background: "rgba(29,185,84,0.1)", color: "#1db954", border: "1px solid rgba(29,185,84,0.18)" }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
              </svg>
              <span className="hidden sm:inline">{t("music.open")} </span>Spotify
            </a>
          </div>
          <iframe src={spotifyEmbedUrl} width="100%" height="352"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy" title="ZikoFranco on Spotify" style={{ display: "block" }} />
          <div className="px-4 sm:px-7 py-4 flex flex-wrap gap-2" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
            {platformLinks.map(({ label, href }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                className="text-[11px] px-3 py-1.5 rounded-full transition hover:opacity-70"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", color: "rgba(242,239,233,0.5)" }}>
                {label} ↗
              </a>
            ))}
          </div>
        </div>
      </Reveal>

      {/* ── TESTIMONIALS ── */}
      <Reveal className="vintage-container pb-16 sm:pb-20">
        <div className="space-y-6 sm:space-y-8">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-[10px] tracking-[0.22em] uppercase font-semibold" style={{ color: "#d6b25e" }}>{t("testimonials.label")}</p>
              <h2 className="text-lg sm:text-xl font-bold mt-1 tracking-tight">{t("testimonials.heading")}</h2>
            </div>
            <Link href="/booking" className="text-xs hidden md:block hover:opacity-70 transition-opacity" style={{ color: "rgba(242,239,233,0.35)" }}>
              {t("testimonials.bookNow")}
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-3 sm:gap-4">
            {testimonials.map(({ quote, name, event }, i) => (
              <Reveal key={name} delay={i * 80}>
                <div className="flex flex-col gap-4 p-5 sm:p-6 rounded-2xl h-full"
                  style={{ background: "rgba(15,15,17,0.7)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <span className="text-3xl leading-none" style={{ color: "rgba(214,178,94,0.5)", fontFamily: "Georgia, serif" }}>"</span>
                  <p className="text-sm leading-relaxed flex-1" style={{ color: "rgba(242,239,233,0.65)" }}>{quote}</p>
                  <div className="pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                    <p className="text-sm font-semibold" style={{ color: "#f2efe9" }}>{name}</p>
                    <p className="text-xs mt-0.5" style={{ color: "rgba(242,239,233,0.28)" }}>{event}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Reveal>

      {/* ── BOOKING CTA ── */}
      <Reveal className="vintage-container pb-20 sm:pb-24">
        <div className="rounded-2xl px-5 sm:px-8 py-12 sm:py-14 text-center relative overflow-hidden"
          style={{ background: "rgba(14,14,16,0.9)", border: "1px solid rgba(214,178,94,0.1)" }}>
          <div className="absolute inset-0 pointer-events-none" aria-hidden style={{ background: "radial-gradient(ellipse 70% 60% at 50% 110%, rgba(214,178,94,0.07), transparent)" }} />
          <div className="absolute inset-0 pointer-events-none" aria-hidden style={{ background: "radial-gradient(ellipse 50% 40% at 50% -10%, rgba(122,28,28,0.06), transparent)" }} />
          <p className="text-[10px] tracking-[0.3em] uppercase font-semibold relative" style={{ color: "#d6b25e" }}>{t("cta.label")}</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mt-3 mb-4 tracking-tight relative leading-tight">{t("cta.heading")}</h2>
          <p className="text-sm max-w-sm mx-auto leading-relaxed mb-8 relative" style={{ color: "rgba(242,239,233,0.5)" }}>{t("cta.body")}</p>
          <Link href="/booking" className="btn-gold inline-flex px-10 py-3.5 text-sm font-bold rounded-xl relative">{t("cta.button")}</Link>
          <p className="text-xs mt-5 relative" style={{ color: "rgba(242,239,233,0.25)" }}>{t("cta.respond")}</p>
        </div>
      </Reveal>
    </>
  );
}
