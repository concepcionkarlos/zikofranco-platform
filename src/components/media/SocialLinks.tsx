/**
 * src/components/media/SocialLinks.tsx
 * Muestra los links oficiales desde src/content/links.ts
 */
import { platformLinks } from "@/content/links";

export function SocialLinks() {
  return (
    <div className="flex flex-wrap gap-3">
      {platformLinks.map((item) => (
        <a
          key={item.label}
          href={item.href}
          target="_blank"
          rel="noreferrer"
          className="px-4 py-2 rounded-xl border border-white/15 text-white/90 hover:text-white hover:border-white/30 transition"
        >
          {item.label}
        </a>
      ))}
    </div>
  );
}
