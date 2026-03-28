import Link from "next/link";
import Image from "next/image";
import { links } from "@/content/links";

export default function EPKPage() {
  return (
    <section className="space-y-12">
      {/* Header */}
      <div className="space-y-1">
        <p className="text-[10px] tracking-[0.2em] uppercase text-gold font-semibold">
          Press & Promoters
        </p>
        <h1 className="text-3xl font-extrabold tracking-tight text-white">
          Electronic Press Kit
        </h1>
        <p className="vintage-muted text-sm">
          Everything you need to book, feature, or promote ZikoFranco.
        </p>
      </div>

      {/* Bio + Photo */}
      <div className="grid md:grid-cols-5 gap-5">
        <div className="vintage-card p-7 md:col-span-3 space-y-4">
          <p className="text-[10px] tracking-[0.18em] uppercase text-gold font-semibold">
            Artist Bio
          </p>
          <h2 className="text-lg font-bold text-white">ZikoFranco</h2>
          <div className="space-y-3 vintage-muted text-sm leading-relaxed">
            <p>
              ZikoFranco is a Miami-based rock project led by Ziko — a high-energy frontman with
              a voice built for arenas and a stage presence that commands attention from the first
              note.
            </p>
            <p>
              The band's signature sound fuses modern rock power with funk-forward groove and a
              Santana-inspired Latin edge. Their sets blend electrifying cover reimaginings with
              original material — a formula that keeps dance floors moving and audiences coming back.
            </p>
            <p>
              Based in Miami, FL. Available for private events, corporate shows, festivals,
              venue residencies, and weddings throughout the US and internationally.
            </p>
          </div>
          <div className="vintage-divider" />
          <div className="grid grid-cols-3 gap-4 text-center">
            {[
              { label: "Genre", value: "Rock / Funk" },
              { label: "Origin", value: "Miami, FL" },
              { label: "Languages", value: "EN / ES" },
            ].map(({ label, value }) => (
              <div key={label}>
                <p className="text-[10px] tracking-widest uppercase text-white/30">{label}</p>
                <p className="text-white font-semibold text-sm mt-0.5">{value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="md:col-span-2 relative rounded-2xl overflow-hidden min-h-[320px]">
          <Image
            src="/assets/photos/7058E651-F966-492A-B4CB-7CC9ABF47D72.jpeg"
            alt="ZikoFranco press photo"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 40vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <p className="absolute bottom-4 left-4 text-[10px] tracking-widest uppercase text-white/50">
            Press Photo — Hi-res available on request
          </p>
        </div>
      </div>

      {/* Tech rider */}
      <div className="vintage-card p-7 space-y-4">
        <p className="text-[10px] tracking-[0.18em] uppercase text-gold font-semibold">
          Technical Rider
        </p>
        <div className="grid sm:grid-cols-3 gap-6">
          {[
            {
              title: "Band Size",
              items: ["Lead vocals + guitar", "Bass guitar", "Drums / percussion", "Keys (optional)"],
            },
            {
              title: "Stage Requirements",
              items: ["Min. 20×16 ft stage", "Full PA system", "4× monitor wedges", "Backline available"],
            },
            {
              title: "Set Details",
              items: ["30 / 60 / 90 min sets", "Full setlist on request", "Soundcheck: 60 min", "Load-in: 90 min"],
            },
          ].map(({ title, items }) => (
            <div key={title} className="space-y-2">
              <p className="text-white font-semibold text-sm">{title}</p>
              <ul className="space-y-1">
                {items.map((item) => (
                  <li key={item} className="vintage-muted text-sm flex items-start gap-2">
                    <span className="text-gold mt-0.5">·</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Streaming + Social stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { platform: "Spotify", handle: "@zikofranco", href: links.spotify },
          { platform: "Apple Music", handle: "ZikoFranco", href: links.appleMusic },
          { platform: "YouTube", handle: "@zikofranco", href: links.youtube },
          { platform: "Instagram", handle: "@zikopoly", href: links.instagram },
        ].map(({ platform, handle, href }) => (
          <a
            key={platform}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="vintage-card p-5 flex flex-col gap-1 hover:border-gold/20 transition-colors"
          >
            <p className="text-[10px] tracking-widest uppercase text-white/30">{platform}</p>
            <p className="text-gold font-semibold text-sm">{handle}</p>
          </a>
        ))}
      </div>

      {/* Contact / Download CTA */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="vintage-card p-6 space-y-3">
          <p className="text-white font-semibold">Booking & Press Inquiries</p>
          <p className="vintage-muted text-sm">
            For booking requests, interviews, and press features — use the form or email directly.
          </p>
          <Link
            href="/booking"
            className="btn-gold inline-flex px-6 py-2.5 text-sm font-semibold rounded-xl"
          >
            Send Booking Request
          </Link>
        </div>
        <div className="vintage-card p-6 space-y-3">
          <p className="text-white font-semibold">Hi-Res Photos & Logos</p>
          <p className="vintage-muted text-sm">
            Press photos, logos in SVG/PNG, and band artwork available upon request.
          </p>
          <a
            href="mailto:Zikofranco@gmail.com"
            className="btn-outline inline-flex px-6 py-2.5 text-sm font-semibold rounded-xl"
          >
            Request Press Pack
          </a>
        </div>
      </div>
    </section>
  );
}
