import { getLocale, getMessages, createT } from "@/lib/i18n";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  const messages = await getMessages(locale);
  const t = createT(messages, "header");

  const nav = {
    shows: t("shows"),
    media: t("media"),
    merch: t("merch"),
    epk: t("epk"),
    bookNow: t("bookNow"),
  };

  return (
    <>
      <Header locale={locale} nav={nav} />
      <main className="mx-auto max-w-6xl px-6 py-10">{children}</main>
      <Footer />
    </>
  );
}
