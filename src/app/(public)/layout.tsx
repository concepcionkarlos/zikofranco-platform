import { getLocale, getMessages, createT } from "@/lib/i18n";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BackToTop } from "@/components/ui/BackToTop";

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  const messages = await getMessages(locale);
  const t = createT(messages, "header");

  const nav = {
    home: t("home"),
    show: t("show"),
    shows: t("shows"),
    media: t("media"),
    merch: t("merch"),
    epk: t("epk"),
    bookNow: t("bookNow"),
  };

  return (
    <>
      <a href="#main" className="skip-link">{t("skip")}</a>
      <Header locale={locale} nav={nav} />
      <main id="main" tabIndex={-1} className="mx-auto max-w-6xl px-6 py-10 outline-none">{children}</main>
      <Footer />
      <BackToTop label={t("backToTop")} />
    </>
  );
}
