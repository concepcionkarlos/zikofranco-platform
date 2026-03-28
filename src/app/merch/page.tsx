"use client";
import Link from "next/link";
import Image from "next/image";

const BLK = "/assets/logo/zf-logo-black.jpeg";
const BAND = "/assets/logo/zf-logo-band.jpeg";

/* ─── shared label pill ──────────────────────────────────── */
function Tag({ text }: { text: string }) {
  return (
    <span className="absolute top-4 left-4 z-20 text-[9px] tracking-[0.22em] uppercase px-2.5 py-1 rounded-full bg-black/60 text-gold border border-gold/20 font-semibold backdrop-blur-sm">
      {text}
    </span>
  );
}
function ComingSoonOverlay() {
  return (
    <div className="absolute inset-0 z-10 flex items-end justify-start p-5 pointer-events-none">
      <span className="text-[9px] tracking-[0.25em] uppercase text-white/30 font-semibold">Preview</span>
    </div>
  );
}

/* ─── HOODIE (hero) ──────────────────────────────────────── */
function HoodieCard() {
  return (
    <div className="relative overflow-hidden rounded-2xl group h-full min-h-[480px] bg-[#0a0a0d] flex flex-col">
      {/* atmospheric gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_30%,rgba(122,28,28,0.18),transparent)]"/>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_70%,rgba(214,178,94,0.06),transparent)]"/>

      <Tag text="Drop 01" />
      <ComingSoonOverlay />

      {/* large hoodie SVG silhouette */}
      <div className="absolute inset-0 flex items-center justify-center opacity-20">
        <svg viewBox="0 0 300 300" className="w-full h-full" fill="none">
          <path d="M90 80 L40 118 L72 132 L72 264 L228 264 L228 132 L260 118 L210 80 Q188 58 150 52 Q112 58 90 80Z"
            fill="#ffffff" stroke="none"/>
          <path d="M90 80 Q112 58 150 52 Q188 58 210 80 Q190 50 168 40 L168 62 Q158 72 150 72 Q142 72 132 62 L132 40 Q110 50 90 80Z"
            fill="#cccccc"/>
        </svg>
      </div>

      {/* logo — screen blend removes black, leaves design */}
      <div className="relative z-10 flex-1 flex items-center justify-center p-10 pt-16">
        <div className="w-[75%] max-w-[320px] aspect-square transition-transform duration-700 group-hover:scale-105" style={{ mixBlendMode: "screen" }}>
          <Image src={BLK} alt="ZikoFranco Hoodie" fill className="object-contain" sizes="360px"/>
        </div>
      </div>

      {/* bottom info */}
      <div className="relative z-10 p-6 border-t border-white/6 bg-black/20 backdrop-blur-sm">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-white font-bold text-lg leading-tight">Vintage Hoodie</p>
            <p className="text-white/35 text-xs tracking-wide mt-0.5">Washed fleece · Oversized · Black</p>
          </div>
          <p className="text-gold font-bold text-xl">$75</p>
        </div>
      </div>
    </div>
  );
}

/* ─── TEE ────────────────────────────────────────────────── */
function TeeCard() {
  return (
    <div className="relative overflow-hidden rounded-2xl group h-full min-h-[480px] bg-[#0d0a0a] flex flex-col">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_40%,rgba(214,178,94,0.08),transparent)]"/>

      <Tag text="Drop 01" />
      <ComingSoonOverlay />

      <div className="absolute inset-0 flex items-center justify-center opacity-15">
        <svg viewBox="0 0 280 280" className="w-full h-full" fill="none">
          <path d="M84 44 L38 80 L62 92 L62 240 L218 240 L218 92 L242 80 L196 44 Q174 60 140 60 Q106 60 84 44Z" fill="#ffffff"/>
          <path d="M84 44 Q106 32 140 30 Q174 32 196 44 Q178 56 140 58 Q102 56 84 44Z" fill="#dddddd"/>
        </svg>
      </div>

      <div className="relative z-10 flex-1 flex items-center justify-center p-8 pt-14">
        <div className="w-[80%] aspect-square transition-transform duration-700 group-hover:scale-105" style={{ mixBlendMode: "screen" }}>
          <Image src={BLK} alt="ZikoFranco Tee" fill className="object-contain" sizes="300px"/>
        </div>
      </div>

      <div className="relative z-10 p-6 border-t border-white/6 bg-black/20 backdrop-blur-sm">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-white font-bold text-lg leading-tight">Classic Tee</p>
            <p className="text-white/35 text-xs tracking-wide mt-0.5">Heavyweight cotton · Black</p>
          </div>
          <p className="text-gold font-bold text-xl">$35</p>
        </div>
      </div>
    </div>
  );
}

/* ─── CAP ────────────────────────────────────────────────── */
function CapCard() {
  return (
    <div className="relative overflow-hidden rounded-2xl group bg-[#090910] flex flex-col">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_30%,rgba(40,40,80,0.3),transparent)]"/>
      <Tag text="Drop 01" />
      <ComingSoonOverlay />

      {/* cap silhouette bg */}
      <div className="absolute inset-0 flex items-center justify-center opacity-18">
        <svg viewBox="0 0 260 200" className="w-full h-full" fill="none">
          <path d="M46 138 Q46 60 130 54 Q214 60 214 138Z" fill="#ffffff"/>
          <ellipse cx="130" cy="155" rx="88" ry="16" fill="#bbbbbb"/>
        </svg>
      </div>

      <div className="relative z-10 flex-1 flex items-center justify-center p-6 pt-10">
        <div className="w-[72%] aspect-square transition-transform duration-700 group-hover:scale-105" style={{ mixBlendMode: "screen" }}>
          <Image src={BLK} alt="ZikoFranco Cap" fill className="object-contain" sizes="240px"/>
        </div>
      </div>

      <div className="relative z-10 p-5 border-t border-white/6 bg-black/20 backdrop-blur-sm">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-white font-bold text-base">Snapback Cap</p>
            <p className="text-white/35 text-xs tracking-wide mt-0.5">Embroidered · One size</p>
          </div>
          <p className="text-gold font-bold text-base">$40</p>
        </div>
      </div>
    </div>
  );
}

/* ─── TOTE ───────────────────────────────────────────────── */
function ToteCard() {
  return (
    <div className="relative overflow-hidden rounded-2xl group bg-[#c8b888] flex flex-col">
      {/* canvas texture feel */}
      <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0.03)_0px,transparent_1px,transparent_3px)] opacity-60"/>
      <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,rgba(0,0,0,0.02)_0px,transparent_1px,transparent_4px)] opacity-60"/>
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(255,255,255,0.12)] to-[rgba(0,0,0,0.1)]"/>

      <Tag text="Drop 01" />
      <ComingSoonOverlay />

      {/* tote handles */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[28%] opacity-30">
        <svg viewBox="0 0 160 60" className="w-full h-full" fill="none">
          <path d="M40 56 Q38 12 58 6 Q78 0 80 54" stroke="#6a5a30" strokeWidth="12" fill="none" strokeLinecap="round"/>
          <path d="M80 54 Q82 4 102 6 Q122 8 120 56" stroke="#6a5a30" strokeWidth="12" fill="none" strokeLinecap="round"/>
        </svg>
      </div>

      <div className="relative z-10 flex-1 flex items-center justify-center p-7 pt-14">
        {/* multiply blend: white bg disappears, black design stays on canvas */}
        <div className="w-[75%] aspect-square transition-transform duration-700 group-hover:scale-105" style={{ mixBlendMode: "multiply" }}>
          <Image src={BLK} alt="ZikoFranco Tote" fill className="object-contain" sizes="240px"/>
        </div>
      </div>

      <div className="relative z-10 p-5 border-t border-black/10 bg-black/8 backdrop-blur-sm">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[#2a1f08] font-bold text-base">Canvas Tote</p>
            <p className="text-[#2a1f08]/50 text-xs tracking-wide mt-0.5">Heavy canvas · Natural</p>
          </div>
          <p className="text-[#7a3c00] font-bold text-base">$28</p>
        </div>
      </div>
    </div>
  );
}

/* ─── STICKER PACK ───────────────────────────────────────── */
function StickerCard() {
  return (
    <div className="relative overflow-hidden rounded-2xl group bg-[#07070c] flex flex-col">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_40%,rgba(214,178,94,0.1),transparent)]"/>
      <Tag text="Drop 01" />
      <ComingSoonOverlay />

      <div className="relative z-10 flex-1 flex items-center justify-center p-5 pt-10">
        {/* 5 stickers arranged as a pack */}
        <div className="relative w-[90%] aspect-square">
          {/* back stickers */}
          <div className="absolute inset-0 flex items-center justify-center" style={{ transform: "rotate(-12deg) translate(-20%, 10%)", opacity: 0.5 }}>
            <div className="w-[55%] aspect-square rounded-full border border-gold/20 overflow-hidden" style={{ mixBlendMode: "screen" }}>
              <Image src={BLK} alt="" fill className="object-contain" sizes="120px"/>
            </div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center" style={{ transform: "rotate(10deg) translate(22%, -8%)", opacity: 0.45 }}>
            <div className="w-[48%] aspect-square rounded-xl border border-white/10 overflow-hidden" style={{ mixBlendMode: "screen" }}>
              <Image src={BLK} alt="" fill className="object-contain" sizes="110px"/>
            </div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center" style={{ transform: "rotate(-5deg) translate(-18%, -16%)", opacity: 0.4 }}>
            <div className="w-[40%] aspect-square rounded-lg border border-gold/10 overflow-hidden" style={{ mixBlendMode: "screen" }}>
              <Image src={BLK} alt="" fill className="object-contain" sizes="100px"/>
            </div>
          </div>
          {/* front main sticker */}
          <div className="absolute inset-0 flex items-center justify-center transition-transform duration-700 group-hover:scale-105">
            <div className="w-[64%] aspect-square rounded-full border-2 border-gold/40 overflow-hidden shadow-[0_0_40px_rgba(214,178,94,0.2)]" style={{ mixBlendMode: "screen" }}>
              <Image src={BLK} alt="ZikoFranco Sticker" fill className="object-contain" sizes="160px"/>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 p-5 border-t border-white/6 bg-black/20 backdrop-blur-sm">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-white font-bold text-base">Sticker Pack</p>
            <p className="text-white/35 text-xs tracking-wide mt-0.5">5 die-cut vinyl · Waterproof</p>
          </div>
          <p className="text-gold font-bold text-base">$10</p>
        </div>
      </div>
    </div>
  );
}

/* ─── POSTER (full-width banner) ─────────────────────────── */
function PosterCard() {
  return (
    <div className="relative overflow-hidden rounded-2xl group bg-[#06060a] flex flex-col sm:flex-row">
      {/* left: poster artwork */}
      <div className="relative flex-1 min-h-[300px] flex items-center justify-center p-10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_80%_at_40%_50%,rgba(122,28,28,0.2),transparent)]"/>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_60%_40%,rgba(214,178,94,0.08),transparent)]"/>
        {/* frame decoration lines */}
        <div className="absolute inset-8 border border-gold/8 rounded-sm pointer-events-none"/>
        <div className="absolute inset-10 border border-gold/4 rounded-sm pointer-events-none"/>
        {/* band logo full on dark poster bg */}
        <div className="relative z-10 w-full max-w-xs aspect-video transition-transform duration-700 group-hover:scale-105">
          <Image src={BAND} alt="ZikoFranco Poster" fill className="object-contain rounded-xl" sizes="400px"/>
        </div>
        <Tag text="Drop 01 · Signed" />
      </div>

      {/* right: info panel */}
      <div className="sm:w-64 p-7 flex flex-col justify-between border-t sm:border-t-0 sm:border-l border-white/6">
        <div className="space-y-3">
          <p className="text-[9px] tracking-[0.28em] uppercase text-gold font-semibold">Collector's Edition</p>
          <h3 className="text-white font-bold text-xl leading-tight">Concert Poster</h3>
          <p className="text-white/40 text-sm leading-relaxed">
            18×24" giclée art print. Numbered limited edition. Hand-signed by Ziko.
          </p>
        </div>
        <div className="space-y-3 mt-6">
          <div className="vintage-divider"/>
          <div className="flex items-center justify-between">
            <p className="text-white/30 text-xs tracking-wide">Edition of 100</p>
            <p className="text-gold font-bold text-xl">$55</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────── */
export default function MerchPage() {
  return (
    <section className="space-y-16">

      {/* ── HERO ── */}
      <div className="text-center space-y-5 pt-2">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold/25 bg-gold/5">
          <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse"/>
          <span className="text-gold text-[10px] font-semibold tracking-[0.3em] uppercase">Drop 01 · Coming Soon</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-none">
          The Official<br/>
          <span className="text-gold">ZF Drop</span>
        </h1>
        <p className="vintage-muted text-sm max-w-sm mx-auto leading-relaxed">
          First official merch collection. Limited quantities, no restocks.
          Straight from Miami.
        </p>
      </div>

      {/* ── ROW 1: Hoodie (hero) + Tee ── */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-stretch">
        <div className="md:col-span-3">
          <HoodieCard />
        </div>
        <div className="md:col-span-2">
          <TeeCard />
        </div>
      </div>

      {/* ── ROW 2: Cap · Tote · Stickers ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="h-[360px]"><CapCard /></div>
        <div className="h-[360px]"><ToteCard /></div>
        <div className="h-[360px]"><StickerCard /></div>
      </div>

      {/* ── ROW 3: Poster full-width ── */}
      <PosterCard />

      {/* ── FOOTER CTA ── */}
      <div className="vintage-card p-8 md:p-10 flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
        <div className="flex-1 space-y-2">
          <p className="text-[10px] tracking-[0.28em] uppercase text-gold font-semibold">Early Access</p>
          <h2 className="text-xl font-bold text-white">Be first when the drop goes live</h2>
          <p className="vintage-muted text-sm max-w-sm">
            Follow on Instagram. DM us to reserve yours before the public release.
          </p>
        </div>
        <div className="flex gap-3 flex-wrap justify-center">
          <a
            href="https://www.instagram.com/zikopoly"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold px-7 py-3 text-sm font-semibold rounded-xl"
          >
            Follow @zikopoly
          </a>
          <Link href="/booking" className="btn-outline px-7 py-3 text-sm font-semibold rounded-xl">
            Custom Orders
          </Link>
        </div>
      </div>

    </section>
  );
}
