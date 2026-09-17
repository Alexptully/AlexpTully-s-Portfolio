import { ImageResponse } from "next/og";
import { site } from "@/content/site";

/**
 * Home Open Graph image (design-spec §14): the site's dark ground, the name at display size
 * and the one-sentence description, in the sans that `next/og` bundles. Flexbox only, as the
 * renderer requires. Generated at build time.
 */

export const alt = site.metaTitle;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// §2.1 tokens, as literals: the renderer has no stylesheet.
const bg = "#0B0E13";
const ink = "#F3EFE7";
const muted = "#98A2AE";
const accent = "#FF3B6F";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: bg,
          color: ink,
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 112, fontWeight: 400, letterSpacing: "-0.02em", lineHeight: 1 }}>
          {site.name}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div style={{ display: "flex", maxWidth: 980, fontSize: 40, lineHeight: 1.3, color: ink }}>
            {site.metaDescription}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 20, fontSize: 28, color: muted }}>
            {/* The one accent: a light, as on the site. */}
            <div style={{ display: "flex", width: 14, height: 14, borderRadius: 7, background: accent }} />
            <div style={{ display: "flex" }}>{site.website.label}</div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
