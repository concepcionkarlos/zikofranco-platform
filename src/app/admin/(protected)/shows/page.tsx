import { prisma } from "@/lib/db";
import Link from "next/link";
import { ShowArchiveButton } from "./ShowArchiveButton";

const STATUS_COLORS: Record<string, { bg: string; color: string }> = {
  UPCOMING: { bg: "rgba(34,197,94,0.15)", color: "#4ade80" },
  ANNOUNCED: { bg: "rgba(59,130,246,0.15)", color: "#60a5fa" },
  SOLD_OUT: { bg: "rgba(239,68,68,0.15)", color: "#f87171" },
  CANCELLED: { bg: "rgba(255,255,255,0.05)", color: "rgba(242,239,233,0.35)" },
  PAST: { bg: "rgba(255,255,255,0.04)", color: "rgba(242,239,233,0.3)" },
};

interface PageProps {
  searchParams: Promise<{ archived?: string }>;
}

export default async function ShowsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const showArchived = params.archived === "true";

  const shows = await prisma.show.findMany({
    where: { isArchived: showArchived },
    orderBy: { date: "asc" },
  });

  return (
    <div className="space-y-5 w-full max-w-4xl">
      {/* Header */}
      <div>
        <div className="flex items-start justify-between gap-2 mb-1">
          <h1 className="text-2xl font-bold tracking-tight">Shows</h1>
          <Link
            href="/admin/shows/new"
            className="shrink-0 text-sm px-4 py-2 rounded-xl font-semibold whitespace-nowrap"
            style={{
              background: "linear-gradient(180deg, rgba(214,178,94,0.95), rgba(185,151,68,0.95))",
              color: "#1b1408",
            }}
          >
            + Add Show
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <p className="text-sm" style={{ color: "rgba(242,239,233,0.45)" }}>
            {shows.length} {showArchived ? "archived" : "active"} show{shows.length !== 1 ? "s" : ""}
          </p>
          <Link
            href={showArchived ? "/admin/shows" : "/admin/shows?archived=true"}
            className="text-xs px-2.5 py-1.5 rounded-lg"
            style={{
              background: "rgba(255,255,255,0.05)",
              color: "rgba(242,239,233,0.45)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            {showArchived ? "View active" : "View archived"}
          </Link>
        </div>
      </div>

      {shows.length === 0 ? (
        <div
          className="rounded-2xl text-center py-16 text-sm"
          style={{ border: "1px solid rgba(255,255,255,0.07)", color: "rgba(242,239,233,0.35)" }}
        >
          {showArchived ? "No archived shows." : "No shows yet. Add one to get started."}
        </div>
      ) : (
        <>
          {/* Mobile: cards */}
          <div className="sm:hidden space-y-2">
            {shows.map((show) => {
              const sc = STATUS_COLORS[show.status] ?? STATUS_COLORS.UPCOMING;
              const statusLabel = show.status.replace("_", " ");
              const statusDisplay = statusLabel.charAt(0) + statusLabel.slice(1).toLowerCase();
              return (
                <div
                  key={show.id}
                  className="rounded-2xl p-4"
                  style={{ background: "rgba(18,18,20,0.85)", border: "1px solid rgba(255,255,255,0.07)" }}
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="min-w-0">
                      <div className="font-semibold text-sm" style={{ color: "#f2efe9" }}>
                        {show.venue}
                      </div>
                      <div className="text-xs mt-0.5" style={{ color: "rgba(242,239,233,0.45)" }}>
                        {show.city}, {show.country}
                      </div>
                    </div>
                    <span
                      className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium shrink-0"
                      style={{ background: sc.bg, color: sc.color }}
                    >
                      {statusDisplay}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-xs" style={{ color: "rgba(242,239,233,0.4)" }}>
                      {new Date(show.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      {" · "}{show.type}
                    </div>
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/admin/shows/${show.id}/edit`}
                        className="text-xs px-4 py-3 rounded-lg font-semibold"
                        style={{ background: "rgba(214,178,94,0.1)", color: "#d6b25e", border: "1px solid rgba(214,178,94,0.2)" }}
                      >
                        Edit
                      </Link>
                      <ShowArchiveButton id={show.id} isArchived={show.isArchived} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Desktop: table */}
          <div className="hidden sm:block rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", background: "rgba(0,0,0,0.25)" }}>
                  {["Date", "Venue", "City", "Type", "Status", ""].map((h, i) => (
                    <th key={i} className="text-left px-5 py-3 text-xs font-semibold" style={{ color: "rgba(242,239,233,0.4)" }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {shows.map((show, i) => {
                  const sc = STATUS_COLORS[show.status] ?? STATUS_COLORS.UPCOMING;
                  return (
                    <tr
                      key={show.id}
                      style={{
                        borderBottom: i < shows.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                        background: "rgba(13,13,15,0.6)",
                      }}
                    >
                      <td className="px-5 py-3.5 whitespace-nowrap" style={{ color: "#f2efe9" }}>
                        {new Date(show.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </td>
                      <td className="px-5 py-3.5 font-medium" style={{ color: "#f2efe9" }}>{show.venue}</td>
                      <td className="px-5 py-3.5" style={{ color: "rgba(242,239,233,0.6)" }}>
                        {show.city}, {show.country}
                      </td>
                      <td className="px-5 py-3.5" style={{ color: "rgba(242,239,233,0.55)" }}>{show.type}</td>
                      <td className="px-5 py-3.5">
                        <span
                          className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium"
                          style={{ background: sc.bg, color: sc.color }}
                        >
                          {show.status.replace("_", " ").charAt(0) + show.status.replace("_", " ").slice(1).toLowerCase()}
                        </span>
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/admin/shows/${show.id}/edit`}
                            className="text-xs px-3 py-2 rounded-lg"
                            style={{ background: "rgba(214,178,94,0.1)", color: "#d6b25e", border: "1px solid rgba(214,178,94,0.2)" }}
                          >
                            Edit
                          </Link>
                          <ShowArchiveButton id={show.id} isArchived={show.isArchived} />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
