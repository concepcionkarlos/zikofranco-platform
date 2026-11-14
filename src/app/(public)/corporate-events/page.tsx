import type { Metadata } from "next";
import { EventLanding } from "@/components/marketing/EventLanding";

export const metadata: Metadata = {
  title: "Corporate Event Band in Miami — Galas, Holiday Parties & Launches",
  description:
    "Professional bilingual party band for corporate events in Miami and South Florida. Controlled sound, flexible sets around your agenda, rock, funk & Latin hits. Request a quote.",
  alternates: { canonical: "/corporate-events" },
};

export default function CorporateEventsPage() {
  return <EventLanding namespace="corporate" eventType="Corporate Event" />;
}
