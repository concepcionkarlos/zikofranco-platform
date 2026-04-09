import { prisma } from "@/lib/db";
import { ContentForm } from "./ContentForm";

export const dynamic = "force-dynamic";

const DEFAULTS: Record<string, string> = {
  spotify_embed_url:
    "https://open.spotify.com/embed/artist/0xyaYBhWaHUExO14cfrdqL?utm_source=generator&theme=0",
  reply_from_name: "ZikoFranco",
  site_tagline: "Modern rock power fused with funk-forward groove and a Santana-inspired edge — built for big stages and unforgettable nights.",
};

export default async function ContentPage() {
  const rows = await prisma.siteContent.findMany();
  const stored = Object.fromEntries(rows.map((r) => [r.key, r.value]));
  const values = { ...DEFAULTS, ...stored };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Site Content</h1>
        <p className="text-sm mt-1" style={{ color: "rgba(242,239,233,0.45)" }}>
          Edit key content and settings that appear on the public site.
        </p>
      </div>
      <ContentForm values={values} />
    </div>
  );
}
