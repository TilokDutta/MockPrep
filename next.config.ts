import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    // Fallback configuration for unsupported Node.js modules in the browser
    config.resolve.fallback = {
      tls: false,
      net: false,
      fs: false,
      dns: false,
      child_process: false,
    };
    return config;
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
