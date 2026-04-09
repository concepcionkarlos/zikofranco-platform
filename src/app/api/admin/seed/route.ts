/**
 * POST /api/admin/seed
 * One-time seeding of existing static merch + media items into DB.
 * Safe to call multiple times — only inserts if tables are empty.
 */

import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

const MERCH_ITEMS = [
  {
    name: "Shadow Hoodie",
    price: 75,
    description: "Washed fleece · Oversized · Black",
    image: "/assets/photos/861918D7-FA86-4F24-96CA-49B41DC8E6BB.PNG",
    category: "Apparel",
    inStock: true,
    isVisible: true,
  },
  {
    name: "Icon Tee",
    price: 35,
    description: "Heavyweight cotton · Black",
    image: "/assets/photos/D15BE316-3B84-41C7-855D-22A9BD44498E.PNG",
    category: "Apparel",
    inStock: true,
    isVisible: true,
  },
  {
    name: "Shadow Hoodie — Night Edition",
    price: 75,
    description: "Night edition · Glow print",
    image: "/assets/photos/77BFBC0D-0A88-43E6-8F4B-B32DA3CC2CC8.PNG",
    category: "Apparel",
    inStock: true,
    isVisible: true,
  },
  {
    name: "Signature Poster",
    price: 55,
    description: '18×24" giclée · Numbered · Signed',
    image: "/assets/photos/IMG_4962.PNG",
    category: "Print",
    inStock: true,
    isVisible: true,
  },
];

const MEDIA_ITEMS = [
  {
    title: "Studio Session",
    type: "PHOTO",
    url: "/assets/photos/7058E651-F966-492A-B4CB-7CC9ABF47D72.jpeg",
    isVisible: true,
    isFeatured: true,
  },
  {
    title: "No Quiero Olvidar — Single Release",
    type: "PHOTO",
    url: "/assets/photos/3D9375D5-ECBD-4D46-97AC-281F641F3A39_1_105_c.jpeg",
    isVisible: true,
    isFeatured: true,
  },
  {
    title: "Street Portrait",
    type: "PHOTO",
    url: "/assets/photos/8EE42BBD-1FFD-4CFE-BB20-E51BEDAA9586_1_105_c.jpeg",
    isVisible: true,
    isFeatured: false,
  },
  {
    title: "Street Photography",
    type: "PHOTO",
    url: "/assets/photos/35424917-3AE5-48BC-8510-48293DE82D3C_1_105_c.jpeg",
    isVisible: true,
    isFeatured: false,
  },
  {
    title: "Live Performance",
    type: "PHOTO",
    url: "/assets/photos/D122BCFA-B31C-4F97-919A-59D2738A8698.jpeg",
    isVisible: true,
    isFeatured: false,
  },
];

export async function POST() {
  try {
    const [existingMerch, existingMedia] = await Promise.all([
      prisma.merchItem.count(),
      prisma.mediaItem.count(),
    ]);

    const results: Record<string, number> = {};

    if (existingMerch === 0) {
      const created = await prisma.merchItem.createMany({ data: MERCH_ITEMS });
      results.merch = created.count;
    } else {
      results.merch = 0;
    }

    if (existingMedia === 0) {
      const created = await prisma.mediaItem.createMany({ data: MEDIA_ITEMS });
      results.media = created.count;
    } else {
      results.media = 0;
    }

    return NextResponse.json({
      ok: true,
      message: `Seeded: ${results.merch} merch items, ${results.media} media items`,
      results,
    });
  } catch (err) {
    console.error("Seed error:", err);
    return NextResponse.json({ ok: false, error: "Seed failed" }, { status: 500 });
  }
}
