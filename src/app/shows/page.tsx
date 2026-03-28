import Link from "next/link";

type Show = {
  date: string;
  month: string;
  year: string;
  venue: string;
  city: string;
  type: string;
  status: "upcoming" | "soldout" | "announce";
};

const shows: Show[] = [
  {
    date: "TBA",
    month: "Apr",
    year: "2026",
    venue: "Ball & Chain",
    city: "Miami, FL",
    type: "Live Show",
    status: "announce",
  },
  {
    date: "TBA",
    month: "May",
    year: "2026",
    venue: "Private Event",
    city: "Miami, FL",
    type: "Private Event",
    status: "upcoming",
  },
];

const statusLabel: Record<Show["status"], { text: string; classes: string }> = {
  upcoming: { text: "Upcoming", classes: "text-gold border-gold/30 bg-gold/10" },
  soldout: { text: "Sold Out", classes: "text-white/40 border-white/10 bg-white/5" },
  announce: { text: "Coming Soon", classes: "text-oxblood border-oxblood/30 bg-oxblood/10" },
};

export default function ShowsPage() {
  return (
    <section className="space-y-10">
      {/* Header */}
      <div className="space-y-1">
        <p className="text-[10px] tracking-[0.2em] uppercase text-gold font-semibold">
          Live Schedule
        </p>
        <h1 className="text-3xl font-extrabold tracking-tight text-white">Shows</h1>
        <p className="vintage-muted text-sm">
          Catch ZikoFranco live. Big stages, unforgettable nights.
        </p>
      </div>

      {/* Show list */}
      <div className="space-y-3">
        {shows.map((show, i) => {
          const badge = statusLabel[show.status];
          return (
            <div
              key={i}
              className="vintage-card px-6 py-5 flex flex-col sm:flex-row sm:items-center gap-4"
            >
              {/* Date block */}
              <div className="text-center sm:w-20 shrink-0">
                <p className="text-gold font-bold text-2xl leading-none">{show.date}</p>
                <p className="text-white/50 text-xs tracking-widest uppercase mt-1">
                  {show.month} {show.year}
                </p>
              </div>

              <div className="hidden sm:block w-px h-10 bg-white/10" />

              {/* Venue info */}
              <div className="flex-1">
                <p className="text-white font-semibold text-base">{show.venue}</p>
                <p className="text-white/40 text-sm">{show.city}</p>
              </div>

              {/* Type + status */}
              <div className="flex items-center gap-3">
                <span className="text-[10px] tracking-[0.15em] uppercase text-white/30">
                  {show.type}
                </span>
                <span
                  className={`text-[10px] tracking-widest uppercase px-3 py-1 rounded-full border font-semibold ${badge.classes}`}
                >
                  {badge.text}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* No more shows fallback hint */}
      <p className="text-center vintage-muted text-sm">
        More dates being booked.{" "}
        <Link href="/booking" className="text-gold hover:opacity-75 transition-opacity">
          Interested in booking ZikoFranco?
        </Link>
      </p>

      {/* Booking CTA */}
      <div className="vintage-card p-7 text-center space-y-3">
        <p className="text-[10px] tracking-[0.2em] uppercase text-gold font-semibold">
          Book ZikoFranco
        </p>
        <h2 className="text-xl font-bold text-white">Want us at your event?</h2>
        <p className="vintage-muted text-sm max-w-md mx-auto">
          Private events, corporate shows, festivals, weddings. Send a request and we'll get back
          within 24 hours.
        </p>
        <Link
          href="/booking"
          className="btn-oxblood inline-flex px-8 py-3 text-sm font-semibold rounded-xl mt-2"
        >
          Send Booking Request
        </Link>
      </div>
    </section>
  );
}
