# Alex Tully — portfolio

Personal portfolio for Alexander (Alex) Tully: hardware founder (Tully Tech / AntiCam),
designer of a low-cost prosthetic arm, FIRST Tech Challenge team captain, and CeraPiper
research intern. Built with Next.js 16 (App Router), React 19, TypeScript, Tailwind v4,
and React Three Fiber for the one WebGL moment on the home page.

## Commands

| Command | What it does |
|---|---|
| `npm run dev` | local dev server at http://localhost:3000 |
| `npm run build` | production build (run before calling any task done) |
| `npm run lint` | ESLint (Next 16 flat config, React Compiler rules) |
| `npm run check:content` | fails if any statistic lacks a source or any un-cleared image has no fallback |
| `node scripts/images/build.mjs` | regenerates `public/images/**` from `scripts/images/manifest.json` |

## Where things live

- `src/content/` — every word of site copy as typed data (`projects.ts`, `about.ts`, `site.ts`). Pages render from it; components hold no copy.
- `src/app/` — routes: `/`, `/work/[slug]` (anticam, prosthetic-arm, robotics, cerapiper), `/about`, sitemap, robots, Open Graph images.
- `src/components/three/` — the AntiCam pin canvas (poster, reduced-motion, no-WebGL, and slow-device fallbacks).
- `src/components/moments/` — the four interactive SVG moments (Ring compare, finger linkage, drive diagram, hex profile).
- `content/source/` — original documents the copy was written from (never served). `content/notes/` — the generated content map, brief, and design spec.
- `.claude/skills/` — project-local Claude Code skills (superpowers, impeccable, frontend-design, skill-finder, Vercel React skills).

## Before launch

Search for `TODO(alex)` in `src/content/` and `content/notes/design-spec.md` §17. The site
withholds any fact it could not source: photo clearance, CeraPiper authorship, the final
domain (`site.siteUrl`), a résumé PDF without the phone number, headshot and social links.
