/**
 * Content model for the site (design spec §4.3, extended for §5–§9).
 *
 * Every word of site copy lives in `projects.ts`, `about.ts` and `site.ts`. Components
 * render this data and hold no copy of their own.
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
  | "PinPoster";

/** An authored drawing standing in for a photograph that does not exist or is not cleared. */
export type SvgRef = {
  kind: "svg";
  component: SvgComponent;
  /** Accessible name for the figure. */
  alt: string;
  caption: string;
  source: Source;
};

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
      options: Array<{ id: string; label: string; note: string }>;
      caption: string;
      source: Source;
    }
  | {
      component: "HexProfile";
      intro: string;
      diameterLabel: string;
      rotateLabel: string;
      spanLabel: string;
      /** The one advisory string, shown when the span passes the tool's own limit. */
      spanWarning: string;
      translation: TwoColumnTable;
      architecture: { alt: string; caption: string; source: Source };
      blueprint: { alt: string; caption: string; source: Source };
      source: Source;
    };

export type ProjectSlug = "anticam" | "prosthetic-arm" | "robotics" | "cerapiper";

export type Project = {
  slug: ProjectSlug;
  /** Case-study h1 and lineup title. */
  title: string;
  /** Home lineup sentence (§5.3). */
  oneLine: string;
  /** Case-study hero lead (§7). Longer and more precise than `oneLine`. */
  lead: string;
  /** Alex's role, in the words the spec sheet uses. */
  role: string;
  /** The one figure the lineup row shows under "Proof". */
  proof: Stat;
  /** Case-study hero visual. */
  hero: ImageRef | SvgRef;
  /** Home lineup plate. */
  homePlate: PlateRef;
  spec: SpecRow[];
  /** "Why" section: two or three first-person sentences. */
  why: string[];
  how: HowBlock;
  /** Heading for the versions section ("Versions", or "Robots" on robotics). */
  versionsHeading: string;
  versions: Version[];
  /** Extra ledgers rendered after the main one. */
  ledgers?: Ledger[];
  /** Cards shown beside the ledger or the process band. */
  figures?: Figure[];
  contactSheet?: ContactSheetItem[];
  filmstrip?: FilmstripItem[];
  robots?: RobotSection[];
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

/* ------------------------------------------------------------------ home */

export type HomeIndexEntry = {
  title: string;
  description: string;
  href: string;
  source: Source;
};

export type HomeHero = {
  headline: string;
  roleLine: string;
  /** `aria-label` for the index `<nav>`. */
  indexLabel: string;
  index: HomeIndexEntry[];
  /** Photo mode, and the plate that moves under the hero in canvas mode. */
  photo: { image: ImageRef };
  /** Canvas mode (§10.1). */
  canvas: { caption: string; alt: string; pauseLabel: string; playLabel: string };
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
  line: string;
  lineSource: Source;
  link: { label: string; href: string };
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
  };
  /** Labels the spec sheet and ledger renderers need. */
  labels: {
    role: string;
    proof: string;
    awardsNone: string;
    dateNotRecorded: string;
    teamMeasurement: string;
    versionTag: string;
    versionTile: string;
    versionChange: string;
    versionMeasurement: string;
    versionDate: string;
  };
  heroMode: HeroMode;
};
