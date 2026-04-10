import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import { RequestActions } from "./RequestActions";
import { EmailForm } from "./EmailForm";

const STATUS_COLORS: Record<string, { bg: string; color: string }> = {
  NEW: { bg: "rgba(59,130,246,0.15)", color: "#60a5fa" },
  CONTACTED: { bg: "rgba(234,179,8,0.15)", color: "#facc15" },
  QUALIFIED: { bg: "rgba(168,85,247,0.15)", color: "#c084fc" },
  NEGOTIATING: { bg: "rgba(249,115,22,0.15)", color: "#fb923c" },
  CONFIRMED: { bg: "rgba(34,197,94,0.15)", color: "#4ade80" },
  REJECTED: { bg: "rgba(239,68,68,0.15)", color: "#f87171" },
  ARCHIVED: { bg: "rgba(255,255,255,0.05)", color: "rgba(242,239,233,0.4)" },
};

const ACTIVITY_ICONS: Record<string, string> = {
  STATUS_CHANGE: "⇄",
  NOTE_ADDED: "✎",
  EMAIL_SENT: "✉",
  CREATED: "✦",
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function RequestDetailPage({ params }: PageProps) {
  const { id } = await params;

  const lead = await prisma.lead.findUnique({
    where: { id },
    include: {
      activities: { orderBy: { createdAt: "desc" } },
      emailLogs: { orderBy: { sentAt: "desc" } },
    },
  });

  if (!lead) notFound();

  const sc = STATUS_COLORS[lead.status] ?? STATUS_COLORS.NEW;

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Page header */}
      <div>
        <Link
          href="/admin/requests"
          className="text-xs mb-3 inline-block hover:opacity-60 transition-opacity"
          style={{ color: "rgba(242,239,233,0.4)" }}
        >
          ← Requests
        </Link>
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{lead.fullName}</h1>
            <div className="flex items-center gap-3 mt-2 flex-wrap">
              <span
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold"
                style={{ background: sc.bg, color: sc.color }}
              >
                {lead.status.charAt(0) + lead.status.slice(1).toLowerCase()}
              </span>
              <span className="text-xs" style={{ color: "rgba(242,239,233,0.35)" }}>
                Received {new Date(lead.createdAt).toLocaleDateString("en-US", {
                  month: "long", day: "numeric", year: "numeric",
                })}
              </span>
            </div>
          </div>
          <a
            href={`mailto:${lead.email}`}
            className="text-xs px-4 py-2 rounded-xl font-medium transition hover:opacity-80"
            style={{
              background: "rgba(214,178,94,0.08)",
              border: "1px solid rgba(214,178,94,0.18)",
              color: "#d6b25e",
            }}
          >
            {lead.email} ↗
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Manage panel — first on mobile, right column on desktop */}
        <div className="lg:col-span-2 lg:order-2">
          <RequestActions
            lead={{
              id: lead.id,
              status: lead.status,
              internalNotes: lead.internalNotes ?? "",
            }}
          />
        </div>

        {/* Main content — second on mobile, left column on desktop */}
        <div className="lg:col-span-3 lg:order-1 space-y-5">

          {/* Client & event info */}
          <div
            className="rounded-2xl p-6 space-y-5"
            style={{ background: "rgba(18,18,20,0.85)", border: "1px solid rgba(255,255,255,0.07)" }}
          >
            <h2 className="text-[10px] font-semibold tracking-widest uppercase" style={{ color: "rgba(242,239,233,0.35)" }}>
              Request Details
            </h2>

            <div className="grid grid-cols-2 gap-x-6 gap-y-4 text-sm">
              <Field label="Full Name" value={lead.fullName} />
              <Field label="Email" value={
                <a href={`mailto:${lead.email}`} style={{ color: "#d6b25e" }}>{lead.email}</a>
              } />
              <Field label="Phone" value={lead.phone ?? "—"} />
              <Field label="Event Type" value={lead.eventType} />
              <Field label="Budget" value={lead.budgetRange ?? "—"} />
              <Field label="Last Updated" value={
                new Date(lead.updatedAt).toLocaleDateString("en-US", {
                  month: "short", day: "numeric", year: "numeric",
                })
              } />
            </div>

            {lead.message && (
              <div>
                <div
                  className="h-px mb-4"
                  style={{ background: "rgba(255,255,255,0.05)" }}
                />
                <div className="text-xs font-medium mb-2" style={{ color: "rgba(242,239,233,0.35)" }}>
                  Message from client
                </div>
                <p className="text-sm leading-relaxed whitespace-pre-wrap" style={{ color: "rgba(242,239,233,0.75)" }}>
                  {lead.message}
                </p>
              </div>
            )}
          </div>

          {/* Email reply form */}
          <EmailForm
            leadId={lead.id}
            clientEmail={lead.email}
            clientName={lead.fullName}
            currentStatus={lead.status}
          />

          {/* Sent emails log */}
          {lead.emailLogs.length > 0 && (
            <div
              className="rounded-2xl p-6 space-y-4"
              style={{ background: "rgba(18,18,20,0.85)", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              <h2 className="text-[10px] font-semibold tracking-widest uppercase" style={{ color: "rgba(242,239,233,0.35)" }}>
                Sent Emails ({lead.emailLogs.length})
              </h2>
              <div className="space-y-3">
                {lead.emailLogs.map((log) => (
                  <details
                    key={log.id}
                    className="rounded-xl cursor-pointer"
                    style={{ border: "1px solid rgba(255,255,255,0.06)" }}
                  >
                    <summary className="px-4 py-3 text-sm flex items-center justify-between list-none">
                      <span style={{ color: "rgba(242,239,233,0.75)" }}>{log.subject}</span>
                      <span className="text-xs ml-4 shrink-0" style={{ color: "rgba(242,239,233,0.3)" }}>
                        {new Date(log.sentAt).toLocaleDateString("en-US", {
                          month: "short", day: "numeric", hour: "2-digit", minute: "2-digit",
                        })}
                      </span>
                    </summary>
                    <div
                      className="px-4 pb-4 text-xs leading-relaxed whitespace-pre-wrap"
                      style={{ color: "rgba(242,239,233,0.5)", borderTop: "1px solid rgba(255,255,255,0.05)" }}
                    >
                      <div className="pt-3">{log.body}</div>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          )}

          {/* Activity log */}
          <div
            className="rounded-2xl p-6"
            style={{ background: "rgba(18,18,20,0.85)", border: "1px solid rgba(255,255,255,0.07)" }}
          >
            <h2 className="text-[10px] font-semibold tracking-widest uppercase mb-4" style={{ color: "rgba(242,239,233,0.35)" }}>
              Activity Log
            </h2>
            {lead.activities.length === 0 ? (
              <p className="text-sm" style={{ color: "rgba(242,239,233,0.3)" }}>No activity recorded yet.</p>
            ) : (
              <div className="space-y-3">
                {lead.activities.map((a) => (
                  <div key={a.id} className="flex gap-3 items-start">
                    <span
                      className="mt-px text-xs w-4 text-center shrink-0"
                      style={{ color: "rgba(242,239,233,0.3)" }}
                    >
                      {ACTIVITY_ICONS[a.type] ?? "·"}
                    </span>
                    <div className="flex-1 min-w-0">
                      <span className="text-sm" style={{ color: "rgba(242,239,233,0.65)" }}>
                        {a.content}
                      </span>
                      <span className="block text-xs mt-0.5" style={{ color: "rgba(242,239,233,0.28)" }}>
                        {new Date(a.createdAt).toLocaleDateString("en-US", {
                          month: "short", day: "numeric", hour: "2-digit", minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <div className="text-xs font-medium mb-0.5" style={{ color: "rgba(242,239,233,0.35)" }}>
        {label}
      </div>
      <div className="text-sm" style={{ color: "#f2efe9" }}>{value}</div>
    </div>
  );
}
