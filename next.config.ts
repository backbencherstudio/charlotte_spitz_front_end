import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    // Allow images from any domain
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
       },
    ],
  },
};

export default nextConfig;
