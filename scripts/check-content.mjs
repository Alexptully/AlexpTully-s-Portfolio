#!/usr/bin/env node
/**
 * Content guard. Run with `npm run check:content`.
 *
 * Compiles `src/content/*.ts` to a throwaway CommonJS build with the project's own
 * TypeScript, then walks the real objects and fails (exit 1) when:
 *
 *  1. a Project lacks a `role`;
 *  2. a Stat has no source, or its source has neither `href` nor `path`;
 *  3. an ImageRef reachable from a Project has `cleared: false` and is not guarded by a
 *     declared, cleared `fallback`;
 *  4. a footnote cannot be numbered: a Stat's source is not present, by reference, in the
 *     page's `sources` array;
 *  5. an ImageRef is missing alt text, a caption, a source, or native dimensions, or its
 *     `src` does not match `/images/<slug>/<id>.jpg`;
 *  6. any copy contains something that must never be published (a phone number, the
 *     résumé's "Cera Piper" spelling, or a claim that the CAD paper is published).
 */

import { execFileSync } from "node:child_process";
import { createRequire } from "node:module";
import { mkdtempSync, rmSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const tsc = join(root, "node_modules", ".bin", "tsc");

const errors = [];
const fail = (where, message) => errors.push(`${where}: ${message}`);

/* ------------------------------------------------------------- compile -- */

if (!existsSync(tsc)) {
  console.error("check:content — TypeScript is not installed. Run `npm install` first.");
  process.exit(1);
}

const out = mkdtempSync(join(tmpdir(), "content-check-"));
let content;
try {
  execFileSync(
    tsc,
    [
      join(root, "src/content/types.ts"),
      join(root, "src/content/site.ts"),
      join(root, "src/content/projects.ts"),
      join(root, "src/content/about.ts"),
      "--outDir", out,
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
  content = {
    projects: require_(join(out, "projects.js")),
    about: require_(join(out, "about.js")),
    site: require_(join(out, "site.js")),
  };
} catch (error) {
  const detail = error.stdout?.toString() || error.stderr?.toString() || error.message;
  console.error("check:content — could not compile src/content:\n" + detail);
  rmSync(out, { recursive: true, force: true });
  process.exit(1);
}

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

/* --------------------------------------------------------------- checks -- */

function checkSource(source, where) {
  if (!isSource(source)) {
    fail(where, "source is missing or malformed");
    return;
  }
  if (!source.name.trim()) fail(where, "source has no name");
  if (!source.href && !source.path) {
    fail(where, `source "${source.name}" has neither an href nor a path`);
  }
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

const { projects, homeSources, homeHero, nowAndNext, contactBand } = content.projects;
const { about } = content.about;
const { site } = content.site;

for (const project of projects) {
  const where = `projects.${project.slug}`;
  if (typeof project.role !== "string" || !project.role.trim()) {
    fail(where, "project has no role");
  }
  if (!Array.isArray(project.sources) || project.sources.length === 0) {
    fail(where, "project has no sources");
  }

  walk(project, where, ({ kind, value, path, guarded }) => {
    if (kind === "image") checkImage(value, path, guarded);
    if (kind === "source") checkSource(value, path);
    if (kind === "record") checkSource(value.source, `${path} (award “${value.name}”)`);
    if (kind === "stat") {
      checkSource(value.source, path);
      const list = path.endsWith(".proof") ? homeSources : project.sources;
      if (isSource(value.source) && !list.includes(value.source)) {
        fail(
          path,
          `stat "${value.label}" cites a source that is not in ${
            path.endsWith(".proof") ? "homeSources" : `${where}.sources`
          }, so it cannot be numbered`,
        );
      }
    }
  });
}

for (const [name, value] of Object.entries({ homeHero, nowAndNext, contactBand, about, site })) {
  walk(value, name, ({ kind, value: v, path, guarded }) => {
    if (kind === "image") checkImage(v, path, guarded);
    if (kind === "source") checkSource(v, path);
    if (kind === "record") checkSource(v.source, `${path} (award “${v.name}”)`);
    if (kind === "stat") checkSource(v.source, path);
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
];

const seen = new Set();
function scanStrings(value, path) {
  if (typeof value === "string") {
    for (const { re, why } of forbidden) {
      if (re.test(value)) {
        const key = `${path}|${why}`;
        if (!seen.has(key)) {
          seen.add(key);
          fail(path, `${why}: “${value.slice(0, 80)}”`);
        }
      }
    }
    return;
  }
  if (Array.isArray(value)) return value.forEach((v, i) => scanStrings(v, `${path}[${i}]`));
  if (isObject(value)) {
    for (const [k, v] of Object.entries(value)) scanStrings(v, `${path}.${k}`);
  }
}
scanStrings({ projects, homeHero, nowAndNext, contactBand, about, site }, "content");

/* ---------------------------------------------------------------- report -- */

rmSync(out, { recursive: true, force: true });

if (errors.length > 0) {
  console.error(`check:content — ${errors.length} problem${errors.length === 1 ? "" : "s"}:`);
  for (const message of errors) console.error(`  • ${message}`);
  process.exit(1);
}

console.log(
  `check:content — ok: ${projects.length} projects, ${
    projects.reduce((n, p) => n + p.sources.length, 0) + about.sources.length + homeSources.length
  } footnotes, every stat sourced and every image cleared or fallen back.`,
);
