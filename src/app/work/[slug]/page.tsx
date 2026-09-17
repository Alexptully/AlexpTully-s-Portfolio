import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { site } from "@/content/site";
import { nextProject, projectBySlug, projects } from "@/content/projects";
import type { ProjectSlug } from "@/content/types";
import { CaseStudy } from "@/components/work/CaseStudy";
import { JsonLd } from "@/components/seo/JsonLd";

/** The four case studies, prerendered; any other slug is a 404 (design-spec §4.1, §14). */
export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export const dynamicParams = false;

function projectFor(slug: string) {
  return projectBySlug[slug as ProjectSlug];
}

export async function generateMetadata(props: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const project = projectFor(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.oneLine,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      type: "article",
      title: project.title,
      description: project.oneLine,
      url: `/work/${project.slug}`,
      siteName: site.name,
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.oneLine,
    },
  };
}

export default async function WorkPage(props: PageProps<"/work/[slug]">) {
  const { slug } = await props.params;
  const project = projectFor(slug);
  if (!project) notFound();

  const path = `/work/${project.slug}`;
  const url = site.siteUrl ? new URL(path, site.siteUrl).toString() : path;
  const image =
    "kind" in project.hero || !site.siteUrl
      ? undefined
      : new URL(project.hero.src, site.siteUrl).toString();

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: project.title,
          description: project.oneLine,
          url,
          ...(image ? { image } : {}),
          author: {
            "@type": "Person",
            name: site.name,
            email: site.email,
            url: site.website.href,
          },
        }}
      />
      <CaseStudy project={project} next={nextProject(project.slug)} />
    </>
  );
}
