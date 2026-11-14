/**
 * /epk-sheet — printable 2-page one-sheet used to generate public/ZikoFranco-EPK.pdf.
 * Regenerate the PDF after editing (see marketing/README section in the commit message).
 */
import type { Metadata } from "next";
import { SHOW_SETS } from "@/content/show";
import { links } from "@/content/links";
import { PUBLIC_EMAIL } from "@/lib/email";

export const metadata: Metadata = {
  title: "EPK One-Sheet",
  robots: { index: false, follow: false },
};

const GOLD = "#d6b25e";
const TEXT = "#f2efe9";
const MUTED = "rgba(242,239,233,0.68)";

const highlights: Record<string, string[]> = {
  set1: ["Locked Out of Heaven", "Another One Bites the Dust", "Get Lucky", "I Wanna Dance With Somebody", "Footloose"],
  set2: ["Could You Be Loved", "Oye Como Va", "Smooth", "La Vida Es Un Carnaval", "Sweet Caroline"],
  set3: ["Seven Nation Army", "Mr. Brightside", "Welcome to the Jungle", "Enter Sandman", "Livin' on a Prayer"],
};
const setTitles: Record<string, string> = {
  set1: "Set 1 — Funk, Pop & Dance",
  set2: "Set 2 — Miami Latin & Sing-Along",
  set3: "Set 3 — Rock Party Finale",
};

function Label({ children }: { children: React.ReactNode }) {
  return <p style={{ color: GOLD, fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 700, margin: 0 }}>{children}</p>;
}

export default function EpkSheet() {
  return (
    <div className="epk-sheet" style={{ color: TEXT }}>
      <style>{`
        @page { size: Letter; margin: 0; }
        html, body { background: #0b0b0f !important; }
        .epk-page { width: 8.5in; height: 11in; padding: 0.55in 0.6in; box-sizing: border-box; position: relative; overflow: hidden;
          background: radial-gradient(ellipse 80% 50% at 50% 0%, rgba(214,178,94,0.10), transparent 60%), #0b0b0f;
          page-break-after: always; break-after: page; display: flex; flex-direction: column; gap: 0.3in; }
        .epk-page:last-child { page-break-after: auto; break-after: auto; }
        .card { background: rgba(255,255,255,0.035); border: 1px solid rgba(255,255,255,0.08); border-radius: 14px; padding: 16px 18px; }
        .epk-sheet p { margin: 0; }
      `}</style>

      {/* ── Page 1 ── */}
      <section className="epk-page">
        <header style={{ display: "flex", alignItems: "center", gap: 22 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/logo/logo-mark.png" alt="" style={{ height: 78, width: "auto", filter: "invert(0)" }} />
          <div>
            <p style={{ fontSize: 40, fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1 }}>
              <span style={{ color: GOLD }}>Ziko</span>Franco
            </p>
            <p style={{ color: MUTED, fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", marginTop: 8 }}>
              Miami, FL · Rock · Funk · Latin · Live Shows
            </p>
          </div>
        </header>

        <div>
          <p style={{ fontSize: 22, fontWeight: 700, lineHeight: 1.25 }}>
            Miami&apos;s bilingual party band — a non-stop 3-hour live show for weddings, corporate events and private parties.
          </p>
          <p style={{ color: MUTED, fontSize: 12.5, lineHeight: 1.6, marginTop: 10 }}>
            ZikoFranco is a power trio — Ziko on lead vocals, JCConcepcion on lead guitar and a live drummer — backed by
            professional tracks, click and in-ear cues for a full-band sound with a compact setup. Modern rock power,
            funk-forward groove and a Santana-inspired Latin edge, arranged into seamless medleys that keep every crowd
            moving, in English and Spanish.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, height: "4.1in" }}>
          {[
            { src: "/assets/photos/7058E651-F966-492A-B4CB-7CC9ABF47D72.jpeg", role: "Lead Vocals", name: "Ziko", pos: "center 20%" },
            { src: "/assets/photos/jc-concepcion-live.jpg", role: "Lead Guitar", name: "JCConcepcion", pos: "center 25%" },
          ].map((m) => (
            <div key={m.name} style={{ position: "relative", borderRadius: 14, overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={m.src} alt={m.name} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: m.pos }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.85), transparent 45%)" }} />
              <div style={{ position: "absolute", left: 16, bottom: 14 }}>
                <Label>{m.role}</Label>
                <p style={{ fontSize: 17, fontWeight: 700, marginTop: 3 }}>{m.name}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
          {[
            ["Non-stop flow", "Medleys, live transitions and dramatic cuts — no dead air, no playlist feel."],
            ["Bilingual crowd", "English and Spanish hits back to back, built for Miami's mixed audiences."],
            ["We read the room", "More dancing, more Latin or more rock: the setlist adapts live."],
          ].map(([title, body]) => (
            <div key={title} className="card">
              <p style={{ fontWeight: 700, fontSize: 13 }}>{title}</p>
              <p style={{ color: MUTED, fontSize: 11, lineHeight: 1.5, marginTop: 5 }}>{body}</p>
            </div>
          ))}
        </div>

        <footer style={{ marginTop: "auto", display: "flex", justifyContent: "space-between", alignItems: "flex-end", borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 14 }}>
          <div>
            <Label>Booking</Label>
            <p style={{ fontSize: 14, fontWeight: 700, marginTop: 4 }}>{PUBLIC_EMAIL} · zikofranco.com</p>
          </div>
          <p style={{ color: MUTED, fontSize: 10 }}>Electronic Press Kit · 1/2</p>
        </footer>
      </section>

      {/* ── Page 2 ── */}
      <section className="epk-page">
        <div>
          <Label>The Experience</Label>
          <p style={{ fontSize: 26, fontWeight: 800, marginTop: 6, letterSpacing: "-0.02em" }}>The Miami Live Show</p>
          <p style={{ color: MUTED, fontSize: 12.5, marginTop: 6 }}>3 sets · 42 songs · 150 minutes of live music · two 15-minute breaks</p>
        </div>

        <div style={{ display: "grid", gap: 10 }}>
          {SHOW_SETS.map((set) => (
            <div key={set.key} className="card" style={{ display: "grid", gridTemplateColumns: "1.25in 1fr", gap: 14 }}>
              <p style={{ color: GOLD, fontWeight: 700, fontSize: 12 }}>{set.time}</p>
              <div>
                <p style={{ fontWeight: 700, fontSize: 14 }}>{setTitles[set.key]}</p>
                <p style={{ color: MUTED, fontSize: 11, marginTop: 4, lineHeight: 1.5 }}>
                  {highlights[set.key].join(" · ")} <span style={{ color: "rgba(242,239,233,0.45)" }}>+ {set.songs.length - 5} more</span>
                </p>
              </div>
            </div>
          ))}
        </div>

        <div>
          <Label>Formats</Label>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginTop: 10 }}>
            {[
              ["Party Set", "1 set · 50 min", "Cocktail hours, receptions, birthdays, corporate mixers."],
              ["Two-Set Celebration", "2 sets · ~2 hours", "Private parties and corporate events."],
              ["Full Miami Live Show", "3 sets · 3 hours", "Weddings and big celebrations."],
            ].map(([title, time, body], i) => (
              <div key={title} className="card" style={i === 2 ? { borderColor: "rgba(214,178,94,0.4)" } : undefined}>
                <Label>{time}</Label>
                <p style={{ fontWeight: 700, fontSize: 13.5, marginTop: 5 }}>{title}</p>
                <p style={{ color: MUTED, fontSize: 11, lineHeight: 1.5, marginTop: 4 }}>{body}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div className="card">
            <Label>Technical Rider</Label>
            <ul style={{ margin: "8px 0 0", paddingLeft: 16, listStyle: "disc", color: MUTED, fontSize: 11, lineHeight: 1.7 }}>
              <li>Power trio + pro backing tracks</li>
              <li>In-ear monitors, private click & cues (never to PA)</li>
              <li>Performance area and power near the stage</li>
              <li>Load-in 90 min · Soundcheck 60 min</li>
              <li>Tell us if the venue has a PA system</li>
            </ul>
          </div>
          <div className="card">
            <Label>Perfect for</Label>
            <ul style={{ margin: "8px 0 0", paddingLeft: 16, listStyle: "disc", color: MUTED, fontSize: 11, lineHeight: 1.7 }}>
              <li>Weddings & receptions</li>
              <li>Corporate galas & holiday parties</li>
              <li>Private parties & birthdays</li>
              <li>Venues, restaurants & festivals</li>
              <li>South Florida · travel on request</li>
            </ul>
          </div>
        </div>

        <footer style={{ marginTop: "auto", borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 14, display: "grid", gridTemplateColumns: "1fr auto", gap: 10, alignItems: "end" }}>
          <div>
            <Label>Book ZikoFranco</Label>
            <p style={{ fontSize: 15, fontWeight: 700, marginTop: 4 }}>zikofranco.com/booking · {PUBLIC_EMAIL}</p>
            <p style={{ color: MUTED, fontSize: 10.5, marginTop: 6 }}>
              Instagram {links.instagram.replace("https://www.", "")} · Spotify · YouTube · Full setlist at zikofranco.com/show
            </p>
          </div>
          <p style={{ color: MUTED, fontSize: 10 }}>Electronic Press Kit · 2/2</p>
        </footer>
      </section>
    </div>
  );
}
