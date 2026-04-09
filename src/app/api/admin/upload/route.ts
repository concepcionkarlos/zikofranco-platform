/**
 * POST /api/admin/upload
 * Uploads a file to Vercel Blob and returns the public URL.
 * Requires BLOB_READ_WRITE_TOKEN env var (set in Vercel dashboard → Storage → Blob).
 */

import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp", "image/avif"];
const MAX_BYTES = 10 * 1024 * 1024; // 10 MB

export async function POST(req: Request) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      { ok: false, error: "BLOB_READ_WRITE_TOKEN is not configured. Enable Vercel Blob in your Vercel dashboard." },
      { status: 503 },
    );
  }

  try {
    const form = await req.formData();
    const file = form.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json({ ok: false, error: "No file provided" }, { status: 400 });
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { ok: false, error: "Only images are allowed (jpg, png, gif, webp, avif)" },
        { status: 400 },
      );
    }

    if (file.size > MAX_BYTES) {
      return NextResponse.json(
        { ok: false, error: "File is too large (max 10 MB)" },
        { status: 400 },
      );
    }

    // Sanitize filename — keep extension, replace spaces/special chars
    const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
    const safe = file.name
      .replace(/\.[^/.]+$/, "") // remove extension
      .replace(/[^a-zA-Z0-9_-]/g, "-")
      .slice(0, 60);
    const filename = `media/${safe}-${Date.now()}.${ext}`;

    const blob = await put(filename, file, {
      access: "public",
      contentType: file.type,
    });

    return NextResponse.json({ ok: true, url: blob.url });
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json({ ok: false, error: "Upload failed" }, { status: 500 });
  }
}
