import type { Metadata } from "next";
import { Archivo, JetBrains_Mono } from "next/font/google";
import { site } from "@/content/site";
import { siteOrigin } from "@/lib/site-url";
import { SkipLink } from "@/components/layout/SkipLink";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SitePreloader } from "@/components/layout/SitePreloader";
import { MotionInitScript } from "@/components/motion/MotionInitScript";
import { MotionRoot } from "@/components/motion/MotionRoot";
import { Cursor } from "@/components/motion/Cursor";
import "./globals.css";
import "./motion.css";

// Display, body and marquee: Archivo, a variable grotesk with a width axis (62–125), so the
// condensed caps, the body and the wide italic marquee are one family (redesign-spec §2).
const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  style: ["normal", "italic"],
  display: "swap",
  adjustFontFallback: true,
  variable: "--font-archivo",
});

// The instrument voice: part numbers, figure labels, spec terms, dates. Never body copy.
const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  adjustFontFallback: true,
  display: "swap",
  variable: "--font-jbm",
});

export const metadata: Metadata = {
  // The origin every Open Graph and Twitter image resolves against. TODO(alex): open
  // question 16 — set `site.siteUrl` (or `NEXT_PUBLIC_SITE_URL` at deploy time) and this,
  // the sitemap and robots.txt all follow. See `@/lib/site-url`.
  metadataBase: new URL(siteOrigin),
  title: {
    template: `%s | ${site.name}`,
    default: site.metaTitle,
  },
  description: site.metaDescription,
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: site.metaTitle,
    description: site.metaDescription,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: site.metaTitle,
    description: site.metaDescription,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${mono.variable} h-full antialiased`}
      style={{ colorScheme: "dark" }}
      // The head script adds `motion` / `motion-preload` to <html> before React hydrates.
      suppressHydrationWarning
    >
      <head>
        <MotionInitScript />
      </head>
      <body className="flex min-h-full flex-col bg-bg font-sans text-ink">
        <MotionRoot>
          <SkipLink />
          <SiteHeader />
          <main id="content" tabIndex={-1} className="flex flex-1 flex-col outline-none">
            {children}
          </main>
          <SiteFooter />
          <Cursor />
        </MotionRoot>
        <SitePreloader />
      </body>
    </html>
  );
}
