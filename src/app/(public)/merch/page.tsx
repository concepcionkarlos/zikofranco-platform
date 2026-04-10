import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { getLocale, getMessages, createT } from "@/lib/i18n";

export const dynamic = "force-dynamic";

const COLLECTION_BANNER = "/assets/photos/07BFABBD-A564-4226-9FF8-F3A3ED575DDE.PNG";

async function getMerchItems() {
  return prisma.merchItem.findMany({
    where: { isArchived: false, isVisible: true },
    orderBy: { createdAt: "asc" },
  });
}

type MerchItem = Awaited<ReturnType<typeof getMerchItems>>[number];

export default async function MerchPage() {
  const [items, locale] = await Promise.all([getMerchItems(), getLocale()]);
  const messages = await getMessages(locale);
  const t = createT(messages, "merch");

  return (
    <section className="space-y-5">
      <div className="text-center space-y-4 pt-2 pb-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold/25 bg-gold/5">
          <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
          <span className="text-gold text-[10px] font-semibold tracking-[0.3em] uppercase">{t("drop")}</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-none">
          {t("heading1")}<br /><span className="text-gold">{t("heading2")}</span>
        </h1>
        <p className="vintage-muted text-sm max-w-sm mx-auto leading-relaxed">{t("subtitle")}</p>
      </div>

      <div className="relative rounded-2xl overflow-hidden h-[420px] md:h-[540px] group">
        <Image src={COLLECTION_BANNER} alt="ZikoFranco Drop 01 — Full Collection"
          fill className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
          sizes="100vw" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        <div className="absolute bottom-5 left-5 right-5 sm:bottom-7 sm:left-7 sm:right-7 flex items-end justify-between">
          <div>
            <p className="text-[9px] tracking-[0.3em] uppercase text-gold font-semibold mb-1">{t("preview.label")}</p>
            <h2 className="text-white font-extrabold text-2xl md:text-3xl leading-tight">{t("preview.heading")}</h2>
            <p className="text-white/50 text-xs mt-1">{t("preview.items")}</p>
          </div>
          <span className="text-[9px] tracking-[0.25em] uppercase text-white/30 font-semibold hidden sm:block">{t("preview.tag")}</span>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="rounded-2xl py-16 text-center"
          style={{ background: "rgba(18,18,20,0.7)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <p className="text-[10px] tracking-[0.25em] uppercase text-gold font-semibold mb-2">{t("empty.label")}</p>
          <p className="text-white font-bold text-lg">{t("empty.heading")}</p>
          <p className="vintage-muted text-sm mt-2 max-w-xs mx-auto">{t("empty.body")}</p>
        </div>
      ) : (
        <ProductGrid items={items} soldOutLabel={t("soldOut")} />
      )}

      <div className="vintage-card p-6 sm:p-8 md:p-10 flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
        <div className="flex-1 space-y-2">
          <p className="text-[10px] tracking-[0.28em] uppercase text-gold font-semibold">{t("cta.label")}</p>
          <h2 className="text-xl font-bold text-white">{t("cta.heading")}</h2>
          <p className="vintage-muted text-sm max-w-sm">{t("cta.body")}</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto justify-center">
          <a href="https://www.instagram.com/zikopoly" target="_blank" rel="noopener noreferrer"
            className="btn-gold px-7 py-3 text-sm font-semibold rounded-xl">{t("cta.instagram")}</a>
          <Link href="/booking" className="btn-outline px-7 py-3 text-sm font-semibold rounded-xl">{t("cta.custom")}</Link>
        </div>
      </div>
    </section>
  );
}

function ProductGrid({ items, soldOutLabel }: { items: MerchItem[]; soldOutLabel: string }) {
  const [hero, second, ...rest] = items;
  return (
    <div className="space-y-5">
      {hero && (
        <div className={`grid gap-5 ${second ? "grid-cols-1 md:grid-cols-5" : "grid-cols-1"}`}>
          <ProductCard item={hero} soldOutLabel={soldOutLabel}
            className={second ? "md:col-span-3 h-[500px] md:h-[600px]" : "h-[500px]"} titleSize="xl" />
          {second && <ProductCard item={second} soldOutLabel={soldOutLabel}
            className="md:col-span-2 h-[420px] md:h-[600px]" titleSize="lg" />}
        </div>
      )}
      {rest.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {rest.map((item) => <ProductCard key={item.id} item={item} soldOutLabel={soldOutLabel} className="h-[460px]" titleSize="lg" />)}
        </div>
      )}
    </div>
  );
}

function ProductCard({ item, className = "", titleSize = "lg", soldOutLabel }: {
  item: MerchItem; className?: string; titleSize?: "xl" | "lg"; soldOutLabel: string;
}) {
  return (
    <div className={`relative rounded-2xl overflow-hidden group bg-black ${className}`}>
      <span className="absolute top-4 left-4 z-20 text-[9px] tracking-[0.22em] uppercase px-2.5 py-1 rounded-full bg-black/60 text-gold border border-gold/20 font-semibold backdrop-blur-sm">
        {item.category ? `ZF ${item.category}` : "ZF Drop 01"}
      </span>
      {!item.inStock && (
        <span className="absolute top-4 right-4 z-20 text-[9px] tracking-widest uppercase px-2.5 py-1 rounded-full bg-black/70 text-white/40 border border-white/10 font-semibold backdrop-blur-sm">
          {soldOutLabel}
        </span>
      )}
      {item.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={item.image} alt={item.name}
          className="absolute inset-0 w-full h-full object-contain object-center transition-transform duration-700 group-hover:scale-[1.03]" />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-5xl text-white/10">◎</span>
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
        <div className="flex items-end justify-between">
          <div>
            <p className={`text-white font-bold leading-tight ${titleSize === "xl" ? "text-xl" : "text-lg"}`}>{item.name}</p>
            {item.description && <p className="text-white/40 text-xs tracking-wide mt-0.5">{item.description}</p>}
          </div>
          <p className={`text-gold font-bold tabular-nums ${titleSize === "xl" ? "text-2xl" : "text-xl"}`}>
            ${item.price % 1 === 0 ? item.price.toFixed(0) : item.price.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
}
