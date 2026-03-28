import Link from "next/link";
import Image from "next/image";

const LOGO_BLACK = "/assets/logo/zf-logo-black.jpeg";
const LOGO_BAND  = "/assets/logo/zf-logo-band.jpeg";

/* ── Product mockup cards ────────────────────────────────────── */

function TeeMockup() {
  return (
    <div className="w-full h-full relative flex items-center justify-center">
      {/* shirt shape */}
      <svg viewBox="0 0 260 240" className="absolute inset-0 w-full h-full" fill="none">
        <defs>
          <linearGradient id="tee-g" x1="0" y1="0" x2="0.2" y2="1">
            <stop offset="0%" stopColor="#1e1e22"/>
            <stop offset="100%" stopColor="#141418"/>
          </linearGradient>
        </defs>
        {/* left sleeve */}
        <path d="M76 40 L32 72 L58 84 L76 66 Z" fill="#191920"/>
        {/* right sleeve */}
        <path d="M184 40 L228 72 L202 84 L184 66 Z" fill="#191920"/>
        {/* body */}
        <path d="M76 40 Q96 56 130 56 Q164 56 184 40 L202 84 L202 200 L58 200 L58 84 Z" fill="url(#tee-g)" stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>
        {/* collar */}
        <path d="M76 40 Q96 28 130 26 Q164 28 184 40 Q166 52 130 54 Q94 52 76 40Z" fill="#17171c" stroke="rgba(255,255,255,0.08)" strokeWidth="0.8"/>
      </svg>
      {/* logo overlaid via screen blend */}
      <div className="relative z-10 w-[52%] aspect-square" style={{ mixBlendMode: "screen" }}>
        <Image src={LOGO_BLACK} alt="ZikoFranco" fill className="object-contain" sizes="200px"/>
      </div>
    </div>
  );
}

function HoodieMockup() {
  return (
    <div className="w-full h-full relative flex items-center justify-center">
      <svg viewBox="0 0 260 240" className="absolute inset-0 w-full h-full" fill="none">
        <defs>
          <linearGradient id="hood-g" x1="0" y1="0" x2="0.3" y2="1">
            <stop offset="0%" stopColor="#252528"/>
            <stop offset="100%" stopColor="#18181c"/>
          </linearGradient>
        </defs>
        {/* left sleeve */}
        <path d="M72 68 L30 96 L56 108 L72 92 Z" fill="#202026"/>
        {/* right sleeve */}
        <path d="M188 68 L230 96 L204 108 L188 92 Z" fill="#202026"/>
        {/* body */}
        <path d="M72 68 L72 92 L56 108 L56 200 L204 200 L204 108 L188 92 L188 68 Q168 50 130 46 Q92 50 72 68Z" fill="url(#hood-g)" stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>
        {/* hood */}
        <path d="M72 68 Q92 50 130 46 Q168 50 188 68 Q172 42 154 34 L154 52 Q142 60 130 60 Q118 60 106 52 L106 34 Q88 42 72 68Z" fill="#2a2a30" stroke="rgba(255,255,255,0.09)" strokeWidth="0.8"/>
        {/* hood opening */}
        <path d="M106 34 Q118 26 130 26 Q142 26 154 34 L154 52 Q142 60 130 60 Q118 60 106 52Z" fill="#111116" stroke="rgba(255,255,255,0.12)" strokeWidth="0.6"/>
        {/* drawstrings */}
        <line x1="122" y1="60" x2="118" y2="90" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="138" y1="60" x2="142" y2="90" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" strokeLinecap="round"/>
        {/* pocket */}
        <rect x="88" y="150" width="84" height="42" rx="6" fill="rgba(0,0,0,0.18)" stroke="rgba(255,255,255,0.05)" strokeWidth="0.8"/>
        <line x1="130" y1="150" x2="130" y2="192" stroke="rgba(255,255,255,0.04)" strokeWidth="0.8"/>
      </svg>
      <div className="relative z-10 w-[46%] aspect-square" style={{ mixBlendMode: "screen" }}>
        <Image src={LOGO_BLACK} alt="ZikoFranco" fill className="object-contain" sizes="180px"/>
      </div>
    </div>
  );
}

function CapMockup() {
  return (
    <div className="w-full h-full relative flex items-center justify-center">
      <svg viewBox="0 0 260 220" className="absolute inset-0 w-full h-full" fill="none">
        <defs>
          <linearGradient id="cap-g" x1="0" y1="0" x2="0.4" y2="1">
            <stop offset="0%" stopColor="#26262e"/>
            <stop offset="100%" stopColor="#18181e"/>
          </linearGradient>
        </defs>
        {/* cap body */}
        <path d="M 50 138 Q 50 58 130 52 Q 210 58 210 138 Z" fill="url(#cap-g)" stroke="rgba(255,255,255,0.07)" strokeWidth="0.8"/>
        {/* panel seams */}
        <line x1="130" y1="52" x2="130" y2="138" stroke="rgba(255,255,255,0.05)" strokeWidth="0.8"/>
        <path d="M 90 58 Q 86 98 88 138" stroke="rgba(255,255,255,0.03)" strokeWidth="0.8"/>
        <path d="M 170 58 Q 174 98 172 138" stroke="rgba(255,255,255,0.03)" strokeWidth="0.8"/>
        {/* sweatband */}
        <path d="M 50 138 Q 130 148 210 138" stroke="rgba(255,255,255,0.1)" strokeWidth="2.5" fill="none"/>
        {/* brim */}
        <path d="M 50 138 Q 130 148 210 138 Q 206 164 130 170 Q 54 164 50 138Z" fill="#16161c" stroke="rgba(255,255,255,0.07)" strokeWidth="0.8"/>
        {/* brim underside */}
        <path d="M 55 152 Q 130 162 205 152 Q 202 168 130 172 Q 58 168 55 152Z" fill="rgba(0,0,0,0.3)"/>
        {/* button */}
        <circle cx="130" cy="54" r="5" fill="#20202a" stroke="rgba(255,255,255,0.1)" strokeWidth="0.8"/>
      </svg>
      {/* logo on front panel — positioned on the cap face */}
      <div className="relative z-10 w-[38%] aspect-square mb-10" style={{ mixBlendMode: "screen" }}>
        <Image src={LOGO_BLACK} alt="ZikoFranco" fill className="object-contain" sizes="160px"/>
      </div>
    </div>
  );
}

function ToteMockup() {
  return (
    <div className="w-full h-full relative flex items-center justify-center">
      <svg viewBox="0 0 260 240" className="absolute inset-0 w-full h-full" fill="none">
        <defs>
          <linearGradient id="tote-g" x1="0.1" y1="0" x2="0.9" y2="1">
            <stop offset="0%" stopColor="#ddd0b0"/>
            <stop offset="100%" stopColor="#c8b890"/>
          </linearGradient>
        </defs>
        {/* handles */}
        <path d="M92 68 Q90 34 110 30 Q126 26 126 66" stroke="#9a8860" strokeWidth="10" fill="none" strokeLinecap="round"/>
        <path d="M134 66 Q134 30 152 30 Q172 30 170 68" stroke="#9a8860" strokeWidth="10" fill="none" strokeLinecap="round"/>
        {/* inner handle highlight */}
        <path d="M93 68 Q92 38 110 34 Q124 30 124 66" stroke="rgba(255,255,255,0.12)" strokeWidth="4" fill="none" strokeLinecap="round"/>
        <path d="M136 66 Q136 34 152 34 Q170 34 168 68" stroke="rgba(255,255,255,0.12)" strokeWidth="4" fill="none" strokeLinecap="round"/>
        {/* bag body */}
        <path d="M 48 70 L 54 196 L 206 196 L 212 70 Z" fill="url(#tote-g)" stroke="rgba(0,0,0,0.15)" strokeWidth="0.8"/>
        {/* side shading */}
        <path d="M 48 70 L 54 196 L 76 196 L 72 70 Z" fill="rgba(0,0,0,0.08)"/>
        <path d="M 212 70 L 206 196 L 184 196 L 188 70 Z" fill="rgba(0,0,0,0.06)"/>
        {/* bottom */}
        <path d="M 54 196 L 206 196 L 202 204 L 58 204 Z" fill="#b0a070" stroke="rgba(0,0,0,0.12)" strokeWidth="0.8"/>
      </svg>
      {/* logo multiply-blended on canvas — drops the white bg */}
      <div className="relative z-10 w-[50%] aspect-square mt-8" style={{ mixBlendMode: "multiply" }}>
        <Image src={LOGO_BLACK} alt="ZikoFranco" fill className="object-contain" sizes="200px"/>
      </div>
    </div>
  );
}

function StickerMockup() {
  return (
    <div className="w-full h-full relative flex items-center justify-center bg-[#0e0e12]">
      {/* scattered sticker backgrounds */}
      <svg viewBox="0 0 260 240" className="absolute inset-0 w-full h-full" fill="none">
        {/* back stickers */}
        <rect x="88" y="92" width="80" height="60" rx="10" fill="#18181e" stroke="rgba(214,178,94,0.12)" strokeWidth="1.2" transform="rotate(-14 128 122)"/>
        <rect x="80" y="80" width="86" height="86" rx="52" fill="#141418" stroke="rgba(214,178,94,0.15)" strokeWidth="1.2" transform="rotate(8 123 123)"/>
        {/* main circle sticker */}
        <circle cx="130" cy="120" r="62" fill="#0c0c10" stroke="#d6b25e" strokeWidth="1.4"/>
        <circle cx="130" cy="120" r="54" fill="none" stroke="rgba(214,178,94,0.2)" strokeWidth="0.5"/>
      </svg>
      {/* logo screen-blended on dark circle */}
      <div className="relative z-10 w-[52%] aspect-square" style={{ mixBlendMode: "screen" }}>
        <Image src={LOGO_BLACK} alt="ZikoFranco" fill className="object-contain" sizes="200px"/>
      </div>
    </div>
  );
}

function PosterMockup() {
  return (
    <div className="w-full h-full relative flex items-center justify-center">
      {/* frame */}
      <svg viewBox="0 0 260 240" className="absolute inset-0 w-full h-full" fill="none">
        <defs>
          <radialGradient id="poster-glow" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="rgba(214,178,94,0.12)"/>
            <stop offset="60%" stopColor="rgba(122,28,28,0.06)"/>
            <stop offset="100%" stopColor="rgba(0,0,0,0)"/>
          </radialGradient>
        </defs>
        {/* outer frame shadow */}
        <rect x="34" y="16" width="196" height="216" rx="3" fill="rgba(0,0,0,0.5)"/>
        {/* frame wood */}
        <rect x="30" y="12" width="196" height="216" rx="3" fill="#1e1c14" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>
        {/* mat */}
        <rect x="38" y="20" width="180" height="200" rx="2" fill="#0e0e0c"/>
        {/* poster */}
        <rect x="48" y="30" width="160" height="180" fill="#0b0b09"/>
        <rect x="48" y="30" width="160" height="180" fill="url(#poster-glow)"/>
        {/* decorative border lines */}
        <rect x="56" y="38" width="144" height="164" rx="1" fill="none" stroke="rgba(214,178,94,0.12)" strokeWidth="0.6"/>
        {/* bottom text area */}
        <rect x="48" y="178" width="160" height="32" fill="rgba(0,0,0,0.4)"/>
        <text x="128" y="192" textAnchor="middle" fill="rgba(214,178,94,0.7)" fontSize="8.5" fontWeight="700" letterSpacing="5" fontFamily="system-ui">ZIKO FRANCO BAND</text>
        <text x="128" y="203" textAnchor="middle" fill="rgba(255,255,255,0.25)" fontSize="6" letterSpacing="4" fontFamily="system-ui">MIAMI · LIVE IN CONCERT</text>
      </svg>
      {/* logo screen-blended on poster */}
      <div className="relative z-10 w-[54%] aspect-square mb-10" style={{ mixBlendMode: "screen" }}>
        <Image src={LOGO_BLACK} alt="ZikoFranco" fill className="object-contain" sizes="200px"/>
      </div>
    </div>
  );
}

/* ── Data ─────────────────────────────────────────────────────── */

const products = [
  { id: "tee",     name: "Classic Tee",      subtitle: "Heavyweight cotton — Black",          Mockup: TeeMockup },
  { id: "hoodie",  name: "Vintage Hoodie",   subtitle: "Washed fleece — Oversized",           Mockup: HoodieMockup },
  { id: "cap",     name: "Snapback Cap",     subtitle: "Structured — Embroidered logo",       Mockup: CapMockup },
  { id: "tote",    name: "Canvas Tote Bag",  subtitle: "Natural canvas — Screen print",       Mockup: ToteMockup },
  { id: "sticker", name: "Sticker Pack",     subtitle: "5 die-cut vinyl — Waterproof",        Mockup: StickerMockup },
  { id: "poster",  name: "Signed Poster",    subtitle: '18×24" giclée — Numbered edition',   Mockup: PosterMockup },
] as const;

/* ── Page ─────────────────────────────────────────────────────── */

export default function MerchPage() {
  return (
    <section className="space-y-14">

      {/* Hero */}
      <div className="text-center space-y-4 pt-4">
        <p className="text-[10px] tracking-[0.3em] uppercase text-gold font-semibold">
          Official Merchandise
        </p>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
          The Drop is Coming
        </h1>
        <p className="vintage-muted text-sm max-w-md mx-auto leading-relaxed">
          First official ZikoFranco merch collection. Limited quantities.
          Exclusive designs straight from Miami.
        </p>
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold/30 bg-gold/5 text-gold text-xs font-semibold tracking-widest uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse"/>
          Drop 01 — Coming Soon
        </div>
      </div>

      {/* Featured band logo */}
      <div className="vintage-card overflow-hidden">
        <div className="relative w-full h-52 sm:h-72 bg-gradient-to-br from-[#0c0f18] to-[#111420] flex items-center justify-center">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(214,178,94,0.06),transparent_70%)]"/>
          <div className="relative w-64 sm:w-80 aspect-video">
            <Image src={LOGO_BAND} alt="Ziko Franco Band" fill className="object-contain" sizes="400px"/>
          </div>
        </div>
        <div className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <p className="text-white font-bold text-base">Official Drop 01</p>
            <p className="text-white/40 text-xs tracking-wide">Full collection — 6 pieces</p>
          </div>
          <span className="text-[10px] tracking-[0.2em] uppercase px-3 py-1.5 rounded-full border border-gold/30 bg-gold/5 text-gold font-semibold">
            Preview Only
          </span>
        </div>
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {products.map(({ id, name, subtitle, Mockup }) => (
          <div key={id} className="vintage-card overflow-hidden group flex flex-col">
            {/* mockup */}
            <div className="relative aspect-square bg-[#0e0e12] overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(214,178,94,0.03),transparent_70%)]"/>
              <div className="w-full h-full transition-transform duration-700 ease-out group-hover:scale-[1.04]">
                <Mockup />
              </div>
              {/* coming soon hover */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-xs tracking-[0.25em] uppercase text-white font-semibold">Coming Soon</span>
              </div>
            </div>
            {/* info */}
            <div className="p-5">
              <p className="text-white font-semibold text-base">{name}</p>
              <p className="text-white/35 text-xs tracking-wide mt-0.5">{subtitle}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom notify */}
      <div className="vintage-card p-8 text-center space-y-4">
        <p className="text-[10px] tracking-[0.25em] uppercase text-gold font-semibold">Be the first to know</p>
        <h2 className="text-xl font-bold text-white">Want early access?</h2>
        <p className="vintage-muted text-sm max-w-sm mx-auto">
          Follow us on Instagram to get notified the moment the drop goes live.
        </p>
        <div className="flex justify-center gap-3 flex-wrap">
          <a
            href="https://www.instagram.com/zikopoly"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold px-7 py-3 text-sm font-semibold rounded-xl"
          >
            Follow on Instagram
          </a>
          <Link href="/booking" className="btn-outline px-7 py-3 text-sm font-semibold rounded-xl">
            Custom Orders
          </Link>
        </div>
      </div>

    </section>
  );
}
