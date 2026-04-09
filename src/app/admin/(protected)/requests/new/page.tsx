"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const EVENT_TYPES = [
  "Wedding", "Corporate Event", "Private Party", "Festival",
  "Venue Show", "Birthday", "Anniversary", "Other",
];

const BUDGET_RANGES = [
  "Under $1,000", "$1,000–$2,500", "$2,500–$5,000",
  "$5,000–$10,000", "$10,000+", "To be discussed",
];

export default function NewRequestPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    eventType: "",
    budgetRange: "",
    message: "",
    internalNotes: "",
  });

  function set(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.fullName || !form.email || !form.eventType) {
      setError("Name, email, and event type are required.");
      return;
    }
    setSaving(true);
    setError("");

    const res = await fetch("/api/admin/requests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = (await res.json()) as { ok: boolean; data?: { id: string }; error?: string };

    if (!data.ok) {
      setError(data.error ?? "Failed to create request.");
      setSaving(false);
      return;
    }

    router.push(`/admin/requests/${data.data!.id}`);
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <Link
          href="/admin/requests"
          className="text-xs mb-3 inline-block hover:opacity-60 transition-opacity"
          style={{ color: "rgba(242,239,233,0.4)" }}
        >
          ← Requests
        </Link>
        <h1 className="text-2xl font-bold tracking-tight">New Request</h1>
        <p className="text-sm mt-1" style={{ color: "rgba(242,239,233,0.45)" }}>
          Add a booking request manually from admin.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div
          className="rounded-2xl p-6 space-y-5"
          style={{ background: "rgba(18,18,20,0.85)", border: "1px solid rgba(255,255,255,0.07)" }}
        >
          <h2 className="text-[10px] font-semibold tracking-widest uppercase" style={{ color: "rgba(242,239,233,0.35)" }}>
            Client Info
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Full Name *">
              <input
                value={form.fullName}
                onChange={(e) => set("fullName", e.target.value)}
                placeholder="Jane Smith"
                required
                className="admin-input"
              />
            </Field>
            <Field label="Email *">
              <input
                type="email"
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
                placeholder="jane@example.com"
                required
                className="admin-input"
              />
            </Field>
            <Field label="Phone">
              <input
                value={form.phone}
                onChange={(e) => set("phone", e.target.value)}
                placeholder="+1 (305) 000-0000"
                className="admin-input"
              />
            </Field>
            <Field label="Event Type *">
              <select
                value={form.eventType}
                onChange={(e) => set("eventType", e.target.value)}
                required
                className="admin-input"
              >
                <option value="">Select type…</option>
                {EVENT_TYPES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </Field>
            <Field label="Budget Range">
              <select
                value={form.budgetRange}
                onChange={(e) => set("budgetRange", e.target.value)}
                className="admin-input"
              >
                <option value="">Select range…</option>
                {BUDGET_RANGES.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </Field>
          </div>

          <Field label="Client Message">
            <textarea
              value={form.message}
              onChange={(e) => set("message", e.target.value)}
              rows={3}
              placeholder="What did the client say about their event?"
              className="admin-input resize-none"
            />
          </Field>

          <Field label="Internal Notes">
            <textarea
              value={form.internalNotes}
              onChange={(e) => set("internalNotes", e.target.value)}
              rows={3}
              placeholder="Private notes — not visible to client…"
              className="admin-input resize-none"
            />
          </Field>
        </div>

        {error && (
          <p className="text-sm" style={{ color: "#f87171" }}>{error}</p>
        )}

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 rounded-xl text-sm font-semibold disabled:opacity-60 transition-all"
            style={{
              background: "linear-gradient(180deg, rgba(214,178,94,0.95), rgba(185,151,68,0.95))",
              color: "#1b1408",
            }}
          >
            {saving ? "Creating…" : "Create Request"}
          </button>
          <Link
            href="/admin/requests"
            className="px-5 py-2.5 rounded-xl text-sm transition"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "rgba(242,239,233,0.5)",
            }}
          >
            Cancel
          </Link>
        </div>
      </form>

      <style jsx global>{`
        .admin-input {
          width: 100%;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 10px;
          padding: 9px 12px;
          font-size: 0.875rem;
          color: #f2efe9;
          outline: none;
          transition: border-color 140ms ease;
        }
        .admin-input:focus {
          border-color: rgba(214,178,94,0.4);
        }
        .admin-input option {
          background: #111113;
        }
      `}</style>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-medium" style={{ color: "rgba(242,239,233,0.5)" }}>
        {label}
      </label>
      {children}
    </div>
  );
}
