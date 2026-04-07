"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function MerchToggleButton({ id, isVisible }: { id: string; isVisible: boolean }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function toggle() {
    setLoading(true);
    await fetch(`/api/admin/merch/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isVisible: !isVisible }),
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
        background: isVisible ? "rgba(59,130,246,0.08)" : "rgba(255,255,255,0.04)",
        color: isVisible ? "#60a5fa" : "rgba(242,239,233,0.4)",
        border: `1px solid ${isVisible ? "rgba(59,130,246,0.2)" : "rgba(255,255,255,0.07)"}`,
      }}
    >
      {loading ? "…" : isVisible ? "Hide" : "Show"}
    </button>
  );
}
