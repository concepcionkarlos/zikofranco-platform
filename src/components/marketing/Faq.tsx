type FaqItem = { q: string; a: string };

/** Accordion FAQ + FAQPage structured data for Google. */
export function Faq({ label, heading, items }: { label: string; heading: string; items: FaqItem[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };

  return (
    <div className="space-y-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div>
        <p className="text-[11px] tracking-[0.22em] uppercase font-semibold" style={{ color: "#d6b25e" }}>{label}</p>
        <h2 className="text-2xl font-bold mt-1 tracking-tight">{heading}</h2>
      </div>
      <div className="space-y-2">
        {items.map(({ q, a }) => (
          <details key={q} className="group rounded-xl"
            style={{ background: "rgba(18,18,20,0.7)", border: "1px solid rgba(255,255,255,0.07)" }}>
            <summary className="cursor-pointer list-none px-5 py-4 flex items-center justify-between gap-4 font-semibold text-sm sm:text-base"
              style={{ color: "#f2efe9" }}>
              {q}
              <span className="shrink-0 text-lg leading-none transition-transform group-open:rotate-45" style={{ color: "#d6b25e" }} aria-hidden>+</span>
            </summary>
            <p className="px-5 pb-5 -mt-1 text-sm leading-relaxed" style={{ color: "rgba(242,239,233,0.65)" }}>{a}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
