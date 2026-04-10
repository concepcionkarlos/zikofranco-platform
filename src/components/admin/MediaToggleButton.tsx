"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  id: string;
  field: "isVisible" | "isFeatured";
  value: boolean;
  labels?: [string, string]; // [on, off]
}

export function MediaToggleButton({ id, field, value, labels }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [current, setCurrent] = useState(value);

  const [onLabel, offLabel] = labels ?? ["Visible", "Hidden"];

  async function toggle() {
    setLoading(true);
    const res = await fetch(`/api/admin/media/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ [field]: !current }),
    });
    const data = (await res.json()) as { ok: boolean };
    if (data.ok) {
      setCurrent((v) => !v);
      router.refresh();
    }
    setLoading(false);
  }

  return (
    <button
      onClick={toggle}
      disabled={loading}
      className="text-xs px-3 py-2.5 rounded-full font-medium transition disabled:opacity-50 whitespace-nowrap"
      style={{
        background: current ? "rgba(59,130,246,0.12)" : "rgba(255,255,255,0.04)",
        color: current ? "#60a5fa" : "rgba(242,239,233,0.35)",
        border: `1px solid ${current ? "rgba(59,130,246,0.25)" : "rgba(255,255,255,0.07)"}`,
      }}
    >
      {current ? onLabel : offLabel}
    </button>
  );
}
