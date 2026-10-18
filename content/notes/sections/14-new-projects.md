Content map, new projects section. Every fact below carries its source in parentheses. The sources
for this section are internal documents (Google Drive, Notion and meeting notes) that are not in
this repo. They are cited by title only, never quoted, and listed with their publication rules in
`content/source/CLAUDE.md` under "Internal documents not in this repo". `CLAUDE.md` means the root
`CLAUDE.md` of this repo.

Rules for this section: teammates are never named; targets are labelled as targets, not results;
Pando Surgical is under an NDA, so only the public basics below may be used (see "Excluded under
NDA"). Open questions are collected in `content/notes/sections/12-conflicts-todos.md` under "New
projects (fall 2026)".

## 14. New projects (fall 2026)

### Pando Surgical {#pando-surgical}

**Role:** Product Manager, since fall 2026, through TroyLabs BUILD.

- Alex Tully is Product Manager at Pando Surgical, Inc. ("Pando Surgical team meeting notes, 30 September 2026 (internal)").
- Pando Surgical is a medtech startup working on surgical ergonomics ("Pando Surgical team meeting notes, 30 September 2026 (internal)").
- He joined Pando through TroyLabs BUILD, USC's student accelerator, in its PM division, in fall 2026 ("Pando Surgical team meeting notes, 30 September 2026 (internal)"; CLAUDE.md — Who Alex is).
- He was introduced to the team as its new PM on 30 September 2026 ("Pando Surgical team meeting notes, 30 September 2026 (internal)").
- Pando's first product is the LapRotator ("Pando Surgical Executive Summary (internal)"; www.pandosurgical.com).
- The LapRotator is patent pending ("Pando Surgical Executive Summary (internal)"; www.pandosurgical.com).
- The LapRotator is an attachment that lets a surgeon rotate a laparoscope with one hand, instead of setting down an instrument to rotate it with the other ("Pando Surgical Executive Summary (internal)"; www.pandosurgical.com).
- Laparoscopes commonly have an angled tip, so rotating the scope changes the view ("Pando Surgical Executive Summary (internal)"; www.pandosurgical.com).
- As PM, Alex built the team's task system ("Pando Surgical team meeting notes, 30 September 2026 (internal)"; "Pando Surgical Task Hub (Notion, internal)").
- One part of it is a shared task tracker, organised by date and department, that pushes each person's assigned tasks to their calendar (Google Sheets to Google Calendar) ("Pando Surgical team meeting notes, 30 September 2026 (internal)"; "Pando Surgical Task Hub (Notion, internal)").
- The other part is a Notion task hub with per-person views ("Pando Surgical team meeting notes, 30 September 2026 (internal)"; "Pando Surgical Task Hub (Notion, internal)").
- Pando's public website is www.pandosurgical.com (www.pandosurgical.com).
- No Pando images are cleared; the site uses `todoPhotos` only, plus an authored illustration of the task (one-handed laparoscope rotation), never the device itself (CLAUDE.md — Pando Surgical).

**Excluded under NDA.** Categories only; no values are recorded anywhere in this repo. None of the
following may appear on the site, in `src/`, in these notes, or in a commit message (CLAUDE.md —
Pando Surgical):

- Cost, pricing and profitability of any kind (unit cost, cost of goods, price, profit per unit).
- Sales, unit or market projections.
- Funding of any kind: amounts, asks, investors, and accelerator, grant or funding applications.
- Quality-system and certification work.
- Regulatory pathway or strategy of any kind.
- IP, licensing, equity or option agreements.
- Patent details beyond the words "patent pending".
- Any product, product idea or roadmap item other than the LapRotator.
- Survey or interview results and numbers.
- Names of teammates, surgeons, advisors or partners.
- Any Pando image: product, CAD, prototype, team, screenshot or document.

### Bloom {#bloom}

**Role:** PM and systems.

- Bloom is a side project at Terra Labs in fall 2026 ("Bloom PRD F26 v2 (NFC), Terra Labs (internal)").
- Bloom is part of an immersive "magical forest" showcase experience ("Bloom PRD F26 v2 (NFC), Terra Labs (internal)").
- Alex's role is PM and systems: the architecture, the bill of materials, the firmware for the bracelet and the tap stations, the Firebase backend, and the projection code ("Bloom PRD F26 v2 (NFC), Terra Labs (internal)").
- Guests wear reusable NFC bracelets that "bloom", lighting 1 to 5 LEDs, each time the guest makes a connection ("Bloom PRD F26 v2 (NFC), Terra Labs (internal)").
- A connection is made by tapping bracelets together with someone at one of 4–6 tree-stump stations along the path ("Bloom PRD F26 v2 (NFC), Terra Labs (internal)").
- Every connection grows a projected garden ("Bloom PRD F26 v2 (NFC), Terra Labs (internal)").
- For each connection, a vine is drawn in the projection between the two people's flowers ("Bloom PRD F26 v2 (NFC), Terra Labs (internal)").
- At the exit, the bracelet is traded for a 3D-printed flower whose openness matches how many people the guest met ("Bloom PRD F26 v2 (NFC), Terra Labs (internal)").

#### Versions

- v0.2 (22 September 2026) was a bracelet that listened for a spoken introduction, using a microphone and a voice-ID app ("Bloom PRD F26, Terra Labs (internal)"; "Bloom PRD F26 v2 (NFC), Terra Labs (internal)"). The app is not named on the site.
- v0.3 (30 September 2026) dropped the microphone ("Bloom PRD F26 v2 (NFC), Terra Labs (internal)").
- The microphone was dropped because the room is too loud and per-bracelet cost mattered at about 600 guests ("Bloom PRD F26 v2 (NFC), Terra Labs (internal)").
- v0.3 moved pairing to tapping bracelets together at NFC stations ("Bloom PRD F26 v2 (NFC), Terra Labs (internal)").

#### Hardware, as designed in the PRD

- Each bracelet has an NXP NT3H2111 NTAG I2C plus NFC tag on a small PCB with an etched 13.56 MHz antenna ("Bloom PRD F26 v2 (NFC), Terra Labs (internal)").
- Each bracelet also has a CH32V003 microcontroller, 5 LEDs and a CR2032 coin cell ("Bloom PRD F26 v2 (NFC), Terra Labs (internal)").
- The tag's field-detect pin wakes the microcontroller, which reads its connection count over I2C and lights that many LEDs ("Bloom PRD F26 v2 (NFC), Terra Labs (internal)").
- Each station is a XIAO ESP32-C3 board with two RC522 reader pads ("Bloom PRD F26 v2 (NFC), Terra Labs (internal)").
- When two bracelets are on a station's pads within about 3 seconds, the station logs the connection to Firestore over Wi-Fi ("Bloom PRD F26 v2 (NFC), Terra Labs (internal)").
- The station then writes each bracelet's new count to that bracelet's tag ("Bloom PRD F26 v2 (NFC), Terra Labs (internal)").
- The readers live in shared stations because two passive NFC tags cannot talk to each other, so the bracelets stay cheap and reusable ("Bloom PRD F26 v2 (NFC), Terra Labs (internal)").
- The system path, as summarised from the bullets above for the site's diagram, is bracelet → tap station → Firestore → projection ("Bloom PRD F26 v2 (NFC), Terra Labs (internal)").

#### Current prototype

- The current prototype, the "NFC light-up prototype", is a breadboard bracelet v0 ("Bloom BOM F26 v2 (NFC), Terra Labs (internal)"; "Bloom Task Sheet F26 v2 (NFC), Terra Labs (internal)").
- It is an NFC Tag 2 click (NTAG I2C) board on a XIAO ESP32-C3 that lights LEDs from a count written to the tag ("Bloom BOM F26 v2 (NFC), Terra Labs (internal)"; "Bloom Task Sheet F26 v2 (NFC), Terra Labs (internal)").
- Bloom is at the prototype stage; the site uses that wording for its status ("Bloom BOM F26 v2 (NFC), Terra Labs (internal)"; "Bloom Task Sheet F26 v2 (NFC), Terra Labs (internal)").
- TODO(alex): photos of the breadboard prototype; until then the page uses `todoPhotos`.

#### Targets (label as targets, not results)

- Target: about 100 reusable bracelets plus 10 spares ("Bloom PRD F26 v2 (NFC), Terra Labs (internal)"; "Bloom BOM F26 v2 (NFC), Terra Labs (internal)").
- Target: about $750 total budget ("Bloom PRD F26 v2 (NFC), Terra Labs (internal)"; "Bloom BOM F26 v2 (NFC), Terra Labs (internal)").
- Target: about $2.90 per bracelet ("Bloom PRD F26 v2 (NFC), Terra Labs (internal)"; "Bloom BOM F26 v2 (NFC), Terra Labs (internal)").
- Target: about 600 guests over 2 hours, with about 150 in the room at once ("Bloom PRD F26 v2 (NFC), Terra Labs (internal)"; "Bloom BOM F26 v2 (NFC), Terra Labs (internal)").
- Target: a bracelet under 25 g ("Bloom PRD F26 v2 (NFC), Terra Labs (internal)"; "Bloom BOM F26 v2 (NFC), Terra Labs (internal)").
- Target: fits wrists of 150–200 mm ("Bloom PRD F26 v2 (NFC), Terra Labs (internal)"; "Bloom BOM F26 v2 (NFC), Terra Labs (internal)").

#### Dates

- The midpoint check-in is 30 October 2026 ("Bloom PRD F26 v2 (NFC), Terra Labs (internal)").
- Demo day is planned for 4 December 2026 ("Bloom PRD F26 v2 (NFC), Terra Labs (internal)"). TODO(alex): confirm the date.

#### Concept video stills {#bloom-video}

- Alex made a concept video for Bloom, "Bloom Terra Video.mp4", in September 2026 ("Bloom Terra Video.mp4").
- Alex approved using stills from the video on the site (CLAUDE.md — Side projects).
- The stills are not available yet because the download was blocked, so the page leaves `todoPhotos` and renders the `BloomBracelet` SVG instead (CLAUDE.md — Side projects).
- Handling: pick frames that show the bracelet or hands only, with no faces and no text overlays; caption a frame honestly when it shows the earlier v0.2 concept rather than the v0.3 NFC build; chosen stills go in `content/source/bloom/video-stills/`; the video file itself is gitignored and never committed (CLAUDE.md — Side projects).

### Robotic-arm flower {#robotic-arm-flower}

**Role:** Electrical and firmware.

**Name:** The working name in the notes is "Chorus". Its public name is TODO(alex), so the site
titles the page "Robotic-arm flower" ("Terra Labs project notes, October 2026 (internal)").

- The robotic-arm flower is a side project at Terra Labs in fall 2026 ("Terra Labs project notes, October 2026 (internal)").
- Four people each wear a wristband that controls a robotic arm ("Terra Labs project notes, October 2026 (internal)").
- The arms place orbs that light a central flower ("Terra Labs project notes, October 2026 (internal)").
- The central flower blooms and reveals a shared prize ("Terra Labs project notes, October 2026 (internal)").
- The theme is strangers working together ("Terra Labs project notes, October 2026 (internal)").
- Each wristband uses an IMU for wrist rotation ("Terra Labs project notes, October 2026 (internal)").
- Each wristband uses a myoelectric (EMG) sensor for grip ("Terra Labs project notes, October 2026 (internal)").
- The team has four SO-101 robot arms ("Terra Labs project notes, October 2026 (internal)").
- Alex's role is electrical and firmware ("Terra Labs project notes, October 2026 (internal)", 30 September 2026).
- As of October 2026, the project is a concept moving to MVP ("Terra Labs project notes, October 2026 (internal)", 15 October 2026).
- Open question: the flower mechanism, a cable-driven tensegrity stem or soft robotics ("Terra Labs project notes, October 2026 (internal)", 15 October 2026).
- Open question: sensing, because gel-free wrist EMG is noisy, so a wrist pressure sensor is being considered ("Terra Labs project notes, October 2026 (internal)", 15 October 2026).
- Open question: an ESP-based wireless link from the wrist to the arm ("Terra Labs project notes, October 2026 (internal)", 15 October 2026).
- A showcase is planned for early December 2026 ("Terra Labs project notes, October 2026 (internal)", 15 October 2026).
- No images exist; the site uses `todoPhotos` and the authored `ArmFlower` SVG (CLAUDE.md — Side projects).

### Cosmo AI {#cosmo-ai}

- Deferred at Alex's request; no source on file, and it does not appear on the site (CLAUDE.md — Side projects).
