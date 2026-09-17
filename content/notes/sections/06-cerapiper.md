## 6. Featured: CeraPiper

**Role:** Research Intern. The résumé entry reads "Cera Piper (Cornell Tech x Technion) — Research
Intern" and states that he worked with Cornell Tech and Technion to develop CAD and slicing software
for a custom ceramic printer. No CeraPiper source document names Alex or states which parts of the
system he built — see the authorship subsection and the TODO(alex) lines below.
(content/source/resume/resume-current.png; CLAUDE.md — Featured work)

**Dates:** Summer 2026. (content/source/resume/resume-current.png; CLAUDE.md — Featured work)

**One line:** CeraPiper is a CAD tool and fabrication system for designing and extruding custom
hollow ceramic pipes that assemble into structures which cool a space by evaporating water.
(content/source/cerapiper/README.md#about-the-project)

**Name to publish:** CeraPiper, one word, as the project's own README spells it. The résumé writes it
"Cera Piper"; the résumé also misspells Cornell as "Conell" in the body text.
(content/source/cerapiper/README.md#about-the-project; content/source/resume/resume-current.png)
The README prose spells the tool "CeraPiper", but the repository, the live-site URLs, and the app's
own title bar all read "CeraPipes" / "cerapipe" — so any link label on the site will differ from the
project name; see the name-spelling TODO in 6.10.

---

### 6.1 Role, affiliation, and authorship — exactly what the documents say

**What the résumé says**

- The entry is "Cera Piper (Cornell Tech x Technion) — Research Intern, Summer 2026"
  (content/source/resume/resume-current.png).
- The résumé describes the work as developing CAD and slicing software for a custom ceramic printer
  that prints pipes allowing sustainable active room cooling without electricity
  (content/source/resume/resume-current.png).
- The résumé's forward-looking line is that a research paper is eventually being written and approved
  by the SCF research conference. It does not claim a paper is published and does not name Alex as an
  author (content/source/resume/resume-current.png).

**What the project documents say**

- "Tully", "Cornell" and "Technion" appear nowhere in either `content/source/cerapiper/README.md` or
  the paper draft; "Alex" occurs only inside other researchers' names in the draft's bibliography
  (Alexander Teibrich, Jason Alexander) and "intern" only inside words like "internal" and
  "International" — verified by whole-file grep across both files
  (content/source/cerapiper/README.md; content/source/cerapiper/user-study-paper/text.md).
- The README has no authors, contributors, or acknowledgments section; its only attribution is to the
  Matter of Tech Lab (content/source/cerapiper/README.md#contact).
- The paper draft's byline is "Anonymous Author(s)", because the draft is under anonymous review, so
  no author list exists in the file to check against
  (content/source/cerapiper/user-study-paper/text.md#page-1).
- The only human names attached to the project itself are the authors of the earlier, published CAM
  paper: Ofer Berman, Ethan Zhi Ming Seiz, and Thijs Roumen. Alex is not among them. (The draft's
  bibliography names dozens of unrelated researchers, and the README names Benoit Blanchon as the
  ArduinoJson author; the README's "ofer mode" setting is the only in-project echo of a named
  person.) (content/source/cerapiper/user-study-paper/text.md#page-16, reference [10]).
- The only institution named in the CeraPiper sources is the Matter of Tech Lab. The paper draft
  refers to the authors' university without naming it, and redacts the interview language as a
  placeholder for review (content/source/cerapiper/README.md#contact;
  content/source/cerapiper/user-study-paper/text.md#page-9, #page-10).
- The README describes the whole system as one piece of work and attributes no component to any
  individual (content/source/cerapiper/README.md#implementation).

**Consequence for the site.** Until Alex answers the TODOs in 6.10, the strongest role line the
sources support is the résumé's own: research intern, summer 2026, Cornell Tech x Technion, working
on the CAD and slicing software. The site must not claim authorship of either paper, and must not
attribute any specific layer of the system to Alex.
(content/source/resume/resume-current.png; content/source/cerapiper/README.md)

---

### 6.2 What the system is

**The problem it addresses**

- Evaporative cooling with ceramics is a low-cost, energy-efficient alternative to conventional air
  conditioning but has lacked accessible computational design tools; CeraPiper couples real-time
  control of extrusion geometry with a professional CAD environment
  (content/source/cerapiper/README.md#about-the-project).
- Users compose whole assemblies — pipes, ribs, curves, branches, and plug-and-socket connectors — as
  parametric features, and the tool translates the design into machine instructions for a
  shape-shifting die mounted on a commercial clay pug mill
  (content/source/cerapiper/README.md#about-the-project).
- The extruded segments assemble into modular cooling devices, described in the README as
  chandelier-style units, that passively cool their surroundings through water evaporation
  (content/source/cerapiper/README.md#about-the-project).

**Three software layers plus one physical artifact**

The README organizes the system as three layers, each named with its technology. That numbered stack
is the clearest structure for a technical section on the site.
(content/source/cerapiper/README.md#implementation)

**1. Design layer — Onshape, FeatureScript.**

- Custom parametric features are written in Onshape's FeatureScript: ribbed straight pipes, ribbed
  curved pipes, perpendicular branch pipes, plug-and-socket connectors, junction collars, and a
  linear pattern; all share a common library of fabrication constants
  (content/source/cerapiper/README.md#implementation).
- All profiles are hexagonal, matching the die geometry
  (content/source/cerapiper/README.md#implementation).
- Each feature encodes machine knowledge as one of three kinds of design-time constraint
  (content/source/cerapiper/README.md#implementation):
  - **Hard constraints** restrict parameters to fabricable values: enumerated inner diameters (die
    mandrel sizes), outer diameters bounded to 40–78 mm, profile rotation limited to 30° increments
    that preserve hex alignment, and segment lengths capped at the 800 mm conveyor bed minus the
    fixed 60 mm start and end pieces (content/source/cerapiper/README.md#implementation).
  - **Corrective constraints** repair invalid input instead of rejecting it: a ribbed pipe snaps its
    length to whole rib increments (rib width plus gap) and reports the adjustment, so extrusion
    never terminates mid-rib (content/source/cerapiper/README.md#implementation).
  - **Advisory constraints** surface fabrication risk without blocking the design: an unsupported
    span beyond 150 mm triggers a sag warning and turns the geometry red in the viewport
    (content/source/cerapiper/README.md#implementation).

**2. Translation middleware — Python, Flask.**

- The middleware queries the Onshape feature tree through the REST API and reconstructs the assembly
  as a directed graph whose nodes are fabrication primitives and whose edges are connector
  dependencies (content/source/cerapiper/README.md#implementation).
- Because ceramic extrusion is a continuous, sequential process, the middleware traverses the graph
  depth-first to linearize each branch into a contiguous extrusion sequence, splitting long runs at
  the conveyor-bed limit and splitting the assembly at perpendicular junctions that are completed by
  hand in post-processing (content/source/cerapiper/README.md#implementation).
- The result is serialized into a JSON Function Stack — a procedural recipe of primitives and
  parameters — which the interface renders in a WebGL 3D preview and a 2D cross-section, and from
  which it generates a printable bed blueprint
  (content/source/cerapiper/README.md#implementation).
- Bounding-box queries are requested only at topological intersections, to stay within Onshape API
  rate limits (content/source/cerapiper/README.md#implementation).

**3. Fabrication backend — CeraPiper, Arduino (C++).**

- The middleware transmits the compiled Function Stack over a USB serial link to an Arduino, whose
  firmware maps primitives to motor steps and actuator outputs, regulates the feed rate of the clay
  pug mill, and drives the shape-shifting die
  (content/source/cerapiper/README.md#implementation).
- The firmware independently re-enforces mechanical thresholds, including the bed-length limit, as a
  safety layer, so violations are also caught at the machine
  (content/source/cerapiper/README.md#implementation).

**4. The printed paper blueprint (the physical layer).**

- CeraPiper prints a 20 cm-wide paper blueprint on a standard plotter
  (content/source/cerapiper/README.md#the-paper-blueprint).
- The sheet runs continuously along the conveyor bed beneath the freshly extruded clay, carrying
  localized design decisions alongside the material: which part is being extruded, where the clay is
  cut into fabricable segments, the mandrel size in use, and where holes must be hand-cut to receive
  perpendicular connectors (content/source/cerapiper/README.md#the-paper-blueprint).
- The blueprint has nine toggleable layers: grid and crop marks, part name/number, section outline,
  cut lines and connector cut-outs, fold guides and mandrel size, section highlights, notes, clay top
  view, and piece IDs — so a designer prints exactly the guidance they want on the shop floor
  (content/source/cerapiper/README.md#the-paper-blueprint).
- Each bed keeps its own part name, number, and notes
  (content/source/cerapiper/README.md#the-paper-blueprint).
- Some makers keep the sheet beside the extrusion; others extrude directly onto it
  (content/source/cerapiper/README.md#the-paper-blueprint).

**The interface**

- A tab bar splits the design into fabricable beds: Main, branches, and a Perpendicular Connectors
  bed (content/source/cerapiper/README.md#implementation, cad-interface caption).
- The 3D viewport offers a straight view (pipes as extruded) and a curved view (simulated bending)
  (content/source/cerapiper/README.md#implementation).
- A Components panel lists every primitive, with most parameters editable inline
  (content/source/cerapiper/README.md#implementation).
- An interactive bed blueprint of the design is printed to guide extrusion and post-processing
  (content/source/cerapiper/README.md#implementation).
- The editor loads a design straight from Onshape (paste a file URL or element ID, or enable "Load
  from Onshape API" in Settings) or from a saved `.json` design file
  (content/source/cerapiper/README.md#installation).

---

### 6.3 From CAM to CAD — the reformulation

- CeraPiper began as a machine-facing CAM interface: a standalone editor organized around the
  extrusion sequence the machine performs, where the designer sequenced geometric primitives along a
  single axis (content/source/cerapiper/README.md#from-cam-to-cad).
- The README's framing of why the CAD layer exists: that interface made the process "controllable,
  but not designable" — makers reasoned about extrusion parameters in isolation and could not compose
  or evaluate the assembled object. This is README wording, not paper wording (whether the README's
  repository is public is unconfirmed — see the repo-visibility TODO in 6.10), and is the
  cleanest one-line explanation available for the site
  (content/source/cerapiper/README.md#from-cam-to-cad).
- The current tool recompiles that CAM workflow into a CAD one: each machine parameter is
  reformulated as an editable design element inside Onshape, so the assembled object — not the print
  sequence — becomes the primary representation
  (content/source/cerapiper/README.md#from-cam-to-cad).

The README's own two-column table is the most legible artifact in the source and translates directly
into a two-column block on the site. All values below are README values.
(content/source/cerapiper/README.md#from-cam-to-cad)

| The machine used to expose… | …now it's a design element |
|---|---|
| Die aperture travel | Outer diameter (40–78 mm), bounded to formable parts |
| Mandrel insert | Enumerated inner diameter (die mandrel sizes) |
| Extrusion duration | Length in millimeters, capped by the conveyor bed |
| Rib count, gap, width | Ribbed-pipe length that snaps to whole ribs |
| Rib spacing for bending | Curve radius and sweep angle |
| Instruction order | Derived automatically from how parts attach |
| Manual bed splitting | Automatic segmentation into fabricable tabs |
| Separate junction pieces | Branch feature with paired collars carrying carving marks |
| Duplicated stack entries | A single linear-pattern operation |
| Operator sag judgment | An advisory warning above a 150 mm unsupported span |

---

### 6.4 Numbers and constraints (all from the README; the two evaluation figures are not yet publishable)

| Figure | What it is | Source |
|---|---|---|
| 40–78 mm | Outer diameter bound (hard constraint) | (content/source/cerapiper/README.md#implementation, #from-cam-to-cad) |
| 30° increments | Profile rotation limit, preserving hex alignment | (content/source/cerapiper/README.md#implementation) |
| 800 mm | Conveyor bed length that caps segment length | (content/source/cerapiper/README.md#implementation) |
| 60 mm | Fixed start and end pieces subtracted from the 800 mm bed | (content/source/cerapiper/README.md#implementation) |
| 150 mm | Maximum unsupported span before the sag advisory fires | (content/source/cerapiper/README.md#implementation, #from-cam-to-cad) |
| 20 cm | Width of the printed paper blueprint | (content/source/cerapiper/README.md#the-paper-blueprint) |
| 9 | Toggleable blueprint layers | (content/source/cerapiper/README.md#the-paper-blueprint) |
| 3 | Software layers (Onshape/FeatureScript, Python/Flask, Arduino C++) | (content/source/cerapiper/README.md#implementation) |
| 3 | Kinds of design-time constraint (hard, corrective, advisory) | (content/source/cerapiper/README.md#implementation) |
| ~8–10% | Elevated relative humidity achieved by prototypes | (content/source/cerapiper/README.md#about-the-project — README does not name the source of this figure; DOI attribution unconfirmed, see TODO in 6.10) |
| 1.85 L / 60 hours | Water evaporated by prototypes | (content/source/cerapiper/README.md#about-the-project — README does not name the source of this figure; DOI attribution unconfirmed, see TODO in 6.10) |
| 1 API request | Typical Onshape requests per import after Version 2.1, down from one per part | (content/source/cerapiper/README.md#roadmap) |

- The README attributes the humidity and evaporation figures to technical evaluations of the
  underlying process, which also demonstrated repeatable geometric fidelity and measurable
  temperature reductions. The README does not say where those evaluations were reported, so the site
  cannot footnote them to the SCF 2025 paper until Alex confirms it (see TODO in 6.10)
  (content/source/cerapiper/README.md#about-the-project).
- The README gives no temperature-reduction number, only the word "measurable", so the site must not
  state one (content/source/cerapiper/README.md#about-the-project).

**Stack and dependencies** (useful for a skills line, all from the README)

- Prerequisites: Arduino Uno; Arduino IDE 2.3.3; ArduinoJson by Benoit Blanchon 7.4.2; Python 3;
  Flask 3.1.1; PySerial 3.5; plus Requests, NetworkX, python-dotenv, and Waitress for the Onshape
  integration (content/source/cerapiper/README.md#prerequisites).
- The app runs at `http://localhost:8000` (content/source/cerapiper/README.md#installation).
- All active application code lives under `development_copy/`; `app.py` is the Flask entry point and
  exposes `/`, `/settings`, `/extrude`, `/serial-log`, and `/api/generate-json`
  (content/source/cerapiper/README.md#file-structure).
- Backend modules: `api/main.py` (Onshape REST client, `normalize_feature_type`,
  `simulate_primitive`, `generate_extrusion_json`), `api/perpendicular_pipes.py` (branch expansion,
  host attachment, hole cut-outs), `api/matching.py` (map Onshape parts to primitives),
  `api/path_finding_logic.py` (dependency / bounding-box ordering graph, NetworkX),
  `api/test_main.py` (pytest suite with cached Onshape fixtures), `serial_communicator.py` (USB
  serial bridge), and `arduino/firmware_v3/firmware_v3.ino`
  (content/source/cerapiper/README.md#file-structure).
- Frontend: a p5.js (WEBGL + 2D) client — `geometry_builder.js`, `tabs.js` (per-bed tabs and the
  printable paper blueprint), `components.js`, `paperControls.js`, `utils.js`, `constants.js`,
  `state.js`, `primitiveSchema.js`, `stackManager.js`, `stackIntegration.js`, `ui.js`, `buttons.js`;
  templates: `index.html` (the main editor, a bento layout of 3D + Components and 2D + Paper Sheet
  Layers), `header.html` (shared toolbar), `settings.html` (kiln/conveyor configuration)
  (content/source/cerapiper/README.md#file-structure).

---

### 6.5 Version history

All dates and contents are from the README's roadmap. (content/source/cerapiper/README.md#roadmap)

| Version | Date | What shipped |
|---|---|---|
| Version 1 | 7/17/2025 | Submission to ACM SCF 2025 |
| Version 1.1 | 8/8/2025 | Fixes and new features |
| Version 2.0 | 12/20/2025 | Onshape integration, new features, bug fixes |
| Version 2.1 | 7/8/2026 | Correct extrusion order from Onshape, fewer API calls |
| Version 2.2 | 7/2026 (month only) | Branch junctions, ribbed branches, the printable paper blueprint |

- **Version 1 — 7/17/2025:** submission to ACM SCF 2025
  (content/source/cerapiper/README.md#roadmap).
- **Version 1.1 — 8/8/2025:** revamped the data structure representing the extrusion; added detection
  of an unsupported segment that is too long; 3D hinge and curve visualization (beta) with fixed
  dimension computations; editing of previous segments; a settings page for kiln dimensions (beta),
  Arduino serial logging, and "ofer mode"; fixed Arduino memory issues; rendered the machine; tested
  the CAD tool with the machine to confirm all primitives work as intended; cleaned up structure and
  documented the code (content/source/cerapiper/README.md#roadmap).
- **Version 2.0 — 12/20/2025:** implemented features and fixed bugs according to user-study feedback;
  full editing of primitives from the Function Stack; selecting a stack item highlights its location
  in the 3D and 2D views; CeraPiper became an in-app Onshape extension, so designs made in Onshape
  open automatically in CeraPiper for fabrication (content/source/cerapiper/README.md#roadmap).
- **Version 2.1 — 7/8/2026:** print order of imported designs now follows the order in which pipes
  were attached in Onshape (decoded from each feature's attachment reference), so branching designs
  print each branch as one contiguous chain; bounding boxes are now used only to position
  perpendicular attachments, with the old bounding-box ordering kept as a fallback; Onshape API
  requests per import greatly reduced, a typical design needing 1 request instead of one per part
  (content/source/cerapiper/README.md#roadmap).
- **Version 2.2 — 7/2026:** added the interactive paper blueprint (20 cm-wide bed instruction sheet
  with toggleable layers and per-bed part names, numbers, and notes); added an Extrude action that
  compiles the design and prints the bed tabs, plus a per-bed tabs panel in the header; perpendicular
  branch pipes now carve a matching hex hole in the host pipe, with the cut-out marked on the
  blueprint for hand-carving; ribbed profiles supported on perpendicular and branch pipes; fixed
  diameter and connector geometry for perpendicular connections; firmware refinements — corrected
  die-travel depth for rib crest timing and reversed the die direction to match the extrusion
  (content/source/cerapiper/README.md#roadmap).
- The roadmap gives Version 2.2 a month only, not a day, so any "shipped" date for the paper
  blueprint can only be July 2026 (content/source/cerapiper/README.md#roadmap).

**Next steps listed in the README**

- A calipered test print to reconcile the die-travel reference constants before merging
  (content/source/cerapiper/README.md#next-steps).
- Tighter integration with the surrounding Onshape environment, reusing native CAD commands
  (content/source/cerapiper/README.md#next-steps).
- Design the global 3D form first, then apply the primitives onto it — a recurring request from the
  user study (content/source/cerapiper/README.md#next-steps).

---

### 6.6 Study results, exactly as the README states them

Only the README's own account of the study is publishable. The larger study documented in the paper
draft cannot be cited while the draft is under review — see 6.7 and the TODO(alex) lines in 6.10.

- In a study with eight designers and makers, all eight reported they could focus on their design
  intent without attending to machine-specific detail
  (content/source/cerapiper/README.md#from-cam-to-cad).
- Seven of eight said the workflow felt like designing in a CAD environment rather than operating a
  machine (content/source/cerapiper/README.md#from-cam-to-cad).
- The die sizes were the constraint participants most often named as helping their design decisions
  (content/source/cerapiper/README.md#from-cam-to-cad).
- Version 2.0 implemented features and fixed bugs according to feedback from the user study, so the
  study preceded December 2025 in the roadmap's own sequence
  (content/source/cerapiper/README.md#roadmap). This does not by itself establish that the eight-person
  study and the study behind the draft are the same event — see TODO(alex).

---

### 6.7 Publication status and the review embargo

**Published (safe to cite):**

- The earlier, machine-facing CAM version of CeraPiper was published at ACM SCF 2025
  (content/source/cerapiper/README.md#from-cam-to-cad).
- DOI: https://doi.org/10.1145/3745778.3766644
  (content/source/cerapiper/README.md#from-cam-to-cad).
- Full citation, as given in the CAD draft's reference list: Ofer Berman, Ethan Zhi Ming Seiz, and
  Thijs Roumen. 2025. CeraPiper: Custom Extruded Ceramics for Heat Exchange. In Proceedings of the ACM
  Symposium on Computational Fabrication (SCF '25). ACM, New York, NY, USA, Article 11, 16 pages.
  doi:10.1145/3745778.3766644 (content/source/cerapiper/user-study-paper/text.md#page-16,
  reference [10]).
- Alex is not among those three authors (content/source/cerapiper/user-study-paper/text.md#page-16).

**Under anonymous review (hard rule for every downstream agent and for the site):**

- The paper documenting the CAD layer is a 20-page draft, bylined "Anonymous Author(s)" with
  placeholder ACM conference and DOI boilerplate, and it is under anonymous review
  (content/source/cerapiper/user-study-paper/text.md#page-1, #page-2; content/source/CLAUDE.md —
  cerapiper row; CLAUDE.md — Featured work).
- Therefore: **do not call it published, do not call it accepted, do not quote any sentence from it,
  do not reproduce, crop, or adapt any of its page images, and do not state its study's numbers on
  the site.** Use only `content/source/cerapiper/README.md` for publishable CeraPiper copy
  (content/source/CLAUDE.md — cerapiper row; CLAUDE.md — Featured work).
- `content/source/cerapiper/user-study-paper/` is gitignored and exists only on Alex's machine
  (CLAUDE.md — Source material).
- The résumé's phrasing — that a paper is eventually being written and approved by the SCF research
  conference — must not be reused, because it reads as an expected acceptance
  (content/source/resume/resume-current.png; CLAUDE.md — Featured work).
- Safe formulation for the site: the earlier CAM version was published at ACM SCF 2025; work on the
  CAD layer is written up in a paper that is currently under review
  (content/source/cerapiper/README.md#from-cam-to-cad; content/source/CLAUDE.md — cerapiper row).

---

### 6.8 Lab, links, and contact

- The lab behind the project is the Matter of Tech Lab, at matteroftechlab.org; the README's contact
  email is matteroftechlab@gmail.com (content/source/cerapiper/README.md#contact).
- Project repository: https://github.com/matteroftech/CeraPipes
  (content/source/cerapiper/README.md#contact).
- The README's logo links to https://cerapipe.matteroftechlab.org/ and its "Visit the site" link
  points to https://cerapipes.onrender.com (content/source/cerapiper/README.md — project header).
- An SCF demo video is linked from the README, hosted on Google Drive:
  https://drive.google.com/file/d/11JvI0_eOK7G1gY5_0m2Xgnq389_zEq_u/view
  (content/source/cerapiper/README.md#usage).
- No CeraPiper source names Cornell Tech or the Technion; that affiliation comes from the résumé and
  root CLAUDE.md only (content/source/resume/resume-current.png; CLAUDE.md — Featured work;
  content/source/cerapiper/README.md).
- Whether any of these four links may be used on the site is unresolved; see the TODO(alex) line in 6.10 (content/source/cerapiper/README.md#contact, #usage).

---

### 6.9 Suggested images

**None of the paths below is currently publishable.** Everything under
`content/source/cerapiper/user-study-paper/pages/` belongs to the draft under anonymous review and
must not be cropped, reproduced, or adapted. The five README figures are the only plausibly
publishable CeraPiper images, and their files are not present in this repo.

**Referenced by the README but missing from disk** (the README's reference-link definitions exist;
the `figures/` directory does not) — ask Alex to supply these first:

| Path | What the README says it shows | Use |
|---|---|---|
| `content/source/cerapiper/figures/teaser_v2.png` | CAD-to-clay workflow, four panels: composing features in Onshape; compiling to an extrusion sequence and bed blueprint; annotating and hand-finishing along the printed sheet; extruding through the shape-shifting die onto the blueprint beneath the clay | Best candidate for the page hero or the top-of-page explainer strip |
| `content/source/cerapiper/figures/paper_teaser.png` | The physical system, four panels, including the chandelier-style assembled cooling device filled with water | Card image; the only source that would show the "chandelier-style" device the copy mentions |
| `content/source/cerapiper/figures/software_architecture_v2.png` | The three-layer architecture diagram: Onshape features and constraints compiling through the middleware into the Function Stack that drives the machine | Technical section. Prefer redrawing it as an original SVG in the site's own style — the three-layer structure is fully described in the public README |
| `content/source/cerapiper/figures/cad_interface.png` | The interface: bed tab bar, straight/curved 3D viewport, Components panel, interactive bed blueprint | The single best "what the tool looks like" image |
| `content/source/cerapiper/figures/primitive_shots.png` | Example primitives: tools, 3D preview, 2D cross-section, curve and connector primitives | Small supporting grid, or a detail strip |

(All five: content/source/cerapiper/README.md — `teaser_v2.png` from the inline <img> in the project
header, the other four from the markdown reference-link definitions at end of file, plus the figure
captions in #about-the-project, #implementation, and #usage. Absence from disk
verified by `find content/source/cerapiper -type f`.)

**Do not publish — reference only.** These are pages of the draft under anonymous review. They are
listed solely so Alex knows which cleared equivalents to request; several also show identifiable
study participants.

- `content/source/cerapiper/user-study-paper/pages/page-08.jpg` — the assembled ceramic cooling
  screen, a terracotta arch of ribbed and smooth hexagonal pipes against a bare wall; the strongest
  object photo in the group, and the shot to request a cleared original of. Same page carries the
  architecture diagram (content/source/cerapiper/user-study-paper/text.md#page-8).
- `content/source/cerapiper/user-study-paper/pages/page-11.jpg` — the largest, cleanest capture of
  the interface; the README figure `cad_interface.png` shows the same thing and is the safe
  substitute (content/source/cerapiper/user-study-paper/text.md#page-11).
- `content/source/cerapiper/user-study-paper/pages/page-09.jpg` — the sag advisory in the Onshape
  viewport, the clearest single illustration of an advisory constraint; the 150 mm rule itself is
  already public in the README, so a cleared rebuild of this screenshot would be publishable
  (content/source/cerapiper/user-study-paper/text.md#page-9;
  content/source/cerapiper/README.md#implementation).
- `content/source/cerapiper/user-study-paper/pages/page-07.jpg` and `page-14.jpg` — the clearest
  images of the paper blueprint acting as a cutting and folding guide under the clay
  (content/source/cerapiper/user-study-paper/text.md#page-7, #page-14).
- `content/source/cerapiper/user-study-paper/pages/page-12.jpg` — a render of the full set of study
  participants' designs; specific to the unpublished study and unlikely ever to be usable here
  (content/source/cerapiper/user-study-paper/text.md#page-12).
- `content/source/cerapiper/user-study-paper/pages/page-13.jpg` — kiln photos before and after
  firing, plus the study's results chart; also shows an identifiable participant
  (content/source/cerapiper/user-study-paper/text.md#page-13).
- `content/source/cerapiper/user-study-paper/pages/page-10.jpg` and `page-01.jpg` — additional
  process and workflow imagery, both showing identifiable hands or participants
  (content/source/cerapiper/user-study-paper/text.md#page-10, #page-1).

**Fallback if nothing is cleared.** The page can run without photography: the CAM-to-CAD table in 6.3
and a redrawn three-layer architecture diagram are both built entirely from public README content
(content/source/cerapiper/README.md#from-cam-to-cad, #implementation).

---

### 6.10 Open questions

TODO(alex): What exactly was your role and title on CeraPiper, and is "Research Intern, Cornell Tech
x Technion, summer 2026" the line you want on the site? Neither the README nor the paper draft names
you, and the folder contains no team list; the résumé is the only source for the role.
(content/source/resume/resume-current.png; content/source/cerapiper/README.md;
content/source/cerapiper/user-study-paper/text.md)

TODO(alex): Which parts of the system did you build? The README describes the Onshape FeatureScript
layer, the Flask middleware, the Arduino firmware, and the paper blueprint as one system with no
attribution per component, so the site can currently only say you worked on it at the system level.
(content/source/cerapiper/README.md#implementation)

TODO(alex): Are you a named author on the CAD paper? The draft is bylined "Anonymous Author(s)" for
review, so it cannot be checked from the file. Confirmed from the sources: you are not an author on
the published SCF 2025 CAM paper (Berman, Seiz, Roumen).
(content/source/cerapiper/user-study-paper/text.md#page-1, #page-16)

TODO(alex): How should the affiliation read — "Matter of Tech Lab", "Cornell Tech", "Cornell Tech x
Technion", or all three? The résumé says Cornell Tech x Technion; the CeraPiper sources name only the
Matter of Tech Lab, and the paper draft refers to the authors' university without naming it.
(content/source/resume/resume-current.png; content/source/cerapiper/README.md#contact;
content/source/cerapiper/user-study-paper/text.md#page-9)

TODO(alex): Study size conflict. The README reports a study with eight designers and makers (all
eight on design intent, seven of eight on the CAD-versus-machine question); the draft under review
documents a later, larger study with twelve participants plus a separate five-person formative study.
Per the content rules the résumé is the tiebreaker, but it says nothing about the study, so the
README's numbers are used above. Which figures are current, and may any of them be published while
the draft is under review? (content/source/cerapiper/README.md#from-cam-to-cad;
content/source/cerapiper/user-study-paper/text.md#page-4, #page-9)

TODO(alex): Outer-diameter conflict. The README gives 40–78 mm twice; the draft gives 40–79 mm. The
README is the publishable source, so 40–78 mm is used above. Which is correct?
(content/source/cerapiper/README.md#implementation, #from-cam-to-cad;
content/source/cerapiper/user-study-paper/text.md#page-8)

TODO(alex): Supply the five README figures — `teaser_v2.png`, `paper_teaser.png`,
`software_architecture_v2.png`, `cad_interface.png`, `primitive_shots.png`. They are referenced by
the README but absent from `content/source/cerapiper/`, and they are the only CeraPiper images that
could plausibly be published. (content/source/cerapiper/README.md — reference-link definitions)

TODO(alex): Confirm the Matter of Tech Lab is comfortable with those figures, and with any CeraPiper
copy, appearing on your personal site — and whether photos showing other people's hands need separate
clearance. (content/source/cerapiper/README.md#contact)

TODO(alex): May the site link the live tool (https://cerapipes.onrender.com and
https://cerapipe.matteroftechlab.org/), the repository
(https://github.com/matteroftech/CeraPipes), and the SCF demo video on Google Drive? All four are in
the README, but the repo may be private and the links may be stale.
(content/source/cerapiper/README.md — project header, #usage, #contact)

TODO(alex): Confirm the ~8–10% relative humidity and 1.85 L / 60 hours figures appear in the
published SCF 2025 paper, so the site can footnote them to doi:10.1145/3745778.3766644. The README
attributes them to technical evaluations of the underlying process without naming the paper.
(content/source/cerapiper/README.md#about-the-project)

TODO(alex): The README mentions a chandelier-style assembled cooling device, but no image of one is
available in this source group. Is there a photo, or should the site drop the word?
(content/source/cerapiper/README.md#about-the-project)

TODO(alex): Name spelling — the site will use "CeraPiper" (the project README's spelling) rather than
the résumé's "Cera Piper". Confirm. Note also that the résumé body misspells Cornell as "Conell" and
that typo must not be carried into any site copy. Note further that the repository
(github.com/matteroftech/CeraPipes), the live-site URLs, and the app's own title bar all read
"CeraPipes" / "cerapipe" rather than "CeraPiper" — decide which spelling any on-site link label uses.
(content/source/resume/resume-current.png; content/source/cerapiper/README.md)

TODO(alex): The résumé calls the work "CAD and slicing software", while the README frames it as a CAD
layer built over an existing CAM tool. Which framing do you want on the site? They are compatible but
emphasize different things. (content/source/resume/resume-current.png;
content/source/cerapiper/README.md#from-cam-to-cad)

TODO(alex): Not stated anywhere in the sources — the internship's exact start and end dates, a
supervisor or advisor name, how many machines exist, and how many prototypes were produced. Supply
any of these you want on the site.
(content/source/cerapiper/README.md; content/source/resume/resume-current.png)
