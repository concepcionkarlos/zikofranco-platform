"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const STATUSES = [
  "NEW", "CONTACTED", "QUALIFIED", "NEGOTIATING", "CONFIRMED", "REJECTED", "ARCHIVED",
] as const;

type Status = typeof STATUSES[number];

interface Props {
  lead: {
    id: string;
    status: string;
    internalNotes: string;
  };
}

const STATUS_COLORS: Record<string, string> = {
  NEW: "#60a5fa",
  CONTACTED: "#facc15",
  QUALIFIED: "#c084fc",
  NEGOTIATING: "#fb923c",
  CONFIRMED: "#4ade80",
  REJECTED: "#f87171",
  ARCHIVED: "rgba(242,239,233,0.35)",
};

export function RequestActions({ lead }: Props) {
  const router = useRouter();
  const [status, setStatus] = useState<Status>(lead.status as Status);
  const [notes, setNotes] = useState(lead.internalNotes);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState(false);

  async function saveWith(overrides: { status?: Status; internalNotes?: string } = {}) {
    setSaving(true);
    setError("");
    setSaved(false);

    const payload = {
      status: overrides.status ?? status,
      internalNotes: overrides.internalNotes ?? notes,
    };

    try {
      const res = await fetch(`/api/admin/requests/${lead.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = (await res.json()) as { ok: boolean; error?: string };
      if (!data.ok) throw new Error(data.error ?? "Failed to save");

      if (overrides.status) setStatus(overrides.status);
      if (overrides.internalNotes !== undefined) setNotes(overrides.internalNotes);

      setSaved(true);
      router.refresh();
      setTimeout(() => setSaved(false), 2000);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    const confirmed = window.confirm(
      "Permanently delete this request? This cannot be undone.\n\nType OK to confirm.",
    );
    if (!confirmed) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/requests/${lead.id}`, { method: "DELETE" });
      const data = (await res.json()) as { ok: boolean };
      if (data.ok) {
        router.push("/admin/requests");
      }
    } finally {
      setDeleting(false);
    }
  }

  const isArchived = status === "ARCHIVED";

  return (
    <div
      className="rounded-2xl p-5 sm:p-6 space-y-5 lg:sticky lg:top-8"
      style={{ background: "rgba(18,18,20,0.85)", border: "1px solid rgba(255,255,255,0.07)" }}
    >
      <h2 className="text-xs font-semibold tracking-widest uppercase" style={{ color: "rgba(242,239,233,0.4)" }}>
        Manage
      </h2>

      {/* Status picker */}
      <div className="space-y-2">
        <label className="text-xs font-medium" style={{ color: "rgba(242,239,233,0.5)" }}>
          Status
        </label>

        {/* Mobile: grid of status buttons */}
        <div className="grid grid-cols-2 gap-1.5 lg:hidden">
          {STATUSES.map((s) => {
            const active = status === s;
            return (
              <button
                key={s}
                onClick={() => setStatus(s)}
                className="flex items-center gap-2 px-3 py-3 rounded-xl text-xs font-semibold transition-all whitespace-nowrap"
                style={{
                  background: active ? "rgba(214,178,94,0.08)" : "rgba(255,255,255,0.025)",
                  border: `1px solid ${active ? (STATUS_COLORS[s] ?? "#d6b25e") + "55" : "rgba(255,255,255,0.06)"}`,
                  color: active ? (STATUS_COLORS[s] ?? "#f2efe9") : "rgba(242,239,233,0.45)",
                }}
              >
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ background: STATUS_COLORS[s] ?? "#888" }}
                />
                {s.charAt(0) + s.slice(1).toLowerCase()}
              </button>
            );
          })}
        </div>

        {/* Desktop: vertical stack */}
        <div className="hidden lg:flex flex-col gap-1.5">
          {STATUSES.map((s) => {
            const active = status === s;
            return (
              <button
                key={s}
                onClick={() => setStatus(s)}
                className="text-left px-3 py-2 rounded-xl text-sm font-medium transition-all"
                style={{
                  background: active ? "rgba(214,178,94,0.08)" : "rgba(255,255,255,0.025)",
                  border: `1px solid ${active ? "rgba(214,178,94,0.25)" : "rgba(255,255,255,0.05)"}`,
                  color: active ? (STATUS_COLORS[s] ?? "#f2efe9") : "rgba(242,239,233,0.45)",
                }}
              >
                <span
                  className="inline-block w-1.5 h-1.5 rounded-full mr-2.5 mb-px"
                  style={{ background: STATUS_COLORS[s] ?? "#888" }}
                />
                {s.charAt(0) + s.slice(1).toLowerCase()}
              </button>
            );
          })}
        </div>
      </div>

      {/* Internal notes */}
      <div className="space-y-2">
        <label className="text-xs font-medium" style={{ color: "rgba(242,239,233,0.5)" }}>
          Internal Notes
        </label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          placeholder="Private notes — not visible to client…"
          className="w-full rounded-xl px-3 py-3 text-sm outline-none resize-none"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.07)",
            color: "#f2efe9",
          }}
        />
      </div>

      {error && (
        <p className="text-xs" style={{ color: "#f87171" }}>{error}</p>
      )}

      {/* Save */}
      <button
        onClick={() => saveWith()}
        disabled={saving}
        className="w-full py-3.5 rounded-xl text-sm font-bold transition-all disabled:opacity-60"
        style={{
          background: saved
            ? "rgba(34,197,94,0.15)"
            : "linear-gradient(180deg, rgba(214,178,94,0.95), rgba(185,151,68,0.95))",
          color: saved ? "#4ade80" : "#1b1408",
          border: saved ? "1px solid rgba(34,197,94,0.2)" : "none",
        }}
      >
        {saving ? "Saving…" : saved ? "Saved ✓" : "Save Changes"}
      </button>

      {/* Archive / Restore */}
      {isArchived ? (
        <button
          onClick={() => {
            if (confirm("Restore this request to New?")) saveWith({ status: "NEW" });
          }}
          disabled={saving}
          className="w-full py-2.5 rounded-xl text-xs font-medium transition disabled:opacity-50"
          style={{
            background: "rgba(34,197,94,0.06)",
            border: "1px solid rgba(34,197,94,0.18)",
            color: "rgba(74,222,128,0.7)",
          }}
        >
          Restore Request
        </button>
      ) : (
        <button
          onClick={() => {
            if (confirm("Archive this request?")) saveWith({ status: "ARCHIVED" });
          }}
          disabled={saving}
          className="w-full py-2.5 rounded-xl text-xs font-medium transition disabled:opacity-50"
          style={{
            background: "transparent",
            border: "1px solid rgba(239,68,68,0.15)",
            color: "rgba(248,113,113,0.5)",
          }}
        >
          Archive Request
        </button>
      )}

      {/* Permanent delete */}
      <div className="pt-2" style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <button
          onClick={handleDelete}
          disabled={deleting || saving}
          className="w-full py-2.5 rounded-xl text-xs font-medium transition disabled:opacity-40"
          style={{
            background: "transparent",
            border: "1px solid rgba(239,68,68,0.1)",
            color: "rgba(248,113,113,0.35)",
          }}
        >
          {deleting ? "Deleting…" : "Delete Permanently"}
        </button>
      </div>
    </div>
  );
}
