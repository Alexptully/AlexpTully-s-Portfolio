import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Next 16 defaults to WebP only and a single quality of 75.
    formats: ["image/avif", "image/webp"],
    qualities: [60, 75, 90],
  },
};

export default nextConfig;
