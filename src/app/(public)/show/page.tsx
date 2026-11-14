import Link from "next/link";
import type { Metadata } from "next";
import { getLocale, getMessages, createT } from "@/lib/i18n";
import { SHOW_SETS, RESERVE_SONGS } from "@/content/show";
import { Reveal } from "@/components/ui/Reveal";
import { BandLineup } from "@/components/band/BandLineup";
import { Faq } from "@/components/marketing/Faq";

export const metadata: Metadata = {
  title: "The 3-Hour Miami Live Show",
  description:
    "Three sets, 42 songs, one non-stop party: funk, pop & dance, Miami Latin sing-alongs and a rock party finale. Bilingual live band for weddings, corporate events and private parties in Miami.",
  alternates: { canonical: "/show" },
};

const GOLD = "#d6b25e";
const MUTED = "rgba(242,239,233,0.6)";
const CARD: React.CSSProperties = { background: "rgba(18,18,20,0.7)", border: "1px solid rgba(255,255,255,0.07)" };

type Pillar = { title: string; body: string };
type Format = { title: string; time: string; body: string };

export default async function ShowPage() {
  const locale = await getLocale();
  const messages = await getMessages(locale);
  const t = createT(messages, "show");

  const pillars = t.raw("pillars") as Pillar[];
  const formats = t.raw("formats") as Format[];
  const tb = createT(messages, "band");
  const tf = createT(messages, "faq");

  return (
    <section className="space-y-16">
      {/* Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto pt-2">
        <p className="text-[11px] tracking-[0.3em] uppercase font-semibold" style={{ color: GOLD }}>{t("label")}</p>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight">{t("heading")}</h1>
        <p className="text-sm sm:text-base leading-relaxed" style={{ color: MUTED }}>{t("subtitle")}</p>
        <div className="flex flex-col sm:flex-row justify-center gap-3 pt-3">
          <Link href="/booking" className="btn-oxblood px-8 py-3.5 font-semibold text-sm rounded-xl">{t("cta.button")}</Link>
          <a href="#setlist" className="btn-outline px-8 py-3.5 font-semibold text-sm rounded-xl">{t("showSetlist")}</a>
        </div>
      </div>

      {/* Pillars */}
      <Reveal>
        <div className="grid md:grid-cols-3 gap-4">
          {pillars.map((p) => (
            <div key={p.title} className="rounded-2xl p-6 space-y-2" style={CARD}>
              <p className="font-bold" style={{ color: "#f2efe9" }}>{p.title}</p>
              <p className="text-sm leading-relaxed" style={{ color: MUTED }}>{p.body}</p>
            </div>
          ))}
        </div>
      </Reveal>

      {/* Band */}
      <Reveal>
        <BandLineup label={tb("label")} heading={tb("heading")} body={tb("body")}
          members={tb.raw("members") as { name: string; role: string }[]} tracks={tb("tracks")} />
      </Reveal>

      {/* Schedule + setlist */}
      <Reveal>
        <div id="setlist" className="space-y-6 scroll-mt-24">
          <div>
            <p className="text-[11px] tracking-[0.22em] uppercase font-semibold" style={{ color: GOLD }}>{t("scheduleLabel")}</p>
            <h2 className="text-2xl font-bold mt-1 tracking-tight">{t("scheduleHeading")}</h2>
          </div>

          <div className="space-y-3">
            {SHOW_SETS.map((set, i) => (
              <div key={set.key} className="space-y-3">
                <details className="group rounded-2xl overflow-hidden" style={CARD} open={i === 0}>
                  <summary className="cursor-pointer list-none p-6 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
                    <span className="text-sm font-bold tabular-nums sm:w-40 shrink-0" style={{ color: GOLD }}>{set.time}</span>
                    <span className="flex-1">
                      <span className="block font-bold text-lg" style={{ color: "#f2efe9" }}>{t(`sets.${set.key}.title`)}</span>
                      <span className="block text-sm mt-1" style={{ color: MUTED }}>{t(`sets.${set.key}.body`)}</span>
                    </span>
                    <span className="text-xs uppercase tracking-widest shrink-0" style={{ color: MUTED }}>
                      {set.songs.length} {t("songs")} <span className="inline-block transition-transform group-open:rotate-180" aria-hidden>▾</span>
                    </span>
                  </summary>
                  <ol className="px-6 pb-6 grid sm:grid-cols-2 gap-x-8 gap-y-2 border-t pt-5" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                    {set.songs.map((s, n) => (
                      <li key={s.title} className="flex gap-3 text-sm">
                        <span className="tabular-nums w-5 shrink-0" style={{ color: "rgba(214,178,94,0.7)" }}>{String(n + 1).padStart(2, "0")}</span>
                        <span>
                          <span style={{ color: "#f2efe9" }}>{s.title}</span>
                          <span style={{ color: MUTED }}> — {s.artist}</span>
                        </span>
                      </li>
                    ))}
                  </ol>
                </details>
                {i < SHOW_SETS.length - 1 && (
                  <p className="text-center text-[11px] tracking-[0.25em] uppercase" style={{ color: MUTED }}>{t("break")}</p>
                )}
              </div>
            ))}
          </div>

          <div className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.055)" }}>
            <p className="text-[11px] tracking-[0.22em] uppercase font-semibold mb-3" style={{ color: GOLD }}>{t("reserveLabel")}</p>
            <p className="text-sm leading-relaxed" style={{ color: MUTED }}>
              {RESERVE_SONGS.map((s) => `${s.title} (${s.artist})`).join(" · ")}
            </p>
          </div>
        </div>
      </Reveal>

      {/* Formats */}
      <Reveal>
        <div className="space-y-6">
          <div>
            <p className="text-[11px] tracking-[0.22em] uppercase font-semibold" style={{ color: GOLD }}>{t("formatsLabel")}</p>
            <h2 className="text-2xl font-bold mt-1 tracking-tight">{t("formatsHeading")}</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {formats.map((f, i) => (
              <div key={f.title} className="rounded-2xl p-6 space-y-2"
                style={i === 2 ? { ...CARD, border: "1px solid rgba(214,178,94,0.35)" } : CARD}>
                <p className="text-xs uppercase tracking-widest font-semibold" style={{ color: GOLD }}>{f.time}</p>
                <p className="font-bold text-lg" style={{ color: "#f2efe9" }}>{f.title}</p>
                <p className="text-sm leading-relaxed" style={{ color: MUTED }}>{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* FAQ */}
      <Reveal>
        <Faq label={tf("label")} heading={tf("heading")} items={tf.raw("items") as { q: string; a: string }[]} />
      </Reveal>

      {/* CTA */}
      <Reveal>
        <div className="rounded-2xl px-6 py-12 text-center space-y-4" style={{ ...CARD, border: "1px solid rgba(214,178,94,0.15)" }}>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">{t("cta.heading")}</h2>
          <p className="text-sm max-w-md mx-auto leading-relaxed" style={{ color: MUTED }}>{t("cta.body")}</p>
          <Link href="/booking" className="btn-gold inline-flex px-10 py-3.5 text-sm font-bold rounded-xl">{t("cta.button")}</Link>
        </div>
      </Reveal>
    </section>
  );
}
