"use client";

import { useState, useRef } from "react";

interface Props {
  values: Record<string, string>;
}

export function EPKForm({ values }: Props) {
  const [form, setForm] = useState<Record<string, string>>({ ...values });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  function set(key: string, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handlePhotoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
    const data = (await res.json()) as { ok: boolean; url?: string; error?: string };
    if (!data.ok || !data.url) {
      setError(data.error ?? "Upload failed.");
    } else {
      set("epk_press_photo", data.url);
    }
    setUploading(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSaved(false);

    // Only save EPK keys
    const EPK_KEYS = [
      "epk_bio", "epk_genre", "epk_origin", "epk_languages",
      "epk_press_photo", "epk_press_photo_caption",
      "epk_band_format", "epk_stage_req", "epk_set_details",
      "epk_contact_email",
    ];
    const payload = Object.fromEntries(EPK_KEYS.map((k) => [k, form[k] ?? ""]));

    const res = await fetch("/api/admin/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const d = (await res.json()) as { ok: boolean; error?: string };
    if (!d.ok) {
      setError(d.error ?? "Failed to save.");
      setSaving(false);
      return;
    }
    setSaved(true);
    setSaving(false);
    setTimeout(() => setSaved(false), 2500);
  }

  const photoPreview = form.epk_press_photo;

  return (
    <form onSubmit={handleSubmit} className="space-y-5">

      {/* ── Bio ── */}
      <Section title="Artist Bio">
        <Field label="Bio Text" hint="Separate paragraphs with a blank line (double Enter). Each paragraph is shown separately.">
          <textarea
            value={form.epk_bio ?? ""}
            onChange={(e) => set("epk_bio", e.target.value)}
            rows={8}
            className="admin-input resize-y"
          />
        </Field>

        <div className="grid grid-cols-3 gap-4">
          <Field label="Genre">
            <input value={form.epk_genre ?? ""} onChange={(e) => set("epk_genre", e.target.value)} className="admin-input" placeholder="Rock / Funk" />
          </Field>
          <Field label="Origin">
            <input value={form.epk_origin ?? ""} onChange={(e) => set("epk_origin", e.target.value)} className="admin-input" placeholder="Miami, FL" />
          </Field>
          <Field label="Languages">
            <input value={form.epk_languages ?? ""} onChange={(e) => set("epk_languages", e.target.value)} className="admin-input" placeholder="EN / ES" />
          </Field>
        </div>
      </Section>

      {/* ── Press Photo ── */}
      <Section title="Press Photo">
        <Field label="Photo URL" hint="Upload a new photo below, or paste a direct URL.">
          <input
            value={form.epk_press_photo ?? ""}
            onChange={(e) => set("epk_press_photo", e.target.value)}
            className="admin-input"
            placeholder="/assets/photos/..."
          />
        </Field>

        {/* Upload + preview row */}
        <div className="flex gap-4 items-start">
          <div>
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              disabled={uploading}
              className="text-xs px-4 py-2 rounded-xl font-semibold transition disabled:opacity-50"
              style={{
                background: "rgba(214,178,94,0.1)",
                border: "1px solid rgba(214,178,94,0.22)",
                color: "#d6b25e",
              }}
            >
              {uploading ? "Uploading…" : "Upload Photo"}
            </button>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
            <p className="text-[10px] mt-1.5" style={{ color: "rgba(242,239,233,0.28)" }}>
              JPG, PNG, WEBP · max 10 MB
            </p>
          </div>

          {photoPreview && (
            <div className="rounded-xl overflow-hidden shrink-0" style={{ width: 120, height: 80, background: "rgba(0,0,0,0.3)" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={photoPreview} alt="EPK photo preview" className="w-full h-full object-cover" />
            </div>
          )}
        </div>

        <Field label="Photo Caption" hint="Small text shown below the photo on the EPK page.">
          <input
            value={form.epk_press_photo_caption ?? ""}
            onChange={(e) => set("epk_press_photo_caption", e.target.value)}
            className="admin-input"
            placeholder="Press Photo — Hi-res available on request"
          />
        </Field>
      </Section>

      {/* ── Technical Rider ── */}
      <Section title="Technical Rider" hint="One item per line. Each line becomes a bullet point.">
        <div className="grid sm:grid-cols-3 gap-4">
          <Field label="Band Format">
            <textarea
              value={form.epk_band_format ?? ""}
              onChange={(e) => set("epk_band_format", e.target.value)}
              rows={5}
              className="admin-input resize-none"
              placeholder={"Trio, quartet, or full band\nFormat based on venue & needs"}
            />
          </Field>
          <Field label="Stage Requirements">
            <textarea
              value={form.epk_stage_req ?? ""}
              onChange={(e) => set("epk_stage_req", e.target.value)}
              rows={5}
              className="admin-input resize-none"
              placeholder={"Min. 20×16 ft stage\nFull PA system required"}
            />
          </Field>
          <Field label="Set Details">
            <textarea
              value={form.epk_set_details ?? ""}
              onChange={(e) => set("epk_set_details", e.target.value)}
              rows={5}
              className="admin-input resize-none"
              placeholder={"30 / 60 / 90 min sets\nSoundcheck: 60 min"}
            />
          </Field>
        </div>
      </Section>

      {/* ── Contact ── */}
      <Section title="Press Contact">
        <Field label="Press / Contact Email">
          <input
            value={form.epk_contact_email ?? ""}
            onChange={(e) => set("epk_contact_email", e.target.value)}
            type="email"
            className="admin-input"
            placeholder="band@example.com"
          />
        </Field>
      </Section>

      {error && <p className="text-sm" style={{ color: "#f87171" }}>{error}</p>}

      <button
        type="submit"
        disabled={saving || uploading}
        className="px-6 py-2.5 rounded-xl text-sm font-semibold disabled:opacity-60"
        style={{
          background: saved
            ? "rgba(34,197,94,0.15)"
            : "linear-gradient(180deg, rgba(214,178,94,0.95), rgba(185,151,68,0.95))",
          color: saved ? "#4ade80" : "#1b1408",
          border: saved ? "1px solid rgba(34,197,94,0.2)" : "none",
        }}
      >
        {saving ? "Saving…" : saved ? "Saved ✓" : "Save EPK"}
      </button>
    </form>
  );
}

function Section({ title, hint, children }: { title: string; hint?: string; children: React.ReactNode }) {
  return (
    <div
      className="rounded-2xl p-6 space-y-5"
      style={{ background: "rgba(18,18,20,0.85)", border: "1px solid rgba(255,255,255,0.07)" }}
    >
      <div>
        <p className="text-[10px] font-semibold tracking-widest uppercase" style={{ color: "rgba(242,239,233,0.35)" }}>
          {title}
        </p>
        {hint && (
          <p className="text-xs mt-1" style={{ color: "rgba(242,239,233,0.28)" }}>{hint}</p>
        )}
      </div>
      {children}
    </div>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-medium" style={{ color: "rgba(242,239,233,0.5)" }}>
        {label}
      </label>
      {children}
      {hint && (
        <p className="text-[11px]" style={{ color: "rgba(242,239,233,0.25)" }}>{hint}</p>
      )}
    </div>
  );
}
