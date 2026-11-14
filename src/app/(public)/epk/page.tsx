import Link from "next/link";
import { links } from "@/content/links";
import { SmartImage } from "@/components/ui/SmartImage";
import { prisma } from "@/lib/db";
import { getLocale, getMessages, createT } from "@/lib/i18n";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Electronic Press Kit",
  description: "ZikoFranco EPK — bio, press photo, technical rider and booking info for promoters, venues and event planners.",
  alternates: { canonical: "/epk" },
};

export const revalidate = 60; // revalidate every minute

const DEFAULTS: Record<string, string> = {
  epk_bio:
    "ZikoFranco is the live rock band project fronted by Zikopoly — a high-energy Miami-based artist with a voice built for arenas and a stage presence that commands attention from the first note.\n\nThe band's signature sound fuses modern rock power with funk-forward groove and a Santana-inspired Latin edge. Their sets blend electrifying cover reimaginings with original material — a formula that keeps dance floors moving and audiences coming back.\n\nBased in Miami, FL. Available for private events, corporate shows, festivals, venue residencies, and weddings throughout the US and internationally.",
  epk_genre: "Rock / Funk",
  epk_origin: "Miami, FL",
  epk_languages: "EN / ES",
  epk_press_photo: "/assets/photos/7058E651-F966-492A-B4CB-7CC9ABF47D72.jpeg",
  epk_press_photo_caption: "Press Photo — Hi-res available on request",
  epk_band_format:
    "Power trio + pro backing tracks\nZiko — lead vocals\nJCConcepcion — lead guitar\nLive drums · click & cues in-ear",
  epk_stage_req:
    "Min. 16×12 ft stage\nFull PA system required (or add ours)\nBand uses in-ears — no wedges needed\nSeparate outputs for click/cues (never to PA)\nBackline available",
  epk_set_details:
    "Full show: 3 × 50-min sets (3 hours)\n1 or 2 sets also available\n42-song setlist + reserves\nSoundcheck: 60 min · Load-in: 90 min",
  epk_contact_email: "Zikofranco@gmail.com",
};

async function getEPKContent(): Promise<Record<string, string>> {
  try {
    const rows = await prisma.siteContent.findMany({
      where: { key: { startsWith: "epk_" } },
    });
    const stored = Object.fromEntries(rows.map((r) => [r.key, r.value]));
    return { ...DEFAULTS, ...stored };
  } catch {
    return DEFAULTS;
  }
}

function parseLines(text: string): string[] {
  return text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
}

function parseParagraphs(text: string): string[] {
  return text
    .split(/\n\n+/)
    .map((p) => p.replace(/\n/g, " ").trim())
    .filter(Boolean);
}

export default async function EPKPage() {
  const [c, locale] = await Promise.all([getEPKContent(), getLocale()]);
  const t = createT(await getMessages(locale), "epk");

  const bioParagraphs = parseParagraphs(c.epk_bio);
  const bandFormat = parseLines(c.epk_band_format);
  const stageReq = parseLines(c.epk_stage_req);
  const setDetails = parseLines(c.epk_set_details);

  const stats = [
    { label: t("genre"), value: c.epk_genre },
    { label: t("origin"), value: c.epk_origin },
    { label: t("languages"), value: c.epk_languages },
  ];

  const riderSections = [
    { title: t("bandFormat"), items: bandFormat },
    { title: t("stageReq"), items: stageReq },
    { title: t("setDetails"), items: setDetails },
  ];

  return (
    <section className="space-y-12">
      {/* Header */}
      <div className="space-y-1">
        <p className="text-[10px] tracking-[0.2em] uppercase text-gold font-semibold">
          {t("label")}
        </p>
        <h1 className="text-3xl font-extrabold tracking-tight text-white">
          {t("heading")}
        </h1>
        <p className="vintage-muted text-sm">
          {t("subtitle")}
        </p>
        <a
          href="/ZikoFranco-EPK.pdf"
          download
          className="btn-gold inline-flex items-center gap-2 mt-4 px-5 py-2.5 text-sm font-semibold rounded-xl"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M12 3v12m0 0l-5-5m5 5l5-5M5 21h14" />
          </svg>
          {t("downloadPdf")}
        </a>
      </div>

      {/* Bio + Photo */}
      <div className="grid md:grid-cols-5 gap-5">
        <div className="vintage-card p-7 md:col-span-3 space-y-4">
          <p className="text-[10px] tracking-[0.18em] uppercase text-gold font-semibold">
            {t("bio")}
          </p>
          <h2 className="text-lg font-bold text-white">ZikoFranco</h2>
          <div className="space-y-3 vintage-muted text-sm leading-relaxed">
            {bioParagraphs.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
          <div className="vintage-divider" />
          <div className="grid grid-cols-3 gap-4 text-center">
            {stats.map(({ label, value }) => (
              <div key={label}>
                <p className="text-[10px] tracking-widest uppercase text-white/50">{label}</p>
                <p className="text-white font-semibold text-sm mt-0.5">{value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Press photo */}
        <div className="md:col-span-2 relative rounded-2xl overflow-hidden min-h-[320px] bg-black/30">
          <SmartImage src={c.epk_press_photo} alt={t("pressPhoto")} sizes="(min-width: 768px) 40vw, 100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          {c.epk_press_photo_caption && (
            <p className="absolute bottom-4 left-4 text-[10px] tracking-widest uppercase text-white/50">
              {c.epk_press_photo_caption}
            </p>
          )}
        </div>
      </div>

      {/* Technical Rider */}
      <div className="vintage-card p-7 space-y-4">
        <p className="text-[10px] tracking-[0.18em] uppercase text-gold font-semibold">
          {t("rider")}
        </p>
        <div className="grid sm:grid-cols-3 gap-6">
          {riderSections.map(({ title, items }) => (
            <div key={title} className="space-y-2">
              <p className="text-white font-semibold text-sm">{title}</p>
              <ul className="space-y-1">
                {items.map((item, i) => (
                  <li key={i} className="vintage-muted text-sm flex items-start gap-2">
                    <span className="text-gold mt-0.5">·</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <Link href="/show" className="inline-block text-sm font-semibold hover:opacity-70 transition-opacity" style={{ color: "#d6b25e" }}>
          {t("showLink")}
        </Link>
      </div>

      {/* Streaming + Social */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { platform: "Spotify", handle: "@zikofranco", href: links.spotify },
          { platform: "Apple Music", handle: "ZikoFranco", href: links.appleMusic },
          { platform: "YouTube", handle: "@zikofranco", href: links.youtube },
          { platform: "Instagram", handle: "@zikofrancorockband", href: links.instagram },
        ].map(({ platform, handle, href }) => (
          <a
            key={platform}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="vintage-card p-5 flex flex-col gap-1 hover:border-gold/20 transition-colors"
          >
            <p className="text-[10px] tracking-widest uppercase text-white/50">{platform}</p>
            <p className="text-gold font-semibold text-sm">{handle}</p>
          </a>
        ))}
      </div>

      {/* Contact / Download CTA */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="vintage-card p-6 space-y-3">
          <p className="text-white font-semibold">{t("inquiries")}</p>
          <p className="vintage-muted text-sm">
            {t("inquiriesBody")}
          </p>
          <Link
            href="/booking"
            className="btn-gold inline-flex px-6 py-2.5 text-sm font-semibold rounded-xl"
          >
            {t("sendRequest")}
          </Link>
        </div>
        <div className="vintage-card p-6 space-y-3">
          <p className="text-white font-semibold">{t("assets")}</p>
          <p className="vintage-muted text-sm">
            {t("assetsBody")}
          </p>
          <a
            href={`mailto:${c.epk_contact_email}`}
            className="btn-outline inline-flex px-6 py-2.5 text-sm font-semibold rounded-xl"
          >
            {t("requestPack")}
          </a>
        </div>
      </div>
    </section>
  );
}
