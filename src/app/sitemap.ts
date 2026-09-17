import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { absoluteUrl } from "@/lib/site-url";

/** The six public routes (design-spec §4.1). `/lab` is gone and there is no `/work` index. */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", "/about", ...projects.map((project) => `/work/${project.slug}`)];
  // No `lastModified`: nothing in the repo records when a page's content was last true,
  // and a build timestamp would claim something the site cannot back up.
  return paths.map((path) => ({ url: absoluteUrl(path) }));
}
