/**
 * GET /api/admin/requests
 * Returns paginated, filtered, sorted lead list.
 */

import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { LeadStatus, Prisma } from "@prisma/client";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search")?.trim() ?? "";
    const status = searchParams.get("status") ?? "ALL";
    const sort = searchParams.get("sort") ?? "createdAt_desc";
    const page = Math.max(1, parseInt(searchParams.get("page") ?? "1"));
    const pageSize = 20;

    const where: Prisma.LeadWhereInput = {};

    if (status !== "ALL") {
      where.status = status as LeadStatus;
    }

    if (search) {
      where.OR = [
        { fullName: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
        { eventType: { contains: search, mode: "insensitive" } },
      ];
    }

    const [field, dir] = sort.split("_");
    const orderBy: Prisma.LeadOrderByWithRelationInput = {
      [field === "name" ? "fullName" : field ?? "createdAt"]:
        dir === "asc" ? "asc" : "desc",
    };

    const [leads, total] = await Promise.all([
      prisma.lead.findMany({
        where,
        orderBy,
        skip: (page - 1) * pageSize,
        take: pageSize,
        select: {
          id: true,
          fullName: true,
          email: true,
          phone: true,
          eventType: true,
          budgetRange: true,
          status: true,
          createdAt: true,
          updatedAt: true,
        },
      }),
      prisma.lead.count({ where }),
    ]);

    return NextResponse.json({
      ok: true,
      data: leads,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    });
  } catch (err) {
    console.error("Requests list error:", err);
    return NextResponse.json(
      { ok: false, error: "Server error" },
      { status: 500 },
    );
  }
}
