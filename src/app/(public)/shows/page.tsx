import Link from "next/link";
import { prisma } from "@/lib/db";
import { getLocale, getMessages, createT } from "@/lib/i18n";

export const dynamic = "force-dynamic";

const PAST_STAGES = [
  { venue: "Ball & Chain", city: "Little Havana, Miami" },
  { venue: "Gramps", city: "Wynwood, Miami" },
  { venue: "The Ground Club", city: "Downtown Miami" },
  { venue: "Bayfront Park", city: "Miami, FL" },
  { venue: "Hard Rock Live", city: "Hollywood, FL" },
  { venue: "Gibson Park", city: "Miami, FL" },
];

async function getShows() {
  return prisma.show.findMany({ where: { isArchived: false }, orderBy: { date: "asc" } });
}

export default async function ShowsPage() {
  const [shows, locale] = await Promise.all([getShows(), getLocale()]);
  const messages = await getMessages(locale);
  const t = createT(messages, "shows");

  type Status = "UPCOMING" | "ANNOUNCED" | "SOLD_OUT" | "CANCELLED" | "PAST";

  const STATUS_BADGE: Record<Status, { text: string; style: React.CSSProperties }> = {
    UPCOMING:  { text: t("status.UPCOMING"),  style: { color: "#d6b25e",                background: "rgba(214,178,94,0.1)",   border: "1px solid rgba(214,178,94,0.25)" } },
    ANNOUNCED: { text: t("status.ANNOUNCED"), style: { color: "#fb923c",                background: "rgba(249,115,22,0.1)",   border: "1px solid rgba(249,115,22,0.2)" } },
    SOLD_OUT:  { text: t("status.SOLD_OUT"),  style: { color: "rgba(242,239,233,0.35)", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" } },
    CANCELLED: { text: t("status.CANCELLED"), style: { color: "#f87171",                background: "rgba(239,68,68,0.08)",   border: "1px solid rgba(239,68,68,0.15)" } },
    PAST:      { text: t("status.PAST"),      style: { color: "rgba(242,239,233,0.25)", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" } },
  };

  return (
    <section className="space-y-10">
      <div className="space-y-1">
        <p className="text-[10px] tracking-[0.2em] uppercase font-semibold" style={{ color: "#d6b25e" }}>{t("label")}</p>
        <h1 className="text-3xl font-extrabold tracking-tight">{t("heading")}</h1>
        <p className="text-sm" style={{ color: "rgba(242,239,233,0.45)" }}>{t("subtitle")}</p>
      </div>

      {shows.length === 0 ? (
        <div className="rounded-2xl px-8 py-14 text-center"
          style={{ background: "rgba(18,18,20,0.7)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <p className="text-sm" style={{ color: "rgba(242,239,233,0.3)" }}>{t("noShows")}</p>
          <p className="text-xs mt-1" style={{ color: "rgba(242,239,233,0.18)" }}>
            {t("noShowsOr")}{" "}
            <Link href="/booking" style={{ color: "#d6b25e" }}>{t("noShowsLink")}</Link>.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {shows.map((show) => {
            const d = new Date(show.date);
            const badge = STATUS_BADGE[show.status as Status] ?? STATUS_BADGE.UPCOMING;
            return (
              <div key={show.id} className="rounded-2xl px-6 py-5 flex flex-col sm:flex-row sm:items-center gap-4"
                style={{ background: "rgba(18,18,20,0.7)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="text-center sm:w-20 shrink-0">
                  <p className="font-bold text-2xl leading-none tabular-nums" style={{ color: "#d6b25e" }}>{d.getDate()}</p>
                  <p className="text-xs tracking-widest uppercase mt-1" style={{ color: "rgba(242,239,233,0.4)" }}>
                    {d.toLocaleDateString("en-US", { month: "short" })} {d.getFullYear()}
                  </p>
                </div>
                <div className="hidden sm:block w-px h-10" style={{ background: "rgba(255,255,255,0.08)" }} />
                <div className="flex-1">
                  <p className="font-semibold text-base" style={{ color: "#f2efe9" }}>{show.venue}</p>
                  <p className="text-sm mt-0.5" style={{ color: "rgba(242,239,233,0.4)" }}>
                    {show.city}{show.country && show.country !== "US" ? `, ${show.country}` : ""}
                  </p>
                </div>
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-[10px] tracking-[0.15em] uppercase" style={{ color: "rgba(242,239,233,0.28)" }}>{show.type}</span>
                  <span className="text-[10px] tracking-widest uppercase px-3 py-1 rounded-full font-semibold" style={badge.style}>{badge.text}</span>
                  {show.ticketUrl && (
                    <a href={show.ticketUrl} target="_blank" rel="noopener noreferrer"
                      className="text-xs px-3 py-1.5 rounded-lg font-semibold transition hover:opacity-80"
                      style={{ background: "rgba(214,178,94,0.1)", color: "#d6b25e", border: "1px solid rgba(214,178,94,0.2)" }}>
                      {t("tickets")}
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <p className="text-center text-sm" style={{ color: "rgba(242,239,233,0.3)" }}>
        {t("moreDates")}{" "}
        <Link href="/booking" className="transition-opacity hover:opacity-70" style={{ color: "#d6b25e" }}>{t("bookingInterest")}</Link>
      </p>

      <div className="space-y-5">
        <div>
          <p className="text-[10px] tracking-[0.2em] uppercase font-semibold" style={{ color: "#d6b25e" }}>{t("pastLabel")}</p>
          <h2 className="text-lg font-bold mt-1">{t("pastHeading")}</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {PAST_STAGES.map(({ venue, city }) => (
            <div key={venue} className="rounded-xl px-5 py-4"
              style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.055)" }}>
              <p className="text-sm font-semibold" style={{ color: "#f2efe9" }}>{venue}</p>
              <p className="text-xs mt-0.5" style={{ color: "rgba(242,239,233,0.35)" }}>{city}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl p-7 text-center space-y-3"
        style={{ background: "rgba(18,18,20,0.7)", border: "1px solid rgba(255,255,255,0.06)" }}>
        <p className="text-[10px] tracking-[0.2em] uppercase font-semibold" style={{ color: "#d6b25e" }}>{t("cta.label")}</p>
        <h2 className="text-xl font-bold">{t("cta.heading")}</h2>
        <p className="text-sm max-w-md mx-auto" style={{ color: "rgba(242,239,233,0.45)" }}>{t("cta.body")}</p>
        <Link href="/booking" className="inline-flex px-8 py-3 text-sm font-semibold rounded-xl mt-2 transition hover:opacity-80"
          style={{ background: "#7a1c1c", color: "#f2efe9" }}>
          {t("cta.button")}
        </Link>
      </div>
    </section>
  );
}
