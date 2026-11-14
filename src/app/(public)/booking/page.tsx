import { getLocale, getMessages, createT } from "@/lib/i18n";
import { BookingForm, type BookingT } from "./BookingForm";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Book the Band",
  description: "Request a quote for ZikoFranco — Miami's bilingual rock, funk & Latin party band for weddings, corporate events and private parties.",
  alternates: { canonical: "/booking" },
};

export default async function BookingPage() {
  const locale = await getLocale();
  const messages = await getMessages(locale);
  const t = createT(messages, "booking");

  const translations = {
    label: t("label"),
    heading: t("heading"),
    subtitle: t("subtitle"),
    fields: t.raw("fields") as BookingT["fields"],
    placeholders: t.raw("placeholders") as BookingT["placeholders"],
    eventTypes: t.raw("eventTypes") as BookingT["eventTypes"],
    formats: t.raw("formats") as BookingT["formats"],
    budgets: t.raw("budgets") as BookingT["budgets"],
    submit: t("submit"),
    sending: t("sending"),
    respond: t("respond"),
    success: t.raw("success") as { heading: string; text: string; another: string },
    errors: t.raw("errors") as BookingT["errors"],
  };

  return <BookingForm t={translations} />;
}
