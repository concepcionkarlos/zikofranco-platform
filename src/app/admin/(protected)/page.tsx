import { prisma } from "@/lib/db";
import Link from "next/link";

export const dynamic = "force-dynamic";

async function getData() {
  const [
    newCount,
    contactedCount,
    qualifiedCount,
    confirmedCount,
    archivedCount,
    upcomingShows,
    activeMerch,
    recentRequests,
  ] = await Promise.all([
    prisma.lead.count({ where: { status: "NEW" } }),
    prisma.lead.count({ where: { status: "CONTACTED" } }),
    prisma.lead.count({ where: { status: "QUALIFIED" } }),
    prisma.lead.count({ where: { status: "CONFIRMED" } }),
    prisma.lead.count({ where: { status: "ARCHIVED" } }),
    prisma.show.count({
      where: {
        isArchived: false,
        status: { in: ["UPCOMING", "ANNOUNCED"] },
        date: { gte: new Date() },
      },
    }),
    prisma.merchItem.count({ where: { isArchived: false, isVisible: true } }),
    prisma.lead.findMany({
      orderBy: { createdAt: "desc" },
      take: 6,
      select: {
        id: true,
        fullName: true,
        email: true,
        eventType: true,
        budgetRange: true,
        status: true,
        createdAt: true,
      },
    }),
  ]);

  return {
    newCount,
    contactedCount,
    qualifiedCount,
    confirmedCount,
    archivedCount,
    upcomingShows,
    activeMerch,
    recentRequests,
  };
}

const STATUS_COLORS: Record<string, { bg: string; color: string }> = {
  NEW: { bg: "rgba(59,130,246,0.12)", color: "#60a5fa" },
  CONTACTED: { bg: "rgba(234,179,8,0.12)", color: "#facc15" },
  QUALIFIED: { bg: "rgba(168,85,247,0.12)", color: "#c084fc" },
  NEGOTIATING: { bg: "rgba(249,115,22,0.12)", color: "#fb923c" },
  CONFIRMED: { bg: "rgba(34,197,94,0.12)", color: "#4ade80" },
  REJECTED: { bg: "rgba(239,68,68,0.12)", color: "#f87171" },
  ARCHIVED: { bg: "rgba(255,255,255,0.04)", color: "rgba(242,239,233,0.35)" },
};

function StatusBadge({ status }: { status: string }) {
  const s = STATUS_COLORS[status] ?? STATUS_COLORS.NEW;
  return (
    <span
      className="inline-flex px-2 py-0.5 rounded-full text-[11px] font-medium"
      style={{ background: s.bg, color: s.color }}
    >
      {status.charAt(0) + status.slice(1).toLowerCase()}
    </span>
  );
}

export default async function AdminDashboard() {
  const d = await getData();

  const statCards = [
    { label: "New", value: d.newCount, color: "#60a5fa", href: "/admin/requests?status=NEW", urgent: d.newCount > 0 },
    { label: "Contacted", value: d.contactedCount, color: "#facc15", href: "/admin/requests?status=CONTACTED", urgent: false },
    { label: "Qualified", value: d.qualifiedCount, color: "#c084fc", href: "/admin/requests?status=QUALIFIED", urgent: false },
    { label: "Confirmed", value: d.confirmedCount, color: "#4ade80", href: "/admin/requests?status=CONFIRMED", urgent: false },
    { label: "Shows upcoming", value: d.upcomingShows, color: "#d6b25e", href: "/admin/shows", urgent: false },
    { label: "Merch active", value: d.activeMerch, color: "#a78bfa", href: "/admin/merch", urgent: false },
  ];

  return (
    <div className="space-y-10 max-w-5xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-xs mt-0.5" style={{ color: "rgba(242,239,233,0.4)" }}>
            {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
          </p>
        </div>
        {d.newCount > 0 && (
          <Link
            href="/admin/requests?status=NEW"
            className="flex items-center gap-2 text-xs px-4 py-2 rounded-xl font-semibold"
            style={{
              background: "rgba(59,130,246,0.1)",
              border: "1px solid rgba(59,130,246,0.2)",
              color: "#60a5fa",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: "#60a5fa" }}
            />
            {d.newCount} new request{d.newCount !== 1 ? "s" : ""}
          </Link>
        )}
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {statCards.map(({ label, value, color, href, urgent }) => (
          <Link
            key={label}
            href={href}
            className="rounded-2xl p-5 transition-all hover:scale-[1.015] group"
            style={{
              background: urgent
                ? "rgba(59,130,246,0.05)"
                : "rgba(18,18,20,0.8)",
              border: `1px solid ${urgent ? "rgba(59,130,246,0.15)" : "rgba(255,255,255,0.06)"}`,
            }}
          >
            <div
              className="text-3xl font-bold tabular-nums"
              style={{ color }}
            >
              {value}
            </div>
            <div
              className="text-xs mt-1.5 font-medium"
              style={{ color: "rgba(242,239,233,0.4)" }}
            >
              {label}
            </div>
          </Link>
        ))}
      </div>

      {/* Recent requests */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2
            className="text-[10px] font-semibold tracking-[0.15em] uppercase"
            style={{ color: "rgba(242,239,233,0.35)" }}
          >
            Recent Requests
          </h2>
          <Link
            href="/admin/requests"
            className="text-xs transition-opacity hover:opacity-60"
            style={{ color: "#d6b25e" }}
          >
            View all →
          </Link>
        </div>

        <div
          className="rounded-2xl overflow-hidden"
          style={{ border: "1px solid rgba(255,255,255,0.06)" }}
        >
          {d.recentRequests.length === 0 ? (
            <div className="py-14 text-center">
              <p className="text-sm" style={{ color: "rgba(242,239,233,0.3)" }}>
                No requests yet.
              </p>
              <p className="text-xs mt-1" style={{ color: "rgba(242,239,233,0.18)" }}>
                New bookings will appear here.
              </p>
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr
                  style={{
                    borderBottom: "1px solid rgba(255,255,255,0.05)",
                    background: "rgba(0,0,0,0.18)",
                  }}
                >
                  {["Client", "Event", "Budget", "Status", "Date", ""].map((h, i) => (
                    <th
                      key={i}
                      className="text-left px-5 py-3 text-[11px] font-semibold tracking-wide"
                      style={{ color: "rgba(242,239,233,0.3)" }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {d.recentRequests.map((req, i) => (
                  <tr
                    key={req.id}
                    style={{
                      borderBottom:
                        i < d.recentRequests.length - 1
                          ? "1px solid rgba(255,255,255,0.04)"
                          : "none",
                      background: "rgba(11,11,13,0.5)",
                    }}
                  >
                    <td className="px-5 py-3.5">
                      <div className="font-medium text-sm" style={{ color: "#f2efe9" }}>
                        {req.fullName}
                      </div>
                      <div className="text-xs mt-0.5" style={{ color: "rgba(242,239,233,0.35)" }}>
                        {req.email}
                      </div>
                    </td>
                    <td
                      className="px-5 py-3.5 text-sm"
                      style={{ color: "rgba(242,239,233,0.6)" }}
                    >
                      {req.eventType}
                    </td>
                    <td
                      className="px-5 py-3.5 text-xs"
                      style={{ color: "rgba(242,239,233,0.4)" }}
                    >
                      {req.budgetRange ?? "—"}
                    </td>
                    <td className="px-5 py-3.5">
                      <StatusBadge status={req.status} />
                    </td>
                    <td
                      className="px-5 py-3.5 text-xs whitespace-nowrap"
                      style={{ color: "rgba(242,239,233,0.35)" }}
                    >
                      {new Date(req.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                    <td className="px-5 py-3.5">
                      <Link
                        href={`/admin/requests/${req.id}`}
                        className="text-xs px-3 py-1.5 rounded-lg font-medium transition"
                        style={{
                          background: "rgba(214,178,94,0.08)",
                          color: "#d6b25e",
                          border: "1px solid rgba(214,178,94,0.15)",
                        }}
                      >
                        Open
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-2 gap-3">
        <Link
          href="/admin/shows/new"
          className="flex items-center gap-3 px-5 py-4 rounded-2xl text-sm font-medium transition hover:opacity-80"
          style={{
            background: "rgba(18,18,20,0.8)",
            border: "1px solid rgba(255,255,255,0.06)",
            color: "rgba(242,239,233,0.55)",
          }}
        >
          <span style={{ color: "#d6b25e" }}>+</span> Add Show
        </Link>
        <Link
          href="/admin/merch/new"
          className="flex items-center gap-3 px-5 py-4 rounded-2xl text-sm font-medium transition hover:opacity-80"
          style={{
            background: "rgba(18,18,20,0.8)",
            border: "1px solid rgba(255,255,255,0.06)",
            color: "rgba(242,239,233,0.55)",
          }}
        >
          <span style={{ color: "#d6b25e" }}>+</span> Add Merch Item
        </Link>
      </div>
    </div>
  );
}
