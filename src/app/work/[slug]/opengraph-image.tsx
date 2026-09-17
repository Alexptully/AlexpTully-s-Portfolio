import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { site } from "@/content/site";
import { projectBySlug, projects } from "@/content/projects";
import type { ProjectSlug } from "@/content/types";

/**
 * Per-case-study Open Graph image (design-spec §14): the hero on its plate ground with the
 * product name and Alex's role, 1200×630, built with `ImageResponse` (flexbox only). Fully
 * static: one PNG per slug at build time.
 */

export const alt = `${site.name}: a case study`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export const dynamicParams = false;

/* Tokens from globals.css §2.1, repeated here because the image renders outside the DOM. */
const BG = "#0B0E13";
const INK = "#F3EFE7";
const MUTED = "#98A2AE";
const PLATE_LIGHT = "#E6E7E9";
const CLAY = "#9A9087";

const PLATE = { width: 600, height: 630, inset: 48 };

/** The hero photograph as a data URI at its real pixel size, never upscaled. */
async function heroImage(src: string) {
  const file = path.join(process.cwd(), "public", src);
  const buffer = await readFile(file);
  const meta = await sharp(buffer).metadata();
  const width = meta.width ?? 0;
  const height = meta.height ?? 0;
  const scale = Math.min(1, (PLATE.width - PLATE.inset * 2) / width, (PLATE.height - PLATE.inset * 2) / height);
  return {
    dataUri: `data:image/jpeg;base64,${buffer.toString("base64")}`,
    width: Math.round(width * scale),
    height: Math.round(height * scale),
  };
}

/**
 * Host Grotesk at 300 for the title, fetched from Google Fonts at build time in a format
 * Satori reads (TTF). Falls back to the renderer's default face if the network is closed.
 */
async function hostGrotesk(): Promise<ArrayBuffer | null> {
  try {
    const css = await fetch("https://fonts.googleapis.com/css2?family=Host+Grotesk:wght@300&display=swap", {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; satori)" },
      signal: AbortSignal.timeout(8000),
    }).then((r) => r.text());
    const url = css.match(/src:\s*url\((https:[^)]+\.ttf)\)/)?.[1];
    if (!url) return null;
    return await fetch(url, { signal: AbortSignal.timeout(8000) }).then((r) => r.arrayBuffer());
  } catch {
    return null;
  }
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projectBySlug[slug as ProjectSlug];
  const hero = project.hero;
  const photo = "kind" in hero ? null : await heroImage(hero.src);
  const ground = "kind" in hero ? BG : hero.ground === "light" ? PLATE_LIGHT : BG;
  const font = await hostGrotesk();

  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", background: BG, color: INK }}>
        <div
          style={{
            display: "flex",
            width: PLATE.width,
            height: PLATE.height,
            background: ground,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {photo ? (
            <img src={photo.dataUri} width={photo.width} height={photo.height} alt="" />
          ) : (
            <svg width={360} height={360} viewBox="-100 -100 200 200" fill="none" stroke={CLAY} strokeWidth={2}>
              <polygon points="90,0 45,78 -45,78 -90,0 -45,-78 45,-78" />
              <polygon points="52,0 26,45 -26,45 -52,0 -26,-45 26,-45" fill={CLAY} fillOpacity={0.3} />
            </svg>
          )}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: size.width - PLATE.width,
            padding: 56,
          }}
        >
          <div style={{ display: "flex", fontSize: 26, color: MUTED }}>{site.name}</div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                fontSize: project.title.length > 20 ? 60 : 76,
                fontWeight: 300,
                lineHeight: 1.02,
                letterSpacing: "-0.02em",
              }}
            >
              {project.title}
            </div>
            <div style={{ display: "flex", marginTop: 28, fontSize: 24, lineHeight: 1.4, color: MUTED }}>
              {project.role}
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: font ? [{ name: "Host Grotesk", data: font, weight: 300, style: "normal" }] : undefined,
    },
  );
}
