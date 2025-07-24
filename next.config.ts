import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['drive.google.com'],
  },
  experimental: {
    serverActions: {},
  },
};

export default nextConfig;
