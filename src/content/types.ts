/**
 * Content model for the site (design spec §4.3, extended for §5–§9 and the October 2026
 * redesign: `content/notes/redesign-spec.md`).
 *
 * Every word of site copy lives in `projects.ts` (case studies and the Pando brief),
 * `side-projects.ts` (Bloom, the robotic-arm flower), `home.ts`, `about.ts` and `site.ts`.
 * Components render this data and hold no copy of their own.
 *
 * Work pages come in three templates, picked by `kind`: `case` (`Project`), `brief`
 * (`BriefProject`, Pando Surgical) and `side` (`SideProject`). `Work` is their union.
 *
 * Footnote convention: each page exposes an ordered `sources` array that renders as the
 * page's numbered `<ol>`. Superscript digits written inside prose strings (¹ ² ³ …) are
 * 1-based indices into that same array. `Stat` values do not carry a superscript in their
 * text: the `Stat` renderer appends the footnote link itself from `stat.source`.
 */

/** A citation. `href` for a public URL, `path` for a file in `content/source/` (rendered as text). */
export type Source = {
  /** Human-readable name of the document or publisher, e.g. "AntiCam pitch-deck outline". */
  name: string;
  /** Public URL, when one exists. Rendered as a link. */
  href?: string;
  /** Repo-relative path of an internal source. Rendered as text, never as a link. */
  path?: string;
  /** What this source backs up, used as the footnote's opening clause. */
  claim?: string;
  /** Anything a reader needs in order to read the citation correctly. */
  note?: string;
};

/**
 * A figure with its citation. A `Stat` cannot exist without a `source`.
 * The renderer prints `value unit`, then a superscript footnote link, then
 * "(team measurement)" when `attribution === "team"`.
 */
export type Stat = {
  value: string;
  unit?: string;
  label: string;
  source: Source;
  attribution?: "alex" | "team" | "external";
  /**
   * `target` is a goal the source sets, not a result, and must be printed with a visible
   * "Target" label. Omitted means `measurement`: something that was measured or happened.
   */
  kind?: "measurement" | "target";
};

/** How a crop sits in its plate. See §12.1. */
export type ImageGround = "dark" | "light" | "photo";

/**
 * A web-ready image in `public/images/<slug>/<id>.jpg`, at its native pixel size.
 * Never displayed wider than `width`. An image with `cleared: false` renders its
 * declared fallback or nothing — never the image.
 */
export type ImageRef = {
  id: string;
  src: string;
  width: number;
  height: number;
  ground: ImageGround;
  alt: string;
  caption: string;
  /** Exactly as the source prints it, e.g. "7 June 2023". Omitted when no source dates it. */
  date?: string;
  source: Source;
  cleared: boolean;
};

/** The authored SVGs in `src/components/svg/` (§12.2). Geometry only. */
export type SvgComponent =
  | "HexPipe"
  | "HexProfile"
  | "Architecture"
  | "BlueprintStrip"
  | "HandParameters"
  | "FingerLinkage"
  | "DriveDiagram"
  | "RegressionChart"
  | "PinPoster"
  | "LapRotatorTask"
  | "BloomBracelet"
  | "ArmFlower";

type SvgRefBase = {
  kind: "svg";
  /** Accessible name for the figure. */
  alt: string;
  caption: string;
  source: Source;
};

/** Words drawn inside `svg/LapRotatorTask`. About 18 characters each: every label is one line. */
export type LapRotatorTaskCopy = { twoHands: string; oneHand: string; rotate: string };

/** Optional callouts drawn inside `svg/ArmFlower`. A word or two each. */
export type ArmFlowerCopy = { wristband?: string; arm?: string; flower?: string };

/**
 * An authored drawing standing in for a photograph that does not exist or is not cleared.
 * Drawings with words or state inside them carry that here, so no copy lives in a component.
 */
export type SvgRef =
  | (SvgRefBase & {
      component: Exclude<SvgComponent, "LapRotatorTask" | "BloomBracelet" | "ArmFlower">;
    })
  /** The task the LapRotator exists for, drawn without the device (it is not cleared). */
  | (SvgRefBase & { component: "LapRotatorTask"; labels: LapRotatorTaskCopy })
  /** `lit`: how many of the five LEDs are lit, 0–5. */
  | (SvgRefBase & { component: "BloomBracelet"; lit: number })
  /** `openness`: 0 is a closed bud, 1 fully open. */
  | (SvgRefBase & { component: "ArmFlower"; openness: number; labels?: ArmFlowerCopy });

/** Two frames stacked in one plate, with a cleared stand-in until both frames are cleared. */
export type DiptychRef = {
  kind: "diptych";
  /** Upper frame. */
  a: ImageRef;
  /** Lower frame. */
  b: ImageRef;
  /** Rendered instead, whole, while `a` or `b` is not cleared. */
  fallback: ImageRef;
  caption: string;
  /** Caption used while the fallback is showing. */
  fallbackCaption: string;
};

/** Anything that can fill a plate. */
export type PlateRef = ImageRef | DiptychRef | SvgRef;

/** One row of a spec sheet `<dl>`. Rows without a sourced value are omitted at authoring time. */
export type SpecRow = {
  term: string;
  value: string;
  sources?: Source[];
};

/** An award as a record: what, on which robot, with which team, in which role. */
export type Award = {
  name: string;
  robot?: string;
  team?: string;
  role?: string;
  /** Exactly as the source prints it; omitted when no source gives one. */
  when?: string;
  source: Source;
};

/** One row of a version ledger. */
export type Version = {
  tag: string;
  /** Exactly as the source prints it, or "date not recorded". */
  date?: string;
  /** Superscripts index the page's `sources`. */
  sentence: string;
  measurement?: Stat;
  tile?: ImageRef;
};

/** A ledger that is not the project's main one (e.g. the robotics intake iterations). */
export type Ledger = {
  heading: string;
  note?: string;
  rows: Version[];
  /** A tile shown beside the ledger. */
  aside?: ImageRef;
};

/** One block of the CeraPiper stack drawing (§7.4). Rendered by `svg/Architecture`. */
export type ArchitectureLayer = {
  /** What the layer is, e.g. "Design layer". */
  name: string;
  /** What it is built with, e.g. "Onshape, FeatureScript". */
  tech: string;
  /** Short detail lines. One string per drawn line; nothing is wrapped for you. */
  lines?: string[];
  /** `physical` draws the layer on paper stock instead of as an outline. */
  kind?: "software" | "physical";
};

/**
 * A layered system drawing for `svg/Architecture`: the CeraPiper stack, the Bloom
 * bracelet-to-projection path, the robotic-arm flower's wristband-to-flower path.
 */
export type ArchitectureSpec = {
  alt: string;
  caption: string;
  source: Source;
  layers: ArchitectureLayer[];
  /** What passes from one layer to the next. One fewer item than `layers`. */
  links: string[];
};

/** The four named marks on the CeraPiper paper blueprint (§7.4). */
export type BlueprintMarks = {
  cut: string;
  endPiece: string;
  mandrel: string;
  hexHole: string;
};

/**
 * The seven hand measurements drawing beside the prosthetic ledger (§7.2).
 * Every label is a parameter name from the design brief; `source` is the page's own citation.
 */
export type HandParametersSpec = {
  title: string;
  desc: string;
  digitLabels: [string, string, string, string, string];
  parameters: {
    handCircumference: string;
    handLength: string;
    palmLength: string;
    wristCircumference: string;
    fingerRoot: string;
    interphalangeal: string;
    distalInterphalangeal: string;
  };
  caption: string;
  source: Source;
};

/** The launcher regression chart under the robotics results (§7.3). */
export type RegressionSpec = {
  title: string;
  desc: string;
  x: { label: string; min: number; max: number; ticks: number[] };
  y: { label: string; min: number; max: number; ticks: number[] };
  line: { slope: number; intercept: number; label: string };
  /** What the chart does and does not claim, printed under it. */
  notes: string[];
  caption: string;
  source: Source;
};

/** A two-column `<table>` with a header row. */
export type TwoColumnTable = {
  columns: [string, string];
  rows: Array<[string, string]>;
  source: Source;
};

/** A plate-sized image with a heading, used for cards beside the main flow. */
export type Figure = {
  image: ImageRef;
  /** Short label above or beside the figure; the sentence stays in `image.caption`. */
  label?: string;
};

/** One tile of the AntiCam contact sheet (§7.1). */
export type ContactSheetItem = {
  label: string;
  image: ImageRef;
};

/** One tile of the robotics filmstrip (§7.3). */
export type FilmstripItem = {
  label: string;
  href: string;
  image: ImageRef;
};

/** One robot on the robotics page (§7.3). */
export type RobotSection = {
  id: string;
  name: string;
  team: string;
  role: string;
  idea: string;
  plate: ImageRef;
  detail?: ImageRef;
  awards: Award[] | "none";
  sources: Source[];
};

/** The page's single interactive element (§6.4). One per case study, always user-driven. */
export type HowBlock =
  | {
      component: "RingCompare";
      intro: string;
      /** `<label>` text for the range input. */
      label: string;
      off: ImageRef;
      on: ImageRef;
      /** Rendered instead of the compare while either frame is uncleared. */
      fallback: ImageRef;
      /** `aria-valuetext` below and at or above the midpoint. */
      valueTextLow: string;
      valueTextHigh: string;
    }
  | {
      component: "FingerLinkage";
      intro: string;
      label: string;
      /** The unit spelled out in words for `aria-valuetext`, e.g. "Servo travel 54 percent". */
      valueTextUnit: string;
      /** Says in the DOM that the drawn angles are illustrative, not a measured spec. */
      note: string;
      card: ImageRef;
    }
  | {
      component: "DriveDiagram";
      intro: string;
      /** `<legend>` for the drivetrain radio group. */
      legend: string;
      /** `<label>` for the direction range input. */
      label: string;
      /** The unit spelled out in words for `aria-valuetext`, e.g. "Drive direction 55 degrees". */
      valueTextUnit: string;
      options: Array<{ id: string; label: string; note: string }>;
      caption: string;
      source: Source;
    }
  | {
      component: "HexProfile";
      intro: string;
      diameterLabel: string;
      /** Names the control the rotate button and its degree readout belong to. */
      rotationLabel: string;
      rotateLabel: string;
      spanLabel: string;
      /** The visible readout's unit, e.g. "mm". */
      unit: string;
      /** The same unit spelled out in words for `aria-valuetext`, e.g. "58 millimetres". */
      valueTextUnit: string;
      /** The rotation unit spelled out in words, e.g. "indexed one step, 30 degrees". */
      rotationUnit: string;
      /** The dimension drawn on the span diagram: the README's own advisory limit. */
      spanLimitLabel: string;
      /** The one advisory string, shown when the span passes the tool's own limit. */
      spanWarning: string;
      translation: TwoColumnTable;
      architecture: ArchitectureSpec;
      blueprint: {
        alt: string;
        caption: string;
        source: Source;
        /** Sheet headings on the drawing. Illustrative labels, as the caption says. */
        partName: string;
        pieceId: string;
        sheetWidth: string;
        marks: BlueprintMarks;
        /** The sheet's own notes line. */
        note: string;
      };
      source: Source;
    };

/* ------------------------------------------------------------------ work */

/**
 * One row of the home work list, and the meta row (Role, Year, Type, Status) on a work page.
 * `year` prints only with its `yearSource`; a project no source dates (robotics) has none.
 */
export type Listing = {
  year?: string;
  /** Required whenever `year` is set (`npm run check:content` fails otherwise). */
  yearSource?: Source;
  /** Printed in the Year column instead, when no source dates the work. Not a date. */
  yearFallback?: string;
  /** What the thing is, e.g. "Wearable privacy device". */
  type: string;
  /** Alex's role, short enough for a list row, e.g. "Product Manager". */
  role: string;
  /** One to three words for the row's status, e.g. "Prototype". From the page's own status. */
  status?: string;
  /** The list row's hover preview and the next-project link's preview. */
  cover: ImageRef | SvgRef;
};

/** A titled block of short prose, with an optional figure. Superscripts index `sources`. */
export type Section = {
  /** Fragment id, unique on the page. */
  id: string;
  heading: string;
  paragraphs: string[];
  figure?: ImageRef | SvgRef;
};

export type ProjectSlug = "anticam" | "prosthetic-arm" | "robotics" | "cerapiper";
export type BriefSlug = "pando-surgical";
export type SideProjectSlug = "bloom" | "arm-flower";
export type WorkSlug = ProjectSlug | BriefSlug | SideProjectSlug;

/** A case study (`/work/[slug]`, template `case`). */
export type Project = {
  kind: "case";
  slug: ProjectSlug;
  /** Case-study h1 and lineup title. */
  title: string;
  /** Home lineup sentence (§5.3). */
  oneLine: string;
  /** Case-study hero lead (§7). Longer and more precise than `oneLine`. */
  lead: string;
  /** Alex's role, in the words the spec sheet uses. */
  role: string;
  /** The home list row and the page's meta row. */
  listing: Listing;
  /**
   * At most three short lines under the intro, 20 words or fewer each, using only facts
   * already on this page. Superscripts index `sources`.
   */
  highlights?: string[];
  /** The one figure the lineup row shows under "Proof". */
  proof: Stat;
  /** Case-study hero visual. */
  hero: ImageRef | SvgRef;
  /** Home lineup plate. */
  homePlate: PlateRef;
  /**
   * Optional: several small objects shown together in the home plate instead of `homePlate`,
   * for a project whose renders are each too small to hold a plate alone (robotics).
   */
  homeGroup?: { images: ImageRef[]; caption: string };
  spec: SpecRow[];
  /** "Why" section: two or three first-person sentences. */
  why: string[];
  how: HowBlock;
  /** Heading for the versions section ("Versions", or "Robots" on robotics). */
  versionsHeading: string;
  versions: Version[];
  /** One line under the versions ledger, e.g. the CeraPiper note about v1–v2.0 (§7.4). */
  versionsNote?: string;
  /** Extra ledgers rendered after the main one. */
  ledgers?: Ledger[];
  /** Cards shown beside the ledger or the process band. */
  figures?: Figure[];
  contactSheet?: ContactSheetItem[];
  filmstrip?: FilmstripItem[];
  robots?: RobotSection[];
  /** The hand-measurement drawing under the ledger (prosthetic arm only, §7.2). */
  handParameters?: HandParametersSpec;
  /** The launcher regression chart under Results (robotics only, §7.3). */
  regression?: RegressionSpec;
  /** "Results" sentences. Superscripts index into `sources`. */
  results: string[];
  awards: Award[] | "none";
  didList: string[];
  othersList: string[];
  /** "Status" section: where the thing actually stands. */
  status: string;
  /** What comes next, from the source's own next steps. */
  next: string;
  /** Machine-readable index of every figure on the page. Not a rendered section. */
  stats: Stat[];
  /** The page's numbered `<ol>`, in footnote order. */
  sources: Source[];
};

/** Pando Surgical (`/work/pando-surgical`, template `brief`). Public basics only: an NDA applies. */
export type BriefProject = {
  kind: "brief";
  slug: BriefSlug;
  title: string;
  /** One sentence for the list row, metadata and previews. */
  oneLine: string;
  lead: string;
  role: string;
  listing: Listing;
  /** An authored drawing of the task, never the device: no Pando image is cleared. */
  hero: SvgRef;
  /** The meta block: Role, Company, Via, Since, Website. */
  facts: SpecRow[];
  /** "The task", "What I do there". */
  sections: Section[];
  /** The company's public site. */
  link: { label: string; href: string };
  /** One line saying why the page stops where it does. */
  ndaNote: string;
  /** Photos the page is waiting for. Never rendered; `check:content` prints them as warnings. */
  todoPhotos?: string[];
  status: string;
  /** The page's numbered `<ol>`. Every source on the page is in it, by reference. */
  sources: Source[];
};

/** The page's interactive moment on Bloom: tap to light the bracelet's LEDs, 0–5. */
export type BloomCounterMoment = {
  component: "BloomCounter";
  intro: string;
  /** Accessible name and visible text of the tap button. */
  label: string;
  /** Text of the button that puts the count back to 0. */
  resetLabel: string;
  /** Live-region and `aria-valuetext` template: `{n}` is replaced by the number lit, 0–5. */
  valueText: string;
  source: Source;
};

/** A Terra Labs side project (`/work/[slug]`, template `side`). */
export type SideProject = {
  kind: "side";
  slug: SideProjectSlug;
  title: string;
  /** One sentence for the list row, metadata and previews. */
  oneLine: string;
  lead: string;
  role: string;
  /** Where and when, e.g. "Terra Labs, fall 2026". */
  context: string;
  listing: Listing;
  hero: ImageRef | SvgRef;
  /** The compact facts block. */
  facts: SpecRow[];
  sections: Section[];
  versions?: Version[];
  /** Goals, never results: every one has `kind: "target"` and prints a "Target" label. */
  targets: Stat[];
  /** The system drawing, rendered by `svg/Architecture`. */
  architecture: ArchitectureSpec;
  moment?: BloomCounterMoment;
  /** Photos the page is waiting for. Never rendered; `check:content` prints them as warnings. */
  todoPhotos?: string[];
  /** Where it honestly stands. Superscripts index `sources`. */
  status: string;
  next: string;
  /** The page's numbered `<ol>`. Every source on the page is in it, by reference. */
  sources: Source[];
};

/** Anything with a page under `/work/`. */
export type Work = Project | BriefProject | SideProject;

/* ------------------------------------------------------------------ home */

export type HomeIndexEntry = {
  title: string;
  description: string;
  href: string;
  source: Source;
};

/** One cell of the hero's figure strip: a short number and what it counts, always sourced. */
export type HeroFigure = { value: string; label: string; source: Source };

export type HomeHero = {
  /** Mono line above the h1: the three things Alex is, as root CLAUDE.md names them. */
  kicker: string;
  headline: string;
  /** Four sourced figures under the hero; each resolves against `homeSources` by reference. */
  figures: HeroFigure[];
  /**
   * The sentence under the h1, at the lead scale. The headline carries the display step, so
   * it has to be short enough to hold it; what the work actually is goes here.
   */
  lead: string;
  roleLine: string;
  /** `aria-label` for the index `<nav>`. */
  indexLabel: string;
  /** One line beside the "Featured work" heading. */
  workNote: string;
  index: HomeIndexEntry[];
  /** Photo mode, and the plate that moves under the hero in canvas mode. */
  photo: { image: ImageRef };
  /** Canvas mode (§10.1). The `status*` lines are announced by the wrapper's `role="status"`. */
  canvas: {
    caption: string;
    alt: string;
    pauseLabel: string;
    playLabel: string;
    /** Accessible name of the keyboard control inside the box. */
    keyboardLabel: string;
    statusDrifting: string;
    statusPaused: string;
    statusReducedMotion: string;
    /** Announced when the poster stands alone (no WebGL, or the low-end guard tripped). */
    statusPoster: string;
  };
  sources: Source[];
};

export type DefinitionRow = {
  term: string;
  description: string;
  source: Source;
};

export type NowAndNext = {
  heading: string;
  rows: DefinitionRow[];
  /** One line under the list; `linkLabel` is the substring rendered as the link. */
  footLine: { text: string; linkLabel: string; href: string };
};

export type ContactBand = {
  name: string;
  email: string;
  site: { label: string; href: string };
  linkedin: { label: string; href: string };
  line: string;
  lineSource: Source;
  link: { label: string; href: string };
};

/** One numbered item of "What I do" on the home page. */
export type Service = {
  id: string;
  title: string;
  /** One first-person line. */
  body: string;
  tools: string[];
  /** Each one is in `home.sources`, by reference. */
  sources: Source[];
};

/** The home page (redesign spec §2). Every source on it is in `sources`, by reference. */
export type Home = {
  hero: {
    /** Short role labels for the mono row above the name. */
    labels: string[];
    /** The name as set in the display lines, one string per line. */
    nameLines: string[];
    /** First person. */
    headline: string;
    /** First person. */
    lead: string;
    cta: { label: string; href: string };
    scrollHint: string;
    sources: Source[];
  };
  /** Words for the marquee band: what Alex does. */
  marquee: string[];
  services: { heading: string; items: Service[] };
  workHeading: string;
  sideHeading: string;
  about: { heading: string; text: string; link: { label: string; href: string }; sources: Source[] };
  now: { heading: string; rows: DefinitionRow[] };
  contact: {
    heading: string;
    email: string;
    website: { label: string; href: string };
    line: string;
    lineSource: Source;
  };
  /** The home page's numbered `<ol>`. */
  sources: Source[];
};

/* ----------------------------------------------------------------- about */

export type TimelineRow = {
  /** Exactly as the source prints it. */
  when: string;
  what: string;
  source: Source;
};

export type SmallerPiece = {
  id: string;
  term: string;
  description: string;
  images?: ImageRef[];
  sources: Source[];
};

export type About = {
  title: string;
  /** Three first-person paragraphs (§8.1). */
  bio: string[];
  timeline: { id: string; heading: string; rows: TimelineRow[] };
  awards: { id: string; heading: string; records: Award[] };
  tools: { heading: string; lines: string[]; source: Source };
  outreach: { heading: string; lines: string[] };
  smallerPieces: { id: string; heading: string; items: SmallerPiece[] };
  extendedMemory: {
    id: string;
    term: string;
    description: string;
    source: Source;
    /** Open question 5. Rendered only when Alex approves it. */
    approved: boolean;
  };
  contact: { heading: string; lines: string[] };
  sources: Source[];
};

/* ------------------------------------------------------------------ site */

export type HeroMode = "photo" | "canvas";

export type NavLink = {
  label: string;
  href: string;
  /** External links get rel="noopener" and only appear in the masthead at ≥ 1024. */
  external?: boolean;
  desktopOnly?: boolean;
  ariaLabel?: string;
};

export type Site = {
  /** Used everywhere except the footer. */
  name: string;
  /** Used exactly once per page, in the footer. */
  fullName: string;
  email: string;
  website: { label: string; href: string };
  /** Open question 16: the final domain. Null until Alex picks one. */
  siteUrl: string | null;
  metaTitle: string;
  metaDescription: string;
  skipLinkLabel: string;
  nav: NavLink[];
  footer: {
    sourcesHeading: string;
    smallPrint: string;
    /** Open question 4. The link renders only when this is set. */
    resumePdf: { label: string; href: string } | null;
  };
  /** Section headings shared by every case study (§6). */
  sectionHeadings: {
    why: string;
    how: string;
    results: string;
    did: string;
    others: string;
    status: string;
    sources: string;
    nextPrefix: string;
    /** Brief and side templates. */
    facts: string;
    versions: string;
    targets: string;
    /** Heading over the `Architecture` system drawing on a side page. */
    system: string;
    nextProject: string;
  };
  /** Labels the spec sheet and ledger renderers need. */
  labels: {
    role: string;
    proof: string;
    /** Heading over an awards list on a case study. */
    awards: string;
    awardsNone: string;
    /** The Sources list's link back to the marker that cites it. */
    backToText: string;
    dateNotRecorded: string;
    teamMeasurement: string;
    versionTag: string;
    versionTile: string;
    versionChange: string;
    versionMeasurement: string;
    versionDate: string;
    /** The meta row on a work page and the columns of the home work list. */
    year: string;
    type: string;
    status: string;
    /** Printed beside every `Stat` with `kind: "target"`, so a goal never reads as a result. */
    target: string;
  };
  heroMode: HeroMode;
};
