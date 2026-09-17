#!/usr/bin/env node
/**
 * WP2 image pipeline — design-spec.md §12.
 *
 *   node scripts/images/build.mjs [--only=<slug|id>] [--dry] [--qa=<dir>]
 *
 * Reads scripts/images/manifest.json (the §12.2 table as data), crops each source
 * page image, levels or keys its ground, and writes `<id>.jpg` (quality 90, the
 * static-import source for next/image) plus `<id>.webp` and `<id>.avif` next to it
 * in `public/images/<slug>/`.
 *
 * Rules implemented here (all from §12.1):
 *   - Never scale a crop past its native pixel width. `width` in the manifest is a
 *     ceiling, not a target: the output width is min(manifest width, crop width).
 *   - `ground: "dark"`  — level the near-black ground onto --bg #0B0E13 so the crop edge
 *     vanishes on a dark plate, mapping the measured ground level to the token and
 *     leaving 255 at 255 (see liftGround). Turn it off per item with `"key": false`.
 *   - `ground: "light"` — level the crop so its border median becomes --plate-light
 *     #E6E7E9, so every light plate shares one tone. Default levelling is a per-channel
 *     offset (`linear(1, target - median)`): it neutralises the slide's colour cast and
 *     moves the ground onto the token without touching contrast. `"level": "gain"`
 *     (linear(target/median, 0)) and `"level": "none"` are available per item.
 *   - `ground: "photo"` — a photograph that keeps its own ground: no key, no levelling.
 *   - The border median of every crop is sampled and printed, and stored in
 *     public/images/index.json, so the ground choice is data rather than eyeballing.
 *
 * Clearance (root CLAUDE.md + §12.2): an item with `"cleared": false` is NOT written to
 * public/. It is built into the QA directory instead so the crop can be reviewed, and it
 * is recorded in index.json with `cleared: false` and an empty `files` list. Every page
 * that references one of these ids renders a declared fallback (§4.3), so nothing breaks.
 *
 * Also writes:
 *   public/images/index.json   every output's final native width/height (for WP1)
 *   <qa>/contact-sheet.html    one tile per output, for visual inspection
 */
import sharp from "sharp";
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, "..", "..");

const args = process.argv.slice(2);
const only = args.find((a) => a.startsWith("--only="))?.slice("--only=".length);
const dry = args.includes("--dry");
const qaArg = args.find((a) => a.startsWith("--qa="))?.slice("--qa=".length);

const QA_DIR =
  qaArg ??
  process.env.WP2_QA_DIR ??
  "/tmp/claude-0/-home-user-AlexpTully-s-Portfolio/49cd1b5d-7702-5735-9111-01a9cde7fe59/scratchpad/qa";

const manifestPath = path.join(HERE, "manifest.json");
const manifest = JSON.parse(await fs.readFile(manifestPath, "utf8"));
const D = manifest.defaults;

const BG = hexToRgb(D.bg);
const PLATE_LIGHT = hexToRgb(D.plateLight);

function hexToRgb(hex) {
  const h = hex.replace("#", "");
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
}
function rgbToHex([r, g, b]) {
  return "#" + [r, g, b].map((v) => Math.round(v).toString(16).padStart(2, "0")).join("").toUpperCase();
}
function median(values) {
  const s = Float64Array.from(values).sort();
  const m = s.length >> 1;
  return s.length % 2 ? s[m] : Math.round((s[m - 1] + s[m]) / 2);
}

/** Median colour of the outer ring of a raw RGB buffer. */
function borderMedian(raw, width, height, ring) {
  const r = [];
  const g = [];
  const b = [];
  for (let y = 0; y < height; y++) {
    const edgeRow = y < ring || y >= height - ring;
    for (let x = 0; x < width; x++) {
      if (!edgeRow && x >= ring && x < width - ring) {
        x = width - ring - 1;
        continue;
      }
      const i = (y * width + x) * 3;
      r.push(raw[i]);
      g.push(raw[i + 1]);
      b.push(raw[i + 2]);
    }
  }
  return [median(r), median(g), median(b)];
}

/**
 * Move a near-black ground onto `bg` without losing anything above it.
 *
 * Per channel the measured ground level (`blackPoint`, the crop's border median, capped
 * so a mid-grey crop can never be crushed) is mapped to the token and 255 stays 255:
 *
 *     out = bg + (in - blackPoint) * (255 - bg) / (255 - blackPoint)
 *
 * The crop's ground becomes exactly #0B0E13 and vanishes into the plate, while every
 * tone above it keeps its gradation. This replaces a hard luminance key, which on these
 * renders — glossy black parts on a black ground, JPEG noise straddling the threshold —
 * quantised the whole object away.
 */
function liftGround(rgbRaw, width, height, blackPoint, bg) {
  const bp = blackPoint.map((v) => clamp(v, 0, 24));
  const lut = bp.map((b, c) => {
    const scale = (255 - bg[c]) / (255 - b);
    return Uint8Array.from({ length: 256 }, (_, v) => clamp(Math.round(bg[c] + (v - b) * scale), 0, 255));
  });
  const out = Buffer.alloc(width * height * 3);
  for (let i = 0; i < width * height * 3; i += 3) {
    out[i] = lut[0][rgbRaw[i]];
    out[i + 1] = lut[1][rgbRaw[i + 1]];
    out[i + 2] = lut[2][rgbRaw[i + 2]];
  }
  return out;
}

const publicIndex = [];
const sheet = [];
let built = 0;
let skipped = 0;

console.log(
  [
    "id".padEnd(28),
    "native".padEnd(11),
    "out".padEnd(11),
    "ground".padEnd(6),
    "border".padEnd(9),
    "dest",
  ].join(" "),
);
console.log("-".repeat(104));

for (const item of manifest.items) {
  if (only && item.slug !== only && item.id !== only) continue;

  const srcPath = path.join(ROOT, item.src);
  const source = sharp(srcPath, { failOn: "none" }).rotate();
  const meta = await source.metadata();

  const left = Math.max(0, Math.round(item.crop.left));
  const top = Math.max(0, Math.round(item.crop.top));
  const width = Math.min(meta.width - left, Math.round(item.crop.width));
  const height = Math.min(meta.height - top, Math.round(item.crop.height));
  if (width <= 0 || height <= 0) throw new Error(`${item.id}: crop falls outside ${item.src}`);

  let raw = await sharp(srcPath, { failOn: "none" })
    .rotate()
    .extract({ left, top, width, height })
    .removeAlpha()
    .toColourspace("srgb")
    .raw()
    .toBuffer();

  const ring = Math.max(2, Math.round(Math.min(width, height) * 0.02));
  const medianRgb = borderMedian(raw, width, height, ring);

  if (item.ground === "dark" && item.key !== false) {
    raw = liftGround(raw, width, height, medianRgb, BG);
  } else if (item.ground === "light" && item.level !== "none") {
    const mode = item.level ?? "offset";
    const pipe = sharp(raw, { raw: { width, height, channels: 3 } });
    const levelled =
      mode === "gain"
        ? pipe.linear(
            PLATE_LIGHT.map((t, i) => clamp(t / Math.max(1, medianRgb[i]), 0.5, 1.8)),
            [0, 0, 0],
          )
        : pipe.linear(
            [1, 1, 1],
            PLATE_LIGHT.map((t, i) => clamp(t - medianRgb[i], -60, 60)),
          );
    raw = await levelled.raw().toBuffer();
  }

  const outWidth = Math.min(item.width ?? width, width);
  const outHeight = Math.round((height * outWidth) / width);

  const cleared = item.cleared !== false;
  const destDir = cleared
    ? path.join(ROOT, "public", "images", item.slug)
    : path.join(QA_DIR, "uncleared", item.slug);

  const files = [];
  const diskFiles = [];
  for (const fmt of ["jpg", "webp", "avif"]) {
    const outFile = path.join(destDir, `${item.id}.${fmt}`);
    diskFiles.push(outFile);
    if (cleared) files.push(`/images/${item.slug}/${item.id}.${fmt}`);
    if (dry) continue;
    await fs.mkdir(destDir, { recursive: true });
    let pipe = sharp(raw, { raw: { width, height, channels: 3 } }).resize({
      width: outWidth,
      withoutEnlargement: true,
      kernel: "lanczos3",
    });
    if (fmt === "jpg") {
      pipe = pipe.jpeg({ quality: D.jpgQuality, mozjpeg: true, chromaSubsampling: "4:4:4" });
    } else if (fmt === "webp") {
      pipe = pipe.webp({ quality: D.webpQuality, effort: 6 });
    } else {
      pipe = pipe.avif({ quality: D.avifQuality, effort: 6, chromaSubsampling: "4:4:4" });
    }
    await pipe.toFile(outFile);
  }

  publicIndex.push({
    id: item.id,
    slug: item.slug,
    ground: item.ground,
    cleared,
    width: outWidth,
    height: outHeight,
    nativeCropWidth: width,
    nativeCropHeight: height,
    borderMedian: rgbToHex(medianRgb),
    files,
    alt: item.alt,
    usage: item.usage,
    src: item.src,
    crop: { left, top, width, height },
    ...(item.note ? { note: item.note } : {}),
  });

  sheet.push({ ...item, cleared, outWidth, outHeight, width, height, medianRgb, diskFiles });
  if (cleared) built++;
  else skipped++;

  console.log(
    [
      item.id.padEnd(28),
      `${width}x${height}`.padEnd(11),
      `${outWidth}x${outHeight}`.padEnd(11),
      item.ground.padEnd(6),
      rgbToHex(medianRgb).padEnd(9),
      cleared ? `public/images/${item.slug}/` : `QA only (cleared: false)`,
    ].join(" "),
  );
}

if (!dry && only) {
  console.log("-".repeat(104));
  console.log("--only is set: public/images/index.json and the contact sheet were left alone.");
  console.log("Run the script with no --only before finishing, so both cover every id.");
} else if (!dry) {
  publicIndex.sort((a, b) => a.id.localeCompare(b.id));
  await fs.mkdir(path.join(ROOT, "public", "images"), { recursive: true });
  await fs.writeFile(
    path.join(ROOT, "public", "images", "index.json"),
    JSON.stringify(
      {
        generatedBy: "scripts/images/build.mjs",
        spec: "content/notes/design-spec.md §12",
        tokens: { bg: D.bg, plateLight: D.plateLight },
        images: publicIndex,
      },
      null,
      2,
    ) + "\n",
  );
  await fs.mkdir(QA_DIR, { recursive: true });
  await fs.writeFile(path.join(QA_DIR, "contact-sheet.html"), contactSheet(sheet), "utf8");
}

console.log("-".repeat(104));
console.log(
  `${built} published to public/images, ${skipped} held in ${path.join(QA_DIR, "uncleared")} (cleared: false).`,
);
if (!dry) console.log(`Contact sheet: ${path.join(QA_DIR, "contact-sheet.html")}`);

function clamp(v, lo, hi) {
  return Math.min(hi, Math.max(lo, v));
}

function esc(s) {
  return String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
}

function contactSheet(rows) {
  const groups = new Map();
  for (const r of rows) {
    if (!groups.has(r.slug)) groups.set(r.slug, []);
    groups.get(r.slug).push(r);
  }
  const plateBg = { dark: D.bg, photo: D.bg, light: D.plateLight };
  const sections = [...groups.entries()]
    .map(
      ([slug, items]) => `
      <section>
        <h2>${esc(slug)} <span class="count">${items.length}</span></h2>
        <div class="grid">
          ${items
            .map(
              (r) => `
            <figure${r.cleared ? "" : ' class="held"'}>
              <div class="plate" style="background:${plateBg[r.ground]}">
                <img src="${esc(r.diskFiles[0])}" alt="${esc(r.alt)}" loading="lazy"
                     style="max-width:min(100%, ${r.outWidth}px)">
              </div>
              <figcaption>
                <b>${esc(r.id)}</b>
                <span class="meta">${r.outWidth}&times;${r.outHeight} px &middot; native ${r.width}&times;${r.height}
                  &middot; ground <i>${esc(r.ground)}</i> &middot; border
                  <span class="chip" style="background:${rgbToHex(r.medianRgb)}"></span>${rgbToHex(r.medianRgb)}</span>
                <span class="meta">${esc(r.usage)}</span>
                ${r.cleared ? "" : `<span class="flag">cleared: false &mdash; held out of public/, review only</span>`}
                ${r.note ? `<span class="note">${esc(r.note)}</span>` : ""}
                <span class="alt">${esc(r.alt)}</span>
                <span class="meta src">${esc(r.src)} &middot; crop ${r.crop.left}, ${r.crop.top}, ${r.crop.width}, ${r.crop.height}</span>
              </figcaption>
            </figure>`,
            )
            .join("")}
        </div>
      </section>`,
    )
    .join("");

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>WP2 contact sheet</title>
<style>
  :root {
    --bg: ${D.bg}; --surface: #151A22; --border: #232B36; --border-strong: #5A6473;
    --ink: #F3EFE7; --muted: #98A2AE; --quiet: #7B848F; --accent: #FF3B6F;
    --plate-light: ${D.plateLight};
  }
  * { box-sizing: border-box; }
  html { color-scheme: dark; }
  body {
    margin: 0; background: var(--bg); color: var(--ink);
    font: 400 16px/1.55 ui-sans-serif, system-ui, "Helvetica Neue", Arial, sans-serif;
    -webkit-font-smoothing: antialiased; font-variant-numeric: tabular-nums;
  }
  .wrap { max-width: 1200px; margin: 0 auto; padding: 48px 24px 96px; }
  h1 { font-size: clamp(2rem, 1.5rem + 2vw, 3rem); font-weight: 300; letter-spacing: -0.02em; margin: 0 0 12px; }
  .lede { color: var(--muted); max-width: 34rem; margin: 0 0 8px; }
  .lede code { color: var(--ink); }
  h2 {
    font-size: 24px; font-weight: 500; letter-spacing: -0.01em;
    margin: 64px 0 16px; padding-top: 16px; border-top: 1px solid var(--border);
  }
  .count { color: var(--quiet); font-weight: 400; font-size: 15px; }
  .grid { display: grid; gap: 32px; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); }
  figure { margin: 0; }
  .plate {
    border-radius: 16px; padding: 16px; display: flex; align-items: center; justify-content: center;
    min-height: 200px; outline: 1px solid var(--border); outline-offset: -1px;
  }
  .plate img { display: block; height: auto; border-radius: 2px; }
  figcaption { display: flex; flex-direction: column; gap: 4px; padding-top: 12px; }
  figcaption b { font-weight: 500; }
  .meta { font-size: 14px; color: var(--quiet); }
  .alt { font-size: 15px; color: var(--muted); }
  .src { word-break: break-all; }
  .note { font-size: 14px; color: var(--muted); }
  .chip {
    display: inline-block; width: 10px; height: 10px; border-radius: 2px;
    outline: 1px solid var(--border-strong); margin-right: 6px; vertical-align: -1px;
  }
  .held .plate { outline: 2px dashed var(--accent); }
  .flag { font-size: 14px; color: var(--accent); }
  a { color: inherit; }
  :focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
</style>
</head>
<body>
  <div class="wrap">
    <h1>WP2 contact sheet</h1>
    <p class="lede">Every output of <code>scripts/images/build.mjs</code>, on the plate ground it is
      destined for. Tiles are shown at their native output width, never scaled up.</p>
    <p class="lede">A pink dashed plate marks <code>cleared: false</code>: the file is built here for
      review only and is not written into <code>public/</code>.</p>
    ${sections}
  </div>
</body>
</html>
`;
}
