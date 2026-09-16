Content map, skills section. Every fact carries its source in parentheses. Sources are
repo-relative paths; `#page-N` / `#LNNN` point at the page or line inside the file. `CLAUDE.md`
means the root `CLAUDE.md` of this repo. Résumé typos are corrected here and flagged in §8.11;
the corrected spelling is what should reach the site.

## 8. Skills and tools

### 8.1 3D CAD

- 3D CAD tools listed on the résumé: SolidWorks, Fusion 360, Onshape, Blender (content/source/resume/resume-current.png; identical on content/source/resume/resume-older.png).
- Software named for the prosthetic arm and AntiCam work: Fusion, Bambu, and nTop (content/source/essays/college-essays-private.txt#L3676).
- nTop Automate was used for parametric auto-sizing of the prosthetic arm, looping through iterations against user measurements and cell size/type with a neural network (content/source/prosthetic-arm/design-brief/text.md#page-13).
- The prosthetic arm design is described as parametric and modular (content/source/prosthetic-arm/design-brief/text.md#page-12; content/source/prosthetic-arm/design-brief/text.md#page-14).
- Onshape is the CAD collaboration tool for the robotics team (content/source/robotics/championships-presentation/slide-f.jpg).
- Master Sketch parametric modelling: Ball-Drive was designed with a Master Sketch so parts stay linked and parametric (content/source/portfolio/04-ball-drive.jpg#page-1).
- Parametric master sketches are the team's standard design method, with the robot fully designed before build (content/source/robotics/posters/poster-f.png).
- The launcher's variables (compression, angle, wheel size) are defined in a single master sketch, and the transfer and intake are modelled in the same Onshape part studio, entirely parametric (content/source/robotics/posters/poster-f.png).
- CeraPiper's design layer is built as custom parametric features inside Onshape using FeatureScript (content/source/cerapiper/README.md).
- Alex learned a new CAD package from his robotics team's lead coder in order to get past a software ceiling on the prosthetic arm's resizing automation (content/source/essays/college-essays-private.txt#L3273-L3278).
- TODO(alex): The résumé lists SolidWorks first, but SolidWorks appears in no other source file; Onshape, Fusion, and nTop are the tools the project sources actually document. Confirm the CAD list and its order for the site.

### 8.2 Simulation and analysis

- Finite element stress analysis is run in industry-standard software as part of the robot design process (content/source/robotics/posters/poster-f.png).
- FEA was used on the transfer assembly to reduce material while keeping strength (content/source/robotics/posters/poster-f.png).
- Vernier Graphical Analysis of artifact exit velocity was used to set launcher compression at 8 mm (content/source/robotics/posters/poster-f.png).
- 200+ launcher trials were analyzed to build a launcher-speed regression predicting launch power from shot distance (content/source/robotics/posters/poster-f.png; content/source/robotics/posters/poster-d.png).

### 8.3 Coding languages and stated levels

- Proficient: Python, Arduino, HTML5 (content/source/resume/resume-current.png).
- Intermediate: Java, C++, C (content/source/resume/resume-current.png).
- Web design: coded 8 commercial sites (content/source/resume/resume-current.png; identical on content/source/resume/resume-older.png).
- At NYU Tandon he learned and applied encoding and decryption, and won the program's hackathon (content/source/resume/resume-current.png).
- The CeraPiper CAD tool Alex worked on as a research intern is built from an Onshape/FeatureScript design layer, Python/Flask translation middleware, and Arduino C++ firmware (content/source/cerapiper/README.md; content/source/resume/resume-current.png).
- CeraPiper's middleware queries the Onshape feature tree through the REST API, reconstructs the assembly as a directed graph, traverses it depth-first, and serializes a JSON "Function Stack" (content/source/cerapiper/README.md).
- CeraPiper's frontend is a p5.js client using WEBGL and 2D rendering (content/source/cerapiper/README.md).
- CeraPiper's documented dependencies: Arduino Uno, Arduino IDE 2.3.3, ArduinoJson 7.4.2, Python 3, Flask 3.1.1, Requests, NetworkX, python-dotenv, Waitress (content/source/cerapiper/README.md).
- TODO(alex): CeraPiper is a team research project; confirm which layers of that stack Alex personally wrote before the site attributes any of them to him (content/source/cerapiper/README.md).

### 8.4 Web

- Coded 8 commercial sites (content/source/resume/resume-current.png).
- Built the AntiCam website and launch strategy (content/source/resume/resume-current.png).
- Built and launched a public countdown website at chickenparmlunch.splashthat.com for his school's cafeteria menu; the school's food services team now coordinates with him before publishing each month's menu (content/source/essays/college-essays-private.txt#L202-L215).
- The robotics team's FTC MicroFunding site (microfunding.tritonics.org) is credited on the team roster to teammate Milind A, not to Alex (content/source/robotics/championships-presentation/slide-e.jpg; content/source/robotics/championships-presentation/slide-b.png).
- TODO(alex): Which 8 commercial sites, for whom, and are any of them linkable or screenshot-able for the site? No source names them (content/source/resume/resume-current.png).
- TODO(alex): Is chickenparmlunch.splashthat.com still live, and should it appear as a shipped project? (content/source/essays/college-essays-private.txt#L202-L215)

### 8.5 Electronics

- Electronics listed on the résumé: Raspberry Pi, Arduino sensors (content/source/resume/resume-current.png — printed as "ELECTONICS"; the typo must not be copied).
- Led electrical design, documentation, and mentoring on his FTC team (content/source/resume/resume-current.png).
- Manages team strategy, the electrical system, and operations as DECODE-season captain (content/source/robotics/championships-presentation/slide-e.jpg; content/source/robotics/posters/poster-a.png).
- Designed a charging circuit for AntiCam after an early prototype drew more current than its battery could supply (content/source/essays/college-essays-private.txt#L4573-L4576).
- Built an equivalent circuit out of diodes when a specialized transistor was unavailable (content/source/essays/college-essays-private.txt#L4576-L4581).
- AntiCam uses optical components and circuitry that emit infrared light to block cameras (content/source/resume/resume-current.png).
- The AntiCam cap build specifies a light-detection system for flashes to trigger the infrared LEDs, plus a safe recharging system and an accompanying circuit diagram for manufacture (content/source/anticam/mastery-learning-plan/text.md#page-1).
- Prosthetic arm electronics: servos, wrist control system, Arduino, batteries, and a myoelectric control system in the forearm (content/source/prosthetic-arm/design-brief/text.md#page-8).
- Myoelectric sensors are specialised electromyography (EMG) sensors that convert muscle-contraction signals into readable analog values (content/source/prosthetic-arm/design-brief/text.md#page-9).
- Void Electronics built handheld game consoles from Altoids tins and Raspberry Pis (content/source/essays/college-essays-private.txt#L3443-L3448).
- Taught classmates soldering alongside CAD, 3D printing, and laser cutting in the Mastery makerspace (content/source/essays/college-essays-private.txt#L2736-L2739).

### 8.6 Fabrication materials

- Build and finish materials listed on the résumé: wood, PLA, resin, acrylic, aluminum, composite plastics (content/source/resume/resume-current.png; identical on content/source/resume/resume-older.png).
- Rapid wooden prototyping was used to hone roller and ramp compression on the robot intake (content/source/robotics/posters/poster-f.png).
- The prosthetic fingers use a tendon-inspired Kevlar cord system, with one elastic cord holding the finger upright and a second cord driving it from a servo (content/source/prosthetic-arm/design-brief/text.md#page-7).
- The prosthetic arm is 3D-printable and modular for quick repair (CLAUDE.md; content/source/prosthetic-arm/design-brief/text.md#page-14).
- The robotics team used sustainable materials as part of its response to a mid-season budget cut (content/source/robotics/championships-presentation/slide-f.jpg).

### 8.7 Machines and shop

- Machinery listed on the résumé: 3D printers, laser cutters, shop tools (content/source/resume/resume-current.png; identical on content/source/resume/resume-older.png).
- IDEA program training covers 3D CAD/printing, design thinking, rapid prototyping, fabrication, and shop safety (content/source/resume/resume-current.png).
- The IDEA Club's activities also included laser cutting, CNC, and makerspace safety training (content/source/essays/college-essays-private.txt#L1538-L1552).
- Mentored by Cornell Tech staff on machining and part fabrication, and ran a 3D printing workshop there (content/source/essays/college-essays-private.txt#L4402-L4408).
- The teacher who ran the school iLab taught Alex CAD, design software, and the shop tools (content/source/essays/college-essays-private.txt#L6490-L6492).
- A laser-cut wooden cipher wheel was produced for the team's outreach modules (content/source/robotics/championships-presentation/slide-d.png).
- CeraPiper's fabrication backend drives a custom ceramic printer: an Arduino maps primitives to motor steps and actuator outputs, regulates the clay pug mill feed rate, and drives a shape-shifting die (content/source/cerapiper/README.md).

### 8.8 Design work products and methods

- Design work products listed on the résumé: robotics components, prosthetics, wearable technology (content/source/resume/resume-current.png).
- Design process used on the robot: Goals → Brainstorm → CAD → Test → Prototype → Optimize → Repeat; rookies follow Design → CAD → Build → Test → Iterate (content/source/robotics/posters/poster-f.png; content/source/robotics/posters/poster-a.png).
- Biomimicry is a named design method in Alex's own projects, including scorpion-inspired tail mechanics and coral-patterned Voronoi chassis geometry used for strength (content/source/essays/college-essays-private.txt#L4983-L4984).
- Modularity and repairability are treated as design goals in their own right: the prosthetic arm snaps together from interchangeable modules, and Monti is designed to be repaired and disassembled within seconds without screws (content/source/essays/college-essays-private.txt#L5661-L5665; content/source/portfolio/01-monti-robot.jpg#page-1).
- Cost ceilings are used as design constraints: the prosthetic arm targets under $100 and AntiCam's three formats are all planned under $100 (content/source/resume/resume-current.png; content/source/anticam/pitch-deck-outline.md).
- Prototype counts are how iteration is tracked: 90+ prosthetic arm prototypes; 30+ AntiCam prototypes across four major iterations; 5 full robot design iterations (content/source/resume/resume-current.png; content/source/robotics/posters/poster-f.png).

### 8.9 Business, product, and communication skills

- Entrepreneurial skills listed on the résumé: financial planning, fundraising, multi-team collaboration (content/source/resume/resume-current.png).
- Product development skills listed on the résumé: prototyping, materials selection, testing, iteration, production timelines and oversight (content/source/resume/resume-current.png — printed as "Materials Slection"; the typo must not be copied).
- Marketing skills listed on the résumé: develop brand and systems, public speaking, technical writing (content/source/resume/resume-current.png).
- At Octura he shadowed the CEO, product, and legal leads, built and tested CLO models, analyzed market data, and joined investor calls and site visits (content/source/resume/resume-current.png).
- At NYU Tandon he investigated, wrote, and presented a cybersecurity research paper to leading firms (content/source/resume/resume-current.png).
- In the Take the World Forward fellowship he practiced leadership tactics, critical problem-solving, and marketing and research techniques (content/source/resume/resume-current.png).
- He built AntiCam's website and launch strategy (content/source/resume/resume-current.png).
- The AntiCam pitch outline covers market sizing (TAM/SAM/SOM), six market segments with a five-criteria scoring table, three products with estimated BOM and margin, a competitive positioning matrix, and an illustrative first-raise allocation (content/source/anticam/pitch-deck-outline.md).
- Project planning and tracking: the robotics team runs Gantt charts in Canvas to track workflow, outreach, feedback, and expert impact, and uses Discord for team communications (content/source/robotics/championships-presentation/slide-f.jpg).
- Budget tracking was implemented in response to a 50% mid-season budget cut (content/source/robotics/championships-presentation/slide-f.jpg).
- Brand and identity work: the team developed branding assets and templates for outreach, business, and key communications, with a documented color and border guide (content/source/robotics/championships-presentation/slide-f.jpg; content/source/robotics/posters/poster-a.png).
- Teaching and curriculum: designed a curriculum for lower-grade students introducing coding and logical thinking (content/source/portfolio/07-community-events.jpg#page-1).
- Technical writing and documentation: his stated DECODE-season goal was strong documentation, marked achieved (content/source/robotics/championships-presentation/slide-e.jpg).
- Languages: CAD tutorials were produced and shared in seven languages, and Alex used Spanish at Robot-in-2-Days to include more students (content/source/essays/college-essays-private.txt#L4098-L4101; CLAUDE.md).
- TODO(alex): Confirm the CLO expansion (collateralized loan obligation?) before the term is used on the site (content/source/resume/resume-current.png).
- TODO(alex): Confirm which languages Alex speaks and at what level; only Spanish use is documented, via a single outreach anecdote (content/source/essays/college-essays-private.txt#L4098-L4101).

### 8.10 Tools used by teams Alex led, where the source does not name the author

These belong to robots and software Alex captained or led operations for. The source pages do not
say who wrote each one, so the site must not claim them as Alex's own work without confirmation.

- Software architecture: a "Task System" in which a task is a single discrete robot action, layered to complete an operation (content/source/robotics/posters/poster-d.png).
- Localization: odometry pods, a Limelight camera, and an IMU fused through a Kalman filter (content/source/robotics/posters/poster-d.png).
- Control: multiple PID controllers for adaptive adjustment, including a velocity PID using launcher-wheel encoder feedback (content/source/robotics/posters/poster-d.png).
- Sensing and driver feedback: 5 color sensors read artifact color and position, relayed to the driver on LED strips (content/source/robotics/posters/poster-d.png).
- Driver optimization: an exponential movement curve for precise driving at low speed (content/source/robotics/posters/poster-d.png).
- PEREGRINE, the team's custom modular autonomous pathing software, developed alongside a Simons Foundation professor using variational calculus (content/source/robotics/posters/poster-d.png; content/source/robotics/championships-presentation/slide-a.png).
- Monti's custom pathing software, developed with PhD researchers at the Simons Foundation, combining infinite variable calculus with an AI layer for live in-match adjustments (content/source/portfolio/01-monti-robot.jpg#page-1).
- The team roster credits autonomous pathmapping code to Noah G and the micro-funding website to Milind A (content/source/robotics/championships-presentation/slide-e.jpg).
- TODO(alex): Confirm which of these software systems, if any, you wrote or co-wrote, so the skills section can claim them accurately (content/source/robotics/posters/poster-d.png; content/source/robotics/championships-presentation/slide-e.jpg).

### 8.11 Statistics in this section, with sources

| Statistic | Where it belongs | Source | External citation |
|---|---|---|---|
| Coded 8 commercial sites | Web skills | (content/source/resume/resume-current.png; content/source/resume/resume-older.png) | none given in source |
| 70+ students trained in 3D CAD/printing, design thinking, rapid prototyping, fabrication, and shop safety | IDEA program | (content/source/resume/resume-current.png; corroborated at content/source/essays/college-essays-private.txt#L1543-L1544) | none given in source |
| 90+ prosthetic arm prototypes | Iteration practice | (content/source/resume/resume-current.png) | none given in source |
| 30+ AntiCam prototypes and four major iterations | Iteration practice | (content/source/resume/resume-current.png) | none given in source |
| Prosthetic arm buildable for under $100 | Cost-as-constraint | (content/source/resume/resume-current.png) | none given in source |
| 5 full robot design iterations | Design process | (content/source/robotics/posters/poster-f.png) | none given in source |
| 200+ launcher trials analyzed | Analysis practice | (content/source/robotics/posters/poster-f.png) | none given in source |
| Launcher compression optimized to 8 mm | Analysis practice | (content/source/robotics/posters/poster-f.png) | none given in source |
| 3 sensor sources fused by the Kalman filter | Team software | (content/source/robotics/posters/poster-d.png) | none given in source |
| 5 color sensors for artifact detection | Team software | (content/source/robotics/posters/poster-d.png) | none given in source |
| CAD tutorials produced in seven languages | Outreach / languages | (content/source/essays/college-essays-private.txt#L277; CLAUDE.md) | none given in source |
| CeraPiper 2.1 reduced Onshape API requests per import to about 1 per design, from one per part | CeraPiper engineering | (content/source/cerapiper/README.md) | none given in source |

- TODO(alex): The older résumé's community section says "40+ students reached through IDEA design & build workshops" while both résumé sidebars say the program trained 70+ students. Confirm which figure to publish and what each counts (content/source/resume/resume-older.png; content/source/resume/resume-current.png).

### 8.12 Source hygiene for this section

- Résumé typos to correct before publishing: "ELECTONICS" → Electronics; "Materials Slection" → Materials Selection (content/source/resume/resume-current.png).
- The résumé's skills sidebar is identical on both résumé versions, so nothing in §8.1, §8.3, §8.5–§8.9 depends on which version is used (content/source/resume/resume-current.png; content/source/resume/resume-older.png).
- The résumé is the only source that assigns proficiency levels to languages; no project source grades them (content/source/resume/resume-current.png).
