import Link from "next/link";

/* ── SVG Mockups ─────────────────────────────────────────────── */

function LogoBrand({ x = 110, y = 90, scale = 1 }: { x?: number; y?: number; scale?: number }) {
  const s = scale;
  return (
    <g transform={`translate(${x}, ${y}) scale(${s})`}>
      {/* outer ring */}
      <circle cx="0" cy="0" r="28" fill="none" stroke="#d6b25e" strokeWidth="1" opacity="0.6"/>
      <circle cx="0" cy="0" r="22" fill="none" stroke="#d6b25e" strokeWidth="0.4" opacity="0.3"/>
      {/* Z mark */}
      <text textAnchor="middle" dominantBaseline="central" fill="#d6b25e" fontSize="22" fontWeight="900" fontFamily="Georgia, serif" letterSpacing="-1">Z</text>
      {/* wordmark below */}
      <text y="40" textAnchor="middle" fill="#d6b25e" fontSize="7.5" fontWeight="700" letterSpacing="5" fontFamily="system-ui, sans-serif">ZIKOFRANCO</text>
      <text y="51" textAnchor="middle" fill="rgba(214,178,94,0.4)" fontSize="5" fontWeight="500" letterSpacing="4" fontFamily="system-ui, sans-serif">MIAMI · EST. 2024</text>
    </g>
  );
}

function TeePreview() {
  return (
    <svg viewBox="0 0 240 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-lg">
      <defs>
        <linearGradient id="tee-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#232328"/>
          <stop offset="100%" stopColor="#1a1a1e"/>
        </linearGradient>
        <linearGradient id="tee-sleeve-l" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1e1e22"/>
          <stop offset="100%" stopColor="#181820"/>
        </linearGradient>
        <filter id="tee-shadow">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="rgba(0,0,0,0.5)"/>
        </filter>
      </defs>

      {/* shirt body + sleeves combined */}
      <g filter="url(#tee-shadow)">
        {/* left sleeve */}
        <path d="M 72 38 L 30 68 L 52 80 L 68 62 Z" fill="url(#tee-sleeve-l)" stroke="rgba(255,255,255,0.07)" strokeWidth="0.8"/>
        {/* right sleeve */}
        <path d="M 168 38 L 210 68 L 188 80 L 172 62 Z" fill="url(#tee-sleeve-l)" stroke="rgba(255,255,255,0.07)" strokeWidth="0.8"/>
        {/* body */}
        <path d="M 72 38 Q 90 52 120 52 Q 150 52 168 38 L 188 80 L 188 185 L 52 185 L 52 80 Z"
          fill="url(#tee-body)" stroke="rgba(255,255,255,0.08)" strokeWidth="0.8"/>
        {/* collar */}
        <path d="M 72 38 Q 90 28 120 26 Q 150 28 168 38 Q 152 48 120 50 Q 88 48 72 38 Z"
          fill="#1e1e24" stroke="rgba(255,255,255,0.1)" strokeWidth="0.8"/>
        {/* subtle chest shadow for depth */}
        <path d="M 52 80 Q 120 96 188 80 L 188 120 Q 120 108 52 120 Z"
          fill="rgba(0,0,0,0.12)"/>
      </g>

      {/* design on chest */}
      <LogoBrand x={120} y={118} scale={1.05}/>
    </svg>
  );
}

function HoodiePreview() {
  return (
    <svg viewBox="0 0 240 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-lg">
      <defs>
        <linearGradient id="hood-body" x1="0" y1="0" x2="0.2" y2="1">
          <stop offset="0%" stopColor="#252528"/>
          <stop offset="100%" stopColor="#1b1b1f"/>
        </linearGradient>
        <linearGradient id="hood-cap" x1="0" y1="0" x2="0.5" y2="1">
          <stop offset="0%" stopColor="#2c2c32"/>
          <stop offset="100%" stopColor="#1f1f24"/>
        </linearGradient>
        <filter id="hood-shadow">
          <feDropShadow dx="0" dy="4" stdDeviation="7" floodColor="rgba(0,0,0,0.55)"/>
        </filter>
      </defs>

      <g filter="url(#hood-shadow)">
        {/* left sleeve */}
        <path d="M 68 62 L 28 90 L 52 100 L 68 84 Z" fill="#202024" stroke="rgba(255,255,255,0.06)" strokeWidth="0.8"/>
        {/* right sleeve */}
        <path d="M 172 62 L 212 90 L 188 100 L 172 84 Z" fill="#202024" stroke="rgba(255,255,255,0.06)" strokeWidth="0.8"/>
        {/* body */}
        <path d="M 68 62 L 68 84 L 52 100 L 52 188 L 188 188 L 188 100 L 172 84 L 172 62 Q 152 44 120 40 Q 88 44 68 62 Z"
          fill="url(#hood-body)" stroke="rgba(255,255,255,0.07)" strokeWidth="0.8"/>
        {/* hood */}
        <path d="M 68 62 Q 88 44 120 40 Q 152 44 172 62 Q 158 36 140 28 L 140 46 Q 130 54 120 54 Q 110 54 100 46 L 100 28 Q 82 36 68 62 Z"
          fill="url(#hood-cap)" stroke="rgba(255,255,255,0.1)" strokeWidth="0.8"/>
        {/* hood opening */}
        <path d="M 100 28 Q 110 22 120 22 Q 130 22 140 28 L 140 46 Q 130 54 120 54 Q 110 54 100 46 Z"
          fill="#16161a" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5"/>
        {/* drawstrings */}
        <line x1="112" y1="54" x2="108" y2="80" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="128" y1="54" x2="132" y2="80" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" strokeLinecap="round"/>
        {/* front pocket */}
        <rect x="82" y="140" width="76" height="38" rx="5" fill="rgba(0,0,0,0.2)" stroke="rgba(255,255,255,0.06)" strokeWidth="0.8"/>
        {/* pocket seam */}
        <line x1="120" y1="140" x2="120" y2="178" stroke="rgba(255,255,255,0.05)" strokeWidth="0.8"/>
      </g>

      <LogoBrand x={120} y={114} scale={0.95}/>
    </svg>
  );
}

function CapPreview() {
  return (
    <svg viewBox="0 0 240 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-lg">
      <defs>
        <linearGradient id="cap-body" x1="0" y1="0" x2="0.3" y2="1">
          <stop offset="0%" stopColor="#282830"/>
          <stop offset="100%" stopColor="#1a1a22"/>
        </linearGradient>
        <linearGradient id="cap-brim" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1e1e26"/>
          <stop offset="100%" stopColor="#141418"/>
        </linearGradient>
        <filter id="cap-shadow">
          <feDropShadow dx="0" dy="5" stdDeviation="8" floodColor="rgba(0,0,0,0.6)"/>
        </filter>
      </defs>

      <g filter="url(#cap-shadow)">
        {/* cap body */}
        <path d="M 46 128 Q 46 54 120 48 Q 194 54 194 128 Z"
          fill="url(#cap-body)" stroke="rgba(255,255,255,0.08)" strokeWidth="0.8"/>
        {/* panel seams */}
        <path d="M 120 48 L 120 128" stroke="rgba(255,255,255,0.06)" strokeWidth="0.8"/>
        <path d="M 83 54 Q 78 90 80 128" stroke="rgba(255,255,255,0.04)" strokeWidth="0.8"/>
        <path d="M 157 54 Q 162 90 160 128" stroke="rgba(255,255,255,0.04)" strokeWidth="0.8"/>
        {/* sweatband */}
        <path d="M 46 128 Q 120 138 194 128" stroke="rgba(255,255,255,0.12)" strokeWidth="2.5" fill="none"/>
        {/* brim top */}
        <path d="M 46 128 Q 120 138 194 128 Q 190 152 120 158 Q 50 152 46 128 Z"
          fill="url(#cap-brim)" stroke="rgba(255,255,255,0.07)" strokeWidth="0.8"/>
        {/* brim bottom shadow */}
        <path d="M 50 146 Q 120 156 190 146 Q 188 160 120 162 Q 52 160 50 146 Z"
          fill="rgba(0,0,0,0.3)"/>
        {/* button on top */}
        <circle cx="120" cy="50" r="5" fill="#222228" stroke="rgba(255,255,255,0.1)" strokeWidth="0.8"/>
      </g>

      {/* logo on front panel */}
      <g transform="translate(120, 90)">
        <circle cx="0" cy="0" r="24" fill="none" stroke="#d6b25e" strokeWidth="0.8" opacity="0.5"/>
        <text textAnchor="middle" dominantBaseline="central" fill="#d6b25e" fontSize="20" fontWeight="900" fontFamily="Georgia, serif">Z</text>
        <text y="32" textAnchor="middle" fill="rgba(214,178,94,0.6)" fontSize="6" fontWeight="700" letterSpacing="4" fontFamily="system-ui">ZIKOFRANCO</text>
      </g>
    </svg>
  );
}

function TotePreview() {
  return (
    <svg viewBox="0 0 240 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-lg">
      <defs>
        <linearGradient id="tote-body" x1="0.1" y1="0" x2="0.9" y2="1">
          <stop offset="0%" stopColor="#d4c5a0"/>
          <stop offset="100%" stopColor="#b8a880"/>
        </linearGradient>
        <linearGradient id="tote-side" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#a89670"/>
          <stop offset="100%" stopColor="#b8a880"/>
        </linearGradient>
        <filter id="tote-shadow">
          <feDropShadow dx="0" dy="5" stdDeviation="7" floodColor="rgba(0,0,0,0.55)"/>
        </filter>
      </defs>

      <g filter="url(#tote-shadow)">
        {/* handles */}
        <path d="M 85 60 Q 84 28 104 24 Q 120 20 120 58" stroke="#8a7a58" strokeWidth="9" fill="none" strokeLinecap="round"/>
        <path d="M 120 58 Q 120 24 138 24 Q 158 24 158 60" stroke="#8a7a58" strokeWidth="9" fill="none" strokeLinecap="round"/>
        {/* handle inner highlight */}
        <path d="M 86 60 Q 86 32 104 28 Q 118 26 118 58" stroke="rgba(255,255,255,0.1)" strokeWidth="4" fill="none" strokeLinecap="round"/>
        <path d="M 122 58 Q 122 28 138 28 Q 156 28 156 60" stroke="rgba(255,255,255,0.1)" strokeWidth="4" fill="none" strokeLinecap="round"/>
        {/* bag body */}
        <path d="M 44 62 L 50 185 L 190 185 L 196 62 Z"
          fill="url(#tote-body)" stroke="rgba(0,0,0,0.2)" strokeWidth="0.8"/>
        {/* side shading */}
        <path d="M 44 62 L 50 185 L 72 185 L 68 62 Z" fill="rgba(0,0,0,0.1)"/>
        <path d="M 196 62 L 190 185 L 168 185 L 172 62 Z" fill="rgba(0,0,0,0.08)"/>
        {/* bottom fold */}
        <path d="M 50 185 L 190 185 L 186 192 L 54 192 Z" fill="#a89670" stroke="rgba(0,0,0,0.15)" strokeWidth="0.8"/>
        {/* top fold */}
        <path d="M 44 62 L 68 62 L 69 70 L 44 68 Z" fill="rgba(0,0,0,0.06)"/>
        <path d="M 196 62 L 172 62 L 171 70 L 196 68 Z" fill="rgba(0,0,0,0.06)"/>
      </g>

      {/* design printed on tote — black on natural canvas */}
      <g transform="translate(120, 118)">
        <circle cx="0" cy="0" r="34" fill="none" stroke="rgba(0,0,0,0.3)" strokeWidth="1.2"/>
        <circle cx="0" cy="0" r="28" fill="none" stroke="rgba(0,0,0,0.15)" strokeWidth="0.5"/>
        <text textAnchor="middle" dominantBaseline="central" fill="rgba(0,0,0,0.75)" fontSize="28" fontWeight="900" fontFamily="Georgia, serif">Z</text>
        <text y="42" textAnchor="middle" fill="rgba(0,0,0,0.55)" fontSize="7.5" fontWeight="700" letterSpacing="5" fontFamily="system-ui">ZIKOFRANCO</text>
        <text y="53" textAnchor="middle" fill="rgba(0,0,0,0.35)" fontSize="5.5" fontWeight="500" letterSpacing="3" fontFamily="system-ui">MIAMI · ROCK</text>
      </g>
    </svg>
  );
}

function StickerPreview() {
  return (
    <svg viewBox="0 0 240 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-lg">
      <defs>
        <filter id="sticker-shadow">
          <feDropShadow dx="2" dy="3" stdDeviation="4" floodColor="rgba(0,0,0,0.5)"/>
        </filter>
        <filter id="sticker-glow">
          <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="rgba(214,178,94,0.3)"/>
        </filter>
      </defs>

      {/* sticker 4 — square, back-left */}
      <g filter="url(#sticker-shadow)" transform="rotate(-18, 80, 130)">
        <rect x="52" y="100" width="60" height="60" rx="8" fill="#1a1a1e" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>
        <text x="82" y="134" textAnchor="middle" fill="rgba(214,178,94,0.4)" fontSize="10" fontWeight="700" letterSpacing="2" fontFamily="system-ui">ZF</text>
        <text x="82" y="147" textAnchor="middle" fill="rgba(255,255,255,0.15)" fontSize="5" letterSpacing="2" fontFamily="system-ui">MIAMI</text>
      </g>

      {/* sticker 3 — rectangle, back-right */}
      <g filter="url(#sticker-shadow)" transform="rotate(12, 168, 120)">
        <rect x="138" y="88" width="68" height="50" rx="8" fill="#16161a" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>
        <text x="172" y="117" textAnchor="middle" fill="rgba(214,178,94,0.35)" fontSize="7" fontWeight="700" letterSpacing="3" fontFamily="system-ui">ZIKOFRANCO</text>
      </g>

      {/* sticker 2 — circle, mid */}
      <g filter="url(#sticker-shadow)" transform="rotate(-6, 148, 155)">
        <circle cx="148" cy="155" r="30" fill="#1c1c22" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
        <circle cx="148" cy="155" r="24" fill="none" stroke="rgba(214,178,94,0.2)" strokeWidth="0.5"/>
        <text x="148" y="159" textAnchor="middle" dominantBaseline="central" fill="rgba(214,178,94,0.6)" fontSize="16" fontWeight="900" fontFamily="Georgia, serif">Z</text>
      </g>

      {/* sticker 1 — main circle, front-center */}
      <g filter="url(#sticker-glow)">
        <circle cx="110" cy="112" r="54" fill="#0f0f13" stroke="#d6b25e" strokeWidth="1.5"/>
        <circle cx="110" cy="112" r="46" fill="none" stroke="rgba(214,178,94,0.25)" strokeWidth="0.6"/>
        <circle cx="110" cy="112" r="38" fill="none" stroke="rgba(214,178,94,0.12)" strokeWidth="0.4"/>

        {/* Z mark */}
        <text x="110" y="106" textAnchor="middle" dominantBaseline="central" fill="#d6b25e" fontSize="34" fontWeight="900" fontFamily="Georgia, serif">Z</text>

        {/* arc text top */}
        <path id="arc-top" d="M 66 112 A 44 44 0 0 1 154 112" fill="none"/>
        <text fontSize="7" fontWeight="700" letterSpacing="4" fill="rgba(214,178,94,0.7)" fontFamily="system-ui">
          <textPath href="#arc-top" startOffset="10%">· ZIKOFRANCO ·</textPath>
        </text>

        {/* arc text bottom */}
        <path id="arc-bot" d="M 66 112 A 44 44 0 0 0 154 112" fill="none"/>
        <text fontSize="6" fontWeight="500" letterSpacing="3" fill="rgba(214,178,94,0.4)" fontFamily="system-ui">
          <textPath href="#arc-bot" startOffset="12%">MIAMI · ROCK · FUNK</textPath>
        </text>
      </g>
    </svg>
  );
}

function PosterPreview() {
  return (
    <svg viewBox="0 0 240 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-lg">
      <defs>
        <radialGradient id="poster-bg" cx="50%" cy="35%" r="65%">
          <stop offset="0%" stopColor="rgba(214,178,94,0.14)"/>
          <stop offset="50%" stopColor="rgba(122,28,28,0.08)"/>
          <stop offset="100%" stopColor="rgba(0,0,0,0)"/>
        </radialGradient>
        <linearGradient id="poster-frame" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2a2a20"/>
          <stop offset="100%" stopColor="#1a1a14"/>
        </linearGradient>
        <filter id="poster-shadow">
          <feDropShadow dx="3" dy="5" stdDeviation="8" floodColor="rgba(0,0,0,0.6)"/>
        </filter>
      </defs>

      <g filter="url(#poster-shadow)">
        {/* frame */}
        <rect x="36" y="14" width="168" height="196" rx="3" fill="url(#poster-frame)"/>
        {/* mat border */}
        <rect x="42" y="20" width="156" height="184" rx="2" fill="#111110"/>
        {/* poster area */}
        <rect x="50" y="28" width="140" height="168" fill="#0d0d0b"/>
        <rect x="50" y="28" width="140" height="168" fill="url(#poster-bg)"/>

        {/* decorative lines */}
        <line x1="62" y1="42" x2="178" y2="42" stroke="rgba(214,178,94,0.15)" strokeWidth="0.5"/>
        <line x1="62" y1="188" x2="178" y2="188" stroke="rgba(214,178,94,0.15)" strokeWidth="0.5"/>
        <line x1="62" y1="42" x2="62" y2="188" stroke="rgba(214,178,94,0.08)" strokeWidth="0.5"/>
        <line x1="178" y1="42" x2="178" y2="188" stroke="rgba(214,178,94,0.08)" strokeWidth="0.5"/>
      </g>

      {/* poster content */}
      {/* large Z */}
      <text x="120" y="116" textAnchor="middle" dominantBaseline="central" fill="#d6b25e" fontSize="68" fontWeight="900" fontFamily="Georgia, serif" opacity="0.9">Z</text>

      {/* glow behind Z */}
      <circle cx="120" cy="114" r="40" fill="rgba(214,178,94,0.05)"/>

      {/* title */}
      <text x="120" y="155" textAnchor="middle" fill="#d6b25e" fontSize="10" fontWeight="700" letterSpacing="6" fontFamily="system-ui">ZIKOFRANCO</text>

      {/* rule */}
      <line x1="80" y1="163" x2="160" y2="163" stroke="rgba(214,178,94,0.3)" strokeWidth="0.6"/>

      {/* subtitle */}
      <text x="120" y="173" textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="6" letterSpacing="4" fontFamily="system-ui">MIAMI · ROCK · FUNK</text>

      {/* date placeholder */}
      <text x="120" y="52" textAnchor="middle" fill="rgba(214,178,94,0.3)" fontSize="6.5" letterSpacing="3" fontFamily="system-ui">LIVE IN CONCERT · 2025</text>

      {/* signed */}
      <text x="152" y="184" textAnchor="middle" fill="rgba(255,255,255,0.2)" fontSize="7" fontFamily="Georgia, serif" fontStyle="italic">Ziko</text>
    </svg>
  );
}

/* ── Data ─────────────────────────────────────────────────────── */

const products = [
  {
    id: "tee",
    name: "Classic Tee",
    subtitle: "Heavyweight cotton — Black",
    tag: "Drop 01",
    Preview: TeePreview,
  },
  {
    id: "hoodie",
    name: "Vintage Hoodie",
    subtitle: "Washed fleece — Oversized fit",
    tag: "Drop 01",
    Preview: HoodiePreview,
  },
  {
    id: "cap",
    name: "Snapback Cap",
    subtitle: "Structured 6-panel — Embroidered",
    tag: "Drop 01",
    Preview: CapPreview,
  },
  {
    id: "tote",
    name: "Canvas Tote Bag",
    subtitle: "Natural canvas — Screen print",
    tag: "Drop 01",
    Preview: TotePreview,
  },
  {
    id: "sticker",
    name: "Sticker Pack",
    subtitle: "5 die-cut vinyl — Waterproof",
    tag: "Drop 01",
    Preview: StickerPreview,
  },
  {
    id: "poster",
    name: "Signed Poster",
    subtitle: '18×24" giclée — Numbered edition',
    tag: "Drop 01",
    Preview: PosterPreview,
  },
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

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {products.map(({ id, name, subtitle, tag, Preview }) => (
          <div key={id} className="vintage-card overflow-hidden group flex flex-col">
            {/* mockup area */}
            <div className="relative bg-gradient-to-br from-[#0e0e12] to-[#191920] p-6 aspect-square flex items-center justify-center">
              {/* ambient glow */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(214,178,94,0.04),transparent_70%)]"/>
              <div className="w-full h-full transition-transform duration-700 ease-out group-hover:scale-[1.04]">
                <Preview />
              </div>
              {/* tag */}
              <span className="absolute top-4 left-4 text-[9px] tracking-[0.2em] uppercase px-2.5 py-1 rounded-full bg-black/50 text-gold/70 border border-gold/15 font-semibold backdrop-blur-sm">
                {tag}
              </span>
              {/* coming soon overlay on hover */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-xs tracking-[0.25em] uppercase text-white font-semibold">Coming Soon</span>
              </div>
            </div>

            {/* info */}
            <div className="p-5 flex flex-col gap-1">
              <p className="text-white font-semibold text-base">{name}</p>
              <p className="text-white/35 text-xs tracking-wide">{subtitle}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom notify banner */}
      <div className="vintage-card p-8 text-center space-y-4">
        <p className="text-[10px] tracking-[0.25em] uppercase text-gold font-semibold">
          Be the first to know
        </p>
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
          <Link
            href="/booking"
            className="btn-outline px-7 py-3 text-sm font-semibold rounded-xl"
          >
            Custom Orders
          </Link>
        </div>
      </div>

    </section>
  );
}
