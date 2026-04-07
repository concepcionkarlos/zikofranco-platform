/**
 * src/app/booking/page.tsx
 * Página pública de Booking con formulario.
 *
 * Qué hace:
 * - Muestra un formulario para capturar leads
 * - Envía los datos a POST /api/leads
 * - Muestra mensaje de éxito o error
 *
 * Próximo paso:
 * - Guardar en DB con Prisma y disparar n8n
 */

"use client";

import { useState } from "react";

type FormState = {
  fullName: string;
  email: string;
  phone: string;
  eventType: string;
  budgetRange: string;
  message: string;
};

const initialState: FormState = {
  fullName: "",
  email: "",
  phone: "",
  eventType: "",
  budgetRange: "",
  message: "",
};

export default function BookingPage() {
  const [form, setForm] = useState<FormState>(initialState);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  function onChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus(null);
    setLoading(true);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: form.fullName.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          eventType: form.eventType.trim(),
          budgetRange: form.budgetRange.trim(),
          message: form.message.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        setStatus({
          type: "error",
          text: data.error ?? "Something went wrong.",
        });
        return;
      }

      setStatus({
        type: "success",
        text: "Thanks! Your booking request was sent.",
      });
      setForm(initialState);
    } catch {
      setStatus({ type: "error", text: "Network error. Please try again." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold">Booking</h1>
        <p className="text-white/80 max-w-2xl">
          Send a booking request and we will reply with availability and next
          steps.
        </p>
      </div>

      <form
        onSubmit={onSubmit}
        className="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-4"
      >
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm text-white/80">Full Name *</label>
            <input
              name="fullName"
              value={form.fullName}
              onChange={onChange}
              required
              className="w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 outline-none focus:border-white/30"
              placeholder="Your full name"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-white/80">Email *</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={onChange}
              required
              className="w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 outline-none focus:border-white/30"
              placeholder="you@email.com"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-white/80">Phone</label>
            <input
              name="phone"
              value={form.phone}
              onChange={onChange}
              className="w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 outline-none focus:border-white/30"
              placeholder="+1 555 123 4567"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-white/80">Event Type *</label>
            <select
              name="eventType"
              value={form.eventType}
              onChange={onChange}
              required
              className="w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 outline-none focus:border-white/30"
            >
              <option value="">Select one</option>
              <option value="Private Event">Private Event</option>
              <option value="Corporate Event">Corporate Event</option>
              <option value="Festival">Festival</option>
              <option value="Venue Show">Venue Show</option>
              <option value="Wedding">Wedding</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-sm text-white/80">Budget Range</label>
            <input
              name="budgetRange"
              value={form.budgetRange}
              onChange={onChange}
              className="w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 outline-none focus:border-white/30"
              placeholder="$2,000 – $5,000"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-sm text-white/80">Message</label>
            <textarea
              name="message"
              value={form.message}
              onChange={onChange}
              rows={5}
              className="w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 outline-none focus:border-white/30"
              placeholder="Tell us the date, location, and what you need."
            />
          </div>
        </div>

        {status && (
          <div
            className={
              status.type === "success"
                ? "rounded-xl border border-green-500/30 bg-green-500/10 p-3 text-green-200"
                : "rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-red-200"
            }
          >
            {status.text}
          </div>
        )}

        <button
          disabled={loading}
          className="px-5 py-3 rounded-xl bg-[#B11226] hover:bg-[#D4142C] transition font-semibold disabled:opacity-60"
        >
          {loading ? "Sending..." : "Send Booking Request"}
        </button>
      </form>
    </section>
  );
}
