import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "ZikoFranco — Miami Rock Band",
    template: "%s | ZikoFranco",
  },
  description:
    "ZikoFranco is a Miami-based rock band blending modern rock power with funk-forward groove and a Santana-inspired edge. Available for private events, corporate shows, festivals, and weddings.",
  keywords: ["ZikoFranco", "Miami rock band", "live band Miami", "book a band Miami", "rock funk band", "live music Miami"],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://zikofranco-platform.vercel.app",
    siteName: "ZikoFranco",
    title: "ZikoFranco — Miami Rock Band",
    description:
      "Modern rock power fused with funk-forward groove. Based in Miami, FL. Available for events worldwide.",
    images: [
      {
        url: "/assets/photos/7058E651-F966-492A-B4CB-7CC9ABF47D72.jpeg",
        width: 1200,
        height: 630,
        alt: "ZikoFranco — Miami Rock Band",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ZikoFranco — Miami Rock Band",
    description: "Modern rock power fused with funk-forward groove. Based in Miami, FL.",
    images: ["/assets/photos/7058E651-F966-492A-B4CB-7CC9ABF47D72.jpeg"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-[#0B0B0F] text-white">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
