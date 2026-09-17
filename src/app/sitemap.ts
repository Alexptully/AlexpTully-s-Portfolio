import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { projects } from "@/content/projects";

/**
 * TODO(alex): open question 16 — the final domain. `site.siteUrl` is null until it is
 * chosen, and a sitemap has to print absolute URLs, so this placeholder host stands in.
 * Set `siteUrl` in `src/content/site.ts` and both this file and `robots.ts` follow.
 */
const PLACEHOLDER_ORIGIN = "https://alextully.example";

const origin = site.siteUrl ?? PLACEHOLDER_ORIGIN;

/** The six public routes (design-spec §4.1). `/lab` is gone and there is no `/work` index. */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", "/about", ...projects.map((project) => `/work/${project.slug}`)];
  // No `lastModified`: nothing in the repo records when a page's content was last true,
  // and a build timestamp would claim something the site cannot back up.
  return paths.map((path) => ({ url: new URL(path, origin).toString() }));
}
