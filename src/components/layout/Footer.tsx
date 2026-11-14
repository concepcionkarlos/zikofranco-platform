import Link from "next/link";
import { BrandName } from "@/components/branding/BrandName";
import { SocialLinks } from "@/components/media/SocialLinks";
import { getLocale, getMessages, createT } from "@/lib/i18n";

export async function Footer() {
  const locale = await getLocale();
  const messages = await getMessages(locale);
  const t = createT(messages, "footer");
  const h = createT(messages, "header");

  const links = [
    { href: "/", label: h("home") },
    { href: "/show", label: h("show") },
    { href: "/shows", label: h("shows") },
    { href: "/media", label: h("media") },
    { href: "/merch", label: h("merch") },
    { href: "/epk", label: h("epk") },
    { href: "/weddings", label: h("weddings") },
    { href: "/corporate-events", label: h("corporate") },
    { href: "/booking", label: h("booking") },
  ];

  return (
    <footer className="border-t border-white/[0.07] mt-20">
      <div className="mx-auto max-w-6xl px-6 py-12 grid gap-10 md:grid-cols-[1.2fr_1fr_auto] md:items-start">
        <div className="space-y-2">
          <div className="text-white font-extrabold text-lg tracking-tight">
            <BrandName />
          </div>
          <p className="text-white/50 text-xs tracking-widest uppercase">
            Miami, FL &nbsp;·&nbsp; Rock · Funk · Latin
          </p>
          <p className="text-sm text-white/60 max-w-xs leading-relaxed">{t("tagline")}</p>
          <Link href="/booking" className="btn-oxblood inline-flex mt-3 px-5 py-2.5 text-xs font-semibold rounded-xl">
            {h("bookNow")}
          </Link>
        </div>

        <nav aria-label={t("explore")}>
          <p className="text-[11px] tracking-[0.22em] uppercase font-semibold mb-3" style={{ color: "#d6b25e" }}>
            {t("explore")}
          </p>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-2">
            {links.map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className="text-sm text-white/60 hover:text-white transition-colors">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col gap-5 md:items-end">
          <SocialLinks />
          <div className="flex flex-col md:items-end gap-1">
            <p className="text-white/50 text-xs">
              © {new Date().getFullYear()} ZikoFranco. {t("rights")}
            </p>
            <Link href="/admin" className="text-white/40 text-[11px] hover:text-white/70 transition-colors tracking-wide">
              Admin ↗
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
