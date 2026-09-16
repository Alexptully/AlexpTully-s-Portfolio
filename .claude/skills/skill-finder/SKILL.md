---
name: skill-finder
description: Analyzes a project or task the user describes, scans all available skills (public, examples, and connected plugins), identifies which existing skills are relevant, and drafts + packages any missing skills as installable .skill files. Use this whenever the user starts a new project, says things like "what skills do I need for this", "set me up for this project", "find relevant skills", "auto-detect skills for this", or wants Claude to proactively assemble the right toolkit before diving into a multi-step body of work. Trigger even if the user just describes a goal (e.g. "I'm building a financial model and want to review contracts too") without explicitly asking for skills.
---

# Skill Finder

Identifies which of Claude's available skills fit a project, and creates + packages new ones to cover any gaps. The user still has to click "Save skill" to actually install a packaged skill — that's a claude.ai account action Claude cannot perform on the user's behalf — so this skill's job is to do all the analysis and packaging work and hand the user a one-click result.

## When to use this

- User describes a new project, workflow, or recurring task ("I'm starting a small business", "I run financial diligence on companies", "I need to manage a product roadmap and write specs")
- User explicitly asks what skills exist or would help
- User asks to "set up" or "prep" for a body of work

Don't use this for one-off questions that don't imply an ongoing project.

## Workflow

### 1. Understand the project

Pull project details from the conversation so far. If genuinely underspecified (e.g. just "help me set up skills"), ask one concise question about what kind of work they're doing — don't interrogate with a long form.

Produce a short internal list of the *capabilities* the project needs (e.g. "financial modeling", "contract review", "customer sentiment analysis", "sprint planning").

### 2. Inventory available skills

List every skill currently available to Claude, across all sources:

```bash
ls /mnt/skills/public /mnt/skills/private /mnt/skills/examples /mnt/skills/plugins 2>/dev/null
```

For each candidate, read its `description` frontmatter (view the SKILL.md, or just the first ~10 lines) rather than guessing from the name — names are often abbreviated or namespaced (e.g. `daloopa:dcf`).

Also check the live `<available_skills>` list already provided in context for this conversation — it's the authoritative, currently-loaded set, and is faster than re-scanning disk.

### 3. Match capabilities to skills

For each capability identified in step 1, find the best-matching existing skill(s). Sort into:

- **Already available** — a skill exists and its description covers this capability. These need no action; they'll trigger automatically when relevant. Just tell the user about them.
- **Available but requires a connector** — the skill exists (e.g. a `small-business:*` or `daloopa:*` skill) but depends on an MCP connector (QuickBooks, HubSpot, PayPal, etc.) that may not be connected yet. Flag this so the user knows to connect it.
- **Gap** — no existing skill reasonably covers the capability.

Be honest about partial matches — don't force-fit an unrelated skill just to claim coverage.

### 4. Fill gaps

For each genuine gap, and only after confirming with the user which gaps are worth building for (don't build five skills unprompted — check first, e.g. via `ask_user_input_v0` with a multi-select of the gap list), use the **skill-creator** skill's workflow (`/mnt/skills/examples/skill-creator/SKILL.md`) to draft a new SKILL.md for that capability. Keep the interview lightweight here — you already have project context, so don't re-ask questions you can infer.

Skip the full eval/benchmark loop from skill-creator unless the user wants it; for this workflow a solid first draft plus a quick sanity-check run-through is usually enough.

### 5. Package and present

For every newly drafted skill, package it:

```bash
python -m scripts.package_skill /home/claude/skill-finder/<skill-name>
```

(run from inside `/mnt/skills/examples/skill-creator`, or point `PYTHONPATH` at it)

Copy resulting `.skill` files to `/mnt/user-data/outputs/` and use `present_files` to hand them to the user. Presenting the file shows a **Save skill** button — the user clicks it to actually install. Do not claim the skill is "installed" until the user confirms they've done this.

### 6. Summarize

Give the user a short readout:
- Skills already covering their project (no action needed)
- Skills that need a connector connected first
- New skills packaged and ready to save (with the file(s) attached)

Keep this concise — a short list, not a report.
