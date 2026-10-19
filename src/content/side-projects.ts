import type { SideProject, Source, SvgRef, Work, WorkSlug } from "./types";
import { workOrder } from "./projects";

/**
 * The Terra Labs side projects (template `side`), shown after Selected work: Bloom, then the
 * robotic-arm flower. Also the helpers every work page uses: `allWork`, `workBySlug` and
 * `nextWork`.
 *
 * Rules this file is written to (root CLAUDE.md, "Side projects"):
 * - Facts only from `content/notes/sections/14-new-projects.md`, where each one is recorded
 *   with the internal document it comes from. Internal documents are cited by title only.
 * - No teammate is named.
 * - Targets are `Stat`s with `kind: "target"` and print a "Target" label. They are never
 *   presented as results.
 * - No photographs exist yet, so each page carries `todoPhotos` and an authored drawing.
 * - Every source on a page is in that page's `sources` array, by reference, so a renderer can
 *   number it with `sources.indexOf(source) + 1`. Superscripts in prose index the same array.
 *
 * TODO(alex): whether "Terra Labs" is a public name, plus a one-line public description of it.
 */

const NOTES = "content/notes/sections/14-new-projects.md";
const INTERNAL_NOTE =
  "An internal document, cited by title only; its facts are recorded in the site’s content notes.";

/* ============================================================== Bloom ==== */

const BLOOM_PRD = "Bloom PRD F26 v2 (NFC), Terra Labs (internal)";

/** Bloom page footnotes, in `<ol>` order. */
const FB = {
  concept: {
    name: BLOOM_PRD,
    path: `${NOTES}#bloom`,
    claim:
      "Bloom’s concept, its place in the “magical forest” showcase, and Alex’s role: architecture, bill of materials, bracelet and station firmware, Firebase backend, projection code",
    note: INTERNAL_NOTE,
  } satisfies Source,
  v02: {
    name: "Bloom PRD F26, Terra Labs (internal)",
    path: `${NOTES}#bloom`,
    claim: "Bloom v0.2, 22 September 2026: a bracelet that listened for a spoken introduction",
    note: INTERNAL_NOTE,
  } satisfies Source,
  design: {
    name: BLOOM_PRD,
    path: `${NOTES}#bloom`,
    claim:
      "Bloom v0.3, 30 September 2026: why the microphone was dropped, the NFC tap stations, and the bracelet and station hardware as designed",
    note: INTERNAL_NOTE,
  } satisfies Source,
  prototype: {
    name: "Bloom BOM F26 v2 (NFC), Terra Labs (internal)",
    path: `${NOTES}#bloom`,
    claim: "The breadboard bracelet v0, the current prototype, and its parts",
    note: INTERNAL_NOTE,
  } satisfies Source,
  status: {
    name: "Bloom Task Sheet F26 v2 (NFC), Terra Labs (internal)",
    path: `${NOTES}#bloom`,
    claim: "Bloom is at the prototype stage, with the breadboard bracelet v0",
    note: INTERNAL_NOTE,
  } satisfies Source,
  targets: {
    name: BLOOM_PRD,
    path: `${NOTES}#bloom`,
    claim: "Bloom’s targets: bracelets, budget, per-bracelet cost, guests, weight and wrist size",
    note: "Targets, not results. The budget and per-bracelet targets are also in “Bloom BOM F26 v2 (NFC), Terra Labs (internal)”. Both are internal documents, cited by title only.",
  } satisfies Source,
  dates: {
    name: BLOOM_PRD,
    path: `${NOTES}#bloom`,
    claim: "Midpoint check-in 30 October 2026; demo day planned for 4 December 2026",
    note: INTERNAL_NOTE,
  } satisfies Source,
};

/*
 * TODO(alex): stills from "Bloom Terra Video.mp4" are approved but not yet available. When they
 * are, the hero becomes a still (bracelet or hands only, no faces, no text overlays, captioned
 * honestly when it shows the earlier v0.2 concept). Until then: this drawing.
 */
const bloomBracelet: SvgRef = {
  kind: "svg",
  component: "BloomBracelet",
  lit: 3,
  alt: "Drawing of the Bloom bracelet: a band of linked segments carrying five LEDs, three of them lit",
  caption:
    "A drawing of the idea, not the build: the bracelet lights one LED per connection, up to five. Photographs of the prototype are still to come.",
  source: FB.concept,
};

const bloom: SideProject = {
  kind: "side",
  slug: "bloom",
  title: "Bloom",
  oneLine:
    "NFC bracelets that light up as guests meet each other, for an immersive “magical forest” showcase. My role is PM and systems.",
  lead: "Bloom is a bracelet that blooms, lighting one more LED each time its wearer makes a connection, built for an immersive “magical forest” showcase. My role is PM and systems: the architecture, the bill of materials, the firmware, the backend and the projection code.",
  role: "PM and systems: architecture, bill of materials, firmware for the bracelet and the tap stations, Firebase backend, projection code.",
  context: "Terra Labs, fall 2026",
  listing: {
    year: "2026",
    yearSource: FB.concept,
    type: "NFC wearable, showcase",
    role: "PM and systems",
    status: "Prototype stage",
    cover: bloomBracelet,
  },
  hero: bloomBracelet,
  facts: [
    {
      term: "My role",
      value:
        "PM and systems: architecture, bill of materials, firmware for the bracelet and the tap stations, Firebase backend, projection code",
      sources: [FB.concept],
    },
    {
      term: "Where",
      value: "Terra Labs, fall 2026; part of an immersive “magical forest” showcase",
      sources: [FB.concept],
    },
    {
      term: "Status",
      value: "Prototype stage: a breadboard bracelet v0",
      sources: [FB.status, FB.prototype],
    },
    {
      term: "Bracelet, as designed",
      value: "NXP NT3H2111 NTAG I2C plus tag, CH32V003 microcontroller, 5 LEDs, CR2032 coin cell",
      sources: [FB.design],
    },
    {
      term: "Stations, as designed",
      value: "XIAO ESP32-C3 with two RC522 reader pads; connections logged to Firestore over Wi-Fi",
      sources: [FB.design],
    },
    {
      term: "Dates",
      // TODO(alex): confirm the 4 December 2026 demo day.
      value: "Midpoint check-in 30 October 2026; demo day planned for 4 December 2026",
      sources: [FB.dates],
    },
  ],
  sections: [
    {
      id: "the-idea",
      heading: "The idea",
      paragraphs: [
        "Every guest wears a reusable NFC bracelet. Each time they make a connection, it blooms: one to five of its LEDs light up.¹",
        "A connection is two guests tapping bracelets together at one of 4–6 tree-stump stations along the path. Each one grows a projected garden, with a vine drawn between the two people’s flowers.¹",
        "At the exit, the bracelet is traded for a 3D-printed flower whose openness matches how many people the guest met.¹",
      ],
    },
    {
      id: "how-it-works",
      heading: "How it works",
      paragraphs: [
        "Two passive NFC tags cannot talk to each other, so the readers live in shared stations and the bracelets stay cheap and reusable.³",
        "As designed, each station is a XIAO ESP32-C3 with two RC522 reader pads. When two bracelets sit on its pads within about 3 seconds, it logs the connection to Firestore over Wi-Fi and writes each bracelet’s new count to its tag.³",
        "In the bracelet, an NXP NT3H2111 NTAG I2C plus tag on a small PCB with an etched 13.56 MHz antenna wakes a CH32V003 microcontroller, which reads the count over I2C and lights that many of its five LEDs. A CR2032 coin cell powers it.³",
      ],
    },
  ],
  versions: [
    {
      tag: "v0.2",
      date: "22 September 2026",
      sentence:
        "A bracelet that listened for a spoken introduction, using a microphone and a voice-ID app.²",
    },
    {
      tag: "v0.3",
      date: "30 September 2026",
      sentence:
        "The microphone is gone: the room is too loud, and per-bracelet cost matters with about 600 guests expected. Pairing moves to tapping bracelets together at NFC stations.³",
    },
    {
      tag: "Breadboard v0",
      sentence:
        "The current prototype: an NFC Tag 2 click (NTAG I2C) board on a XIAO ESP32-C3 that lights LEDs from a count written to the tag.⁴",
    },
  ],
  targets: [
    {
      value: "about 100",
      unit: "reusable bracelets",
      label: "plus 10 spares",
      source: FB.targets,
      kind: "target",
    },
    {
      value: "about 600",
      unit: "guests",
      label: "over 2 hours, about 150 in the room at once",
      source: FB.targets,
      kind: "target",
    },
    {
      value: "about $750",
      label: "total budget",
      source: FB.targets,
      kind: "target",
    },
    {
      value: "about $2.90",
      label: "per bracelet",
      source: FB.targets,
      kind: "target",
    },
    {
      value: "under 25",
      unit: "g",
      label: "bracelet weight",
      source: FB.targets,
      kind: "target",
    },
    {
      value: "150–200",
      unit: "mm",
      label: "wrist sizes the bracelet fits",
      source: FB.targets,
      kind: "target",
    },
  ],
  architecture: {
    alt: "Four-layer diagram: the bracelet passes its tag to a tap station, the station logs each connection to Firestore over Wi-Fi, and the projection draws the garden from those connections",
    caption:
      "The system as designed in the PRD: bracelet, tap station, Firestore, projection. Readers live in the stations, so the bracelets stay cheap and reusable.",
    source: FB.design,
    layers: [
      {
        name: "Bracelet",
        tech: "NTAG I2C plus tag, CH32V003",
        lines: ["Reads its count from the tag", "Lights that many of 5 LEDs"],
      },
      {
        name: "Tap station",
        tech: "XIAO ESP32-C3, two RC522 readers",
        lines: ["Pairs two bracelets within ~3 s", "Writes each new count to its tag"],
      },
      {
        name: "Firestore",
        tech: "Firebase backend",
        lines: ["Logs every connection"],
      },
      {
        name: "Projection",
        tech: "The projected garden",
        lines: ["A flower for each guest", "A vine for each connection"],
        kind: "physical",
      },
    ],
    links: ["NFC, on the station’s pads", "Wi-Fi", "Connections"],
  },
  moment: {
    component: "BloomCounter",
    intro: "A bracelet lights one LED for each connection its wearer makes, up to five. Make a few.",
    label: "Make a connection",
    resetLabel: "Start over",
    valueText: "{n} of 5 LEDs lit",
    source: FB.design,
  },
  todoPhotos: [
    "Breadboard bracelet v0 (the NFC light-up prototype).",
    "2–4 stills from “Bloom Terra Video.mp4”: bracelet or hands only, no faces, no text overlays; caption any frame that shows the earlier v0.2 concept.",
  ],
  status:
    "Prototype stage. The current build is a breadboard bracelet v0, the NFC light-up prototype.⁵",
  // TODO(alex): confirm the 4 December 2026 demo day.
  next: "The midpoint check-in is on 30 October 2026, and demo day is planned for 4 December 2026.⁷",
  sources: [FB.concept, FB.v02, FB.design, FB.prototype, FB.status, FB.targets, FB.dates],
};

/* ================================================= Robotic-arm flower ==== */
/*
 * TODO(alex): the public name. The working name in the notes is not used until you confirm
 * it, so the page is titled "Robotic-arm flower".
 */

const ARM_NOTES = "Terra Labs project notes, October 2026 (internal)";

/** Robotic-arm flower page footnotes, in `<ol>` order. */
const FF = {
  concept: {
    name: ARM_NOTES,
    path: `${NOTES}#robotic-arm-flower`,
    claim:
      "The concept, the theme, the wristband control (an IMU and a myoelectric sensor) and the team’s four SO-101 arms",
    note: INTERNAL_NOTE,
  } satisfies Source,
  role: {
    name: ARM_NOTES,
    path: `${NOTES}#robotic-arm-flower`,
    claim: "Alex’s role: electrical and firmware (notes of 30 September 2026)",
    note: INTERNAL_NOTE,
  } satisfies Source,
  status: {
    name: ARM_NOTES,
    path: `${NOTES}#robotic-arm-flower`,
    claim:
      "Status, open questions and the planned showcase (notes of 15 October 2026)",
    note: INTERNAL_NOTE,
  } satisfies Source,
};

/* TODO(alex): photos. None exist yet, so the page uses this drawing. */
const armFlowerDrawing: SvgRef = {
  kind: "svg",
  component: "ArmFlower",
  openness: 0.7,
  labels: { wristband: "Wristband", arm: "Arm", flower: "Flower" },
  alt: "Drawing from above: four robot arms, each linked to a wristband, reach toward a central flower that is opening",
  caption:
    "A drawing of the arrangement, not the build: four wristbands, four arms, one flower. The flower mechanism and the wireless link are still open, so neither is drawn.",
  source: FF.concept,
};

const armFlower: SideProject = {
  kind: "side",
  slug: "arm-flower",
  title: "Robotic-arm flower",
  oneLine:
    "Four people, four wristbands, four robot arms: together they light a central flower that blooms. I handle the electrical and firmware side.",
  lead: "Four people each wear a wristband that controls a robotic arm. The arms place orbs that light a central flower, which blooms and reveals a shared prize. I’m on electrical and firmware.",
  role: "Electrical and firmware.",
  context: "Terra Labs, fall 2026",
  listing: {
    year: "2026",
    yearSource: FF.concept,
    type: "Wearable control, robot arms",
    role: "Electrical and firmware",
    status: "Concept to MVP",
    cover: armFlowerDrawing,
  },
  hero: armFlowerDrawing,
  facts: [
    { term: "My role", value: "Electrical and firmware", sources: [FF.role] },
    { term: "Where", value: "Terra Labs, fall 2026", sources: [FF.concept] },
    {
      term: "Control",
      value: "An IMU for wrist rotation and a myoelectric (EMG) sensor for grip, on each wristband",
      sources: [FF.concept],
    },
    { term: "Arms", value: "Four SO-101 robot arms", sources: [FF.concept] },
    { term: "Status", value: "Concept moving to MVP, October 2026", sources: [FF.status] },
    { term: "Showcase", value: "Planned for early December 2026", sources: [FF.status] },
  ],
  sections: [
    {
      id: "the-idea",
      heading: "The idea",
      paragraphs: [
        "Four people each wear a wristband that controls a robotic arm. The arms place orbs that light a central flower, which blooms and reveals a shared prize.¹",
        "The theme is strangers working together.¹",
      ],
    },
    {
      id: "control",
      heading: "Control",
      paragraphs: [
        "Each wristband reads wrist rotation with an IMU and grip with a myoelectric (EMG) sensor. The team has four SO-101 robot arms, one for each wearer.¹",
      ],
    },
    {
      id: "open-questions",
      heading: "Open questions",
      paragraphs: [
        "The flower mechanism: a cable-driven tensegrity stem, or soft robotics.³",
        "Sensing: gel-free EMG at the wrist is noisy, so a wrist pressure sensor is being considered.³",
        "The link: an ESP-based wireless connection from the wrist to the arm.³",
      ],
    },
  ],
  targets: [],
  architecture: {
    alt: "Four-layer diagram: a wristband with an IMU and an EMG sensor sends wrist data over a planned ESP-based wireless link to an SO-101 robot arm, which places orbs on the central flower",
    caption:
      "The control path as planned: wristband, wireless link, arm, flower. The link and the flower mechanism are still open questions.",
    source: FF.status,
    layers: [
      {
        name: "Wristband",
        tech: "IMU and EMG sensor",
        lines: ["Wrist rotation from the IMU", "Grip from the EMG sensor"],
      },
      {
        name: "Wireless link",
        tech: "ESP-based, still open",
        lines: ["From the wrist to the arm"],
      },
      {
        name: "Robot arm",
        tech: "SO-101, one per wearer",
        lines: ["Places an orb on the flower"],
      },
      {
        name: "Flower",
        tech: "Mechanism still open",
        lines: ["Lit by the orbs", "Blooms to reveal a shared prize"],
        kind: "physical",
      },
    ],
    links: ["Wrist data", "Arm commands", "Orbs"],
  },
  todoPhotos: ["Photos of the wristbands, the arms or the flower. None exist yet."],
  status: "A concept moving to MVP, as of October 2026.³",
  next: "A showcase is planned for early December 2026.³",
  sources: [FF.concept, FF.role, FF.status],
};

/* ============================================================ exports ==== */

/** Side projects, in list order. */
export const sideProjects: SideProject[] = [bloom, armFlower];

/** Every page under `/work/`: Selected work in list order, then the side projects. */
export const allWork: Work[] = [...workOrder, ...sideProjects];

/** The work page for a slug, or `undefined` for a slug with no page (the route 404s). */
export function workBySlug(slug: string): Work | undefined {
  return allWork.find((work) => work.slug === slug);
}

/** The next page in `allWork` order: main work, then the side projects, then back to the start. */
export function nextWork(slug: WorkSlug): Work {
  const i = allWork.findIndex((work) => work.slug === slug);
  return allWork[(i + 1) % allWork.length];
}
