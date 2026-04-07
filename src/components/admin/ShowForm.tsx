"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

interface ShowData {
  id?: string;
  date?: string;
  venue?: string;
  city?: string;
  country?: string;
  type?: string;
  status?: string;
  ticketUrl?: string;
}

interface Props {
  initial?: ShowData;
  mode: "create" | "edit";
}

const SHOW_TYPES = ["Venue Show", "Festival", "Private Event", "Corporate Event", "Residency", "Other"];
const SHOW_STATUSES = ["UPCOMING", "ANNOUNCED", "SOLD_OUT", "CANCELLED", "PAST"];

function toDateInputValue(dateStr?: string): string {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return isNaN(d.getTime()) ? "" : d.toISOString().slice(0, 16);
}

export function ShowForm({ initial = {}, mode }: Props) {
  const router = useRouter();
  const [form, setForm] = useState({
    date: toDateInputValue(initial.date),
    venue: initial.venue ?? "",
    city: initial.city ?? "",
    country: initial.country ?? "US",
    type: initial.type ?? "Venue Show",
    status: initial.status ?? "UPCOMING",
    ticketUrl: initial.ticketUrl ?? "",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function set(field: string, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const url = mode === "edit" ? `/api/admin/shows/${initial.id}` : "/api/admin/shows";
      const method = mode === "edit" ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, date: new Date(form.date).toISOString() }),
      });

      const data = (await res.json()) as { ok: boolean; error?: string };
      if (!data.ok) throw new Error(data.error ?? "Save failed");

      router.push("/admin/shows");
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  const inputStyle = {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.09)",
    color: "#f2efe9",
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-xl">
      {error && (
        <div className="rounded-lg px-4 py-3 text-sm" style={{ background: "rgba(122,28,28,0.25)", border: "1px solid rgba(122,28,28,0.4)", color: "#f87171" }}>
          {error}
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2 space-y-1.5">
          <label className="text-xs font-medium" style={{ color: "rgba(242,239,233,0.55)" }}>Date & Time *</label>
          <input
            type="datetime-local"
            required
            value={form.date}
            onChange={(e) => set("date", e.target.value)}
            className="w-full rounded-xl px-4 py-2.5 text-sm outline-none"
            style={inputStyle}
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium" style={{ color: "rgba(242,239,233,0.55)" }}>Venue *</label>
          <input
            type="text"
            required
            value={form.venue}
            onChange={(e) => set("venue", e.target.value)}
            placeholder="Venue name"
            className="w-full rounded-xl px-4 py-2.5 text-sm outline-none"
            style={inputStyle}
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium" style={{ color: "rgba(242,239,233,0.55)" }}>City *</label>
          <input
            type="text"
            required
            value={form.city}
            onChange={(e) => set("city", e.target.value)}
            placeholder="Miami"
            className="w-full rounded-xl px-4 py-2.5 text-sm outline-none"
            style={inputStyle}
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium" style={{ color: "rgba(242,239,233,0.55)" }}>Country</label>
          <input
            type="text"
            value={form.country}
            onChange={(e) => set("country", e.target.value)}
            placeholder="US"
            className="w-full rounded-xl px-4 py-2.5 text-sm outline-none"
            style={inputStyle}
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium" style={{ color: "rgba(242,239,233,0.55)" }}>Type *</label>
          <select
            required
            value={form.type}
            onChange={(e) => set("type", e.target.value)}
            className="w-full rounded-xl px-4 py-2.5 text-sm outline-none"
            style={inputStyle}
          >
            {SHOW_TYPES.map((t) => (
              <option key={t} value={t} style={{ background: "#111113" }}>{t}</option>
            ))}
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium" style={{ color: "rgba(242,239,233,0.55)" }}>Status</label>
          <select
            value={form.status}
            onChange={(e) => set("status", e.target.value)}
            className="w-full rounded-xl px-4 py-2.5 text-sm outline-none"
            style={inputStyle}
          >
            {SHOW_STATUSES.map((s) => (
              <option key={s} value={s} style={{ background: "#111113" }}>
                {s.replace("_", " ").charAt(0) + s.replace("_", " ").slice(1).toLowerCase()}
              </option>
            ))}
          </select>
        </div>

        <div className="col-span-2 space-y-1.5">
          <label className="text-xs font-medium" style={{ color: "rgba(242,239,233,0.55)" }}>Ticket URL</label>
          <input
            type="url"
            value={form.ticketUrl}
            onChange={(e) => set("ticketUrl", e.target.value)}
            placeholder="https://tickets.example.com"
            className="w-full rounded-xl px-4 py-2.5 text-sm outline-none"
            style={inputStyle}
          />
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={saving}
          className="px-6 py-2.5 rounded-xl text-sm font-semibold transition disabled:opacity-60"
          style={{
            background: "linear-gradient(180deg, rgba(214,178,94,0.95), rgba(185,151,68,0.95))",
            color: "#1b1408",
          }}
        >
          {saving ? "Saving…" : mode === "edit" ? "Save Changes" : "Create Show"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/shows")}
          className="px-5 py-2.5 rounded-xl text-sm transition"
          style={{ background: "rgba(255,255,255,0.05)", color: "rgba(242,239,233,0.6)" }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
