"use client";

import { Facebook, Instagram } from "lucide-react";
import Link from "next/link";
import { FaXTwitter } from "react-icons/fa6";
import { LiaLinkedin } from "react-icons/lia";

const quickLinks = [
  { name: "Product", slug: "/" },
  { name: "Privacy", slug: "/" },
  { name: "Contact", slug: "/" },
];

export default function Footer() {
  return (
    <div className="bg-[#001F1A]">
      <div className="py-16">
        <div className="container">
          {/* TOP SECTION */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">
            {/* Logo + tagline */}
            <div>
              <Link
                href="/"
                className="text-[#5952FF] text-3xl font-bold tracking-wide"
              >
                CVdigger
              </Link>
              <p className="text-gray-200 mt-4 text-sm md:text-base">
                cvtailor.ai — your AI career partner
              </p>
            </div>

            {/* Links */}
            <div>
              <h1 className="text-white font-bold tracking-wide text-lg text-center">
                Links
              </h1>
              <div className="flex justify-center gap-6 mt-6 flex-wrap">
                {quickLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.slug}
                    className="text-gray-200 text-sm md:text-base hover:text-[#5952FF] transition"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Social Icons */}
            <div>
              <h1 className="text-white font-bold tracking-wide text-lg text-center">
                Connect
              </h1>
              <div className="flex justify-center gap-6 mt-6">
                <Facebook
                  size={22}
                  className="cursor-pointer text-gray-200 hover:text-[#5952FF]"
                />
                <Instagram
                  size={22}
                  className="cursor-pointer text-gray-200 hover:text-[#5952FF]"
                />
                <FaXTwitter
                  size={22}
                  className="cursor-pointer text-gray-200 hover:text-[#5952FF]"
                />
                <LiaLinkedin
                  size={22}
                  className="cursor-pointer text-gray-200 hover:text-[#5952FF]"
                />
              </div>
            </div>
          </div>

          {/* BOTTOM SECTION */}
          <div className="mt-12 md:mt-20 border-t border-gray-600 pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-gray-400 text-sm md:text-base text-center md:text-left">
            <p>Copyright 2025 cvtailor ai. All Rights Reserved</p>
            <p>Made with AI for AI-optimized careers</p>
          </div>
        </div>
      </div>
    </div>
  );
}
