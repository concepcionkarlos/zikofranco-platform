/**
 * POST /api/admin/login
 * Validates admin credentials and sets a signed HttpOnly session cookie.
 */

import { NextResponse } from "next/server";
import { timingSafeEqual } from "node:crypto";
import { createToken, TOKEN_COOKIE } from "@/lib/auth";
import { checkBotId } from "botid/server";

// Best-effort brute-force throttle per instance: 10 failed attempts per 15 min per IP.
const WINDOW_MS = 15 * 60 * 1000;
const MAX_FAILS = 10;
const fails = new Map<string, number[]>();

function recentFails(ip: string): number[] {
  const now = Date.now();
  const list = (fails.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  fails.set(ip, list);
  return list;
}

function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  return ab.length === bb.length && timingSafeEqual(ab, bb);
}

export async function POST(req: Request) {
  const verdict = await checkBotId();
  if (verdict.isBot) {
    return NextResponse.json({ ok: false, error: "Request blocked." }, { status: 403 });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (recentFails(ip).length >= MAX_FAILS) {
    return NextResponse.json(
      { ok: false, error: "Too many attempts. Try again in 15 minutes." },
      { status: 429 },
    );
  }

  try {
    const { email, password } = (await req.json()) as {
      email?: string;
      password?: string;
    };

    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
      return NextResponse.json(
        { ok: false, error: "Admin credentials not configured" },
        { status: 500 },
      );
    }

    if (
      email?.trim().toLowerCase() !== adminEmail.toLowerCase() ||
      !safeEqual(password ?? "", adminPassword)
    ) {
      recentFails(ip).push(Date.now());
      return NextResponse.json(
        { ok: false, error: "Invalid credentials" },
        { status: 401 },
      );
    }

    const token = await createToken(adminEmail);

    const res = NextResponse.json({ ok: true });
    res.cookies.set(TOKEN_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 8, // 8 hours
    });
    return res;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Server error" },
      { status: 500 },
    );
  }
}
