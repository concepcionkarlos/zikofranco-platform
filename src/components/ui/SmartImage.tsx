import Image from "next/image";

/**
 * Fills its (relative) parent like the old absolute <img> tags, but resized and
 * converted to WebP/AVIF by Next.js. Local files and Vercel Blob uploads get optimized;
 * any other external URL pasted in the admin is shown as-is.
 */
function canOptimize(src: string): boolean {
  if (src.startsWith("/")) return true;
  try {
    return new URL(src).hostname.endsWith(".public.blob.vercel-storage.com");
  } catch {
    return false;
  }
}

export function SmartImage({ src, alt, sizes, className = "", priority }: {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      className={className}
      priority={priority}
      unoptimized={!canOptimize(src)}
    />
  );
}
