"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function MerchArchiveButton({ id, isArchived }: { id: string; isArchived: boolean }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function toggle() {
    if (!isArchived && !confirm("Archive this item?")) return;
    setLoading(true);
    await fetch(`/api/admin/merch/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isArchived: !isArchived }),
    });
    router.refresh();
    setLoading(false);
  }

  return (
    <button
      onClick={toggle}
      disabled={loading}
      className="text-xs px-3 py-1.5 rounded-lg transition disabled:opacity-50"
      style={{
        background: "rgba(255,255,255,0.04)",
        color: "rgba(242,239,233,0.4)",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      {loading ? "…" : isArchived ? "Restore" : "Archive"}
    </button>
  );
}
