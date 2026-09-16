<a id="readme-top"></a>

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
<!-- [![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![Unlicense License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url] -->


<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://cerapipe.matteroftechlab.org/">
    <img src="development_copy/static/logos/cerapipe_logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">CeraPiper CAD Tool</h3>

  <p align="center">
    A CAD tool to design and fabricate custom clay extrusions with the CeraPiper machine — now built as a parametric extension of Onshape.
    <br />
    <a href="https://cerapipes.onrender.com"><strong>Visit the site »</strong></a>
    <br />
    <br />
    <img src="figures/teaser_v2.png" width=760 alt="CeraPiper CAD workflow">
  </p>
</div>

<div align="center">
  <sub><em>
    From CAD to clay: (a) a designer composes a branching cooling element from parametric pipe, curve, branch, and
    connector features in Onshape; (b) CeraPiper compiles the assembly into an extrusion sequence and a printable bed
    blueprint; (c) the designer annotates and hand-finishes along the printed sheet; (d) segments are extruded through a
    shape-shifting die directly onto the blueprint that runs beneath the clay.
  </em></sub>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#from-cam-to-cad">From CAM to CAD</a></li>
        <li><a href="#implementation">Implementation</a></li>
        <li><a href="#the-paper-blueprint">The Paper Blueprint</a></li>
        <li><a href="#file-structure">File Structure</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#next-steps">Next Steps</a></li>
    <!-- <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li> -->
    <li><a href="#contact">Contact</a></li>
    <!-- <li><a href="#acknowledgments">Acknowledgments</a></li> -->
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

CeraPiper is a CAD tool and fabrication system for designing and extruding custom hollow ceramic forms used in evaporative cooling. Users compose whole assemblies — pipes, ribs, curves, branches, and plug‑and‑socket connectors — as parametric features, and the tool translates that design into machine instructions for a shape‑shifting die mounted on a commercial clay pug mill. The extruded segments assemble into modular cooling devices — such as chandelier‑style units — that passively cool their surroundings through water evaporation.

Evaporative cooling with ceramics offers a low‑cost, energy‑efficient alternative to traditional air conditioning, but has historically lacked accessible computational design tools. CeraPiper bridges this gap with an end‑to‑end workflow that couples real‑time control of extrusion geometry with a professional CAD environment, allowing for both precise fabrication and creative exploration. Technical evaluations of the underlying process demonstrated repeatable geometric fidelity and environmental performance, with prototypes achieving measurable temperature reductions, elevated relative humidity (~8–10%), and 1.85 L of water evaporation over 60 hours.

![CeraPiper physical system][paper-teaser]
<div align="center">
  <sub><em>
    The CeraPiper fabrication technique: (a) users design cooling elements by sequencing geometric primitives; (b) segments
    are fabricated using a commercial pug mill and a shape‑shifting die extension; (c) components are assembled into a
    chandelier‑style evaporative cooling device; (d) when filled with water, the device passively cools surrounding spaces
    through evaporation.
  </em></sub>
</div>

<p align="right">(<a href="#readme-top">back to top</a>)</p>


### From CAM to CAD

CeraPiper began as a **machine‑facing CAM interface** (published at [ACM SCF 2025](https://doi.org/10.1145/3745778.3766644)): a standalone editor organized around the extrusion sequence the machine performs, where the designer sequenced geometric primitives along a single axis. That interface made the process *controllable*, but not *designable* — makers reasoned about extrusion parameters in isolation and could not compose or evaluate the assembled object.

The current tool **recompiles that CAM workflow into a CAD one**. Each machine parameter is reformulated as an editable design element inside a professional CAD environment (Onshape), so the assembled object — not the print sequence — becomes the primary representation:

| The machine used to expose… | …now it's a design element |
| --- | --- |
| Die aperture travel | Outer diameter (40–78 mm), bounded to formable parts |
| Mandrel insert | Enumerated inner diameter (die mandrel sizes) |
| Extrusion duration | Length in millimeters, capped by the conveyor bed |
| Rib count, gap, width | Ribbed‑pipe length that snaps to whole ribs |
| Rib spacing for bending | Curve radius and sweep angle |
| Instruction order | Derived automatically from how parts attach |
| Manual bed splitting | Automatic segmentation into fabricable tabs |
| Separate junction pieces | Branch feature with paired collars carrying carving marks |
| Duplicated stack entries | A single linear‑pattern operation |
| Operator sag judgment | An advisory warning above a 150 mm unsupported span |

In a study with **eight designers and makers**, all eight reported they could focus on their design intent without attending to machine‑specific detail, and seven of eight said the workflow felt like designing in a CAD environment rather than operating a machine. The die sizes were the constraint participants most often named as helping their design decisions.

<p align="right">(<a href="#readme-top">back to top</a>)</p>


### Implementation

The system spans **three layers**: a design layer of custom parametric features inside Onshape, a Python/Flask translation middleware that converts CAD feature trees into extrusion sequences, and the CeraPiper Arduino fabrication backend.

![Software architecture diagram][software-diagram]
<div align="center">
  <sub><em>Onshape features and constraints (top) compile through the middleware into the Function Stack that drives the CeraPiper machine (bottom).</em></sub>
</div>

<br>

**1. Design layer — Onshape · FeatureScript.**
Custom parametric features — ribbed straight pipes, ribbed curved pipes, perpendicular branch pipes, plug‑and‑socket connectors, junction collars, and a linear pattern — share a common library of fabrication constants. All profiles are **hexagonal**, matching the die geometry. Each feature encodes machine knowledge as one of three kinds of design‑time constraint:

- **Hard constraints** restrict parameters to fabricable values: enumerated inner diameters (die mandrel sizes), outer diameters bounded to **40–78 mm**, profile rotation limited to **30° increments** that preserve hex alignment, and segment lengths capped at the **800 mm conveyor bed** minus the fixed **60 mm** start and end pieces.
- **Corrective constraints** repair invalid input instead of rejecting it: a ribbed pipe snaps its length to whole rib increments (rib width + gap) and reports the adjustment, so extrusion never terminates mid‑rib.
- **Advisory constraints** surface fabrication risk without blocking the design: an unsupported span beyond **150 mm** triggers a sag warning and turns the geometry red in the viewport.

**2. Translation middleware — Python · Flask.**
The middleware queries the Onshape feature tree through the REST API and reconstructs the assembly as a directed graph whose nodes are fabrication primitives and whose edges are connector dependencies. Because ceramic extrusion is a continuous, sequential process, it traverses the graph **depth‑first** to linearize each branch into a contiguous extrusion sequence, splitting long runs at the conveyor‑bed limit and splitting the assembly at perpendicular junctions that are completed by hand in post‑processing. The result is serialized into a JSON **Function Stack** — a procedural recipe of primitives and parameters — which the interface renders in a WebGL 3D preview and a 2D cross‑section, and from which it generates a printable bed blueprint. Bounding‑box queries are requested only at topological intersections to stay within Onshape API rate limits.

**3. Fabrication backend — CeraPiper · Arduino (C++).**
The middleware transmits the compiled Function Stack over a USB serial link to an Arduino, whose firmware maps primitives to motor steps and actuator outputs, regulates the feed rate of the clay pug mill, and drives the shape‑shifting die. The firmware independently re‑enforces mechanical thresholds (including the bed‑length limit) as a safety layer, so violations are also caught at the machine.

![CeraPiper CAD interface][cad-interface]
<div align="center">
  <sub><em>
    The CeraPiper interface. (a) A tab bar splits the design into fabricable beds (Main, branches, and a Perpendicular
    Connectors bed). (b) The 3D viewport offers a straight view (pipes as extruded) and a curved view (simulated bending).
    (c) The Components panel lists every primitive; most parameters can be edited inline. (d) An interactive bed blueprint
    of the design, printed to guide extrusion and post‑processing.
  </em></sub>
</div>

<p align="right">(<a href="#readme-top">back to top</a>)</p>


### The Paper Blueprint

To bridge the digital model with physical production, CeraPiper prints a **20 cm‑wide paper blueprint** on a standard plotter. The sheet runs continuously along the conveyor bed beneath the freshly extruded clay, carrying localized design decisions directly alongside the material: which part is being extruded, where the clay is cut into fabricable segments, the mandrel size in use, and where holes must be hand‑cut to receive perpendicular connectors. Each bed keeps its own part name, number, and notes.

The blueprint is composed of toggleable layers — **grid & crop marks, part name/number, section outline, cut lines & connector cut‑outs, fold guides & mandrel size, section highlights, notes, clay top view, and piece IDs** — so a designer can print exactly the guidance they want on the shop floor. Some makers keep the sheet beside the extrusion; others extrude directly onto it.

<p align="right">(<a href="#readme-top">back to top</a>)</p>


### File Structure

All active application code lives under `development_copy/` — treat that directory as the project root for run, test, and edit commands.

<pre>
CeraPiper/development_copy/
├── app.py                       # Flask app: routes (/, /settings, /extrude, /serial-log, /api/generate-json)
├── requirements.txt             # Python dependencies
├── serial_communicator.py       # USB serial bridge between Python and the Arduino
├── functions_config.json        # last compiled Function Stack (the machine payload)
├── api/                         # Onshape import + Function Stack compiler
│   ├── main.py                  # REST client, normalize_feature_type, simulate_primitive, generate_extrusion_json
│   ├── perpendicular_pipes.py   # branch/perpendicular expansion, host attachment & hole cut-outs
│   ├── matching.py              # map Onshape parts ↔ primitives
│   ├── path_finding_logic.py    # dependency / bounding-box ordering graph (NetworkX)
│   ├── dump_onshape_schema.py   # schema discovery helper
│   ├── fixtures/                # cached Onshape responses used by the tests
│   └── test_main.py             # pytest suite
├── arduino/
│   └── firmware_v3/firmware_v3.ino   # C++ firmware — drives the die + pug mill
├── static/
│   ├── css/style.css
│   ├── js/
│   │   ├── geometry_builder.js  # builds the 3D/2D geometry from the Function Stack
│   │   ├── tabs.js              # per-bed tabs + the printable paper blueprint
│   │   ├── components.js        # Components panel (primitive list + inline editing)
│   │   ├── paperControls.js     # paper-sheet layer toggles, part name/number & notes
│   │   ├── utils.js             # Onshape load/save, tab helpers, API calls
│   │   ├── constants.js         # shared real-world constants (mirror the backend)
│   │   ├── state.js             # shared frontend state
│   │   ├── primitiveSchema.js   # primitive definitions
│   │   ├── stackManager.js      # Function Stack model + edits
│   │   ├── stackIntegration.js  # wires the stack model into the UI
│   │   ├── ui.js                # sliders, dropdowns, and other controls
│   │   └── buttons.js           # primitive-creation actions
│   ├── libraries/               # p5.js (WEBGL)
│   ├── logos/                   # icons & image assets
│   └── models/                  # shape-shifting die STL (rendered in the viewport)
└── templates/
    ├── index.html               # bento layout: 3D + Components, 2D + Paper Sheet Layers
    ├── header.html              # Onshape URL, upload/save/edit/settings, Extrude + bed tabs
    └── settings.html            # kiln / conveyor dimensions, serial log
</pre>

- `app.py` — Main Flask application. Serves the editor, exposes `/api/generate-json` (Onshape → Function Stack) and `/extrude` (send the design to the machine).
- `api/` — Onshape integration and the Function Stack compiler. `main.py` fetches the Part Studio feature tree over the Onshape REST API and generates the extrusion JSON; `perpendicular_pipes.py`, `matching.py`, and `path_finding_logic.py` handle branch expansion, part↔feature mapping, and print ordering.
- `serial_communicator.py` — Handles serial communication between Python and the Arduino; sends the Function Stack and reads back the log.
- Frontend (`static/js/`) — a p5.js (WEBGL + 2D) client. `geometry_builder.js` and `tabs.js` do most of the geometry and blueprint work; `components.js` and `paperControls.js` drive the two side panels; `utils.js` handles Onshape load/save.
- `templates/` — `index.html` is the main editor, `header.html` the shared toolbar, and `settings.html` the kiln/conveyor configuration.

> **Note:** `development_copy/flaskr/` is an older/alternate Flask factory. **`app.py` is what you run.**

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

How to set up the CeraPiper CAD tool.

### Prerequisites
Assuming a wired connection between the Arduino and the computer is established with the CeraPiper machine.

* Arduino Uno
* Arduino IDE Version 2.3.3
* ArduinoJson by Benoit Blanchon Version 7.4.2
* Python 3
* Flask Version 3.1.1
* PySerial Version 3.5
* Requests, NetworkX, python-dotenv, Waitress (for the Onshape integration — all pinned in `requirements.txt`)

### Installation

1. Upload `development_copy/arduino/firmware_v3/firmware_v3.ino` to the Arduino via the Arduino IDE

2. Clone the repo
```sh
   git clone https://github.com/matteroftech/CeraPipes.git
   ```
3. Navigate to the `development_copy` directory (making it your root directory)
```sh
   cd CeraPipes/development_copy
   ```
4. Create and activate a virtual environment (optional)
```sh
   python -m venv venv
```
Mac
```sh
   source venv/bin/activate
  ```
  Windows
```sh
   venv\Scripts\activate
   ```
5. Install packages
```sh
   pip install -r requirements.txt
   ```
6. Run `app.py`
```sh
   python app.py
   ```
7. Open a web browser and navigate to `http://localhost:8000`

> The editor can load a design straight from Onshape (paste a file URL / element ID via the Onshape button in the header, or enable **Load from Onshape API** in Settings) or from a saved `.json` design file.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

<h3><a href="https://drive.google.com/file/d/11JvI0_eOK7G1gY5_0m2Xgnq389_zEq_u/view?usp=sharing" target="_blank">SCF Demo Video</a></h3>

### Example Primitives
![Example primitive screen shots][primitive-shots]

<div align="center">
  <sub><em>
    The CeraPiper interface allows constructing pipes: (a) it exposes the design primitives as tools and provides a (b) 3D and
    (c) 2D preview of the cross section of the pipe. Here showing (d) curve and (e) connector primitives.
  </sub></em>
</div>

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- ROADMAP -->
## Roadmap
- Version 1 - 7/17/2025 - submission to ACM SCF 2025
- Version 1.1 - 8/8/2025 - Fixes and new features
  - Revamped the data structure that represents the extrusion
  - Implemented a feature to detect when an unsupported segment is too long
  - Implemented a feature to visualize hinges and curves in 3d (beta), also fixed dimension computations
  - Implemented a feature to edit previous segments
  - Implemented settings page for configuring kiln dimensions (beta), logging arduino serial output, and activating ofer mode
  - Fixed Arduino memory issues
  - Rendered machine
  - Tested CAD tool with machine to ensure all primitives work as intended
  - Cleaned up structure and documented code

- Version 2.0 - 12/20/2025 - OnShape integration, new features, and bug fixes
  - Implemented features and fixed bugs according to feedback from user study
  - Users can now fully edit primitives from the function stack
  - Users can also select items in the function stack to see where they are located in the 3D and 2D views
  - CeraPiper now is integrated with OnShape as an in-app extension, which enables users to CAD designs in OnShape and then open them up in CeraPiper automatically to fabricate them

- Version 2.1 - 7/8/2026 - Correct extrusion order from OnShape + fewer API calls
  - The printing order of imported designs now follows the order in which pipes were attached to each other in OnShape (decoded from each feature's attachment reference), so branching designs print each branch as one contiguous chain instead of splicing branches into the middle of the main body
  - Bounding boxes are now only used to position perpendicular attachments, with the old bounding-box ordering kept as a fallback
  - Greatly reduced the number of OnShape API requests per import (a typical design now needs 1 request instead of one per part) to conserve API credits

- Version 2.2 - 7/2026 - Branch junctions, ribbed branches, and the printable paper blueprint
  - Added the interactive **paper blueprint**: a 20 cm-wide bed instruction sheet that prints alongside the extrusion, with toggleable layers (grid, part name/number, outline, cut lines, guides, highlights, notes, clay top view, piece IDs) and per-bed part names, numbers, and notes
  - Added an **Extrude** action that compiles the design and prints the bed tabs, plus a per-bed tabs panel in the header
  - Perpendicular branch pipes now carve a matching hex hole in the host pipe, and the cut-out is marked on the blueprint for hand-carving during post-processing
  - Ribbed profiles are now supported on perpendicular / branch pipes
  - Fixed diameter and connector geometry for perpendicular connections
  - Firmware refinements: corrected die-travel depth (rib crest timing) and reversed the die direction to match the extrusion

<!-- See the [open issues](https://github.com/othneildrew/Best-README-Template/issues) for a full list of proposed features (and known issues). -->

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Next Steps
- Calipered test print to reconcile the die-travel reference constants before merging
- Tighter integration with the surrounding Onshape environment (reuse native CAD commands)
- Design the global 3D form first, then apply the primitives onto it (a recurring request from the user study)


<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->
<!-- ## License

Distributed under the Unlicense License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p> -->



<!-- CONTACT -->
## Contact

Matter of Tech Lab - [matteroftechlab.org](https://www.matteroftechlab.org/) - [matteroftechlab@gmail.com](matteroftechlab@gmail.com)

Project Link: [https://github.com/matteroftech/CeraPipes](https://github.com/matteroftech/CeraPipes)

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- ACKNOWLEDGMENTS -->
<!-- ## Acknowledgments

Use this space to list resources you find helpful and would like to give credit to. I've included a few of my favorites to kick things off!

* [Choose an Open Source License](https://choosealicense.com)
* [GitHub Emoji Cheat Sheet](https://www.webpagefx.com/tools/emoji-cheat-sheet)
* [Malven's Flexbox Cheatsheet](https://flexbox.malven.co/)
* [Malven's Grid Cheatsheet](https://grid.malven.co/)
* [Img Shields](https://shields.io)
* [GitHub Pages](https://pages.github.com)
* [Font Awesome](https://fontawesome.com)
* [React Icons](https://react-icons.github.io/react-icons/search)

<p align="right">(<a href="#readme-top">back to top</a>)</p> -->



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/othneildrew/Best-README-Template/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge
[forks-url]: https://github.com/othneildrew/Best-README-Template/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge
[stars-url]: https://github.com/othneildrew/Best-README-Template/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/othneildrew/Best-README-Template/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/othneildrew
[paper-teaser]: figures/paper_teaser.png
[software-diagram]: figures/software_architecture_v2.png
[cad-interface]: figures/cad_interface.png
[primitive-shots]: figures/primitive_shots.png
