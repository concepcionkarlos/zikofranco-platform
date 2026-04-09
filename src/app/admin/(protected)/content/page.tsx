import { prisma } from "@/lib/db";
import { ContentForm } from "./ContentForm";
import { EPKForm } from "./EPKForm";
import Link from "next/link";

export const dynamic = "force-dynamic";

const DEFAULTS: Record<string, string> = {
  // General settings
  spotify_embed_url:
    "https://open.spotify.com/embed/artist/0xyaYBhWaHUExO14cfrdqL?utm_source=generator&theme=0",
  reply_from_name: "ZikoFranco",
  site_tagline:
    "Modern rock power fused with funk-forward groove and a Santana-inspired edge — built for big stages and unforgettable nights.",
  // EPK
  epk_bio:
    "ZikoFranco is the live rock band project fronted by Zikopoly — a high-energy Miami-based artist with a voice built for arenas and a stage presence that commands attention from the first note.\n\nThe band's signature sound fuses modern rock power with funk-forward groove and a Santana-inspired Latin edge. Their sets blend electrifying cover reimaginings with original material — a formula that keeps dance floors moving and audiences coming back.\n\nBased in Miami, FL. Available for private events, corporate shows, festivals, venue residencies, and weddings throughout the US and internationally.",
  epk_genre: "Rock / Funk",
  epk_origin: "Miami, FL",
  epk_languages: "EN / ES",
  epk_press_photo: "/assets/photos/7058E651-F966-492A-B4CB-7CC9ABF47D72.jpeg",
  epk_press_photo_caption: "Press Photo — Hi-res available on request",
  epk_band_format:
    "Trio, quartet, or full band\nFormat based on venue & needs\nAlways features rock guitars\nConfirm lineup at booking",
  epk_stage_req:
    "Min. 20×16 ft stage\nFull PA system required\nBand uses in-ears — no wedges needed\nBackline available",
  epk_set_details:
    "30 / 60 / 90 min sets\nFull setlist on request\nSoundcheck: 60 min\nLoad-in: 90 min",
  epk_contact_email: "Zikofranco@gmail.com",
};

export default async function ContentPage() {
  const rows = await prisma.siteContent.findMany();
  const stored = Object.fromEntries(rows.map((r) => [r.key, r.value]));
  const values = { ...DEFAULTS, ...stored };

  return (
    <div className="space-y-10 max-w-3xl">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Site Content</h1>
          <p className="text-sm mt-1" style={{ color: "rgba(242,239,233,0.45)" }}>
            Edit content and settings that appear on the public site.
          </p>
        </div>
        <a
          href="/epk"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs px-3 py-1.5 rounded-lg transition"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            color: "rgba(242,239,233,0.4)",
          }}
        >
          Preview EPK ↗
        </a>
      </div>

      {/* ── General Settings ── */}
      <div className="space-y-4">
        <div>
          <p
            className="text-[10px] font-semibold tracking-[0.2em] uppercase"
            style={{ color: "#d6b25e" }}
          >
            General Settings
          </p>
          <p className="text-xs mt-0.5" style={{ color: "rgba(242,239,233,0.35)" }}>
            Spotify embed, email settings, and homepage tagline.
          </p>
        </div>
        <ContentForm values={values} />
      </div>

      {/* Divider */}
      <div className="vintage-divider" />

      {/* ── EPK ── */}
      <div className="space-y-4">
        <div>
          <p
            className="text-[10px] font-semibold tracking-[0.2em] uppercase"
            style={{ color: "#d6b25e" }}
          >
            Electronic Press Kit
          </p>
          <p className="text-xs mt-0.5" style={{ color: "rgba(242,239,233,0.35)" }}>
            Bio, press photo, technical rider, and contact info shown at{" "}
            <Link href="/epk" className="underline" style={{ color: "rgba(214,178,94,0.6)" }}>
              /epk
            </Link>
            .
          </p>
        </div>
        <EPKForm values={values} />
      </div>
    </div>
  );
}
