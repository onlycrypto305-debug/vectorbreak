import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export — produces a pure HTML/CSS/JS bundle in out/ on `next build`.
  // Suitable for Netlify drag-and-drop, S3+CloudFront, GitHub Pages, etc.
  output: "export",
  // next/image's optimizer requires a runtime; static export skips it.
  images: { unoptimized: true },
  // Optional: trailing slash makes Netlify's directory routing more forgiving.
  trailingSlash: true,
};

export default nextConfig;
