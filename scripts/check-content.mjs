#!/usr/bin/env node
/**
 * Content guard. Run with `npm run check:content`.
 *
 * Compiles every `src/content/*.ts` to a throwaway CommonJS build with the project's own
 * TypeScript, then walks the real objects: every work page (`allWork`: the case studies, the
 * Pando brief and the side projects), the legacy `projects` list, the home page, /about and the
 * site settings. It fails (exit 1) when:
 *
 *  1. a work page lacks a `role`, a `listing` or a `sources` list, or two pages share a slug;
 *  2. a Stat has no source, or a source has neither `href` nor `path`;
 *  3. a footnote cannot be numbered: a case study's Stat source is not in its page's `sources`
 *     (a lineup `proof` resolves against `homeSources`), or on a brief, side or home page any
 *     source at all is not in that page's `sources`, by reference;
 *  4. a superscript footnote marker in prose points past the end of its page's `sources`, or a
 *     paragraph, version, status or next line on a brief or side page carries no marker;
 *  5. `listing.year` is set without a `yearSource`, or a Year source is missing from the home
 *     page's Sources list;
 *  6. a source `path` does not exist in the repo (the gitignored `content/source/resume/`,
 *     `essays/` and `cerapiper/user-study-paper/` exist only on Alex's machine and are skipped),
 *     or a `content/notes/` path names an `#anchor` that no `{#anchor}` heading defines;
 *  7. an ImageRef is not cleared and has no declared, cleared fallback; or it is missing alt
 *     text, a caption, a source or native dimensions; or its `src` is not
 *     `/images/<slug>/<id>.jpg`;
 *  8. a case study has more than three highlights or a highlight longer than 20 words, or a
 *     side project's target is not marked `kind: "target"`, or a fact row has no source;
 *  9. the Pando page carries any image, any dollar amount, or anything on the NDA list;
 * 10. any copy contains something that must never be published: a phone number, the résumé's
 *     "Cera Piper" spelling, a claim that the CAD paper is published, or an NDA term.
 *
 * Photos a page is still waiting for (`todoPhotos`) print as warnings and never fail the run.
 */

import { execFileSync } from "node:child_process";
import { createRequire } from "node:module";
import { mkdtempSync, rmSync, existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname, resolve, basename, relative, isAbsolute } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const tsc = join(root, "node_modules", ".bin", "tsc");
const contentDir = join(root, "src", "content");

const errors = [];
const warnings = [];
const reported = new Set();
const fail = (where, message, key = `${where}|${message}`) => {
  if (reported.has(key)) return;
  reported.add(key);
  errors.push(`${where}: ${message}`);
};
const warn = (where, message) => warnings.push(`${where}: ${message}`);

/* ------------------------------------------------------------- compile -- */

if (!existsSync(tsc)) {
  console.error("check:content — TypeScript is not installed. Run `npm install` first.");
  process.exit(1);
}

const files = readdirSync(contentDir)
  .filter((name) => name.endsWith(".ts") && !name.endsWith(".d.ts"))
  .sort()
  .map((name) => join(contentDir, name));

const out = mkdtempSync(join(tmpdir(), "content-check-"));
const modules = {};
try {
  execFileSync(
    tsc,
    [
      ...files,
      "--outDir", out,
      "--rootDir", contentDir,
      "--module", "commonjs",
      "--moduleResolution", "node",
      "--target", "es2022",
      "--esModuleInterop",
      "--skipLibCheck",
      "--strict",
    ],
    { cwd: root, stdio: ["ignore", "pipe", "pipe"] },
  );
  const require_ = createRequire(import.meta.url);
  for (const file of files) {
    const name = basename(file, ".ts");
    modules[name] = require_(join(out, `${name}.js`));
  }
} catch (error) {
  const detail = error.stdout?.toString() || error.stderr?.toString() || error.message;
  console.error("check:content — could not compile src/content:\n" + detail);
  rmSync(out, { recursive: true, force: true });
  process.exit(1);
}

const need = (module, name) => {
  const value = modules[module]?.[name];
  if (value === undefined) fail(`${module}.ts`, `does not export \`${name}\``);
  return value;
};

const workOrder = need("projects", "workOrder") ?? [];
// Legacy exports, read while the old home and case templates still use them. The visual
// rebuild may delete them; the checks below then simply have less to look at.
const projects = modules.projects?.projects ?? [];
const homeSources = modules.projects?.homeSources ?? [];
const homeHero = modules.projects?.homeHero;
const nowAndNext = modules.projects?.nowAndNext;
const contactBand = modules.projects?.contactBand;
const sideProjects = need("side-projects", "sideProjects") ?? [];
const allWork = need("side-projects", "allWork") ?? [];
const workBySlug = need("side-projects", "workBySlug");
const nextWork = need("side-projects", "nextWork");
const home = need("home", "home");
const about = need("about", "about");
const site = need("site", "site");

/* --------------------------------------------------------------- shapes -- */

const isObject = (v) => typeof v === "object" && v !== null;
const isImage = (v) => isObject(v) && typeof v.src === "string" && typeof v.cleared === "boolean";
const isStat = (v) =>
  isObject(v) && typeof v.value === "string" && typeof v.label === "string" && !isImage(v);
const SOURCE_KEYS = new Set(["name", "href", "path", "claim", "note"]);
const isSource = (v) =>
  isObject(v) &&
  typeof v.name === "string" &&
  !Array.isArray(v) &&
  Object.keys(v).every((k) => SOURCE_KEYS.has(k));
/** An Award: a named record that must carry its own citation. */
const isRecord = (v) => isObject(v) && typeof v.name === "string" && !isSource(v) && "source" in v;

/**
 * Walk a value, reporting every ImageRef, Stat and Source with the path it was found at.
 * `guarded` is true while inside a node that declares a cleared `fallback`.
 */
function walk(value, path, visit, guarded = false) {
  if (Array.isArray(value)) {
    value.forEach((v, i) => walk(v, `${path}[${i}]`, visit, guarded));
    return;
  }
  if (!isObject(value)) return;

  if (isImage(value)) {
    visit({ kind: "image", value, path, guarded });
    return;
  }
  if (isStat(value)) {
    visit({ kind: "stat", value, path, guarded });
    if (isSource(value.source)) visit({ kind: "source", value: value.source, path: `${path}.source` });
    return;
  }
  if (isSource(value)) {
    visit({ kind: "source", value, path });
    return;
  }
  if (isRecord(value)) {
    visit({ kind: "record", value, path });
  }

  const hasFallback = isImage(value.fallback) && value.fallback.cleared === true;
  for (const [key, child] of Object.entries(value)) {
    walk(child, `${path}.${key}`, visit, guarded || (hasFallback && key !== "fallback"));
  }
}

/** Call `fn(text, path)` for every string under `value`, skipping the keys in `skip`. */
function eachString(value, path, fn, skip = new Set()) {
  if (typeof value === "string") return fn(value, path);
  if (Array.isArray(value)) return value.forEach((v, i) => eachString(v, `${path}[${i}]`, fn, skip));
  if (isObject(value)) {
    for (const [k, v] of Object.entries(value)) {
      if (!skip.has(k)) eachString(v, `${path}.${k}`, fn, skip);
    }
  }
}

/* -------------------------------------------------------------- sources -- */

/** Folders that are gitignored because the repo is public: they exist only on Alex's machine. */
const PRIVATE_FOLDERS = [
  "content/source/resume/",
  "content/source/essays/",
  "content/source/cerapiper/user-study-paper/",
];

const anchorCache = new Map();
/** Every `{#id}` defined at the end of a Markdown heading in `file`. */
function anchorsOf(file) {
  if (!anchorCache.has(file)) {
    const text = readFileSync(file, "utf8");
    const ids = new Set();
    for (const match of text.matchAll(/^#{1,6}\s.*\{#([A-Za-z0-9_-]+)\}\s*$/gm)) ids.add(match[1]);
    anchorCache.set(file, ids);
  }
  return anchorCache.get(file);
}

function checkPath(path, where) {
  const [file, anchor] = path.split("#");
  if (!file || isAbsolute(file) || relative(root, join(root, file)).startsWith("..")) {
    fail(where, `source path "${path}" must be relative to the repo root`, `path|${path}`);
    return;
  }
  if (PRIVATE_FOLDERS.some((folder) => file.startsWith(folder))) return;
  const abs = join(root, file);
  if (!existsSync(abs) || !statSync(abs).isFile()) {
    fail(where, `source path "${path}" does not exist`, `path|${path}`);
    return;
  }
  if (anchor && file.startsWith("content/notes/") && !anchorsOf(abs).has(anchor)) {
    fail(where, `source path "${path}": no heading in ${file} defines {#${anchor}}`, `path|${path}`);
  }
}

function checkSource(source, where) {
  if (!isSource(source)) {
    fail(where, "source is missing or malformed");
    return;
  }
  if (!source.name.trim()) fail(where, "source has no name");
  if (!source.href && !source.path) {
    fail(where, `source "${source.name}" has neither an href nor a path`);
  }
  if (source.path) checkPath(source.path, where);
}

function checkImage(image, where, guarded) {
  const { id, src, width, height, alt, caption } = image;
  if (!id) fail(where, "image has no id");
  if (!alt || !alt.trim()) fail(where, `image "${id}" has no alt text`);
  if (!caption || !caption.trim()) fail(where, `image "${id}" has no caption`);
  if (!(width > 0) || !(height > 0)) fail(where, `image "${id}" has no native dimensions`);
  if (!/^\/images\/[a-z-]+\/[a-z0-9-]+\.jpg$/.test(src)) {
    fail(where, `image "${id}" has src "${src}", expected /images/<slug>/<id>.jpg`);
  } else if (!src.endsWith(`/${id}.jpg`)) {
    fail(where, `image "${id}" has src "${src}", which does not end in its id`);
  }
  checkSource(image.source, `${where} (image ${id})`);
  if (image.cleared === false && !guarded) {
    fail(where, `image "${id}" is not cleared and has no declared fallback`);
  }
}

/* ------------------------------------------------------------ footnotes -- */

const SUPERSCRIPT = { "⁰": 0, "¹": 1, "²": 2, "³": 3, "⁴": 4, "⁵": 5, "⁶": 6, "⁷": 7, "⁸": 8, "⁹": 9 };

/** The footnote numbers in a string: a run of superscript digits is one number (`¹⁰` is ten). */
function footnoteMarkers(text) {
  const found = [];
  let digits = "";
  for (const ch of Array.from(text)) {
    if (ch in SUPERSCRIPT) {
      digits += SUPERSCRIPT[ch];
      continue;
    }
    if (digits) found.push(Number(digits));
    digits = "";
  }
  if (digits) found.push(Number(digits));
  return found;
}

/** Every marker under `value` must point into `list`. */
function checkMarkers(value, path, list, listName, skip) {
  eachString(
    value,
    path,
    (text, where) => {
      for (const n of footnoteMarkers(text)) {
        if (n < 1 || n > list.length) {
          fail(where, `footnote ${n} points past the end of ${listName} (${list.length} sources)`);
        }
      }
    },
    skip,
  );
}

/** A line that states a fact on a brief or side page must carry a footnote marker. */
function requireMarker(text, where) {
  if (typeof text !== "string" || !text.trim()) {
    fail(where, "is empty");
    return;
  }
  if (footnoteMarkers(text).length === 0) fail(where, `has no footnote marker: “${text.slice(0, 70)}”`);
}

/* ---------------------------------------------------------- work pages -- */

const KINDS = new Set(["case", "brief", "side"]);
const SKIP_SOURCES = new Set(["sources"]);
const SKIP_CASE = new Set(["sources", "proof"]);
const words = (text) => text.split(/\s+/).filter(Boolean).length;

const slugs = new Set();
for (const page of allWork) {
  const where = `work.${page?.slug ?? "(no slug)"}`;
  if (!isObject(page) || typeof page.slug !== "string") {
    fail("allWork", "contains an entry with no slug");
    continue;
  }
  if (slugs.has(page.slug)) fail(where, "slug is used by two pages");
  slugs.add(page.slug);
  if (!KINDS.has(page.kind)) fail(where, `kind "${page.kind}" is not case, brief or side`);
  if (typeof page.title !== "string" || !page.title.trim()) fail(where, "page has no title");
  if (typeof page.role !== "string" || !page.role.trim()) fail(where, "page has no role");
  const sources = Array.isArray(page.sources) ? page.sources : [];
  if (sources.length === 0) fail(where, "page has no sources");

  // Listing: the home row and the page's meta row.
  const listing = page.listing;
  if (!isObject(listing)) {
    fail(where, "page has no listing");
  } else {
    for (const key of ["type", "role"]) {
      if (typeof listing[key] !== "string" || !listing[key].trim()) fail(`${where}.listing`, `has no ${key}`);
    }
    if (!isObject(listing.cover)) fail(`${where}.listing`, "has no cover");
    if (listing.year !== undefined && !isSource(listing.yearSource)) {
      fail(`${where}.listing`, `year "${listing.year}" has no yearSource`);
    }
    if (listing.yearSource && Array.isArray(home?.sources) && !home.sources.includes(listing.yearSource)) {
      fail(`${where}.listing.yearSource`, "is not in home.sources, so the Year column cannot be footnoted");
    }
  }

  // Highlights (case studies): three at most, 20 words or fewer each.
  if (page.highlights !== undefined) {
    if (!Array.isArray(page.highlights) || page.highlights.length > 3) {
      fail(`${where}.highlights`, "has more than three lines");
    } else {
      page.highlights.forEach((line, i) => {
        if (words(line) > 20) fail(`${where}.highlights[${i}]`, `has ${words(line)} words (20 at most)`);
      });
    }
  }

  // Brief and side pages: every fact row sourced, every prose line footnoted.
  if (page.kind === "brief" || page.kind === "side") {
    (page.facts ?? []).forEach((row, i) => {
      if (!Array.isArray(row.sources) || row.sources.length === 0) {
        fail(`${where}.facts[${i}]`, `fact “${row.term}” has no source`);
      }
    });
    if (!Array.isArray(page.sections) || page.sections.length === 0) fail(where, "page has no sections");
    (page.sections ?? []).forEach((section, i) =>
      (section.paragraphs ?? []).forEach((text, j) =>
        requireMarker(text, `${where}.sections[${i}].paragraphs[${j}]`),
      ),
    );
    (page.versions ?? []).forEach((row, i) => requireMarker(row.sentence, `${where}.versions[${i}].sentence`));
    requireMarker(page.status, `${where}.status`);
    if (page.kind === "side") requireMarker(page.next, `${where}.next`);
    for (const text of page.todoPhotos ?? []) warn(where, `photo still to come — ${text}`);
  }
  if (page.kind === "side") {
    if (!Array.isArray(page.targets)) fail(where, "side project has no targets list (use [] for none)");
    (page.targets ?? []).forEach((stat, i) => {
      if (stat?.kind !== "target") fail(`${where}.targets[${i}]`, `“${stat?.label}” is not marked kind: "target"`);
    });
    if (!isObject(page.architecture) || !Array.isArray(page.architecture.layers)) {
      fail(where, "side project has no architecture drawing");
    } else if (page.architecture.links?.length !== page.architecture.layers.length - 1) {
      fail(`${where}.architecture`, "needs exactly one link between each pair of layers");
    }
  }

  // Every image, stat and source on the page.
  const scoped = page.kind === "brief" || page.kind === "side";
  walk(page, where, ({ kind, value, path, guarded }) => {
    if (kind === "image") checkImage(value, path, guarded);
    if (kind === "record") checkSource(value.source, `${path} (award “${value.name}”)`);
    if (kind === "source") {
      checkSource(value, path);
      if (scoped && !path.startsWith(`${where}.sources[`) && !sources.includes(value)) {
        fail(path, `cites “${value.name}”, which is not in ${where}.sources by reference, so it cannot be numbered`);
      }
    }
    if (kind === "stat") {
      checkSource(value.source, path);
      if (!scoped) {
        const isProof = path === `${where}.proof`;
        const list = isProof ? homeSources : sources;
        if (isSource(value.source) && !list.includes(value.source)) {
          fail(
            path,
            `stat "${value.label}" cites a source that is not in ${
              isProof ? "homeSources" : `${where}.sources`
            }, so it cannot be numbered`,
          );
        }
      }
    }
  });

  checkMarkers(page, where, sources, `${where}.sources`, page.kind === "case" ? SKIP_CASE : SKIP_SOURCES);
  if (page.kind === "case" && page.proof) checkMarkers(page.proof, `${where}.proof`, homeSources, "homeSources");
}

// Lists and helpers agree with each other.
for (const project of projects) {
  if (!allWork.includes(project)) fail(`projects.${project.slug}`, "is not in allWork");
}
for (const page of [...workOrder, ...sideProjects]) {
  if (!allWork.includes(page)) fail(`work.${page.slug}`, "is in workOrder or sideProjects but not in allWork");
}
if (typeof workBySlug === "function" && typeof nextWork === "function" && allWork.length > 0) {
  for (const page of allWork) {
    if (workBySlug(page.slug) !== page) fail(`work.${page.slug}`, "workBySlug does not return this page");
  }
  if (workBySlug("no-such-page") !== undefined) fail("workBySlug", "returns a page for an unknown slug");
  const seen = new Set();
  let page = allWork[0];
  for (let i = 0; i < allWork.length; i++) {
    seen.add(page.slug);
    page = nextWork(page.slug);
  }
  if (seen.size !== allWork.length || page !== allWork[0]) {
    fail("nextWork", "does not visit every page once and return to the first");
  }
}

/* ------------------------------------------------- home, about, site -- */

if (isObject(home)) {
  const list = Array.isArray(home.sources) ? home.sources : [];
  if (list.length === 0) fail("home", "has no sources");
  walk(home, "home", ({ kind, value, path, guarded }) => {
    if (kind === "image") checkImage(value, path, guarded);
    if (kind === "record") checkSource(value.source, `${path} (award “${value.name}”)`);
    if (kind === "stat") checkSource(value.source, path);
    if (kind === "source") {
      checkSource(value, path);
      if (!path.startsWith("home.sources[") && !list.includes(value)) {
        fail(path, `cites “${value.name}”, which is not in home.sources by reference, so it cannot be numbered`);
      }
    }
  });
  checkMarkers(home, "home", list, "home.sources", SKIP_SOURCES);
}

if (isObject(about)) {
  checkMarkers(about, "about", about.sources ?? [], "about.sources", SKIP_SOURCES);
}

for (const [name, value] of Object.entries({ homeHero, nowAndNext, contactBand, about, site })) {
  if (value === undefined) continue;
  walk(value, name, ({ kind, value: v, path, guarded }) => {
    if (kind === "image") checkImage(v, path, guarded);
    if (kind === "source") checkSource(v, path);
    if (kind === "record") checkSource(v.source, `${path} (award “${v.name}”)`);
    if (kind === "stat") checkSource(v.source, path);
  });
}

/* -------------------------------------------------------- Pando (NDA) -- */
/*
 * Pando Surgical is under an NDA (root CLAUDE.md, Pando Surgical). The general list below runs
 * over every word of copy; this stricter one runs over the Pando page only, where even a
 * dollar sign or the word "cost" means something from the never-publish list got in.
 */

const pandoDenylist = [
  { re: /\$\s?\d|\d\s?(USD|dollars?)\b/i, why: "a dollar amount" },
  { re: /\b(costs?|costing|cogs|pric(e|es|ed|ing)|profit\w*|margins?)\b/i, why: "cost, pricing or profitability" },
  { re: /projection|forecast|\bsales\b|\bunits? sold\b|market size/i, why: "sales, unit or market projections" },
  { re: /invest|\bfund(s|ed|ing)?\b|fundrais|valuation|\bgrants?\b|applications?\b/i, why: "funding, investors or applications" },
  { re: /regulat|\bFDA\b|510\s*\(\s*k\s*\)|clearance|approval/i, why: "regulatory pathway" },
  { re: /\bISO\b|eQMS|quality system|certif/i, why: "quality-system or certification work" },
  { re: /licens|equity|\boptions?\b|\bIP\b/i, why: "IP, licensing, equity or options" },
  { re: /\bpatents?\b(?!\s+pending)/i, why: "patent details beyond “patent pending”" },
  { re: /second product|confidential|roadmap|pipeline|next product/i, why: "a product or roadmap item other than the LapRotator" },
  { re: /survey|interview/i, why: "survey or interview results" },
];

const pando = allWork.find((page) => page.slug === "pando-surgical");
if (!pando) {
  fail("work", "has no pando-surgical page");
} else {
  if (pando.kind !== "brief") fail("work.pando-surgical", "must use the brief template");
  walk(pando, "work.pando-surgical", ({ kind, value, path }) => {
    if (kind === "image") fail(path, `image “${value.id}”: no Pando image is cleared; use todoPhotos and the task drawing`);
  });
  eachString(pando, "work.pando-surgical", (text, where) => {
    for (const { re, why } of pandoDenylist) {
      if (re.test(text)) fail(where, `NDA: ${why}: “${text.slice(0, 80)}”`);
    }
  });
}

/* ------------------------------------------------- never-publish strings -- */

const forbidden = [
  { re: /\b\d{3}[.\-\s]\d{3}[.\-\s]\d{4}\b/, why: "looks like a phone number" },
  { re: /\bCera Piper\b/, why: "the résumé's misspelling; the tool is CeraPiper" },
  {
    re: /CAD (paper|layer)[^.]{0,60}\b(is |was )?published\b/i,
    why: "the CAD paper is under anonymous review, not published",
  },
  // The Pando NDA, across every page. "Projection" alone is allowed: Bloom has projection code.
  { re: /510\s*\(\s*k\s*\)/i, why: "NDA: regulatory pathway (510(k))" },
  { re: /\beQMS\b/i, why: "NDA: quality system (eQMS)" },
  { re: /ISO\s*13485/i, why: "NDA: quality system (ISO 13485)" },
  { re: /\bCOGS\b/i, why: "NDA: cost of goods (COGS)" },
  { re: /\bmargins?\b/i, why: "NDA: profitability (margin)" },
  { re: /valuation/i, why: "NDA: funding (valuation)" },
  { re: /fundrais/i, why: "NDA: funding (fundraising)" },
  { re: /\b(sales|units?|market|revenue|financial)\s+projections?\b/i, why: "NDA: sales, unit or market projections" },
  { re: /confidential\s+product/i, why: "NDA: a confidential product" },
];

const allCopy = { allWork, projects, homeHero, nowAndNext, contactBand, home, about, site };
eachString(allCopy, "content", (text, where) => {
  for (const { re, why } of forbidden) {
    if (re.test(text)) fail(where, `${why}: “${text.slice(0, 80)}”`, `${text}|${why}`);
  }
});

/* ---------------------------------------------------------------- report -- */

rmSync(out, { recursive: true, force: true });

if (warnings.length > 0) {
  console.warn(`check:content — ${warnings.length} warning${warnings.length === 1 ? "" : "s"} (not failures):`);
  for (const message of warnings) console.warn(`  ! ${message}`);
}

if (errors.length > 0) {
  console.error(`check:content — ${errors.length} problem${errors.length === 1 ? "" : "s"}:`);
  for (const message of errors) console.error(`  • ${message}`);
  process.exit(1);
}

const footnotes =
  allWork.reduce((n, page) => n + page.sources.length, 0) +
  (about?.sources?.length ?? 0) +
  (home?.sources?.length ?? 0);
const byKind = (kind) => allWork.filter((page) => page.kind === kind).length;
console.log(
  `check:content — ok: ${allWork.length} work pages (${byKind("case")} case, ${byKind("brief")} brief, ${byKind(
    "side",
  )} side), ${footnotes} footnotes; every stat sourced, every footnote resolvable, every image cleared or fallen back, no NDA terms.`,
);
