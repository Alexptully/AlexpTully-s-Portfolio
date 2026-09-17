import type { Site, HeroMode } from "./types";

/**
 * Site-level copy: identity, navigation, footer, shared section headings.
 * Page copy lives in `projects.ts` and `about.ts`.
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
    "I design and build hardware: a privacy wearable, a low-cost prosthetic arm, competition robots, and a CAD tool for clay.",

  skipLinkLabel: "Skip to content",

  nav: [
    { label: "Work", href: "/#work" },
    { label: "About", href: "/about" },
    {
      label: "Email",
      href: "mailto:alexptully@gmail.com",
      ariaLabel: "Email Alex Tully",
    },
    {
      label: "tullytech.com",
      href: "https://tullytech.com",
      external: true,
      desktopOnly: true,
    },
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
  },

  labels: {
    role: "My role",
    proof: "Proof",
    awardsNone: "None.",
    dateNotRecorded: "date not recorded",
    teamMeasurement: "(team measurement)",
    versionTag: "Version",
    versionTile: "Tile",
    versionChange: "What changed",
    versionMeasurement: "Measurement",
    versionDate: "Date",
  },

  // The 3D pin ships enabled, with the SVG poster and the V1 photograph as fallbacks (§10.1).
  heroMode: "canvas",
};

/** Convenience re-export: `heroMode` is read on the home page (§4.3). */
export const heroMode: HeroMode = site.heroMode;
