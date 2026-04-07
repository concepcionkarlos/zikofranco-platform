/**
 * GET  /api/admin/shows — list all shows
 * POST /api/admin/shows — create a show
 */

import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { ShowStatus } from "@prisma/client";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const archived = searchParams.get("archived") === "true";

    const shows = await prisma.show.findMany({
      where: { isArchived: archived },
      orderBy: { date: "asc" },
    });

    return NextResponse.json({ ok: true, data: shows });
  } catch (err) {
    console.error("Shows list error:", err);
    return NextResponse.json(
      { ok: false, error: "Server error" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as {
      date?: string;
      venue?: string;
      city?: string;
      country?: string;
      type?: string;
      status?: string;
      ticketUrl?: string;
    };

    if (!body.date || !body.venue || !body.city || !body.type) {
      return NextResponse.json(
        { ok: false, error: "date, venue, city, and type are required" },
        { status: 400 },
      );
    }

    const show = await prisma.show.create({
      data: {
        date: new Date(body.date),
        venue: body.venue.trim(),
        city: body.city.trim(),
        country: body.country?.trim() ?? "US",
        type: body.type.trim(),
        status: (body.status as ShowStatus) ?? "UPCOMING",
        ticketUrl: body.ticketUrl?.trim() || null,
      },
    });

    return NextResponse.json({ ok: true, data: show }, { status: 201 });
  } catch (err) {
    console.error("Show create error:", err);
    return NextResponse.json(
      { ok: false, error: "Server error" },
      { status: 500 },
    );
  }
}
