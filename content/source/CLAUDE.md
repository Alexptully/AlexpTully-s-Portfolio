# Source material index

This folder holds Alex's original documents, copied from his claude.ai "Resume" Project.
It is reference material for writing the site. Nothing here is served to the web. To use
an image on the site, copy an optimized version into `public/images/<project-slug>/`.

How to read it:
- Multi-page documents are a folder with `text.md` (every page's text, with `## Page N`
  headings) and `pages/page-NN.jpg`. Grep or read `text.md` first. Open page images only
  for photos, charts, CAD renders, or layout.
- Single images (résumé, portfolio pages, slides, posters) have no text file, so view the
  image itself.
- If two sources disagree, prefer `resume/resume-current.png`, then flag the conflict with
  a `TODO(alex):` comment.

## resume/
| File | Contents |
|---|---|
| `resume-current.png` | Current résumé: CeraPiper internship (summer 2026), Stevens, Octura, NYU Tandon, Take the World Forward, Tully Tech inventions, skills, contact |
| `resume-older.png` | Earlier résumé version, before CeraPiper; includes a community engagement section |

## portfolio/
Alex's own one-page project summaries: role, design notes, awards.
| File | Project |
|---|---|
| `01-monti-robot.jpg` | Monti Robot, FTC #17253 (captain) |
| `02-swerve-drive.jpg` | Swerve Drive, FTC #14712 (electrical lead) |
| `03-honu-robot.jpg` | Honu Robot, FTC #14712 (electrical lead): 1st in NYC, 2nd Think Award at Worlds |
| `04-ball-drive.jpg` | Ball-Drive, FTC #17253 (ops lead/captain) |
| `05-scorpion-robot.jpg` | Scorpion Robot, FTC #17253 (fabrication lead) |
| `06-electric-road.jpg` | Electric Road, individual Mastery project |
| `07-community-events.jpg` | Outreach: Hudson Guild, Hour of Code, e-waste drive |

## robotics/
| Path | Contents |
|---|---|
| `tritonics-portfolio/` | Tritonics 17253 engineering portfolio, technical pages: Monty robot overview, intake, transfer, launcher, mechanical system integration, teleop/autonomous software, and Connect (expert network) |
| `championships-presentation/` | Tritonics team pages: Connect (outreach projects), Reach (recruitment, FIRST ambassador), Sustain (team development), Reach planning, team structure, team planning/SWOT |
| `posters/poster-a` … `poster-f` | Single poster pages: Sustain, Reach, Control, Design |
| `posters/poster-deck/` | Full 30-page poster deck (`text.md` + pages) |

## anticam/
| Path | Contents |
|---|---|
| `pitch-deck-outline.md` | Storyline, slide plan, visual system, and **sourced statistics**. Use these stats and their sources |
| `pitch-deck-build.js` | Script that generated the AntiCam pitch deck (reference for copy and colors) |
| `mastery-learning-plan/` | 3-page AntiCam project plan (2025–2026) |
| `camera-blinder-presentation/` | 20-slide AntiCam / camera blinder presentation: prototypes, tests, photos |
| `ethics-of-tully-tech/` | 9-page essay on AntiCam's ethics (May 2025). Good source for the "built to protect people" framing |

## prosthetic-arm/
| Path | Contents |
|---|---|
| `design-brief/` | 16-slide design brief: problem, audience statistics, design, prototypes |

## cerapiper/
| Path | Contents |
|---|---|
| `README.md` | CeraPiper CAD tool: architecture, features, version history. The earlier CAM tool was published at ACM SCF 2025 |
| `user-study-paper/` | 20-page paper draft on the CAD layer. **Under anonymous review: do not call it published or quote it on the site** |

## essays/
| File | Contents |
|---|---|
| `college-essays-private.txt` | Alex's private college essay drafts and notes. Use only to confirm facts, such as awards, outreach numbers, and prosthetic backstory. Never quote or paraphrase essay passages on the site |

## Internal documents not in this repo
Facts for the fall 2026 projects come from Alex's internal documents. They stay where they
live and are never copied here: this repo is public. Each one is cited by its title only. One
fact per bullet, with that title as the source, is recorded in
`content/notes/sections/14-new-projects.md`. Never commit their raw text, file IDs or links,
and never name teammates from them.

| Title | Where it lives | Covers | Publication rule |
|---|---|---|---|
| Pando Surgical team meeting notes, 30 September 2026 (internal) | Meeting notes | Alex introduced as Pando's new PM; Pando as a surgical-ergonomics medtech startup; the task system he built | Pando NDA: public basics only (root `CLAUDE.md`, Pando Surgical). No quotes, no names, nothing from the never-publish list |
| Pando Surgical Executive Summary (internal) | Google Drive | The LapRotator (patent pending): one-handed laparoscope rotation | Pando NDA: the LapRotator description only. Nothing else from this document may be used |
| Pando Surgical Task Hub (Notion, internal) | Notion | The Notion task hub with per-person views that Alex set up | Cite only as evidence that the task system exists. No screenshots, task contents or names |
| Bloom PRD F26, Terra Labs (internal) | Google Drive | Bloom v0.2 (22 September 2026): microphone and voice-ID concept | Facts only. Do not name the voice-ID app |
| Bloom PRD F26 v2 (NFC), Terra Labs (internal) | Google Drive | Bloom v0.3: concept, Alex's role, versions, bracelet and station hardware, targets, dates | Facts by title. Targets labelled as targets. Demo date to be confirmed |
| Bloom BOM F26 v2 (NFC), Terra Labs (internal) | Google Drive | Bill of materials; budget and per-bracelet targets; breadboard prototype parts | Only the targets and part names already in `14-new-projects.md`. No line-item prices or supplier links |
| Bloom Task Sheet F26 v2 (NFC), Terra Labs (internal) | Google Drive | Build tasks and the breadboard bracelet v0 status | Status facts only. No names or assignments |
| Bloom Terra Video.mp4 (September 2026) | Google Drive | Alex's Bloom concept video | Stills approved by Alex: bracelet or hands only, no faces, no text overlays. Chosen stills go in `bloom/video-stills/`. The video file is never committed (gitignored) |
| Terra Labs project notes, October 2026 (internal) | Meeting notes (30 September to 15 October 2026) | Robotic-arm flower: concept, wristband control, Alex's role, status and open questions | Facts by title. The working name "Chorus" is not public until Alex confirms. No names |
| Design reference screen recording (supplied by Alex) | Google Drive; local working copy in `content/reference/` (gitignored) | Transitions, interactions and layout studied for the redesign | Never committed. Never name or link the reference portfolio. Copy none of its text, images, logos or code |
