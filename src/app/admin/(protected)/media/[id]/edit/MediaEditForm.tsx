"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface MediaItem {
  id: string;
  title: string;
  type: string;
  url: string;
  isVisible: boolean;
  isFeatured: boolean;
}

export function MediaEditForm({ item }: { item: MediaItem }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    title: item.title,
    type: item.type,
    url: item.url,
    isVisible: item.isVisible,
    isFeatured: item.isFeatured,
  });
  const [preview, setPreview] = useState(item.url);
  const fileRef = useRef<HTMLInputElement>(null);

  function set<K extends keyof typeof form>(field: K, value: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    setUploading(true);
    setError("");

    const fd = new FormData();
    fd.append("file", file);

    const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
    const data = (await res.json()) as { ok: boolean; url?: string; error?: string };

    if (!data.ok || !data.url) {
      setError(data.error ?? "Upload failed.");
      setUploading(false);
      return;
    }

    set("url", data.url);
    setPreview(data.url);
    setUploading(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title || !form.url) {
      setError("Title and URL are required.");
      return;
    }
    setSaving(true);
    setError("");
    const res = await fetch(`/api/admin/media/${item.id}`, {
      method: "PATCH",
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
    setTimeout(() => setSaved(false), 2000);
    setSaving(false);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div
        className="rounded-2xl p-6 space-y-5"
        style={{ background: "rgba(18,18,20,0.85)", border: "1px solid rgba(255,255,255,0.07)" }}
      >
        <Field label="Title *">
          <input
            value={form.title}
            onChange={(e) => set("title", e.target.value)}
            required
            className="admin-input"
          />
        </Field>

        <Field label="Type">
          <select
            value={form.type}
            onChange={(e) => set("type", e.target.value)}
            className="admin-input"
          >
            <option value="PHOTO">Photo</option>
            <option value="VIDEO">Video / Embed</option>
          </select>
        </Field>

        {/* File upload — only for photos */}
        {form.type === "PHOTO" && (
          <Field label="Photo">
            <div
              className="relative rounded-xl overflow-hidden cursor-pointer"
              style={{ height: 200, background: "rgba(0,0,0,0.3)" }}
              onClick={() => fileRef.current?.click()}
            >
              {preview ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={preview}
                  alt={form.title}
                  className="w-full h-full object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).style.opacity = "0.2"; }}
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <span style={{ color: "rgba(242,239,233,0.3)" }}>No image</span>
                </div>
              )}
              <div
                className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition"
                style={{ background: "rgba(0,0,0,0.55)" }}
              >
                <span className="text-sm font-medium" style={{ color: "#f2efe9" }}>
                  {uploading ? "Uploading…" : "Change photo"}
                </span>
              </div>
              {uploading && (
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ background: "rgba(0,0,0,0.6)" }}
                >
                  <span className="text-sm" style={{ color: "#d6b25e" }}>Uploading…</span>
                </div>
              )}
            </div>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </Field>
        )}

        <Field label={form.type === "VIDEO" ? "Embed URL *" : "Image URL"}>
          <input
            value={form.url}
            onChange={(e) => {
              set("url", e.target.value);
              if (form.type === "PHOTO") setPreview(e.target.value);
            }}
            required
            className="admin-input"
          />
        </Field>

        <div className="flex gap-6">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={form.isVisible}
              onChange={(e) => set("isVisible", e.target.checked)}
              className="w-4 h-4 rounded"
            />
            <span className="text-sm" style={{ color: "rgba(242,239,233,0.6)" }}>
              Visible on site
            </span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={form.isFeatured}
              onChange={(e) => set("isFeatured", e.target.checked)}
              className="w-4 h-4 rounded"
            />
            <span className="text-sm" style={{ color: "rgba(242,239,233,0.6)" }}>
              Featured
            </span>
          </label>
        </div>
      </div>

      {error && <p className="text-sm" style={{ color: "#f87171" }}>{error}</p>}

      <div className="flex items-center gap-3">
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
          {saving ? "Saving…" : saved ? "Saved ✓" : "Save Changes"}
        </button>
        <Link
          href="/admin/media"
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
