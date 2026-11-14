import { getLocale, getMessages, createT } from "@/lib/i18n";
import { BookingForm, type BookingT } from "./BookingForm";
import { Faq } from "@/components/marketing/Faq";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Book the Band",
  description: "Request a quote for ZikoFranco — Miami's bilingual rock, funk & Latin party band for weddings, corporate events and private parties.",
  alternates: { canonical: "/booking" },
};

const EVENT_TYPES = ["Wedding", "Private Event", "Corporate Event", "Festival", "Venue Show", "Other"];

export default async function BookingPage({ searchParams }: { searchParams: Promise<{ event?: string }> }) {
  const { event } = await searchParams;
  const initialEventType = event && EVENT_TYPES.includes(event) ? event : "";
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

  const tf = createT(messages, "faq");

  return (
    <div className="space-y-20">
      <BookingForm t={translations} initialEventType={initialEventType} />
      <div className="max-w-2xl mx-auto">
        <Faq label={tf("label")} heading={tf("heading")} items={tf.raw("items") as { q: string; a: string }[]} />
      </div>
    </div>
  );
}
