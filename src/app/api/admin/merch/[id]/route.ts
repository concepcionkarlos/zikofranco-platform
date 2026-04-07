/**
 * GET   /api/admin/merch/[id]
 * PATCH /api/admin/merch/[id]
 */

import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const item = await prisma.merchItem.findUnique({ where: { id } });
    if (!item) {
      return NextResponse.json(
        { ok: false, error: "Not found" },
        { status: 404 },
      );
    }
    return NextResponse.json({ ok: true, data: item });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Server error" },
      { status: 500 },
    );
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = (await req.json()) as {
      name?: string;
      price?: number;
      description?: string;
      image?: string;
      category?: string;
      inStock?: boolean;
      isVisible?: boolean;
      isArchived?: boolean;
    };

    const item = await prisma.merchItem.update({
      where: { id },
      data: {
        ...(body.name && { name: body.name.trim() }),
        ...(body.price !== undefined && { price: Number(body.price) }),
        ...(body.description !== undefined && {
          description: body.description.trim() || null,
        }),
        ...(body.image !== undefined && { image: body.image.trim() || null }),
        ...(body.category !== undefined && {
          category: body.category.trim() || null,
        }),
        ...(body.inStock !== undefined && { inStock: body.inStock }),
        ...(body.isVisible !== undefined && { isVisible: body.isVisible }),
        ...(body.isArchived !== undefined && { isArchived: body.isArchived }),
      },
    });

    return NextResponse.json({ ok: true, data: item });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Server error" },
      { status: 500 },
    );
  }
}
