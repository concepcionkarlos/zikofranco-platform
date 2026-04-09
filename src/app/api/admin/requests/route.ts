/**
 * GET  /api/admin/requests — paginated, filtered, sorted lead list
 * POST /api/admin/requests — create a manual booking request from admin
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

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as {
      fullName: string;
      email: string;
      phone?: string;
      eventType: string;
      budgetRange?: string;
      message?: string;
      internalNotes?: string;
    };

    if (!body.fullName?.trim() || !body.email?.trim() || !body.eventType?.trim()) {
      return NextResponse.json(
        { ok: false, error: "fullName, email, and eventType are required" },
        { status: 400 },
      );
    }

    const lead = await prisma.lead.create({
      data: {
        fullName: body.fullName.trim(),
        email: body.email.trim().toLowerCase(),
        phone: body.phone?.trim() || null,
        eventType: body.eventType.trim(),
        budgetRange: body.budgetRange?.trim() || null,
        message: body.message?.trim() || null,
        internalNotes: body.internalNotes?.trim() || null,
        status: "NEW",
        activities: {
          create: {
            type: "CREATED",
            content: "Request created manually from admin",
          },
        },
      },
    });

    return NextResponse.json({ ok: true, data: lead }, { status: 201 });
  } catch (err) {
    console.error("Create request error:", err);
    return NextResponse.json(
      { ok: false, error: "Server error" },
      { status: 500 },
    );
  }
}
