"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

const IS_DEV = process.env.NODE_ENV === "development";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState(IS_DEV ? "admin@zikofranco.com" : "");
  const [password, setPassword] = useState(IS_DEV ? "Admin1234!" : "");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = (await res.json()) as { ok: boolean; error?: string };

      if (!data.ok) {
        setError(data.error ?? "Invalid credentials");
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="min-h-screen flex overflow-hidden"
      style={{ background: "#0a0a0b" }}
    >
      {/* ── Left panel — decorative ────────────────────────────────── */}
      <div
        className="hidden lg:flex lg:w-1/2 flex-col justify-between p-14 relative overflow-hidden"
        style={{
          background: "linear-gradient(145deg, #0d0d0f 0%, #111113 100%)",
          borderRight: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        {/* Background grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(214,178,94,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(214,178,94,0.03) 1px, transparent 1px)
            `,
            backgroundSize: "48px 48px",
          }}
        />

        {/* Radial glow top-right */}
        <div
          className="absolute -top-32 -right-32 w-96 h-96 rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(214,178,94,0.08) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />

        {/* Radial glow bottom-left */}
        <div
          className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(122,28,28,0.12) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />

        {/* Brand mark */}
        <div className="relative">
          <div className="flex items-baseline gap-3">
            <span
              className="text-5xl font-extrabold tracking-tighter"
              style={{ color: "#d6b25e" }}
            >
              ZF
            </span>
            <span
              className="text-xs font-semibold tracking-[0.3em] uppercase"
              style={{ color: "rgba(242,239,233,0.25)" }}
            >
              Control Panel
            </span>
          </div>
        </div>

        {/* Center quote */}
        <div className="relative space-y-5">
          <div
            className="w-10 h-px"
            style={{ background: "rgba(214,178,94,0.4)" }}
          />
          <p
            className="text-2xl font-light leading-relaxed"
            style={{ color: "rgba(242,239,233,0.75)" }}
          >
            Manage bookings,<br />
            shows & merch —<br />
            <span style={{ color: "#d6b25e" }}>all in one place.</span>
          </p>
          <p
            className="text-xs tracking-widest uppercase"
            style={{ color: "rgba(242,239,233,0.2)" }}
          >
            ZikoFranco · Miami, FL
          </p>
        </div>

        {/* Bottom status pills */}
        <div className="relative flex gap-3 flex-wrap">
          {["Booking Requests", "Show Schedule", "Merch Catalog"].map((label) => (
            <span
              key={label}
              className="text-[10px] px-3 py-1.5 rounded-full tracking-wide"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "rgba(242,239,233,0.35)",
              }}
            >
              {label}
            </span>
          ))}
        </div>
      </div>

      {/* ── Right panel — login form ────────────────────────────────── */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 py-12 relative">
        {/* Subtle top glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse, rgba(214,178,94,0.06) 0%, transparent 70%)",
            filter: "blur(20px)",
          }}
        />

        <div className="w-full max-w-[360px] relative">

          {/* Mobile-only brand */}
          <div className="lg:hidden text-center mb-10">
            <span className="text-3xl font-extrabold tracking-tighter" style={{ color: "#d6b25e" }}>ZF</span>
            <span className="ml-2 text-xs tracking-[0.25em] uppercase" style={{ color: "rgba(242,239,233,0.3)" }}>Admin</span>
          </div>

          {/* Heading */}
          <div className="mb-8">
            <h1
              className="text-2xl font-bold tracking-tight"
              style={{ color: "#f2efe9" }}
            >
              Welcome back
            </h1>
            <p className="text-sm mt-1" style={{ color: "rgba(242,239,233,0.4)" }}>
              Sign in to your admin panel
            </p>
          </div>

          {/* Dev badge */}
          {IS_DEV && (
            <div
              className="mb-6 flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs"
              style={{
                background: "rgba(214,178,94,0.06)",
                border: "1px solid rgba(214,178,94,0.12)",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full shrink-0"
                style={{ background: "#d6b25e" }}
              />
              <span style={{ color: "rgba(214,178,94,0.7)" }}>
                Dev mode · credentials pre-filled from <code>.env</code>
              </span>
            </div>
          )}

          {/* Error */}
          {error && (
            <div
              className="mb-5 flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm"
              style={{
                background: "rgba(239,68,68,0.08)",
                border: "1px solid rgba(239,68,68,0.2)",
                color: "#f87171",
              }}
            >
              <span>⚠</span> {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email field */}
            <div className="space-y-1.5">
              <label
                className="text-xs font-medium tracking-wide"
                style={{ color: "rgba(242,239,233,0.45)" }}
              >
                Email address
              </label>
              <div
                className="relative rounded-xl transition-all"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: `1px solid ${focused === "email" ? "rgba(214,178,94,0.35)" : "rgba(255,255,255,0.08)"}`,
                  boxShadow: focused === "email" ? "0 0 0 3px rgba(214,178,94,0.06)" : "none",
                }}
              >
                <input
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocused("email")}
                  onBlur={() => setFocused(null)}
                  className="w-full bg-transparent px-4 py-3 text-sm outline-none"
                  style={{ color: "#f2efe9" }}
                  placeholder="admin@zikofranco.com"
                />
              </div>
            </div>

            {/* Password field */}
            <div className="space-y-1.5">
              <label
                className="text-xs font-medium tracking-wide"
                style={{ color: "rgba(242,239,233,0.45)" }}
              >
                Password
              </label>
              <div
                className="relative rounded-xl transition-all"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: `1px solid ${focused === "password" ? "rgba(214,178,94,0.35)" : "rgba(255,255,255,0.08)"}`,
                  boxShadow: focused === "password" ? "0 0 0 3px rgba(214,178,94,0.06)" : "none",
                }}
              >
                <input
                  type="password"
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocused("password")}
                  onBlur={() => setFocused(null)}
                  className="w-full bg-transparent px-4 py-3 text-sm outline-none"
                  style={{ color: "#f2efe9" }}
                  placeholder="••••••••••"
                />
              </div>
            </div>

            {/* Submit */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="relative w-full py-3 rounded-xl text-sm font-bold tracking-wide transition-all disabled:cursor-not-allowed overflow-hidden group"
                style={{
                  background: loading
                    ? "rgba(214,178,94,0.3)"
                    : "linear-gradient(135deg, #d6b25e 0%, #b99744 50%, #d6b25e 100%)",
                  backgroundSize: "200% 100%",
                  color: loading ? "rgba(27,20,8,0.5)" : "#1b1408",
                }}
              >
                {/* Shimmer on hover */}
                <span
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    background: "linear-gradient(135deg, transparent 30%, rgba(255,255,255,0.15) 50%, transparent 70%)",
                  }}
                />
                <span className="relative">
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <span
                        className="w-3.5 h-3.5 rounded-full border-2 border-current border-t-transparent animate-spin"
                      />
                      Signing in…
                    </span>
                  ) : (
                    "Sign in →"
                  )}
                </span>
              </button>
            </div>
          </form>

          {/* Back link */}
          <div className="mt-8 text-center">
            <a
              href="/"
              className="text-xs transition-colors hover:opacity-70"
              style={{ color: "rgba(242,239,233,0.2)" }}
            >
              ← Back to zikofranco.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
