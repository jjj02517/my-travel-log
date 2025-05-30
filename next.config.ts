import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.resolve = {
      ...(config.resolve || {}),
      alias: {
        ...(config.resolve?.alias || {}),
        "@": path.resolve(__dirname),
      },
    };

    return config;
  },
  images: {
    unoptimized: true,
  },
  transpilePackages: ["msw"],
};

export default nextConfig;
