import type { Metadata } from "next";
import { Libre_Franklin, Public_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StickyCallBar } from "@/components/layout/StickyCallBar";
import { JsonLd, localBusinessSchema } from "@/lib/schema";
import { asset } from "@/lib/asset";
import { site } from "@/lib/site";

/**
 * Root layout — Ole Man RB's Tree Service.
 *
 * Loads the two locked brand faces via next/font/google and exposes them on <html>
 * as the CSS variables globals.css expects:
 *   - Libre Franklin (700/800/900) -> --font-display-raw  (the bold condensed industrial display)
 *   - Public Sans   (400/500/600/700) -> --font-sans-raw  (clean body)
 * globals.css maps these into --font-display / --font-sans (its @theme block).
 *
 * Renders the persistent chrome: Header (dark tone-switch nav), the page <main>,
 * Footer (true-black anchor), and the mobile-only StickyCallBar dock. The site-wide
 * LocalBusiness / TreeService JSON-LD is injected here so every page carries it.
 *
 * basePath note: next/font and next/link resolve basePath natively, but metadata
 * icon/openGraph image URLs are resolved against metadataBase (not basePath), so we
 * wrap those asset paths with asset() to include the GitHub Pages project base.
 */

const display = Libre_Franklin({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  variable: "--font-display-raw",
  display: "swap",
});

const sans = Public_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans-raw",
  display: "swap",
});

const ogImage = asset("/photos/hero-ai.jpg");
const iconImage = asset("/logo-white.png");

export const metadata: Metadata = {
  metadataBase: new URL("https://olemanrb.com"),
  // SEO titles in site.ts already include the brand, so no template suffix.
  title: {
    default:
      "Tree Removal & Tree Service in West Michigan · Ole Man RB's Tree Service",
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name }],
  keywords: [
    "tree service West Michigan",
    "tree removal Belding MI",
    "tree trimming",
    "storm damage cleanup",
    "stump grinding",
    "crane assisted tree removal",
    "lot clearing",
    "emergency tree service",
    "Belding",
    "Rockford",
    "Greenville",
    "Grand Rapids",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: site.name,
    title: "Tree Removal & Tree Service in West Michigan | Ole Man RB's",
    description: site.description,
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: "A cinematic golden-hour tree removal in West Michigan with an Ole Man RB's crane",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tree Removal & Tree Service in West Michigan | Ole Man RB's",
    description: site.description,
    images: [ogImage],
  },
  icons: {
    icon: iconImage,
    shortcut: iconImage,
    apple: iconImage,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body className="grit min-h-screen bg-ink text-light pb-[calc(72px+env(safe-area-inset-bottom))] lg:pb-0">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-sm focus:bg-red focus:px-4 focus:py-2 focus:font-semibold focus:text-white focus:outline-2 focus:outline-offset-2 focus:outline-white"
        >
          Skip to content
        </a>
        {/* site-wide LocalBusiness / TreeService JSON-LD */}
        <JsonLd data={localBusinessSchema()} />

        <Header />
        <main id="main">{children}</main>
        <Footer />
        <StickyCallBar />
      </body>
    </html>
  );
}
