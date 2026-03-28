import Link from "next/link";
import Image from "next/image";

type Product = {
  id: string;
  name: string;
  description: string;
  price: string;
  tag: string;
  icon: string;
};

const products: Product[] = [
  {
    id: "tee",
    name: "Classic Tee",
    description: "Heavyweight cotton. ZikoFranco logo front-center, tour back print.",
    price: "$35",
    tag: "Bestseller",
    icon: "👕",
  },
  {
    id: "hoodie",
    name: "Vintage Hoodie",
    description: "Washed fleece. Oversized fit. Gold embroidered logo on chest.",
    price: "$75",
    tag: "Limited",
    icon: "🧥",
  },
  {
    id: "cap",
    name: "Snapback Cap",
    description: "Structured 6-panel. Embroidered ZikoFranco logo. One size fits all.",
    price: "$40",
    tag: "New",
    icon: "🧢",
  },
  {
    id: "tote",
    name: "Tote Bag",
    description: "Heavy canvas. Screen-printed logo in gold ink. 15L capacity.",
    price: "$28",
    tag: "Eco",
    icon: "🛍️",
  },
  {
    id: "sticker",
    name: "Sticker Pack",
    description: "5 die-cut vinyl stickers. Waterproof. Logo + tour art.",
    price: "$10",
    tag: "Fan Fav",
    icon: "🎸",
  },
  {
    id: "vinyl",
    name: "Poster Print",
    description: '18×24" giclée print. Concert artwork. Signed by Ziko.',
    price: "$55",
    tag: "Signed",
    icon: "🎨",
  },
];

function ProductCard({ product }: { product: Product }) {
  return (
    <div className="vintage-card p-6 flex flex-col gap-4 group">
      {/* Mock product visual */}
      <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-[#111113] to-[#1a1a1d] aspect-square flex flex-col items-center justify-center gap-3 border border-white/5">
        {/* Background glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-[rgba(214,178,94,0.05)] to-transparent" />
        {/* Product icon */}
        <span className="text-5xl">{product.icon}</span>
        {/* Logo watermark */}
        <div className="flex items-center gap-1.5">
          <Image
            src="/assets/logo/logo.png"
            alt="ZikoFranco"
            width={22}
            height={22}
            className="opacity-60"
          />
          <span className="text-[10px] tracking-[0.22em] uppercase text-gold/60 font-semibold">
            ZikoFranco
          </span>
        </div>
        {/* Tag */}
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
        href="https://www.instagram.com/zikofranco"
        target="_blank"
        rel="noopener noreferrer"
        className="btn-gold w-full py-2.5 text-xs font-semibold tracking-wide rounded-xl"
      >
        Order via Instagram
      </a>
    </div>
  );
}

export default function MerchPage() {
  return (
    <section className="space-y-10">
      {/* Header */}
      <div className="space-y-1">
        <p className="text-[10px] tracking-[0.2em] uppercase text-gold font-semibold">
          Official Store
        </p>
        <h1 className="text-3xl font-extrabold tracking-tight text-white">Merchandise</h1>
        <p className="vintage-muted text-sm max-w-lg">
          Represent ZikoFranco. Limited drops, quality pieces — straight from Miami.
        </p>
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Bottom CTA banner */}
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
