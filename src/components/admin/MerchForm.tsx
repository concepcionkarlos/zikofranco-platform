"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

interface MerchData {
  id?: string;
  name?: string;
  price?: number;
  description?: string;
  image?: string;
  category?: string;
  inStock?: boolean;
  isVisible?: boolean;
}

interface Props {
  initial?: MerchData;
  mode: "create" | "edit";
}

const CATEGORIES = ["Apparel", "Accessories", "Print", "Music", "Other"];

export function MerchForm({ initial = {}, mode }: Props) {
  const router = useRouter();
  const [form, setForm] = useState({
    name: initial.name ?? "",
    price: initial.price?.toString() ?? "",
    description: initial.description ?? "",
    image: initial.image ?? "",
    category: initial.category ?? "",
    inStock: initial.inStock ?? true,
    isVisible: initial.isVisible ?? true,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function set(field: string, value: string | boolean) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const url = mode === "edit" ? `/api/admin/merch/${initial.id}` : "/api/admin/merch";
      const method = mode === "edit" ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          price: parseFloat(form.price),
          category: form.category || null,
        }),
      });

      const data = (await res.json()) as { ok: boolean; error?: string };
      if (!data.ok) throw new Error(data.error ?? "Save failed");

      router.push("/admin/merch");
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
          <label className="text-xs font-medium" style={{ color: "rgba(242,239,233,0.55)" }}>Item Name *</label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
            placeholder="Shadow Hoodie"
            className="w-full rounded-xl px-4 py-2.5 text-sm outline-none"
            style={inputStyle}
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium" style={{ color: "rgba(242,239,233,0.55)" }}>Price (USD) *</label>
          <input
            type="number"
            required
            min="0"
            step="0.01"
            value={form.price}
            onChange={(e) => set("price", e.target.value)}
            placeholder="75.00"
            className="w-full rounded-xl px-4 py-2.5 text-sm outline-none"
            style={inputStyle}
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium" style={{ color: "rgba(242,239,233,0.55)" }}>Category</label>
          <select
            value={form.category}
            onChange={(e) => set("category", e.target.value)}
            className="w-full rounded-xl px-4 py-2.5 text-sm outline-none"
            style={inputStyle}
          >
            <option value="" style={{ background: "#111113" }}>None</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c} style={{ background: "#111113" }}>{c}</option>
            ))}
          </select>
        </div>

        <div className="col-span-2 space-y-1.5">
          <label className="text-xs font-medium" style={{ color: "rgba(242,239,233,0.55)" }}>Description</label>
          <textarea
            value={form.description}
            onChange={(e) => set("description", e.target.value)}
            rows={3}
            placeholder="Short product description…"
            className="w-full rounded-xl px-4 py-2.5 text-sm outline-none resize-none"
            style={inputStyle}
          />
        </div>

        <div className="col-span-2 space-y-1.5">
          <label className="text-xs font-medium" style={{ color: "rgba(242,239,233,0.55)" }}>Image Path or URL</label>
          <input
            type="text"
            value={form.image}
            onChange={(e) => set("image", e.target.value)}
            placeholder="/assets/merch/hoodie.png or https://…"
            className="w-full rounded-xl px-4 py-2.5 text-sm outline-none"
            style={inputStyle}
          />
        </div>

        {/* Toggles */}
        <div className="col-span-2 flex gap-6">
          <label className="flex items-center gap-3 cursor-pointer">
            <button
              type="button"
              onClick={() => set("inStock", !form.inStock)}
              className="w-9 h-5 rounded-full transition-colors relative"
              style={{ background: form.inStock ? "rgba(34,197,94,0.6)" : "rgba(255,255,255,0.1)" }}
            >
              <span
                className="absolute top-0.5 w-4 h-4 rounded-full transition-all"
                style={{
                  background: "#fff",
                  left: form.inStock ? "calc(100% - 18px)" : "2px",
                }}
              />
            </button>
            <span className="text-sm" style={{ color: "rgba(242,239,233,0.65)" }}>In stock</span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <button
              type="button"
              onClick={() => set("isVisible", !form.isVisible)}
              className="w-9 h-5 rounded-full transition-colors relative"
              style={{ background: form.isVisible ? "rgba(59,130,246,0.6)" : "rgba(255,255,255,0.1)" }}
            >
              <span
                className="absolute top-0.5 w-4 h-4 rounded-full transition-all"
                style={{
                  background: "#fff",
                  left: form.isVisible ? "calc(100% - 18px)" : "2px",
                }}
              />
            </button>
            <span className="text-sm" style={{ color: "rgba(242,239,233,0.65)" }}>Visible on site</span>
          </label>
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
          {saving ? "Saving…" : mode === "edit" ? "Save Changes" : "Create Item"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/merch")}
          className="px-5 py-2.5 rounded-xl text-sm transition"
          style={{ background: "rgba(255,255,255,0.05)", color: "rgba(242,239,233,0.6)" }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
