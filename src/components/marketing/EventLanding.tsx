import Link from "next/link";
import { getLocale, getMessages, createT } from "@/lib/i18n";
import { Reveal } from "@/components/ui/Reveal";
import { BandLineup } from "@/components/band/BandLineup";
import { Faq } from "@/components/marketing/Faq";

type Point = { title: string; body: string };

const GOLD = "#d6b25e";
const MUTED = "rgba(242,239,233,0.62)";
const CARD: React.CSSProperties = { background: "rgba(18,18,20,0.7)", border: "1px solid rgba(255,255,255,0.07)" };

/** Shared layout for the SEO landing pages (/weddings, /corporate-events). */
export async function EventLanding({ namespace, eventType }: { namespace: "weddings" | "corporate"; eventType: string }) {
  const locale = await getLocale();
  const messages = await getMessages(locale);
  const t = createT(messages, namespace);
  const tb = createT(messages, "band");
  const tf = createT(messages, "faq");
  const points = t.raw("points") as Point[];

  return (
    <section className="space-y-16">
      <div className="text-center space-y-4 max-w-2xl mx-auto pt-2">
        <p className="text-[11px] tracking-[0.3em] uppercase font-semibold" style={{ color: GOLD }}>{t("label")}</p>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">{t("heading")}</h1>
        <p className="text-sm sm:text-base leading-relaxed" style={{ color: MUTED }}>{t("subtitle")}</p>
        <div className="flex flex-col sm:flex-row justify-center gap-3 pt-3">
          <Link href={`/booking?event=${encodeURIComponent(eventType)}`} className="btn-oxblood px-8 py-3.5 font-semibold text-sm rounded-xl">
            {t("cta")}
          </Link>
          <Link href="/show" className="btn-outline px-8 py-3.5 font-semibold text-sm rounded-xl">{t("setlistLink")}</Link>
        </div>
      </div>

      <Reveal>
        <div className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tight">{t("whyHeading")}</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {points.map((p) => (
              <div key={p.title} className="rounded-2xl p-6 space-y-2" style={CARD}>
                <p className="font-bold" style={{ color: "#f2efe9" }}>{p.title}</p>
                <p className="text-sm leading-relaxed" style={{ color: MUTED }}>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal>
        <BandLineup label={tb("label")} heading={tb("heading")} body={tb("body")}
          members={tb.raw("members") as { name: string; role: string }[]} tracks={tb("tracks")} />
      </Reveal>

      <Reveal>
        <div className="rounded-2xl p-7 sm:p-9 flex flex-col md:flex-row md:items-center gap-6"
          style={{ ...CARD, border: "1px solid rgba(214,178,94,0.3)" }}>
          <div className="flex-1 space-y-2">
            <p className="text-[11px] tracking-[0.22em] uppercase font-semibold" style={{ color: GOLD }}>{t("formatHeading")}</p>
            <p className="text-xl font-bold" style={{ color: "#f2efe9" }}>{t("formatTitle")}</p>
            <p className="text-sm leading-relaxed max-w-xl" style={{ color: MUTED }}>{t("formatBody")}</p>
          </div>
          <Link href="/show" className="text-sm font-semibold shrink-0 hover:opacity-70 transition-opacity" style={{ color: GOLD }}>
            {t("setlistLink")}
          </Link>
        </div>
      </Reveal>

      <Reveal>
        <Faq label={tf("label")} heading={tf("heading")} items={tf.raw("items") as { q: string; a: string }[]} />
      </Reveal>

      <Reveal>
        <div className="rounded-2xl px-6 py-12 text-center space-y-4" style={{ ...CARD, border: "1px solid rgba(214,178,94,0.15)" }}>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">{t("cta")}</h2>
          <Link href={`/booking?event=${encodeURIComponent(eventType)}`} className="btn-gold inline-flex px-10 py-3.5 text-sm font-bold rounded-xl">
            {createT(messages, "show")("cta.button")}
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
