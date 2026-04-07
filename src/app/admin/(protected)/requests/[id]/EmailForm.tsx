"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  leadId: string;
  clientEmail: string;
  clientName: string;
}

export function EmailForm({ leadId, clientEmail, clientName }: Props) {
  const router = useRouter();
  const [subject, setSubject] = useState(`Following up on your booking request — ZikoFranco`);
  const [body, setBody] = useState(`Hi ${clientName},\n\nThank you for reaching out! \n\n— The ZikoFranco Team\nzikofranco.com`);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function handleSend() {
    if (!subject.trim() || !body.trim()) return;
    setSending(true);
    setError("");

    try {
      const res = await fetch(`/api/admin/requests/${leadId}/email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject, body }),
      });

      const data = (await res.json()) as { ok: boolean; error?: string };
      if (!data.ok) throw new Error(data.error ?? "Failed to send");

      setSent(true);
      router.refresh();
      setTimeout(() => setSent(false), 3000);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Send failed");
    } finally {
      setSending(false);
    }
  }

  return (
    <div
      className="rounded-2xl p-6 space-y-4"
      style={{ background: "rgba(18,18,20,0.85)", border: "1px solid rgba(255,255,255,0.07)" }}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-semibold tracking-widest uppercase" style={{ color: "rgba(242,239,233,0.4)" }}>
          Send Email
        </h2>
        <span className="text-xs" style={{ color: "rgba(242,239,233,0.35)" }}>→ {clientEmail}</span>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-medium" style={{ color: "rgba(242,239,233,0.5)" }}>Subject</label>
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full rounded-xl px-3 py-2.5 text-sm outline-none"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            color: "#f2efe9",
          }}
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-medium" style={{ color: "rgba(242,239,233,0.5)" }}>Message</label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={7}
          className="w-full rounded-xl px-3 py-2.5 text-sm outline-none resize-none font-mono"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            color: "#f2efe9",
          }}
        />
      </div>

      {error && <p className="text-xs" style={{ color: "#f87171" }}>{error}</p>}

      <button
        onClick={handleSend}
        disabled={sending || !subject.trim() || !body.trim()}
        className="px-5 py-2.5 rounded-xl text-sm font-semibold transition disabled:opacity-60"
        style={{
          background: sent
            ? "rgba(34,197,94,0.2)"
            : "linear-gradient(180deg, rgba(214,178,94,0.95), rgba(185,151,68,0.95))",
          color: sent ? "#4ade80" : "#1b1408",
        }}
      >
        {sending ? "Sending…" : sent ? "Sent ✓" : "Send Email"}
      </button>
    </div>
  );
}
