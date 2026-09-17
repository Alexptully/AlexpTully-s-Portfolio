import { site } from "@/content/site";

/**
 * The site's absolute origin, for `metadataBase`, the sitemap and `robots.txt`.
 *
 * TODO(alex): open question 16 — the final domain. Nothing here guesses one. It is read, in
 * order, from `site.siteUrl` (set it and every caller follows), then from the deployment:
 * `NEXT_PUBLIC_SITE_URL`, or the production host Vercel exposes. Only when none of those
 * exist does the placeholder stand in, and the placeholder is a reserved `.example` host so
 * a link built from it can never resolve to somebody else's site.
 *
 * The fallback matters: without a `metadataBase` Next resolves Open Graph images against
 * `http://localhost:3000`, so a build with no origin ships localhost URLs in its OG tags.
 */
const PLACEHOLDER_ORIGIN = "https://alextully.example";

function fromEnvironment(): string | null {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return explicit.startsWith("http") ? explicit : `https://${explicit}`;
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (vercel) return `https://${vercel}`;
  return null;
}

export const siteOrigin: string = site.siteUrl ?? fromEnvironment() ?? PLACEHOLDER_ORIGIN;

/** True while the origin is the stand-in, i.e. nobody has chosen a domain yet. */
export const siteOriginIsPlaceholder = siteOrigin === PLACEHOLDER_ORIGIN;

/** An absolute URL on the site, e.g. `absoluteUrl("/work/anticam")`. */
export function absoluteUrl(path: string): string {
  return new URL(path, siteOrigin).toString();
}
