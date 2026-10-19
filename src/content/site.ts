import type { Site, HeroMode } from "./types";

/**
 * Site-level copy: identity, navigation, footer, shared section headings.
 * Page copy lives in `projects.ts`, `side-projects.ts`, `home.ts` and `about.ts`.
 */
export const site: Site = {
  name: "Alex Tully",
  // The full legal name appears exactly once per page, in the footer (§9).
  fullName: "Alexander Tully",
  email: "alexptully@gmail.com",
  website: { label: "tullytech.com", href: "https://tullytech.com" },

  // TODO(alex): open question 16 — the final domain for metadataBase, the sitemap and the
  // OG images (a tullytech.com subpath, or a separate personal domain). No URL is guessed here.
  siteUrl: null,

  metaTitle: "Alex Tully — hardware designer and builder",
  metaDescription:
    "Alex Tully: hardware founder, product designer and Product Manager at Pando Surgical. I design and build hardware, from a privacy wearable to a low-cost prosthetic arm.",

  skipLinkLabel: "Skip to content",

  nav: [
    { label: "Work", href: "/#work" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/#contact" },
  ],

  footer: {
    sourcesHeading: "Sources",
    smallPrint:
      "Every statistic on this site links to its source. Team achievements are described as we; my role is stated on each page. Photos are my own prototypes and tests unless captioned otherwise.",
    // TODO(alex): open question 4 — a résumé PDF with the phone number removed. The footer
    // link renders only once this exists; the current résumé is gitignored and carries a phone
    // number, so nothing is linked in the meantime.
    resumePdf: null,
  },

  sectionHeadings: {
    why: "Why",
    how: "How it works",
    results: "Results",
    did: "What I did",
    others: "What others did",
    status: "Status",
    sources: "Sources",
    nextPrefix: "Next",
    facts: "Facts",
    versions: "Versions",
    targets: "Targets",
    system: "How it fits together",
    nextProject: "Next project",
  },

  labels: {
    role: "My role",
    proof: "Proof",
    awards: "Awards",
    awardsNone: "None.",
    backToText: "Back to text",
    dateNotRecorded: "date not recorded",
    teamMeasurement: "(team measurement)",
    versionTag: "Version",
    versionTile: "Tile",
    versionChange: "What changed",
    versionMeasurement: "Measurement",
    versionDate: "Date",
    year: "Year",
    type: "Type",
    status: "Status",
    target: "Target",
  },

  // The 3D pin ships enabled, with the SVG poster and the V1 photograph as fallbacks (§10.1).
  heroMode: "canvas",
};

/** Convenience re-export: `heroMode` is read on the home page (§4.3). */
export const heroMode: HeroMode = site.heroMode;
