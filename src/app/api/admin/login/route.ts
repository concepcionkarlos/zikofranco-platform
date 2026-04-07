/**
 * POST /api/admin/login
 * Validates admin credentials and sets a signed HttpOnly session cookie.
 */

import { NextResponse } from "next/server";
import { createToken, TOKEN_COOKIE } from "@/lib/auth";

export async function POST(req: Request) {
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
      password !== adminPassword
    ) {
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
