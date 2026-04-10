import { getLocale, getMessages, createT } from "@/lib/i18n";
import { BookingForm } from "./BookingForm";

export const dynamic = "force-dynamic";

export default async function BookingPage() {
  const locale = await getLocale();
  const messages = await getMessages(locale);
  const t = createT(messages, "booking");

  const translations = {
    label: t("label"),
    heading: t("heading"),
    subtitle: t("subtitle"),
    fields: t.raw("fields") as { fullName: string; email: string; phone: string; eventType: string; budgetRange: string; message: string },
    placeholders: t.raw("placeholders") as { fullName: string; email: string; phone: string; budgetRange: string; message: string },
    eventTypes: t.raw("eventTypes") as { select: string; private: string; corporate: string; festival: string; venue: string; wedding: string; other: string },
    submit: t("submit"),
    sending: t("sending"),
    respond: t("respond"),
    success: t.raw("success") as { heading: string; text: string; another: string },
    errors: t.raw("errors") as { generic: string; network: string },
  };

  return <BookingForm t={translations} />;
}
