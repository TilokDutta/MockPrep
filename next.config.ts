import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    // Client-side specific config
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback, // Preserve existing fallbacks
        // Explicitly ignore Node.js modules
        fs: false,
        child_process: false,
        net: false,
        tls: false,
        dns: false,
        path: false,
        os: false,
      };
    }
    return config;
  },
  eslint:{
    ignoreDuringBuilds:true,
  },
  typescript:{
    ignoreBuildErrors:true,
  }
};

export default nextConfig;