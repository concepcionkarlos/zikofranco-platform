import { prisma } from "@/lib/db";
import { getLocale, getMessages, createT } from "@/lib/i18n";

export const dynamic = "force-dynamic";

async function getMediaItems() {
  return prisma.mediaItem.findMany({
    where: { isVisible: true },
    orderBy: [{ isFeatured: "desc" }, { createdAt: "asc" }],
  });
}

type MediaItem = Awaited<ReturnType<typeof getMediaItems>>[number];

export default async function MediaPage() {
  const [items, locale] = await Promise.all([getMediaItems(), getLocale()]);
  const messages = await getMessages(locale);
  const t = createT(messages, "media");

  const featured = items.filter((i) => i.isFeatured);
  const rest = items.filter((i) => !i.isFeatured);

  return (
    <section className="space-y-8">
      <div className="space-y-1">
        <p className="text-[10px] tracking-[0.2em] uppercase text-gold font-semibold">{t("label")}</p>
        <h1 className="text-3xl font-extrabold tracking-tight text-white">{t("heading")}</h1>
        <p className="vintage-muted text-sm">{t("subtitle")}</p>
      </div>

      {items.length === 0 ? (
        <div className="rounded-2xl py-20 text-center"
          style={{ background: "rgba(18,18,20,0.7)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <p className="text-[10px] tracking-[0.25em] uppercase text-gold font-semibold mb-2">{t("empty.label")}</p>
          <p className="text-white font-bold text-lg">{t("empty.heading")}</p>
          <p className="vintage-muted text-sm mt-2">{t("empty.body")}</p>
        </div>
      ) : (
        <>
          {featured.length > 0 && (
            <div className={`grid gap-3 ${featured.length >= 2 ? "grid-cols-1 md:grid-cols-5" : "grid-cols-1"}`}>
              <PhotoCard photo={featured[0]} featuredLabel={t("featured")} videoLabel={t("video")}
                className={featured.length >= 2 ? "md:col-span-3 h-[480px] md:h-[580px]" : "h-[480px] md:h-[580px]"} />
              {featured[1] && (
                <PhotoCard photo={featured[1]} featuredLabel={t("featured")} videoLabel={t("video")}
                  className="md:col-span-2 h-[480px] md:h-[580px]" />
              )}
            </div>
          )}
          {(() => {
            const gridItems = featured.length >= 2
              ? [...featured.slice(2), ...rest]
              : featured.length === 1 ? [...featured.slice(1), ...rest] : rest;
            if (gridItems.length === 0) return null;
            return (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {gridItems.map((photo) => (
                  <PhotoCard key={photo.id} photo={photo} featuredLabel={t("featured")} videoLabel={t("video")} className="h-[320px]" />
                ))}
              </div>
            );
          })()}
        </>
      )}
    </section>
  );
}

function PhotoCard({ photo, className = "", featuredLabel, videoLabel }: {
  photo: MediaItem; className?: string; featuredLabel: string; videoLabel: string;
}) {
  if (photo.type === "VIDEO") {
    return (
      <div className={`relative overflow-hidden rounded-2xl bg-black ${className}`}>
        <iframe src={photo.url} className="absolute inset-0 w-full h-full"
          allow="autoplay; encrypted-media; fullscreen" loading="lazy" title={photo.title} />
        <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/70 to-transparent">
          <p className="text-[10px] tracking-[0.18em] uppercase text-gold font-semibold mb-1">{videoLabel}</p>
          <p className="text-white font-semibold text-sm leading-tight">{photo.title}</p>
        </div>
      </div>
    );
  }
  return (
    <div className={`relative overflow-hidden rounded-2xl group cursor-pointer ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={photo.url} alt={photo.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
        {photo.isFeatured && <p className="text-[10px] tracking-[0.18em] uppercase text-gold font-semibold mb-1">{featuredLabel}</p>}
        <p className="text-white font-semibold text-sm leading-tight">{photo.title}</p>
      </div>
    </div>
  );
}
