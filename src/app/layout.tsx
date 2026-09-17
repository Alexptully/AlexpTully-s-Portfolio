import type { Metadata } from "next";
import { Host_Grotesk } from "next/font/google";
import { site } from "@/content/site";
import { siteOrigin } from "@/lib/site-url";
import { SkipLink } from "@/components/layout/SkipLink";
import { Masthead } from "@/components/layout/Masthead";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

// One family for the whole site (design-spec §3.1). Downloaded and self-hosted at build
// time; the browser never contacts Google. `adjustFontFallback` builds a metric-compatible
// fallback from Arial so spec sheets do not reflow when the woff2 arrives.
const host = Host_Grotesk({
  subsets: ["latin"],
  weight: "variable",
  style: ["normal"],
  display: "swap",
  adjustFontFallback: true,
  variable: "--font-host",
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
      className={`${host.variable} h-full antialiased`}
      style={{ colorScheme: "dark" }}
    >
      <body className="flex min-h-full flex-col bg-bg font-sans text-ink">
        <SkipLink />
        <Masthead />
        <main id="content" tabIndex={-1} className="flex flex-1 flex-col outline-none">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
