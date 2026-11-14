import type { Metadata } from "next";
import { EventLanding } from "@/components/marketing/EventLanding";

export const metadata: Metadata = {
  title: "Miami Wedding Band — Bilingual Live Music for Your Reception",
  description:
    "ZikoFranco is a bilingual Miami wedding band: rock, funk, Latin and sing-along hits in a non-stop 3-hour live show. Custom first-dance songs, English & Spanish. Check your date.",
  alternates: { canonical: "/weddings" },
};

export default function WeddingsPage() {
  return <EventLanding namespace="weddings" eventType="Wedding" />;
}
