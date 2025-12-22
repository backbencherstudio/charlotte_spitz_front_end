import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Allow ANY HTTPS image
      {
        protocol: "https",
        hostname: "**",
      },
      // Allow localhost HTTP (for development)
      {
        protocol: "http",
        hostname: "localhost",
        port: "7000",
      },
    ],
  },
};

export default nextConfig;
