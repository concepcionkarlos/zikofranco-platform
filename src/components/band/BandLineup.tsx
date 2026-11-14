import { SmartImage } from "@/components/ui/SmartImage";

type Member = { name: string; role: string };

const PHOTOS: (string | null)[] = [
  "/assets/photos/7058E651-F966-492A-B4CB-7CC9ABF47D72.jpeg", // Ziko
  "/assets/photos/jc-concepcion.jpg", // JCConcepcion
  null, // Drummer — photo coming after the band shoot
];

export function BandLineup({ label, heading, body, members, tracks }: {
  label: string;
  heading: string;
  body: string;
  members: Member[];
  tracks: string;
}) {
  return (
    <div className="space-y-6">
      <div className="max-w-2xl">
        <p className="text-[11px] tracking-[0.22em] uppercase font-semibold" style={{ color: "#d6b25e" }}>{label}</p>
        <h2 className="text-xl sm:text-2xl font-bold mt-1 tracking-tight">{heading}</h2>
        <p className="text-sm mt-2 leading-relaxed" style={{ color: "rgba(242,239,233,0.6)" }}>{body}</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {members.map((m, i) => {
          const photo = PHOTOS[i];
          return (
            <div key={m.name} className="relative rounded-2xl overflow-hidden h-[340px] sm:h-[420px]"
              style={{ background: "rgba(18,18,20,0.8)", border: "1px solid rgba(255,255,255,0.07)" }}>
              {photo ? (
                <SmartImage src={photo} alt={`${m.name} — ${m.role}`} sizes="(min-width: 640px) 33vw, 100vw"
                  className="object-cover object-top" />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center" aria-hidden>
                  <svg width="88" height="88" viewBox="0 0 24 24" fill="none" stroke="rgba(214,178,94,0.35)" strokeWidth="1"
                    strokeLinecap="round" strokeLinejoin="round">
                    <ellipse cx="12" cy="9" rx="8" ry="3" />
                    <path d="M4 9v6c0 1.7 3.6 3 8 3s8-1.3 8-3V9" />
                    <path d="M7 3l4 5M17 3l-4 5" />
                  </svg>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="text-[11px] tracking-[0.2em] uppercase font-semibold" style={{ color: "#d6b25e" }}>{m.role}</p>
                <p className="text-white font-bold text-lg leading-tight mt-0.5">{m.name}</p>
              </div>
            </div>
          );
        })}
      </div>
      <p className="text-xs tracking-[0.15em] uppercase text-center" style={{ color: "rgba(242,239,233,0.55)" }}>{tracks}</p>
    </div>
  );
}
