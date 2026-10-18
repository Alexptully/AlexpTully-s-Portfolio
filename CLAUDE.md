# Alex Tully — Portfolio Site

Personal portfolio for Alexander (Alex) Tully: hardware founder, product designer, and
robotics lead. The site's job is to show, fast, that Alex designs and ships real physical
products. Audiences: TroyLabs BUILD and other USC programs, potential collaborators and
investors, internship and research recruiters.

## Commands
- `npm run dev` — local dev at http://localhost:3000
- `npm run build` — production build (run before calling any task done)
- `npm run lint` — ESLint
- `npm run check:content` — every stat sourced, every un-cleared image has a fallback
- `node scripts/images/build.mjs` — rebuild `public/images/**` from `scripts/images/manifest.json`

## Stack and conventions
- Next.js App Router, TypeScript, Tailwind, `src/` directory, `@/*` import alias
- Keep all copy in typed files under `src/content/`: `projects.ts` (featured projects: title,
  slug, role, summary, highlights, awards, images, links, status), `side-projects.ts` (Bloom,
  robotic-arm flower), `home.ts`, `about.ts` and `site.ts`. Pages render from them; no copy
  hard-coded in components.
- Use `next/image` for every image. Put web-ready images in `public/images/<project-slug>/`.
- One page per featured or side project at `/work/[slug]`, plus `/` (home) and `/about`.
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
Video files anywhere under `content/source/` and the whole `content/reference/` folder (the
design reference recording and frames taken from it) are gitignored too.

The fall 2026 projects (Pando Surgical, Bloom, robotic-arm flower) come from internal documents
on Google Drive, Notion and meeting notes, which are not in this repo. `content/source/CLAUDE.md`
lists them under "Internal documents not in this repo", and their facts, each cited by
document title, are in `content/notes/sections/14-new-projects.md`.

Multi-page documents are stored as `text.md` (all page text, searchable) plus
`pages/page-NN.jpg`. Read `text.md` first; open a page image only when the layout,
a chart, or a photo matters. Web-ready copies of images go in `public/images/`.

## Who Alex is
- Founder of Tully Tech (tullytech.com): affordable assistive and privacy hardware
- Background in CAD, embedded systems, fabrication, and product design
- USC, starting fall 2026: Iovine and Young Academy, Arts, Technology and the Business
  of Innovation
- Fall 2026: TroyLabs BUILD (USC student accelerator), PM division; advanced robotics
- Fall 2026: Product Manager at Pando Surgical, Inc., a medtech startup working on surgical
  ergonomics, joined through TroyLabs BUILD's PM division (public basics only; see Pando
  Surgical below)
- Fall 2026: side projects at Terra Labs (Bloom, robotic-arm flower; see Side projects below)
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

**Pando Surgical (Product Manager, fall 2026)** — Alex is Product Manager at Pando Surgical,
Inc., a medtech startup working on surgical ergonomics. He joined through TroyLabs BUILD's PM
division and was introduced to the team as its new PM on 30 September 2026. Pando's first
product is the LapRotator (patent pending): an attachment that lets a surgeon rotate a
laparoscope with one hand instead of setting down an instrument to rotate it with the other.
Laparoscopes commonly have an angled tip, so rotating the scope changes the view. As PM he
built the team's task system: a shared tracker organised by date and department that pushes
each person's assigned tasks to their calendar (Google Sheets to Google Calendar), and a
Notion task hub with per-person views. Public site: www.pandosurgical.com. On the site Pando
sits second in Selected work, after AntiCam; its final position is a TODO(alex). Facts and
sources: `content/notes/sections/14-new-projects.md#pando-surgical`.
Pando is under an NDA, so only the public basics above may be used. **Never publish**, in any
file in this repo, on the site or in a commit message:
- cost, pricing or profitability (unit cost, cost of goods, price, profit per unit)
- sales, unit or market projections
- funding of any kind: amounts, asks, investors, and accelerator, grant or funding applications
- quality-system or certification work
- regulatory pathway or strategy of any kind
- IP, licensing, equity or option agreements
- patent details beyond the words "patent pending"
- any product, product idea or roadmap item other than the LapRotator
- survey or interview results and numbers
- names of teammates, surgeons, advisors or partners
- any Pando image. None are cleared: use `todoPhotos` only, plus an authored illustration of
  the task (one-handed laparoscope rotation), never the device itself.

**Side projects (Terra Labs, fall 2026)** — shown after Selected work, each with its own page.
Facts and sources: `content/notes/sections/14-new-projects.md`. Never name teammates.
- **Bloom** (`#bloom`) — Alex's role: PM and systems (architecture, bill of materials,
  firmware for the bracelet and the tap stations, Firebase backend, projection code). Part of
  an immersive "magical forest" showcase experience. Reusable NFC bracelets "bloom", lighting
  1 to 5 LEDs, each time a guest makes a connection by tapping bracelets together with someone
  at one of 4–6 tree-stump stations along the path. Every connection grows a projected garden,
  with a vine drawn between the two people's flowers; at the exit the bracelet is traded for a
  3D-printed flower whose openness matches how many people the guest met. v0.2 (22 September
  2026) listened for a spoken introduction with a microphone and a voice-ID app (do not name
  the app); v0.3 (30 September 2026) dropped the microphone, because the room is too loud and
  per-bracelet cost mattered at about 600 guests, and moved pairing to NFC tap stations. Two
  passive NFC tags cannot talk to each other, so the readers live in shared stations and the
  bracelets stay cheap and reusable. The current prototype is a breadboard bracelet v0 (the
  "NFC light-up prototype"); status wording is "prototype stage". Budget, cost, guest, weight
  and wrist-size figures are targets and must be labelled as targets. Midpoint check-in
  30 October 2026; demo day planned 4 December 2026 (TODO(alex): confirm). Stills from Alex's
  concept video "Bloom Terra Video.mp4" are approved but not yet available: until they are,
  use `todoPhotos` and the `BloomBracelet` SVG. Stills show the bracelet or hands only (no
  faces, no text overlays), say so in the caption when a frame shows the earlier v0.2
  concept, go in `content/source/bloom/video-stills/`, and the video file is never committed.
- **Robotic-arm flower** (`#robotic-arm-flower`) — title the page "Robotic-arm flower"; the
  working name in the notes ("Chorus") is not public until Alex confirms (TODO(alex)). Alex's
  role: electrical and firmware. Four people each wear a wristband that controls a robotic arm
  (IMU for wrist rotation, myoelectric (EMG) sensor for grip; the team has four SO-101 arms);
  the arms place orbs that light a central flower, which blooms and reveals a shared prize.
  Theme: strangers working together. Status (October 2026): concept moving to MVP, with open
  questions on the flower mechanism, wrist sensing and an ESP-based wireless link; showcase
  planned for early December 2026. No images exist: use `todoPhotos` and the `ArmFlower` SVG.
- Cosmo AI: deferred at Alex's request. Do not add it to the site.

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
- Internal documents (Google Drive, Notion, meeting notes) are cited by title only. Their raw
  text, file IDs and private links are never committed, quoted or paraphrased closely; record
  one fact per bullet in `content/notes/sections/14-new-projects.md` with the title as source.
- The Pando NDA never-publish list (under Featured work) applies to every committed file,
  including notes, code comments and commit messages.
- Do not name teammates from Pando Surgical or Terra Labs anywhere in the repo.
- Targets are labelled as targets, never presented as results.
- Never name or link the design reference portfolio; call it "the reference portfolio". Copy
  none of its text, images, logos or code.

## Design direction
- The objects are the hero: renders, prototypes, and test footage carry the page, and
  the copy stays short. Restraint over decoration, in the spirit of Alex's Jobs
  influence.
- Existing brand cues: portfolio pages use black backgrounds with bright blue/green CAD
  renders; the AntiCam deck uses a dark theme with an IR-pink accent (`#FF3B6F`).
  Build on these deliberately rather than falling back on a generic template look.
- Motion follows the reference portfolio's transitions and interactions (see
  content/notes/reference-style.md and redesign-spec.md once written): brief typographic
  reveals, page transitions, hover previews. Case pages are image- and interaction-led with
  short copy.
- Show Alex's role on each project clearly, since recruiters scan for it.

## Open questions for Alex
- Whether Alex is named as an author on either CeraPiper paper
- Which photos are cleared to show publicly, headshot, and contact/social links
- Whether to include Extended Memory and outreach on the home page or only on `/about`
- Fall 2026 projects (Pando images and order, Bloom and robotic-arm flower names, photos and
  dates): see "New projects (fall 2026)" in `content/notes/sections/12-conflicts-todos.md`

## Framework notes
This project runs Next.js 16. Read `AGENTS.md` (generated by `next dev`) and the guides it points to
in `node_modules/next/dist/docs/` before writing framework code; conventions differ from older
versions.
