/**
 * GET /api/admin/dashboard
 * Returns summary counts for the dashboard cards.
 */

import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const [
      newCount,
      contactedCount,
      confirmedCount,
      archivedCount,
      upcomingShows,
      activeMerch,
    ] = await Promise.all([
      prisma.lead.count({ where: { status: "NEW" } }),
      prisma.lead.count({ where: { status: "CONTACTED" } }),
      prisma.lead.count({ where: { status: "CONFIRMED" } }),
      prisma.lead.count({ where: { status: "ARCHIVED" } }),
      prisma.show.count({
        where: {
          isArchived: false,
          status: { in: ["UPCOMING", "ANNOUNCED"] },
          date: { gte: new Date() },
        },
      }),
      prisma.merchItem.count({
        where: { isArchived: false, isVisible: true },
      }),
    ]);

    return NextResponse.json({
      ok: true,
      data: {
        newCount,
        contactedCount,
        confirmedCount,
        archivedCount,
        upcomingShows,
        activeMerch,
      },
    });
  } catch (err) {
    console.error("Dashboard error:", err);
    return NextResponse.json(
      { ok: false, error: "Server error" },
      { status: 500 },
    );
  }
}
