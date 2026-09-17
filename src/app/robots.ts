import type { MetadataRoute } from "next";
import { site } from "@/content/site";

/** Same placeholder as `sitemap.ts`. TODO(alex): open question 16 — the final domain. */
const PLACEHOLDER_ORIGIN = "https://alextully.example";

const origin = site.siteUrl ?? PLACEHOLDER_ORIGIN;

/** Everything is public and indexable (design-spec §14). */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: new URL("/sitemap.xml", origin).toString(),
  };
}
