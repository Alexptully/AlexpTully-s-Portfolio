# Design specification: Alex Tully portfolio

Date: 2026-09-16. Status: final synthesis of the four concepts after the three-judge review.
Base concept: **The Lineup** (the small hardware company). Grafts and fixes are listed in §1.4.
Every fact, statistic and image reference in this document comes from `content/notes/content-brief.md`
and the section files under `content/notes/sections/`; source shorthand follows the brief
(`[cv]`, `[root]`, `[pf-NN]`, `[cb-NN]`, `[deck.js#L…]`, `[outline]`, `[brief pN]`, `[ep-N]`,
`[slide-x]`, `[deck-pN]`, `[README]`). Where a fact is unresolved the copy omits it and a
`TODO(alex):` comment is left in `src/content/projects.ts`.

Binding upstream rules (root `CLAUDE.md`): objects are the hero; restraint over decoration; one
memorable moment per page at most; no fade-in on every section; show Alex's role clearly; build on
black + blue/green CAD renders + IR pink `#FF3B6F` deliberately; first person, plain, no hype;
every statistic with its source; no phone number, address, essay text or unsourced claim.

---

## 1. Direction

### 1.1 Thesis

Present Alex's work the way a serious hardware company presents its range. The home page is a
lineup of four objects; each case study is a product page whose first viewport is the object and a
spec sheet; the founder is present in one sentence, in the first person, and the objects do the
rest. This fits the subject exactly: Alex is the founder of Tully Tech, his stated influence is
Steve Jobs, and his own material already speaks in a product vocabulary (V1–V4, price bands,
formats, prototype counts). The site adopts the AntiCam deck's token set verbatim so the deck,
tullytech.com and the portfolio read as one brand.

Visitor mode (impeccable): **Experience**. The artifact leads from the first viewport; the
interface recedes to ink and hairlines.

### 1.2 What makes it not a template

- No cards, no skills grid, no hero-metric stat row, no eyebrows or all-caps labels, no section
  numbers, no middot-joined meta strings, no arrows on links, no monospace anywhere, no fade-in per
  section, no hover lift or zoom, no custom cursor, no preloader.
- Structure comes from a catalog: an **object plate plus a spec sheet** (a real `<dl>` with hairline
  rows) is the repeated unit, so four unrelated projects read as one company's range.
- Colour discipline is Teenage Engineering's: the interface is warm ink and hairlines; all chroma
  lives inside the objects (render blue, Honu green, clay grey, pink LED light). Pink appears on the
  UI only as a light: the focus ring, one hover/active underline per viewport, the caret and the
  selection.
- Type does real work (the craft judge's fix): a light 300-weight display scale up to 88 px carries
  the page's scale, so the 300–700 px slide crops sit at native size inside fixed plates and read as
  catalog product shots, never as blown-up screenshots.
- Evidence is the design (the audience judge's fix): dated lab-note captions ("Ring doorbell, night
  mode, 7 June 2023"), a version ledger, awards written as records naming robot, team and role, and
  a Sources list on every page.
- One canvas on the entire site (the engineering judge's fix): the AntiCam pin on home. Every
  other page's moment is a labelled range input or toggle driving an SVG or two real photographs.

### 1.3 Home hero in one sentence

Left: "I'm Alex Tully. I design and build hardware: a privacy wearable, a low-cost prosthetic arm,
competition robots, and a CAD tool for clay." plus the Tully Tech role line and a four-line index
of the featured work. Right: the AntiCam object, shipped first as the real V1 photograph on a light
plate, and promoted to the procedural pin canvas (pointer = camera; the emitters wash the sensor
out) only after it has been seen on real hardware and reads as product photography.

### 1.4 Decision record: base, grafts, fixes

Base: **The Lineup**. It ranks first on the audience lens (86) and the engineering lens (85) and
second on craft (84); its 3D spec had no technical error, its contrast numbers verify, and its
first viewport says "founder of a hardware company with a product line", which is what the BUILD
committee, investors and recruiters are buying.

Grafts (donor in brackets):

1. The h1 sentence verbatim [Chapters]: "I'm Alex Tully. I design and build hardware: a privacy
   wearable, a low-cost prosthetic arm, competition robots, and a CAD tool for clay."
2. Display type that does design work [Chapters]: page and case-study titles at
   `clamp(2.5rem, 1.386rem + 4.571vw, 5.5rem)` (40 → 88 px), weight 300, so the composition and
   not the pixels fills the viewport. Kept inside Host Grotesk; no second family, no width axis.
3. Exactly one canvas on the site [Chapters, engineering lens]: the CeraPiper WebGL scene is
   dropped; its hero is an authored SVG and its moment is a user-driven hex-profile slider.
4. Closing contact band [Chapters]: the name at display size, the email as the viewport's one
   accent, tullytech.com, the USC and BUILD line, "About me".
5. Robotics filmstrip with team number and Alex's role under each of the five robots [Chapters],
   placed on `/work/robotics` directly under the spec sheet.
6. Dated lab-note captions on every plate [Bench Notebook]: what, when, how it was shot.
7. Version ledger as a real table row: tile, sentence, measurement, date [Bench Notebook].
8. Awards written as records: every line names the robot, the team number and Alex's documented
   role [Bench Notebook].
9. Print stylesheet [Bench Notebook]: paper white, ink black, canvas hidden, SVG posters shown.
10. Stats typed as `{ value, unit?, label, source }` in `projects.ts` so an uncited statistic is
    unrepresentable [Sensor Field]; internal team figures carry `attribution: "team"` and render
    with the words "team measurement".
11. "Now and next" three-row block above the footer on home: summer 2024 Stevens, summer 2026
    CeraPiper, fall 2026 USC and TroyLabs BUILD [Sensor Field].
12. The auto-exposure observation folded into the pin's light ramp: as the emitters brighten the
    key light on the rest of the pin dims, so the light reads as a sensor failing, not a lamp
    switching on [Sensor Field].
13. The low-end guard: if the first three canvas frames each exceed 24 ms the wrapper swaps to the
    poster [Chapters]. Also: `pointer-events: none` on any future sticky heading; keep
    `ViewTransition` behind a client component; delete `/lab`; strip the shadcn tokens from
    `globals.css` [Chapters, engineering lens].
14. DOM order is always plate-then-text; every visual swap is CSS grid placement [Bench Notebook].

Fixes to the base (each flagged by at least one judge):

- The Ring doorbell before/after frames move up from `/work/anticam` to the AntiCam row on home
  as a static, dated diptych ("Device off" / "Device on"); the interactive compare stays on the
  case study. Both wait on clearance; the V2 colourways photograph is the fallback plate.
- Captions carry dates wherever a source dates the image (the base explicitly dropped them).
- The hero ships in **photo mode** (real V1 photograph); **canvas mode** is a content flag flipped
  after a real-device tuning session, so the first impression never depends on GPU tuning that
  has not happened.
- The "Also" list leaves the home page; smaller pieces live on `/about#smaller-pieces` with a
  single-line link from home, pending Alex's answer (open question 5).
- The whole-row link is a stretched link on the `<h2>` anchor, so its accessible name is the
  title, not the entire article.
- `images.qualities` keeps the repo's existing `[60, 75, 90]`; plates use 75, hero plates 90.
- `/work/[slug]` gets `generateStaticParams()` and `dynamicParams = false` (params are Promises
  in Next 16).
- Five robots are ordered by Alex's role progression (fabrication lead → electrical lead →
  ops lead → captain), not by team.

Rejected: Sensor Field's full-viewport bloom (highest gimmick exposure; text over a live canvas
measured 1.08:1 against the orb); Chapters' 300vh pinned opening (spends the first scroll on an
animation); Bench Notebook's four trace-in scenes, figure numbers, dotted leaders, serif and warm
near-black (breaks the deck continuity CLAUDE.md asks to build on).

---

## 2. Design tokens

All tokens are CSS custom properties on `:root` in `src/app/globals.css`, mapped into Tailwind v4
through `@theme inline`. Hex is the canonical anchor; the oklch value is provided so tints keep
their hue. The site ships one theme (dark) and sets `color-scheme: dark`. The existing shadcn
light/dark token block and `tw-animate-css` import are removed.

### 2.1 Core tokens

| Token | Hex | oklch | Use |
|---|---|---|---|
| `--bg` | `#0B0E13` | `oklch(0.163 0.012 260.6)` | Page background on every route; ground of every dark plate; canvas clear colour (alpha 0 over it). Blue-black, never `#000`. |
| `--surface` | `#151A22` | `oklch(0.216 0.018 259.7)` | The only elevation step: Pause button fill, range-slider track, contact-band background, contact-sheet tile ground. Fill only, never fill plus shadow. |
| `--border` | `#232B36` | `oklch(0.286 0.023 256.4)` | Decorative 1 px hairlines: `<dl>` row rules, lineup row rules, footer rule. Never the sole cue of a control. |
| `--border-strong` | `#5A6473` | `oklch(0.500 0.027 258.4)` | Any boundary that is the only cue of a control: slider thumb outline, Pause button outline, toggle outline. |
| `--ink` | `#F3EFE7` | `oklch(0.953 0.011 84.6)` | All headings, body, link text, spec values. Warm off-white. |
| `--muted` | `#98A2AE` | `oklch(0.708 0.021 252.9)` | Secondary text: spec labels, captions, role labels, index descriptions. |
| `--quiet` | `#7B848F` | `oklch(0.610 0.020 253.4)` | Smallest legal text: footnote sources and small print at 14 px. Never darker. |
| `--accent` | `#FF3B6F` | `oklch(0.664 0.230 11.3)` | IR pink as a light: LED emissive and point light in the canvas; 2 px focus ring; hover/active underline; caret; selection at 25% alpha. At most one pink UI element per viewport. |
| `--accent-text` | `#FF7A9C` | `oklch(0.743 0.164 5.8)` | Only if pink must ever be text under 18 px. Not used in the launch copy. |
| `--plate-light` | `#E6E7E9` | `oklch(0.928 0.003 264.5)` | Ground of light plates (product photos shot on light gray or white) and the tone light-ground photos are levelled to. Also the pin's LED plate material. |
| `--ink-dark` | `#0B0E13` | `oklch(0.163 0.012 260.6)` | Text set on light plates or on any pink fill (none planned). |

### 2.2 Content-only tokens (never UI: never a link, border, heading or background)

| Token | Hex | oklch | Use |
|---|---|---|---|
| `--render-blue` | `#4878C0` | `oklch(0.573 0.123 258.3)` | Strokes and fills of the robotics drivetrain SVG and the CeraPiper hex profile's moving part; the tint reference for re-plated Fusion renders. |
| `--honu-green` | `#487830` | `oklch(0.521 0.116 136.5)` | Reserved for a Honu diagram if one is drawn. |
| `--clay` | `#9A9087` | `oklch(0.659 0.018 64.5)` | Fill of the CeraPiper pipe body in the hex-pipe SVG (unfired grey clay). |
| `--paper` | `#E9E4D8` | `oklch(0.919 0.017 88.0)` | The CeraPiper paper blueprint strip: the only drawn light surface, licensed because the object is paper. |
| `--paper-ink` | `#1A1F27` | `oklch(0.238 0.017 259.8)` | Lines, cut marks and labels on the paper strip. |
| `--pin-body` | `#1C2230` | `oklch(0.253 0.028 266.4)` | Canvas material: pin body (V2 dark-gray/navy colourway), roughness 0.65. |
| `--pin-rim` | `#0E1014` | `oklch(0.173 0.009 264.3)` | Canvas material: textured black rim, roughness 0.9. |
| `--led-module` | `#D9D6CC` | `oklch(0.876 0.014 93.0)` | Canvas material: COB substrate, roughness 0.4. |
| `--emitter-off` | `#3A0F1C` | `oklch(0.226 0.075 9.6)` | Canvas material: emitter base colour under the pink emissive. |

### 2.3 Spacing, radius, layout tokens

- Spacing scale (4 px base): `--s-1` 4, `--s-2` 8, `--s-3` 12, `--s-4` 16, `--s-6` 24, `--s-8` 32,
  `--s-12` 48, `--s-16` 64, `--s-24` 96, `--s-32` 128. More space above a heading than below it
  (section h3: 64 top / 16 bottom; lineup rows: 128 between rows on desktop, 80 on phone).
- Radius: `--r-plate` 16 px (plates, canvas box); `--r-photo` 2 px (a photograph inside a plate that
  keeps its own ground, e.g. the Ring frames); `--r-control` 6 px (buttons, slider thumbs are round).
  Nothing else has a radius.
- Container: `--container` 1200 px; gutters 16 px (< 640), 24 px (640–1023), 48 px (≥ 1024).
- Grid: 12 columns, 80 px columns with 20 px gaps at 1200.
- Hairline: `1px solid var(--border)`.
- Focus: `outline: 2px solid var(--accent); outline-offset: 2px;` on `:focus-visible` only.
- Selection: `::selection { background: color-mix(in oklch, var(--accent) 25%, transparent); color: var(--ink) }`;
  `caret-color: var(--accent)`; `accent-color: var(--accent)` for native range inputs.
- Scrollbar: `color-scheme: dark`; `scrollbar-color: var(--border-strong) var(--bg)`.
- Elevation: declared once, by fill (`--surface`). No shadows anywhere on the site.

### 2.4 Contrast table (WCAG 2 relative luminance, computed for this spec)

| Foreground | Background | Ratio | Where | Verdict |
|---|---|---|---|---|
| `--ink` #F3EFE7 | `--bg` #0B0E13 | 16.85:1 | headings, body | AA, AAA |
| `--muted` #98A2AE | `--bg` | 7.47:1 | captions, spec labels (15 px) | AA, AAA |
| `--quiet` #7B848F | `--bg` | 5.10:1 | footnotes, small print (14 px) | AA normal text; floor, never darker |
| `--accent` #FF3B6F | `--bg` | 5.62:1 | focus ring, underline | AA text; 3:1 non-text needed |
| `--accent-text` #FF7A9C | `--bg` | 7.84:1 | small pink text if ever needed | AA, AAA |
| `--border-strong` #5A6473 | `--bg` | 3.23:1 | control boundaries | passes WCAG 1.4.11 (3:1) |
| `--border` #232B36 | `--bg` | 1.35:1 | decorative hairlines only | not a control cue |
| `--surface` #151A22 | `--bg` | 1.11:1 | elevation fill only | decorative |
| `--ink` | `--surface` | 15.22:1 | text in the contact band, on buttons | AA, AAA |
| `--muted` | `--surface` | 6.75:1 | muted text in the contact band | AA |
| `--quiet` | `--surface` | 4.61:1 | small print must NOT sit on `--surface` at 14 px: keep footnotes on `--bg` | borderline; avoid |
| `--ink-dark` #0B0E13 | `--plate-light` #E6E7E9 | 15.62:1 | any text on a light plate (none planned; captions sit below plates on `--bg`) | AA, AAA |
| `--ink-dark` | `--accent` | 5.62:1 | text on a pink fill if ever used | AA |
| `--ink` | `--accent` | 3.00:1 | white-ish on pink | fails normal text; never used |
| `--paper-ink` #1A1F27 | `--paper` #E9E4D8 | 13.04:1 | labels on the CeraPiper blueprint SVG | AA, AAA |
| `--render-blue` #4878C0 | `--bg` | 4.35:1 | SVG strokes (graphics, 3:1 needed) | passes non-text |
| `--honu-green` #487830 | `--bg` | 3.69:1 | SVG strokes only | passes non-text |
| `--clay` #9A9087 | `--bg` | 6.18:1 | SVG fill | passes |

Rules that fall out of the table: footnotes never below 14 px or darker than `--quiet`, and never on
`--surface`; captions sit under plates on `--bg`, never on the plate; a pink fill (none planned) takes
`--ink-dark` text; pink is never body-size text. Halation on dark makes equal ratios read lower, so
body stays at 16.85:1 rather than the minimum. Run the final pink pairs through APCA before launch
and expect to use `--accent-text` for any pink under 18 px.

### 2.5 Tailwind v4 mapping (in `globals.css`)

```css
@theme inline {
  --color-bg: var(--bg); --color-surface: var(--surface); --color-border: var(--border);
  --color-border-strong: var(--border-strong); --color-ink: var(--ink); --color-muted: var(--muted);
  --color-quiet: var(--quiet); --color-accent: var(--accent); --color-accent-text: var(--accent-text);
  --color-plate-light: var(--plate-light); --color-ink-dark: var(--ink-dark);
  --color-render-blue: var(--render-blue); --color-honu-green: var(--honu-green); --color-clay: var(--clay);
  --color-paper: var(--paper); --color-paper-ink: var(--paper-ink);
  --font-sans: var(--font-host), ui-sans-serif, system-ui, "Helvetica Neue", Arial, sans-serif;
  --radius-plate: 16px; --radius-photo: 2px; --radius-control: 6px;
}
```

---

## 3. Typography

### 3.1 Family

One family: **Host Grotesk** (Google Fonts; variable, `wght` 300–800, italic axis available and not
loaded). Loaded once in `src/app/layout.tsx`:

```ts
import { Host_Grotesk } from "next/font/google";
const host = Host_Grotesk({
  subsets: ["latin"],
  weight: "variable",           // wght 300–800
  style: ["normal"],
  display: "swap",
  adjustFontFallback: true,     // metric-compatible "Host Grotesk Fallback" from Arial
  variable: "--font-host",
});
```

Fallback stack: `var(--font-host), ui-sans-serif, system-ui, "Helvetica Neue", Arial, sans-serif`.
No monospace anywhere; figures use `font-variant-numeric: tabular-nums` on spec sheets, ledgers,
timelines, footnotes and any line containing numbers. No italics. No all caps. Tracking floor
-0.02em. Headings use `text-wrap: balance`; body uses `text-wrap: pretty`.

Rationale: uniform letter widths across weights keep role lines at 500 and values at 400 aligned in
the spec sheets without a monospace face; it is not on the saturated-default list; one recessive
family keeps the interface behind the objects. The display step at 300 weight is where the type
does its design work (graft 2).

### 3.2 Type scale

Fluid via `clamp()`; the two columns give the resolved values at 390 and 1440.

| Role | CSS | Phone 390 | Desktop 1440 | Weight | Line-height | Tracking | Colour |
|---|---|---|---|---|---|---|---|
| Display (home h1, case-study h1, contact-band name, /about h1) | `clamp(2.5rem, 1.386rem + 4.571vw, 5.5rem)` | 40 px | 88 px | 300 | 1.0 | -0.02em | ink |
| Title (lineup h2, case-study section h2 like "Why", robot h2) | `clamp(2rem, 1.536rem + 1.905vw, 3.25rem)` | 32 px | 52 px | 400 | 1.1 | -0.015em | ink |
| Heading (h3: spec-sheet caption, ledger heading, about subsections) | `clamp(1.25rem, 1.157rem + 0.381vw, 1.5rem)` | 20 px | 24 px | 500 | 1.25 | -0.01em | ink |
| Lead (sentence under any h1/h2) | `clamp(1.125rem, 1.079rem + 0.19vw, 1.25rem)` | 18 px | 20 px | 400 | 1.45 | 0 | ink |
| Body | 17 px < 768, 18 px ≥ 768 | 17 px | 18 px | 400 | 1.6 / 1.55 | 0.003em | ink |
| Spec value, ledger cell | same as body | 17 | 18 | 400 | 1.5 | 0 | ink, tabular |
| Role line (spec row "My role") | same as body | 17 | 18 | 500 | 1.5 | 0 | ink |
| Caption, spec label, index description | 15 px | 15 | 15 | 400 | 1.45 | 0 | muted |
| Footnote, source, small print | 14 px | 14 | 14 | 400 | 1.45 | 0 | quiet |
| Nav, wordmark | 16 px | 16 | 16 | 500 | 1 | 0 | ink |
| Button label | 15 px | 15 | 15 | 500 | 1 | 0 | ink |

Measure: body and lead max `34rem` (about 60–66 characters at 18 px); spec values wrap inside their
column. Paragraph rhythm by spacing (`margin-block-end: 1em`), never indentation. Superscript
footnote markers are real `<sup><a>` at 0.7em, `vertical-align: super`, ink, underlined on
hover/focus only.

Light-on-dark compensation: body at 400 (never 300), line-height one step above a light-theme
setting, +0.003em body tracking. Display is allowed at 300 because it is 40–88 px.

### 3.3 Spacing rhythm around type

- Display h1 → lead: 24 px. Lead → role line: 16 px. Role line → index list: 32 px.
- Lineup row: title → sentence 16 px; sentence → mini `<dl>` 24 px.
- Case study: section h2 has 96 px above (64 on phone) and 24 below; h3 has 48 above and 12 below.
- Caption sits 12 px under its plate; the source line 4 px under the caption.

---

## 4. Information architecture and navigation

### 4.1 Routes

| Route | Purpose | Notes |
|---|---|---|
| `/` | Home and the work index: masthead, hero, four lineup rows, "Now and next", contact band, footer with Sources | Static. The one canvas on the site (when `hero.mode === "canvas"`). |
| `/work/anticam` | Case study | Moment: before/after compare of the two Ring frames (`<input type="range">`), no WebGL. |
| `/work/prosthetic-arm` | Case study | Moment: SVG finger linkage driven by a "Servo travel" range input. |
| `/work/robotics` | One page, five robots in role order, anchors `#scorpion #swerve-drive #honu #ball-drive #monti` | Moment: top-down drivetrain SVG (Swerve / Ball-Drive / Strafer toggle) following the pointer or a "Drive direction" range input. |
| `/work/cerapiper` | Case study | Moment: hex-profile SVG with an "Outer diameter" range input (40–78 mm) and a 30° rotation stepper; no WebGL. |
| `/about` | Bio, dated timeline, awards as records, tools, teaching and outreach, smaller pieces (`#smaller-pieces`), Extended Memory concept note (`#extended-memory`), contact block | Static, no canvas, no motion. |
| `/sitemap.xml`, `/robots.txt` | `app/sitemap.ts`, `app/robots.ts` | |
| `/opengraph-image` | `app/opengraph-image.jpg` (1200×630, authored) and per-project `app/work/[slug]/opengraph-image.tsx` via `ImageResponse` | |
| `/lab` | **Delete before launch** (proof route) | |

No `/contact` route and no form. No `/work` index page (home is the index). No `/work/electric-road`.

### 4.2 Navigation

- Masthead on every route (not sticky): wordmark "Alex Tully" (home link) left; right: "Work"
  (`/#work` on other routes, `#work` on home), "About" (`/about`), "Email"
  (`mailto:alexptully@gmail.com`). `tullytech.com` (external, `rel="noopener"`) appears in the
  masthead at ≥ 1024 only; below that it lives in the footer. Active route: 2 px `--accent`
  underline offset 6 px plus `aria-current="page"`.
- Skip link "Skip to content" as the first focusable element, visible on focus.
- Every case study ends with "Next: <product>" in lineup order (AntiCam → Prosthetic arm →
  Robotics → CeraPiper → wraps to AntiCam), then Sources, then the shared footer.
- Footer on every route: contact block, Sources for that page, résumé link (TODO), small print.
- Route continuity: the plate image carries `<ViewTransition name={`plate-${slug}`} default="none">`
  from a home row to the case-study hero (300 ms, `cubic-bezier(0.16, 1, 0.3, 1)`), zeroed under
  reduced motion. The wrapper lives in a client component `PlateTransition` because plain React
  19.2.8 does not export `ViewTransition`.

### 4.3 Content model (`src/content/projects.ts`)

All copy renders from one typed file; no copy in components.

```ts
export type Source = { name: string; href?: string; path?: string; note?: string };
export type Stat = { value: string; unit?: string; label: string; source: Source; attribution?: "alex" | "team" | "external" };
export type ImageRef = { id: string; src: string; width: number; height: number; ground: "dark" | "light" | "photo"; alt: string; caption: string; date?: string; source: Source; cleared: boolean };
export type SpecRow = { term: string; value: string; sources?: Source[] };
export type Award = { name: string; robot?: string; team?: string; role?: string; source: Source };
export type Version = { tag: string; date?: string; sentence: string; measurement?: Stat; tile?: ImageRef };
export type Project = {
  slug: "anticam" | "prosthetic-arm" | "robotics" | "cerapiper";
  title: string; oneLine: string; role: string; proof: Stat;
  hero: ImageRef; homePlate: ImageRef | { kind: "diptych"; a: ImageRef; b: ImageRef; fallback: ImageRef } | { kind: "svg"; component: "HexPipe" };
  spec: SpecRow[]; why: string[]; how: { component: "RingCompare" | "FingerLinkage" | "DriveDiagram" | "HexProfile"; intro: string };
  versions: Version[]; results: string[]; awards: Award[] | "none"; didList: string[]; othersList: string[];
  status: string; next: string; stats: Stat[]; sources: Source[];
};
export const heroMode: "photo" | "canvas" = "photo";  // flip after the device tuning session
```

A `Stat` cannot exist without a `source`; the `Stat` renderer prints `value unit` followed by a
superscript footnote link, and appends "(team measurement)" when `attribution === "team"`. An
`ImageRef` with `cleared: false` renders its declared fallback or nothing, never the image.

---

## 5. Home page

Order and anatomy. Layout at 1440 assumes the 1200 container with 12 columns (80 px + 20 px gaps);
"columns a–b" means grid column span. Layout at 390 assumes 16 px gutters and a 358 px content
width. All sections are static except the hero canvas in canvas mode.

### 5.1 Masthead

- Content: wordmark "Alex Tully"; links "Work", "About", "Email", "tullytech.com" (≥ 1024).
- 1440: one 56 px row; wordmark at the container's left edge; links right with 32 px gaps.
- 390: one 56 px row; wordmark left; "Work", "About", "Email" right with 20 px gaps; hit areas
  44 px tall.
- Motion: none. Active route underline is a static state.

### 5.2 Hero

- Purpose: identify the person and the four objects in one glance; show a real product.
- Content, left column:
  - h1 (display): "I'm Alex Tully. I design and build hardware: a privacy wearable, a low-cost
    prosthetic arm, competition robots, and a CAD tool for clay." `[cv; root]`
  - Role line (body, 500): "Founder, Tully Tech. Sole designer and builder of AntiCam."
    `[cv; deck.js#L8]`
  - Index (`<nav aria-label="Featured work">`, a `<ul>` of four rows with hairlines, each row an
    anchor to its lineup row; title in ink 18 px/500, description in muted 15 px):
    - "AntiCam" — "privacy wearable, Tully Tech, tested June 2023" `[cb-15]`
    - "Low-cost prosthetic arm" — "Stevens Institute of Technology, summer 2024" `[cv]`
    - "Robotics" — "FIRST Tech Challenge, #17253 and #14712" `[pf-01…05]` (no year: none printed)
    - "CeraPiper" — "Cornell Tech x Technion, summer 2026" `[cv]`
- Content, right column, **photo mode** (launch state): `Plate` (light, 4:3) holding
  `ac-01 v1-led-face` (500×475 native, centred, never upscaled). Caption: "AntiCam, final prototype
  V1, emitter side. Phone camera: the emitters read magenta because the sensor sees near-infrared;
  to the eye they are dark." `[cb-12; deck.js#L210]`. No date (no source dates the photo).
- Right column, **canvas mode** (after the device test): the `PinCanvas` box (4:3, same box) with the
  SVG poster underneath; caption: "This is a model of the AntiCam clip-on pin, not a photo. Each dot
  is one infrared LED. Move the pointer: that is where the camera is, and the camera is what washes
  out." plus a "Pause" button (`aria-pressed`). The V1 photograph then moves directly under the hero
  as a light plate at 500 px with the caption above.
- 1440: hero min-height 640 px; text columns 1–5 (480 px; h1 measure ≤ 14 words wraps to 3–4
  lines at 88 px), object columns 6–12 (680 px wide, 4:3 → 510 px tall) vertically centred to the
  text block. Caption under the plate in columns 6–12, 15 px muted, max 60ch.
- 390: h1 (40 px), role line, index, then the plate at 358 px wide (4:3, 269 px; image scales down
  to 358 px), caption, then (canvas mode only) the Pause button and the V1 photo plate.
- Motion: none in photo mode. Canvas mode: the site's single authored moment (§10).

### 5.3 Lineup (`id="work"`)

Four `<article>` rows in fixed order, identical anatomy: plate; h2 title (stretched link to the
case study); one first-person sentence (lead); a two-row mini `<dl>` ("My role", "Proof"). A 1 px
`--border` rule spans the container above each row. 128 px between rows (80 on phone).

- 1440: each row is a 12-column grid; plate columns 1–6 (580 px, 4:3 → 435 px); text columns 7–12
  aligned to the plate's top edge; title 52 px; sentence 20 px at ≤ 34rem; mini `<dl>` labels
  muted 15 px above values ink 18 px, 24 px between the two rows. No alternation.
- 390: plate first at 358 px (4:3, 269 px), 20 px, title 32 px, sentence 18 px, mini `<dl>`.
- Hover/focus on the title: 2 px `--accent` underline, offset 4 px, 150 ms. The plate does not
  move or zoom. The plate image carries `plate-${slug}` for the view transition.

Row 1: AntiCam
- Plate: **diptych** (two 16:9 frames stacked in the 4:3 plate on `--bg`, 2 px radius each, 8 px
  gap, each frame 379×213 CSS at 1440 and 358×201 at 390, downscaled from native):
  `ac-05 ring-off` above, `ac-04 ring-on` below. Caption under the plate: "Same Ring doorbell, night
  mode, 7 June 2023. Above: device off. Below: pin prototype on; the sensor records a glowing orb
  where the face should be." `[cb-15; cb-16; deck.js#L235-236]`. Until Alex clears the frames
  (residential street, a person in shot), the plate shows `ac-06 v2-colorways` (light plate) with
  the caption "Final prototype V2: white, dark gray and navy colourways." `[cb-15]`.
- Title: "AntiCam".
- Sentence: "A wearable that keeps cameras from capturing a usable image of me. An infrared LED
  array washes out night-vision sensors and a retro-reflective lining returns flashes to the lens.
  Nothing is jammed, nothing is damaged." `[outline#L3; deck.js#L192-196, #L524]`
- My role: "Founder, Tully Tech. Sole designer and builder." `[cv; deck.js#L8]`
- Proof: "30+ prototypes, four major versions, tested against a live doorbell camera.¹"
  `[outline#L3; deck.js#L446; cv]`

Row 2: Low-cost prosthetic arm
- Plate: dark, `pa-01 arm-ghosted` (641×468 native, luminance-keyed, centred). Caption: "Render of
  the whole arm: servo stack, gears and board through the translucent forearm." `[brief p10]`
- Title: "Low-cost prosthetic arm".
- Sentence: "A 3D-printable lower-arm prosthetic: servos pull tendon-style cords, a myoelectric
  sensor reads the muscle, and the model is sized to the wearer from seven hand measurements."
  `[brief p5, p7, p9, p12]`
- My role: "Research assistant, Stevens Institute of Technology, summer 2024, under faculty
  supervision; continued through Avenues' Mastery Program." `[cv; root]`
- Proof: "90+ prototypes.²" `[cv]`. No cost figure (TODO(alex): $100 vs $200).

Row 3: Robotics
- Plate: light, `rb-01 monty-render-white` (450×370 native, centred on `--plate-light`). Caption:
  "Monty, Tritonics #17253: team CAD render, turreted launcher and three-ball sorting intake."
  `[ep-1]`
- Title: "Robotics, FIRST Tech Challenge".
- Sentence: "Five competition robots across two teams, from a first iteration cut entirely in
  wooden plates to a modular metal robot whose subsystems come off in 45 seconds at most."
  `[ep-1; pf-01]`
- My role: "Captain and operations lead, Tritonics #17253; earlier electrical lead, #14712, and
  fabrication lead." `[cv; slide-e; pf-02; pf-03; pf-05]`
- Proof: "With Honu, #14712, we won 1st in NYC and the 2nd-place Think Award at the FTC World
  Championship.³" `[pf-03; cv]`

Row 4: CeraPiper
- Plate: authored SVG `HexPipe` (hairlines in `--muted` at 1.25 px, body fill `--clay` at 30%
  opacity, on `--bg`): a ribbed hexagonal pipe with one perpendicular branch and a plug-and-socket
  end. Caption: "Drawn from the tool's own primitives: hexagonal profile, ribs, a perpendicular
  branch, a connector. No photograph of the system is cleared yet." `[README]`
- Title: "CeraPiper".
- Sentence: "A CAD tool for custom hollow ceramic pipes that assemble into structures which cool a
  room by evaporating water. It runs inside Onshape, compiles the feature tree into an extrusion
  sequence, and prints a paper blueprint that runs under the clay." `[README]`
- My role: "Research intern, Cornell Tech x Technion, summer 2026." `[cv]`
- Proof: "The earlier CAM version was published at ACM SCF 2025; the CAD layer is written up in a
  paper currently under review.⁴" `[README; brief §CeraPiper]`

### 5.4 Now and next

- h2 (title scale): "Now and next". A `<dl>` of three rows with hairlines; term in muted 15 px,
  description in ink 18 px, tabular numerals:
  - "Summer 2024" — "Research assistant, Stevens Institute of Technology: the prosthetic arm." `[cv]`
  - "Summer 2026" — "Research intern on CeraPiper, Cornell Tech x Technion." `[cv]`
  - "Fall 2026" — "USC Iovine and Young Academy, Arts, Technology and the Business of Innovation;
    TroyLabs BUILD, PM division; advanced robotics." `[root]` (TODO(alex): confirm public; root only)
- One line under it in body: "Smaller pieces: Electric Road, IDEA Club and outreach are on the
  about page." with "about page" linking `/about#smaller-pieces`.
- 1440: h2 columns 1–3; `<dl>` columns 4–12 (terms 4–5, descriptions 6–12). 390: stacked.
- Motion: none.

### 5.5 Contact band

- Full-bleed `--surface` band; inside the container: "Alex Tully" at display scale (88/40 px,
  300); then two lines at lead scale: `alexptully@gmail.com` (mailto; ink text with a 2 px
  `--accent` underline, the one pink element in this viewport) and `tullytech.com` (external; ink,
  1 px ink underline); then muted 15 px: "USC Iovine and Young Academy, fall 2026. TroyLabs BUILD,
  PM division." `[root]`; then a link "About me" (`/about`).
- 1440: padding 128 px top and bottom; content columns 1–8. 390: padding 80 px; left-aligned.
- Motion: none.

### 5.6 Footer (shared, every route)

- Left: three stacked lines: "Alexander Tully" (the one use of the full name), `alexptully@gmail.com`
  (mailto), `tullytech.com`; then "Résumé (PDF)" rendered only when `resumePdf` exists in content
  (TODO(alex): phone-number-free PDF).
- Right: h3 "Sources" and the page's numbered `<ol>`: each item is the statistic or claim, the
  source name, and a link when a public URL exists (`href`) or the document title when it is an
  internal file (`path`, rendered as text). Home footnotes: ¹ 30+ prototypes, four versions,
  doorbell test: AntiCam pitch-deck outline and résumé, 2026. ² 90+ prototypes: résumé, 2026.
  ³ 1st in NYC, 2nd-place Think Award: portfolio page "Honu Robot, FTC #14712"; résumé. ⁴ ACM SCF
  2025 paper: doi.org/10.1145/3745778.3766644 (Berman, Seiz, Roumen); CAD paper under review:
  CeraPiper README.
- Small print, 14 px quiet, on `--bg`: "Every statistic on this site links to its source. Team
  achievements are described as we; my role is stated on each page. Photos are my own prototypes
  and tests unless captioned otherwise."
- 1440: 1 px rule; two columns (contact 1–5, sources 6–12); 64 px top padding, 48 bottom.
  390: contact first, then sources.

### 5.7 Home wireframe, 1440

```
+--------------------------------------------------------------------------------------------------+
|  Alex Tully                                              Work    About    Email    tullytech.com  |
+--------------------------------------------------------------------------------------------------+
|                                                                                                  |
|  I'm Alex Tully.                          +------------------------------------------------+     |
|  I design and build hardware:             |                                                |     |
|  a privacy wearable, a low-cost           |     light plate #E6E7E9 (photo mode)           |     |
|  prosthetic arm, competition              |     [ AntiCam V1, emitter side, 500x475 ]      |     |
|  robots, and a CAD tool                   |                                                |     |
|  for clay.                    (88px/300)  |     (canvas mode: procedural pin over SVG      |     |
|                                           |      poster; pointer = camera)                 |     |
|  Founder, Tully Tech.                     +------------------------------------------------+     |
|  Sole designer and builder of AntiCam.    AntiCam, final prototype V1, emitter side. Phone       |
|                                           camera: the emitters read magenta ...        [Pause]*  |
|  AntiCam            privacy wearable, Tully Tech, tested June 2023                                |
|  ------------------------------------------------------------------                              |
|  Low-cost prosthetic arm   Stevens Institute of Technology, summer 2024                          |
|  ------------------------------------------------------------------                              |
|  Robotics           FIRST Tech Challenge, #17253 and #14712                                      |
|  ------------------------------------------------------------------                              |
|  CeraPiper          Cornell Tech x Technion, summer 2026                                         |
|                                                                                                  |
+--------------------------------------------------------------------------------------------------+
|  +------------------------------------------+   AntiCam                                (52px)    |
|  | [ Ring frame, device off, 379x213 ]      |   A wearable that keeps cameras from capturing    |
|  |                                          |   a usable image of me. An infrared LED array ...  |
|  | [ Ring frame, device on, 379x213 ]       |                                                    |
|  +------------------------------------------+   My role                                          |
|  Same Ring doorbell, night mode, 7 June 2023.   Founder, Tully Tech. Sole designer and builder.  |
|  Above: device off. Below: pin prototype on...  Proof                                            |
|                                                 30+ prototypes, four major versions, tested ...1 |
+--------------------------------------------------------------------------------------------------+
|  +------------------------------------------+   Low-cost prosthetic arm                          |
|  |   dark plate: ghosted arm render 641px   |   A 3D-printable lower-arm prosthetic ...          |
|  +------------------------------------------+   My role  Research assistant, Stevens ...         |
|  Render of the whole arm ...                    Proof    90+ prototypes 2                        |
+--------------------------------------------------------------------------------------------------+
|  +------------------------------------------+   Robotics, FIRST Tech Challenge                   |
|  |   light plate: Monty render 450px        |   Five competition robots across two teams ...     |
|  +------------------------------------------+   My role  Captain and operations lead, #17253 ... |
|  Monty, Tritonics #17253: team CAD render ...   Proof    1st in NYC and 2nd-place Think Award 3  |
+--------------------------------------------------------------------------------------------------+
|  +------------------------------------------+   CeraPiper                                        |
|  |   hex pipe SVG, hairlines on page bg     |   A CAD tool for custom hollow ceramic pipes ...   |
|  +------------------------------------------+   My role  Research intern, Cornell Tech x ...     |
|  Drawn from the tool's own primitives ...       Proof    CAM version published at ACM SCF 2025 4 |
+--------------------------------------------------------------------------------------------------+
|  Now and next          Summer 2024   Research assistant, Stevens Institute of Technology ...     |
|                        -----------------------------------------------------------------         |
|                        Summer 2026   Research intern on CeraPiper, Cornell Tech x Technion.      |
|                        -----------------------------------------------------------------         |
|                        Fall 2026     USC Iovine and Young Academy ...; TroyLabs BUILD ...        |
|                        Smaller pieces: Electric Road, IDEA Club and outreach are on the about page|
+--------------------------------------------------------------------------------------------------+
| ░░ surface band                                                                                  |
| ░░  Alex Tully                                                                       (88px/300)  |
| ░░  alexptully@gmail.com  (pink underline)                                                       |
| ░░  tullytech.com                                                                                |
| ░░  USC Iovine and Young Academy, fall 2026. TroyLabs BUILD, PM division.      About me          |
+--------------------------------------------------------------------------------------------------+
|  Alexander Tully                          Sources                                                |
|  alexptully@gmail.com                     1  30+ prototypes ...  AntiCam pitch-deck outline; CV  |
|  tullytech.com                            2  90+ prototypes ...  résumé, 2026                    |
|  Résumé (PDF)  [only when it exists]      3  1st in NYC, Think Award ... portfolio page, Honu     |
|                                           4  ACM SCF 2025 ... doi.org/10.1145/3745778.3766644    |
|  Every statistic on this site links to its source. Team achievements are described as we ...     |
+--------------------------------------------------------------------------------------------------+
```

### 5.8 Home wireframe, 390

```
+--------------------------------------+
| Alex Tully        Work  About  Email |
+--------------------------------------+
| I'm Alex Tully.                      |
| I design and build                   |
| hardware: a privacy                  |
| wearable, a low-cost                 |
| prosthetic arm,                      |
| competition robots, and              |
| a CAD tool for clay.        (40/300) |
|                                      |
| Founder, Tully Tech. Sole designer   |
| and builder of AntiCam.              |
|                                      |
| AntiCam                              |
| privacy wearable, Tully Tech, ...    |
| ------------------------------------ |
| Low-cost prosthetic arm              |
| Stevens Institute of Technology ...  |
| ------------------------------------ |
| Robotics                             |
| FIRST Tech Challenge, #17253 ...     |
| ------------------------------------ |
| CeraPiper                            |
| Cornell Tech x Technion, summer 2026 |
|                                      |
| +----------------------------------+ |
| |  light plate, V1 photo 358 wide  | |
| +----------------------------------+ |
| AntiCam, final prototype V1 ...      |
+--------------------------------------+
| +----------------------------------+ |
| | [Ring frame, off] 358x201        | |
| | [Ring frame, on ] 358x201        | |
| +----------------------------------+ |
| Same Ring doorbell, night mode,      |
| 7 June 2023 ...                      |
| AntiCam                      (32px)  |
| A wearable that keeps cameras ...    |
| My role                              |
| Founder, Tully Tech. Sole designer   |
| and builder.                         |
| Proof                                |
| 30+ prototypes, four major ... 1     |
+--------------------------------------+
| +----------------------------------+ |
| | dark plate, arm render 358 wide  | |
| +----------------------------------+ |
| Low-cost prosthetic arm              |
| ... sentence, My role, Proof         |
+--------------------------------------+
| +----------------------------------+ |
| | light plate, Monty render        | |
| +----------------------------------+ |
| Robotics, FIRST Tech Challenge       |
| ... sentence, My role, Proof         |
+--------------------------------------+
| +----------------------------------+ |
| | hex pipe SVG on page bg          | |
| +----------------------------------+ |
| CeraPiper                            |
| ... sentence, My role, Proof         |
+--------------------------------------+
| Now and next                         |
| Summer 2024                          |
| Research assistant, Stevens ...      |
| Summer 2026                          |
| Research intern on CeraPiper ...     |
| Fall 2026                            |
| USC Iovine and Young Academy ...     |
| Smaller pieces: ... on the about page|
+--------------------------------------+
|░ Alex Tully                 (40/300) |
|░ alexptully@gmail.com   (pink ul)    |
|░ tullytech.com                       |
|░ USC IYA, fall 2026. TroyLabs BUILD. |
|░ About me                            |
+--------------------------------------+
| Alexander Tully                      |
| alexptully@gmail.com                 |
| tullytech.com                        |
| Sources                              |
| 1 ... 2 ... 3 ... 4 ...              |
| Every statistic on this site ...     |
+--------------------------------------+
```

---

## 6. Work index and case study template

There is no separate work index: home §5.3 is the index. Every `/work/[slug]` page renders the
same component tree from `projects.ts` in this order. Container 1200; content column for prose is
columns 1–8 (≤ 34rem measure); plates span the width noted.

1. **Object hero** (first viewport). `Plate` at container width up to 960 px, 16:10 (960×600), ground
   from `hero.ground`; the hero image centred at native size and never larger; empty ground is the
   composition. The image carries `plate-${slug}` for the view transition. Below the plate: caption
   (15 px muted, dated where possible) and its source line. Then h1 (display, 88/40) = product
   name; then the one-line first-person description (lead). 390: plate at 358 px wide (16:10, 224
   px; image scales down), caption, h1, lead.
2. **Spec sheet** (`SpecSheet`, a real `<dl>`). Two-column grid at ≥ 768 (term columns 1–4, value
   5–12), stacked below; 1 px `--border` rule between rows; terms muted 15 px; values ink 18 px
   with tabular numerals; the "My role" value at weight 500. Rows in this fixed order, omitting any
   without a sourced value: My role · When · With · Status · Formats or Stack · Price target ·
   Awards · Prototypes. Every figure carries a superscript footnote. "Awards" prints "None" when
   `awards === "none"`.
3. **Why** (h2 "Why"). Two or three first-person sentences at body size.
4. **How it works** (h2 "How it works"). The page's single interactive element, always user-driven,
   inside a `--surface`-free area on `--bg`; one sentence of intro in the DOM; a `<label>`led
   `<input type="range">` or a button group; the SVG or images at ≤ 960 wide. Details per project
   in §7 and §10.3.
5. **Versions** (h2 "Versions"; "Robots" on robotics). `VersionLedger`: one row per version, a real
   `<table>` at ≥ 768 (columns: version tag · tile · what changed · measurement · date) and a
   stacked list below 768; tiles 160 px on `--surface` (104 px on phone); every measurement is a
   `Stat` with a footnote; every date exactly as the source prints it; "date not recorded" where
   none exists.
6. **Results and tests** (h2 "Results"). Sentences with superscript footnotes; never a stat row.
   Internal team figures print "(team measurement)" inline.
7. **What I did, what others did** (h2). Two `<ul>` side by side at ≥ 768 with a 1 px rule
   between; headings h3 "What I did" and "What others did". Names roles, never teammates.
8. **Status and next** (h2 "Status"). One or two sentences from the source's own next steps; then a
   link "Next: <product>" (lead size, ink, underline on hover) to the next case study in lineup
   order.
9. **Sources** (h2 "Sources") as the page's numbered `<ol>`, then the shared footer.

Image placement rules inside the template: hero-quality crops only in section 1; card and tile
crops in sections 4 and 5; light plates and dark plates never share a row; nothing displayed wider
than its native pixel width; every image has a caption sentence (what, when, how it was shot) and a
source line; test photos are captioned as documentation and never composited into device frames.

---

## 7. Case studies

### 7.1 AntiCam (`/work/anticam`)

- Hero: light plate; `ac-01 v1-led-face` (500×475) centred in 960×600. Caption: "Final prototype
  V1, emitter side, through a phone camera. The nine emitters read magenta because the sensor
  responds to near-infrared; to the eye they are dark." `[cb-12; deck.js#L210]`. h1 "AntiCam".
  Lead: "AntiCam is my wearable privacy device: an infrared LED array and a retro-reflective lining
  that keep cameras from capturing a usable image of me, without jamming or damaging anything."
  `[outline#L3; cv]`
- Spec sheet:
  - My role: "Founder, Tully Tech. Sole designer, builder and author of every AntiCam document."
    `[cv; deck.js#L8]`
  - When: "Earliest dated test 7 June 2023; Mastery project 11 February to 6 May 2025; BUILD
    application deck fall 2026." `[cb-15; mastery#page-3; deck.js#L107]` (TODO(alex): the deck says
    two years; the dated evidence says three or more.)
  - Status: "Hand-built prototype. A custom PCB, battery-safety testing and IR eye-safety testing
    are planned, not done." `[deck.js#L581]`
  - Formats: "Clip-on pin, cap, room unit, planned; one emitter, driver and battery platform."
    `[deck.js#L403-405]`
  - Price target: "Pin $30–45, cap $40–65, planned." `[deck.js#L403-405]` (TODO(alex): room unit
    $100+ per the deck vs "all under $100" in root; omitted until resolved.)
  - Awards: "None."
  - Prototypes: "30+, four major versions.¹" `[outline#L3; deck.js#L446; cv]`
- Why (rewritten, never quoting the ethics essay): "Most cameras use night-vision-capable sensors
  that respond to near-infrared light the eye cannot see. AntiCam works in that gap: light, not
  radio; physics, not patterns. It removes me from the frame without removing the camera from
  service, and it is weaker in bright daylight, which I say up front. I built it to protect people,
  and the use policy says so at checkout." `[deck.js#L192-196, #L524-526; ethics ideas only]`
- How it works: `RingCompare`. Intro: "The same Ring doorbell camera in night mode, same street,
  7 June 2023. Left: device off. Right: pin prototype on." A `<label for="ring">Camera view:
  device off to device on</label>` and `<input type="range" min=0 max=100>` driving a `clip-path:
  inset(0 calc(100% - var(--x)) 0 0)` on the "on" frame over the "off" frame, both at 960×540
  (downscaled from native, 16:9), the ring.com watermark and the 06/07/2023 22:31:53 timestamp
  kept as documentation. `aria-valuetext` "Device off" (< 50) / "Device on" (≥ 50). Reduced
  motion: identical (user-driven). Until cleared: `ac-03 test2-glow` on a light plate at 520 px
  with the caption "Test 2, phone camera: the emitter reads magenta to a sensor and dark to the
  eye." `[cb-09; deck.js#L210]`
- Versions (ledger, `[deck.js#L449-452]`, tiles from `[cb-08…cb-17]`):
  | Tag | Tile | What changed | Measurement | Date |
  |---|---|---|---|---|
  | V1 | `ac-13 v1-first-carrier` | Proof of physics: a single IR module on laser-cut discs with four coin cells. Cameras see it, eyes do not. | — | date not recorded |
  | V2 | `ac-09 mdf-laser-bed` | First enclosure: laser-cut MDF housing, logo engraved into the lid, carryable. | — | date not recorded |
  | V3 | `ac-11 nine-cell-plate` | Clip-on device: acrylic plates, nine hand-soldered coin cells joined with copper tape, tested against real cameras. | — | date not recorded |
  | V4 | `ac-07 v2-flatlay` | Pin V2 and Cap V2: six clear acrylic plates, slide switch, under-brim cap array. The generation that passed the doorbell test. | doorbell test | 7 June 2023 `[cb-15]` |
  Under the ledger, a contact sheet (`ContactSheet`) of the photographed build order at 160 px
  tiles with lab-note captions: "Light test" (`ac-16`, only if a clean region exists; else omitted),
  "First prototype" (`ac-13`), "Test 2, phone camera" (`ac-03`), "Second prototype, MDF on the laser
  bed" (`ac-09`), "Third prototype, nine coin cells" (`ac-11`), "Final V1" (`ac-02 v1-lid-side`),
  "V2 process, six acrylic plates" (`ac-07`), "Final V2, three colourways" (`ac-06`), "Doorbell test,
  7 June 2023" (`ac-04`, cleared only), "Cap V2, brim underside" (`ac-14`, TODO(alex): confirm it is
  a real prototype).
- Results: "Tested against a live Ring doorbell camera in night mode on 7 June 2023: the sensor
  recorded a glowing orb where the face should be.²" `[cb-15; deck.js#L235-236]`. External context,
  each with its link: "47% of Americans have found a camera at a vacation rental, up from 25% in
  2023.³" (IPX1031); "about 537,000 surveillance cameras across the 50 largest U.S. cities, 70,882
  in New York City.⁴" (Comparitech); "Airbnb banned indoor security cameras effective 30 April
  2024.⁵" (Airbnb); "the use, marketing, sale and import of jammers are illegal under the
  Communications Act.⁶" (FCC). Nothing from the do-not-publish list.
- What I did: "Designed and built every version; wrote every AntiCam document; built the website
  and launch strategy." `[cv; deck.js#L8]`. What others did: "The Ring frames were recorded by the
  doorbell camera itself." No collaborators are named in any source.
- Status and next: "Hand-built. Next: a custom PCB, battery-safety testing and IR eye-safety
  testing, in that order." `[deck.js#L581]` Next: Low-cost prosthetic arm.
- Framing checks: never "all formats under $100"; never imply eye-safety certification; no patent
  claim (none exists `[deck.js#L504]`); never quote the ethics essay.

### 7.2 Low-cost prosthetic arm (`/work/prosthetic-arm`)

- Hero: dark plate; `pa-01 arm-ghosted` (641×468, luminance-keyed) centred in 960×600. Caption:
  "Render of the whole arm: servo stack, gears and board visible through the translucent forearm."
  `[brief p10]`. h1 "Low-cost prosthetic arm". Lead: "A 3D-printable lower-arm prosthetic, hand and
  forearm, built from off-the-shelf parts, driven by servos through tendon-style cords, controlled
  by a myoelectric sensor, and sized to the wearer from hand measurements." `[brief p5, p7, p8,
  p9, p12]`
- Spec sheet:
  - My role: "Research assistant, Stevens Institute of Technology, summer 2024, under faculty
    supervision; continued through Avenues' Mastery Program." `[cv; root]`
  - When: "Summer 2024, then continued." `[cv]`
  - With: "Stevens Institute of Technology, faculty-supervised." `[cv]`
  - Status: "Working build. Controls and size automation are still being refined." (TODO(alex):
    the drafts are the only source for remaining work; keep the sentence generic.)
  - Stack: "Off-the-shelf parts, mostly 3D-printed; servos; elastic and Kevlar cord; EMG sensor;
    Arduino." `[brief p5, p7, p8, p9]`
  - Awards: "None."
  - Prototypes: "90+.¹" `[cv]`
  - No cost row (TODO(alex): under $100 `[cv]` vs under $200 `[brief p5]`, target or measured BOM).
- Why: "Requirements first: off-the-shelf parts, most of them printable; modular, easy-to-assemble
  pieces; myoelectric control; more than 80% of common tasks; and, listed last and called the most
  important, a production cost ceiling. The goal is to show that a reliable prosthetic can be made
  at low cost with accessible materials while keeping the functions that matter." `[brief p5]`
  (">80% of common tasks" is a requirement, never a result.)
- How it works: `FingerLinkage`. Intro: "One elastic cord holds the finger open; a Kevlar cord from
  a servo in the forearm pulls it closed. Elastic runs outside the bend, Kevlar inside." `[brief
  p7]`. Inline SVG (viewBox 0 0 600 420): palm block, three phalanges (30/22/18 units) as `<g>`
  with `transform-origin` at their pins, elastic path dashed in `--muted`, Kevlar path solid in
  `--render-blue`; `<label>Servo travel</label>` `<input type="range" min=0 max=100>`; forward
  kinematics θ1 = 0.95t, θ2 = 1.15t, θ3 = 0.85t rad (chosen so a fist closes at t = 1; not a
  measured spec, stated in the caption as "illustrative"); `aria-valuetext` "Servo travel N
  percent". Beside it, at card size on a dark plate: `pa-06 finger-bent-annotated` with the brief's
  baked-in red/blue traces, caption "From the design brief: elastic (red) and Kevlar (blue) paths."
  `[brief p7]`
- Versions (ledger; three visible build stages `[brief p6, p14]`):
  | Tag | Tile | What changed | Measurement | Date |
  |---|---|---|---|---|
  | Finger prints | `pa-09 gray-hand-print` | PLA test prints of a finger, then an assembled gray printed hand. | six printed pieces and two pin rods per finger `[brief p7]` | date not recorded |
  | Parametric CAD | `pa-03 arm-cad-exploded` | Exploded parametric model on seven hand measurements across Digits 1–5. | 7 parameters `[brief p12]` | date not recorded |
  | Final build | `pa-02 arm-exploded-build` | White palm and glossy black forearm; hand, wrist collar and end plate print as separate segments. | 5 forearm subsystems `[brief p8]` | date not recorded |
  Beside the ledger: `pa-05 forearm-open` (card, dark plate, white halo masked) captioned "The
  forearm opened: servo stack, wiring, Arduino-style board." `[brief p8]`; and the seven-parameter
  hand redrawn as `HandParameters.svg` (hairlines, labels in the DOM as a `<dl>`).
- Results: "90+ prototypes.¹ The auto-sizing loop runs to 500 iterations and reports part mass per
  cell configuration.²" `[cv; brief p13]`. No audience or cost statistics (TODO(alex): citations for
  10M+, 180,000+, 3M+, 2.6M+, $5,000, $20,000, $0.5M, 5–15% access).
- What I did: "Designed and fabricated the arm; researched prosthetics design, construction, costs
  and the physics of human motion." `[cv]`. What others did: "Faculty supervision at Stevens; the
  EMG sensor and sample firmware shown in the brief are third-party boards and code." `[cv; brief p9]`
- Status and next: "Next steps from the brief: connect with mobile prosthetic outreach groups such
  as those run by the VA, snap-together interchangeable parts with remote 3D printing, and patient
  access in developing nations and low-income neighbourhoods. All are future work." `[brief p15]`
  Next: Robotics.
- Excluded: `[brief p1]` title hand (provenance), `[brief p9]` sensor photos, `[brief p11]` divider
  slide, `[brief p15]` stock photo, origin story (private).

### 7.3 Robotics (`/work/robotics`)

- Hero: light plate; `rb-02 monty-render-poster` (400×360) centred in 960×600. Caption: "Monty,
  Tritonics #17253: team CAD render, three-quarter view." `[deck-p13]`. h1 "Robotics, FIRST Tech
  Challenge". Lead: "I captain FIRST Tech Challenge team Tritonics #17253 and was electrical lead
  on #14712, where we won first in NYC and took the 2nd-place Think Award at the World
  Championship." `[cv; pf-03; slide-e]`
- Spec sheet:
  - My role: "Captain and operations lead, Tritonics #17253: team strategy, the electrical system,
    documentation and mentoring. Earlier electrical lead on #14712 and fabrication lead on
    Scorpion." `[cv; slide-e; pf-02; pf-03; pf-05]`
  - When: "Seasons not dated in any source. The only season named is FTC DECODE." `[deck-p1]`
    (TODO(alex): season years.)
  - With: "Two teams: #17253 Tritonics (Monti, Ball-Drive, Scorpion) and #14712 (Swerve Drive,
    Honu). Tritonics is 100% student-led, with no team mentors." `[pf-01…05; slide-e; deck-p3]`
  - Awards: rendered as records (see below).
  - Prototypes: "Five full robot iterations; 4 intake, 3 launcher and 2 transfer iterations in wood
    before metal.¹" `[ep-1; poster-f]` (team measurement)
- Filmstrip (`Filmstrip`, directly under the spec sheet, graft 5): five tiles 120 px tall on
  `--surface`, in role order, each a link to its anchor, captioned in 15 px: "Scorpion, #17253,
  fabrication lead" (`rb-10`, light) · "Swerve Drive, #14712, electrical lead" (`rb-06`) · "Honu,
  #14712, electrical lead" (`rb-09`) · "Ball-Drive, #17253, ops lead" (`rb-12`) · "Monti, #17253,
  captain" (`rb-08`). Horizontal scroll-snap row on phone.
- Why: "We prototype in wood and finish in metal. Every subsystem follows an 8-screw rule so it
  comes off in 45 seconds at most, and the CAD lives on parametric master sketches so one variable
  updates the whole design. I lead the electrical system, the documentation and the training that
  keeps the team going after its leaders graduate." `[ep-1; poster-f; slide-e; slide-c]`
- How it works: `DriveDiagram`. Intro: "Three drivetrains we have built or used. Move the pointer,
  or the slider, to steer." Top-down inline SVG (viewBox 0 0 600 600) of a chassis with four
  modules; a three-way `<fieldset>` of radio buttons "Swerve", "Ball-Drive", "Strafer"; Swerve
  rotates the four wheel modules to the pointer vector (or the "Drive direction" range input
  0–360°); Ball-Drive shows four ball modules with two roller axes and a velocity vector; Strafer
  shows fixed mecanum wheels with roller diagonals. Strokes `--muted`, moving parts
  `--render-blue`. On touch, the modules follow the last tap or the slider. Caption states the
  team's own comparison from the engineering portfolio: swerve fastest and most complex, not
  modular; ball drive high torque and speed, oversized, not modular; strafer modular and very
  simple. `[ep-1]`. The unsourced "30% more efficient" claim is not shown.
- Robots (h2 "Robots"; one `<section>` per robot in role order, each with an h2-styled h3, a plate
  at native size, a role line, one idea, awards as records with sources; team work written as "we"):
  1. Scorpion, #17253. Role: fabrication lead (the page also says "a robot that I designed"
     `[pf-05]`). Plate: `rb-10` (light). Idea: "A motor at the base of the scissor lift pushes the
     base beams together and the geometry drives the structure vertically." `[pf-05]` Beside it the
     scissor-lift line drawing `rb-11` (dark). Awards: Design Award; Innovate 2nd; Inspire 2nd;
     Design 3rd (TODO(alex): whether the two Design entries are one event or two). `[pf-05]`
  2. Swerve Drive, #14712. Role: electrical lead. Plate: `rb-06` (dark) plus module detail `rb-07`.
     Idea: "A working FTC-scale swerve drive, common in FRC and almost unseen in FTC, co-developed
     with another team; competed at NYC-FIRST's Robot-in-2-Days." `[pf-02; ep-1]` Awards: none
     listed.
  3. Honu, #14712. Role: electrical lead. Plate: `rb-09` (dark). Idea: "Belt-driven wheels for
     customisable wheel torque and a 3-axis intake for quick sample transfer." `[pf-03]` Awards:
     1st in NYC (advanced to Worlds); 2nd-place Think Award, FTC World Championship; Inspire 1st;
     Inspire 2nd, four times; Connect Award; Innovate Award. `[pf-03]`
  4. Ball-Drive, #17253. Role: ops lead / captain. Plate: `rb-12` (dark). Idea: "Four two-axis balls
     replace the wheels for more efficient, accurate positioning; designed on a master sketch so
     parts stay linked." `[pf-04]` Awards: none listed.
  5. Monti, #17253 (team documents spell it MONTY). Role: captain. Plate: `rb-08` (dark). Idea:
     "Modular by rule: few screws, each subsystem removable in 45 seconds; a three-ball sorting
     intake; a hooded flywheel launcher on a 1:1 dual-servo turret." `[ep-1; ep-2; ep-4]` Awards:
     Inspire 1st; Inspire 2nd; Innovate 1st (page states "season still ongoing") `[pf-01]`; DECODE
     season: Inspire 1st (Q3), Inspire 2nd (Q1), Inspire 3rd (Q9), Sustain Award (Super Qualifier 2)
     `[slide-e; poster-a; deck-p1]`.
- Versions ledger for the intake (h3 "Intake iterations", `[deck-p15]`, all team measurements):
  | Tag | Tile | What changed | Measurement | Date |
  |---|---|---|---|---|
  | V1 | `rb-13` | Flat ramp; random positioning; off-centre transfer. | 85% intake rate, 7 s intake to launcher | not recorded |
  | V2 | `rb-14` | Vectoring slots, dual rail control. | 97%, 5 s | not recorded |
  | V3 | `rb-15` | Centred transfer, rubber-band grip, jam mitigation. | 100%, 2 s | not recorded |
  Plus the wooden-plate prototype tile `rb-03` captioned "First iterations entirely in wooden
  plates, before metal." `[ep-1]`
- Results: "Launcher tuning: 200+ trials analysed in Vernier Graphical Analysis at 8 mm compression;
  regression v = d · 2.64 + 1013, 189 hits and 11 misses, correlation 0.9880 (team measurement).²"
  `[ep-4; poster-f; deck-p10]` rendered as a native `RegressionChart` SVG (scatter and fitted line
  from the equation; axis labels in the DOM), not a crop. "Localization: 98% AprilTag lock, 100%
  odometry availability, path deviation ±0.2 cm (team measurement).³" `[deck-p10]`. "After 50% of
  the team graduated we grew from 7 to 14 in one season and recruited a rookie class that was 67%
  female (team figures).⁴" `[slide-e; slide-f]`. Superlatives without a basis are omitted ("first
  fully modular", "30% more efficient", "4,000 teams surveyed", "10× faster").
- What I did: "Team strategy, the electrical system and operations as captain; electrical lead on
  #14712; fabrication lead on Scorpion; documentation and mentoring; trained rookies 1:1." `[cv;
  slide-e; deck-p17]`. What others did: "Robots and subsystems are the team's work. Autonomous
  pathing (PEREGRINE) and the micro-funding website are credited on the roster to teammates; I led
  the team that launched the site." `[slide-e; ep-6]`
- Status and next: "The DECODE season is under way; the Hydra model (cross-training, leadership
  redundancy, early rookie integration) is how the team outlasts its graduating leaders."
  `[slide-c; deck-p3]` Next: CeraPiper.
- Held behind TODO(alex), not rendered: "2x Worlds qualifier", "third in New York" with the rookie
  team, "80+ member club" (root only).

### 7.4 CeraPiper (`/work/cerapiper`)

- Hero: `HexPipe` SVG at 960 px on `--bg` (no plate ground: geometry sits on the page). Caption:
  "Drawn from the tool's primitives: hexagonal profile matching the die, rib increments, a
  perpendicular branch that carves a matching hex hole in the host, a plug-and-socket connector.
  No photograph of the system is cleared." `[README]`. h1 "CeraPiper". Lead: "I was a research
  intern on CeraPiper, a CAD tool for designing custom hollow ceramic pipes that assemble into
  structures which cool a space by evaporating water." `[README#about-the-project; cv]`
- Spec sheet:
  - My role: "Research intern, Cornell Tech x Technion, summer 2026: CAD and slicing software for a
    custom ceramic printer." `[cv]`
  - When: "Summer 2026." `[cv]`
  - With: "Matter of Tech Lab." `[README]` (TODO(alex): affiliation wording.)
  - Status: "The earlier CAM version was published at ACM SCF 2025 (Berman, Seiz, Roumen; I am
    not an author). Work on the CAD layer is written up in a paper currently under review."
    `[README; brief §CeraPiper]`
  - Stack: "Onshape FeatureScript; Python 3 and Flask; Arduino (C++); p5.js." `[README#prerequisites]`
  - Awards: "None."
  - No "What I built" row until Alex confirms (open question 1).
- Why: "Evaporative cooling with ceramics is a low-cost, energy-efficient alternative to air
  conditioning, but it lacked accessible design tools. The earlier interface was controllable but
  not designable: makers set extrusion parameters in isolation and could not compose the assembled
  object. CeraPiper turns each machine parameter into an editable design element, so the object,
  not the print sequence, is what you design." `[README#from-cam-to-cad]`
- How it works: `HexProfile` plus the CAM-to-CAD table. Intro: "Every profile is hexagonal because
  the die is. The tool constrains what the machine can make: hard limits, corrections it applies
  for you, and advisories." Inline SVG of the hexagonal cross-section with inner hole;
  `<label>Outer diameter</label>` `<input type="range" min=40 max=78 step=1>` scales the hexagon
  (values in mm in the DOM, `aria-valuetext` "N millimetres"); a "Rotate 30°" button steps the
  profile in 30° increments; a "Span" toggle beyond 150 mm turns the drawn pipe's stroke to
  `--accent` with the DOM text "Unsupported span over 150 mm: sag advisory" (the one pink element
  in this viewport, and a truthful use of the tool's own red state). `[README#implementation]`
  Below it, the README's two-column reformulation as a real `<table>` with `<th scope>`: "Die
  aperture travel → outer diameter"; "Extrusion duration → length in mm"; "Instruction order →
  derived from how parts attach"; "Operator sag judgment → a 150 mm advisory". Then the
  three-layer architecture as `Architecture.svg` (Onshape FeatureScript → Python/Flask middleware
  compiling a JSON Function Stack → Arduino firmware; the paper blueprint as the physical layer),
  labels in the DOM. Then the blueprint strip `BlueprintStrip.svg` on `--paper`: a 20 cm-wide sheet
  with part name, cut marks at the bed limit (800 mm bed minus 60 mm start and end pieces), the
  mandrel size and a hex marker where a hole is hand-cut. `[README#the-paper-blueprint]`
- Versions (ledger, dates from `[README#roadmap]`; note under the table: "v1 to v2.0 predate my
  internship."):
  | Tag | What shipped | Date |
  |---|---|---|
  | v1 | Submission to ACM SCF 2025 | 17 July 2025 |
  | v1.1 | Revamped extrusion data structure; unsupported-segment detection; 3D curve visualisation (beta); segment editing; settings page; Arduino memory fixes | 8 August 2025 |
  | v2.0 | Fixes and features from user-study feedback; full editing from the Function Stack; becomes an in-app Onshape extension | 20 December 2025 |
  | v2.1 | Print order follows Onshape attachment order; about one API request per import | 8 July 2026 |
  | v2.2 | Interactive paper blueprint; Extrude action and per-bed tabs; branch pipes carve a matching hex hole; ribbed branch profiles | July 2026 |
- Results: "Constraints: outer diameter 40–78 mm; rotation in 30° increments; an 800 mm bed minus
  60 mm start and end pieces; a 150 mm unsupported-span advisory.¹" `[README#implementation]`.
  "Version 2.1 cut Onshape API requests to about one per import.²" `[README#roadmap]`. "The
  published CAM paper reports prototypes that raised relative humidity 8–10% and evaporated 1.85 L
  of water over 60 hours.³" (TODO(alex): confirm the numbers appear in the DOI'd paper before
  publishing this line.) No temperature figure (none exists). No study numbers from the paper
  under review.
- What I did: "CAD and slicing software for the custom ceramic printer, as a research intern."
  `[cv]`. What others did: "The README describes the system as one piece of lab work and
  attributes no component to any individual. I am not an author of the SCF 2025 paper." `[README]`
- Status and next: "Next steps in the README: a calipered test print to reconcile die-travel
  constants; tighter Onshape integration reusing native CAD commands; designing the global 3D form
  first, then applying primitives." `[README]` Next: AntiCam.
- Never: quote or reproduce the paper under review; call it published; use the résumé's "getting
  approved by SCF"; spell "Cera Piper".

### 7.5 Smaller pieces (on `/about#smaller-pieces`)

A `<dl>` with hairlines; one row each; no images except the Electric Road model photo at 200 px
(photo type, own ground, 2 px radius) and the concept render at 200 px (dark).

- Electric Road: "An individual Mastery project: a scaled model of a solar road that charges an
  electric vehicle wirelessly while it moves. I built a scaled testing model to demonstrate the
  idea." `[pf-06; cv]` Caption on the photo: "The scaled test model: hand-wound coils, receiver board,
  breadboard." No date, award or statistic exists.
- IDEA Club: "Co-founder and lead. The program has trained 70+ students in 3D CAD and printing,
  design thinking, rapid prototyping, fabrication and shop safety.⁵" `[cv]` (No image exists.)
- Outreach: "Weekly robotics sessions for younger students at Hudson Guild; 20+ Hour of Code
  workshops and a curriculum for lower-grade students; a school e-waste drive that collected 40+
  pounds, with a city-wide expansion planned.⁶" `[pf-07]` "I led the team that launched the FTC
  MicroFunding site." (the site itself is credited on the roster to a teammate `[slide-e]`). CAD
  tutorials in seven languages only if Alex supplies an artifact (TODO(alex)).
- Extended Memory (`#extended-memory`, term "Concept, not built"): "A wearable second memory, glasses
  or a hat for example, that recalls names, faces and moments only when needed." `[root]` Rendered
  only if Alex approves (open question 5).

---

## 8. About page

Text-led, no canvas, no motion. Content in columns 1–8 at 1440 (≤ 34rem prose measure); single
column at 390. Timeline and awards use tabular numerals.

1. **Title and bio.** h1 "About" (display). Three first-person paragraphs at body size: who I am
   (hardware builder; founder of Tully Tech; Avenues: The World School's Mastery Learning Program,
   class of 2026 `[cv]`); how I work (parametric CAD with master sketches; prototype in wood,
   finish in metal; iteration counted in versions and measured; cost ceilings as design
   constraints; limits stated unprompted `[poster-f; brief p5; deck.js#L525]`); what is next (USC
   Iovine and Young Academy, Arts, Technology and the Business of Innovation, fall 2026; TroyLabs
   BUILD, PM division; advanced robotics `[root]`, TODO(alex) confirm public). The influence is
   stated as one plain sentence about restraint rather than a name. No headshot: none exists
   (TODO(alex)); the text column simply starts at column 1.
2. **Timeline** (`#timeline`, h2). A `<dl>` with a 7ch tabular term column and hairlines; only rows
   with a public source:
   - 2021–2022 — Take the World Forward fellowship: Harvard College, MIT Solv[ED], Learn with Leaders `[cv]`
   - 2023 — NYU Tandon Cyber Security for Computer Science; wrote and presented a cybersecurity paper; won the hackathon `[cv]`
   - 7 June 2023 — AntiCam pin prototype tested against a live Ring doorbell camera at night `[cb-15]`
   - Summer 2024 — Research assistant, Stevens Institute of Technology: the prosthetic arm `[cv]`
   - Summer 2024 — Octura (Bank of America partner, NYC), selective internship: CLO models, market data, investor calls `[cv]`
   - 11 Feb to 6 May 2025 — AntiCam Mastery project: a working baseball-cap AntiCam plus circuit diagram `[mastery#page-3]`
   - Summer 2025 — New York University, AB Calculus `[cv]`
   - Summer 2026 — Research intern, CeraPiper, Cornell Tech x Technion `[cv]`
   - 2026 — Graduates Avenues, Mastery Learning Program `[cv]`
   - Fall 2026 — USC Iovine and Young Academy; TroyLabs BUILD, PM division `[root]`
   - FIRST Tech Challenge — one undated row: "Seasons not dated in any source: fabrication lead,
     then electrical lead on #14712, then ops lead and captain of Tritonics #17253." (TODO(alex))
3. **Awards** (`#awards`, h2). A list of records, each naming robot, team, role and source:
   - 2nd-place Think Award, FTC World Championship: Honu, #14712, electrical lead `[pf-03; cv]`
   - 1st place in NYC (advanced to Worlds): Honu, #14712, electrical lead `[pf-03]`
   - 2x NYC Champion, Inspire Award: led electrical design, documentation and mentoring `[cv]`
   - Honu, #14712: Inspire 1st; Inspire 2nd, four times; Connect Award; Innovate Award `[pf-03]`
   - Monti, #17253: Inspire 1st; Inspire 2nd; Innovate 1st (season ongoing when recorded) `[pf-01]`
   - Scorpion, #17253: Design Award; Innovate 2nd; Inspire 2nd; Design 3rd `[pf-05]`
   - FTC DECODE season, Tritonics #17253: Inspire 1st (Q3), 2nd (Q1), 3rd (Q9); Sustain Award (Super Qualifier 2) `[slide-e; poster-a; deck-p1]`
   - Hackathon win, NYU Tandon Cyber Security for CS, 2023 `[cv]`
   Held behind TODO(alex), not rendered: "2x Worlds qualifier", "third in New York", and every
   private-draft-only award (Hispanic Recognition Scholar, Entrepreneurship Award, Aviator Award,
   USC IYA Faculty Scholarship, NY State Championship).
4. **Tools** (h2). Three prose lines, not a grid: "CAD: SolidWorks, Fusion 360, Onshape, Blender."
   "Code: Python, Arduino and HTML (proficient); Java, C++ and C (intermediate); eight commercial
   websites coded." "Shop and electronics: 3D printers, laser cutters, shop tools; Raspberry Pi and
   Arduino sensors; wood, PLA, resin, acrylic, aluminum and composite plastics." `[cv]`
5. **Teaching and outreach** (h2). IDEA Club (70+ students `[cv]`); Hudson Guild weekly programs;
   20+ Hour of Code workshops; 40+ lb e-waste drive with the city-wide expansion stated as planned
   `[pf-07]`; rookie training on the robotics team, stage-based and 1:1 `[deck-p17]`; the team's
   micro-funding site as something the team I led launched `[slide-f; slide-e]`. The 70+ IDEA figure
   and the robotics training figure are never merged; "trained 50+ students in robotics" is root
   only and held behind TODO(alex).
6. **Smaller pieces** (`#smaller-pieces`) as in §7.5, then **Extended Memory** (`#extended-memory`)
   if approved.
7. **Contact block**: email, tullytech.com, résumé PDF (TODO). Then the shared footer with this
   page's Sources.

---

## 9. Contact

No contact page and no form. Contact appears in four places, all plain text links:

1. Masthead "Email" (`mailto:alexptully@gmail.com`) on every route; `tullytech.com` at ≥ 1024.
2. Contact band at the foot of home (§5.5): the name at display size, the email as the viewport's
   one pink underline, tullytech.com, the USC/BUILD line, "About me".
3. Footer of every route (§5.6): "Alexander Tully", email, tullytech.com, résumé PDF when it
   exists.
4. `/about` contact block.

Never rendered: phone number, home address, social links (none exist in any source; TODO(alex)).
The full name "Alexander Tully" appears exactly once per page, in the footer. Email links carry
`aria-label="Email Alex Tully"` only where the link text is "Email".

---

## 10. 3D moments

Rule: exactly one WebGL canvas on the entire site, on `/`, mounted only when `heroMode === "canvas"`.
No other route imports three.js. Every case-study moment is DOM/SVG.

### 10.1 Home hero: the AntiCam clip-on pin (`PinCanvas` + `PinScene`)

**Idea.** The pointer is the camera. As it approaches the pin's centre the nine emitters brighten,
pink light spills onto the plate and rim, a screen-space glare blooms over the array, and the key
light on the rest of the object dims (the sensor's auto-exposure failing), the same wash-out the
Ring frame shows. Matte materials, dim room lighting, long-lens perspective: product photography in
a dark room, so pink reads as emitted light.

**Files.** `src/components/three/PinCanvas.tsx` (client wrapper: `next/dynamic` `ssr:false`,
poster, pause, in-view and tab-visibility gating, frame-time guard, keyboard control; reuses the
`LabCanvas` patterns) and `src/components/three/PinScene.tsx` (scene). `src/components/three/
PinPoster.tsx` (inline SVG silhouette). Delete `LabCanvas.tsx`, `LabScene.tsx` and `/lab`.

**Canvas.** `<Canvas dpr={[1, 1.5]} frameloop="demand" gl={{ antialias: true, alpha: true,
powerPreference: "high-performance" }} camera={{ fov: 30, position: [0, 0, 4.2], near: 0.1, far: 20 }}
style={{ background: "transparent" }}>`; `gl.toneMapping = ACESFilmicToneMapping`. `invalidate()`
on pointer move, drift ticks, resize and pause toggles.

**Geometry and materials** (units: 1 = the pin's 42 mm width; all core three.js plus
`RoundedBoxGeometry` from `three/examples/jsm/geometries/RoundedBoxGeometry.js`, verified present
in three@0.186):

| Part | Geometry | Position | Material |
|---|---|---|---|
| body | `RoundedBoxGeometry(1.0, 1.0, 0.28, 6, 0.12)` | z 0 | `MeshStandardMaterial` color `#1C2230`, roughness 0.65, metalness 0.05 |
| rim | `RoundedBoxGeometry(1.06, 1.06, 0.10, 6, 0.14)` | z 0.12 | color `#0E1014`, roughness 0.9 |
| plate | `RoundedBoxGeometry(0.78, 0.78, 0.04, 4, 0.06)` | z 0.16 | color `#E6E7E9`, roughness 0.55 |
| module | `BoxGeometry(0.30, 0.30, 0.02)` | z 0.19 | color `#D9D6CC`, roughness 0.4 |
| emitters | `InstancedMesh(CylinderGeometry(0.028, 0.028, 0.012, 12), mat, 9)`; 3×3 grid, pitch 0.085 | z 0.205 | color `#3A0F1C`, emissive `#FF3B6F`, `emissiveIntensity` 0.5 → 2.7, `toneMapped: false`; `frustumCulled={false}`; matrices written once in `useLayoutEffect` with one reused `Object3D` |
| glare | `Sprite` with a 256² `CanvasTexture` radial gradient (`rgba(255,59,111,1)` centre → transparent at 0.5), `AdditiveBlending`, `depthWrite: false` | z 0.25 | scale 0.4 → 2.0, opacity 0.15 → 0.85 |

Lights: `HemisphereLight` sky `#C9D3E0` ground `#0B0E13` intensity 0.6; `DirectionalLight` (key)
`#FFF4E6` intensity 1.2 at [-2, 3, 4]; `PointLight` `#FF3B6F` intensity 0.2 → 1.8, distance 2.5,
decay 2, at [0, 0, 0.45]. No shadows, no environment map, no postprocessing. About 6 draw calls,
under 2,000 triangles, one 256² texture.

**Per frame** (`useFrame`, early-return when `paused`; all refs touched only here or in effects):
unproject `state.pointer` to the z = 0.2 plane → p; d = |p − pinCentre|; k = smoothstep(1.2, 0.15, d);
`emissiveIntensity = damp(cur, 0.5 + 2.2k, 6, dt)`; `pointLight.intensity = damp(cur, 0.2 + 1.6k, 6, dt)`;
`glare.scale = damp(cur, 0.4 + 1.6k, 6, dt)`, `glare.material.opacity = 0.15 + 0.7k`;
**exposure compensation** `keyLight.intensity = damp(cur, 1.2 − 0.5k, 4, dt)` (graft 12); group
`rotation.y = damp(cur, pointer.x × 0.22, 6, dt)`, `rotation.x = damp(cur, −pointer.y × 0.16, 6, dt)`.
Drift (touch device or no pointer input for 3 s, not reduced motion): virtual pointer =
(0.6 sin(t/1.4), 0.4 sin(t/2.3)), a `requestAnimationFrame` loop calling `invalidate()` while
drifting; any real input cancels it.

**Interaction.** Mouse: position drives brightness, spill, glare, key dimming and tilt; leaving the
canvas eases back to rest over about 1 s. Touch: `touch-action: pan-y` so vertical scroll passes
through; horizontal drag moves the virtual camera point; drift resumes after 3 s idle. Keyboard: a
visually-hidden-until-focused button inside the `<figure>`, "Move the camera with the arrow keys",
steps the virtual pointer by 0.1 per key; a visible "Pause" button (`aria-pressed`) freezes drift
and tilt (frameloop stays `demand`, one frame drawn). The canvas is `aria-hidden`; the caption
carries the meaning.

**Reduced motion.** No drift, no tilt; one frame rendered in the lit state (k = 0.6); pointer moves
still update the light on demand with the same damped values, so nothing moves on its own; the
status text says so.

**No WebGL / context error / chunk not loaded / JS off.** `PinPoster`: an inline SVG of the same
silhouette (rounded square body, rim, white plate, 3×3 pink dots with one soft radial glow) filling
the same 4:3 box; caption changes to "Shown lit, as a camera would see it." The SSR HTML contains
no `<canvas>`; the LCP candidate is the h1 or the poster. `SceneErrorBoundary` keeps the poster if
context creation throws.

**Low-end guard.** The wrapper times the first three rendered frames (`performance.now()` deltas
inside `useFrame`); if all three exceed 24 ms it unmounts the scene and keeps the poster for the
session (graft 13). `PerformanceMonitor` from drei is not imported unless a device test shows it is
needed (`onDecline` → dpr 1).

**Mount/unmount.** The scene mounts after hydration via `next/dynamic` inside `PinCanvas`; the chunk
is requested only when `heroMode === "canvas"`, so `/work/*` and `/about` never load three.js.
`paused = reduceMotion || userPaused || !inView(160px margin) || !tabVisible || guardTripped`;
the drift loop stops when paused. Imperative objects (`Object3D`, `CanvasTexture`) are disposed in
effect cleanup. The canvas fades in over the poster in 300 ms once the first frame is drawn.

**Perf budget.** Lazy chunk (three core + fiber + RoundedBoxGeometry + scene) ≤ 240 kB gzip
(baseline measured 231–236 kB), loaded after hydration on `/` only; zero drei imports. ≤ 8 draw
calls, ≤ 2,500 triangles, dpr ≤ 1.5, no shadow maps, no render targets. Target 60 fps on an M1 Air,
≥ 30 fps on a mid-range Android at 1.5× dpr; idle GPU cost zero (`demand` frameloop). Home eager JS
stays near the 181 kB gzip baseline because `motion/react` is not imported on home (in-view and
visibility use a small `useSyncExternalStore`-based hook or `IntersectionObserver` directly).

**Lint constraints** (eslint-config-next 16, React Compiler rules as errors): no `ref.current` in
render; `useMemo(() => new THREE.Object3D(), [])` inline arrow; no `Math.random`/`Date.now()` in
render; matrices and uniforms written in `useLayoutEffect`/`useFrame`; `usePrefersReducedMotion`
via `useSyncExternalStore`, never motion's `useReducedMotion`.

**Promotion criteria** (photo mode → canvas mode): seen on a real M1 Air and a mid-range Android;
the pin reads as a product not a toy (material roughness, key/hemisphere balance, glare falloff
tuned); frame-time guard never trips on the Android at dpr 1.5; Alex approves. Until then the hero
ships the V1 photograph.

### 10.2 CeraPiper (no canvas)

Dropped from WebGL by decision. Hero is `HexPipe.svg`; the moment is `HexProfile` (§7.4). If a
scroll-driven "print" is ever revisited, use a per-vertex order attribute with a fragment `discard`
or a hand-indexed tube geometry, never `setDrawRange` on a stock `ExtrudeGeometry` (its side walls
are indexed contour-outer / steps-inner and reveal a longitudinal strip, verified in
`node_modules/three/src/geometries/ExtrudeGeometry.js`).

### 10.3 Non-WebGL moments (summary; details in §7)

| Route | Component | Driver | Reduced motion |
|---|---|---|---|
| `/work/anticam` | `RingCompare` | `<input type="range">` → `clip-path` | identical (user-driven) |
| `/work/prosthetic-arm` | `FingerLinkage` | `<input type="range">` "Servo travel" → SVG group rotations, 40 lines of FK | instant, no easing |
| `/work/robotics` | `DriveDiagram` | pointer vector or `<input type="range">` "Drive direction"; radio toggle | instant |
| `/work/cerapiper` | `HexProfile` | `<input type="range">` "Outer diameter"; "Rotate 30°" button; span toggle | instant |

---

## 11. Motion rules

1. One authored moment on the whole site: the pin canvas on home, and only in canvas mode. It
   demonstrates the product's mechanism; nothing animates because it exists.
2. Every other interactive element answers the user: sliders, toggles and radio groups change SVG
   state in 150–300 ms `cubic-bezier(0.16, 1, 0.3, 1)`; exits faster than entrances.
3. No scroll reveals, no `whileInView`, no stagger, no fade-in per section, no hover lift or zoom on
   plates, no parallax, no auto-rotation, no custom cursor, no preloader, no sticky pinned headings.
   The `Reveal` component from `/lab` is deleted, not reused.
4. Allowed supporting motion: link underline 150 ms; Pause button state 120 ms; range thumb scale
   1.1 on `:active` 100 ms; canvas fade-in over the poster 300 ms once.
5. Route continuity: `ViewTransition` on the plate image only (`plate-${slug}`), 300 ms, with
   `default="none"` so nothing else animates. Progressive enhancement; layout never depends on it.
6. Reduced motion (`usePrefersReducedMotion`, live, hydration-safe): canvas renders one lit static
   frame with drift and tilt off; sliders and toggles still respond but without easing; view
   transitions get `animation-duration: 0s !important` via the CSS block from tech-notes (a).9;
   underline transitions are kept (opacity/colour, not movement).
7. Any autonomous loop stops when its canvas is 160 px off screen or the tab is hidden; there is
   only one such loop (the drift) and it exists only on home in canvas mode.
8. `motion/react` is not imported on any launch route. If it is ever needed, use `LazyMotion` +
   `m.*` with `domAnimation` and mount `MotionConfig reducedMotion="user"` once.
9. CSS `scroll-behavior` stays `auto`; anchor links jump. (If smooth scrolling is ever added, set
   `data-scroll-behavior="smooth"` on `<html>` per Next 16.)
10. Print: `@media print` hides the canvas and controls, shows SVG posters, sets `--bg` to white and
    `--ink` to black, keeps plates' light grounds, prints Sources.

---

## 12. Image plan

### 12.1 Pipeline

- Script: `scripts/images/build.mjs` (Node + sharp, run with `node scripts/images/build.mjs`), reading
  `scripts/images/manifest.json` (the table below as data) and writing to `public/images/<slug>/`.
  Outputs: `<id>.jpg` (quality 90, the static-import source) plus sharp-generated `<id>.avif` and
  `<id>.webp` for reference; Next's optimizer serves AVIF/WebP at request time from the jpg
  (`images.formats: ["image/avif", "image/webp"]`, `images.qualities: [60, 75, 90]` already in
  `next.config.ts`). Plates request `quality={75}`; hero plates `quality={90}`.
- Rule one: **never scale a crop past its native pixel width.** Each `ImageRef` records `width` and
  `height`; the `Plate` component sets `max-width: min(100%, ${width}px)` and a `sizes` attribute
  equal to the plate's CSS width so no srcset entry exceeds native.
- Ground handling by `ground`:
  - `dark`: the crop's border median is near-black. Luminance-key with sharp (threshold 8/255,
    6 px feather) to transparent PNG, then composite onto `#0B0E13` and export; the crop edge
    vanishes on the page. Check that no dark part of the object was eaten (the prosthetic renders
    have glossy black parts: use threshold 6 and inspect).
  - `light`: the crop's border median is white or light gray. Level the crop so the border median
    becomes `#E6E7E9` (sharp `linear(a, b)` on luminance, or `modulate`), so every light plate shares
    one tone; the plate ground is `--plate-light`; no border.
  - `photo`: a photograph that keeps its own ground (Ring frames, Electric Road model, test
    photos): no key, no levelling; 2 px radius; sits on `--bg` inside the plate.
- Sample the ground with `sharp(...).extract(border).stats()` and record the median in the manifest
  so the choice is data, not eyeballing.
- Static imports for `width`, `height` and `blurDataURL`: `import v1 from "../../public/images/anticam/ac-01-v1-led-face.jpg"`.
- Nothing ships without `cleared: true`; flagged items below.

### 12.2 Table

Crop boxes are estimates in source pixels (left, top, width, height) from the shortlist; the
developer running the pipeline verifies each against the page image and adjusts by a few pixels.
Output width = native crop width unless noted (downscale only).

| output id | slug | source path | crop (l, t, w, h) | out w | usage | alt text |
|---|---|---|---|---|---|---|
| ac-01-v1-led-face | anticam | content/source/anticam/camera-blinder-presentation/pages/page-12.jpg | 690, 15, 500, 475 | 500 | home hero (photo mode), case hero; light | AntiCam V1 pin seen from the emitter side: a white plate with a 3-by-3 grid of emitters glowing magenta, inside a textured black rim and maroon body |
| ac-02-v1-lid-side | anticam | …/page-12.jpg | 180, 540, 490, 380 | 490 | contact sheet "Final V1"; light | AntiCam V1 pin from the lid side: a blue lid with the Tully Tech mark engraved, black rim, maroon body |
| ac-03-test2-glow | anticam | …/page-09.jpg | 175, 310, 520, 525 | 520 | AntiCam lab note; compare fallback; photo | A lit COB LED module photographed by a phone: a bright white square in a wide magenta halo on a dark wall |
| ac-04-ring-on | anticam | …/page-15.jpg | 125, 325, 1020, 575 | 960 | home diptych (lower), case compare; photo; cleared: false | Ring doorbell night-vision frame, 7 June 2023: a street at night, a figure on the steps washed out to a glowing orb where the face would be |
| ac-05-ring-off | anticam | …/page-16.jpg | 400, 190, 888, 500 | 888 | home diptych (upper), case compare; photo; cleared: false | The same street from the same Ring doorbell in colour night mode, device off: parked cars, a lit tree, no glow |
| ac-06-v2-colorways | anticam | …/page-15.jpg | 530, 50, 690, 240 | 690 | home AntiCam plate fallback; contact sheet "Final V2"; light | Three AntiCam V2 pins side by side: white, dark gray and navy, each with a clear top showing the emitter module |
| ac-07-v2-flatlay | anticam | …/page-13.jpg | 35, 340, 620, 460 | 620 | ledger V4 tile, contact sheet, canvas reference; light | Six clear laser-cut acrylic plates for the AntiCam V2 pin laid flat: the LED plate with its module, a plate with four coin cells and a slide switch, spacer plates and the engraved lid |
| ac-08-cob-module-hand | anticam | …/page-14.jpg | 760, 150, 300, 300 | 300 | AntiCam "How it works" card; photo | A hand holding the 10 W-class COB LED module: white ceramic body, 3-by-3 emitter grid, metal solder tabs |
| ac-09-mdf-laser-bed | anticam | …/page-10.jpg | 435, 340, 715, 505 | 715 | ledger V2 tile, contact sheet; photo | Laser-cut MDF plates for the second prototype on the laser bed, Tully Tech engraved |
| ac-10-laser-engraving | anticam | …/page-10.jpg | 650, 30, 520, 285 | 520 | AntiCam process card; photo | A laser cutter head engraving the Tully Tech mark through blue masking tape |
| ac-11-nine-cell-plate | anticam | …/page-11.jpg | 890, 225, 360, 345 | 360 | ledger V3 tile, contact sheet; photo | A clear acrylic plate carrying nine coin cells joined by solder links and wire |
| ac-12-copper-tape-plate | anticam | …/page-11.jpg | 555, 65, 325, 270 | 325 | contact sheet; photo | A battery plate with coin cells, copper-tape bus bars and soldered leads |
| ac-13-v1-first-carrier | anticam | …/page-08.jpg | 375, 620, 265, 240 | 265 | ledger V1 tile, contact sheet "First prototype"; photo | The first prototype: a navy laser-cut disc with the white COB module seated in a cross-shaped cutout |
| ac-14-cap-brim | anticam | …/page-17.jpg | 470, 470, 300, 365 | 300 | contact sheet "Cap V2"; photo; cleared: false (TODO(alex): confirm real prototype) | The underside of a black cap brim with about six small LEDs set into a reflective lining |
| ac-15-v2-parts-angled | anticam | …/page-14.jpg | 110, 260, 470, 295 | 470 | AntiCam process card; light | The V2 clear acrylic parts laid out at an angle: cells and switch plate, LED plate, cutout plates, engraved lid |
| ac-16-light-test | anticam | …/page-07.jpg | 65, 255, 1135, 630 → resize 160 | 160 | contact sheet "Light test" tile only; photo (blurry; omit if it reads as noise) | Out-of-focus alligator-clip leads on a wooden bench during the first light test |
| pa-01-arm-ghosted | prosthetic-arm | content/source/prosthetic-arm/design-brief/pages/page-10.jpg | 690, 246, 641, 468 | 641 | home plate, case hero; dark (keyed) | Render of the prosthetic arm with a translucent forearm: a stack of servos, gears and a circuit board visible inside, white fingers above |
| pa-02-arm-exploded-build | prosthetic-arm | …/page-14.jpg | 115, 225, 1244, 509 | 960 | ledger "Final build" tile, process plate; light (levelled) | The physical arm exploded on a light gray tray: white printed palm and fingers, glossy black forearm and wrist collar, loose knuckle caps and pins |
| pa-03-arm-cad-exploded | prosthetic-arm | …/page-12.jpg | 69, 239, 860, 502 | 860 | ledger "Parametric CAD" tile, process; dark | Exploded parametric CAD of the arm with construction sketches, datum lines and constraint points |
| pa-04-arm-profile | prosthetic-arm | …/page-08.jpg | 0, 537, 841, 222 | 841 | case process band, flush left in its plate; dark | Profile render of the finished arm: glossy black conical forearm and five white printed fingers extended flat |
| pa-05-forearm-open | prosthetic-arm | …/page-08.jpg | 1037, 48, 274, 700 | 274 | case card; photo (mask the residual white halo) | The physical forearm standing upright with its shell opened: stacked black servos, red and black wiring, a green Arduino-style board, the white hand on top |
| pa-06-finger-bent-annotated | prosthetic-arm | …/page-07.jpg | 1040, 340, 330, 270 | 330 | "How it works" card; dark; annotations kept | A bent printed finger with the elastic cord path traced in red outside the bend and the Kevlar cord path in blue inside |
| pa-07-finger-exploded-strip | prosthetic-arm | …/page-07.jpg | 60, 570, 700, 180 | 700 | ledger "Finger prints" alt tile; dark | Six printed finger pieces and two pin rods laid in a row |
| pa-09-gray-hand-print | prosthetic-arm | …/page-06.jpg | 1104, 125, 241, 342 | 241 | ledger "Finger prints" tile; dark | An assembled gray 3D-printed hand, back view, fingers extended, print lines visible |
| pa-10-hand-back-black | prosthetic-arm | …/page-10.jpg | 100, 205, 510, 535 | 510 | case process; dark | The finished black printed hand seen from the back, five segmented fingers |
| rb-01-monty-render-white | robotics | content/source/robotics/tritonics-portfolio/nyc-champs-portfolio-1.png | 380, 250, 450, 370 | 450 | home plate; light | Team CAD render of Monty: blue and silver chassis with Voronoi-cut side plates and a turreted launcher on top |
| rb-02-monty-render-poster | robotics | content/source/robotics/posters/poster-deck/pages/page-13.jpg | 135, 540, 400, 360 | 400 | case hero; light (levelled) | Team CAD render of Monty from the front three-quarter, intake rollers at the front, turret above |
| rb-03-wooden-prototype | robotics | …/nyc-champs-portfolio-1.png | 55, 265, 195, 160 | 195 | intake ledger tile; photo | A first-iteration robot built entirely from wooden plates, blue subsystem parts fitted |
| rb-04-transfer-render | robotics | …/nyc-champs-portfolio-3.png | 380, 300, 320, 360 | 320 | Monti section card; light | Render of the transfer: three purple artifacts in a silver Voronoi frame with a tubing roller |
| rb-05-launcher-render | robotics | …/nyc-champs-portfolio-4.png | 370, 330, 340, 390 | 340 | Monti section card; light | Render of the launcher: blue turret ring, adjustable hood and a weighted flywheel |
| rb-06-swerve-chassis | robotics | content/source/portfolio/02-swerve-drive.jpg | 550, 55, 400, 285 | 400 | filmstrip, Swerve section plate; dark | Swerve drive chassis: four corner modules with toothed belts and bevel gears on a silver frame |
| rb-07-swerve-module | robotics | …/02-swerve-drive.jpg | 345, 345, 230, 200 | 230 | Swerve section card; dark | One swerve module: a wheel under a belt-driven steering plate with its motor |
| rb-08-monti-portfolio-render | robotics | …/01-monti-robot.jpg | 665, 5, 295, 240 | 295 | filmstrip, Monti section plate; dark | Monti render: blue Voronoi side plates and a turreted launcher |
| rb-09-honu-render | robotics | …/03-honu-robot.jpg | 650, 10, 270, 235 | 270 | filmstrip, Honu section plate; dark | Honu: a green lattice chassis with a lift tower and gripper head |
| rb-10-scorpion-render | robotics | …/05-scorpion-robot.jpg | 632, 32, 258, 210 | 258 | filmstrip, Scorpion section plate; light (rendered on white) | Scorpion on mecanum wheels with its scissor lift raised |
| rb-11-scorpion-lift-drawing | robotics | …/05-scorpion-robot.jpg | 525, 340, 200, 170 | 200 | Scorpion section card; dark | Line drawing of the scissor lift: crossed beams with a motor at the base |
| rb-12-ball-drive | robotics | …/04-ball-drive.jpg | 565, 15, 390, 220 | 390 | filmstrip, Ball-Drive section plate; dark | Ball-Drive chassis: four ball modules in a blue frame engraved 17253 Tritonics |
| rb-13-intake-v1 | robotics | content/source/robotics/posters/poster-deck/pages/page-15.jpg | 700, 540, 160, 120 | 160 | intake ledger V1 tile; light | Gray flat-ramp intake plate, version 1 |
| rb-14-intake-v2 | robotics | …/page-15.jpg | 700, 680, 160, 140 | 160 | intake ledger V2 tile; light | Light-blue intake ramp with three vectoring slots, version 2 |
| rb-15-intake-v3 | robotics | …/page-15.jpg | 700, 820, 160, 140 | 160 | intake ledger V3 tile; light | Dark-blue intake ramp with a centred U-shaped transfer port, version 3 |
| rb-16-intake-three | robotics | …/nyc-champs-portfolio-2.png | 60, 208, 255, 157 | 255 | Monti section card; light | The sorting intake holding three artifacts, one green and two purple |
| er-01-electric-road-model | about | content/source/portfolio/06-electric-road.jpg | 605, 205, 325, 150 | 325 (display 200) | smaller pieces; photo | The scaled Electric Road test model: hand-wound copper coils on a blue mat, a green receiver board and a breadboard |
| er-02-electric-road-render | about | …/06-electric-road.jpg | 595, 5, 320, 195 | 320 (display 200) | smaller pieces; dark | Concept render: a gray road with a purple car and roadside pillars topped with solar panels carrying coil disks |
| ou-01-ewaste | about | …/07-community-events.jpg | 800, 255, 110, 235 | 110 | not used until a higher-resolution original and clearance exist; cleared: false | Alex crouching beside black e-waste collection bins |
| og-home | root | authored from ac-01 on a light plate with the name set in Host Grotesk | — | 1200×630 | `app/opengraph-image.jpg` | (OG images carry no alt) |

Authored SVGs (in `src/components/svg/`, geometry only, 1.25 px hairlines, labels in the DOM):
`HexPipe.tsx` (home plate and CeraPiper hero), `HexProfile.tsx` (interactive), `Architecture.tsx`,
`BlueprintStrip.tsx`, `HandParameters.tsx` (seven-parameter hand), `FingerLinkage.tsx`,
`DriveDiagram.tsx`, `RegressionChart.tsx` (scatter and fitted line from v = d·2.64 + 1013; the
200 trials are drawn as a schematic distribution and labelled "schematic; the fitted line is the
team's regression"), `PinPoster.tsx`.

Excluded from publication: minors' faces (Hudson Guild, Hour of Code), teammate and expert
headshots, third-party logos (FIRST, DECODE, Stevens, Microsoft, Simons Foundation, NASA, NYU,
USC), the Clearbot boat, vendor photos, `[brief p1]`, `[brief p9]`, `[brief p11]`, `[brief p15]`,
every page of the paper under review, the ethics essay pages, `[cb-01]`, `[cb-18]`, the résumé
images, the Room Unit photo `[cb-02]` until Alex confirms what it is.

TODO(alex) asks that remove the constraint: ten 2400 px re-renders on black from the existing CAD
files (Monti, Swerve, Honu, Ball-Drive, Scorpion, AntiCam V2 pin and cap, the arm), the five
CeraPiper README figures, the missing AntiCam deck `assets/` cut-outs, 8-second phone videos of the
finger curling and the array powering on. The plate system then simply holds larger images.

---

## 13. Responsive rules

- Mobile-first Tailwind v4; breakpoints base, `sm` 640, `md` 768, `lg` 1024, `xl` 1280. Design
  widths 390 and 1440; test at 320, 390, 768, 1024, 1280, 1440, 1920 (the container stops at 1200,
  so 1920 gains only gutter).
- Container 1200 max; gutters 16 / 24 / 48 px; 12-column grid exists at `lg`+ only.
- Masthead: one row at every width; `tullytech.com` hidden below `lg`; hit areas 44 px.
- Hero: stacked below `lg` (text, index, plate, caption, controls); at `lg`+ text columns 1–5,
  object 6–12, min-height 640. Phone plate 358 px wide at 4:3 (269 px), capped at 60vh.
- Lineup rows: stacked below `md` (plate, title, sentence, mini `<dl>`); at `md`+ plate columns
  1–6 and text 7–12 aligned to the plate top; the rule spans the container. Diptych frames scale
  with the plate (358×201 each on phone).
- Spec sheet `<dl>`: terms above values below `md`; two columns (4 / 8) at `md`+.
- Case-study hero plate: full content width at every size, 16:10, image at
  `min(100%, native px)`.
- Version ledger: `<table>` at `md`+; stacked `<dl>` rows below `md` (each row: tag, tile, text,
  measurement, date). Tiles 160 px at `md`+, 104 px (three per row) below.
- Filmstrip: five tiles in a row at `md`+; horizontal `scroll-snap-type: x mandatory` row with 120
  px tiles and a themed hairline scrollbar below `md`.
- Contact sheets: `grid-template-columns: repeat(auto-fill, 160px)` at `md`+, `repeat(3, 1fr)`
  below.
- Interactive SVGs: width-fluid `viewBox` SVGs; range thumbs 20 px with a 44 px hit area; labels
  above the control on phone, beside it on desktop.
- `sizes` attributes: lineup plates `(max-width: 768px) calc(100vw - 32px), (max-width: 1024px)
  50vw, 580px`; case hero plates `(max-width: 1024px) calc(100vw - 48px), 960px`; tiles `160px`.
- Type: the clamp scale in §3.2; body fixed per breakpoint; measure never above 34rem; headings
  `text-wrap: balance`.
- No horizontal page scroll at 320 px: plates are `max-width: 100%`; long spec values wrap; the
  robotics role line is allowed three lines at 390.
- Anchor targets carry `scroll-margin-top: 72px`.
- `100svh` for anything that must fit a phone viewport (nothing on the launch site requires it).

---

## 14. Accessibility and SEO

Accessibility
- Landmarks: `<header>`, `<nav aria-label="Site">`, `<nav aria-label="Featured work">` (hero
  index), `<main id="content">`, `<footer>`; skip link first in DOM.
- One `<h1>` per page (home: the sentence; case studies: the product name; about: "About").
  Lineup titles are `<h2>` inside `<article>`; case-study sections are `<h2>`; robots are `<h3>`
  styled at the title scale.
- Lineup rows: the `<h2><a>` is a stretched link (`a::after { position: absolute; inset: 0 }` on a
  relatively positioned article) so the accessible name is the title; the plate image has its own
  alt; the mini `<dl>` is not inside the link.
- Spec sheets, mini `<dl>`s, timelines and "Now and next" are real `<dl>` elements; the CAM-to-CAD
  block is a `<table>` with `<th scope="col">`; ledgers are `<table>` with a `<caption>`.
- Focus: `:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px }` everywhere,
  never removed; 5.62:1 on `--bg`.
- Colour never the only cue: links underlined on hover and focus and the active nav item also has
  `aria-current`; slider states have text labels and `aria-valuetext`; the CeraPiper span advisory
  also prints its sentence; the LED state is described in the caption.
- Canvas `aria-hidden="true"`; visible Pause button with `aria-pressed`; a focusable keyboard
  control for the virtual camera; a `role="status"` line stating Animating / Paused / Reduced
  motion, whose SSR text matches the client's first render.
- Native `<input type="range">` with a visible `<label>` and `aria-valuetext` in plain words for
  every moment. SVG diagrams have `role="img"` plus `<title>` and `<desc>`; interactive SVGs keep
  their meaning in the adjacent DOM (labels, values, captions).
- Every image has alt text describing the object and its state (table in §12.2), never the slide.
  Decorative posters are `aria-hidden`.
- Footnote markers: `<sup><a href="#src-3" aria-describedby="src-3">3</a></sup>`; Sources items
  have matching ids and a "back to text" link.
- Reduced motion handled per §11; view transitions zeroed by CSS.
- `color-scheme: dark`; selection and caret themed; touch targets ≥ 44 px; text zoom to 200%
  verified (rem everywhere, no fixed-height text boxes).
- Headings and DOM order match the visual order at every breakpoint (plate-then-text in DOM;
  desktop placement by grid columns).
- `<html lang="en">`; dates written as day month year in words where they appear in prose.
- Test plan: keyboard only; VoiceOver on iOS Safari; NVDA on Windows; 200% zoom; forced-colours
  mode (outlines survive).

SEO and metadata
- `src/app/layout.tsx`: `metadata` with `title.template: "%s | Alex Tully"`, `title.default: "Alex
  Tully: hardware founder and product designer"`, `description` (one sentence from the h1),
  `metadataBase` (TODO(alex): final domain), `openGraph` and `twitter` cards, `robots: index,
  follow`.
- Per route `generateMetadata` from `projects.ts`: title = product name, description = `oneLine`.
- `app/opengraph-image.jpg` (authored 1200×630) at the root; `app/work/[slug]/opengraph-image.tsx`
  with `ImageResponse` (flexbox only): the hero image on its plate ground with the product name.
- `app/sitemap.ts` listing `/`, `/about`, the four `/work/*` routes; `app/robots.ts` allowing all
  and pointing at the sitemap. `/lab` removed.
- JSON-LD `Person` on home (name, url, email, `sameAs` empty until social links exist) and
  `CreativeWork` on each case study; injected as a `<script type="application/ld+json">` from a
  server component.
- `app/favicon.ico` replaced with a Tully Tech mark only if Alex supplies a cleared asset;
  otherwise a plain "AT" letterform SVG favicon (`app/icon.svg`).
- Fonts self-hosted by `next/font/google` at build; verify `adjustFontFallback` against Arial so
  spec sheets do not reflow when the woff2 arrives (test with the font blocked).
- Route segments: `/work/[slug]/page.tsx` exports `generateStaticParams` and
  `dynamicParams = false`; `params` awaited (Promise in Next 16); `PageProps<"/work/[slug]">` global
  type helper.

---

## 15. Components inventory

All in `src/components/` unless noted. Server components by default; `"use client"` only where
marked.

| Component | File | Props | Used on |
|---|---|---|---|
| `Masthead` | `layout/Masthead.tsx` | `current: Route` | every route |
| `SkipLink` | `layout/SkipLink.tsx` | — | every route (in layout) |
| `Container` | `layout/Container.tsx` | `as?, className?, children` | every route |
| `Footer` | `layout/Footer.tsx` | `sources: Source[]; resumePdf?: string` | every route |
| `ContactBand` | `home/ContactBand.tsx` | `name, email, site, line, aboutHref` | home |
| `Hero` | `home/Hero.tsx` | `mode: "photo" \| "canvas"; h1; roleLine; index: IndexItem[]; photo: ImageRef` | home |
| `WorkIndex` | `home/WorkIndex.tsx` | `items: { title, description, href }[]` | home (inside Hero) |
| `LineupRow` | `home/LineupRow.tsx` | `project: Project; footnote: number` | home ×4 |
| `Diptych` | `media/Diptych.tsx` | `a: ImageRef; b: ImageRef; fallback: ImageRef; caption` | home AntiCam row |
| `Plate` | `media/Plate.tsx` | `image: ImageRef; aspect: "4/3" \| "16/10"; quality?: 75 \| 90; sizes: string; transitionName?: string; priority?: boolean` | home, case studies, about |
| `PlateTransition` (client) | `media/PlateTransition.tsx` | `name: string; children` | wraps `Plate` images that travel |
| `Caption` | `media/Caption.tsx` | `text; date?; source: Source` | under every plate and tile |
| `ContactSheet` | `media/ContactSheet.tsx` | `tiles: { image: ImageRef; label: string }[]` | anticam, prosthetic-arm |
| `Filmstrip` | `media/Filmstrip.tsx` | `tiles: { image: ImageRef; label; href }[]` | robotics |
| `MiniSpec` | `content/MiniSpec.tsx` | `role: string; proof: Stat` | home lineup rows |
| `SpecSheet` | `content/SpecSheet.tsx` | `rows: SpecRow[]` | case studies |
| `Stat` | `content/Stat.tsx` | `stat: Stat; index: number` | anywhere a figure appears |
| `Footnotes` / `Sources` | `content/Sources.tsx` | `sources: Source[]` | footer of every route |
| `VersionLedger` | `content/VersionLedger.tsx` | `caption: string; rows: Version[]` | case studies |
| `AwardsList` | `content/AwardsList.tsx` | `awards: Award[] \| "none"` | robotics, about |
| `Timeline` | `content/Timeline.tsx` | `rows: { when: string; what: string; source: Source }[]` | about; "Now and next" on home |
| `TwoLists` | `content/TwoLists.tsx` | `left: { heading, items }; right: { heading, items }` | case studies (did / others) |
| `NextLink` | `content/NextLink.tsx` | `title: string; href: string` | case studies |
| `Prose` | `content/Prose.tsx` | `children` (body measure wrapper) | all |
| `CaseStudy` | `work/CaseStudy.tsx` | `project: Project` (composes the template §6) | `/work/[slug]` |
| `RobotSection` | `work/RobotSection.tsx` | `robot: Robot` | robotics |
| `RingCompare` (client) | `moments/RingCompare.tsx` | `off: ImageRef; on: ImageRef; fallback: ImageRef` | anticam |
| `FingerLinkage` (client) | `moments/FingerLinkage.tsx` | `initial?: number` | prosthetic-arm |
| `DriveDiagram` (client) | `moments/DriveDiagram.tsx` | `modes: ("swerve" \| "ball" \| "strafer")[]` | robotics |
| `HexProfile` (client) | `moments/HexProfile.tsx` | `min: 40; max: 78; step: 30` | cerapiper |
| `HexPipe` | `svg/HexPipe.tsx` | `width?: number` | home CeraPiper row, cerapiper hero |
| `Architecture`, `BlueprintStrip`, `HandParameters`, `RegressionChart` | `svg/*.tsx` | data props from `projects.ts` | cerapiper, prosthetic-arm, robotics |
| `PinCanvas` (client) | `three/PinCanvas.tsx` | `className?` | home (canvas mode) |
| `PinScene` (client, dynamic) | `three/PinScene.tsx` | `paused: boolean; reduceMotion: boolean; virtualPointer: Ref<Vector2>; onFrameTime(ms)` | inside `PinCanvas` |
| `PinPoster` | `three/PinPoster.tsx` | — | inside `PinCanvas`, print |
| `SceneErrorBoundary` | `three/SceneErrorBoundary.tsx` | `fallback; children` | inside `PinCanvas` |
| `usePrefersReducedMotion` | `motion/usePrefersReducedMotion.ts` | — | `PinCanvas`, moments |
| `useInViewport`, `usePageVisible` | `motion/useInViewport.ts`, `motion/usePageVisible.ts` | `ref, margin` / — (`useSyncExternalStore`) | `PinCanvas` |
| `JsonLd` | `seo/JsonLd.tsx` | `data: object` | home, case studies |

Remove: `components/three/LabCanvas.tsx`, `LabScene.tsx`, `components/motion/Reveal.tsx`,
`MotionProvider.tsx` (not needed without motion/react), `app/lab/`, `public/images/lab/`,
`components/ui/` (empty shadcn folder), the shadcn tokens in `globals.css`, `tw-animate-css`,
`lucide-react`, `class-variance-authority`, `tailwind-merge` if unused after the rebuild (keep
`clsx` and `lib/utils.ts`'s `cn` only if used).

---

## 16. Implementation plan

Ordered work packages. "After" lists dependencies; packages with the same tier can run in
parallel. File paths are repository-relative. Each package ends with `npm run lint`, `npx tsc
--noEmit` and `npm run build` passing.

**WP0 (first, blocks everything): design system and layout shell.**
Files: `src/app/globals.css` (replace shadcn tokens with §2 tokens, `@theme inline` mapping, base
styles, focus, selection, scrollbar, print stylesheet, view-transition reduced-motion block),
`src/app/layout.tsx` (Host Grotesk via `next/font/google` as `--font-host`; `<html lang="en"
class="…" style="color-scheme: dark">`; metadata defaults; skip link; `Masthead`; `Footer` slot),
`src/components/layout/{Masthead,SkipLink,Container,Footer}.tsx`, `src/components/content/
{Prose,Stat,Sources}.tsx`, `src/styles/type.css` (or Tailwind utilities for the §3.2 roles).
Repo cleanup: delete `src/app/lab/`, `src/components/three/Lab*.tsx`, `src/components/motion/
Reveal.tsx`, `MotionProvider.tsx`, `public/images/lab/`; remove `tw-animate-css` import; keep
`next.config.ts` as is. Acceptance: a blank page renders with the tokens, the font, the masthead and
the footer; lint and build pass.

**WP1 (tier 1, parallel with WP2, WP3): content file.**
Files: `src/content/types.ts` (§4.3), `src/content/projects.ts` (all four projects with every
fact, stat, source, caption, alt, `cleared` flags and `TODO(alex)` comments from §5–§7),
`src/content/about.ts` (bio, timeline, awards, tools, outreach, smaller pieces, Extended Memory
flag), `src/content/site.ts` (name, email, site URL, `heroMode`, `resumePdf?`, nav). Acceptance: a
unit-free type check; every `Stat` has a `source`; a script `scripts/check-content.mjs` fails the
build if any `ImageRef` used on a page has `cleared: false` without a fallback.

**WP2 (tier 1): image pipeline.**
Files: `scripts/images/manifest.json` (§12.2), `scripts/images/build.mjs` (sharp: extract, key or
level by `ground`, export jpg 90 + avif + webp, write `public/images/<slug>/<id>.jpg`, print the
sampled border medians), `public/images/{anticam,prosthetic-arm,robotics,about}/`. Acceptance: every
output exists at the declared native width; a contact-sheet HTML in the scratchpad for visual
inspection of the key threshold on the prosthetic renders; no output wider than its crop.

**WP3 (tier 1): authored SVGs.**
Files: `src/components/svg/{HexPipe,Architecture,BlueprintStrip,HandParameters,RegressionChart}.tsx`,
`src/components/three/PinPoster.tsx`. Geometry only, 1.25 px hairlines, `role="img"` with
`<title>`/`<desc>`, labels as DOM text via props. Acceptance: renders crisply at 358 and 960 px;
passes the impeccable detector (`sh .claude/skills/impeccable/scripts/impeccable detect --json
src/components/svg`).

**WP4 (tier 2, after WP0 + WP1 + WP2): home page.**
Files: `src/app/page.tsx`, `src/components/home/{Hero,WorkIndex,LineupRow,ContactBand}.tsx`,
`src/components/media/{Plate,PlateTransition,Caption,Diptych}.tsx`, `src/components/content/
{MiniSpec,Timeline}.tsx`, `src/components/seo/JsonLd.tsx`, `src/app/opengraph-image.jpg`.
Photo mode only; the `Hero` reserves the same 4:3 box for canvas mode. Acceptance: matches §5
wireframes at 390 and 1440; LCP is the h1 or the V1 photo; no CLS; stretched-link accessible
names verified.

**WP5 (tier 2, after WP0 + WP1 + WP2 + WP3): case-study template and pages.**
Files: `src/app/work/[slug]/page.tsx` (`generateStaticParams`, `dynamicParams = false`,
`generateMetadata`), `src/app/work/[slug]/opengraph-image.tsx`, `src/components/work/
{CaseStudy,RobotSection}.tsx`, `src/components/content/{SpecSheet,VersionLedger,AwardsList,
TwoLists,NextLink}.tsx`, `src/components/media/{ContactSheet,Filmstrip}.tsx`. Moments are
mounted through a `MomentSlot` that renders a static fallback until WP7 lands. Acceptance: all
four routes prerender; every figure has a footnote; "Awards: None" prints where declared; view
transition from a home row works in Chromium and degrades elsewhere.

**WP6 (tier 2, after WP0 + WP1 + WP2): about page.**
Files: `src/app/about/page.tsx`, reuse `Timeline`, `AwardsList`, `Plate`. Acceptance: §8 order;
anchors `#timeline #awards #smaller-pieces #extended-memory` with `scroll-margin-top`.

**WP7 (tier 2, after WP3; parallel with WP4–WP6): the four DOM/SVG moments.**
Files: `src/components/moments/{RingCompare,FingerLinkage,DriveDiagram,HexProfile}.tsx`,
`src/components/motion/usePrefersReducedMotion.ts` (kept). Acceptance: keyboard-operable range
inputs with `aria-valuetext`; reduced motion removes easing only; no `motion/react` import; each
component under 8 kB gzip.

**WP8 (tier 2, after WP0; parallel; does not block launch): the pin canvas.**
Files: `src/components/three/{PinCanvas,PinScene,SceneErrorBoundary}.tsx`,
`src/components/motion/{useInViewport,usePageVisible}.ts`. Build to §10.1; measure the lazy chunk
with the tech-notes (f) method (≤ 240 kB gzip); verify no three.js chunk is referenced by
`/work/*` or `/about` HTML. Ships behind `heroMode = "photo"`; the promotion checklist in §10.1
gates the flip.

**WP9 (last, after WP4–WP7): SEO, print, QA and launch checklist.**
Files: `src/app/sitemap.ts`, `src/app/robots.ts`, `src/app/icon.svg`, final `metadata`. Checks:
Lighthouse on `/` and `/work/anticam` (performance ≥ 95, accessibility 100); axe run; keyboard
pass; VoiceOver and NVDA pass; 200% zoom; print preview of `/work/anticam`; the impeccable
detector over `src/`; build size table regenerated; `content/notes/design-spec.md` §17 answers
folded into `projects.ts`; `/lab` confirmed gone; `git grep -n "TODO(alex)"` produces the list for
Alex.

Estimated effort: WP0 2 days; WP1 2 days; WP2 2 days; WP3 2 days; WP4 3 days; WP5 3 days; WP6 1
day; WP7 3 days; WP8 3 days plus a device tuning session; WP9 2 days. With three developers in
parallel after WP0: about two and a half weeks to launch in photo mode.

---

## 17. Open questions for Alex

Ordered by how much they change what the site can show. Each has a `TODO(alex)` in `projects.ts`.

1. **CeraPiper authorship and role.** Are you a named author on the CAD paper under review? Which
   parts of the system did you build? Is "Research intern, Cornell Tech x Technion, summer 2026"
   the line you want, and how should the affiliation read next to "Matter of Tech Lab"? (§7.4 spec
   sheet and "What I did".)
2. **Photo clearance.** The Ring frames (residential street, a person) for the home diptych and the
   compare; the cap brim photo (is it a real prototype?); the Room Unit photo on deck page 2 (what
   is it?); any photo with minors or teammates; whether teammates may be named. Until cleared, the
   AntiCam row shows the V2 colourways and the compare shows the Test 2 glow.
3. **Headshot and social links.** None exist in any source. Supply a headshot for `/about`, and
   say which social links (if any) belong in the footer.
4. **Résumé PDF without the phone number.** Needed for the footer link and as the public source
   for "90+ prototypes", "70+ students" and the awards line.
5. **Smaller pieces and Extended Memory.** Home links to `/about#smaller-pieces` and shows no list;
   Extended Memory renders only if you approve the one-sentence concept note.
6. **FTC seasons and years** for Monti, Honu, Swerve Drive, Ball-Drive and Scorpion; which team each
   award belongs to; the DECODE season year. The site currently prints "seasons not dated".
7. **Awards only root CLAUDE.md claims:** "2x Worlds qualifier" and "third in New York" with the
   rookie team. Not rendered until corroborated.
8. **Prosthetic cost:** under $100 (résumé) or under $200 (design brief), and is it a target or a
   measured BOM? No cost figure is shown until resolved.
9. **Citations for the prosthetic audience and cost statistics** (10M+, 180,000+, 3M+, 2.6M+,
   $5,000, $20,000+, $0.5M, 5–15% access). None can be published without them.
10. **AntiCam Room Unit price** ("all under $100" vs "$100+") and the project's real age (two years
    vs the June 2023 test). The spec sheet omits the room unit price.
11. **AntiCam emitter specs** (wavelength, LED count, power, run time, range) and whether the
    retro-reflective element is a lining or a coating. Mechanism copy stays qualitative until then.
12. **Hour of Code count** (20+, 30+, 40+ or 13) and which outreach you personally led versus the
    team, especially the micro-funding platform credited on the roster to a teammate.
13. **USC and TroyLabs BUILD** appear only in root CLAUDE.md. Confirm they may be public before
    launch (they are on home, the contact band and `/about`).
14. **Higher-resolution art:** ten 2400 px re-renders on black from the existing CAD files, the five
    missing CeraPiper README figures, the missing AntiCam deck `assets/` cut-outs, and two short
    phone videos (finger curling; array powering on). The plate system holds larger images without
    layout changes.
15. **Canvas promotion.** After the device tuning session, do you want the procedural pin on the
    home hero, or should the real V1 photograph stay? The site ships with the photograph.
16. **Final domain** for `metadataBase`, the sitemap and the OG images (tullytech.com subpath, or a
    separate personal domain?).
