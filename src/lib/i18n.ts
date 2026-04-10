/**
 * Simple i18n helper for server components.
 * No plugin needed — reads locale from cookie and returns typed messages.
 * Client components use useTranslations() from next-intl via NextIntlClientProvider.
 */
import { cookies } from "next/headers";
import en from "../../messages/en.json";
import es from "../../messages/es.json";

type Messages = typeof en;

const MESSAGES: Record<string, Messages> = { en, es };

export async function getLocale(): Promise<string> {
  const store = await cookies();
  const locale = store.get("NEXT_LOCALE")?.value ?? "en";
  return locale in MESSAGES ? locale : "en";
}

export async function getMessages(locale?: string): Promise<Messages> {
  const l = locale ?? (await getLocale());
  return MESSAGES[l] ?? en;
}

// Simple dot-path getter for server components.
// Usage: const t = createT(messages, "shows");  then t("label"), t("status.UPCOMING")
export function createT<N extends keyof Messages>(messages: Messages, namespace: N) {
  const ns = messages[namespace] as Record<string, unknown>;

  function t(key: string): string {
    const parts = key.split(".");
    let val: unknown = ns;
    for (const part of parts) {
      val = (val as Record<string, unknown>)?.[part];
    }
    return typeof val === "string" ? val : key;
  }

  // For arrays or objects (e.g. testimonials.items)
  t.raw = (key: string): unknown => {
    const parts = key.split(".");
    let val: unknown = ns;
    for (const part of parts) {
      val = (val as Record<string, unknown>)?.[part];
    }
    return val;
  };

  return t;
}
