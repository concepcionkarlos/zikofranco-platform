/**
 * GET /api/admin/content        — all site content key/value pairs
 * PUT /api/admin/content        — upsert one or more key/value pairs
 */

import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const rows = await prisma.siteContent.findMany();
    const data = Object.fromEntries(rows.map((r) => [r.key, r.value]));
    return NextResponse.json({ ok: true, data });
  } catch (err) {
    console.error("Content get error:", err);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = (await req.json()) as Record<string, string>;
    if (!body || typeof body !== "object") {
      return NextResponse.json({ ok: false, error: "Invalid payload" }, { status: 400 });
    }

    await Promise.all(
      Object.entries(body).map(([key, value]) =>
        prisma.siteContent.upsert({
          where: { key },
          create: { key, value },
          update: { value },
        }),
      ),
    );

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Content update error:", err);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}
