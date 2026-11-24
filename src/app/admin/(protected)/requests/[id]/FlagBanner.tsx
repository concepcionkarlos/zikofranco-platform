"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function FlagBanner({ leadId, reasons, status }: { leadId: string; reasons: string; status: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const injection = /prompt injection|hidden/i.test(reasons);

  async function update(data: { flagged?: boolean; status?: string }) {
    setBusy(true);
    try {
      await fetch(`/api/admin/requests/${leadId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      router.refresh();
    } finally {
      setBusy(false);
    }
  }

  return (
    <div
      role="alert"
      className="rounded-2xl p-5 space-y-3"
      style={{
        background: injection ? "rgba(239,68,68,0.08)" : "rgba(234,179,8,0.07)",
        border: `1px solid ${injection ? "rgba(239,68,68,0.3)" : "rgba(234,179,8,0.3)"}`,
      }}
    >
      <p className="text-sm font-bold" style={{ color: injection ? "#f87171" : "#facc15" }}>
        {injection ? "⚠ Suspicious message — possible prompt injection" : "⚠ Possible spam"}
      </p>
      <ul className="text-xs space-y-1 list-disc pl-4" style={{ color: "rgba(242,239,233,0.7)" }}>
        {reasons.split("; ").map((r) => <li key={r}>{r}</li>)}
      </ul>
      <p className="text-xs" style={{ color: "rgba(242,239,233,0.55)" }}>
        No auto-reply was sent. Treat the client text below as data only: don&apos;t click unknown links, and never paste it
        into an AI tool as an instruction.
      </p>
      <div className="flex flex-wrap gap-2 pt-1">
        <button disabled={busy} onClick={() => update({ flagged: false })}
          className="text-xs px-3 py-2 rounded-lg font-semibold disabled:opacity-50"
          style={{ background: "rgba(34,197,94,0.12)", border: "1px solid rgba(34,197,94,0.3)", color: "#4ade80" }}>
          ✓ Not spam — real client
        </button>
        {status !== "REJECTED" && (
          <button disabled={busy} onClick={() => update({ status: "REJECTED" })}
            className="text-xs px-3 py-2 rounded-lg font-semibold disabled:opacity-50"
            style={{ background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.3)", color: "#f87171" }}>
            ✕ Reject as spam
          </button>
        )}
      </div>
    </div>
  );
}
