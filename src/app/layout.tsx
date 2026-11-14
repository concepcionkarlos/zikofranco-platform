import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { getLocale } from "@/lib/i18n";
import { SITE_URL } from "@/content/site";
import { links } from "@/content/links";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "/" },
  title: {
    default: "ZikoFranco — Miami Party Band · Rock, Funk & Latin",
    template: "%s | ZikoFranco",
  },
  description:
    "ZikoFranco is a bilingual Miami party band — rock, funk, Latin and sing-along hits in a non-stop 3-hour live show. Available for weddings, corporate events, private parties and festivals.",
  keywords: ["ZikoFranco", "Miami wedding band", "Miami party band", "cover band Miami", "Latin band Miami", "bilingual band Miami", "corporate event band Miami", "live band Miami", "book a band Miami"],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "ZikoFranco",
    title: "ZikoFranco — Miami Party Band · Rock, Funk & Latin",
    description: "Modern rock power fused with funk-forward groove. Based in Miami, FL. Available for events worldwide.",
    images: [{ url: "/assets/photos/7058E651-F966-492A-B4CB-7CC9ABF47D72.jpeg", width: 1200, height: 630, alt: "ZikoFranco — Miami Party Band · Rock, Funk & Latin" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ZikoFranco — Miami Party Band · Rock, Funk & Latin",
    description: "Modern rock power fused with funk-forward groove. Based in Miami, FL.",
    images: ["/assets/photos/7058E651-F966-492A-B4CB-7CC9ABF47D72.jpeg"],
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MusicGroup",
  name: "ZikoFranco",
  url: SITE_URL,
  image: `${SITE_URL}/assets/photos/7058E651-F966-492A-B4CB-7CC9ABF47D72.jpeg`,
  logo: `${SITE_URL}/assets/logo/zf-logo-band.jpeg`,
  description:
    "Bilingual Miami party band playing rock, funk, Latin and sing-along hits in a non-stop 3-hour live show for weddings, corporate events and private parties.",
  genre: ["Rock", "Funk", "Latin Rock", "Pop", "Reggae"],
  foundingLocation: { "@type": "Place", name: "Miami, FL" },
  areaServed: "South Florida",
  email: "Zikofranco@gmail.com",
  sameAs: Object.values(links),
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const locale = await getLocale();

  return (
    <html lang={locale} className={inter.variable}>
      <body className="min-h-screen bg-[#0B0B0F] text-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
