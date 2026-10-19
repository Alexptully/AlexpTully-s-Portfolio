import type { Home, Source } from "./types";
import { site } from "./site";
import { workOrder } from "./projects";
import { sideProjects } from "./side-projects";

/**
 * Home page copy (redesign spec §2): hero, "What I do", the Selected work and Side projects
 * headings (the rows themselves come from `workOrder` and `sideProjects`), the about teaser,
 * "Now and next", and contact.
 *
 * Every source on the page is in `home.sources`, by reference, so a renderer can number it
 * with `sources.indexOf(source) + 1`. The list rows' Year sources are appended to the same
 * list, so the Year column is backed on the page that prints it.
 */

const NOTES = "content/notes/sections/14-new-projects.md";

const S = {
  root: {
    name: "Project brief (root CLAUDE.md)",
    path: "CLAUDE.md",
    claim:
      "Tully Tech; CAD, embedded systems, fabrication and product design, and the tools; USC Iovine and Young Academy, TroyLabs BUILD (PM division) and the Terra Labs side projects, fall 2026",
  } satisfies Source,
  resume: {
    name: "Résumé, 2026",
    path: "content/source/resume/resume-current.png",
    claim: "Roles and dates: Stevens Institute of Technology, summer 2024; CeraPiper, summer 2026; FTC captain",
  } satisfies Source,
  pando: {
    name: "Pando Surgical team meeting notes, 30 September 2026 (internal)",
    path: `${NOTES}#pando-surgical`,
    claim: "Product Manager at Pando Surgical since fall 2026, and the team’s task system",
    note: "An internal document, cited by title only; its facts are recorded in the site’s content notes.",
  } satisfies Source,
};

/** Each work row's Year source, once, in list order. */
const yearSources = [...workOrder, ...sideProjects]
  .map((work) => work.listing.yearSource)
  .filter((source): source is Source => source !== undefined)
  .filter((source, i, all) => all.indexOf(source) === i);

export const home: Home = {
  hero: {
    // Root CLAUDE.md: "hardware founder, product designer"; the Pando role is fall 2026.
    labels: ["Hardware founder", "Product designer", "Product Manager, Pando Surgical"],
    nameLines: ["Alex", "Tully"],
    headline: "I design and build hardware.",
    lead: "I founded Tully Tech, which makes affordable assistive and privacy hardware. Since fall 2026 I’ve been Product Manager at Pando Surgical and a student at USC’s Iovine and Young Academy.",
    // TODO(alex): open question 13 — USC and TroyLabs BUILD appear only in the project brief.
    // Confirm they may be public before launch.
    cta: { label: "View the work", href: "/#work" },
    scrollHint: "Scroll",
    sources: [S.root, S.pando],
  },

  marquee: ["Design", "CAD", "Firmware", "Prototyping", "Robotics", "Product"],

  services: {
    heading: "What I do",
    items: [
      {
        id: "product-design",
        title: "Product design and CAD",
        body: "I design products in CAD, from the first sketch to parts ready to print or cut.",
        tools: ["SolidWorks", "Fusion 360", "Onshape", "Blender"],
        sources: [S.root],
      },
      {
        id: "embedded-systems",
        title: "Embedded systems and firmware",
        body: "I wire sensors and microcontrollers and write the code that runs them, from a robot’s electrical system to a bracelet’s LEDs.",
        tools: ["Arduino", "Raspberry Pi", "Python", "C++", "C"],
        sources: [S.root],
      },
      {
        id: "fabrication",
        title: "Fabrication and prototyping",
        body: "I build my own prototypes: printed, laser-cut and hand-soldered.",
        tools: ["3D printers", "Laser cutters", "Shop tools"],
        sources: [S.root],
      },
      {
        id: "product-management",
        title: "Product management",
        body: "I’m Product Manager at Pando Surgical, where I built the team’s task system, and PM on Bloom at Terra Labs.",
        tools: ["Notion", "Google Sheets", "Google Calendar"],
        sources: [S.pando, S.root],
      },
    ],
  },

  workHeading: "Selected work",
  sideHeading: "Side projects",

  about: {
    heading: "About",
    text: "I founded Tully Tech and captain FIRST Tech Challenge team Tritonics #17253. My timeline, awards, tools and smaller pieces, such as Electric Road and IDEA Club, are on the about page.",
    link: { label: "More about me", href: "/about" },
    sources: [S.root, S.resume],
  },

  now: {
    heading: "Now and next",
    rows: [
      {
        term: "Summer 2024",
        description: "Research assistant, Stevens Institute of Technology: the prosthetic arm.",
        source: S.resume,
      },
      {
        term: "Summer 2026",
        description: "Research intern on CeraPiper, Cornell Tech x Technion.",
        source: S.resume,
      },
      {
        term: "Fall 2026",
        description:
          "USC Iovine and Young Academy, Arts, Technology and the Business of Innovation; TroyLabs BUILD, PM division; advanced robotics.",
        source: S.root,
      },
      {
        term: "Fall 2026",
        description: "Product Manager at Pando Surgical, a medtech startup working on surgical ergonomics.",
        source: S.pando,
      },
      {
        term: "Fall 2026",
        // TODO(alex): whether "Terra Labs" is a public name.
        description:
          "Side projects at Terra Labs: Bloom (PM and systems) and the robotic-arm flower (electrical and firmware).",
        source: S.root,
      },
    ],
  },

  contact: {
    heading: "Contact",
    email: site.email,
    website: site.website,
    line: "From fall 2026 I’m at USC in Los Angeles.",
    lineSource: S.root,
  },

  sources: [S.root, S.resume, S.pando, ...yearSources],
};
