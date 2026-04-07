import { prisma } from "@/lib/db";
import Link from "next/link";

async function getDashboardData() {
  const [
    newCount,
    contactedCount,
    confirmedCount,
    archivedCount,
    upcomingShows,
    activeMerch,
    recentRequests,
  ] = await Promise.all([
    prisma.lead.count({ where: { status: "NEW" } }),
    prisma.lead.count({ where: { status: "CONTACTED" } }),
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
      take: 5,
      select: {
        id: true,
        fullName: true,
        email: true,
        eventType: true,
        status: true,
        createdAt: true,
      },
    }),
  ]);

  return {
    newCount,
    contactedCount,
    confirmedCount,
    archivedCount,
    upcomingShows,
    activeMerch,
    recentRequests,
  };
}

const STATUS_COLORS: Record<string, { bg: string; color: string }> = {
  NEW: { bg: "rgba(59,130,246,0.15)", color: "#60a5fa" },
  CONTACTED: { bg: "rgba(234,179,8,0.15)", color: "#facc15" },
  QUALIFIED: { bg: "rgba(168,85,247,0.15)", color: "#c084fc" },
  NEGOTIATING: { bg: "rgba(249,115,22,0.15)", color: "#fb923c" },
  CONFIRMED: { bg: "rgba(34,197,94,0.15)", color: "#4ade80" },
  REJECTED: { bg: "rgba(239,68,68,0.15)", color: "#f87171" },
  ARCHIVED: { bg: "rgba(255,255,255,0.05)", color: "rgba(242,239,233,0.4)" },
};

export default async function AdminDashboard() {
  const data = await getDashboardData();

  const cards = [
    { label: "New Requests", value: data.newCount, color: "#60a5fa", href: "/admin/requests?status=NEW" },
    { label: "Contacted", value: data.contactedCount, color: "#facc15", href: "/admin/requests?status=CONTACTED" },
    { label: "Confirmed", value: data.confirmedCount, color: "#4ade80", href: "/admin/requests?status=CONFIRMED" },
    { label: "Archived", value: data.archivedCount, color: "rgba(242,239,233,0.35)", href: "/admin/requests?status=ARCHIVED" },
    { label: "Upcoming Shows", value: data.upcomingShows, color: "#d6b25e", href: "/admin/shows" },
    { label: "Active Merch", value: data.activeMerch, color: "#a78bfa", href: "/admin/merch" },
  ];

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-sm mt-1" style={{ color: "rgba(242,239,233,0.45)" }}>
          ZikoFranco platform overview
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {cards.map(({ label, value, color, href }) => (
          <Link
            key={label}
            href={href}
            className="rounded-2xl p-5 transition-all hover:scale-[1.02]"
            style={{
              background: "rgba(18,18,20,0.85)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <div className="text-3xl font-bold" style={{ color }}>
              {value}
            </div>
            <div className="text-xs mt-1 font-medium" style={{ color: "rgba(242,239,233,0.5)" }}>
              {label}
            </div>
          </Link>
        ))}
      </div>

      {/* Recent requests */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold tracking-wide uppercase" style={{ color: "rgba(242,239,233,0.4)", letterSpacing: "0.08em" }}>
            Recent Requests
          </h2>
          <Link href="/admin/requests" className="text-xs" style={{ color: "#d6b25e" }}>
            View all →
          </Link>
        </div>

        <div
          className="rounded-2xl overflow-hidden"
          style={{ border: "1px solid rgba(255,255,255,0.07)" }}
        >
          {data.recentRequests.length === 0 ? (
            <div className="text-center py-12 text-sm" style={{ color: "rgba(242,239,233,0.35)" }}>
              No requests yet.
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", background: "rgba(0,0,0,0.2)" }}>
                  {["Name", "Event", "Status", "Date"].map((h) => (
                    <th
                      key={h}
                      className="text-left px-5 py-3 text-xs font-semibold tracking-wide"
                      style={{ color: "rgba(242,239,233,0.4)" }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.recentRequests.map((req, i) => {
                  const sc = STATUS_COLORS[req.status] ?? STATUS_COLORS.NEW;
                  return (
                    <tr
                      key={req.id}
                      style={{
                        borderBottom: i < data.recentRequests.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                        background: "rgba(13,13,15,0.6)",
                      }}
                    >
                      <td className="px-5 py-3">
                        <Link href={`/admin/requests/${req.id}`} className="font-medium hover:underline" style={{ color: "#f2efe9" }}>
                          {req.fullName}
                        </Link>
                        <div className="text-xs mt-0.5" style={{ color: "rgba(242,239,233,0.4)" }}>
                          {req.email}
                        </div>
                      </td>
                      <td className="px-5 py-3" style={{ color: "rgba(242,239,233,0.65)" }}>
                        {req.eventType}
                      </td>
                      <td className="px-5 py-3">
                        <span
                          className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium"
                          style={{ background: sc.bg, color: sc.color }}
                        >
                          {req.status.charAt(0) + req.status.slice(1).toLowerCase()}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-xs" style={{ color: "rgba(242,239,233,0.4)" }}>
                        {new Date(req.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
