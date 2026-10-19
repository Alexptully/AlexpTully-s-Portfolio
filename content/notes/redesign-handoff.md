# Redesign handoff (19 October 2026)

Work moved from the cloud session to Alex's machine at this point. Read `CLAUDE.md`, then
`content/notes/redesign-spec.md` (the visual direction, tokens and motion rules), then this file.

## Done

- **Track A** (content, drawings, motion layer):
  - `content/notes/sections/14-new-projects.md`: sourced facts for Pando Surgical, Bloom and
    the robotic-arm flower, plus the list of what Pando's NDA excludes.
  - `src/components/svg/{LapRotatorTask,BloomBracelet,ArmFlower}.tsx`: authored drawings.
    Their props are documented at the top of each file.
  - `src/components/motion/*` and `src/app/motion.css`: the motion layer.
    - Components: MotionRoot (Lenis + GSAP), MotionInitScript, Reveal, SplitReveal,
      HoverPreview, Marquee, Cursor, Preloader, Parallax, MenuOverlay, SharedElement,
      TransitionLink, PageTransition.
    - Test bench: `/lab/motion` (dev only).
  - Content package A4 (`types.ts`, `projects.ts`, `side-projects.ts`, `home.ts`, `site.ts`,
    `about.ts`, `scripts/check-content.mjs`). Check the commit log for whether it finished
    before the handoff.
- **B1 shell**:
  - Tokens and type utilities in `globals.css`, plus the Archivo + JetBrains Mono fonts.
  - `src/components/layout/`:
    - `SiteHeader`: wordmark; "Los Angeles, CA / live time"; the nav; the pink "Email me" pill;
      a full-screen menu below 1024 px.
    - `SiteFooter`.
    - `Wordmark`: `ALEX` + a pink box holding an italic `t` + `ully`.
    - `LocalClock`.
    - `SitePreloader`: first visit only, all CSS, 1.15 s.
  - The motion layer is wired into `src/app/layout.tsx`.

The home, case and about pages still render the old components on the new tokens. Next comes
replacing them.

## Not yet run

- **The Track A adversarial content review.** Before publishing anything, check every new
  claim against `14-new-projects.md`. Look for:
  - Pando NDA leaks (see the never-publish list in `CLAUDE.md`);
  - teammates' names;
  - targets presented as results;
  - hype words.

## Next, in order

1. **B2 Home** (`src/app/page.tsx`, new components in `src/components/home/`). Sections:
   1. **Hero.**
      - A mono label row.
      - `ALEX` / `TULLY` in `type-display`, with the second line pushed right.
      - The intro sentence bottom-left, "↓ Scroll" in the centre, and a `pill-outline`
        "See the work →" to `#work`.
      - The lines rise in once (CSS animation under `html.motion`). Delay it past the preloader
        with `html.motion-preload`.
      - The letter morph swaps one letter at a time between heavy-condensed (800, 72%) and
        light-wide (300, 125%). Keep CLS at zero:
        - give each letter span a fixed width in `em`, measured once after `document.fonts.ready`;
        - left-align the glyph inside its span;
        - move neighbours with `translate` only, never layout.
      - The morph is off under reduced motion and while paused.
   2. **Marquee.** The words Design, CAD, Firmware, Prototyping, Robotics, Product in
      `type-marquee`, with pink diamonds, between hairlines.
   3. **Selected work (`#work`).**
      - Header row: `SELECTED WORK (05)`, a `(PAUSE MOTION)` toggle and the year range.
      - The toggle stores its state in sessionStorage and sets `html[data-paused]`, which stops
        the marquee, the morph and the cursor.
      - Rows:
        - a mono index, a `type-title` name, and a mono type line with the role;
        - the year on the right;
        - "View project →" on hover;
        - non-active rows dim;
        - `data-cursor="View"`.
      - A sticky preview panel (≥1024 px) shows the active row's cover at native size or smaller,
        with a `(02 / 05)` counter and a progress bar.
      - Order: AntiCam, Pando Surgical, Prosthetic arm, Robotics, CeraPiper (`workOrder`).
   4. **Side projects.** Bloom, then the arm flower, in the same rows but smaller.
   5. **What I do.** Four numbered items from `home.ts`.
   6. **About teaser and Now.**
   7. **Contact.** A big email address and tullytech.com.
   8. **Sources.** Small.
2. **B3 Case template** (`/work/[slug]` for AntiCam, the prosthetic arm, robotics and
   CeraPiper). Keep it image-led and short:
   - a title band and a meta row (Role, Year, Type, Status);
   - hero media and one statement sentence;
   - count-up stats, each with its footnote;
   - a sticky-heading timeline built from `versions`, with a pink fill line and diamond markers
     that light up as you scroll;
   - a gallery, then the existing interactive moment (`MomentSlot`);
   - compact facts, then sources;
   - a big next-project link.

   Do not render the long Why / Results prose; condense it into highlights and captions. Keep
   `buildCite` / `proseOwners` from `CaseStudy.tsx` for the citations.
3. **B4.**
   - The Pando brief page, using only the public basics plus the `LapRotatorTask` drawing.
   - The Bloom and arm-flower side pages, plus a `BloomCounter` moment (tap to light 0–5 LEDs
     on `BloomBracelet`).
4. **B5 / B6.** Restyle `/about`; update the OG images and metadata.
5. **B7 Cleanup.**
   - Delete:
     - `components/home/{Hero,LineupRow,WorkIndex,NowAndNext,ContactBand}`;
     - `components/layout/{Masthead,Footer}`;
     - `components/media/{Plate,PlateTransition}`;
     - `components/three/*` and `src/app/lab`;
     - the old CSS utilities (`led`, `grain`, `dot-grid`, `spotlight`, `ticks`, `rise`, and
       the `.plate` view-transition block).
   - Remove the dependencies `three`, `@react-three/*`, `@types/three` and `motion`.
   - Remove `heroMode`.
6. **Verify.**
   - `npm run lint`, `npx tsc --noEmit` (the generated PageProps/LayoutProps errors are
     expected before a build), `npm run check:content` and `npm run build`.
   - Screenshot at 390, 768 and 1440 in default, reduced-motion, JS-off and print modes.
   - Scan the staged diff for names and NDA terms before every commit.

## Open questions for Alex (TODO(alex) in the code)

- **Pando:** cleared images; its position in the work order.
- **Bloom:**
  - breadboard photos and the video stills;
  - confirm the 4 December demo;
  - whether "Terra Labs" and "Halo" are public names.
- **Arm flower:** public name; photos.
- **Robotics:** season years.
- **Cosmo AI:** deferred.
- **Accent:** IR pink `#FF3B6F` instead of the reference's blue. It is one token, `--accent`.
