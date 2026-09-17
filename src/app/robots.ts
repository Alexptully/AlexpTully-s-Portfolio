import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site-url";

/** Everything is public and indexable (design-spec §14). */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
