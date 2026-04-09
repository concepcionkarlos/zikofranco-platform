"use client";

interface Props {
  src: string;
  alt: string;
  className?: string;
}

export function MediaImagePreview({ src, alt, className }: Props) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={className ?? "w-full h-full object-cover"}
      onError={(e) => {
        (e.target as HTMLImageElement).style.display = "none";
      }}
    />
  );
}
