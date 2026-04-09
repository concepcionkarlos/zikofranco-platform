/**
 * GET    /api/admin/media/[id]
 * PATCH  /api/admin/media/[id]
 * DELETE /api/admin/media/[id]
 */

import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const item = await prisma.mediaItem.findUnique({ where: { id } });
    if (!item) return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
    return NextResponse.json({ ok: true, data: item });
  } catch (err) {
    console.error("Media get error:", err);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = (await req.json()) as {
      title?: string;
      type?: string;
      url?: string;
      isVisible?: boolean;
      isFeatured?: boolean;
    };

    const existing = await prisma.mediaItem.findUnique({ where: { id } });
    if (!existing) return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });

    const item = await prisma.mediaItem.update({
      where: { id },
      data: {
        ...(body.title !== undefined && { title: body.title.trim() }),
        ...(body.type !== undefined && { type: body.type }),
        ...(body.url !== undefined && { url: body.url.trim() }),
        ...(body.isVisible !== undefined && { isVisible: body.isVisible }),
        ...(body.isFeatured !== undefined && { isFeatured: body.isFeatured }),
      },
    });

    return NextResponse.json({ ok: true, data: item });
  } catch (err) {
    console.error("Media update error:", err);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const existing = await prisma.mediaItem.findUnique({ where: { id } });
    if (!existing) return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
    await prisma.mediaItem.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Media delete error:", err);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}
