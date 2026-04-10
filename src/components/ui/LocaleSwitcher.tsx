"use client";

const LOCALES = [
  { code: "en", flag: "🇺🇸", label: "EN" },
  { code: "es", flag: "🇪🇸", label: "ES" },
] as const;

export function LocaleSwitcher({ locale }: { locale: string }) {
  function setLocale(code: string) {
    document.cookie = `NEXT_LOCALE=${code};path=/;max-age=${60 * 60 * 24 * 365};SameSite=Lax`;
    window.location.reload();
  }

  return (
    <div
      className="flex items-center gap-0.5 rounded-lg p-0.5"
      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
    >
      {LOCALES.map(({ code, flag, label }) => {
        const active = locale === code;
        return (
          <button
            key={code}
            onClick={() => setLocale(code)}
            disabled={active}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-semibold transition-all"
            style={{
              background: active ? "rgba(214,178,94,0.15)" : "transparent",
              color: active ? "#d6b25e" : "rgba(242,239,233,0.38)",
              border: active ? "1px solid rgba(214,178,94,0.2)" : "1px solid transparent",
              cursor: active ? "default" : "pointer",
            }}
            aria-label={`Switch to ${label}`}
          >
            <span>{flag}</span>
            <span>{label}</span>
          </button>
        );
      })}
    </div>
  );
}
