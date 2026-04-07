import Link from "next/link";
import { prisma } from "@/lib/db";

const STATUS_BADGE: Record<string, { text: string; style: React.CSSProperties }> = {
  UPCOMING: {
    text: "Upcoming",
    style: { color: "#d6b25e", background: "rgba(214,178,94,0.1)", border: "1px solid rgba(214,178,94,0.25)" },
  },
  ANNOUNCED: {
    text: "Coming Soon",
    style: { color: "#fb923c", background: "rgba(249,115,22,0.1)", border: "1px solid rgba(249,115,22,0.2)" },
  },
  SOLD_OUT: {
    text: "Sold Out",
    style: { color: "rgba(242,239,233,0.35)", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" },
  },
  CANCELLED: {
    text: "Cancelled",
    style: { color: "#f87171", background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.15)" },
  },
  PAST: {
    text: "Past",
    style: { color: "rgba(242,239,233,0.25)", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" },
  },
};

async function getShows() {
  return prisma.show.findMany({
    where: { isArchived: false },
    orderBy: { date: "asc" },
  });
}

export default async function ShowsPage() {
  const shows = await getShows();

  return (
    <section className="space-y-10">
      {/* Header */}
      <div className="space-y-1">
        <p
          className="text-[10px] tracking-[0.2em] uppercase font-semibold"
          style={{ color: "#d6b25e" }}
        >
          Live Schedule
        </p>
        <h1 className="text-3xl font-extrabold tracking-tight">Shows</h1>
        <p className="text-sm" style={{ color: "rgba(242,239,233,0.45)" }}>
          Catch ZikoFranco live. Big stages, unforgettable nights.
        </p>
      </div>

      {/* Show list */}
      {shows.length === 0 ? (
        <div
          className="rounded-2xl px-8 py-14 text-center"
          style={{ background: "rgba(18,18,20,0.7)", border: "1px solid rgba(255,255,255,0.06)" }}
        >
          <p className="text-sm" style={{ color: "rgba(242,239,233,0.3)" }}>
            No upcoming shows announced yet.
          </p>
          <p className="text-xs mt-1" style={{ color: "rgba(242,239,233,0.18)" }}>
            Check back soon or{" "}
            <Link href="/booking" style={{ color: "#d6b25e" }}>
              book us for your event
            </Link>
            .
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {shows.map((show) => {
            const d = new Date(show.date);
            const day = d.getDate();
            const month = d.toLocaleDateString("en-US", { month: "short" });
            const year = d.getFullYear();
            const badge = STATUS_BADGE[show.status] ?? STATUS_BADGE.UPCOMING;

            return (
              <div
                key={show.id}
                className="rounded-2xl px-6 py-5 flex flex-col sm:flex-row sm:items-center gap-4"
                style={{
                  background: "rgba(18,18,20,0.7)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                {/* Date block */}
                <div className="text-center sm:w-20 shrink-0">
                  <p
                    className="font-bold text-2xl leading-none tabular-nums"
                    style={{ color: "#d6b25e" }}
                  >
                    {day}
                  </p>
                  <p
                    className="text-xs tracking-widest uppercase mt-1"
                    style={{ color: "rgba(242,239,233,0.4)" }}
                  >
                    {month} {year}
                  </p>
                </div>

                <div
                  className="hidden sm:block w-px h-10"
                  style={{ background: "rgba(255,255,255,0.08)" }}
                />

                {/* Venue info */}
                <div className="flex-1">
                  <p className="font-semibold text-base" style={{ color: "#f2efe9" }}>
                    {show.venue}
                  </p>
                  <p className="text-sm mt-0.5" style={{ color: "rgba(242,239,233,0.4)" }}>
                    {show.city}
                    {show.country && show.country !== "US" ? `, ${show.country}` : ""}
                  </p>
                </div>

                {/* Type + status + ticket */}
                <div className="flex items-center gap-3 flex-wrap">
                  <span
                    className="text-[10px] tracking-[0.15em] uppercase"
                    style={{ color: "rgba(242,239,233,0.28)" }}
                  >
                    {show.type}
                  </span>
                  <span
                    className="text-[10px] tracking-widest uppercase px-3 py-1 rounded-full font-semibold"
                    style={badge.style}
                  >
                    {badge.text}
                  </span>
                  {show.ticketUrl && (
                    <a
                      href={show.ticketUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs px-3 py-1.5 rounded-lg font-semibold transition hover:opacity-80"
                      style={{
                        background: "rgba(214,178,94,0.1)",
                        color: "#d6b25e",
                        border: "1px solid rgba(214,178,94,0.2)",
                      }}
                    >
                      Tickets ↗
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Footer hint */}
      <p className="text-center text-sm" style={{ color: "rgba(242,239,233,0.3)" }}>
        More dates being booked.{" "}
        <Link
          href="/booking"
          className="transition-opacity hover:opacity-70"
          style={{ color: "#d6b25e" }}
        >
          Interested in booking ZikoFranco?
        </Link>
      </p>

      {/* Booking CTA */}
      <div
        className="rounded-2xl p-7 text-center space-y-3"
        style={{
          background: "rgba(18,18,20,0.7)",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <p
          className="text-[10px] tracking-[0.2em] uppercase font-semibold"
          style={{ color: "#d6b25e" }}
        >
          Book ZikoFranco
        </p>
        <h2 className="text-xl font-bold">Want us at your event?</h2>
        <p className="text-sm max-w-md mx-auto" style={{ color: "rgba(242,239,233,0.45)" }}>
          Private events, corporate shows, festivals, weddings. Send a request and we'll get back
          within 24 hours.
        </p>
        <Link
          href="/booking"
          className="inline-flex px-8 py-3 text-sm font-semibold rounded-xl mt-2 transition hover:opacity-80"
          style={{
            background: "#7a1c1c",
            color: "#f2efe9",
          }}
        >
          Send Booking Request
        </Link>
      </div>
    </section>
  );
}
