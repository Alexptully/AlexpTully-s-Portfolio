# Redesign spec (October 2026)

Supersedes `design-spec.md` §1–5 and §10–13. Source of the visual direction: the reference
portfolio (a screen recording supplied by Alex, October 2026, analysed frame by frame). We take
its transitions, interactivity and overall style. We do not take its text, images, logo or
code, and we avoid its weakness: text-heavy project pages.

## 1. What the reference does (measured)

| Element | Observation | Timing |
|---|---|---|
| Ground | Flat charcoal `#131313`, no gradients, no grain | — |
| Ink | Warm off-white `#E8E3E0`; dim states `#767472`; labels `#565450`; rules `#292929` | — |
| Accent | One saturated colour, used for: wordmark box, primary pill, active nav dot, list numbers, mono status text, timeline line and diamonds, cursor bubble | — |
| Display type | Heavy condensed grotesk, all caps, tight tracking; letters periodically morph between condensed-heavy and wide-light (variable width and weight), one letter at a time | morph ~600 ms per letter, staggered, idle loop |
| Body | Neo-grotesk, sentence case, ~20 px at 1440, muted ink | — |
| Labels | Monospace, uppercase, tracked ~0.12em, ~14 px, often in parentheses: `(PORTFOLIO / ©2026)` | — |
| Preloader | Wordmark assembles; 3-digit counter counts to 100 bottom-right in condensed numerals; two mono lines bottom-left; then the wordmark's highlight box scales to fill the screen and slides off left, revealing the hero | count ~0.9 s, box grow ~330 ms, hold ~400 ms, slide ~450 ms |
| Header | Wordmark left; mono "CITY / live clock" centre; uppercase nav right; filled pill CTA. Active page gets an accent dot | — |
| Hero | Mono row (three labels spread across the grid); two giant lines of the name, second line pushed right; intro sentence bottom-left; "↓ SCROLL, GENTLY" mono centre; outlined pill "SEE THE WORK →" bottom-right. Lines rise in with a mask on entry; the whole block scrolls away faster than the page | rise ~700 ms, expo-out |
| Marquee | Full-bleed band between hairlines; wide light italic words separated by accent diamonds; moves on its own, speeds with scroll | — |
| Work list | Header row `SELECTED WORK (04)` + `(PAUSE MOTION)` toggle + year range. Rows: mono index, large title, mono type line with accent parenthetical status, year right, `VIEW PROJECT →` on hover. Non-active rows dim. A sticky preview panel on the right swaps image per active row, with `(02 / 04)` counter, type label and a progress bar. Cursor becomes an accent "VIEW" bubble over previews; a tilted card follows the pointer on first hover | swap ~400 ms |
| Case page | Sticky left: accent mono kicker `(LAUNCH)`, condensed caps heading, short paragraph. Right: vertical timeline with diamond markers; accent line fills as you scroll; items ahead stay dim, the active item lights up. Then big count-up stats with accent `+`. Then one large statement sentence | count-up ~1.2 s |
| Cursor | Small accent dot plus a ring; ring grows into a labelled bubble on interactive media | follows with lag |
| Page change | Curtain in the accent colour | ~800 ms total |

## 2. Our adaptation (decisions)

- **Accent = Alex's IR pink `#FF3B6F`**, not the reference's blue. It is Alex's existing brand
  (AntiCam deck) and keeps the site from being a clone. One token: `--accent`.
- **Fonts:** Archivo (variable `wdth` 62–125 and `wght`, plus italic) for display, body and the
  marquee; JetBrains Mono for labels. Two families total, both via `next/font/google`.
- **Wordmark:** `ALEX` heavy condensed + a pink box holding an italic `t` + italic `ully`.
- **Header centre:** `LOS ANGELES, CA / live time` (USC, fall 2026).
- **Hero:** `ALEX / TULLY` with the letter-width morph; intro sentence from `home.ts`.
- **Marquee words:** what Alex does (from CLAUDE.md tools/skills): Design, CAD, Firmware,
  Prototyping, Robotics, Product.
- **Work list:** five main projects; the sticky preview uses each project's cover; robotics
  shows "FTC" where a year is missing.
- **Side projects:** same row pattern, smaller, two rows (Bloom, robotic-arm flower).
- **Case pages are image-led** (fixing the reference's weakness): title band, hero media,
  one statement sentence, count-up stats from sourced figures, the sticky-heading timeline built
  from `versions`, a media gallery, the interactive moment, compact facts, sources, big
  next-project link. Long prose from the old pages is not rendered.
- **Preloader:** first visit per session only, about 1.5 s, skipped under reduced motion and
  without JS.
- **WebGL pin canvas:** retired (the reference uses none).

## 3. Tokens

| Token | Value |
|---|---|
| `--bg` | `#131313` |
| `--surface` | `#1B1B1B` |
| `--border` | `#292929` |
| `--border-strong` | `#4A4846` |
| `--ink` | `#E8E3E0` |
| `--muted` | `#9A9794` (body copy, 6.9:1) |
| `--quiet` | `#767472` (labels and dim rows, 4.3:1, used at 14 px+ uppercase mono or display sizes only) |
| `--accent` | `#FF3B6F` (5.7:1 on bg; text on accent is `--bg`) |
| `--plate-dark` / `--plate-light` | `#0B0E13` / `#E6E7E9` (image grounds the crops were levelled to) |
| Ease | `--ease-out: cubic-bezier(0.16, 1, 0.3, 1)`, `--ease-in-out: cubic-bezier(0.65, 0, 0.35, 1)` |

Grid: 12 columns, 64 px side margins at 1440 (16 px phone), 24 px gutters.

## 4. Motion rules

- Nothing is hidden unless JS is running and reduced motion is off (`.motion.motion-ready`).
- `(PAUSE MOTION)` toggle stops the marquee, letter morph and cursor follower for the session.
- Reduced motion: no preloader, no smooth scroll, no morph, no marquee movement, instant page
  changes; count-ups show final values.
- Print: everything visible, no overlays.
