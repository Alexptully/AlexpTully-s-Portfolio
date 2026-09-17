import type { About, Source } from "./types";
import { images } from "./projects";

/**
 * About page copy (design spec §8, plus the smaller pieces from §7.5).
 *
 * Superscripts in prose are 1-based indices into `about.sources`.
 */

const resume: Source = {
  name: "Résumé, 2026",
  path: "content/source/resume/resume-current.png",
};
const root: Source = { name: "Project brief (root CLAUDE.md)", path: "CLAUDE.md" };
const cb15: Source = {
  name: "AntiCam presentation, page 15",
  path: "content/source/anticam/camera-blinder-presentation/pages/page-15.jpg",
};
const mastery: Source = {
  name: "AntiCam Mastery Learning plan, page 3",
  path: "content/source/anticam/mastery-learning-plan/text.md#page-3",
};
const pf01: Source = {
  name: "Portfolio page “Monti Robot, FTC #17253”",
  path: "content/source/portfolio/01-monti-robot.jpg",
};
const pf03: Source = {
  name: "Portfolio page “Honu Robot, FTC #14712”",
  path: "content/source/portfolio/03-honu-robot.jpg",
};
const pf05: Source = {
  name: "Portfolio page “Scorpion Robot, FTC #17253”",
  path: "content/source/portfolio/05-scorpion-robot.jpg",
};
const pf06: Source = {
  name: "Portfolio page “Electric Road”",
  path: "content/source/portfolio/06-electric-road.jpg",
};
const pf07: Source = {
  name: "Portfolio page “Community Events”",
  path: "content/source/portfolio/07-community-events.jpg",
};
const slideE: Source = {
  name: "Tritonics championship presentation, team roster slide",
  path: "content/source/robotics/championships-presentation/slide-e.jpg",
};
const slideF: Source = {
  name: "Tritonics championship presentation, budget slide",
  path: "content/source/robotics/championships-presentation/slide-f.png",
};
const posterF: Source = {
  name: "Tritonics poster F",
  path: "content/source/robotics/posters/poster-f.png",
};
const briefP5: Source = {
  name: "Prosthetic arm design brief, page 5",
  path: "content/source/prosthetic-arm/design-brief/text.md#page-5",
};
const deckJs: Source = {
  name: "AntiCam pitch deck",
  path: "content/source/anticam/pitch-deck-build.js",
};

/* --- the page's numbered <ol>; ⁵ and ⁶ are cited inline in the copy below --- */

const F = {
  resume: { ...resume, claim: "Education, roles, tools and the FTC awards line" } satisfies Source,
  doorbell: { ...cb15, claim: "AntiCam pin tested against a live Ring doorbell camera, 7 June 2023" } satisfies Source,
  mastery: { ...mastery, claim: "AntiCam Mastery project, 11 February to 6 May 2025" } satisfies Source,
  honu: {
    ...pf03,
    claim: "Honu, #14712: 1st in NYC and the 2nd-place Think Award at the World Championship",
  } satisfies Source,
  idea: { ...resume, claim: "IDEA Club has trained 70+ students" } satisfies Source,
  outreach: {
    ...pf07,
    claim: "20+ Hour of Code workshops and an e-waste drive that collected 40+ pounds",
  } satisfies Source,
  tritonics: {
    ...pf01,
    claim: "Monti, Scorpion and the FTC DECODE season awards for Tritonics #17253",
    note: "Also on the Scorpion portfolio page and the championship presentation roster slide.",
  } satisfies Source,
  training: {
    name: "Tritonics poster deck, page 17",
    path: "content/source/robotics/posters/poster-deck/text.md#page-17",
    claim: "Rookie training is stage-based and one to one",
  } satisfies Source,
  method: {
    ...posterF,
    claim: "Prototype in wood, finalize in metal, on parametric master sketches",
  } satisfies Source,
  costCeiling: {
    ...briefP5,
    claim: "A production cost ceiling listed last and called the most important requirement",
  } satisfies Source,
  limits: {
    ...deckJs,
    claim: "Stating a product's limits unprompted, including where it is weaker",
  } satisfies Source,
};

export const about: About = {
  title: "About",

  bio: [
    "I build hardware. I founded Tully Tech, which makes affordable assistive and privacy devices, and I finish Avenues: The World School’s Mastery Learning Program with the class of 2026.",
    "I work parametrically: master sketches where one variable updates the whole design, prototypes in wood before anything is cut in metal, iteration counted in versions and measured rather than described, and a cost ceiling treated as a design constraint from the first sketch.⁹,¹⁰ I would rather state a limitation up front than have someone find it, so the pages here say where each thing is weak.¹¹",
    "Next: USC’s Iovine and Young Academy, Arts, Technology and the Business of Innovation, in fall 2026, alongside TroyLabs BUILD’s PM division and advanced robotics. The work I admire is restrained — an object that explains itself and stops there — and that is what I aim at.",
    // TODO(alex): open question 13 — USC and TroyLabs BUILD come only from the project brief.
    // Confirm they may be public before launch.
    // TODO(alex): open question 3 — no headshot exists in any source, so this page has none.
  ],

  timeline: {
    id: "timeline",
    heading: "Timeline",
    rows: [
      {
        when: "2021–2022",
        what: "Take the World Forward fellowship: Harvard College, MIT Solv[ED], Learn with Leaders.",
        source: F.resume,
      },
      {
        when: "2023",
        what: "NYU Tandon, Cyber Security for Computer Science: wrote and presented a cybersecurity paper, and won the program hackathon.",
        source: F.resume,
      },
      {
        when: "7 June 2023",
        what: "AntiCam pin prototype tested against a live Ring doorbell camera at night.",
        source: F.doorbell,
      },
      {
        when: "Summer 2024",
        what: "Research assistant, Stevens Institute of Technology: the low-cost prosthetic arm.",
        source: F.resume,
      },
      {
        when: "Summer 2024",
        what: "Octura (a Bank of America partner, NYC), selective internship: CLO models, market data, investor calls.",
        source: F.resume,
      },
      {
        when: "11 February to 6 May 2025",
        what: "AntiCam Mastery project: a working baseball-cap AntiCam and its circuit diagram.",
        source: F.mastery,
      },
      {
        when: "Summer 2025",
        what: "New York University, AB Calculus.",
        source: F.resume,
      },
      {
        when: "Summer 2026",
        what: "Research intern on CeraPiper, Cornell Tech x Technion.",
        source: F.resume,
      },
      {
        when: "2026",
        what: "Graduate Avenues: The World School, Mastery Learning Program.",
        source: F.resume,
      },
      {
        when: "Fall 2026",
        what: "USC Iovine and Young Academy; TroyLabs BUILD, PM division.",
        source: { ...root, claim: "USC and TroyLabs BUILD, fall 2026" },
      },
      {
        when: "FIRST Tech Challenge",
        what: "Seasons are not dated in any source: fabrication lead, then electrical lead on #14712, then operations lead and captain of Tritonics #17253.",
        source: F.tritonics,
        // TODO(alex): open question 6 — season years for every robot and award.
      },
    ],
  },

  awards: {
    id: "awards",
    heading: "Awards",
    records: [
      {
        name: "Think Award, 2nd place, FTC World Championship",
        robot: "Honu",
        team: "#14712",
        role: "Electrical lead",
        source: F.honu,
      },
      {
        name: "1st place in NYC, advancing to the World Championship",
        robot: "Honu",
        team: "#14712",
        role: "Electrical lead",
        source: F.honu,
      },
      {
        name: "2x NYC Champion, Inspire Award",
        role: "Led electrical design, documentation and mentoring",
        source: F.resume,
      },
      {
        name: "Inspire Award, 1st; Inspire Award, 2nd, four times; Connect Award; Innovate Award",
        robot: "Honu",
        team: "#14712",
        role: "Electrical lead",
        source: F.honu,
      },
      {
        name: "Inspire Award, 1st; Inspire Award, 2nd; Innovate Award, 1st",
        robot: "Monti",
        team: "#17253",
        role: "Captain",
        when: "season still ongoing when recorded",
        source: F.tritonics,
      },
      {
        name: "Design Award; Innovate Award, 2nd; Inspire Award, 2nd; Design Award, 3rd",
        robot: "Scorpion",
        team: "#17253",
        role: "Fabrication lead",
        source: { ...pf05, claim: "Scorpion awards" },
      },
      {
        name: "Inspire Award, 1st (Qualifier 3), 2nd (Qualifier 1) and 3rd (Qualifier 9); Sustain Award (Super Qualifier 2)",
        team: "Tritonics #17253",
        role: "Captain",
        when: "FTC DECODE season",
        source: { ...slideE, claim: "FTC DECODE season awards" },
      },
      {
        name: "Hackathon win, NYU Tandon Cyber Security for Computer Science",
        when: "2023",
        source: F.resume,
      },
      // TODO(alex): open question 7 — "2x Worlds qualifier" and the third place in New York with
      // the rebuilt rookie team come only from the project brief and are not printed.
      // TODO(alex): the Hispanic Recognition Scholar, Entrepreneurship Award, Aviator Award, USC
      // IYA Faculty Scholarship and NY State Championship appear only in private drafts and are
      // not printed.
    ],
  },

  tools: {
    heading: "Tools",
    lines: [
      "CAD: SolidWorks, Fusion 360, Onshape, Blender.",
      "Code: Python, Arduino and HTML (proficient); Java, C++ and C (intermediate); eight commercial websites coded.",
      "Shop and electronics: 3D printers, laser cutters, shop tools; Raspberry Pi and Arduino sensors; wood, PLA, resin, acrylic, aluminum and composite plastics.",
    ],
    source: F.resume,
  },

  outreach: {
    heading: "Teaching and outreach",
    lines: [
      "IDEA Club, which I co-founded and lead, has trained 70+ students in 3D CAD and printing, design thinking, rapid prototyping, fabrication and shop safety.⁵",
      "Weekly robotics sessions for younger students at Hudson Guild.",
      "20+ Hour of Code workshops, with a curriculum I wrote for lower-grade students.⁶",
      "An in-school e-waste drive that collected 40+ pounds; a city-wide expansion is planned, not done.⁶",
      "On the robotics team, rookie training is stage-based and one to one, and every rookie finishes a working subsystem and plans an outreach event.⁸",
      "I led the team that launched our FTC micro-funding site after a mid-season budget cut; the site itself is credited on our roster to a teammate.",
      // TODO(alex): open question 12 — the Hour of Code count is 20+ on the portfolio page, 30+
      // in the team documents and other numbers in the private drafts; the portfolio figure is
      // the one printed. The "trained 50+ students in robotics" figure comes only from the
      // project brief and is not printed, and is never merged with the IDEA Club figure.
      // TODO(alex): CAD tutorials in seven languages have no artifact anywhere; not printed.
    ],
  },

  smallerPieces: {
    id: "smaller-pieces",
    heading: "Smaller pieces",
    items: [
      {
        id: "electric-road",
        term: "Electric Road",
        description:
          "An individual Mastery project: a scaled model of a solar road that charges an electric vehicle wirelessly while it moves. I built a scaled testing model to demonstrate the idea.",
        images: [images.er01, images.er02],
        sources: [{ ...pf06, claim: "Electric Road, concept and scaled test model" }],
        // No date, award or statistic exists for this project in any source.
      },
      {
        id: "idea-club",
        term: "IDEA Club",
        description:
          "Co-founder and lead. The program has trained 70+ students in 3D CAD and printing, design thinking, rapid prototyping, fabrication and shop safety.⁵",
        sources: [F.idea],
        // No image of IDEA Club exists in any source.
      },
      {
        id: "outreach",
        term: "Outreach",
        description:
          "Weekly robotics sessions for younger students at Hudson Guild; 20+ Hour of Code workshops and a curriculum for lower-grade students; a school e-waste drive that collected 40+ pounds, with a city-wide expansion planned.⁶ I led the team that launched our FTC micro-funding site.",
        sources: [F.outreach, { ...slideF, claim: "The FTC micro-funding site" }],
      },
    ],
  },

  extendedMemory: {
    id: "extended-memory",
    term: "Concept, not built",
    description:
      "A wearable second memory, glasses or a hat for example, that recalls names, faces and moments only when needed.",
    source: { ...root, claim: "Extended Memory, a concept with no build behind it" },
    // TODO(alex): open question 5 — the project brief is the only source for this and there is
    // no artifact of any kind. Set `approved` to true only if you want the concept note shown.
    approved: false,
  },

  contact: {
    heading: "Contact",
    lines: [
      "Email: alexptully@gmail.com.",
      "Tully Tech: tullytech.com.",
      // TODO(alex): open questions 3 and 4 — a phone-number-free résumé PDF, and which social
      // links (if any) belong here. No source lists one, so none is printed.
    ],
  },

  sources: [
    F.resume,
    F.doorbell,
    F.mastery,
    F.honu,
    F.idea,
    F.outreach,
    F.tritonics,
    F.training,
    F.method,
    F.costCeiling,
    F.limits,
  ],
};
