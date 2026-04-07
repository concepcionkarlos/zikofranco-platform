import Image from "next/image";

type Photo = {
  src: string;
  alt: string;
  label: string;
  category: string;
};

const featured: Photo[] = [
  {
    src: "/assets/photos/7058E651-F966-492A-B4CB-7CC9ABF47D72.jpeg",
    alt: "ZikoFranco studio session",
    label: "Studio Session",
    category: "Photography",
  },
  {
    src: "/assets/photos/3D9375D5-ECBD-4D46-97AC-281F641F3A39_1_105_c.jpeg",
    alt: "No Quiero Olvidar — single release",
    label: "No Quiero Olvidar",
    category: "Single Release",
  },
];

const grid: Photo[] = [
  {
    src: "/assets/photos/8EE42BBD-1FFD-4CFE-BB20-E51BEDAA9586_1_105_c.jpeg",
    alt: "ZikoFranco street portrait",
    label: "Street Portrait",
    category: "Portrait",
  },
  {
    src: "/assets/photos/35424917-3AE5-48BC-8510-48293DE82D3C_1_105_c.jpeg",
    alt: "ZikoFranco street photography",
    label: "Street Photography",
    category: "Portrait",
  },
  {
    src: "/assets/photos/D122BCFA-B31C-4F97-919A-59D2738A8698.jpeg",
    alt: "ZikoFranco live performance",
    label: "Live Performance",
    category: "Performance",
  },
];

function PhotoCard({
  photo,
  className = "",
}: {
  photo: Photo;
  className?: string;
}) {
  return (
    <div className={`relative overflow-hidden rounded-2xl group cursor-pointer ${className}`}>
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
      />
      {/* Permanent subtle gradient at bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      {/* Label — always visible at bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
        <p className="text-[10px] tracking-[0.18em] uppercase text-gold font-semibold mb-1">
          {photo.category}
        </p>
        <p className="text-white font-semibold text-sm leading-tight">
          {photo.label}
        </p>
      </div>
    </div>
  );
}

export default function MediaPage() {
  return (
    <section className="space-y-8">
      {/* Header */}
      <div className="space-y-1">
        <p className="text-[10px] tracking-[0.2em] uppercase text-gold font-semibold">
          Visual Gallery
        </p>
        <h1 className="text-3xl font-extrabold tracking-tight text-white">
          Media
        </h1>
        <p className="vintage-muted text-sm">
          Photos, press shots and single releases.
        </p>
      </div>

      {/* Featured row — large photos */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
        <PhotoCard
          photo={featured[0]}
          className="md:col-span-3 h-[480px] md:h-[580px]"
        />
        <PhotoCard
          photo={featured[1]}
          className="md:col-span-2 h-[480px] md:h-[580px]"
        />
      </div>

      {/* Grid row — three photos */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {grid.map((photo) => (
          <PhotoCard key={photo.src} photo={photo} className="h-[320px]" />
        ))}
      </div>
    </section>
  );
}
