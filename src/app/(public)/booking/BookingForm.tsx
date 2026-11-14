"use client";

import { useEffect, useRef, useState } from "react";

type FormState = {
  fullName: string;
  email: string;
  phone: string;
  eventType: string;
  eventDate: string;
  location: string;
  guestCount: string;
  showFormat: string;
  budgetRange: string;
  message: string;
  website: string; // honeypot
};

const initialState: FormState = {
  fullName: "",
  email: "",
  phone: "",
  eventType: "",
  eventDate: "",
  location: "",
  guestCount: "",
  showFormat: "",
  budgetRange: "",
  message: "",
  website: "",
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

function Field({ id, label, required, children }: { id: string; label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-xs font-semibold tracking-wide uppercase" style={{ color: "rgba(242,239,233,0.6)" }}>
        {label}{required && <span style={{ color: "#d6b25e" }} aria-hidden> *</span>}
      </label>
      {children}
    </div>
  );
}

export interface BookingT {
  label: string;
  heading: string;
  subtitle: string;
  fields: {
    fullName: string; email: string; phone: string; eventType: string; eventDate: string;
    location: string; guestCount: string; showFormat: string; budgetRange: string; message: string;
  };
  placeholders: { fullName: string; email: string; phone: string; location: string; guestCount: string; message: string };
  eventTypes: { select: string; private: string; corporate: string; festival: string; venue: string; wedding: string; other: string };
  formats: { select: string; one: string; two: string; full: string; unsure: string };
  budgets: { select: string; b1: string; b2: string; b3: string; b4: string; b5: string; unsure: string };
  submit: string;
  sending: string;
  respond: string;
  success: { heading: string; text: string; another: string };
  errors: { generic: string; network: string; email: string };
}

export function BookingForm({ t }: { t: BookingT }) {
  const [form, setForm] = useState<FormState>(initialState);
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);
  const [status, setStatus] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const startedAt = useRef<number>(0);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

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
          eventType: form.eventType,
          eventDate: form.eventDate,
          location: form.location.trim(),
          guestCount: form.guestCount.trim(),
          showFormat: form.showFormat,
          budgetRange: form.budgetRange,
          message: form.message.trim(),
          website: form.website,
          startedAt: startedAt.current,
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
        <p className="text-sm mt-2" style={{ color: "rgba(242,239,233,0.6)" }}>{t.subtitle}</p>
      </div>

      <div className="rounded-2xl p-7" style={{ background: "rgba(18,18,20,0.8)", border: "1px solid rgba(255,255,255,0.07)" }}>
        {status?.type === "success" ? (
          <div className="py-10 text-center space-y-3" role="status" aria-live="polite">
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
          <form onSubmit={onSubmit} className="space-y-5 relative">
            {/* Honeypot — hidden from people, bots fill it in */}
            <div aria-hidden className="absolute -left-[9999px] w-px h-px overflow-hidden">
              <label htmlFor="website">Website</label>
              <input id="website" name="website" tabIndex={-1} autoComplete="off" value={form.website} onChange={onChange} />
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <Field id="fullName" label={t.fields.fullName} required>
                <input id="fullName" name="fullName" value={form.fullName} onChange={onChange} autoComplete="name"
                  onFocus={() => setFocused("fullName")} onBlur={() => setFocused(null)} maxLength={120}
                  required style={getInputStyle("fullName")} placeholder={t.placeholders.fullName} />
              </Field>

              <Field id="email" label={t.fields.email} required>
                <input id="email" name="email" type="email" value={form.email} onChange={onChange} autoComplete="email"
                  onFocus={() => setFocused("email")} onBlur={() => setFocused(null)} maxLength={200}
                  required style={getInputStyle("email")} placeholder={t.placeholders.email} />
              </Field>

              <Field id="phone" label={t.fields.phone}>
                <input id="phone" name="phone" type="tel" value={form.phone} onChange={onChange} autoComplete="tel"
                  onFocus={() => setFocused("phone")} onBlur={() => setFocused(null)} maxLength={40}
                  style={getInputStyle("phone")} placeholder={t.placeholders.phone} />
              </Field>

              <Field id="eventType" label={t.fields.eventType} required>
                <Select id="eventType" value={form.eventType} onChange={onChange} required
                  style={getInputStyle("eventType")} onFocus={() => setFocused("eventType")} onBlur={() => setFocused(null)}
                  options={[
                    ["", t.eventTypes.select],
                    ["Wedding", t.eventTypes.wedding],
                    ["Private Event", t.eventTypes.private],
                    ["Corporate Event", t.eventTypes.corporate],
                    ["Festival", t.eventTypes.festival],
                    ["Venue Show", t.eventTypes.venue],
                    ["Other", t.eventTypes.other],
                  ]} />
              </Field>

              <Field id="eventDate" label={t.fields.eventDate}>
                <input id="eventDate" name="eventDate" type="date" value={form.eventDate} onChange={onChange}
                  onFocus={() => setFocused("eventDate")} onBlur={() => setFocused(null)}
                  style={{ ...getInputStyle("eventDate"), colorScheme: "dark" }} />
              </Field>

              <Field id="location" label={t.fields.location}>
                <input id="location" name="location" value={form.location} onChange={onChange} maxLength={160}
                  onFocus={() => setFocused("location")} onBlur={() => setFocused(null)}
                  style={getInputStyle("location")} placeholder={t.placeholders.location} />
              </Field>

              <Field id="guestCount" label={t.fields.guestCount}>
                <input id="guestCount" name="guestCount" inputMode="numeric" value={form.guestCount} onChange={onChange} maxLength={20}
                  onFocus={() => setFocused("guestCount")} onBlur={() => setFocused(null)}
                  style={getInputStyle("guestCount")} placeholder={t.placeholders.guestCount} />
              </Field>

              <Field id="showFormat" label={t.fields.showFormat}>
                <Select id="showFormat" value={form.showFormat} onChange={onChange}
                  style={getInputStyle("showFormat")} onFocus={() => setFocused("showFormat")} onBlur={() => setFocused(null)}
                  options={[
                    ["", t.formats.select],
                    ["1 Set (50 min)", t.formats.one],
                    ["2 Sets (~2 hours)", t.formats.two],
                    ["Full Show (3 hours)", t.formats.full],
                    ["Not sure", t.formats.unsure],
                  ]} />
              </Field>

              <div className="md:col-span-2">
                <Field id="budgetRange" label={t.fields.budgetRange}>
                  <Select id="budgetRange" value={form.budgetRange} onChange={onChange}
                    style={getInputStyle("budgetRange")} onFocus={() => setFocused("budgetRange")} onBlur={() => setFocused(null)}
                    options={[
                      ["", t.budgets.select],
                      ["Under $1,500", t.budgets.b1],
                      ["$1,500 – $3,000", t.budgets.b2],
                      ["$3,000 – $5,000", t.budgets.b3],
                      ["$5,000 – $8,000", t.budgets.b4],
                      ["$8,000+", t.budgets.b5],
                      ["Not sure", t.budgets.unsure],
                    ]} />
                </Field>
              </div>
            </div>

            <Field id="message" label={t.fields.message}>
              <textarea id="message" name="message" value={form.message} onChange={onChange} maxLength={4000}
                onFocus={() => setFocused("message")} onBlur={() => setFocused(null)}
                rows={5} style={{ ...getInputStyle("message"), resize: "none" }}
                placeholder={t.placeholders.message} />
            </Field>

            {status?.type === "error" && (
              <div role="alert" className="rounded-xl px-4 py-3 text-sm"
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
              <p className="text-xs mt-3" style={{ color: "rgba(242,239,233,0.5)" }}>{t.respond}</p>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}

function Select({ id, value, onChange, options, style, required, onFocus, onBlur }: {
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: [string, string][];
  style: React.CSSProperties;
  required?: boolean;
  onFocus: () => void;
  onBlur: () => void;
}) {
  return (
    <div className="relative">
      <select id={id} name={id} value={value} onChange={onChange} required={required} onFocus={onFocus} onBlur={onBlur}
        style={{ ...style, appearance: "none", paddingRight: "36px", cursor: "pointer" }}>
        {options.map(([v, label]) => (
          <option key={v} value={v} style={{ background: "#0c0c0e" }}>{label}</option>
        ))}
      </select>
      <svg className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" width="14" height="14"
        viewBox="0 0 24 24" fill="none" stroke="rgba(242,239,233,0.4)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </div>
  );
}
