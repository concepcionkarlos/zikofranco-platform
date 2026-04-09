import { prisma } from "@/lib/db";
import Link from "next/link";
import { LeadStatus, Prisma } from "@prisma/client";
import { RequestsFilterBar } from "./RequestsFilterBar";

const STATUSES = ["ALL", "NEW", "CONTACTED", "QUALIFIED", "NEGOTIATING", "CONFIRMED", "REJECTED", "ARCHIVED"];

const STATUS_COLORS: Record<string, { bg: string; color: string }> = {
  NEW: { bg: "rgba(59,130,246,0.15)", color: "#60a5fa" },
  CONTACTED: { bg: "rgba(234,179,8,0.15)", color: "#facc15" },
  QUALIFIED: { bg: "rgba(168,85,247,0.15)", color: "#c084fc" },
  NEGOTIATING: { bg: "rgba(249,115,22,0.15)", color: "#fb923c" },
  CONFIRMED: { bg: "rgba(34,197,94,0.15)", color: "#4ade80" },
  REJECTED: { bg: "rgba(239,68,68,0.15)", color: "#f87171" },
  ARCHIVED: { bg: "rgba(255,255,255,0.05)", color: "rgba(242,239,233,0.4)" },
};

interface PageProps {
  searchParams: Promise<{ search?: string; status?: string; sort?: string; page?: string }>;
}

export default async function RequestsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const search = params.search?.trim() ?? "";
  const status = params.status ?? "ALL";
  const sort = params.sort ?? "createdAt_desc";
  const page = Math.max(1, parseInt(params.page ?? "1"));
  const pageSize = 20;

  const where: Prisma.LeadWhereInput = {};
  if (status !== "ALL") where.status = status as LeadStatus;
  if (search) {
    where.OR = [
      { fullName: { contains: search, mode: "insensitive" } },
      { email: { contains: search, mode: "insensitive" } },
      { eventType: { contains: search, mode: "insensitive" } },
    ];
  }

  const [field, dir] = sort.split("_");
  const orderBy: Prisma.LeadOrderByWithRelationInput = {
    [field === "name" ? "fullName" : (field ?? "createdAt")]: dir === "asc" ? "asc" : "desc",
  };

  const [leads, total] = await Promise.all([
    prisma.lead.findMany({
      where,
      orderBy,
      skip: (page - 1) * pageSize,
      take: pageSize,
      select: {
        id: true,
        fullName: true,
        email: true,
        phone: true,
        eventType: true,
        budgetRange: true,
        status: true,
        createdAt: true,
      },
    }),
    prisma.lead.count({ where }),
  ]);

  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Booking Requests</h1>
          <p className="text-sm mt-1" style={{ color: "rgba(242,239,233,0.45)" }}>
            {total} total request{total !== 1 ? "s" : ""}
          </p>
        </div>
        <Link
          href="/admin/requests/new"
          className="text-sm px-4 py-2 rounded-xl font-semibold"
          style={{
            background: "linear-gradient(180deg, rgba(214,178,94,0.95), rgba(185,151,68,0.95))",
            color: "#1b1408",
          }}
        >
          + New Request
        </Link>
      </div>

      <RequestsFilterBar statuses={STATUSES} currentStatus={status} currentSearch={search} currentSort={sort} />

      <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
        {leads.length === 0 ? (
          <div className="text-center py-16 text-sm" style={{ color: "rgba(242,239,233,0.35)" }}>
            No requests match your filters.
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", background: "rgba(0,0,0,0.25)" }}>
                {["Name", "Event", "Budget", "Status", "Date", ""].map((h, i) => (
                  <th
                    key={i}
                    className="text-left px-5 py-3 text-xs font-semibold tracking-wide"
                    style={{ color: "rgba(242,239,233,0.4)" }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {leads.map((lead, i) => {
                const sc = STATUS_COLORS[lead.status] ?? STATUS_COLORS.NEW;
                return (
                  <tr
                    key={lead.id}
                    style={{
                      borderBottom: i < leads.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                      background: "rgba(13,13,15,0.6)",
                    }}
                  >
                    <td className="px-5 py-3.5">
                      <div className="font-medium" style={{ color: "#f2efe9" }}>{lead.fullName}</div>
                      <div className="text-xs mt-0.5" style={{ color: "rgba(242,239,233,0.4)" }}>{lead.email}</div>
                      {lead.phone && (
                        <div className="text-xs" style={{ color: "rgba(242,239,233,0.3)" }}>{lead.phone}</div>
                      )}
                    </td>
                    <td className="px-5 py-3.5" style={{ color: "rgba(242,239,233,0.65)" }}>{lead.eventType}</td>
                    <td className="px-5 py-3.5 text-xs" style={{ color: "rgba(242,239,233,0.5)" }}>
                      {lead.budgetRange ?? "—"}
                    </td>
                    <td className="px-5 py-3.5">
                      <span
                        className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium"
                        style={{ background: sc.bg, color: sc.color }}
                      >
                        {lead.status.charAt(0) + lead.status.slice(1).toLowerCase()}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-xs whitespace-nowrap" style={{ color: "rgba(242,239,233,0.4)" }}>
                      {new Date(lead.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </td>
                    <td className="px-5 py-3.5">
                      <Link
                        href={`/admin/requests/${lead.id}`}
                        className="text-xs font-medium px-3 py-1.5 rounded-lg transition"
                        style={{
                          background: "rgba(214,178,94,0.1)",
                          color: "#d6b25e",
                          border: "1px solid rgba(214,178,94,0.2)",
                        }}
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between text-sm">
          <span style={{ color: "rgba(242,239,233,0.4)" }}>
            Page {page} of {totalPages}
          </span>
          <div className="flex gap-2">
            {page > 1 && (
              <Link
                href={`?search=${search}&status=${status}&sort=${sort}&page=${page - 1}`}
                className="px-4 py-1.5 rounded-lg text-xs transition"
                style={{ background: "rgba(255,255,255,0.06)", color: "#f2efe9" }}
              >
                ← Prev
              </Link>
            )}
            {page < totalPages && (
              <Link
                href={`?search=${search}&status=${status}&sort=${sort}&page=${page + 1}`}
                className="px-4 py-1.5 rounded-lg text-xs transition"
                style={{ background: "rgba(255,255,255,0.06)", color: "#f2efe9" }}
              >
                Next →
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
