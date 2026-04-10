import { prisma } from "@/lib/db";
import Link from "next/link";
import { MerchArchiveButton } from "./MerchArchiveButton";
import { MerchToggleButton } from "./MerchToggleButton";

interface PageProps {
  searchParams: Promise<{ archived?: string }>;
}

export default async function MerchPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const showArchived = params.archived === "true";

  const items = await prisma.merchItem.findMany({
    where: { isArchived: showArchived },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-4 w-full max-w-4xl">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-1">
          <h1 className="text-2xl font-bold tracking-tight">Merch</h1>
          <Link
            href="/admin/merch/new"
            className="shrink-0 text-sm px-4 py-2 rounded-xl font-semibold whitespace-nowrap"
            style={{
              background: "linear-gradient(180deg, rgba(214,178,94,0.95), rgba(185,151,68,0.95))",
              color: "#1b1408",
            }}
          >
            + Add Item
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <p className="text-sm" style={{ color: "rgba(242,239,233,0.45)" }}>
            {items.length} {showArchived ? "archived" : "active"} item{items.length !== 1 ? "s" : ""}
          </p>
          <Link
            href={showArchived ? "/admin/merch" : "/admin/merch?archived=true"}
            className="text-xs px-2.5 py-1.5 rounded-lg"
            style={{
              background: "rgba(255,255,255,0.05)",
              color: "rgba(242,239,233,0.45)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            {showArchived ? "Ver activos" : "Ver archivados"}
          </Link>
        </div>
      </div>

      {items.length === 0 ? (
        <div
          className="rounded-2xl text-center py-16 text-sm"
          style={{ border: "1px solid rgba(255,255,255,0.07)", color: "rgba(242,239,233,0.35)" }}
        >
          {showArchived ? "No hay items archivados." : "No hay items aún. Agrega uno para empezar."}
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl overflow-hidden"
              style={{ background: "rgba(18,18,20,0.85)", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              {/* Info row: thumbnail + name / price / status */}
              <div className="flex gap-3 px-4 pt-4 pb-3">
                {/* Thumbnail */}
                <div
                  className="w-14 h-14 rounded-xl shrink-0 overflow-hidden flex items-center justify-center"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
                >
                  {item.image ? (
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-xl" style={{ color: "rgba(242,239,233,0.2)" }}>◎</span>
                  )}
                </div>

                {/* Text info */}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm leading-tight truncate" style={{ color: "#f2efe9" }}>
                    {item.name}
                  </p>
                  <p className="text-sm font-semibold mt-0.5" style={{ color: "#d6b25e" }}>
                    ${item.price.toFixed(2)}
                  </p>
                  {/* Status indicators — compact dots inline */}
                  <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                    {item.category && (
                      <span
                        className="text-[10px] font-medium px-1.5 py-0.5 rounded-md"
                        style={{ background: "rgba(255,255,255,0.05)", color: "rgba(242,239,233,0.35)" }}
                      >
                        {item.category}
                      </span>
                    )}
                    <span
                      className="flex items-center gap-1 text-[10px] font-medium"
                      style={{ color: item.inStock ? "#4ade80" : "#f87171" }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ background: item.inStock ? "#4ade80" : "#f87171" }}
                      />
                      {item.inStock ? "En stock" : "Sin stock"}
                    </span>
                    <span
                      className="flex items-center gap-1 text-[10px] font-medium"
                      style={{ color: item.isVisible ? "#60a5fa" : "rgba(242,239,233,0.28)" }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ background: item.isVisible ? "#60a5fa" : "rgba(255,255,255,0.15)" }}
                      />
                      {item.isVisible ? "Visible" : "Oculto"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions row */}
              <div
                className="flex items-stretch gap-2 px-4 py-3"
                style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
              >
                <MerchToggleButton id={item.id} isVisible={item.isVisible} />
                <Link
                  href={`/admin/merch/${item.id}/edit`}
                  className="flex-1 flex items-center justify-center text-xs px-3 py-3 rounded-lg font-semibold"
                  style={{
                    background: "rgba(214,178,94,0.12)",
                    color: "#d6b25e",
                    border: "1px solid rgba(214,178,94,0.22)",
                  }}
                >
                  Editar
                </Link>
                <MerchArchiveButton id={item.id} isArchived={item.isArchived} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
