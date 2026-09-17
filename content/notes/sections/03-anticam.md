## 3. Featured: AntiCam

**Role:** Founder, Tully Tech — author of the AntiCam documents in `content/source/anticam/` (deck
metadata, first-person project plan and essay). No source states he worked alone; drop "sole".
(content/source/resume/resume-current.png — "TULLY TECH - SELECT
INVENTIONS / Founder & innovator of tech startup."; content/source/anticam/pitch-deck-build.js#L8-L9 —
`pres.author = 'Alexander Tully'`, `pres.company = 'Tully Tech'`)

**Dates:** Stated as two years of work in both the 2025 Mastery plan and the Fall 2026 pitch deck;
the earliest dated artifact is the doorbell-camera test of June 7, 2023. See
TODO(alex) on project age below.
(content/source/anticam/mastery-learning-plan/text.md#page-1;
content/source/anticam/pitch-deck-build.js#L446;
content/source/anticam/camera-blinder-presentation/pages/page-15.jpg)

**One line:** AntiCam is Tully Tech's wearable privacy device — an infrared LED array and a
retro-reflective lining that keep cameras from capturing a usable image of the wearer, without
jamming or damaging anything.
(content/source/anticam/pitch-deck-outline.md#L3;
content/source/resume/resume-current.png)

---

### 3.1 Facts

**Mechanism**

- Most cameras use night-vision-capable sensors that respond to near-infrared light, which the
  human eye cannot see; AntiCam works in that gap.
  (content/source/anticam/pitch-deck-build.js#L192-L196)
- A high-output IR LED array projects invisible light toward any lens facing the wearer; the
  camera's auto-exposure cannot compensate and the wearer washes out into glare, while the camera
  itself keeps recording.
  (content/source/anticam/pitch-deck-build.js#L192-L196, #L235)
- A light sensor spikes the LED array when it detects a flash, and a retro-reflective lining
  returns that flash toward its source — the second defense, aimed at flash photography.
  (content/source/anticam/pitch-deck-build.js#L192-L196;
  content/source/anticam/mastery-learning-plan/text.md#page-1)
- Through a phone camera the emitter reads as a magenta glow; to the naked eye it is dark.
  (content/source/anticam/pitch-deck-build.js#L210;
  content/source/anticam/camera-blinder-presentation/pages/page-09.jpg)
- Cap V2 places the emitters under the brim, aimed at the wearer's face, with the retro-reflective
  lining behind them.
  (content/source/anticam/pitch-deck-build.js#L212;
  content/source/anticam/camera-blinder-presentation/pages/page-17.jpg)
- The Mastery plan explains the same mechanism in wave terms: strong infrared LEDs raise the
  light's amplitude enough to overwhelm the camera sensor, and retroreflective material returns an
  incoming flash to its origin by reflection.
  (content/source/anticam/mastery-learning-plan/text.md#page-2)
- Near-infrared is described in the deck's speaker notes as roughly 700–1,000 nanometers. This
  figure carries no citation in any source file — see TODO(alex).
  (content/source/anticam/pitch-deck-build.js#L214)

**Formats and price targets**

- Three planned formats share one emitter, driver and battery platform: a clip-on Pin, a Cap, and
  a Room Unit. (content/source/anticam/pitch-deck-build.js#L437)
- Clip-on Pin, $30–45: the entry product, one-direction coverage, clips to a strap, lapel or bag.
  (content/source/anticam/pitch-deck-build.js#L403)
- Cap, $40–65: the flagship, 360° coverage, retro-reflective lining, flash detection.
  (content/source/anticam/pitch-deck-build.js#L404)
- Room Unit, $100+: whole-room coverage for rentals and hotel rooms, described as next in line; the
  deck carries no photo for it and draws an LED-grid glyph instead.
  (content/source/anticam/pitch-deck-build.js#L405)
- The same four-tier price ladder appears in the earlier Camera Blinder deck: small clip-on $30–45
  (one side), hat/band $40–65 (360º), higher-quality clip-on $30–40 (multiple sides), room device
  $100+ (multi-foot area).
  (content/source/anticam/camera-blinder-presentation/text.md#page-2)
- Planned channels: direct at tullytech.com, then Amazon and Etsy, then creator and
  travel-community partnerships.
  (content/source/anticam/pitch-deck-build.js#L428)
- The same channel plan appears in the earlier Camera Blinder deck — own website, Amazon, Etsy and
  other online stores, promoted through social media, Google and YouTube ads — alongside its stated
  process of research → prototyping → production and distribution.
  (content/source/anticam/camera-blinder-presentation/text.md#page-4, #page-5, #page-6)

**Legal and harmless by physics**

- AntiCam emits infrared light only: no radio interference, no damage to cameras or networks.
  (content/source/anticam/pitch-deck-build.js#L524)
- The deck frames this as legal by design — light, not radio, and therefore outside the FCC's
  jammer rules. (content/source/anticam/pitch-deck-build.js#L502)
- Stated limits, in Alex's own materials: weaker in bright daylight; not for evading traffic or
  law-enforcement cameras; not for use in restricted areas.
  (content/source/anticam/pitch-deck-build.js#L525)
- Intended use is to be stated up front, through terms at checkout and in manufacturing
  partnerships. (content/source/anticam/pitch-deck-build.js#L526)
- Risks the deck says it watches: daylight performance, cameras with IR-cut filters, and copycats;
  the stated edge is speed and design, not a patent, and no patent exists yet.
  (content/source/anticam/pitch-deck-build.js#L504)
- The competitive framing places AntiCam as the only option that is both legal-and-harmless and
  actively protective: RF jammers are active but illegal, detectors find lenses without blocking
  them, IR-blocking eyewear covers the face only, adversarial apparel depends on which recognition
  algorithm is running. (content/source/anticam/pitch-deck-build.js#L475, #L485-L489)

**Components, materials and build state**

- Estimated bill of materials, $15–25 per unit at low volume, covering: IR LED array; Li-ion cell
  with USB-C charging; light sensor and microcontroller; retro-reflective fabric; enclosure. Marked
  a founder estimate. (content/source/anticam/pitch-deck-build.js#L426)
- The current device is hand-built; a custom PCB, battery safety testing and IR eye-safety testing
  are all listed as planned work, not completed work.
  (content/source/anticam/pitch-deck-build.js#L581)
- Earlier prototypes were built from laser-cut wood/MDF and acrylic plates, 3D-printed cases,
  hand-soldered coin-cell packs joined with copper tape, and a COB LED module with a 3×3 grid of
  emitter chips (no source gives its wattage). (content/source/anticam/camera-blinder-presentation/pages/page-10.jpg,
  page-11.jpg, page-13.jpg, page-14.jpg)
- V2 added a physical slide switch on the battery plate beside four coin cells, and the V2 stack is
  six laser-cut clear acrylic plates inside a two-tier 3D-printed case, shown in white, dark gray
  and navy. (content/source/anticam/camera-blinder-presentation/pages/page-13.jpg, page-15.jpg)
- The Tully Tech logo is laser-engraved into prototype lids on the second prototype and on V1 and V2.
  (content/source/anticam/camera-blinder-presentation/pages/page-10.jpg, page-12.jpg, page-13.jpg)

**Testing**

- AntiCam was tested against a live Ring doorbell camera in night mode: same camera, same street,
  with a person wearing the pin prototype walking up the steps. The sensor records a glowing orb
  where the face should be, and the camera keeps recording.
  (content/source/anticam/pitch-deck-build.js#L235)
- The deck captions those frames "Pin prototype V2 · June 2023 · frames captured from the camera's
  own app." (content/source/anticam/pitch-deck-build.js#L236)
- The Camera Blinder deck carries the underlying frame: a Ring night-vision image watermarked
  ring.com and timestamped 06/07/2023 22:31:53 EDT, with a bright wash where a figure stands at the
  bottom of the street. The two sources agree on the date.
  (content/source/anticam/camera-blinder-presentation/pages/page-15.jpg)

**Who it is for**

- First buyers named in the deck: the ~35M Americans who worry about hidden cameras where they
  stay. (content/source/anticam/pitch-deck-outline.md#L3)
- Six segments with a stated priority: short-term-rental travelers (NOW, Pin · Cap); parents (NEXT,
  Cap); creators and public figures (NEXT, Cap · Pin); journalists and activists (LATER, Pin · Cap);
  hosts, hotels and venues (LATER, Room unit); executive protection (LATER, Cap · Pin · Room).
  (content/source/anticam/pitch-deck-build.js#L308-L313)
- The Mastery plan names the same communities in Alex's own words: travelers securing private
  rentals, parents, and high-profile individuals facing invasive paparazzi.
  (content/source/anticam/mastery-learning-plan/text.md#page-2, #page-3)
- The stated reason travelers come first: dim indoor rooms are where IR saturation is strongest and
  the pin already works there; travel forums are a dense, reachable channel; a rented bedroom is the
  least controversial place to be invisible.
  (content/source/anticam/pitch-deck-build.js#L371)

**Work to date**

- Two years, 30+ prototypes, four major versions, tested against a live doorbell camera — the
  traction line used in both the deck and the outline.
  (content/source/anticam/pitch-deck-outline.md#L3;
  content/source/anticam/pitch-deck-build.js#L446)
- The résumé, the preferred source when readers disagree, states the same counts: "Tested & refined
  (30+ Prototypes & four major iterations). Built website & launch strategy."
  (content/source/resume/resume-current.png)
- Non-hardware work listed alongside the prototypes: website and launch strategy built; ethics and
  legality research (2025); a faculty-sponsored Mastery project covering optics and engineering;
  doorbell-camera test passed. (content/source/anticam/pitch-deck-build.js#L461)
- The Mastery Learning System project (2/11/25–5/6/25) set the cap as its final deliverable: a
  working baseball-cap AntiCam with flash light-detection triggering the IR lights, retroreflective
  material in the hat lining, proper lighting conditions for activation, a safe recharging system, a
  comfortable design, and an accompanying circuit diagram for recreation and manufacture.
  (content/source/anticam/mastery-learning-plan/text.md#page-1, #page-3)
- In that plan Alex states every prototype to that point was unusable for consumers, either lacking
  functionality or having an impractical design, and names the four problems the project set out to
  fix: blocking paparazzi cameras, working in more lighting conditions, a usable form factor, and
  ease of daily use. (content/source/anticam/mastery-learning-plan/text.md#page-1)
- The AntiCam pitch deck was prepared as a TroyLabs BUILD application for Fall 2026 and asks for an
  eight-week program with milestones at weeks 2, 4, 6 and 8.
  (content/source/anticam/pitch-deck-build.js#L107, #L596)

---

### 3.2 Statistics

Per root CLAUDE.md, AntiCam statistics come only from
`content/source/anticam/pitch-deck-outline.md`, with that file's sources. Everything below is
either from the outline's Sources block (with its URL) or explicitly marked as a founder
estimate / derived figure / TBD.

**Sourced external statistics** (all from content/source/anticam/pitch-deck-outline.md#L33-L43)

| Statistic | Source and citation |
|---|---|
| 47% of Americans have found a camera at a vacation rental, up from 25% in 2023 (n=1,050, June 2025) | IPX1031, *2025 Vacation Rental Study on Hidden Cameras & Guest Privacy* — https://www.ipx1031.com/surveillance-rental-study/ |
| 58% worry about hidden cameras where they stay | IPX1031 — https://www.ipx1031.com/surveillance-rental-study/ |
| 64% don't know how to detect a hidden camera | IPX1031 — https://www.ipx1031.com/surveillance-rental-study/ |
| 55% of hosts surveyed admit to indoor cameras | IPX1031 — https://www.ipx1031.com/surveillance-rental-study/ |
| ~537,000 surveillance cameras across the 50 largest U.S. cities (updated Jan 2024) | Comparitech — https://www.comparitech.com/blog/vpn-privacy/us-surveillance-camera-statistics/ |
| 11 surveillance cameras per 1,000 people, 50 largest U.S. cities | Comparitech — https://www.comparitech.com/blog/vpn-privacy/us-surveillance-camera-statistics/ |
| 70,882 surveillance cameras in New York City | Comparitech — https://www.comparitech.com/blog/vpn-privacy/us-surveillance-camera-statistics/ |
| Use, marketing, sale and import of jammers are illegal (Communications Act §302(b), §333); penalties include seizure and imprisonment | FCC, *Jammer Enforcement* — https://www.fcc.gov/general/jammer-enforcement |
| Airbnb banned indoor security cameras effective Apr 30, 2024 | Airbnb Help Center — https://www.airbnb.com/help/article/3061 |
| Deepfake fraud up more than 10× from 2022 to 2023 | Security.org citing Sumsub — https://www.security.org/resources/deepfake-statistics/ |
| 60.92M U.S. short-term-rental users (2022); rounded to 61M in the deck | ConsumerAffairs citing AirDNA — https://www.consumeraffairs.com/movers/short-term-rental-statistics.html |
| 207M short-term-rental nights (2023) | ConsumerAffairs citing AirDNA — https://www.consumeraffairs.com/movers/short-term-rental-statistics.html |
| 33.6M U.S. families with children under 18 (2025) | U.S. Census via FRED — https://fred.stlouisfed.org/series/TTLFMCU |
| 1.5M+ Americans are full-time digital creators (April 2025) | IAB via RouteNote — https://routenote.com/blog/digital-creators-economy-growth-report-2025/ |
| Hidden-camera detection device market $189.8M (2025) → $487.1M (2033), 12.5% CAGR | Cognitive Market Research — https://www.cognitivemarketresearch.com/hidden-camera-detection-device-market-report |
| Reflectacles anti-surveillance eyewear priced $48–$228 | Reflectacles order page — https://www.reflectacles.com/order |
| Adversarial-fashion patterns lose effectiveness as recognition algorithms evolve | Reason, Jul 20, 2026 — https://reason.com/2026/07/20/privacy-minded-fashion-aims-to-baffle-facial-recognition/ |
| TroyLabs BUILD: 8 weeks, 5–6 startups, a team of 6 across divisions (PM, Finance/VC, Design, Engineering, Demo Ops, Marketing), ending in a LAUNCH pitch | TroyLabs — https://usctroylabs.com/build |

**Derived market sizing** — arithmetic on the sourced numbers above, not itself a cited statistic.
(content/source/anticam/pitch-deck-build.js#L274-L276)

- TAM: 61M people → $3.4B at a $55 device. ($55 is the figure the deck uses and calls the midpoint
  of the Cap price range, though the midpoint of $40–65 is $52.50 — TODO(alex): confirm the $55
  device price before any TAM/SAM/SOM number is published; the deck notes its bars are not to scale.)
- SAM: 35M people, the 58% of 61M who worry → $1.9B.
- SOM: 35K units, stated as 1 in 1,000 of the SAM over three years → ~$1.9M in first sales.
  **Founder assumption — no external source.**

**Founder estimates and TBD figures** — must be labeled as estimates anywhere they appear.

- Estimated BOM $15–25 per unit at low volume. **ESTIMATE / TBD** — the outline asks for it to be
  replaced with real part costs. (content/source/anticam/pitch-deck-build.js#L426;
  content/source/anticam/pitch-deck-outline.md#L49)
- Estimated gross margin ~55–65% at a $55 average price. **ESTIMATE / TBD**, same note.
  (content/source/anticam/pitch-deck-build.js#L427)
- Segment scores (0–3 on pain, reach, pays, fit today, ethics; totals out of 15) are explicitly
  the founder's own assessment, to be re-scored after BUILD customer interviews. **FOUNDER
  ASSESSMENT / TBD — do not present as data on the site.**
  (content/source/anticam/pitch-deck-build.js#L364;
  content/source/anticam/pitch-deck-outline.md#L47)
- $150K pre-seed split (40% tooling and a first 1,000-unit run; 25% engineering and compliance;
  20% go-to-market; 15% operations/legal/IP). **ILLUSTRATIVE placeholder**, labeled as such in the
  deck's own appendix. (content/source/anticam/pitch-deck-build.js#L626-L641)
- 25+ customer interviews and a 100-unit pilot are **plans for BUILD, not results.**
  (content/source/anticam/pitch-deck-build.js#L583, #L586)

**Figures in the deck that the outline's Sources block does not cover — do not publish as
statistics without a source**

- "2.5M U.S. rental listings (AirDNA, 2023)" — attributed to AirDNA in the deck, but the
  ConsumerAffairs/AirDNA source in the outline gives users and nights, not listings.
  (content/source/anticam/pitch-deck-build.js#L312)
- Hidden-camera detectors "$20–200" and RF jammers "hundreds to thousands of dollars" — no source
  in the outline. (content/source/anticam/pitch-deck-build.js#L148-L149)
- Near-infrared "roughly 700 to 1,000 nanometers" — speaker notes only, no citation.
  (content/source/anticam/pitch-deck-build.js#L214)
- All statistics in the ethics essay (70 captures/day; 18,000 NYC cameras; 60% worried;
  one-quarter have found cameras) are **off-limits** under the root CLAUDE.md rule. Where they
  overlap with the outline, the outline's sourced versions differ — e.g. the essay's 18,000
  facial-recognition cameras in NYC, which is not the same count as Comparitech's 70,882
  surveillance cameras. (content/source/anticam/ethics-of-tully-tech/text.md#page-5,
  #page-6)

---

### 3.3 Ethics framing

Source: `content/source/anticam/ethics-of-tully-tech/text.md`, a 9-page essay dated May 11, 2025.

**Do not quote or closely paraphrase any sentence from this essay on the site.** It is school
coursework containing typos, statistics cited to popular sources outside the approved list (KDVR
2018, Safe Home) plus one uncited figure, and lay legal assertions. Use the argument points
and vocabulary below, rewritten. The essay contains no images.

*Neutral facts about the document*

- Alex wrote a 9-page ethics essay on AntiCam in May 2025.
  (content/source/anticam/ethics-of-tully-tech/text.md#page-1)
- The deck lists "Ethics & legality research, 2025" as completed traction.
  (content/source/anticam/pitch-deck-build.js#L461)
- The essay frames release ethics as "the founder's responsibility", in the third person; it never
  self-identifies Alex as the founder. (content/source/anticam/ethics-of-tully-tech/text.md#page-9)

*Argument points available to the site (ideas, not sentences)*

1. **A zone, not a kill switch.** The device removes the person from the frame; it does not remove
   the camera from service. This is the single most reusable idea in the essay.
   (content/source/anticam/ethics-of-tully-tech/text.md#page-3)
2. **Harmless by physics.** Light rather than radio; nothing damaged, nothing disabled, no other
   technology interfered with. (content/source/anticam/ethics-of-tully-tech/text.md#page-3, #page-4)
3. **Defined against jammers.** Jammers work on the 2.4–5.0 GHz bands that phones, emergency calls
   and other systems share, and are federally restricted with fines, seizure and criminal
   penalties; AntiCam does not touch those bands.
   (content/source/anticam/ethics-of-tully-tech/text.md#page-2, #page-3)
4. **A third option.** The essay's setup is that today's only real choices are isolation or an
   illegal device. (content/source/anticam/ethics-of-tully-tech/text.md#page-1)
5. **Physical privacy, not data privacy.** The category the essay claims.
   (content/source/anticam/ethics-of-tully-tech/text.md#page-5)
6. **Price as access.** Under $100 versus jammers at hundreds to thousands — framed as protection
   available to everyone, not only to the wealthy.
   (content/source/anticam/ethics-of-tully-tech/text.md#page-5)
7. **Named beneficiaries.** Travelers and renters; public figures facing paparazzi and flash
   photography; reporters and activists under authoritarian surveillance.
   (content/source/anticam/ethics-of-tully-tech/text.md#page-6, #page-8)
8. **Honest about limits.** The essay states unprompted that the IR emission is weaker in daylight.
   (content/source/anticam/ethics-of-tully-tech/text.md#page-4)
9. **Names the hardest objection against itself.** The essay concedes that blocking public cameras
   can work against public safety regardless of intent, and separates contexts: a rented room or a
   paparazzi encounter versus a public street.
   (content/source/anticam/ethics-of-tully-tech/text.md#page-7)
10. **A stated use policy.** No use where surveillance is necessary (airports given as the
    example); no blocking traffic cameras; no concealing identity during an illegal act; intent
    communicated at both the purchasing and the manufacturing stage.
    (content/source/anticam/ethics-of-tully-tech/text.md#page-4)
11. **Responsibility sits with the user, and release sits with the founder.** Misuse is attributed
    to the person rather than the device; the release argument is that the underlying technology is
    not new and is already replicable.
    (content/source/anticam/ethics-of-tully-tech/text.md#page-5, #page-9)

*Vocabulary the essay and deck share* (safe to reuse as vocabulary, not as sentences): harmless by
physics; legal by design; light, not radio; physics, not patterns; blinds the camera, not the
network; built to protect people, not to hide crimes; honest about limits; control when you're
seen; privacy you can wear.
(content/source/anticam/pitch-deck-build.js#L104, #L172, #L501, #L502, #L522, #L524, #L525, #L612)

*Do not publish as legal advice.* The essay's assertion that no law currently prohibits creating or
using the device is an unsourced student opinion. The site should describe the mechanism — light
only, no radio emission, no jamming, no damage — and let the reader draw the inference.
(content/source/anticam/ethics-of-tully-tech/text.md#page-4)

---

### 3.4 Versions timeline

**Four major versions, as the deck states them**
(content/source/anticam/pitch-deck-build.js#L449-L452)

| Version | Name | What changed |
|---|---|---|
| V1 | Proof of physics | Single IR module and coin cells. Confirmed that cameras see the emission and eyes do not. |
| V2 | First enclosure | A laser-cut housing turned the module into something carryable. |
| V3 | Clip-on device | Branded enclosure with a charging port; tested against real cameras. |
| V4 | Pin V2 + Cap V2 | Clear pin and an under-brim cap array; this generation passed the doorbell-camera test. |

**Build steps documented photographically in the Camera Blinder deck**
(content/source/anticam/camera-blinder-presentation/text.md#page-7 through #page-17)

1. Light Test 1 — out-of-focus photo of alligator-clip leads and component bags; no LED visible. Not
   usable as a test image. (page-07.jpg)
2. First Prototype — laser-cut discs, a clear disc holding four coin cells, a 3D-printed ring
   battery holder, a COB LED module. (page-08.jpg)
3. Test 2 — the LED lit and photographed, reading magenta to the camera, powered from a bench
   supply. (page-09.jpg)
4. Second Prototype — laser-cut MDF plates with the Tully Tech logo engraved, cut on a laser
   cutter. (page-10.jpg)
5. Third Prototype — layered acrylic with ten hand-soldered coin cells (4 + 4 + 2) wire-linked, plus
   a separate plate with copper-tape bus bars. (page-11.jpg)
6. Final Prototype V1 — 3D-printed case with a black rim and maroon body, engraved frosted acrylic
   lid, emitter face showing rows of magenta IR dies (unlit). (page-12.jpg)
7. Process V2 — six clear laser-cut acrylic plates, four coin cells plus a slide switch, engraved
   lid. (page-13.jpg, page-14.jpg)
8. Final Prototype V2 — two-tier 3D-printed cases in white, dark gray and navy. (page-15.jpg)
9. Doorbell-camera test — Ring night-vision frame, 06/07/2023 22:31:53 EDT. (page-15.jpg)
10. Hat Version 2 — black cap with small LEDs set into the brim underside over an iridescent
    lining. (page-17.jpg)

**Dated milestones**

| When | What | Source |
|---|---|---|
| June 7, 2023 | Pin prototype tested against a live Ring doorbell camera at night; frames captured from the camera's own app | camera-blinder-presentation/pages/page-15.jpg; pitch-deck-build.js#L236 |
| 2/11/25 | Mastery Learning System AntiCam project start | mastery-learning-plan/text.md#page-3 |
| 3/5/25 | Gantt chart completion (planned) | mastery-learning-plan/text.md#page-3 |
| 4/30/25 | Key milestone dates (planned) | mastery-learning-plan/text.md#page-3 |
| 5/4/25 | Mid-project check-in (planned) | mastery-learning-plan/text.md#page-3 |
| 5/6/25 | Final deliverable due: working baseball-cap AntiCam plus circuit diagram | mastery-learning-plan/text.md#page-3 |
| 2025 | Ethics and legality research completed; 9-page ethics essay dated May 11, 2025 | pitch-deck-build.js#L461; ethics-of-tully-tech/text.md#page-1 |
| 10/30/2025 | Faculty sponsor sign-off, Forces/Waves element | mastery-learning-plan/text.md#page-3 |
| 3/29/2026 | Faculty sponsor sign-offs, Global Mindset and Engineering elements | mastery-learning-plan/text.md#page-3 |
| Fall 2026 | AntiCam pitch deck prepared as a TroyLabs BUILD application | pitch-deck-build.js#L107 |
| Planned, weeks 2/4/6/8 of BUILD | Interviews done; works-like V5; waitlist live; LAUNCH pitch | pitch-deck-build.js#L596 |

---

### 3.5 Suggested images

All paths are source files. Copy an optimized version into `public/images/anticam/` before use.
None of these are cleared for publication yet — see the image TODO(alex) lines below.

**Hero candidates**

- `content/source/anticam/camera-blinder-presentation/pages/page-12.jpg` — Final Prototype V1, LED
  face: white plate, rows of magenta IR emitter dies (unlit), black rim, maroon body, isolated on a
  light background (right-upper region of the page). The strongest clean product shot; page-09.jpg
  is the only real IR-glow shot.
  **Use:** page hero, or the AntiCam card on the home page.
- `content/source/anticam/camera-blinder-presentation/pages/page-09.jpg` — the lit COB LED seen by
  a camera as a bright magenta square inside a pink halo (left half of the page). Abstract, no
  text. **Use:** full-bleed background behind the "how it works" section, or the source of the
  IR-pink accent.

**Mechanism section**

- `content/source/anticam/camera-blinder-presentation/pages/page-17.jpg` — the Hat Version 2
  brim underside: about six small LEDs set into an iridescent lining (center-bottom of the page).
  **Use:** the single image that shows the emitter array and the reflective lining together, beside
  the mechanism steps. Crop away the two plain black cap views, which look like stock product
  photography.
- `content/source/anticam/camera-blinder-presentation/pages/page-14.jpg` — the COB LED module held
  in hand: white ceramic body, 3×3 emitter grid, solder tabs (right column of the page).
  **Use:** the "what the emitter actually is" inset, or a tall side image.

**Proof section**

- `content/source/anticam/camera-blinder-presentation/pages/page-15.jpg` — the Ring night-vision
  frame (lower two-thirds of the page): night street, a bright wash where a figure stands,
  ring.com watermark top-left, timestamp 06/07/2023 22:31:53 EDT bottom-right. **Use:** the proof
  image. Keep the timestamp visible so the frame carries its own date, or crop the street. This
  page also carries the three V2 case colorways along its top row, usable as small product
  variants.
- `content/source/anticam/camera-blinder-presentation/pages/page-16.jpg` — a full-bleed color night
  frame of the same street with no glow, titled "FINAL PIN PROTOTYPE V2". **Use:** the "AntiCam
  off" half of a before/after pair, once Alex confirms which frame is which. Crop past x≈400 to
  drop the baked-in slide title.

**Build / process section**

- `content/source/anticam/camera-blinder-presentation/pages/page-13.jpg` — the V2 flat-lay: six
  clear acrylic plates including the LED plate, the battery-and-switch plate, and the engraved lid,
  on white (left-lower region). **Use:** exploded-parts image for the versions timeline.
- `content/source/anticam/camera-blinder-presentation/pages/page-10.jpg` — the Second Prototype
  flat-lay of laser-cut MDF plates, plus the laser cutter engraving the Tully Tech logo.
  **Use:** fabrication card in the timeline.
- `content/source/anticam/camera-blinder-presentation/pages/page-11.jpg` — the ten-coin-cell
  battery plate with copper-tape bus bars and soldered links. **Use:** the "hand-built" detail in
  the timeline.
- `content/source/anticam/camera-blinder-presentation/pages/page-08.jpg` — the First Prototype
  exploded stack (tall strip down the right side of the page). **Use:** V1 in the timeline.

**Product formats**

- `content/source/anticam/camera-blinder-presentation/pages/page-15.jpg` (top row) — the three V2
  pin cases, white / dark gray / navy. **Use:** the Pin card.
- `content/source/anticam/camera-blinder-presentation/pages/page-02.jpg` (bottom-right) — the same
  Final Prototype V1 pin unit shown on page-12.jpg, placed beside the "Room Device" caption. It is
  NOT a room-unit prototype; there is no room-unit photo in any source. Do not use it as the Room
  Unit card.

**Reference only, do not publish**

- `content/source/resume/resume-current.png` — the AntiCam thumbnail is a commercial sports
  championship cap with third-party branding visible; the page also carries Alex's phone number.
  Reference only.
- `content/source/anticam/camera-blinder-presentation/pages/page-01.jpg` — stock electromagnetic
  spectrum diagram and a stock-looking LED array photo; third-party imagery.
- `content/source/anticam/camera-blinder-presentation/pages/page-18.jpg` — Tully Tech logo and a QR
  code to an older Wix site. Logo useful as a brand reference only.
- `content/source/anticam/mastery-learning-plan/pages/page-01.jpg` … `page-03.jpg` — plain form
  text, no visuals.
- `content/source/anticam/ethics-of-tully-tech/pages/` — plain essay body text, no visuals.

**Missing assets.** The pitch-deck build script references an `assets/` folder that is not in the
repo, including `pin_v2_cut.png`, `cap_front_cut.png`, `cap_side_cut.png`, `cap_under_cut.png`,
`ir_glow.jpg`, `ring_off.jpg`, `ring_on.jpg`, `ring_on_zoom.jpg`, and `proto_v1.jpg`–`proto_v4.jpg`.
These are the clean, cut-out versions of the images above and would be the best assets for the site.
(content/source/anticam/pitch-deck-build.js#L5)

---

### 3.6 Open questions

TODO(alex): Room Unit price — root CLAUDE.md, the outline storyline and the deck's own product-slide
headline all say every format is "under $100", but the Room Unit card and the outline's slide table
both say "$100+". Confirm which is right; the site currently cannot say "all under $100".
(content/source/anticam/pitch-deck-build.js#L400, #L405;
content/source/anticam/pitch-deck-outline.md#L3, #L23)

TODO(alex): Project age — the Mastery plan already says "over the past two years" at its 2/11/25
start, the Fall 2026 deck still says "two years", and the doorbell test is dated June 2023. Pick one
figure for the site; on the deck's own evidence the project is three or more years old.
(content/source/anticam/mastery-learning-plan/text.md#page-1;
content/source/anticam/pitch-deck-build.js#L446, #L236)

TODO(alex): Version numbering — the deck calls V4 "Pin V2 + Cap V2" and says that generation passed
the doorbell test, but the Pin V2 test is dated June 2023 and the Camera Blinder deck shows only V1
and V2 plus "Hat Version 2". Confirm how the Camera Blinder V1/V2 map onto the deck's V1–V4, and
what the exact count behind "30+ prototypes" is.
(content/source/anticam/pitch-deck-build.js#L452;
content/source/anticam/camera-blinder-presentation/text.md#page-15, #page-17)

TODO(alex): Doorbell frames — confirm that the black-and-white night-vision frame is "AntiCam on"
and the color frame is "AntiCam off", that both are from the same session on 06/07/2023, and that
the person in the frame is you. The outline raises the same question.
(content/source/anticam/pitch-deck-outline.md#L48)

TODO(alex): Is the Ring frame cleared to publish? It shows a residential street and a person;
consider cropping or blurring.
(content/source/anticam/camera-blinder-presentation/pages/page-15.jpg)

TODO(alex): The ethics quote used on the deck's responsible-design slide — attributed to "Alex
Tully, Ethics of Tully Tech (2025)" — does not appear anywhere in
`content/source/anticam/ethics-of-tully-tech/text.md`. Verified by search. Do not publish it as a
quote from the essay until you confirm its origin.
(content/source/anticam/pitch-deck-build.js#L530)

TODO(alex): Coating or lining? The essay says the retro-reflective element is a "coating"; the deck,
the outline and root CLAUDE.md say "lining"; the Mastery plan says retroreflective materials built
into the hat lining. These describe different physical things.
(content/source/anticam/ethics-of-tully-tech/text.md#page-3;
content/source/anticam/mastery-learning-plan/text.md#page-1;
content/source/anticam/pitch-deck-outline.md#L3)

TODO(alex): IR eye-safety — the deck lists IR eye-safety testing and certification as future work.
The site must not imply the device is certified safe, and should not repeat the essay's absolute
safety claim. (content/source/anticam/pitch-deck-build.js#L581;
content/source/anticam/ethics-of-tully-tech/text.md#page-4)

TODO(alex): Emitter specifications — no source gives wavelength (850 nm? 940 nm?), LED count,
power, battery run time, or range for any version. The near-IR "700 to 1,000 nanometers" line is
uncited speaker notes. Provide real numbers or the mechanism copy stays qualitative.
(content/source/anticam/pitch-deck-build.js#L214)

TODO(alex): Battery details — coin-cell type (LR44?), four cells in V1/V2 versus ten in the third
prototype, and run time per version.
(content/source/anticam/camera-blinder-presentation/pages/page-08.jpg, page-11.jpg)

TODO(alex): Is the red unit on Camera Blinder slide 2 a working room-unit prototype? It sits beside
the Room Device caption but is unlabeled, and it is the only room-unit image in the sources.
(content/source/anticam/camera-blinder-presentation/pages/page-02.jpg)

TODO(alex): Are the Hat Version 2 photos of a real prototype or a mockup on stock cap images? Two
of the four views show no hardware at all.
(content/source/anticam/camera-blinder-presentation/pages/page-17.jpg)

TODO(alex): Provide a clean AntiCam cap photo. The résumé thumbnail is a commercial sports
championship cap with third-party branding baked in.
(content/source/resume/resume-current.png)

TODO(alex): Origin story — the deck says AntiCam started when a friend's private moment was posted
online without consent. It involves a third party; confirm it is cleared to publish.
(content/source/anticam/pitch-deck-build.js#L119)

TODO(alex): Real BOM and margin figures, to replace the $15–25 and 55–65% founder estimates.
(content/source/anticam/pitch-deck-outline.md#L49)

TODO(alex): Segment scoring table is the founder's own assessment and is to be re-scored after BUILD
interviews. Confirm it stays off the site.
(content/source/anticam/pitch-deck-outline.md#L47)

TODO(alex): Sources for "2.5M U.S. rental listings (AirDNA, 2023)", the detector price range
"$20–200", and the jammer price range; otherwise these are dropped.
(content/source/anticam/pitch-deck-build.js#L148, #L149, #L312)

TODO(alex): Mastery plan dates — the project runs 2/11/25–5/6/25 but the sponsor sign-offs are dated
10/30/2025 and 3/29/2026, after the final deliverable was due, and the file title reads "(2025–2026)".
Confirm the real dates, and whether the cap deliverable (flash-triggered IR, retroreflective lining,
recharging, circuit diagram) was actually completed.
(content/source/anticam/mastery-learning-plan/text.md#page-3)

TODO(alex): Should the Mastery sponsors' names (Shorr, Mr. Field) appear on the site? Recommend
omitting them; "faculty-sponsored" carries the same weight.
(content/source/anticam/mastery-learning-plan/text.md#page-3)

TODO(alex): Was the deck submitted to TroyLabs BUILD, and what was the outcome? Root CLAUDE.md
states Fall 2026 BUILD, PM division; the deck is framed as an application.
(content/source/anticam/pitch-deck-build.js#L107)

TODO(alex): Old site — Camera Blinder slide 18's QR code resolves to an older Wix AntiCam page. Is
it still live, and should the site link only to tullytech.com?
(content/source/anticam/camera-blinder-presentation/pages/page-18.jpg)

TODO(alex): Locate the missing deck `assets/` images (clean cut-outs of the pin, cap, IR glow,
Ring frames and V1–V4 prototype photos). They would be the best assets for the site.
(content/source/anticam/pitch-deck-build.js#L5)

TODO(alex): The deck's founder slide claims "four small businesses started before high school" and
"a decade of building things that ship"; root CLAUDE.md confirms only the eight commercial websites.
Confirm before either line is used on the AntiCam page.
(content/source/anticam/pitch-deck-build.js#L549, #L558)

TODO(alex): The outline's storyline paragraph credits Alex with "published fabrication software".
Root CLAUDE.md is explicit that the CeraPiper CAD paper is under anonymous review and must not be
called published. Do not carry that phrasing over from the outline.
(content/source/anticam/pitch-deck-outline.md#L3)

TODO(alex): Confirm whether "CB" in the Camera Blinder deck stood for Camera Blinder, and when the
name became AntiCam. The slide text never says AntiCam; only the QR URL does.
(content/source/anticam/camera-blinder-presentation/text.md#page-1;
content/source/anticam/camera-blinder-presentation/pages/page-18.jpg)
