import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["gray-junction-arizona-roommate.trycloudflare.com", "desktop-gifts-pdas-pst.trycloudflare.com", 'localhost'],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "gray-junction-arizona-roommate.trycloudflare.com",
      },
      {
        protocol: "https",
        hostname: "desktop-gifts-pdas-pst.trycloudflare.com",
      },
    ],
  },
};

export default nextConfig;
