/**
 * GET    /api/admin/shows/[id]
 * PATCH  /api/admin/shows/[id]
 */

import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { ShowStatus } from "@prisma/client";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const show = await prisma.show.findUnique({ where: { id } });
    if (!show) {
      return NextResponse.json(
        { ok: false, error: "Not found" },
        { status: 404 },
      );
    }
    return NextResponse.json({ ok: true, data: show });
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
      date?: string;
      venue?: string;
      city?: string;
      country?: string;
      type?: string;
      status?: string;
      ticketUrl?: string;
      isArchived?: boolean;
    };

    const show = await prisma.show.update({
      where: { id },
      data: {
        ...(body.date && { date: new Date(body.date) }),
        ...(body.venue && { venue: body.venue.trim() }),
        ...(body.city && { city: body.city.trim() }),
        ...(body.country !== undefined && { country: body.country.trim() }),
        ...(body.type && { type: body.type.trim() }),
        ...(body.status && { status: body.status as ShowStatus }),
        ...(body.ticketUrl !== undefined && {
          ticketUrl: body.ticketUrl.trim() || null,
        }),
        ...(body.isArchived !== undefined && { isArchived: body.isArchived }),
      },
    });

    return NextResponse.json({ ok: true, data: show });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Server error" },
      { status: 500 },
    );
  }
}
