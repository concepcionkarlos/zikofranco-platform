/**
 * GET  /api/admin/merch — list all merch items
 * POST /api/admin/merch — create a merch item
 */

import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const archived = searchParams.get("archived") === "true";

    const items = await prisma.merchItem.findMany({
      where: { isArchived: archived },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ ok: true, data: items });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Server error" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as {
      name?: string;
      price?: number;
      description?: string;
      image?: string;
      category?: string;
      inStock?: boolean;
      isVisible?: boolean;
    };

    if (!body.name?.trim() || body.price === undefined) {
      return NextResponse.json(
        { ok: false, error: "name and price are required" },
        { status: 400 },
      );
    }

    const item = await prisma.merchItem.create({
      data: {
        name: body.name.trim(),
        price: Number(body.price),
        description: body.description?.trim() || null,
        image: body.image?.trim() || null,
        category: body.category?.trim() || null,
        inStock: body.inStock ?? true,
        isVisible: body.isVisible ?? true,
      },
    });

    return NextResponse.json({ ok: true, data: item }, { status: 201 });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Server error" },
      { status: 500 },
    );
  }
}
