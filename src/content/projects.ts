import type {
  ContactSheetItem,
  HomeHero,
  ImageRef,
  ContactBand,
  NowAndNext,
  Project,
  ProjectSlug,
  Source,
  SvgRef,
} from "./types";

/**
 * Every word of project and home copy.
 *
 * Rules this file is written to (root CLAUDE.md, design spec §17):
 * - Only facts that exist in `content/notes/content-brief.md` or the section files under
 *   `content/notes/sections/`. Where sources disagree, the copy is omitted and a
 *   TODO(alex) comment says what is missing.
 * - Every statistic carries a `Source` with a path or an href, and renders with a visible
 *   footnote.
 * - Team figures carry `attribution: "team"`; the renderer prints "(team measurement)".
 * - Superscript digits inside prose strings are 1-based indices into that page's `sources`
 *   array. `Stat` renderers add their own footnote link and carry no superscript in `value`.
 */

/* ============================================================ sources ==== */

const S = {
  resume: {
    name: "Résumé, 2026",
    path: "content/source/resume/resume-current.png",
  },
  root: {
    name: "Project brief (root CLAUDE.md)",
    path: "CLAUDE.md",
  },

  // AntiCam
  deck: {
    name: "AntiCam pitch deck",
    path: "content/source/anticam/pitch-deck-build.js",
  },
  outline: {
    name: "AntiCam pitch-deck outline",
    path: "content/source/anticam/pitch-deck-outline.md",
  },
  mastery: {
    name: "AntiCam Mastery Learning plan, page 3",
    path: "content/source/anticam/mastery-learning-plan/text.md#page-3",
  },
  cb07: { name: "AntiCam presentation, page 7", path: "content/source/anticam/camera-blinder-presentation/pages/page-07.jpg" },
  cb08: { name: "AntiCam presentation, page 8", path: "content/source/anticam/camera-blinder-presentation/pages/page-08.jpg" },
  cb09: { name: "AntiCam presentation, page 9", path: "content/source/anticam/camera-blinder-presentation/pages/page-09.jpg" },
  cb10: { name: "AntiCam presentation, page 10", path: "content/source/anticam/camera-blinder-presentation/pages/page-10.jpg" },
  cb11: { name: "AntiCam presentation, page 11", path: "content/source/anticam/camera-blinder-presentation/pages/page-11.jpg" },
  cb12: { name: "AntiCam presentation, page 12", path: "content/source/anticam/camera-blinder-presentation/pages/page-12.jpg" },
  cb13: { name: "AntiCam presentation, page 13", path: "content/source/anticam/camera-blinder-presentation/pages/page-13.jpg" },
  cb14: { name: "AntiCam presentation, page 14", path: "content/source/anticam/camera-blinder-presentation/pages/page-14.jpg" },
  cb15: { name: "AntiCam presentation, page 15", path: "content/source/anticam/camera-blinder-presentation/pages/page-15.jpg" },
  cb16: { name: "AntiCam presentation, page 16", path: "content/source/anticam/camera-blinder-presentation/pages/page-16.jpg" },
  cb17: { name: "AntiCam presentation, page 17", path: "content/source/anticam/camera-blinder-presentation/pages/page-17.jpg" },
  ipx: {
    name: "IPX1031 surveillance rental study, June 2025",
    href: "https://www.ipx1031.com/surveillance-rental-study/",
  },
  comparitech: {
    name: "Comparitech, US surveillance camera statistics, January 2024",
    href: "https://www.comparitech.com/blog/vpn-privacy/us-surveillance-camera-statistics/",
  },
  airbnb: {
    name: "Airbnb, security cameras and recording devices policy",
    href: "https://www.airbnb.com/help/article/3061",
  },
  fcc: {
    name: "FCC, jammer enforcement",
    href: "https://www.fcc.gov/general/jammer-enforcement",
  },

  // Prosthetic arm
  brief: (page: number): Source => ({
    name: `Prosthetic arm design brief, page ${page}`,
    path: `content/source/prosthetic-arm/design-brief/text.md#page-${page}`,
  }),
  briefImg: (page: string): Source => ({
    name: `Prosthetic arm design brief, page ${Number(page)}`,
    path: `content/source/prosthetic-arm/design-brief/pages/page-${page}.jpg`,
  }),

  // Robotics
  pf01: { name: "Portfolio page “Monti Robot, FTC #17253”", path: "content/source/portfolio/01-monti-robot.jpg" },
  pf02: { name: "Portfolio page “Swerve Drive, FTC #14712”", path: "content/source/portfolio/02-swerve-drive.jpg" },
  pf03: { name: "Portfolio page “Honu Robot, FTC #14712”", path: "content/source/portfolio/03-honu-robot.jpg" },
  pf04: { name: "Portfolio page “Ball-Drive, FTC #17253”", path: "content/source/portfolio/04-ball-drive.jpg" },
  pf05: { name: "Portfolio page “Scorpion Robot, FTC #17253”", path: "content/source/portfolio/05-scorpion-robot.jpg" },
  pf06: { name: "Portfolio page “Electric Road”", path: "content/source/portfolio/06-electric-road.jpg" },
  pf07: { name: "Portfolio page “Community Events”", path: "content/source/portfolio/07-community-events.jpg" },
  ep1: { name: "Tritonics engineering portfolio, page 1", path: "content/source/robotics/tritonics-portfolio/nyc-champs-portfolio-1.png" },
  ep2: { name: "Tritonics engineering portfolio, page 2", path: "content/source/robotics/tritonics-portfolio/nyc-champs-portfolio-2.png" },
  ep3: { name: "Tritonics engineering portfolio, page 3", path: "content/source/robotics/tritonics-portfolio/nyc-champs-portfolio-3.png" },
  ep4: { name: "Tritonics engineering portfolio, page 4", path: "content/source/robotics/tritonics-portfolio/nyc-champs-portfolio-4.png" },
  ep6: { name: "Tritonics engineering portfolio, page 6", path: "content/source/robotics/tritonics-portfolio/nyc-champs-portfolio-6.png" },
  slideC: { name: "Tritonics championship presentation, sustainability slide", path: "content/source/robotics/championships-presentation/slide-c.png" },
  slideE: { name: "Tritonics championship presentation, team roster slide", path: "content/source/robotics/championships-presentation/slide-e.jpg" },
  slideF: { name: "Tritonics championship presentation, budget slide", path: "content/source/robotics/championships-presentation/slide-f.png" },
  posterA: { name: "Tritonics poster A", path: "content/source/robotics/posters/poster-a.png" },
  posterF: { name: "Tritonics poster F", path: "content/source/robotics/posters/poster-f.png" },
  deckP1: { name: "Tritonics poster deck, page 1", path: "content/source/robotics/posters/poster-deck/text.md#page-1" },
  deckP3: { name: "Tritonics poster deck, page 3", path: "content/source/robotics/posters/poster-deck/text.md#page-3" },
  deckP10: { name: "Tritonics poster deck, page 10", path: "content/source/robotics/posters/poster-deck/text.md#page-10" },
  deckP13img: { name: "Tritonics poster deck, page 13", path: "content/source/robotics/posters/poster-deck/pages/page-13.jpg" },
  deckP15: { name: "Tritonics poster deck, page 15", path: "content/source/robotics/posters/poster-deck/text.md#page-15" },
  deckP15img: { name: "Tritonics poster deck, page 15", path: "content/source/robotics/posters/poster-deck/pages/page-15.jpg" },
  deckP17: { name: "Tritonics poster deck, page 17", path: "content/source/robotics/posters/poster-deck/text.md#page-17" },

  // CeraPiper
  readme: { name: "CeraPiper README", path: "content/source/cerapiper/README.md" },
  scf: {
    name: "Berman, Seiz and Roumen, “CeraPiper: Custom Extruded Ceramics for Heat Exchange”, ACM SCF 2025",
    href: "https://doi.org/10.1145/3745778.3766644",
  },
};

/* ========================================================== footnotes ==== */
/*
 * Footnote objects are shared by reference between the figure that cites them and the page
 * `sources` array that renders the numbered `<ol>`, so a renderer can resolve a `Stat`'s
 * footnote number with `sources.indexOf(stat.source) + 1`.
 */

/** The four home-page footnotes (§5.6), reused as each project's lineup `proof` source. */
const F = {
  anticamPrototypes: {
    ...S.outline,
    claim: "30+ prototypes, four major versions, tested against a live doorbell camera",
    note: "The same line appears word for word on the résumé.",
  } satisfies Source,
  armPrototypes: {
    ...S.resume,
    claim: "90+ prosthetic arm prototypes",
  } satisfies Source,
  honuResults: {
    ...S.pf03,
    claim: "1st in NYC and the 2nd-place Think Award at the FTC World Championship",
    note: "Also stated on the résumé.",
  } satisfies Source,
  scfPaper: {
    ...S.scf,
    claim: "The earlier CeraPiper CAM version, published at ACM SCF 2025",
    note: "The CAD layer is written up in a paper that is currently under review.",
  } satisfies Source,
};

/** AntiCam page footnotes, in `<ol>` order. */
const FA = {
  prototypes: F.anticamPrototypes,
  doorbell: { ...S.cb15, claim: "Ring doorbell night-mode test, 7 June 2023" } satisfies Source,
  ipx: { ...S.ipx, claim: "47% of Americans have found a camera at a vacation rental" } satisfies Source,
  cameras: { ...S.comparitech, claim: "About 537,000 cameras in the 50 largest U.S. cities" } satisfies Source,
  airbnb: { ...S.airbnb, claim: "Airbnb banned indoor security cameras from 30 April 2024" } satisfies Source,
  jammers: { ...S.fcc, claim: "Jammers are illegal under the Communications Act" } satisfies Source,
};

/** Prosthetic arm page footnotes, in `<ol>` order. */
const FP = {
  prototypes: F.armPrototypes,
  autoSizing: {
    ...S.brief(13),
    claim: "Auto-sizing runs to 500 iterations and reports part mass per cell configuration",
  } satisfies Source,
  fingerParts: {
    ...S.brief(7),
    claim: "A finger is six printed pieces plus two pin rods",
  } satisfies Source,
  parameters: {
    ...S.brief(12),
    claim: "Seven labelled hand measurements across Digits 1–5",
  } satisfies Source,
  subsystems: {
    ...S.brief(8),
    claim: "The forearm houses five subsystems",
  } satisfies Source,
  requirements: {
    ...S.brief(5),
    claim: "The functional requirements, including performing more than 80% of common tasks",
    note: "A requirement in the brief; no test against the 80% threshold is reported anywhere.",
  } satisfies Source,
};

/** Robotics page footnotes, in `<ol>` order. All four are team measurements. */
const FR = {
  iterations: {
    ...S.ep1,
    claim: "Five full robot iterations; 4 intake, 3 launcher and 2 transfer iterations in wood",
    note: "Team measurement.",
  } satisfies Source,
  launcher: {
    ...S.ep4,
    claim: "200+ launcher trials, 8 mm compression, v = d · 2.64 + 1013, correlation 0.9880",
    note: "Team measurement; also printed on poster F and poster-deck page 10.",
  } satisfies Source,
  localization: {
    ...S.deckP10,
    claim: "98% AprilTag lock, 100% odometry availability, ±0.2 cm path deviation",
    note: "Team measurement.",
  } satisfies Source,
  growth: {
    ...S.slideE,
    claim: "Growth from 7 to 14 members in one season and a 67% female rookie class",
    note: "Team figures; the growth figure is also on the budget slide.",
  } satisfies Source,
  intake: {
    ...S.deckP15,
    claim: "Intake iterations: 85% at 7 s, then 97% at 5 s, then 100% at 2 s",
    note: "Team measurement.",
  } satisfies Source,
  modularity: {
    ...S.ep1,
    claim: "The 8-screw rule: each subsystem removable in 45 seconds at most",
    note:
      "Team measurement; also on poster-deck page 13. The project brief calls Monti screwless, which the team's own documents do not.",
  } satisfies Source,
};

/** CeraPiper page footnotes, in `<ol>` order. */
const FC = {
  constraints: {
    ...S.readme,
    claim:
      "Outer diameter 40–78 mm, rotation in 30° increments, an 800 mm bed minus 60 mm start and end pieces, a 150 mm span advisory",
  } satisfies Source,
  apiRequests: {
    ...S.readme,
    claim: "Version 2.1 cut Onshape API requests to about one per import",
  } satisfies Source,
  paper: F.scfPaper,
};

/* ============================================================= images ==== */
/*
 * Ids, crops, native sizes, grounds, alt text and clearance follow design spec §12.2.
 * WP2 builds these files from the same table; ids must match exactly.
 * Nothing is displayed wider than its native `width`.
 */

const ac01: ImageRef = {
  id: "ac-01-v1-led-face",
  src: "/images/anticam/ac-01-v1-led-face.jpg",
  width: 500,
  height: 475,
  ground: "light",
  alt: "AntiCam V1 pin seen from the emitter side: a white plate with a grid of emitters glowing magenta, inside a textured black rim and maroon body",
  caption:
    "AntiCam, final prototype V1, emitter side. Phone camera: the emitters read magenta because the sensor sees near-infrared; to the eye they are dark.",
  source: S.cb12,
  cleared: true,
};

const ac02: ImageRef = {
  id: "ac-02-v1-lid-side",
  src: "/images/anticam/ac-02-v1-lid-side.jpg",
  width: 490,
  height: 380,
  ground: "light",
  alt: "AntiCam V1 pin from the lid side: a blue lid with the Tully Tech mark engraved, black rim, maroon body",
  caption: "Final V1 from the lid side, with the mark engraved into the frosted lid.",
  source: S.cb12,
  cleared: true,
};

const ac03: ImageRef = {
  id: "ac-03-test2-glow",
  src: "/images/anticam/ac-03-test2-glow.jpg",
  width: 520,
  height: 525,
  ground: "photo",
  alt: "A lit COB LED module photographed by a phone: a bright white square in a wide magenta halo on a dark wall",
  caption:
    "Test 2, phone camera: the emitter reads magenta to a sensor and dark to the eye.",
  source: S.cb09,
  cleared: true,
};

const ac04: ImageRef = {
  id: "ac-04-ring-on",
  src: "/images/anticam/ac-04-ring-on.jpg",
  width: 960,
  height: 541,
  ground: "photo",
  alt: "Ring doorbell night-vision frame, 7 June 2023: a street at night, a figure on the steps washed out to a glowing orb where the face would be",
  caption:
    "Ring doorbell, night mode, pin prototype on: the sensor records a glowing orb where the face should be.",
  date: "7 June 2023",
  source: S.cb15,
  // TODO(alex): open question 2 — clear this frame. It shows a residential street and a
  // person. Until then the home row shows the V2 colourways and the compare shows Test 2.
  cleared: false,
};

const ac05: ImageRef = {
  id: "ac-05-ring-off",
  src: "/images/anticam/ac-05-ring-off.jpg",
  width: 888,
  height: 500,
  ground: "photo",
  alt: "The same street from the same Ring doorbell in colour night mode, device off: parked cars, a lit tree, no glow",
  caption: "The same Ring doorbell and the same street with the device off.",
  date: "7 June 2023",
  source: S.cb16,
  // TODO(alex): open question 2 — same clearance as ac-04.
  cleared: false,
};

const ac06: ImageRef = {
  id: "ac-06-v2-colorways",
  src: "/images/anticam/ac-06-v2-colorways.jpg",
  width: 690,
  height: 240,
  ground: "light",
  alt: "Three AntiCam V2 pins side by side: white, dark gray and navy, each with a clear top showing the emitter module",
  caption: "Final prototype V2: white, dark gray and navy colourways.",
  source: S.cb15,
  cleared: true,
};

const ac07: ImageRef = {
  id: "ac-07-v2-flatlay",
  src: "/images/anticam/ac-07-v2-flatlay.jpg",
  width: 620,
  height: 460,
  // The desk this was shot on is levelled onto `--plate-light` in the built file (its border
  // measures exactly the token), so it belongs on a light plate.
  ground: "light",
  alt: "Six clear laser-cut acrylic plates for the AntiCam V2 pin laid flat: the LED plate with its module, a plate with four coin cells and a slide switch, spacer plates and the engraved lid",
  caption: "V2 process: six clear acrylic plates, coin cells and a slide switch.",
  source: S.cb13,
  cleared: true,
};

const ac08: ImageRef = {
  id: "ac-08-cob-module-hand",
  src: "/images/anticam/ac-08-cob-module-hand.jpg",
  width: 300,
  height: 300,
  ground: "photo",
  alt: "A hand holding the 10 W-class COB LED module: white ceramic body, a grid of emitter dies, metal solder tabs",
  caption: "The COB emitter module: a grid of emitter dies on a ceramic body, with solder tabs.",
  source: S.cb14,
  cleared: true,
};

const ac09: ImageRef = {
  id: "ac-09-mdf-laser-bed",
  src: "/images/anticam/ac-09-mdf-laser-bed.jpg",
  width: 715,
  height: 505,
  ground: "photo",
  alt: "Laser-cut MDF plates for the second prototype on the laser bed, Tully Tech engraved",
  caption: "Second prototype, MDF on the laser bed, with the mark engraved into the lid.",
  source: S.cb10,
  cleared: true,
};

const ac10: ImageRef = {
  id: "ac-10-laser-engraving",
  src: "/images/anticam/ac-10-laser-engraving.jpg",
  width: 520,
  height: 285,
  ground: "photo",
  alt: "A laser cutter head engraving the Tully Tech mark through blue masking tape",
  caption: "Engraving the mark through masking tape on the laser cutter.",
  source: S.cb10,
  cleared: true,
};

const ac11: ImageRef = {
  id: "ac-11-nine-cell-plate",
  src: "/images/anticam/ac-11-nine-cell-plate.jpg",
  width: 360,
  height: 345,
  ground: "photo",
  alt: "A clear acrylic plate carrying nine coin cells joined by solder links and wire",
  caption: "Third prototype: nine hand-soldered coin cells on an acrylic plate.",
  source: S.cb11,
  cleared: true,
};

/** Registry-only: a second battery-plate variant. Not placed on a page. */
const ac12: ImageRef = {
  id: "ac-12-copper-tape-plate",
  src: "/images/anticam/ac-12-copper-tape-plate.jpg",
  width: 325,
  height: 270,
  ground: "photo",
  alt: "A battery plate with coin cells, copper-tape bus bars and soldered leads",
  caption: "Coin cells joined with copper-tape bus bars.",
  source: S.cb11,
  cleared: true,
};

const ac13: ImageRef = {
  id: "ac-13-v1-first-carrier",
  src: "/images/anticam/ac-13-v1-first-carrier.jpg",
  width: 265,
  height: 240,
  ground: "photo",
  alt: "The first prototype: a navy laser-cut disc with the white COB module seated in a cross-shaped cutout",
  caption: "First prototype: one IR module on laser-cut discs, run from coin cells.",
  source: S.cb08,
  cleared: true,
};

/** TODO(alex): open question 2 — confirm the cap brim photo is a real prototype, then clear it. */
const ac14: ImageRef = {
  id: "ac-14-cap-brim",
  src: "/images/anticam/ac-14-cap-brim.jpg",
  width: 300,
  height: 365,
  ground: "photo",
  alt: "The underside of a black cap brim with about six small LEDs set into a reflective lining",
  caption: "Cap V2: emitters set under the brim, with the lining behind them.",
  source: S.cb17,
  cleared: false,
};

const ac15: ImageRef = {
  id: "ac-15-v2-parts-angled",
  src: "/images/anticam/ac-15-v2-parts-angled.jpg",
  width: 470,
  height: 295,
  // A photograph on a mid-grey desk: levelling it onto the light plate would clip the clear
  // acrylic to white, so it keeps its own ground on `--bg` like the other bench shots.
  ground: "photo",
  alt: "The V2 clear acrylic parts laid out at an angle: cells and switch plate, LED plate, cutout plates, engraved lid",
  caption: "The V2 stack laid out in order: cells and switch, emitter plate, spacers, lid.",
  source: S.cb14,
  cleared: true,
};

/**
 * Registry-only. TODO(alex): the first light-test frame is out of focus; it ships only if a
 * clean region can be cropped from a better original (open question 14).
 */
const ac16: ImageRef = {
  id: "ac-16-light-test",
  src: "/images/anticam/ac-16-light-test.jpg",
  width: 160,
  height: 89,
  ground: "photo",
  alt: "Out-of-focus alligator-clip leads on a wooden bench during the first light test",
  caption: "First light test on the bench.",
  source: S.cb07,
  cleared: false,
};

const pa01: ImageRef = {
  id: "pa-01-arm-ghosted",
  src: "/images/prosthetic-arm/pa-01-arm-ghosted.jpg",
  width: 641,
  height: 468,
  ground: "dark",
  alt: "Render of the prosthetic arm with a translucent forearm: a stack of servos, gears and a circuit board visible inside, white fingers above",
  caption:
    "Render of the whole arm: servo stack, gears and board through the translucent forearm.",
  source: S.briefImg("10"),
  cleared: true,
};

const pa02: ImageRef = {
  id: "pa-02-arm-exploded-build",
  src: "/images/prosthetic-arm/pa-02-arm-exploded-build.jpg",
  width: 960,
  height: 393,
  ground: "light",
  alt: "The physical arm exploded on a light gray tray: white printed palm and fingers, glossy black forearm and wrist collar, loose knuckle caps and pins",
  caption:
    "The final build exploded: hand, wrist collar and end plate print as separate segments.",
  source: S.briefImg("14"),
  cleared: true,
};

const pa03: ImageRef = {
  id: "pa-03-arm-cad-exploded",
  src: "/images/prosthetic-arm/pa-03-arm-cad-exploded.jpg",
  width: 860,
  height: 502,
  ground: "dark",
  alt: "Exploded parametric CAD of the arm with construction sketches, datum lines and constraint points",
  caption: "The parametric model exploded, with its construction sketches and datums.",
  source: S.briefImg("12"),
  cleared: true,
};

const pa04: ImageRef = {
  id: "pa-04-arm-profile",
  src: "/images/prosthetic-arm/pa-04-arm-profile.jpg",
  width: 841,
  height: 222,
  ground: "dark",
  alt: "Profile render of the finished arm: glossy black conical forearm and five white printed fingers extended flat",
  caption: "The finished arm in profile, fingers extended.",
  source: S.briefImg("08"),
  cleared: true,
};

const pa05: ImageRef = {
  id: "pa-05-forearm-open",
  src: "/images/prosthetic-arm/pa-05-forearm-open.jpg",
  width: 274,
  height: 700,
  // A cut-out on a pure-black slide: the pipeline keys the black onto `--bg`, so the label
  // matches what is on disk.
  ground: "dark",
  alt: "The physical forearm standing upright with its shell opened: stacked black servos, red and black wiring, a green Arduino-style board, the white hand on top",
  caption: "The forearm opened: servo stack, wiring, Arduino-style board.",
  source: S.briefImg("08"),
  cleared: true,
};

const pa06: ImageRef = {
  id: "pa-06-finger-bent-annotated",
  src: "/images/prosthetic-arm/pa-06-finger-bent-annotated.jpg",
  width: 330,
  height: 270,
  ground: "dark",
  alt: "A bent printed finger with the elastic cord path traced in red outside the bend and the Kevlar cord path in blue inside",
  caption: "From the design brief: elastic (red) and Kevlar (blue) paths.",
  source: S.briefImg("07"),
  cleared: true,
};

/** Registry-only alternative tile for the "Finger prints" ledger row. */
const pa07: ImageRef = {
  id: "pa-07-finger-exploded-strip",
  src: "/images/prosthetic-arm/pa-07-finger-exploded-strip.jpg",
  width: 700,
  height: 180,
  ground: "dark",
  alt: "Six printed finger pieces and two pin rods laid in a row",
  caption: "One finger: six printed pieces and two pin rods.",
  source: S.briefImg("07"),
  cleared: true,
};

const pa09: ImageRef = {
  id: "pa-09-gray-hand-print",
  src: "/images/prosthetic-arm/pa-09-gray-hand-print.jpg",
  width: 241,
  height: 342,
  ground: "dark",
  alt: "An assembled gray 3D-printed hand, back view, fingers extended, print lines visible",
  caption: "An assembled gray printed hand, after the first finger test prints.",
  source: S.briefImg("06"),
  cleared: true,
};

const pa10: ImageRef = {
  id: "pa-10-hand-back-black",
  src: "/images/prosthetic-arm/pa-10-hand-back-black.jpg",
  width: 510,
  height: 535,
  ground: "dark",
  alt: "The finished black printed hand seen from the back, five segmented fingers",
  caption: "The finished hand from the back, five segmented fingers.",
  source: S.briefImg("10"),
  cleared: true,
};

const rb01: ImageRef = {
  id: "rb-01-monty-render-white",
  src: "/images/robotics/rb-01-monty-render-white.jpg",
  // The clean rectangle in the poster is portrait and this small; the crop is never upscaled.
  width: 176,
  height: 296,
  // Not a render on a plain ground: the only Monti render free of baked-on callouts is a crop
  // of a printed poster, and it carries the poster's own gradient (white at the top, navy at
  // the bottom). No single plate colour makes that edge vanish, so it sits as a photograph.
  // TODO(alex): a 2400 px re-render of Monti on a plain ground, straight from the CAD file,
  // would put this and rb-02 back on a light plate.
  ground: "photo",
  alt: "Team CAD render of Monti: blue and silver chassis with Voronoi-cut side plates and a turreted launcher on top",
  caption:
    "Monti, Tritonics #17253: team CAD render, turreted launcher and three-ball sorting intake.",
  source: S.ep1,
  cleared: true,
};

const rb02: ImageRef = {
  id: "rb-02-monty-render-poster",
  src: "/images/robotics/rb-02-monty-render-poster.jpg",
  width: 179,
  height: 278,
  // Same poster ground as rb-01; see the note there.
  ground: "photo",
  alt: "Team CAD render of Monti seen from above the front: the turreted launcher on its ring and the blue-and-silver Voronoi side plates below it",
  caption: "Monti, Tritonics #17253: team CAD render, three-quarter view.",
  source: S.deckP13img,
  cleared: true,
};

const rb03: ImageRef = {
  id: "rb-03-wooden-prototype",
  src: "/images/robotics/rb-03-wooden-prototype.jpg",
  width: 195,
  height: 160,
  ground: "photo",
  alt: "A first-iteration robot built entirely from wooden plates, blue subsystem parts fitted",
  caption: "First iterations entirely in wooden plates, before metal.",
  source: S.ep1,
  cleared: true,
};

const rb04: ImageRef = {
  id: "rb-04-transfer-render",
  src: "/images/robotics/rb-04-transfer-render.jpg",
  // Callout boxes bound the annotation-free rectangle at this size.
  width: 288,
  height: 290,
  ground: "light",
  alt: "Render of the transfer: three purple artifacts in a silver Voronoi frame with a tubing roller",
  caption: "The transfer: three artifacts held in order in a Voronoi-cut frame.",
  source: S.ep3,
  cleared: true,
};

const rb05: ImageRef = {
  id: "rb-05-launcher-render",
  src: "/images/robotics/rb-05-launcher-render.jpg",
  // The clean band around the launcher is landscape, not portrait.
  width: 340,
  height: 228,
  ground: "light",
  alt: "Render of the launcher: blue turret ring, adjustable hood and a weighted flywheel",
  caption: "The launcher: hooded flywheel on a 1:1 dual-servo turret.",
  source: S.ep4,
  cleared: true,
};

const rb06: ImageRef = {
  id: "rb-06-swerve-chassis",
  src: "/images/robotics/rb-06-swerve-chassis.jpg",
  width: 400,
  height: 285,
  ground: "dark",
  alt: "Swerve drive chassis: four corner modules with toothed belts and bevel gears on a silver frame",
  caption: "Swerve Drive, #14712: four steerable corner modules on a silver frame.",
  source: S.pf02,
  cleared: true,
};

const rb07: ImageRef = {
  id: "rb-07-swerve-module",
  src: "/images/robotics/rb-07-swerve-module.jpg",
  width: 230,
  height: 200,
  ground: "dark",
  alt: "One swerve module: a wheel under a belt-driven steering plate with its motor",
  caption: "One module: a wheel under a belt-driven steering plate.",
  source: S.pf02,
  cleared: true,
};

const rb08: ImageRef = {
  id: "rb-08-monti-portfolio-render",
  src: "/images/robotics/rb-08-monti-portfolio-render.jpg",
  width: 295,
  height: 240,
  ground: "dark",
  alt: "Monti render: blue Voronoi side plates and a turreted launcher",
  caption: "Monti, #17253: Voronoi-cut side plates, turreted launcher.",
  source: S.pf01,
  cleared: true,
};

const rb09: ImageRef = {
  id: "rb-09-honu-render",
  src: "/images/robotics/rb-09-honu-render.jpg",
  width: 270,
  height: 235,
  ground: "dark",
  alt: "Honu: a green lattice chassis with a lift tower and gripper head",
  caption: "Honu, #14712: lattice chassis, lift tower and gripper head.",
  source: S.pf03,
  cleared: true,
};

const rb10: ImageRef = {
  id: "rb-10-scorpion-render",
  src: "/images/robotics/rb-10-scorpion-render.jpg",
  width: 258,
  height: 210,
  ground: "light",
  alt: "Scorpion on mecanum wheels with its scissor lift raised",
  caption: "Scorpion, #17253: mecanum wheels, scissor lift raised.",
  source: S.pf05,
  cleared: true,
};

const rb11: ImageRef = {
  id: "rb-11-scorpion-lift-drawing",
  src: "/images/robotics/rb-11-scorpion-lift-drawing.jpg",
  width: 200,
  height: 170,
  ground: "dark",
  alt: "Line drawing of the scissor lift: crossed beams with a motor at the base",
  caption: "The scissor lift drawn out: a motor at the base pulls the beams together.",
  source: S.pf05,
  cleared: true,
};

const rb12: ImageRef = {
  id: "rb-12-ball-drive",
  src: "/images/robotics/rb-12-ball-drive.jpg",
  width: 390,
  height: 220,
  ground: "dark",
  alt: "Ball-Drive chassis: four ball modules in a blue frame engraved 17253 Tritonics",
  caption: "Ball-Drive, #17253: four two-axis ball modules in place of wheels.",
  source: S.pf04,
  cleared: true,
};

const rb13: ImageRef = {
  id: "rb-13-intake-v1",
  src: "/images/robotics/rb-13-intake-v1.jpg",
  width: 160,
  height: 120,
  ground: "light",
  alt: "Gray flat-ramp intake plate, version 1",
  caption: "Intake V1: a flat ramp.",
  source: S.deckP15img,
  cleared: true,
};

const rb14: ImageRef = {
  id: "rb-14-intake-v2",
  src: "/images/robotics/rb-14-intake-v2.jpg",
  width: 160,
  height: 140,
  ground: "light",
  alt: "Light-blue intake ramp with three vectoring slots, version 2",
  caption: "Intake V2: three vectoring slots.",
  source: S.deckP15img,
  cleared: true,
};

const rb15: ImageRef = {
  id: "rb-15-intake-v3",
  src: "/images/robotics/rb-15-intake-v3.jpg",
  width: 160,
  height: 140,
  ground: "light",
  alt: "Dark-blue intake ramp with a centred U-shaped transfer port, version 3",
  caption: "Intake V3: a centred transfer port.",
  source: S.deckP15img,
  cleared: true,
};

const rb16: ImageRef = {
  id: "rb-16-intake-three",
  src: "/images/robotics/rb-16-intake-three.jpg",
  width: 255,
  height: 157,
  // The crop keeps the portfolio page's own dark card ground (#3D3E43), which is neither
  // `--plate-light` nor `--bg` and cannot be levelled onto either without crushing the
  // render. It sits as a photograph on `--bg` rather than inventing a third plate colour.
  ground: "photo",
  alt: "The sorting intake holding three artifacts, one green and two purple",
  caption: "The sorting intake holding three artifacts at once.",
  source: S.ep2,
  cleared: true,
};

const er01: ImageRef = {
  id: "er-01-electric-road-model",
  src: "/images/about/er-01-electric-road-model.jpg",
  width: 325,
  height: 150,
  ground: "photo",
  alt: "The scaled Electric Road test model: hand-wound copper coils on a blue mat, a green receiver board and a breadboard",
  caption: "The scaled test model: hand-wound coils, receiver board, breadboard.",
  source: S.pf06,
  cleared: true,
};

const er02: ImageRef = {
  id: "er-02-electric-road-render",
  src: "/images/about/er-02-electric-road-render.jpg",
  width: 320,
  height: 195,
  ground: "dark",
  alt: "Concept render: a gray road with a purple car and roadside pillars topped with solar panels carrying coil disks",
  caption: "The concept: solar pillars feeding coils set into the road.",
  source: S.pf06,
  cleared: true,
};

/**
 * Registry-only. TODO(alex): open questions 2 and 3 — the only clear photo of Alex in the
 * source set is about 110 px wide and shows a school event. Not used until a
 * higher-resolution original exists and it is cleared.
 */
const ou01: ImageRef = {
  id: "ou-01-ewaste",
  src: "/images/about/ou-01-ewaste.jpg",
  width: 110,
  height: 235,
  ground: "photo",
  alt: "Alex crouching beside black e-waste collection bins",
  caption: "The in-school e-waste drive.",
  source: S.pf07,
  cleared: false,
};

/** Every image the site knows about, cleared or not. WP2 builds from the same ids. */
export const images = {
  ac01, ac02, ac03, ac04, ac05, ac06, ac07, ac08,
  ac09, ac10, ac11, ac12, ac13, ac14, ac15, ac16,
  pa01, pa02, pa03, pa04, pa05, pa06, pa07, pa09, pa10,
  rb01, rb02, rb03, rb04, rb05, rb06, rb07, rb08,
  rb09, rb10, rb11, rb12, rb13, rb14, rb15, rb16,
  er01, er02, ou01,
} as const;

/* ============================================================ AntiCam ==== */

const anticamContactSheet: ContactSheetItem[] = [
  { label: "First prototype", image: ac13 },
  { label: "Test 2, phone camera", image: ac03 },
  { label: "Second prototype, MDF on the laser bed", image: ac09 },
  { label: "Third prototype, nine coin cells", image: ac11 },
  { label: "Final V1", image: ac02 },
  { label: "V2 process, six acrylic plates", image: ac07 },
  { label: "Final V2, three colourways", image: ac06 },
  // TODO(alex): the contact sheet also wants "Light test" (ac-16, too blurry to crop clean),
  // "Doorbell test, 7 June 2023" (ac-04, awaiting clearance) and "Cap V2, brim underside"
  // (ac-14, awaiting confirmation that it is a real prototype). Omitted until then.
];

const anticam: Project = {
  slug: "anticam",
  title: "AntiCam",
  oneLine:
    "A wearable that keeps cameras from capturing a usable image of me. An infrared LED array washes out night-vision sensors and a retro-reflective lining returns flashes to the lens. Nothing is jammed, nothing is damaged.",
  lead: "AntiCam is my wearable privacy device: an infrared LED array and a retro-reflective lining that keep cameras from capturing a usable image of me, without jamming or damaging anything.",
  // "Sole" is not in any source: content-map §3 records that no source states he worked
  // alone, and the page's own "What others did" says only that no collaborator is named.
  role: "Founder, Tully Tech. Designer and builder.",
  proof: {
    value: "30+ prototypes, four major versions, tested against a live doorbell camera",
    label: "AntiCam build record",
    source: F.anticamPrototypes,
    attribution: "alex",
  },
  hero: {
    ...ac01,
    caption:
      // TODO(alex): confirm the emitter die count. The presentation describes a 3-by-3 grid;
      // the module in this photograph reads as three rows of roughly nine dies. No count is
      // printed until the two agree.
      "Final prototype V1, emitter side, through a phone camera. The emitters read magenta because the sensor responds to near-infrared; to the eye they are dark.",
  },
  homePlate: {
    kind: "diptych",
    a: ac05,
    b: ac04,
    fallback: ac06,
    caption:
      "Same Ring doorbell, night mode, 7 June 2023. Above: device off. Below: pin prototype on; the sensor records a glowing orb where the face should be.",
    fallbackCaption: "Final prototype V2: white, dark gray and navy colourways.",
  },
  spec: [
    {
      term: "My role",
      value: "Founder, Tully Tech. Designer, builder and author of every AntiCam document.",
      sources: [S.resume, S.deck],
    },
    {
      term: "When",
      value:
        "Earliest dated test 7 June 2023; Mastery project 11 February to 6 May 2025; BUILD application deck fall 2026.",
      sources: [S.cb15, S.mastery, S.deck],
      // TODO(alex): open question 10 — the deck calls AntiCam two years of work; the dated
      // evidence starts in June 2023, which is three or more. No age claim is printed.
    },
    {
      term: "Status",
      value:
        "Hand-built prototype. A custom PCB, battery-safety testing and IR eye-safety testing are planned, not done.",
      sources: [S.deck],
    },
    {
      term: "Formats",
      value: "Clip-on pin, cap, room unit, planned; one emitter, driver and battery platform.",
      sources: [S.deck],
    },
    {
      term: "Price target",
      value: "Pin $30–45, cap $40–65, planned.",
      sources: [S.deck],
      // TODO(alex): open question 10 — the deck prices the room unit at $100+ while the
      // project brief says "all planned under $100". The room-unit price is omitted.
    },
    { term: "Awards", value: "None." },
    {
      term: "Prototypes",
      value: "30+, four major versions.¹",
      sources: [S.outline, S.deck, S.resume],
    },
  ],
  why: [
    "Most cameras use night-vision-capable sensors that respond to near-infrared light the eye cannot see. AntiCam works in that gap: light, not radio; physics, not patterns.",
    "It removes me from the frame without removing the camera from service, and it is weaker in bright daylight, which I say up front.",
    // AntiCam has never been sold; content-map §314 records the use policy as a plan.
    "I built it to protect people, and the plan puts that use policy in the terms at checkout.",
  ],
  how: {
    component: "RingCompare",
    intro:
      "The same Ring doorbell camera in night mode, same street, 7 June 2023. Left: device off. Right: pin prototype on.",
    label: "Camera view: device off to device on",
    off: ac05,
    on: ac04,
    fallback: ac03,
    valueTextLow: "Device off",
    valueTextHigh: "Device on",
  },
  versionsHeading: "Versions",
  versions: [
    // The sources name the builds First / Second / Third prototype and Final Prototype V1 and
    // V2; "V1"-"V4" was a second numbering invented here, and it made "V1" mean two different
    // devices — the first build in this table and the finished pin in the hero caption.
    {
      tag: "First",
      sentence:
        "Proof of physics: a single IR module on laser-cut discs with four coin cells. Cameras see it, eyes do not.",
      tile: ac13,
    },
    {
      tag: "Second",
      sentence:
        "First enclosure: laser-cut MDF housing, logo engraved into the lid, carryable.",
      tile: ac09,
    },
    {
      tag: "Third",
      sentence:
        "Clip-on device: acrylic plates, nine hand-soldered coin cells joined with copper tape, tested against real cameras.",
      tile: ac11,
    },
    {
      tag: "Final V1",
      date: "7 June 2023",
      sentence:
        "The generation that passed the doorbell test: the finished pin, and the under-brim cap array beside it.",
      tile: ac02,
      measurement: {
        value: "Doorbell test passed",
        label: "Ring doorbell, night mode, 7 June 2023",
        source: FA.doorbell,
        attribution: "alex",
      },
    },
    {
      tag: "Final V2",
      sentence:
        "Six clear acrylic plates, coin cells and a slide switch, in three colourways.",
      tile: ac07,
    },
  ],
  figures: [
    { label: "The emitter", image: ac08 },
    { label: "Engraving the mark", image: ac10 },
    { label: "The V2 stack", image: ac15 },
  ],
  contactSheet: anticamContactSheet,
  results: [
    "Tested against a live Ring doorbell camera in night mode on 7 June 2023: the sensor recorded a glowing orb where the face should be.²",
    "47% of Americans have found a camera at a vacation rental, up from 25% in 2023.³",
    "About 537,000 surveillance cameras are deployed across the 50 largest U.S. cities, 70,882 of them in New York City.⁴",
    "Airbnb banned indoor security cameras effective 30 April 2024.⁵",
    "The use, marketing, sale and import of jammers are illegal under the Communications Act. AntiCam emits light, not radio.⁶",
  ],
  awards: "none",
  didList: [
    "Designed and built every version.",
    "Wrote every AntiCam document.",
    "Built the website and the launch strategy.",
  ],
  othersList: [
    "The Ring frames were recorded by the doorbell camera itself.",
    "No collaborator is named in any AntiCam source.",
  ],
  status:
    "Hand-built. The current device is a prototype, not a product: there is no custom PCB and no safety testing behind it yet.",
  next: "A custom PCB, battery-safety testing and IR eye-safety testing, in that order.",
  stats: [
    {
      value: "30+",
      unit: "prototypes",
      label: "AntiCam prototypes built",
      source: FA.prototypes,
      attribution: "alex",
    },
    {
      value: "4",
      unit: "major versions",
      label: "AntiCam versions",
      source: FA.prototypes,
      attribution: "alex",
    },
    {
      value: "47%",
      label: "of Americans have found a camera at a vacation rental, up from 25% in 2023",
      source: FA.ipx,
      attribution: "external",
    },
    {
      value: "537,000",
      unit: "cameras",
      label: "across the 50 largest U.S. cities, 70,882 of them in New York City",
      source: FA.cameras,
      attribution: "external",
    },
  ],
  sources: [FA.prototypes, FA.doorbell, FA.ipx, FA.cameras, FA.airbnb, FA.jammers],
};

/* =================================================== Prosthetic arm ====== */

const prostheticArm: Project = {
  slug: "prosthetic-arm",
  title: "Low-cost prosthetic arm",
  oneLine:
    "A 3D-printable lower-arm prosthetic: servos pull tendon-style cords, a myoelectric sensor reads the muscle, and the model is sized to the wearer from seven hand measurements.",
  lead: "A 3D-printable lower-arm prosthetic, hand and forearm, built from off-the-shelf parts, driven by servos through tendon-style cords, controlled by a myoelectric sensor, and sized to the wearer from hand measurements.",
  role: "Research assistant, Stevens Institute of Technology, summer 2024, under faculty supervision; continued through Avenues’ Mastery Program.",
  proof: {
    value: "90+",
    unit: "prototypes",
    label: "prosthetic arm prototypes",
    source: F.armPrototypes,
    attribution: "alex",
  },
  hero: pa01,
  homePlate: pa01,
  spec: [
    {
      term: "My role",
      value:
        "Research assistant, Stevens Institute of Technology, summer 2024, under faculty supervision; continued through Avenues’ Mastery Program.",
      sources: [S.resume],
    },
    { term: "When", value: "Summer 2024, then continued.", sources: [S.resume] },
    { term: "With", value: "Stevens Institute of Technology, faculty-supervised.", sources: [S.resume] },
    {
      term: "Status",
      value: "Working build. Controls and size automation are still being refined.",
      sources: [S.brief(15)],
    },
    {
      term: "Stack",
      value:
        "Off-the-shelf parts, mostly 3D-printed; servos; elastic and Kevlar cord; EMG sensor; Arduino.",
      sources: [S.brief(5), S.brief(7), S.brief(8), S.brief(9)],
    },
    { term: "Awards", value: "None." },
    { term: "Prototypes", value: "90+.¹", sources: [S.resume] },
    // TODO(alex): open question 8 — no price row. The résumé says under $100 and the design
    // brief says under $200, and neither says whether that is a target or a measured BOM.
  ],
  why: [
    "Requirements first: off-the-shelf parts, most of them printable; modular, easy-to-assemble pieces; myoelectric control; a target of more than 80% of common tasks; and, listed last and called the most important, a production cost ceiling.⁶",
    "The goal is to show that a reliable prosthetic can be made at low cost with accessible materials while keeping the functions that matter.",
  ],
  how: {
    component: "FingerLinkage",
    intro:
      "One elastic cord holds the finger open; a Kevlar cord from a servo in the forearm pulls it closed. Elastic runs outside the bend, Kevlar inside.",
    label: "Servo travel",
    // Spelled out because `aria-valuetext` reads it aloud: "Servo travel 54 percent".
    valueTextUnit: "percent",
    note:
      "The joint angles in this drawing are illustrative: they are chosen so the hand closes at full travel, not measured from the build.",
    card: pa06,
  },
  versionsHeading: "Versions",
  versions: [
    {
      tag: "Finger prints",
      sentence: "PLA test prints of a finger, then an assembled gray printed hand.",
      tile: pa09,
      measurement: {
        value: "6",
        unit: "printed pieces and 2 pin rods per finger",
        label: "finger part count",
        source: FP.fingerParts,
        attribution: "alex",
      },
    },
    {
      tag: "Parametric CAD",
      sentence:
        "Exploded parametric model on seven hand measurements across Digits 1–5.",
      tile: pa03,
      measurement: {
        value: "7",
        unit: "parameters",
        label: "hand measurements the model is built on",
        source: FP.parameters,
        attribution: "alex",
      },
    },
    {
      tag: "Final build",
      sentence:
        "White palm and glossy black forearm; hand, wrist collar and end plate print as separate segments.",
      tile: pa02,
      measurement: {
        value: "5",
        unit: "forearm subsystems",
        label: "servos, wrist control, Arduino, batteries, myoelectric control",
        source: FP.subsystems,
        attribution: "alex",
      },
    },
  ],
  figures: [
    { label: "The forearm opened", image: pa05 },
    { label: "The finished hand", image: pa10 },
    { label: "In profile", image: pa04 },
  ],
  results: [
    "90+ prototypes.¹",
    "The auto-sizing loop runs to 500 iterations and reports part mass per cell configuration.²",
    // TODO(alex): open question 9 — the design brief's audience and cost figures (10M+ living
    // with limb loss, 180,000+ amputations a year, 3M+ upper-arm amputations, 2.6M+ in
    // developing nations, ~$5,000 and $20,000+ devices, $0.5M lifetime cost, 5–15% access)
    // cite nothing. None of them is published until citations exist.
  ],
  awards: "none",
  didList: [
    "Designed and fabricated the arm.",
    "Researched prosthetics design, construction, costs and the physics of human motion.",
  ],
  othersList: [
    "Faculty supervision at Stevens Institute of Technology.",
    "The EMG sensor and the sample firmware shown in the brief are third-party boards and code.",
  ],
  status:
    "A working build that still needs refinement in the controls and in the size automation.",
  next: "From the brief: connect with mobile prosthetic outreach groups such as those run by the VA, make snap-together interchangeable parts with remote 3D printing, and reach patients in developing nations and low-income neighbourhoods. All of it is future work.",
  stats: [
    {
      value: "90+",
      unit: "prototypes",
      label: "prosthetic arm prototypes",
      source: FP.prototypes,
      attribution: "alex",
    },
    {
      value: "500",
      unit: "iterations",
      label: "auto-sizing loop ceiling, reporting part mass per cell configuration",
      source: FP.autoSizing,
      attribution: "alex",
    },
    {
      value: "7",
      unit: "parameters",
      label: "hand measurements the parametric model is built on",
      source: FP.parameters,
      attribution: "alex",
    },
  ],
  /* The drawing under the ledger (§7.2). Every label is a parameter name from brief p12. */
  handParameters: {
    title: "The seven hand measurements the parametric model is built on",
    desc:
      "A drawing of a hand, palm side, with digits 1 to 5 labelled and each measurement marked as a girth arc or a length arrow.",
    digitLabels: ["Digit 1", "Digit 2", "Digit 3", "Digit 4", "Digit 5"],
    parameters: {
      handCircumference: "Hand circumference",
      handLength: "Hand length",
      palmLength: "Palm length",
      wristCircumference: "Wrist circumference",
      fingerRoot: "Finger root circumference",
      interphalangeal: "Interphalangeal joint circumference",
      distalInterphalangeal: "Distal interphalangeal joint circumference",
    },
    caption: "The seven hand measurements that size the model, redrawn from the design brief.",
    source: FP.parameters,
  },
  sources: [
    FP.prototypes,
    FP.autoSizing,
    FP.fingerParts,
    FP.parameters,
    FP.subsystems,
    FP.requirements,
  ],
};

/* =========================================================== Robotics ==== */

const robotics: Project = {
  slug: "robotics",
  title: "Robotics, FIRST Tech Challenge",
  // The home row carries no footnote list of its own, so the sourced figure stays on the case
  // study and this sentence names the rule without restating its measurement.
  oneLine:
    "Five competition robots across two teams, from a first iteration cut entirely in wooden plates to a modular metal robot whose subsystems lift off one at a time.",
  lead: "I captain FIRST Tech Challenge team Tritonics #17253 and was electrical lead on #14712, where we won first in NYC and took the 2nd-place Think Award at the World Championship.",
  role: "Captain and operations lead, Tritonics #17253; earlier electrical lead, #14712, and fabrication lead.",
  proof: {
    value:
      "With Honu, #14712, we won 1st in NYC and the 2nd-place Think Award at the FTC World Championship",
    label: "FTC results",
    source: F.honuResults,
    // No attribution suffix: this is a competition result, not something the team measured,
    // and the sentence already says "we".
  },
  /*
   * The hero is the portfolio-page Monti render, not the poster crop. The poster crops
   * (rb-01, rb-02) are the only Monti renders free of baked-on callouts, but they are 176 and
   * 179 px wide and carry the printed poster's own white-to-navy gradient, so as a hero one
   * of them opened the page with a 179 px stamp whose edges sat against the page. rb-08 is
   * 295 px on a black ground that keys cleanly onto `--bg`. It is still small: the case-study
   * hero composes rather than stacks below its width, and the TODO(alex) on rb-01 — a 2400 px
   * re-render of Monti from the CAD file — is what actually fixes this.
   */
  hero: rb08,
  homePlate: rb01,
  homeGroup: {
    images: [rb08, rb09, rb06],
    caption: "Monti (#17253), Honu and Swerve Drive (#14712): three of the five robots, from my portfolio pages.",
  },
  spec: [
    {
      term: "My role",
      value:
        "Captain and operations lead, Tritonics #17253: team strategy, the electrical system, documentation and mentoring. Earlier electrical lead on #14712 and fabrication lead on Scorpion.",
      sources: [S.resume, S.slideE, S.pf02, S.pf03, S.pf05],
    },
    {
      term: "When",
      value: "Seasons are not dated in any source. The only season named is FTC DECODE.",
      sources: [S.deckP1],
      // TODO(alex): open question 6 — which season and year each robot belongs to, and what
      // year DECODE was. No source prints a year, so the site prints none.
    },
    {
      term: "With",
      value:
        "Two teams: #17253 Tritonics (Monti, Ball-Drive, Scorpion) and #14712 (Swerve Drive, Honu). Tritonics is 100% student-led, with no team mentors.",
      sources: [S.slideE, S.deckP3],
      // TODO(alex): the "80+ member club" figure comes only from the project brief; the team
      // documents describe a 15-person competition team. Not printed.
    },
    {
      term: "Prototypes",
      value:
        "Five full robot iterations; 4 intake, 3 launcher and 2 transfer iterations in wood before metal.¹",
      sources: [S.ep1, S.posterF],
    },
  ],
  why: [
    "We prototype in wood and finish in metal.",
    "Every subsystem follows an 8-screw rule so it comes off in 45 seconds at most,⁶ and the CAD lives on parametric master sketches, so one variable updates the whole design.",
    "I lead the electrical system, the documentation and the training that keeps the team going after its leaders graduate.",
  ],
  how: {
    component: "DriveDiagram",
    intro: "Three drivetrains we have built or used. Move the pointer, or the slider, to steer.",
    legend: "Drivetrain",
    label: "Drive direction",
    // Spelled out because `aria-valuetext` reads it aloud: "Drive direction 55 degrees".
    valueTextUnit: "degrees",
    options: [
      { id: "swerve", label: "Swerve", note: "Fastest and the most complex; not modular." },
      { id: "ball-drive", label: "Ball-Drive", note: "High torque and speed; oversized, and not modular." },
      { id: "strafer", label: "Strafer", note: "Modular and very simple." },
    ],
    caption:
      "The comparison is the team’s own, from our engineering portfolio: swerve fastest and most complex and not modular; ball drive high torque and speed but oversized and not modular; strafer modular and very simple.",
    source: S.ep1,
  },
  versionsHeading: "Robots",
  versions: [],
  robots: [
    {
      id: "scorpion",
      name: "Scorpion",
      team: "#17253",
      // TODO(alex): the portfolio page also calls Scorpion a robot you designed. The role
      // field states the one role every source agrees on; confirm the design credit.
      role: "Fabrication lead.",
      idea: "A motor at the base of the scissor lift pushes the base beams together, and the geometry drives the structure vertically.",
      plate: rb10,
      detail: rb11,
      awards: [
        { name: "Design Award", robot: "Scorpion", team: "#17253", role: "Fabrication lead", source: S.pf05 },
        { name: "Innovate Award, 2nd", robot: "Scorpion", team: "#17253", role: "Fabrication lead", source: S.pf05 },
        { name: "Inspire Award, 2nd", robot: "Scorpion", team: "#17253", role: "Fabrication lead", source: S.pf05 },
        { name: "Design Award, 3rd", robot: "Scorpion", team: "#17253", role: "Fabrication lead", source: S.pf05 },
        // TODO(alex): open question 6 — the page lists "Design Award" and "Design Award 3rd"
        // separately; confirm whether these are one event or two.
      ],
      sources: [S.pf05],
    },
    {
      id: "swerve-drive",
      name: "Swerve Drive",
      team: "#14712",
      role: "Electrical lead.",
      idea: "A working FTC-scale swerve drive, common in FRC and almost unseen in FTC, co-developed with another team; it competed at NYC-FIRST’s Robot-in-2-Days.",
      plate: rb06,
      detail: rb07,
      awards: "none",
      sources: [S.pf02, S.ep1],
      // TODO(alex): the portfolio page claims the swerve is "30% more efficient than any other
      // FTC drivetrain" with no method behind it. Not printed.
    },
    {
      id: "honu",
      name: "Honu",
      team: "#14712",
      role: "Electrical lead.",
      idea: "Belt-driven wheels for customisable wheel torque and a 3-axis intake for quick sample transfer.",
      plate: rb09,
      awards: [
        { name: "1st place in NYC, advancing to the World Championship", robot: "Honu", team: "#14712", role: "Electrical lead", source: S.pf03 },
        { name: "Think Award, 2nd place, FTC World Championship", robot: "Honu", team: "#14712", role: "Electrical lead", source: S.pf03 },
        { name: "Inspire Award, 1st", robot: "Honu", team: "#14712", role: "Electrical lead", source: S.pf03 },
        { name: "Inspire Award, 2nd, four times", robot: "Honu", team: "#14712", role: "Electrical lead", source: S.pf03 },
        { name: "Connect Award", robot: "Honu", team: "#14712", role: "Electrical lead", source: S.pf03 },
        { name: "Innovate Award", robot: "Honu", team: "#14712", role: "Electrical lead", source: S.pf03 },
      ],
      sources: [S.pf03, S.resume],
    },
    {
      id: "ball-drive",
      name: "Ball-Drive",
      team: "#17253",
      role: "Operations lead and captain.",
      idea: "Four two-axis balls replace the wheels for more efficient, accurate positioning; it is designed on a master sketch so the parts stay linked.",
      plate: rb12,
      awards: "none",
      sources: [S.pf04],
    },
    {
      id: "monti",
      name: "Monti",
      team: "#17253",
      role: "Captain.",
      // The section plate is the poster three-quarter view; the hero above carries rb-08.
      idea: "Modular by rule: eight screws to a subsystem, each one off in 45 seconds at most;⁶ a three-ball sorting intake; a hooded flywheel launcher on a 1:1 dual-servo turret.",
      plate: rb02,
      detail: rb16,
      awards: [
        { name: "Inspire Award, 1st", robot: "Monti", team: "#17253", role: "Captain", when: "season still ongoing when recorded", source: S.pf01 },
        { name: "Inspire Award, 2nd", robot: "Monti", team: "#17253", role: "Captain", when: "season still ongoing when recorded", source: S.pf01 },
        { name: "Innovate Award, 1st", robot: "Monti", team: "#17253", role: "Captain", when: "season still ongoing when recorded", source: S.pf01 },
        { name: "Inspire Award, 1st (Qualifier 3)", robot: "Monti", team: "#17253", role: "Captain", when: "FTC DECODE season", source: S.slideE },
        { name: "Inspire Award, 2nd (Qualifier 1)", robot: "Monti", team: "#17253", role: "Captain", when: "FTC DECODE season", source: S.posterA },
        { name: "Inspire Award, 3rd (Qualifier 9)", robot: "Monti", team: "#17253", role: "Captain", when: "FTC DECODE season", source: S.slideE },
        { name: "Sustain Award (Super Qualifier 2)", robot: "Monti", team: "#17253", role: "Captain", when: "FTC DECODE season", source: S.deckP1 },
      ],
      sources: [S.pf01, S.ep1, S.ep4, S.slideE, S.posterA, S.deckP1],
      // TODO(alex): the team documents spell the robot MONTY; the portfolio page spells it
      // Monti. The site follows the portfolio page.
    },
  ],
  // TODO(alex): the Scorpion render is the one robot exported on a white ground, so its tile
  // is the only light plate in a row of four dark ones. A re-export of Scorpion on the same
  // dark ground as the other four would put the whole strip on one plate.
  filmstrip: [
    { label: "Scorpion, #17253, fabrication lead", href: "#scorpion", image: rb10 },
    { label: "Swerve Drive, #14712, electrical lead", href: "#swerve-drive", image: rb06 },
    { label: "Honu, #14712, electrical lead", href: "#honu", image: rb09 },
    { label: "Ball-Drive, #17253, ops lead", href: "#ball-drive", image: rb12 },
    { label: "Monti, #17253, captain", href: "#monti", image: rb08 },
  ],
  ledgers: [
    {
      heading: "Intake iterations",
      note: "All three figures are the team’s own measurements from our test runs.",
      aside: rb03,
      rows: [
        {
          tag: "V1",
          tile: rb13,
          sentence: "Flat ramp; random positioning; off-centre transfer.",
          measurement: {
            value: "85% intake rate, 7 s to the launcher",
            label: "intake V1",
            source: FR.intake,
            attribution: "team",
          },
        },
        {
          tag: "V2",
          tile: rb14,
          sentence: "Vectoring slots and dual rail control.",
          measurement: {
            value: "97% intake rate, 5 s to the launcher",
            label: "intake V2",
            source: FR.intake,
            attribution: "team",
          },
        },
        {
          tag: "V3",
          tile: rb15,
          sentence: "Centred transfer, rubber-band grip, jam mitigation.",
          measurement: {
            value: "100% intake rate, 2 s to the launcher",
            label: "intake V3",
            source: FR.intake,
            attribution: "team",
          },
        },
      ],
    },
  ],
  figures: [
    { label: "The transfer", image: rb04 },
    { label: "The launcher", image: rb05 },
  ],
  results: [
    "Launcher tuning: 200+ trials analysed in Vernier Graphical Analysis at 8 mm compression; the regression is v = d · 2.64 + 1013, with 189 hits and 11 misses and a correlation of 0.9880 (team measurement).²",
    "Localization: 98% AprilTag lock, 100% odometry availability and path deviation of ±0.2 cm (team measurement).³",
    "After 50% of the team graduated we grew from 7 to 14 in one season and recruited a rookie class that was 67% female (team figures).⁴",
    // TODO(alex): open question 7 — "2x Worlds qualifier" and the third place in New York with
    // the rebuilt rookie team come only from the project brief; no team document corroborates
    // either. Neither is printed. Superlatives without a stated basis are also omitted:
    // "first fully modular FTC robot", "30% more efficient", "~4,000 teams surveyed",
    // "10x faster code process".
  ],
  // The five robot sections already print every award as a record, with the robot, the role
  // and the source on each. A page-level table repeating them verbatim made a recruiter count
  // the same record twice, so the only entry kept here is the one no robot section carries:
  // the résumé's own summary line.
  awards: [
    { name: "2x NYC Champion, Inspire Award", role: "Led electrical design, documentation and mentoring", source: S.resume },
  ],
  didList: [
    "Team strategy, the electrical system and operations as captain.",
    "Electrical lead on #14712.",
    "Fabrication lead on Scorpion.",
    "Documentation and mentoring; trained rookies one to one.",
  ],
  othersList: [
    "The robots and their subsystems are the team’s work.",
    "Autonomous pathing (PEREGRINE) and the micro-funding website are credited on the team roster to teammates; I led the team that launched the site.",
  ],
  status:
    "The DECODE season is under way. The Hydra model — cross-training, leadership redundancy, early rookie integration — is how the team outlasts its graduating leaders.",
  next: "Keep the rookie class moving through the same stages: a functional subsystem each, then an outreach event each, then subsystem ownership.",
  stats: [
    {
      value: "5",
      unit: "full robot iterations",
      label: "before the season’s metal robot; 4 intake, 3 launcher and 2 transfer iterations in wood",
      source: FR.iterations,
      attribution: "team",
    },
    {
      value: "200+",
      unit: "launcher trials",
      label: "analysed at 8 mm compression; v = d · 2.64 + 1013, 189 hits, 11 misses, correlation 0.9880",
      source: FR.launcher,
      attribution: "team",
    },
    {
      value: "98%",
      label: "AprilTag lock, with 100% odometry availability and ±0.2 cm path deviation",
      source: FR.localization,
      attribution: "team",
    },
    {
      value: "7 to 14",
      unit: "members",
      label: "team growth in one season, with a rookie class that was 67% female",
      source: FR.growth,
      attribution: "team",
    },
  ],
  /* The chart under Results (§7.3), drawn from the team's published equation. */
  regression: {
    title: "Launcher speed against shot distance",
    desc:
      "A chart with shot distance in centimetres along the bottom and launcher speed up the side; one straight line rises from left to right, labelled with the team’s equation.",
    x: { label: "Shot distance, d (cm)", min: 0, max: 300, ticks: [0, 100, 200, 300] },
    y: { label: "Launcher speed, v", min: 1000, max: 1900, ticks: [1000, 1300, 1600, 1900] },
    line: { slope: 2.64, intercept: 1013, label: "v = d · 2.64 + 1013" },
    notes: [
      "The line is drawn from the equation the team published; the individual trials are not published, so no points are plotted.",
      "Distance is in centimetres, as the poster deck’s chart labels it. The unit of v is not legible in any source, so the axis carries the equation’s own values.",
      // TODO(alex): the unit of v (encoder ticks per second, RPM, or something else).
    ],
    caption:
      "Launcher tuning: the team’s regression from 200+ trials at 8 mm compression, redrawn from the equation.",
    source: FR.launcher,
  },
  sources: [FR.iterations, FR.launcher, FR.localization, FR.growth, FR.intake, FR.modularity],
};

/* ========================================================== CeraPiper ==== */

const hexPipeHero: SvgRef = {
  kind: "svg",
  component: "HexPipe",
  alt: "Line drawing of a ribbed hexagonal ceramic pipe with one perpendicular branch and a plug-and-socket end",
  caption:
    "Drawn from the tool’s primitives: hexagonal profile matching the die, rib increments, a perpendicular branch that carves a matching hex hole in the host, a plug-and-socket connector. No photograph of the system is cleared.",
  source: S.readme,
};

const cerapiper: Project = {
  slug: "cerapiper",
  title: "CeraPiper",
  oneLine:
    "A CAD tool for custom hollow ceramic pipes that assemble into structures which cool a room by evaporating water. It runs inside Onshape, compiles the feature tree into an extrusion sequence, and prints a paper blueprint that runs under the clay.",
  lead: "I was a research intern on CeraPiper, a CAD tool for designing custom hollow ceramic pipes that assemble into structures which cool a space by evaporating water.",
  role: "Research intern, Cornell Tech x Technion, summer 2026.",
  proof: {
    value:
      "The earlier CAM version was published at ACM SCF 2025; the CAD layer is written up in a paper currently under review",
    label: "CeraPiper publication status",
    source: F.scfPaper,
    attribution: "external",
  },
  hero: hexPipeHero,
  homePlate: {
    kind: "svg",
    component: "HexPipe",
    alt: "Line drawing of a ribbed hexagonal ceramic pipe with one perpendicular branch and a plug-and-socket end",
    caption:
      "Drawn from the tool’s own primitives: hexagonal profile, ribs, a perpendicular branch, a connector. No photograph of the system is cleared yet.",
    source: S.readme,
  },
  spec: [
    {
      term: "My role",
      value:
        "Research intern, Cornell Tech x Technion, summer 2026: CAD and slicing software for a custom ceramic printer.",
      sources: [S.resume],
      // TODO(alex): open question 1 — no CeraPiper document names Alex or attributes any part
      // of the system to him, so there is no "What I built" row. Confirm which parts you built,
      // whether you are a named author on the CAD paper under review, and how the affiliation
      // should read next to "Matter of Tech Lab".
    },
    { term: "When", value: "Summer 2026.", sources: [S.resume] },
    { term: "With", value: "Matter of Tech Lab.", sources: [S.readme] },
    {
      term: "Status",
      value:
        "The earlier CAM version was published at ACM SCF 2025 (Berman, Seiz, Roumen; I am not an author). Work on the CAD layer is written up in a paper currently under review.³",
      sources: [S.readme, S.scf],
    },
    {
      term: "Stack",
      value: "Onshape FeatureScript; Python 3 and Flask; Arduino (C++); p5.js.",
      sources: [S.readme],
    },
    { term: "Awards", value: "None." },
  ],
  why: [
    "Evaporative cooling with ceramics is a low-cost, energy-efficient alternative to air conditioning, but it lacked accessible design tools.",
    "The earlier interface was controllable but not designable: makers set extrusion parameters in isolation and could not compose the assembled object.",
    "CeraPiper turns each machine parameter into an editable design element, so the object, not the print sequence, is what you design.",
  ],
  how: {
    component: "HexProfile",
    intro:
      "Every profile is hexagonal because the die is. The tool constrains what the machine can make: hard limits, corrections it applies for you, and advisories.",
    diameterLabel: "Outer diameter",
    // The die is indexed in 30° steps; this names the control, the button names its action.
    rotationLabel: "Die index",
    rotateLabel: "Rotate 30°",
    spanLabel: "Span",
    unit: "mm",
    // Spelled out because `aria-valuetext` reads it aloud: "58 millimetres".
    valueTextUnit: "millimetres",
    rotationUnit: "degrees",
    // The dimension drawn on the span diagram; the README's own advisory limit.
    spanLimitLabel: "150 mm",
    spanWarning: "Unsupported span over 150 mm: sag advisory",
    translation: {
      columns: ["Machine parameter", "Design element"],
      rows: [
        ["Die aperture travel", "Outer diameter"],
        ["Extrusion duration", "Length in mm"],
        ["Instruction order", "Derived from how parts attach"],
        ["Operator sag judgment", "A 150 mm advisory"],
      ],
      source: S.readme,
    },
    architecture: {
      alt: "Three-layer diagram: an Onshape FeatureScript design layer above Python and Flask middleware that compiles a JSON function stack, above Arduino firmware that drives the die",
      caption:
        "Three software layers and one physical one: FeatureScript features in Onshape, Python and Flask middleware that compiles the feature tree into a JSON Function Stack, Arduino firmware at the machine, and the printed paper blueprint under the clay.",
      source: S.readme,
      layers: [
        {
          name: "Design layer",
          tech: "Onshape, FeatureScript",
          lines: ["Ribbed pipes, branches, connectors, collars", "Hard, corrective and advisory constraints"],
        },
        {
          name: "Translation middleware",
          tech: "Python, Flask",
          lines: [
            "Reads the feature tree over the REST API",
            "Linearises each branch into one extrusion",
            "Serialises a JSON Function Stack",
          ],
        },
        {
          name: "Fabrication backend",
          tech: "Arduino, C++",
          lines: ["Maps primitives to motor steps", "Regulates the pug-mill feed rate", "Drives the shape-shifting die"],
        },
        {
          name: "Paper blueprint",
          tech: "20 cm sheet on a standard plotter",
          kind: "physical",
          lines: ["Runs along the bed under the clay"],
        },
      ],
      links: ["Onshape REST API", "Function Stack over USB serial", "Printed from the Function Stack"],
    },
    blueprint: {
      alt: "A 20 cm-wide printed blueprint strip with the part name, cut marks at the bed limit, the mandrel size and a hex marker where a hole is hand-cut",
      caption:
        "The paper blueprint: a 20 cm-wide sheet that runs along the bed under the freshly extruded clay, carrying the part name, where to cut, the mandrel in use and where to hand-cut a hole for a perpendicular connector.",
      source: S.readme,
      // Sheet headings. "Main bed" and "Piece 1" are illustrative, as the caption says; the
      // marks and the note are the README's own.
      partName: "Main bed",
      pieceId: "Piece 1",
      sheetWidth: "20 cm",
      marks: {
        cut: "Cut line, where the clay is divided into fabricable segments",
        endPiece: "Fixed 60 mm start and end pieces at the limits of the 800 mm bed",
        mandrel: "The mandrel size in use, drawn as the bore centreline",
        hexHole: "Hex marker where a hole is hand-cut for a perpendicular connector",
      },
      note: "800 mm bed, 60 mm end pieces",
    },
    source: S.readme,
  },
  versionsHeading: "Versions",
  versions: [
    { tag: "v1", date: "17 July 2025", sentence: "Submission to ACM SCF 2025." },
    {
      tag: "v1.1",
      date: "8 August 2025",
      sentence:
        "Revamped extrusion data structure; unsupported-segment detection; 3D curve visualisation in beta; segment editing; a settings page; Arduino memory fixes.",
    },
    {
      tag: "v2.0",
      date: "20 December 2025",
      sentence:
        "Fixes and features from user-study feedback; full editing from the Function Stack; becomes an in-app Onshape extension.",
    },
    {
      tag: "v2.1",
      date: "8 July 2026",
      sentence:
        "Print order follows Onshape attachment order, so branches print as one contiguous chain.",
      measurement: {
        value: "about one",
        unit: "Onshape API request per import",
        label: "down from one request per part",
        source: FC.apiRequests,
        attribution: "external",
      },
    },
    {
      tag: "v2.2",
      date: "July 2026",
      sentence:
        "Interactive paper blueprint; an Extrude action and per-bed tabs; branch pipes carve a matching hex hole in the host; ribbed branch profiles.",
    },
  ],
  versionsNote: "v1 to v2.0 predate my internship.",
  results: [
    "The tool holds the machine’s limits: outer diameter 40–78 mm, rotation in 30° increments, an 800 mm bed minus 60 mm start and end pieces, and a 150 mm unsupported-span advisory.¹",
    "Version 2.1 cut Onshape API requests to about one per import, from one per part.²",
    // TODO(alex): the README credits the published CAM paper with prototypes that raised
    // relative humidity 8–10% and evaporated 1.85 L of water over 60 hours. Confirm those
    // numbers appear in the DOI'd paper before this line is published. The README gives no
    // temperature figure, so none is stated. Nothing from the paper under review is used.
  ],
  awards: "none",
  didList: [
    "CAD and slicing software for the custom ceramic printer, as a research intern.",
  ],
  othersList: [
    "The README describes the system as one piece of lab work and attributes no component to any individual.",
    "I am not an author of the SCF 2025 paper.",
  ],
  status:
    "Version 2.2 is the current release: the blueprint is interactive, branches carve their own hex holes, and the design is split into fabricable beds.",
  next: "From the README: a calipered test print to reconcile the die-travel constants; tighter Onshape integration that reuses native CAD commands; designing the global 3D form first and applying the primitives afterwards.",
  stats: [
    {
      value: "40–78",
      unit: "mm",
      label: "outer diameter the die can produce",
      source: FC.constraints,
      attribution: "external",
    },
    {
      value: "150",
      unit: "mm",
      label: "maximum unsupported span before the sag advisory",
      source: FC.constraints,
      attribution: "external",
    },
    {
      value: "800",
      unit: "mm",
      label: "conveyor bed, minus 60 mm start and end pieces",
      source: FC.constraints,
      attribution: "external",
    },
  ],
  sources: [FC.constraints, FC.apiRequests, FC.paper],
};

/* ============================================================ exports ==== */

/** Lineup order, fixed. Home rows, case-study "Next" links and the sitemap all follow it. */
export const projects: Project[] = [anticam, prostheticArm, robotics, cerapiper];

export const projectBySlug: Record<ProjectSlug, Project> = {
  anticam,
  "prosthetic-arm": prostheticArm,
  robotics,
  cerapiper,
};

/** The next case study in lineup order; the last one wraps to the first. */
export function nextProject(slug: ProjectSlug): Project {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
}

/* =============================================================== home ==== */

export const homeHero: HomeHero = {
  // The h1 carries the 88 px display step, so it is short enough to hold it; the list of work
  // that used to run inside it is the lead sentence below.
  // Root CLAUDE.md: "hardware founder, product designer, and robotics lead".
  kicker: "Hardware founder / Product designer / Robotics lead",
  headline: "I’m Alex Tully. I design and build hardware.",
  // Each figure reuses the Source object of a lineup proof, so its footnote number is the
  // same one the lineup row prints.
  figures: [
    { value: "30+", label: "AntiCam prototypes, four major versions", source: F.anticamPrototypes },
    { value: "90+", label: "prosthetic arm prototypes", source: F.armPrototypes },
    { value: "1st", label: "in NYC with Honu, #14712, plus the 2nd-place Think Award at Worlds", source: F.honuResults },
    { value: "SCF ’25", label: "CeraPiper’s CAM version, published at ACM SCF 2025", source: F.scfPaper },
  ],
  lead: "A privacy wearable, a low-cost prosthetic arm, competition robots, and a CAD tool for clay.",
  // "Sole" is not in any source: content-map §3 says no source states he worked alone.
  roleLine: "Founder, Tully Tech. Designer and builder of AntiCam.",
  indexLabel: "Featured work",
  workNote: "Four projects. My role is stated on each, and every figure links to its source.",
  index: [
    {
      title: "AntiCam",
      description: "privacy wearable, Tully Tech, tested June 2023",
      href: "#anticam",
      source: S.cb15,
    },
    {
      title: "Low-cost prosthetic arm",
      description: "Stevens Institute of Technology, summer 2024",
      href: "#prosthetic-arm",
      source: S.resume,
    },
    {
      title: "Robotics",
      description: "FIRST Tech Challenge, #17253 and #14712",
      href: "#robotics",
      source: S.pf01,
      // No year: no source prints one.
    },
    {
      title: "CeraPiper",
      description: "Cornell Tech x Technion, summer 2026",
      href: "#cerapiper",
      source: S.resume,
    },
  ],
  photo: { image: ac01 },
  canvas: {
    alt: "A slowly turning model of the AntiCam clip-on pin, its nine infrared emitters lit",
    caption:
      "This is a model of the AntiCam clip-on pin, not a photo. Each dot is one infrared LED. Move the pointer: that is where the camera is, and the camera is what washes out.",
    pauseLabel: "Pause",
    playLabel: "Play",
    keyboardLabel: "Move the camera with the arrow keys",
    statusDrifting: "The camera drifts on its own until you move the pointer or use the arrow keys.",
    statusPaused: "Paused. Nothing moves until you press Play.",
    statusReducedMotion:
      "Reduced motion is on: nothing moves on its own. The pointer and the arrow keys still move the camera.",
    statusPoster: "Shown lit, as a camera would see it.",
  },
  sources: [S.resume, S.deck],
};

export const nowAndNext: NowAndNext = {
  heading: "Now and next",
  rows: [
    {
      term: "Summer 2024",
      description:
        "Research assistant, Stevens Institute of Technology: the prosthetic arm.",
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
      // TODO(alex): open question 13 — USC and TroyLabs BUILD appear only in the project brief.
      // Confirm they may be public before launch; they are on home, the contact band and /about.
    },
  ],
  footLine: {
    text: "Smaller pieces: Electric Road, IDEA Club and outreach are on the about page.",
    linkLabel: "about page",
    href: "/about#smaller-pieces",
  },
};

export const contactBand: ContactBand = {
  name: "Alex Tully",
  email: "alexptully@gmail.com",
  site: { label: "tullytech.com", href: "https://tullytech.com" },
  line: "USC Iovine and Young Academy, fall 2026. TroyLabs BUILD, PM division.",
  lineSource: S.root,
  link: { label: "About me", href: "/about" },
};

/** The home page's numbered `<ol>`; superscripts in the lineup rows index into it. */
export const homeSources: Source[] = [
  F.anticamPrototypes,
  F.armPrototypes,
  F.honuResults,
  F.scfPaper,
];
