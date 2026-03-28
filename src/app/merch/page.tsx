import Image from "next/image";
import Link from "next/link";

/* ─── image paths ─────────────────────────────────────────── */
const COLLECTION = "/assets/photos/07BFABBD-A564-4226-9FF8-F3A3ED575DDE.PNG";
const HOODIE_1   = "/assets/photos/861918D7-FA86-4F24-96CA-49B41DC8E6BB.PNG";
const TEE        = "/assets/photos/D15BE316-3B84-41C7-855D-22A9BD44498E.PNG";
const GRID_4     = "/assets/photos/C2E47BD4-839A-470C-9C7E-0A8A52D4BBB5.PNG";
const HOODIE_2   = "/assets/photos/77BFBC0D-0A88-43E6-8F4B-B32DA3CC2CC8.PNG";
const POSTER_IMG = "/assets/photos/IMG_4962.PNG";

/* ─── shared label pill ──────────────────────────────────── */
function Tag({ text }: { text: string }) {
  return (
    <span className="absolute top-4 left-4 z-20 text-[9px] tracking-[0.22em] uppercase px-2.5 py-1 rounded-full bg-black/60 text-gold border border-gold/20 font-semibold backdrop-blur-sm">
      {text}
    </span>
  );
}

/* ─── Page ───────────────────────────────────────────────── */
export default function MerchPage() {
  return (
    <section className="space-y-5">

      {/* ── HERO HEADER ── */}
      <div className="text-center space-y-4 pt-2 pb-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold/25 bg-gold/5">
          <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
          <span className="text-gold text-[10px] font-semibold tracking-[0.3em] uppercase">Drop 01 · Coming Soon</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-none">
          The Official<br />
          <span className="text-gold">ZF Drop</span>
        </h1>
        <p className="vintage-muted text-sm max-w-sm mx-auto leading-relaxed">
          First official merch collection. Limited quantities, no restocks.
          Straight from Miami.
        </p>
      </div>

      {/* ── COLLECTION BANNER (full flat lay) ── */}
      <div className="relative rounded-2xl overflow-hidden h-[420px] md:h-[540px] group">
        <Image
          src={COLLECTION}
          alt="ZikoFranco Drop 01 — Full Collection"
          fill
          className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        <div className="absolute bottom-7 left-7 right-7 flex items-end justify-between">
          <div>
            <p className="text-[9px] tracking-[0.3em] uppercase text-gold font-semibold mb-1">Drop 01</p>
            <h2 className="text-white font-extrabold text-2xl md:text-3xl leading-tight">Full Collection Preview</h2>
            <p className="text-white/50 text-xs mt-1">Hoodie · Tee · Cap · Sticker Pack · Poster</p>
          </div>
          <span className="text-[9px] tracking-[0.25em] uppercase text-white/30 font-semibold hidden sm:block">Preview</span>
        </div>
      </div>

      {/* ── ROW 1: Hoodie hero (3/5) + Tee (2/5) ── */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-5">

        {/* Hoodie – large card */}
        <div className="md:col-span-3 relative rounded-2xl overflow-hidden group h-[500px] md:h-[600px] bg-black">
          <Tag text="ZF Shadow Hoodie" />
          <Image
            src={HOODIE_1}
            alt="ZikoFranco Shadow Hoodie"
            fill
            className="object-contain object-center transition-transform duration-700 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, 60vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-white font-bold text-xl leading-tight">Shadow Hoodie</p>
                <p className="text-white/40 text-xs tracking-wide mt-0.5">Washed fleece · Oversized · Black</p>
              </div>
              <p className="text-gold font-bold text-2xl">$75</p>
            </div>
          </div>
        </div>

        {/* Tee */}
        <div className="md:col-span-2 relative rounded-2xl overflow-hidden group h-[420px] md:h-[600px] bg-black">
          <Tag text="ZF Icon Tee" />
          <Image
            src={TEE}
            alt="ZikoFranco Icon Tee"
            fill
            className="object-contain object-center transition-transform duration-700 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, 40vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-white font-bold text-lg leading-tight">Icon Tee</p>
                <p className="text-white/40 text-xs tracking-wide mt-0.5">Heavyweight cotton · Black</p>
              </div>
              <p className="text-gold font-bold text-xl">$35</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── 4-PRODUCT GRID OVERVIEW ── */}
      <div className="relative rounded-2xl overflow-hidden group h-[360px] md:h-[480px] bg-black">
        <Image
          src={GRID_4}
          alt="ZikoFranco — All Products Overview"
          fill
          className="object-contain object-center transition-transform duration-700 group-hover:scale-[1.02]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-6 left-6">
          <p className="text-[9px] tracking-[0.3em] uppercase text-gold font-semibold mb-1">Full Lineup</p>
          <p className="text-white font-bold text-lg">Everything in Drop 01</p>
          <p className="text-white/40 text-xs mt-0.5">Tee · Hoodie · Cap · Band Tee</p>
        </div>
      </div>

      {/* ── ROW 2: Hoodie variant + Poster/Wallpaper ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        {/* Hoodie v2 */}
        <div className="relative rounded-2xl overflow-hidden group h-[460px] bg-black">
          <Tag text="ZF Shadow Hoodie — Alt" />
          <Image
            src={HOODIE_2}
            alt="ZikoFranco Shadow Hoodie alternate"
            fill
            className="object-contain object-center transition-transform duration-700 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-white font-bold text-lg leading-tight">Shadow Hoodie</p>
                <p className="text-white/40 text-xs tracking-wide mt-0.5">Night edition · Glow print</p>
              </div>
              <p className="text-gold font-bold text-xl">$75</p>
            </div>
          </div>
        </div>

        {/* Poster / wallpaper artwork */}
        <div className="relative rounded-2xl overflow-hidden group h-[460px] bg-black">
          <Tag text="ZF Signature Poster" />
          <Image
            src={POSTER_IMG}
            alt="ZikoFranco Signature Poster"
            fill
            className="object-contain object-center transition-transform duration-700 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-white font-bold text-lg leading-tight">Signature Poster</p>
                <p className="text-white/40 text-xs tracking-wide mt-0.5">18×24" giclée · Numbered · Signed</p>
              </div>
              <p className="text-gold font-bold text-xl">$55</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── FOOTER CTA ── */}
      <div className="vintage-card p-8 md:p-10 flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
        <div className="flex-1 space-y-2">
          <p className="text-[10px] tracking-[0.28em] uppercase text-gold font-semibold">Early Access</p>
          <h2 className="text-xl font-bold text-white">Be first when the drop goes live</h2>
          <p className="vintage-muted text-sm max-w-sm">
            Follow on Instagram and DM to reserve yours before the public release. Limited quantities.
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
