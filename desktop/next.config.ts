import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export",
  images: {
    unoptimized: true,
  },
  devIndicators: {
    buildActivity: false,
  },
};

export default nextConfig;
