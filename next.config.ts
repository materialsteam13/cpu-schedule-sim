import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export", // Enables static site export
  images: {
    unoptimized: true, // Fixes image issues with static export
  },
  trailingSlash: true, // Ensures correct routing for GitHub Pages
};

export default nextConfig;
