import type { MetadataRoute } from "next";
import { SITE_URL } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: { path: string; priority: number; changeFrequency: "weekly" | "monthly" }[] = [
    { path: "", priority: 1, changeFrequency: "weekly" },
    { path: "/show", priority: 0.9, changeFrequency: "monthly" },
    { path: "/booking", priority: 0.9, changeFrequency: "monthly" },
    { path: "/shows", priority: 0.7, changeFrequency: "weekly" },
    { path: "/epk", priority: 0.7, changeFrequency: "monthly" },
    { path: "/media", priority: 0.5, changeFrequency: "monthly" },
    { path: "/merch", priority: 0.4, changeFrequency: "monthly" },
  ];
  return pages.map(({ path, priority, changeFrequency }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));
}
