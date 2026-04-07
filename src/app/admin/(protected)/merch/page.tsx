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
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Merch</h1>
          <p className="text-sm mt-1" style={{ color: "rgba(242,239,233,0.45)" }}>
            {items.length} {showArchived ? "archived" : "active"} item{items.length !== 1 ? "s" : ""}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href={showArchived ? "/admin/merch" : "/admin/merch?archived=true"}
            className="text-xs px-3 py-1.5 rounded-lg transition"
            style={{
              background: "rgba(255,255,255,0.05)",
              color: "rgba(242,239,233,0.5)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            {showArchived ? "View active" : "View archived"}
          </Link>
          <Link
            href="/admin/merch/new"
            className="text-sm px-4 py-2 rounded-xl font-semibold"
            style={{
              background: "linear-gradient(180deg, rgba(214,178,94,0.95), rgba(185,151,68,0.95))",
              color: "#1b1408",
            }}
          >
            + Add Item
          </Link>
        </div>
      </div>

      {items.length === 0 ? (
        <div
          className="rounded-2xl text-center py-16 text-sm"
          style={{ border: "1px solid rgba(255,255,255,0.07)", color: "rgba(242,239,233,0.35)" }}
        >
          {showArchived ? "No archived items." : "No merch items yet. Add one to get started."}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl p-5 flex items-center gap-5"
              style={{ background: "rgba(18,18,20,0.85)", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              {/* Image thumbnail */}
              <div
                className="w-14 h-14 rounded-xl shrink-0 flex items-center justify-center text-2xl"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
              >
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover rounded-xl"
                  />
                ) : (
                  "◎"
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-semibold" style={{ color: "#f2efe9" }}>{item.name}</span>
                  {item.category && (
                    <span
                      className="text-xs px-2 py-0.5 rounded-full"
                      style={{ background: "rgba(255,255,255,0.05)", color: "rgba(242,239,233,0.4)" }}
                    >
                      {item.category}
                    </span>
                  )}
                </div>
                <div className="text-sm mt-0.5" style={{ color: "#d6b25e" }}>${item.price.toFixed(2)}</div>
                {item.description && (
                  <div className="text-xs mt-1 truncate" style={{ color: "rgba(242,239,233,0.4)" }}>
                    {item.description}
                  </div>
                )}
              </div>

              {/* Status badges */}
              <div className="flex flex-col items-end gap-1.5">
                <span
                  className="text-xs px-2.5 py-0.5 rounded-full font-medium"
                  style={{
                    background: item.inStock ? "rgba(34,197,94,0.12)" : "rgba(239,68,68,0.12)",
                    color: item.inStock ? "#4ade80" : "#f87171",
                  }}
                >
                  {item.inStock ? "In stock" : "Out of stock"}
                </span>
                <span
                  className="text-xs px-2.5 py-0.5 rounded-full"
                  style={{
                    background: item.isVisible ? "rgba(59,130,246,0.1)" : "rgba(255,255,255,0.04)",
                    color: item.isVisible ? "#60a5fa" : "rgba(242,239,233,0.35)",
                  }}
                >
                  {item.isVisible ? "Visible" : "Hidden"}
                </span>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 shrink-0">
                <MerchToggleButton id={item.id} isVisible={item.isVisible} />
                <Link
                  href={`/admin/merch/${item.id}/edit`}
                  className="text-xs px-3 py-1.5 rounded-lg"
                  style={{
                    background: "rgba(214,178,94,0.1)",
                    color: "#d6b25e",
                    border: "1px solid rgba(214,178,94,0.2)",
                  }}
                >
                  Edit
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
