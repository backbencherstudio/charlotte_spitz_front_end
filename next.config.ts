import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["gray-junction-arizona-roommate.trycloudflare.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "gray-junction-arizona-roommate.trycloudflare.com",
      },
    ],
  },
};

export default nextConfig;
