## 4. Featured: Low-cost prosthetic arm

**Role:** Research Assistant, Stevens Institute of Technology — designed and fabricated a
prosthetic arm under faculty supervision, and researched prosthetics design, construction, costs,
and the physics behind human motion and rhythm.
(content/source/resume/resume-current.png — Experience, Stevens entry)
The 16-slide design brief names Alex Tully as its author on the title slide and is written in a
single-author voice, but states no role title, institution, supervisor, or team anywhere.
(content/source/prosthetic-arm/design-brief/pages/page-01.jpg#page-1;
content/source/prosthetic-arm/design-brief/text.md)

**Dates:** Summer 2024 at Stevens, per the résumé; continued afterward through Avenues' Mastery
Program, per root CLAUDE.md and the private essay drafts. The design brief itself carries no date,
term, or version number on any of its 16 slides.
(content/source/resume/resume-current.png — "STEVENS INSTITUTE OF TECHNOLOGY · Summer 2024";
content/source/essays/college-essays-private.txt#L2794-L2797;
content/source/prosthetic-arm/design-brief/text.md)

**Name:** Alex's own materials title it "Affordable Prosthetic Arm" (design brief
title slide) and "Prosthetic Arm: Affordable & Adaptable" (résumé).
(content/source/prosthetic-arm/design-brief/text.md#page-1; content/source/resume/resume-current.png)

**One line:** A 3D-printable lower-arm prosthetic — hand and forearm — built from off-the-shelf
parts, driven by servos through tendon-style cords, controlled by a myoelectric sensor, and sized
to the wearer from hand measurements.
(content/source/prosthetic-arm/design-brief/text.md#page-5, #page-7, #page-8, #page-9, #page-12)

> Reading note for whoever writes the site copy: the brief's own cost requirement is **under $200**,
> while the résumé, root CLAUDE.md and the AntiCam pitch script all say **under $100**. Do not
> publish a figure until the TODO in 4.6 is resolved.

---

### 4.1 Facts

**Scope and requirements** (all from the Goal & Requirements slide)

- The product is scoped as a lower-arm prosthetic covering the hand and forearm.
  (content/source/prosthetic-arm/design-brief/text.md#page-5)
- Requirement: built from off-the-shelf parts, with most parts able to be 3D-printed.
  (content/source/prosthetic-arm/design-brief/text.md#page-5)
- Requirement: modular and easy-to-assemble parts.
  (content/source/prosthetic-arm/design-brief/text.md#page-5)
- Requirement: controlled via a myoelectric interface.
  (content/source/prosthetic-arm/design-brief/text.md#page-5)
- Requirement: perform more than 80% of common tasks. The brief reports no test result against this
  threshold anywhere. (content/source/prosthetic-arm/design-brief/text.md#page-5)
- Requirement, listed last and called the most important: costs under $200 to produce.
  (content/source/prosthetic-arm/design-brief/text.md#page-5)
- The résumé states the arm can be constructed for under $100 and that Alex iterated 90+ prototypes.
  (content/source/resume/resume-current.png — Tully Tech · Prosthetic Arm)

**Design process**

- The process has four named stages: Sketches/Ideation (design idea after research), CAD Designs,
  Prototyping, and Testing. (content/source/prosthetic-arm/design-brief/text.md#page-6)
- The CAD is parametric and was created from average hand sizing.
  (content/source/prosthetic-arm/design-brief/text.md#page-6)
- Individual mechanisms were prototyped separately, and prototypes were put through strength, grip,
  actuation, and functionality tests.
  (content/source/prosthetic-arm/design-brief/text.md#page-6)
- The ideation panel is a hand-drawn sketch sheet: a labeled "Current design" finger side view with
  Elastic Retraction Band, String and Servo callouts; side and front finger studies annotated for
  pulley joints and a torsion spring; a "Ft grasp mechanism" linkage; and a full hand-and-forearm
  layout showing component blocks inside the forearm.
  (content/source/prosthetic-arm/design-brief/pages/page-06.jpg#page-6)
- Three physical build stages appear in the brief: dark-red and orange PLA finger test prints, an
  assembled gray printed hand, and a white-palm / glossy-black final build.
  (content/source/prosthetic-arm/design-brief/pages/page-06.jpg#page-6;
  content/source/prosthetic-arm/design-brief/pages/page-14.jpg#page-14)
- A single orange printed finger was bench-tested bolted to a servo horn on a mount.
  (content/source/prosthetic-arm/design-brief/pages/page-06.jpg#page-6)

**Fingers and actuation**

- The fingers use a tendon-inspired cord system: one elastic cord keeps the finger upright, and a
  second cord connects to a servo to control the finger's movement.
  (content/source/prosthetic-arm/design-brief/text.md#page-7)
- The two cords are named on the render legend: an elastic cord (traced in red) and a Kevlar cord
  attached to the servo (traced in blue). On the bent-finger render the elastic path runs along the
  outside of the bend and the Kevlar path along the inside.
  (content/source/prosthetic-arm/design-brief/pages/page-07.jpg#page-7)
- A finger is made of six printed pieces plus two pin rods, shown as an exploded row.
  (content/source/prosthetic-arm/design-brief/pages/page-07.jpg#page-7)

**Forearm and electronics**

- The forearm houses five listed subsystems: servos, a wrist control system, an Arduino, batteries,
  and a myoelectric control system. (content/source/prosthetic-arm/design-brief/text.md#page-8)
- The photographed forearm, shell opened, shows a stack of servos with visible gearheads, red and
  black power wiring, a green Arduino-style board at the base, and cable routing up into the hand.
  (content/source/prosthetic-arm/design-brief/pages/page-08.jpg#page-8)
- The final design is shown two ways: a photo of the dark printed hand from the back with visible
  joint pins and cord channels (the same image used in the page 6 "Testing" panel — do not publish both),
  and a ghosted render of the whole arm in which the servo stack, gear faces and control board are
  visible through a translucent forearm cone closed by a flat end cap.
  (content/source/prosthetic-arm/design-brief/pages/page-10.jpg#page-10)

**Myoelectric control**

- Control uses a specialised Electromyography (EMG) sensor, called a myoelectric sensor, which
  transforms electrical signals generated by muscle contractions into readable analog values and
  creates a movement response in the prosthetic.
  (content/source/prosthetic-arm/design-brief/text.md#page-9)
- The explanatory diagram labels a biceps placement with EMG Electrodes, a Reference Electrode, an
  Amplifier, and an EMG waveform readout.
  (content/source/prosthetic-arm/design-brief/pages/page-09.jpg#page-9)
- The hardware shown on that slide is two third-party red muscle-sensor breakout boards, and the
  code screenshot is ROBOTIS Dynamixel sample code (`Dynamixel2Arduino.h`, `DynamixelShield`,
  a link to emanual.robotis.com) — neither is identified as Alex's own sensor or firmware.
  (content/source/prosthetic-arm/design-brief/pages/page-09.jpg#page-9)
- Per the private drafts, finger actuation components were built first and myoelectric sensors were
  integrated afterward to form the control system.
  (content/source/essays/college-essays-private.txt#L2733-L2735)

**Fit and automatic sizing**

- The design is parametric, driven by seven labeled hand measurements — hand circumference, hand
  length, palm length, wrist circumference, finger root circumference, interphalangeal joint
  circumference, and distal interphalangeal joint circumference — across Digits 1 through 5.
  (content/source/prosthetic-arm/design-brief/pages/page-12.jpg#page-12)
- The "Auto Sizing" pipeline runs user measurements into a neural network, which outputs cell size
  and cell type, which then loops through iterations in nTop Automate.
  (content/source/prosthetic-arm/design-brief/text.md#page-13)
- The slide shows the loop running with a console printing per-iteration cell parameters and the
  resulting mass, next to a grid of candidate renders with one selected.
  (content/source/prosthetic-arm/design-brief/pages/page-13.jpg#page-13)
- The résumé describes the arm as digitally-adaptable and customizable; it does not mention AI.
  (content/source/resume/resume-current.png — Tully Tech · Prosthetic Arm)
- Per the private drafts, the current arm automatically adjusts to fit a user with AI.
  (content/source/essays/college-essays-private.txt#L2794-L2797)

**Modularity and positioning**

- The build is modular: the hand, wrist collar and circular end plate break down into separate
  printed segments, pins and joint pieces, shown fully exploded.
  (content/source/prosthetic-arm/design-brief/text.md#page-14;
  content/source/prosthetic-arm/design-brief/pages/page-14.jpg#page-14)
- The brief ties modularity to assembly and fabrication speed, not to repair; the "modular for quick
  repair" wording used in root CLAUDE.md comes from the private drafts.
  (content/source/prosthetic-arm/design-brief/text.md#page-5, #page-15;
  content/source/essays/college-essays-private.txt#L2794-L2797)
- A divider slide states the approach cuts out orthotists and prosthetists. No supporting argument
  slide follows it. See the TODO in 4.6 before this framing goes anywhere near the site.
  (content/source/prosthetic-arm/design-brief/text.md#page-11)
- The brief is 16 slides; slide 16 is blank apart from a thin white band at the very bottom edge.
  (content/source/prosthetic-arm/design-brief/pages/page-16.jpg#page-16)

---

### 4.2 Statistics

**Audience and cost statistics, exactly as the design brief gives them.** The brief carries **no
citation for any of these figures** — no footnote, no source slide, no URL. Under the root
CLAUDE.md rule that every statistic needs its source available, none of them can be published as-is.
See the TODO in 4.6.

| Statistic (as stated in the brief) | Where it appears | External citation |
|---|---|---|
| 10 million+ people live with limb loss, caused by congenital differences, accidents, necessary surgeries, war injuries, and more | content/source/prosthetic-arm/design-brief/text.md#page-2 | none given in the brief |
| 180,000+ people annually have to undergo amputations each year, in addition to the tens of thousands of babies born, and accidents resulting in limb loss | content/source/prosthetic-arm/design-brief/text.md#page-2 | none given in the brief |
| 3 million+ people have upper arm amputations, which account for approx. 30% of the limb-loss population | content/source/prosthetic-arm/design-brief/text.md#page-2 | none given in the brief |
| 2.6 million+ — "Of those people live in developing nations, and are unable to afford or access the facilities required for traditional prosthetics manufacturing" (card sits directly under the 3 million+ upper-arm card) | content/source/prosthetic-arm/design-brief/pages/page-02.jpg#page-2 | none given in the brief |
| >2.6 million people in developing nations, restated in the context of overall limb loss | content/source/prosthetic-arm/design-brief/text.md#page-3 | none given in the brief |
| Most limb loss occurs in low-income environments | content/source/prosthetic-arm/design-brief/text.md#page-3 | none given in the brief |
| Average cost of non-functional prosthetics is approx. $5,000 | content/source/prosthetic-arm/design-brief/text.md#page-3 | none given in the brief |
| Robotic prosthetics often cost over $20,000 | content/source/prosthetic-arm/design-brief/text.md#page-3 | none given in the brief |
| Parts need to be replaced at least once every 5 years | content/source/prosthetic-arm/design-brief/text.md#page-3 | none given in the brief |
| Lifetime costs exceed $0.5M | content/source/prosthetic-arm/design-brief/text.md#page-3 | none given in the brief |
| If even covered, insurance typically only covers 10%→50% of prosthetics | content/source/prosthetic-arm/design-brief/text.md#page-3 | none given in the brief |
| Most insurance companies consider prosthetics to be aesthetic, not essential | content/source/prosthetic-arm/design-brief/text.md#page-3 | none given in the brief |
| Only around 5→15% of people who need prosthetics have access to them | content/source/prosthetic-arm/design-brief/text.md#page-3 | none given in the brief |
| Passive arm prosthetic: 3K–5K (cost-comparison graphic) | content/source/prosthetic-arm/design-brief/text.md#page-3 | none given in the brief |
| Body-powered arm prosthetic: 5K–10K (cost-comparison graphic) | content/source/prosthetic-arm/design-brief/text.md#page-3 | none given in the brief |
| Myoelectric prosthetic: 20–100K+ (cost-comparison graphic) | content/source/prosthetic-arm/design-brief/text.md#page-3 | none given in the brief |

Internal inconsistency on that cost slide: the bullet says the average non-functional prosthetic is
approx. $5,000, while the graphic on the same slide prices a passive arm prosthetic at 3K–5K, i.e.
$5,000 is the top of that band rather than an average.
(content/source/prosthetic-arm/design-brief/text.md#page-3)

**Project and product statistics**

| Statistic | Source | External citation |
|---|---|---|
| Production cost requirement: under $200, stated as the most important requirement | content/source/prosthetic-arm/design-brief/text.md#page-5 | n/a — Alex's own target |
| Constructed cost: under $100 | content/source/resume/resume-current.png | n/a — Alex's own figure |
| 90+ prototypes iterated | content/source/resume/resume-current.png; content/source/essays/college-essays-private.txt#L1710-L1711 | n/a |
| A 76th design is cited in the private narrative drafts | content/source/essays/college-essays-private.txt#L3273 | n/a — conflicts with 90+, see 4.6 |
| Functional requirement: perform >80% of common tasks (no measured result reported) | content/source/prosthetic-arm/design-brief/text.md#page-5 | n/a |
| 5 subsystems listed inside the forearm | content/source/prosthetic-arm/design-brief/text.md#page-8 | n/a |
| 7 named hand-measurement parameters drive the parametric model, across Digits 1–5 | content/source/prosthetic-arm/design-brief/pages/page-12.jpg#page-12 | n/a |
| Auto-sizing loop runs to 500 iterations; the console shows iterations 125, 126 and 127 of 500 | content/source/prosthetic-arm/design-brief/pages/page-13.jpg#page-13 | n/a |
| Auto-sizing results shown: cell={4.432, 2.728, 3.242} → Mass 5.571 g; cell={4.503, 1.434, 1.265} → Mass 7.906 g; cell={4.082, 4.72, 0.721} still running | content/source/prosthetic-arm/design-brief/pages/page-13.jpg#page-13 | n/a |
| A finger is 6 printed pieces plus 2 pin rods | content/source/prosthetic-arm/design-brief/pages/page-07.jpg#page-7 | n/a |
| Deck length: 16 slides, slide 16 blank | content/source/prosthetic-arm/design-brief/text.md | n/a |

**Uncited figures in the private drafts — do not publish.** The drafts also state ~2.3 million
people in the U.S. living with limb loss, ~700,000 of those as upper-limb amputations, ~2.5 million
worldwide, and that hands are the second most needed prosthetic after legs. None carries a citation,
and the first three do not match the brief's numbers.
(content/source/essays/college-essays-private.txt#L3699-L3701, #L3256-L3259)

---

### 4.3 Goals and intended partners

**Stated goals** (both from the Goal & Requirements slide)

- Goal 1: make prosthetics more affordable for people who need them.
  (content/source/prosthetic-arm/design-brief/text.md#page-5)
- Goal 2: demonstrate reliable prosthetics can be produced at lower costs while maintaining critical
  functionality, by using accessible materials.
  (content/source/prosthetic-arm/design-brief/text.md#page-5)

**Next steps, as the brief lists them**

- Connect with existing mobile prosthetic outreach groups, such as those run by the VA. The VA is
  the only partner type named anywhere in the brief; no manufacturer, university, NGO or named
  organization appears. (content/source/prosthetic-arm/design-brief/text.md#page-15)
- Offer prosthetics with interchangeable parts that snap together to make fabrication faster and
  easier, digitally customizable with remote 3D printing.
  (content/source/prosthetic-arm/design-brief/text.md#page-15)
- Allow patient access to affordable prosthetics in developing nations and low-income
  neighborhoods. (content/source/prosthetic-arm/design-brief/text.md#page-15)
- All three are future work at the time of the brief, not completed work.
  (content/source/prosthetic-arm/design-brief/text.md#page-15)

**Partnership goal from other sources**

- Root CLAUDE.md states the goal as partnering with manufacturers and organizations to reach
  underserved communities. (CLAUDE.md — Featured work)
- Per the private drafts, the work still open is control tuning and the sizing automation, plus some
  calculations; the stated next step is finding partners for low-cost production. (fact only; do not
  reuse the drafts' wording)
  (content/source/essays/college-essays-private.txt#L2739-L2741, #L2794-L2797, #L3278)

---

### 4.4 Backstory and motivation

**Internal notes only. Never publish essay text, and do not paraphrase essay sentences on the site.**
Each line below is a neutral fact, recorded so the site can be checked against it.

- Alex's interest in prosthetics began at a middle-school summer engineering program that included a
  prosthetics lab tour. (content/source/essays/college-essays-private.txt#L3250-L3254, #L3694-L3698)
- Alex cold-contacted a professor at Stevens Institute of Technology to ask to work in his lab.
  (content/source/essays/college-essays-private.txt#L2513)
- One draft names that professor as Long Wang.
  (content/source/essays/college-essays-private.txt#L2513)
- In the lab Alex studied prosthetic designs already on the market, built improved versions of his
  own, and bench-tested how they moved. (content/source/essays/college-essays-private.txt#L2731-L2732 —
  fact only; do not reuse the drafts' wording)
- The project first targeted a prosthetic hand and later changed scope to a full arm.
  (content/source/essays/college-essays-private.txt#L3266-L3270)
- The stated reason for the scope change was that producing and distributing prosthetic hands was too
  complicated to be accessible; custom sizing is described as the arm's new constraint, which Alex
  answered with digital resizing. (content/source/essays/college-essays-private.txt#L3266-L3271, #L2732-L2733)
- Alex learned a new CAD package from his robotics team's lead coder to get past a limit in the
  resizing automation. (content/source/essays/college-essays-private.txt#L3273-L3278)
- Development continued through Avenues' Mastery Program after the Stevens summer.
  (content/source/essays/college-essays-private.txt#L2794-L2797)
- The drafts' generic portfolio-video checklist lists Fusion, Bambu and nTop as Alex's software
  (#L3666-L3679, not prosthetic-specific); the prosthetic-arm outline names only nTop (#L3690), and the
  brief names only nTop Automate (design-brief/text.md#page-13).
- **Origin story is unresolved.** Three drafts give three mutually exclusive origin accounts for the
  project — three different personal origin incidents, each attached to the same follow-on facts, plus a
  fourth framing with no personal incident. Details are in the private drafts only and are deliberately
  not restated here; ask Alex which one is real. (content/source/essays/college-essays-private.txt)

---

### 4.5 Suggested images

All paths are source files. Copy an optimized version into `public/images/prosthetic-arm/` before
use. Nothing here is cleared for publication yet — see 4.6. Every page image is 1456 × 840 px, so
crops are small; ask Alex for the original renders and photos before building the page.

**Hero candidates**

- `content/source/prosthetic-arm/design-brief/pages/page-10.jpg` (right card) — ghosted render of
  the complete arm: white and black fingers extended, black palm and wrist, and a translucent
  smoked forearm cone showing the servo stack, gear faces and control board inside, with fasteners
  and pins floating mid-explosion and a flat end cap closing the elbow end. The single image that
  shows the whole product and its internals at once. Crop inside the rounded card frame to drop the
  border. **Use:** page hero.
- `content/source/prosthetic-arm/design-brief/pages/page-14.jpg` — the physical build fully exploded
  on a light gray card: matte white printed palm shell, glossy black finger assembly, a white wrist
  collar, a black circular end plate, and loose knuckle caps, pin rods, joint blocks and finger
  segments scattered either side. The clearest proof of modularity and the only light-background
  image of the build in the brief; it will need handling against a dark site. **Use:** hero
  alternative, or the modularity section.
- `content/source/prosthetic-arm/design-brief/pages/page-08.jpg` (lower-left) — wide profile render
  of the finished arm: black forearm cone, black wrist and palm, five white printed fingers extended
  flat. It bleeds off the left edge of the slide, so the elbow end is cut; usable as a right-aligned
  band, not as a centered object. **Use:** wide hero band or section divider.

**Mechanism: fingers**

- `content/source/prosthetic-arm/design-brief/pages/page-07.jpg` (right) — the bent-finger render
  with the red elastic path traced along the outside of the bend and the blue Kevlar path along the
  inside. The clearest single explanation of the tendon system; the annotation lines are baked in
  and are the point. **Use:** the "how a finger moves" image.
- `content/source/prosthetic-arm/design-brief/pages/page-07.jpg` (center-right, tall narrow column)
  — the same finger fully extended with both cord paths traced. **Use:** pair it with the bent
  render as a two-state before/after.
- `content/source/prosthetic-arm/design-brief/pages/page-07.jpg` (lower-left strip) — exploded
  render of one finger's six printed pieces and two pin rods, laid out left to right on black. Wide
  aspect, no text overlap. **Use:** the "how a finger is made" strip.

**Mechanism: forearm and electronics**

- `content/source/prosthetic-arm/design-brief/pages/page-08.jpg` (right side, full height) — photo
  of the physical forearm standing upright with its shell opened: servo stack with visible
  gearheads, red and black wiring, a green Arduino-style board with a blue component at the base,
  cable routing in the hand above, and the black printed hand with its white thumb on top. The best
  "real hardware, real electronics" photo in the brief. It is a background-removed cut-out with a residual white halo
  that needs masking. **Use:** the electronics section.

**Process and prototypes**

- `content/source/prosthetic-arm/design-brief/pages/page-06.jpg` (far-left panel) — the hand-drawn
  ideation sheet, white-on-black: the labeled "Current design" finger with elastic retraction band,
  string and servo callouts, the pulley/torsion-spring finger studies, the "Ft grasp mechanism"
  linkage, and the full hand-and-forearm layout sketch. Portrait crop; the "Sketches/Ideation"
  caption sits below it and can be cropped out. **Use:** the process section opener.
- `content/source/prosthetic-arm/design-brief/pages/page-06.jpg` (second panel) — CAD render of the
  hand: four white printed fingers and a white thumb splayed on a dark gray palm shell, three-quarter
  angle on black. **Use:** the CAD step.
- `content/source/prosthetic-arm/design-brief/pages/page-06.jpg` (third panel) — two printed finger
  prototypes upright on black: a matte dark-red finger with visible joint segments, and an
  orange-red finger with three blue painter's-tape bands and a control cord trailing from the base.
  Small at source; treat as thumbnails. **Use:** the prototyping step.
- `content/source/prosthetic-arm/design-brief/pages/page-06.jpg` (fourth panel, upper) — photo of
  the assembled gray printed hand, back-of-hand view, fingers extended, print lines visible across
  the palm. **Use:** physical-build proof shot.
- `content/source/prosthetic-arm/design-brief/pages/page-06.jpg` (fourth panel, lower inset) — the
  bench test rig: one orange printed finger mounted to a servo bracket with the horn visible and the
  cord routed to the servo. Tight crop, thumbnail only; keep the crop above the "Testing" caption.
  **Use:** the testing step.

**Fit and sizing**

- `content/source/prosthetic-arm/design-brief/pages/page-12.jpg` (left two-thirds) — exploded
  parametric CAD render of the whole arm with the underlying sketch geometry visible: cyan and blue
  construction sketches, purple and blue reference circles, orange datum lines and white constraint
  points over the finger segments, black palm, translucent forearm cone and floating fasteners. The
  most technical image in the brief and no text overlaps it. **Use:** the parametric-design section.
- `content/source/prosthetic-arm/design-brief/pages/page-12.jpg` (right third) — technical line
  drawing of a palm-side hand annotated with the seven measurement parameters in cyan and orange,
  digits labeled 1 through 5. The serif labels are small at source resolution; redraw as SVG for a
  crisp result. **Use:** explaining what measurements drive the fit.
- `content/source/prosthetic-arm/design-brief/pages/page-13.jpg` — the whole "Auto Sizing" flow:
  User Measurements → neural-network graphic → Cell Size/Cell Type over two columns of numeric data
  → Looping Through Iterations over the console log → nTop Automate with a grid of candidate
  renders, one check-marked, feeding an enlarged render. Bold labels sit against every element, so
  nothing crops free of text. **Use:** reference for rebuilding the pipeline diagram natively;
  do not crop pieces out.

**Rebuild natively rather than publishing the slide**

- `content/source/prosthetic-arm/design-brief/pages/page-02.jpg` — the Audience slide: two rounded
  stat cards, typography only. Source for the audience numbers; rebuild as native stat cards, and
  only once the numbers have citations.
- `content/source/prosthetic-arm/design-brief/pages/page-03.jpg` — the Problem slide's three-circle
  cost comparison. The circle illustrations are generic stock vectors, not Alex's work. Rebuild as a
  native chart or table; do not crop the graphic.
- `content/source/prosthetic-arm/design-brief/pages/page-05.jpg` — goals and the product
  requirements list, text panels only. Rebuild as a native list.

**Do not publish**

- `content/source/prosthetic-arm/design-brief/pages/page-01.jpg` — title slide, grayscale photo of a
  printed hand, palm up, fingers curled, with a wrist cuff of three dark rings. That cuff does not
  match the forearm on pages 8, 10 or 14, so provenance is unconfirmed.
- `content/source/prosthetic-arm/design-brief/pages/page-09.jpg` (white card, right two-thirds) —
  third-party product photos of red muscle-sensor breakout boards plus a screenshot of ROBOTIS
  Dynamixel example code. Not Alex's hardware or firmware.
- `content/source/prosthetic-arm/design-brief/pages/page-09.jpg` (lower-left) — the EMG line-art
  diagram. Explanatory only, low-contrast gray labels, and the "Reference Electrode" label is
  clipped by the slide edge. Redraw it rather than cropping it.
- `content/source/prosthetic-arm/design-brief/pages/page-15.jpg` — stock photo of a white and teal
  mobile health van carrying another organization's real branding ("Keeping New Mexico Safe &
  Healthy", "Visita Wellness"). Unrelated to Alex's work.
- `content/source/prosthetic-arm/design-brief/pages/page-04.jpg`, `page-11.jpg` — section dividers
  ("SOLUTION"; "CUTTING OUT ORTHOTISTS AND PROSTHETISTS") on a faint dotted wave texture. No usable
  visual; the same texture appears on page 1 and could inform a background treatment.
- `content/source/prosthetic-arm/design-brief/pages/page-16.jpg` — blank.
- `content/source/resume/resume-current.png` — the prosthetic-hand thumbnail beside the Prosthetic
  Arm blurb (roughly 110 × 115 px) is a usable fallback icon only. The page itself carries Alex's
  phone number and must never be published as-is.

---

### 4.6 Open questions

TODO(alex): Production cost — is it under $100 or under $200? The design brief's own most-emphasized
requirement is "costs <$200 to produce", while the résumé says the arm "can be constructed for
<$100", root CLAUDE.md says under $100, and the AntiCam pitch script says "buildable for under
$100". Pick one figure and say whether it is a target or a measured bill of materials.
(content/source/prosthetic-arm/design-brief/text.md#page-5;
content/source/resume/resume-current.png; content/source/anticam/pitch-deck-build.js#L554)

TODO(alex): Sources for the audience and cost statistics. The brief cites nothing for 10M+, 180,000+,
3M+, ~30%, 2.6M+, $5,000, $20,000, the 5-year replacement interval, $0.5M lifetime cost, 10–50%
insurance coverage, or 5–15% access. Site rules require a source for every statistic, so none of
these can go on the site until you supply citations.
(content/source/prosthetic-arm/design-brief/text.md#page-2, #page-3)

TODO(alex): Does "2.6 million+ in developing nations" describe the 3 million upper-arm amputees or
the 10 million overall limb-loss population? The Audience slide places it under the upper-arm card
and words it "Of those people", while the Problem slide restates it against overall limb loss.
(content/source/prosthetic-arm/design-brief/pages/page-02.jpg#page-2;
content/source/prosthetic-arm/design-brief/text.md#page-3)

TODO(alex): Prototype count — the résumé and activity list say 90+ prototypes, the private drafts
also cite a 76th design (#L3273) and "dozens of prototypes" before the first full hand design (#L3263) —
"over 90 cads" (#L3671) is in a generic per-project video checklist, not a prosthetic figure — and the
brief gives no count at all. Confirm the
number to publish and what it counts: CAD iterations, printed parts, complete arms, or all three.
(content/source/resume/resume-current.png;
content/source/essays/college-essays-private.txt#L1710-L1711, #L3273, #L3671)

TODO(alex): Stevens attribution — the brief names no institution, lab, supervisor or date. Confirm
how the Stevens role should read on the site, and whether the faculty supervisor (named Long Wang in
one private draft) or the lab may be credited.
(content/source/resume/resume-current.png;
content/source/essays/college-essays-private.txt#L2513)

TODO(alex): Was ">80% of common tasks" ever measured? The brief lists it as the functional
requirement and reports no results — no grip force, no task success rate, no cycle counts — although
the process slide says strength, grip, actuation and functionality tests were run. If results exist,
they are the strongest thing this project could show.
(content/source/prosthetic-arm/design-brief/text.md#page-5, #page-6)

TODO(alex): What is the neural network in the Auto Sizing pipeline? What was it trained on, what does
it predict, is it yours or an nTop built-in — and is the loop sizing the hand geometry to the user or
optimizing a lattice for mass? The slide is titled sizing, but the console optimizes cell parameters
against mass in grams. "AI-assisted automatic fit" rests entirely on this one slide.
(content/source/prosthetic-arm/design-brief/text.md#page-13;
content/source/prosthetic-arm/design-brief/pages/page-13.jpg#page-13)

TODO(alex): Which myoelectric sensor did you actually use — make and part number? The slide shows
third-party breakout-board product photos and ROBOTIS Dynamixel sample code, so the site cannot
describe your sensor or firmware from this source. A photo of your own wiring would replace it.
(content/source/prosthetic-arm/design-brief/pages/page-09.jpg#page-9)

TODO(alex): Confirm the actuation hardware specs the brief omits: servo model and count, servo
torque, battery type and capacity, Arduino board model, and the Kevlar cord spec.
(content/source/prosthetic-arm/design-brief/text.md#page-7, #page-8)

TODO(alex): Is "modular for quick repair" accurate? The brief only claims modular, easy-to-assemble
parts and ties modularity to faster fabrication; the repair wording comes from the private drafts.
(content/source/prosthetic-arm/design-brief/text.md#page-5, #page-15;
content/source/essays/college-essays-private.txt#L2794-L2797)

TODO(alex): Should the "cutting out orthotists and prosthetists" framing appear on the site? It is a
blunt claim about licensed clinicians, with no supporting argument slide behind it, and it may read
badly to a medical or investor audience.
(content/source/prosthetic-arm/design-brief/text.md#page-11)

TODO(alex): Has the VA outreach connection actually been made, or is it still aspirational? It is the
only partner named in the brief, and the site should not imply a relationship that does not exist.
(content/source/prosthetic-arm/design-brief/text.md#page-15)

TODO(alex): Which origin story is the true one, and may it be published? The private drafts give
three mutually exclusive personal-incident versions plus a fourth framing with no personal incident.
Details are deliberately not restated here (see 4.4); if a family-medical version is the real one,
confirm you are comfortable with a relative's medical condition on a public site.
(content/source/essays/college-essays-private.txt)

TODO(alex): Are there photos or video of the arm being worn or operated by a person, or of a finger
or hand actuating? Every image in the brief is a bench shot, a render, or a component — nothing shows
the device in use, which is the asset this project most needs.
(content/source/prosthetic-arm/design-brief/text.md)

TODO(alex): Provenance of the title-slide hand photo — the three-ring wrist cuff does not match the
forearm shown on pages 8, 10 and 14. Confirm whether it is your build before it is used anywhere.
(content/source/prosthetic-arm/design-brief/pages/page-01.jpg#page-1)

TODO(alex): Confirm nothing from the brief's template survives into published material: the page 15
text layer contains the Canva placeholder "www.reallygreatsite.com" (not visibly rendered on the
slide), and the source text carries typos — "funtionality", "Reseach", "Average cos t" — that must
not be reproduced if any of this copy is reused.
(content/source/prosthetic-arm/design-brief/text.md#page-15, #page-6, #page-3)

TODO(alex): Are higher-resolution originals available for the renders and build photos? Every page in
the brief is 1456 × 840 px, which is too small for a full-width hero.
(content/source/prosthetic-arm/design-brief/pages/)
