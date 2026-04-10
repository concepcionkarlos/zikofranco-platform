/**
 * src/proxy.ts
 * 1. Protects all /admin/* routes — redirects unauthenticated users to /admin/login.
 * 2. Detects preferred language from Accept-Language on first visit (public routes only).
 */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken, TOKEN_COOKIE } from "@/lib/auth";

const SUPPORTED_LOCALES = ["en", "es"];
const DEFAULT_LOCALE = "en";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ── Admin auth ──────────────────────────────────────────────────────────
  if (pathname.startsWith("/admin")) {
    if (pathname === "/admin/login") return NextResponse.next();

    const token = request.cookies.get(TOKEN_COOKIE)?.value;
    if (!token || !(await verifyToken(token))) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  // ── Locale detection (public routes only) ───────────────────────────────
  const existing = request.cookies.get("NEXT_LOCALE")?.value;
  if (existing && SUPPORTED_LOCALES.includes(existing)) {
    return NextResponse.next();
  }

  const acceptLang = request.headers.get("accept-language") ?? "";
  const preferred = acceptLang
    .split(",")
    .map((tag) => tag.split(";")[0]?.trim().split("-")[0]?.toLowerCase() ?? "")
    .find((lang) => SUPPORTED_LOCALES.includes(lang));

  const locale = preferred ?? DEFAULT_LOCALE;

  const res = NextResponse.next();
  res.cookies.set("NEXT_LOCALE", locale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });
  return res;
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/((?!_next|api|favicon\\.ico|assets).*)",
  ],
};
