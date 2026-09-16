#!/usr/bin/env node
/**
 * Crops and optimizes web-ready images from the source decks in content/source/.
 *
 * Usage:  node scripts/prepare-images.mjs [content/images.manifest.json] [--only=<slug>] [--dry]
 *
 * Manifest shape (JSON):
 * {
 *   "items": [
 *     {
 *       "id": "anticam-pin-v1",                       // output basename
 *       "slug": "anticam",                            // -> public/images/<slug>/<id>.{webp,png}
 *       "src": "content/source/anticam/camera-blinder-presentation/pages/page-12.jpg",
 *       "crop": { "left": 700, "top": 20, "width": 520, "height": 440 },   // optional, source px
 *       "width": 1200,                                 // optional: resize width (never upscales past 1.5x)
 *       "formats": ["webp", "png"],                    // optional, default ["webp"]
 *       "background": "#0B0E13",                       // optional: flatten transparent/white bg to this
 *       "trim": true,                                  // optional: trim uniform border
 *       "alt": "AntiCam pin V1 prototype, LED array exposed"  // stored in generated index for reference
 *     }
 *   ]
 * }
 * Writes public/images/index.json with { id, slug, files, width, height, alt } for every output.
 */
import sharp from "sharp";
import { promises as fs } from "node:fs";
import path from "node:path";

const args = process.argv.slice(2);
const manifestPath = args.find((a) => !a.startsWith("--")) ?? "content/images.manifest.json";
const only = args.find((a) => a.startsWith("--only="))?.slice(7);
const dry = args.includes("--dry");

const manifest = JSON.parse(await fs.readFile(manifestPath, "utf8"));
const index = [];

for (const item of manifest.items) {
  if (only && item.slug !== only) continue;
  const outDir = path.join("public", "images", item.slug);
  await fs.mkdir(outDir, { recursive: true });
  let img = sharp(item.src, { failOn: "none" }).rotate();
  const meta = await img.metadata();
  if (item.crop) {
    const c = item.crop;
    const left = Math.max(0, Math.round(c.left));
    const top = Math.max(0, Math.round(c.top));
    const width = Math.min(meta.width - left, Math.round(c.width));
    const height = Math.min(meta.height - top, Math.round(c.height));
    img = img.extract({ left, top, width, height });
  }
  if (item.trim) img = img.trim({ threshold: item.trimThreshold ?? 12 });
  if (item.background) img = img.flatten({ background: item.background });
  const cropped = await img.toBuffer();
  const cm = await sharp(cropped).metadata();
  let target = item.width ?? cm.width;
  const maxUpscale = 1.5;
  if (target > cm.width * maxUpscale) target = Math.round(cm.width * maxUpscale);
  const formats = item.formats ?? ["webp"];
  const files = [];
  for (const fmt of formats) {
    const outFile = path.join(outDir, `${item.id}.${fmt}`);
    if (!dry) {
      let pipe = sharp(cropped).resize({ width: target, withoutEnlargement: target <= cm.width, kernel: "lanczos3" });
      if (fmt === "webp") pipe = pipe.webp({ quality: item.quality ?? 86, effort: 6 });
      else if (fmt === "avif") pipe = pipe.avif({ quality: item.quality ?? 62 });
      else if (fmt === "png") pipe = pipe.png({ compressionLevel: 9, palette: false });
      else if (fmt === "jpg" || fmt === "jpeg") pipe = pipe.jpeg({ quality: item.quality ?? 86, mozjpeg: true });
      await pipe.toFile(outFile);
    }
    files.push(outFile.replace(/^public/, ""));
  }
  const finalH = Math.round((cm.height * target) / cm.width);
  index.push({ id: item.id, slug: item.slug, files, width: target, height: finalH, alt: item.alt ?? "", src: item.src, crop: item.crop ?? null });
  console.log(`${dry ? "[dry] " : ""}${item.slug}/${item.id}  ${cm.width}x${cm.height} -> ${target}x${finalH}  ${formats.join(",")}`);
}

if (!dry) {
  const indexPath = path.join("public", "images", "index.json");
  let existing = [];
  try { existing = JSON.parse(await fs.readFile(indexPath, "utf8")); } catch {}
  const merged = [...existing.filter((e) => !index.some((n) => n.id === e.id && n.slug === e.slug)), ...index];
  await fs.writeFile(indexPath, JSON.stringify(merged, null, 1));
}
