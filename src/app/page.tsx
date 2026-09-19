import { site } from "@/content/site";
import { contactBand, homeHero, homeSources, nowAndNext, projects } from "@/content/projects";
import type { Project } from "@/content/types";
import { Container } from "@/components/layout/Container";
import { Sources } from "@/components/content/Sources";
import { Hero } from "@/components/home/Hero";
import { LineupRow } from "@/components/home/LineupRow";
import { NowAndNext } from "@/components/home/NowAndNext";
import { ContactBand } from "@/components/home/ContactBand";
import { JsonLd } from "@/components/seo/JsonLd";

/**
 * 1-based footnote number of a project's proof stat in the home Sources list. Source objects
 * are shared by reference for exactly this lookup (wp1 handoff). A proof whose source is not
 * in the list would print an uncited figure, so the build fails instead.
 */
function footnoteFor(project: Project): number {
  const n = homeSources.indexOf(project.proof.source) + 1;
  if (n === 0) {
    throw new Error(`homeSources is missing the proof source for "${project.slug}"`);
  }
  return n;
}

/** Person + WebSite (design-spec §14). Absolute URLs only once `site.siteUrl` is known. */
function structuredData() {
  const url = site.siteUrl ?? undefined;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        name: site.name,
        alternateName: site.fullName,
        description: site.metaDescription,
        email: `mailto:${site.email}`,
        url,
        // Tully Tech is Alex's company (résumé; root CLAUDE.md); its site is the one public link.
        worksFor: { "@type": "Organization", name: "Tully Tech", url: site.website.href },
        // TODO(alex): open question 3 — social links, if any, go here.
        sameAs: [],
      },
      {
        "@type": "WebSite",
        name: site.name,
        description: site.metaDescription,
        url,
      },
    ],
  };
}

/**
 * Home (design-spec §5): hero, the four-row lineup, "Now and next", the contact band, then
 * Sources as the last section inside `<main>`. The layout owns `<main id="content">` and the
 * shared footer. Every word and image reference comes from the content files.
 */
export default function Home() {
  return (
    <>
      <Hero mode={site.heroMode} hero={homeHero} />

      <Container as="section" id="work" className="space-y-10 md:space-y-16">
        {projects.map((project, i) => (
          <LineupRow
            key={project.slug}
            project={project}
            footnote={footnoteFor(project)}
            // The first two rows sit within roughly the second viewport; their plates load
            // eagerly so the page never paints a caption under an empty box.
            priority={i < 2}
          />
        ))}
      </Container>

      <NowAndNext data={nowAndNext} />

      <ContactBand {...contactBand} />

      <Container className="mt-20 md:mt-32">
        <Sources sources={homeSources} />
      </Container>

      <JsonLd data={structuredData()} />
    </>
  );
}
