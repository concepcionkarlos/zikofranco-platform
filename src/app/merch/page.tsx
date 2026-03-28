import Link from "next/link";
import Image from "next/image";
import { links } from "@/content/links";

/* ── SVG product mockups ─────────────────────────────────────── */

function TeePreview() {
  return (
    <svg viewBox="0 0 220 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* shirt body */}
      <path
        d="M60 30 L30 60 L55 70 L55 170 L165 170 L165 70 L190 60 L160 30 Q140 45 110 45 Q80 45 60 30Z"
        fill="#1c1c1f" stroke="rgba(255,255,255,0.08)" strokeWidth="1"
      />
      {/* sleeves */}
      <path d="M60 30 L30 60 L55 70 L70 55Z" fill="#161618" stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>
      <path d="M160 30 L190 60 L165 70 L150 55Z" fill="#161618" stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>
      {/* logo on chest */}
      <image href="/assets/logo/logo.png" x="92" y="72" width="36" height="36" opacity="0.9"/>
      {/* brand name */}
      <text x="110" y="128" textAnchor="middle" fill="#d6b25e" fontSize="9" fontWeight="700" letterSpacing="4" fontFamily="system-ui">ZIKOFRANCO</text>
      <text x="110" y="141" textAnchor="middle" fill="rgba(255,255,255,0.25)" fontSize="6" letterSpacing="3" fontFamily="system-ui">MIAMI · EST. 2024</text>
    </svg>
  );
}

function HoodiePreview() {
  return (
    <svg viewBox="0 0 220 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* body */}
      <path
        d="M55 55 L28 80 L54 92 L54 172 L166 172 L166 92 L192 80 L165 55 Q148 38 130 34 L130 50 Q120 56 110 56 Q100 56 90 50 L90 34 Q72 38 55 55Z"
        fill="#1c1c1f" stroke="rgba(255,255,255,0.08)" strokeWidth="1"
      />
      {/* hood */}
      <path d="M90 34 Q110 20 130 34 L130 50 Q120 56 110 56 Q100 56 90 50Z" fill="#222226" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
      {/* pocket */}
      <rect x="80" y="130" width="60" height="32" rx="4" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>
      {/* logo */}
      <image href="/assets/logo/logo.png" x="94" y="74" width="32" height="32" opacity="0.9"/>
      <text x="110" y="120" textAnchor="middle" fill="#d6b25e" fontSize="8" fontWeight="700" letterSpacing="4" fontFamily="system-ui">ZIKOFRANCO</text>
    </svg>
  );
}

function CapPreview() {
  return (
    <svg viewBox="0 0 220 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* brim */}
      <ellipse cx="110" cy="130" rx="75" ry="12" fill="#141416" stroke="rgba(255,255,255,0.07)" strokeWidth="1"/>
      {/* cap body */}
      <path d="M42 118 Q42 55 110 50 Q178 55 178 118 Z" fill="#1c1c1f" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>
      {/* panel seams */}
      <line x1="110" y1="50" x2="110" y2="120" stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>
      <line x1="76" y1="55" x2="70" y2="120" stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
      <line x1="144" y1="55" x2="150" y2="120" stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
      {/* sweatband */}
      <path d="M42 118 Q110 124 178 118" stroke="rgba(255,255,255,0.1)" strokeWidth="2" fill="none"/>
      {/* logo front panel */}
      <image href="/assets/logo/logo.png" x="88" y="68" width="44" height="44" opacity="0.9"/>
    </svg>
  );
}

function TotePreview() {
  return (
    <svg viewBox="0 0 220 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* handles */}
      <path d="M80 55 Q80 30 100 28 Q120 26 120 55" stroke="#2a2a2e" strokeWidth="10" fill="none" strokeLinecap="round"/>
      <path d="M110 55 Q110 32 128 30 Q148 28 148 55" stroke="#2a2a2e" strokeWidth="10" fill="none" strokeLinecap="round"/>
      {/* bag body */}
      <rect x="40" y="55" width="140" height="120" rx="6" fill="#1c1c1f" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>
      {/* bottom gusset */}
      <rect x="40" y="155" width="140" height="20" rx="3" fill="#161618" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
      {/* logo */}
      <image href="/assets/logo/logo.png" x="88" y="72" width="44" height="44" opacity="0.9"/>
      <text x="110" y="130" textAnchor="middle" fill="#d6b25e" fontSize="9" fontWeight="700" letterSpacing="4" fontFamily="system-ui">ZIKOFRANCO</text>
      <text x="110" y="143" textAnchor="middle" fill="rgba(255,255,255,0.2)" fontSize="6" letterSpacing="3" fontFamily="system-ui">MIAMI · ROCK</text>
    </svg>
  );
}

function StickerPreview() {
  return (
    <svg viewBox="0 0 220 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* sticker 3 — back */}
      <rect x="75" y="70" width="85" height="85" rx="12" fill="#111113" stroke="rgba(214,178,94,0.15)" strokeWidth="1.5" transform="rotate(-10 117 112)"/>
      {/* sticker 2 — middle */}
      <rect x="65" y="60" width="90" height="90" rx="12" fill="#16161a" stroke="rgba(214,178,94,0.2)" strokeWidth="1.5" transform="rotate(5 110 105)"/>
      {/* sticker 1 — front (circular) */}
      <circle cx="110" cy="100" r="52" fill="#1c1c1f" stroke="#d6b25e" strokeWidth="1.5"/>
      <circle cx="110" cy="100" r="44" fill="#1c1c1f" stroke="rgba(214,178,94,0.3)" strokeWidth="0.5"/>
      <image href="/assets/logo/logo.png" x="86" y="74" width="48" height="48" opacity="0.95"/>
      <text x="110" y="136" textAnchor="middle" fill="#d6b25e" fontSize="7" fontWeight="700" letterSpacing="4" fontFamily="system-ui">ZIKOFRANCO</text>
    </svg>
  );
}

function PosterPreview() {
  return (
    <svg viewBox="0 0 220 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* frame shadow */}
      <rect x="46" y="26" width="130" height="152" rx="3" fill="rgba(0,0,0,0.5)"/>
      {/* frame */}
      <rect x="42" y="22" width="130" height="152" rx="3" fill="#0f0f11" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5"/>
      {/* poster bg */}
      <rect x="50" y="30" width="114" height="136" fill="#111113"/>
      {/* gradient overlay */}
      <rect x="50" y="30" width="114" height="136" fill="url(#pg)"/>
      <defs>
        <radialGradient id="pg" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="rgba(214,178,94,0.12)"/>
          <stop offset="100%" stopColor="rgba(122,28,28,0.08)"/>
        </radialGradient>
      </defs>
      {/* logo */}
      <image href="/assets/logo/logo.png" x="83" y="44" width="48" height="48" opacity="0.95"/>
      {/* text lines */}
      <text x="107" y="108" textAnchor="middle" fill="#d6b25e" fontSize="10" fontWeight="700" letterSpacing="3" fontFamily="system-ui">ZIKOFRANCO</text>
      <line x1="62" y1="115" x2="152" y2="115" stroke="rgba(214,178,94,0.3)" strokeWidth="0.5"/>
      <text x="107" y="126" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="6.5" letterSpacing="3" fontFamily="system-ui">MIAMI · ROCK · FUNK</text>
      <text x="107" y="152" textAnchor="middle" fill="rgba(255,255,255,0.2)" fontSize="6" letterSpacing="2" fontFamily="system-ui">LIMITED EDITION PRINT</text>
    </svg>
  );
}

/* ── Product data ─────────────────────────────────────────────── */

const products = [
  {
    id: "tee",
    name: "Classic Tee",
    description: "Heavyweight cotton. ZikoFranco logo front-center, tour back print.",
    price: "$35",
    tag: "Bestseller",
    Preview: TeePreview,
  },
  {
    id: "hoodie",
    name: "Vintage Hoodie",
    description: "Washed fleece. Oversized fit. Gold embroidered logo on chest.",
    price: "$75",
    tag: "Limited",
    Preview: HoodiePreview,
  },
  {
    id: "cap",
    name: "Snapback Cap",
    description: "Structured 6-panel. Embroidered ZikoFranco logo. One size fits all.",
    price: "$40",
    tag: "New",
    Preview: CapPreview,
  },
  {
    id: "tote",
    name: "Tote Bag",
    description: "Heavy canvas. Screen-printed logo in gold ink. 15L capacity.",
    price: "$28",
    tag: "Eco",
    Preview: TotePreview,
  },
  {
    id: "sticker",
    name: "Sticker Pack",
    description: "5 die-cut vinyl stickers. Waterproof. Logo + tour art.",
    price: "$10",
    tag: "Fan Fav",
    Preview: StickerPreview,
  },
  {
    id: "poster",
    name: "Poster Print",
    description: '18×24" giclée print. Concert artwork. Signed by Ziko.',
    price: "$55",
    tag: "Signed",
    Preview: PosterPreview,
  },
] as const;

/* ── Card ─────────────────────────────────────────────────────── */

function ProductCard({
  product,
}: {
  product: (typeof products)[number];
}) {
  const { Preview } = product;
  return (
    <div className="vintage-card p-5 flex flex-col gap-4 group">
      {/* Mockup */}
      <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-[#0f0f11] to-[#1a1a1d] aspect-square flex items-center justify-center border border-white/5 p-4">
        <div className="absolute inset-0 bg-gradient-to-br from-[rgba(214,178,94,0.04)] to-transparent" />
        <div className="w-full h-full transition-transform duration-500 group-hover:scale-105">
          <Preview />
        </div>
        <span className="absolute top-3 right-3 text-[9px] tracking-widest uppercase px-2 py-1 rounded-full bg-gold/15 text-gold font-semibold border border-gold/20">
          {product.tag}
        </span>
      </div>

      {/* Info */}
      <div className="flex flex-col gap-1 flex-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-white font-semibold text-base leading-tight">{product.name}</h3>
          <span className="text-gold font-bold text-base shrink-0">{product.price}</span>
        </div>
        <p className="text-white/50 text-xs leading-relaxed">{product.description}</p>
      </div>

      {/* CTA */}
      <a
        href={links.instagram}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-gold w-full py-2.5 text-xs font-semibold tracking-wide rounded-xl"
      >
        Order via Instagram
      </a>
    </div>
  );
}

/* ── Page ─────────────────────────────────────────────────────── */

export default function MerchPage() {
  return (
    <section className="space-y-10">
      <div className="space-y-1">
        <p className="text-[10px] tracking-[0.2em] uppercase text-gold font-semibold">
          Official Store
        </p>
        <h1 className="text-3xl font-extrabold tracking-tight text-white">Merchandise</h1>
        <p className="vintage-muted text-sm max-w-lg">
          Represent ZikoFranco. Limited drops, quality pieces — straight from Miami.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="vintage-card p-7 flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
        <div className="flex-1 space-y-1">
          <p className="text-white font-semibold text-base">Custom or bulk orders?</p>
          <p className="vintage-muted text-sm">
            Bands, venues, and corporate clients — contact us for wholesale pricing and custom merch.
          </p>
        </div>
        <Link
          href="/booking"
          className="btn-outline px-6 py-2.5 text-sm font-semibold rounded-xl shrink-0"
        >
          Get in Touch
        </Link>
      </div>
    </section>
  );
}
