import Link from "next/link";
import { BrandName } from "@/components/branding/BrandName";
import { SocialLinks } from "@/components/media/SocialLinks";
import { getLocale, getMessages, createT } from "@/lib/i18n";

export async function Footer() {
  const locale = await getLocale();
  const messages = await getMessages(locale);
  const t = createT(messages, "footer");

  return (
    <footer className="border-t border-white/[0.07] mt-20">
      <div className="mx-auto max-w-6xl px-6 py-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <div className="text-white font-extrabold text-lg tracking-tight mb-1">
            <BrandName />
          </div>
          <p className="text-white/40 text-xs tracking-widest uppercase">
            Miami, FL &nbsp;·&nbsp; Rock &amp; Funk
          </p>
        </div>

        <SocialLinks />

        <div className="flex flex-col items-end gap-1">
          <p className="text-white/30 text-xs">
            © {new Date().getFullYear()} ZikoFranco. {t("rights")}
          </p>
          <Link
            href="/admin"
            className="text-white/30 text-[11px] hover:text-white/60 transition-colors tracking-wide"
          >
            Admin ↗
          </Link>
        </div>
      </div>
    </footer>
  );
}
