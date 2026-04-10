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

const inputStyle: React.CSSProperties = {
  background: "rgba(255,255,255,0.03)",
  border: "1px solid rgba(255,255,255,0.09)",
  color: "#f2efe9",
  borderRadius: "12px",
  padding: "12px 16px",
  width: "100%",
  outline: "none",
  fontSize: "14px",
  transition: "border-color 0.15s",
};

const inputFocusStyle: React.CSSProperties = {
  ...inputStyle,
  border: "1px solid rgba(214,178,94,0.45)",
};

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold tracking-wide uppercase" style={{ color: "rgba(242,239,233,0.4)" }}>
        {label}{required && <span style={{ color: "#d6b25e" }}> *</span>}
      </label>
      {children}
    </div>
  );
}

interface BookingT {
  label: string;
  heading: string;
  subtitle: string;
  fields: { fullName: string; email: string; phone: string; eventType: string; budgetRange: string; message: string };
  placeholders: { fullName: string; email: string; phone: string; budgetRange: string; message: string };
  eventTypes: { select: string; private: string; corporate: string; festival: string; venue: string; wedding: string; other: string };
  submit: string;
  sending: string;
  respond: string;
  success: { heading: string; text: string; another: string };
  errors: { generic: string; network: string };
}

export function BookingForm({ t }: { t: BookingT }) {
  const [form, setForm] = useState<FormState>(initialState);
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);
  const [status, setStatus] = useState<{ type: "success" | "error"; text: string } | null>(null);

  function onChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function getInputStyle(name: string) {
    return focused === name ? inputFocusStyle : inputStyle;
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
        setStatus({ type: "error", text: data.error ?? t.errors.generic });
        return;
      }
      setStatus({ type: "success", text: t.success.text });
      setForm(initialState);
    } catch {
      setStatus({ type: "error", text: t.errors.network });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="max-w-2xl mx-auto space-y-8">
      <div>
        <p className="text-[10px] tracking-[0.2em] uppercase font-semibold mb-1" style={{ color: "#d6b25e" }}>
          {t.label}
        </p>
        <h1 className="text-3xl font-extrabold tracking-tight" style={{ color: "#f2efe9" }}>
          {t.heading}
        </h1>
        <p className="text-sm mt-2" style={{ color: "rgba(242,239,233,0.45)" }}>{t.subtitle}</p>
      </div>

      <div className="rounded-2xl p-7" style={{ background: "rgba(18,18,20,0.8)", border: "1px solid rgba(255,255,255,0.07)" }}>
        {status?.type === "success" ? (
          <div className="py-10 text-center space-y-3">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center mx-auto"
              style={{ background: "rgba(214,178,94,0.1)", border: "1px solid rgba(214,178,94,0.2)" }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#d6b25e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h2 className="text-lg font-bold" style={{ color: "#f2efe9" }}>{t.success.heading}</h2>
            <p className="text-sm max-w-sm mx-auto" style={{ color: "rgba(242,239,233,0.5)" }}>{status.text}</p>
            <button
              onClick={() => setStatus(null)}
              className="mt-2 text-xs transition-opacity hover:opacity-60"
              style={{ color: "#d6b25e" }}
            >
              {t.success.another}
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-5">
            <div className="grid md:grid-cols-2 gap-5">
              <Field label={t.fields.fullName} required>
                <input name="fullName" value={form.fullName} onChange={onChange}
                  onFocus={() => setFocused("fullName")} onBlur={() => setFocused(null)}
                  required style={getInputStyle("fullName")} placeholder={t.placeholders.fullName} />
              </Field>

              <Field label={t.fields.email} required>
                <input name="email" type="email" value={form.email} onChange={onChange}
                  onFocus={() => setFocused("email")} onBlur={() => setFocused(null)}
                  required style={getInputStyle("email")} placeholder={t.placeholders.email} />
              </Field>

              <Field label={t.fields.phone}>
                <input name="phone" value={form.phone} onChange={onChange}
                  onFocus={() => setFocused("phone")} onBlur={() => setFocused(null)}
                  style={getInputStyle("phone")} placeholder={t.placeholders.phone} />
              </Field>

              <Field label={t.fields.eventType} required>
                <div className="relative">
                  <select name="eventType" value={form.eventType} onChange={onChange}
                    onFocus={() => setFocused("eventType")} onBlur={() => setFocused(null)}
                    required style={{ ...getInputStyle("eventType"), appearance: "none" as const, paddingRight: "36px", cursor: "pointer" }}>
                    <option value="" style={{ background: "#0c0c0e" }}>{t.eventTypes.select}</option>
                    <option value="Private Event" style={{ background: "#0c0c0e" }}>{t.eventTypes.private}</option>
                    <option value="Corporate Event" style={{ background: "#0c0c0e" }}>{t.eventTypes.corporate}</option>
                    <option value="Festival" style={{ background: "#0c0c0e" }}>{t.eventTypes.festival}</option>
                    <option value="Venue Show" style={{ background: "#0c0c0e" }}>{t.eventTypes.venue}</option>
                    <option value="Wedding" style={{ background: "#0c0c0e" }}>{t.eventTypes.wedding}</option>
                    <option value="Other" style={{ background: "#0c0c0e" }}>{t.eventTypes.other}</option>
                  </select>
                  <svg className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" width="14" height="14"
                    viewBox="0 0 24 24" fill="none" stroke="rgba(242,239,233,0.3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>
              </Field>

              <Field label={t.fields.budgetRange}>
                <input name="budgetRange" value={form.budgetRange} onChange={onChange}
                  onFocus={() => setFocused("budgetRange")} onBlur={() => setFocused(null)}
                  style={getInputStyle("budgetRange")} placeholder={t.placeholders.budgetRange} className="md:col-span-2" />
              </Field>
            </div>

            <Field label={t.fields.message}>
              <textarea name="message" value={form.message} onChange={onChange}
                onFocus={() => setFocused("message")} onBlur={() => setFocused(null)}
                rows={5} style={{ ...getInputStyle("message"), resize: "none" }}
                placeholder={t.placeholders.message} />
            </Field>

            {status?.type === "error" && (
              <div className="rounded-xl px-4 py-3 text-sm"
                style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.18)", color: "#f87171" }}>
                {status.text}
              </div>
            )}

            <div className="pt-1" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto px-8 py-3 rounded-xl text-sm font-bold tracking-wide transition-opacity disabled:opacity-50"
                style={{ background: "linear-gradient(135deg, #d6b25e, #b8973d)", color: "#0b0b0f" }}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                    </svg>
                    {t.sending}
                  </span>
                ) : t.submit}
              </button>
              <p className="text-xs mt-3" style={{ color: "rgba(242,239,233,0.25)" }}>{t.respond}</p>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
