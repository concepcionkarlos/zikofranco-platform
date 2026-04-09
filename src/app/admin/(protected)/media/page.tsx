import { prisma } from "@/lib/db";
import Link from "next/link";
import { MediaToggleButton } from "@/components/admin/MediaToggleButton";
import { MediaDeleteButton } from "@/components/admin/MediaDeleteButton";
import { MediaImagePreview } from "@/components/admin/MediaImagePreview";

export const dynamic = "force-dynamic";

interface PageProps {
  searchParams: Promise<{ filter?: string }>;
}

export default async function MediaPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const filter = params.filter ?? "all";

  const where =
    filter === "visible"
      ? { isVisible: true }
      : filter === "featured"
        ? { isFeatured: true }
        : {};

  let items: Awaited<ReturnType<typeof prisma.mediaItem.findMany>> = [];
  let dbError = "";

  try {
    items = await prisma.mediaItem.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });
  } catch (err) {
    console.error("Media page DB error:", err);
    dbError = "Could not load media items. The database table may not be initialized yet.";
  }

  const filters = [
    { key: "all", label: "All" },
    { key: "visible", label: "Visible" },
    { key: "featured", label: "Featured" },
  ];

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Media</h1>
          <p className="text-sm mt-1" style={{ color: "rgba(242,239,233,0.45)" }}>
            {items.length} item{items.length !== 1 ? "s" : ""}
            {filter !== "all" ? ` · ${filter}` : ""}
          </p>
        </div>
        <Link
          href="/admin/media/new"
          className="text-sm px-4 py-2 rounded-xl font-semibold"
          style={{
            background: "linear-gradient(180deg, rgba(214,178,94,0.95), rgba(185,151,68,0.95))",
            color: "#1b1408",
          }}
        >
          + Add Media
        </Link>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2">
        {filters.map(({ key, label }) => (
          <Link
            key={key}
            href={`/admin/media${key === "all" ? "" : `?filter=${key}`}`}
            className="text-xs px-3 py-1.5 rounded-lg transition"
            style={{
              background: filter === key ? "rgba(214,178,94,0.12)" : "rgba(255,255,255,0.04)",
              color: filter === key ? "#d6b25e" : "rgba(242,239,233,0.45)",
              border: `1px solid ${filter === key ? "rgba(214,178,94,0.25)" : "rgba(255,255,255,0.07)"}`,
            }}
          >
            {label}
          </Link>
        ))}
      </div>

      {dbError && (
        <div
          className="rounded-xl px-5 py-4 text-sm"
          style={{
            background: "rgba(239,68,68,0.08)",
            border: "1px solid rgba(239,68,68,0.18)",
            color: "#f87171",
          }}
        >
          {dbError}{" "}
          <a href="/api/admin/seed" className="underline opacity-70">Run seed →</a>
        </div>
      )}

      {!dbError && items.length === 0 ? (
        <div
          className="rounded-2xl py-20 text-center"
          style={{ border: "1px solid rgba(255,255,255,0.07)", color: "rgba(242,239,233,0.35)" }}
        >
          <p className="text-sm">No media items yet.</p>
          <p className="text-xs mt-1" style={{ color: "rgba(242,239,233,0.2)" }}>
            Add photos or video links to manage your public media library.
          </p>
        </div>
      ) : !dbError ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl overflow-hidden"
              style={{ background: "rgba(18,18,20,0.85)", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              {/* Preview */}
              <div
                className="relative h-44 flex items-center justify-center"
                style={{ background: "rgba(0,0,0,0.3)" }}
              >
                {item.type === "VIDEO" ? (
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-3xl">▶</span>
                    <span className="text-xs" style={{ color: "rgba(242,239,233,0.35)" }}>
                      Video
                    </span>
                  </div>
                ) : (
                  <MediaImagePreview src={item.url} alt={item.title} />
                )}
                {item.isFeatured && (
                  <span
                    className="absolute top-2 right-2 text-[9px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full"
                    style={{
                      background: "rgba(214,178,94,0.2)",
                      color: "#d6b25e",
                      border: "1px solid rgba(214,178,94,0.3)",
                    }}
                  >
                    Featured
                  </span>
                )}
              </div>

              {/* Info + actions */}
              <div className="p-4 space-y-3">
                <div>
                  <p className="text-sm font-medium" style={{ color: "#f2efe9" }}>
                    {item.title}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: "rgba(242,239,233,0.35)" }}>
                    {item.type} · {new Date(item.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </p>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <MediaToggleButton id={item.id} field="isVisible" value={item.isVisible} labels={["Visible", "Hidden"]} />
                  <MediaToggleButton id={item.id} field="isFeatured" value={item.isFeatured} labels={["★ Featured", "Feature"]} />
                </div>
                <div className="flex items-center gap-2">
                  <Link
                    href={`/admin/media/${item.id}/edit`}
                    className="text-xs px-3 py-1.5 rounded-lg"
                    style={{
                      background: "rgba(214,178,94,0.1)",
                      color: "#d6b25e",
                      border: "1px solid rgba(214,178,94,0.2)",
                    }}
                  >
                    Edit
                  </Link>
                  <MediaDeleteButton id={item.id} />
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs px-3 py-1.5 rounded-lg transition"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      color: "rgba(242,239,233,0.4)",
                      border: "1px solid rgba(255,255,255,0.07)",
                    }}
                  >
                    View ↗
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
