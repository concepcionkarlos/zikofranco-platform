"use client";

import { useState } from "react";

interface Props {
  values: Record<string, string>;
}

const FIELDS = [
  {
    key: "spotify_embed_url",
    label: "Spotify Embed URL",
    hint: "Paste the Spotify embed iframe src URL. Find it on Spotify → Share → Embed → copy the src.",
    type: "textarea",
    rows: 3,
  },
  {
    key: "reply_from_name",
    label: "Email Reply-From Name",
    hint: "The sender name shown when emailing booking leads.",
    type: "input",
  },
  {
    key: "site_tagline",
    label: "Homepage Tagline",
    hint: "Short description shown below the hero title on the homepage.",
    type: "textarea",
    rows: 2,
  },
] as const;

const saveButtonStyle = (saved: boolean) => ({
  background: saved
    ? "rgba(34,197,94,0.15)"
    : "linear-gradient(180deg, rgba(214,178,94,0.95), rgba(185,151,68,0.95))",
  color: saved ? "#4ade80" : "#1b1408",
  border: saved ? "1px solid rgba(34,197,94,0.2)" : "none",
});

export function ContentForm({ values }: Props) {
  const [form, setForm] = useState<Record<string, string>>({ ...values });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  function set(key: string, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSaved(false);

    const res = await fetch("/api/admin/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = (await res.json()) as { ok: boolean; error?: string };

    if (!data.ok) {
      setError(data.error ?? "Failed to save.");
      setSaving(false);
      return;
    }
    setSaved(true);
    setSaving(false);
    setTimeout(() => setSaved(false), 2500);
  }

  const saveLabel = saving ? "Saving…" : saved ? "Saved ✓" : "Save Settings";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div
        className="rounded-2xl p-5 sm:p-6 space-y-6"
        style={{ background: "rgba(18,18,20,0.85)", border: "1px solid rgba(255,255,255,0.07)" }}
      >
        {FIELDS.map((field) => (
          <div key={field.key} className="space-y-1.5">
            <label className="text-xs font-semibold" style={{ color: "rgba(242,239,233,0.5)" }}>
              {field.label}
            </label>
            {field.type === "textarea" ? (
              <textarea
                value={form[field.key] ?? ""}
                onChange={(e) => set(field.key, e.target.value)}
                rows={field.rows}
                className="admin-input resize-none w-full"
              />
            ) : (
              <input
                value={form[field.key] ?? ""}
                onChange={(e) => set(field.key, e.target.value)}
                className="admin-input w-full"
              />
            )}
            {field.hint && (
              <p className="text-xs" style={{ color: "rgba(242,239,233,0.28)" }}>
                {field.hint}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Spotify preview */}
      {form.spotify_embed_url && (
        <div
          className="rounded-2xl overflow-hidden"
          style={{ border: "1px solid rgba(255,255,255,0.07)" }}
        >
          <p
            className="px-4 py-2.5 text-[10px] font-semibold tracking-widest uppercase"
            style={{
              color: "rgba(242,239,233,0.35)",
              borderBottom: "1px solid rgba(255,255,255,0.05)",
              background: "rgba(0,0,0,0.2)",
            }}
          >
            Spotify Preview
          </p>
          <iframe
            src={form.spotify_embed_url}
            width="100%"
            height="152"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            title="Spotify preview"
            style={{ display: "block" }}
          />
        </div>
      )}

      {error && <p className="text-sm" style={{ color: "#f87171" }}>{error}</p>}

      {/* Desktop save button */}
      <button
        type="submit"
        disabled={saving}
        className="hidden sm:block px-6 py-2.5 rounded-xl text-sm font-semibold disabled:opacity-60"
        style={saveButtonStyle(saved)}
      >
        {saveLabel}
      </button>

      {/* Mobile: spacer so content isn't hidden behind sticky bar */}
      <div className="h-20 sm:hidden" />

      {/* Mobile sticky save bar */}
      <div
        className="fixed bottom-0 left-0 right-0 z-20 p-3 sm:hidden"
        style={{
          background: "rgba(11,11,12,0.96)",
          borderTop: "1px solid rgba(255,255,255,0.07)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
        }}
      >
        <button
          type="submit"
          disabled={saving}
          className="w-full py-3 rounded-xl text-sm font-semibold disabled:opacity-60"
          style={saveButtonStyle(saved)}
        >
          {saveLabel}
        </button>
      </div>
    </form>
  );
}
