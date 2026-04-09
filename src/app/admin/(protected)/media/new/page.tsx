"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NewMediaPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [preview, setPreview] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    title: "",
    type: "PHOTO",
    url: "",
    isVisible: true,
    isFeatured: false,
  });

  function set<K extends keyof typeof form>(field: K, value: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    // local preview
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
    const res = await fetch("/api/admin/media", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = (await res.json()) as { ok: boolean; error?: string };
    if (!data.ok) {
      setError(data.error ?? "Failed to create.");
      setSaving(false);
      return;
    }
    router.push("/admin/media");
    router.refresh();
  }

  return (
    <div className="space-y-6 max-w-xl">
      <div>
        <Link
          href="/admin/media"
          className="text-xs mb-3 inline-block hover:opacity-60 transition-opacity"
          style={{ color: "rgba(242,239,233,0.4)" }}
        >
          ← Media
        </Link>
        <h1 className="text-2xl font-bold tracking-tight">Add Media</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div
          className="rounded-2xl p-6 space-y-5"
          style={{ background: "rgba(18,18,20,0.85)", border: "1px solid rgba(255,255,255,0.07)" }}
        >
          <Field label="Title *">
            <input
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
              placeholder="e.g. Live at Ball & Chain"
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
            <Field label="Upload Photo">
              <div
                className="relative rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-2 cursor-pointer transition"
                style={{
                  borderColor: "rgba(255,255,255,0.12)",
                  minHeight: preview ? 0 : 120,
                  padding: preview ? 0 : "24px 16px",
                }}
                onClick={() => fileRef.current?.click()}
              >
                {preview ? (
                  <div className="relative w-full rounded-xl overflow-hidden" style={{ height: 200 }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                    <div
                      className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition cursor-pointer"
                      style={{ background: "rgba(0,0,0,0.55)" }}
                      onClick={(e) => { e.stopPropagation(); fileRef.current?.click(); }}
                    >
                      <span className="text-sm font-medium" style={{ color: "#f2efe9" }}>
                        Change photo
                      </span>
                    </div>
                  </div>
                ) : (
                  <>
                    <span className="text-2xl" style={{ opacity: 0.4 }}>📷</span>
                    <p className="text-sm" style={{ color: "rgba(242,239,233,0.45)" }}>
                      {uploading ? "Uploading…" : "Click to upload a photo"}
                    </p>
                    <p className="text-xs" style={{ color: "rgba(242,239,233,0.25)" }}>
                      JPG, PNG, WEBP · max 10 MB
                    </p>
                  </>
                )}
                {uploading && (
                  <div
                    className="absolute inset-0 flex items-center justify-center rounded-xl"
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

          <Field label={form.type === "VIDEO" ? "Embed URL *" : "Image URL (or upload above)"}>
            <input
              value={form.url}
              onChange={(e) => set("url", e.target.value)}
              placeholder={
                form.type === "VIDEO"
                  ? "https://youtube.com/embed/..."
                  : "https://example.com/photo.jpg"
              }
              required
              className="admin-input"
            />
            <p className="text-xs mt-1" style={{ color: "rgba(242,239,233,0.3)" }}>
              {form.type === "VIDEO"
                ? "Use a YouTube or Vimeo embed URL"
                : "Auto-filled after upload, or paste a direct image URL"}
            </p>
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
              background: "linear-gradient(180deg, rgba(214,178,94,0.95), rgba(185,151,68,0.95))",
              color: "#1b1408",
            }}
          >
            {saving ? "Saving…" : "Add Media"}
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
