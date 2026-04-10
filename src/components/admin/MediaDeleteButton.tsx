"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function MediaDeleteButton({ id }: { id: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!confirm("Delete this media item permanently?")) return;
    setLoading(true);
    const res = await fetch(`/api/admin/media/${id}`, { method: "DELETE" });
    const data = (await res.json()) as { ok: boolean };
    if (data.ok) router.refresh();
    else setLoading(false);
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="text-xs px-3 py-2.5 rounded-lg transition disabled:opacity-50"
      style={{
        background: "rgba(239,68,68,0.08)",
        color: "rgba(248,113,113,0.65)",
        border: "1px solid rgba(239,68,68,0.15)",
      }}
    >
      {loading ? "…" : "Delete"}
    </button>
  );
}
