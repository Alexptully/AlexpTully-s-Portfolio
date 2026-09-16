# Alex Tully — Portfolio Site

Personal portfolio for Alexander (Alex) Tully: hardware founder, product designer, and
robotics lead. The site's job is to show, fast, that Alex designs and ships real physical
products. Audiences: TroyLabs BUILD and other USC programs, potential collaborators and
investors, internship and research recruiters.

## Commands
- `npm run dev` — local dev at http://localhost:3000
- `npm run build` — production build (run before calling any task done)
- `npm run lint` — ESLint

## Stack and conventions
- Next.js App Router, TypeScript, Tailwind, `src/` directory, `@/*` import alias
- Keep all project copy in one typed file: `src/content/projects.ts` (title, slug, role,
  summary, highlights, awards, images, links, status). Pages render from it; no copy
  hard-coded in components.
- Use `next/image` for every image. Put web-ready images in `public/images/<project-slug>/`.
- One page per featured project at `/work/[slug]`, plus `/` (home) and `/about`.
- Mobile-first, visible keyboard focus, respects `prefers-reduced-motion`, alt text on
  every image.

## Source material
All raw material from the claude.ai "Resume" Project lives in `content/source/` (never
served to the web). Before writing copy for a section, read `content/source/CLAUDE.md`,
which maps every file to what it covers. Quick map:

- `resume/` — current and older résumé (start here for roles and dates)
- `portfolio/` — Alex's 7 existing portfolio pages (robots, Electric Road, outreach)
- `robotics/` — Tritonics engineering portfolio, championship slides, poster deck
- `anticam/` — project plan, presentation, ethics essay, pitch-deck outline
- `prosthetic-arm/` — design brief
- `cerapiper/` — tool README and paper draft
- `essays/` — private college essay drafts (facts only, never quote)

This GitHub repo is public, so three folders are gitignored and exist only on Alex's machine:
`resume/` (phone number), `essays/` (private drafts), and `cerapiper/user-study-paper/` (under
anonymous review). Facts from them are already captured in `content/notes/content-map.md`.

Multi-page documents are stored as `text.md` (all page text, searchable) plus
`pages/page-NN.jpg`. Read `text.md` first; open a page image only when the layout,
a chart, or a photo matters. Web-ready copies of images go in `public/images/`.

## Who Alex is
- Founder of Tully Tech (tullytech.com): affordable assistive and privacy hardware
- Background in CAD, embedded systems, fabrication, and product design
- USC, starting fall 2026: Iovine and Young Academy, Arts, Technology and the Business
  of Innovation
- Fall 2026: TroyLabs BUILD (USC student accelerator), PM division; advanced robotics
- Main influence: Steve Jobs
- Earlier: Avenues: The World School (Mastery Learning Program, class of 2026); NYU AB
  Calculus (summer 2025); Octura (Bank of America partner) selective internship (summer
  2024); NYU Tandon Cyber Security for Computer Science (2023, won hackathon); Take the
  World Forward fellowship with Harvard College, MIT Solv[ED], and Learn with Leaders
  (2021–2022)
- Tools: SolidWorks, Fusion 360, Onshape, Blender; Python, Arduino, HTML; some Java, C++,
  C; Raspberry Pi; 3D printers, laser cutters, shop tools. Coded 8 commercial websites

## Featured work (lead with the first three)

**AntiCam (Tully Tech's flagship)** — wearable device that stops cameras from capturing
the wearer. An IR LED array washes out night-vision-capable sensors and a retro-reflective
lining bounces flashes back to the lens. Formats: cap, clip-on pin, room unit, all planned
under $100. Two years of work, 30+ prototypes, four major versions, tested against a live
doorbell camera. Framing matters: it is legal and harmless by physics (no jamming, no
damage) and built to protect people, not hide wrongdoing. Pull stats only from the
pitch outline, with its sources.

**Low-cost prosthetic arm** — research assistant at Stevens Institute of Technology
(summer 2024, faculty-supervised), continued through his school's Mastery Program. 3D-printable, myoelectric
sensors, custom actuation for fingers, AI-assisted automatic fit, modular for quick
repair, under $100, 90+ prototypes. Goal: partner with manufacturers and organizations to reach
underserved communities. Audience stats are in the design brief.

**Robotics (FIRST Tech Challenge)** — Team Captain and Operations Lead (earlier:
mechanical/electrical lead) in an 80+ member club. 2x NYC Champion, 2x Worlds qualifier,
2nd-place Think Award at the FTC World Championship, multiple Inspire awards. Trained
50+ students. Most recently rebuilt the team and community from scratch with freshmen new
to robotics; that almost entirely rookie team placed third in New York.
Robots and systems (see portfolio pages 1–5): Monti (FTC #17253, captain; modular,
screwless), Honu (FTC #14712, electrical lead; 1st in NYC, Worlds Think Award), Swerve
Drive (#14712, electrical lead), Ball-Drive (#17253, ops lead/captain), Scorpion
(#17253, fabrication lead; scissor lift).

**CeraPiper** — Alex was a research intern (Cornell Tech x Technion, summer 2026) on this
CAD tool for ceramic clay extrusion, built as an Onshape extension:
FeatureScript design layer, Python/Flask middleware that compiles the feature tree into
an extrusion sequence, Arduino machine backend, and a printed paper blueprint that runs
under the clay. The earlier CAM version was published at ACM SCF 2025; the CAD paper is
under anonymous review, so do not call it published.

**Smaller pieces**
- Electric Road (individual Mastery project): scaled model of a solar road that
  wirelessly charges moving EVs
- IDEA Club co-founder and lead: trained 70+ students in CAD, CNC, and fabrication
- Outreach: weekly robotics programs at Hudson Guild, 20+ Hour of Code workshops, a
  school e-waste drive (40+ lbs), CAD tutorials in seven languages, a micro-funding
  platform that helped robotics teams in Ukraine, Ghana, and the Blackfeet Reservation
- Extended Memory (concept): a wearable second memory, e.g. glasses or a hat, that
  recalls names, faces, and moments only when needed

## Content rules
- Only state facts found in the source files or this document. If something is missing
  or two sources disagree, leave a `TODO(alex):` comment instead of guessing.
- Contact: tullytech.com and alexptully@gmail.com are on his résumé. Do not publish his
  phone number or home address unless Alex asks.
- Never publish essay text; the essays are private drafts.
- Every statistic needs its source available (footnote or link).
- Write plainly and specifically, in the first person, the way a builder describes
  their work. No hype words.

## Design direction
- The objects are the hero: renders, prototypes, and test footage carry the page, and
  the copy stays short. Restraint over decoration, in the spirit of Alex's Jobs
  influence.
- Existing brand cues: portfolio pages use black backgrounds with bright blue/green CAD
  renders; the AntiCam deck uses a dark theme with an IR-pink accent (`#FF3B6F`).
  Build on these deliberately rather than falling back on a generic template look.
- One memorable moment per page at most; no fade-in on every section.
- Show Alex's role on each project clearly, since recruiters scan for it.

## Open questions for Alex
- Whether Alex is named as an author on either CeraPiper paper
- Which photos are cleared to show publicly, headshot, and contact/social links
- Whether to include Extended Memory and outreach on the home page or only on `/about`

## Framework notes
This project runs Next.js 16. Read `AGENTS.md` (generated by `next dev`) and the guides it points to
in `node_modules/next/dist/docs/` before writing framework code; conventions differ from older
versions.
