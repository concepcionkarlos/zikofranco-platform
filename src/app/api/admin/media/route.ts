/**
 * GET  /api/admin/media — list all media items
 * POST /api/admin/media — create a media item
 */

import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const filter = searchParams.get("filter") ?? "all"; // all | visible | featured

    const where =
      filter === "visible"
        ? { isVisible: true }
        : filter === "featured"
          ? { isFeatured: true }
          : {};

    const items = await prisma.mediaItem.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ ok: true, data: items });
  } catch (err) {
    console.error("Media list error:", err);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as {
      title: string;
      type?: string;
      url: string;
      isVisible?: boolean;
      isFeatured?: boolean;
    };

    if (!body.title?.trim() || !body.url?.trim()) {
      return NextResponse.json(
        { ok: false, error: "title and url are required" },
        { status: 400 },
      );
    }

    const item = await prisma.mediaItem.create({
      data: {
        title: body.title.trim(),
        type: body.type ?? "PHOTO",
        url: body.url.trim(),
        isVisible: body.isVisible ?? true,
        isFeatured: body.isFeatured ?? false,
      },
    });

    return NextResponse.json({ ok: true, data: item }, { status: 201 });
  } catch (err) {
    console.error("Media create error:", err);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}
