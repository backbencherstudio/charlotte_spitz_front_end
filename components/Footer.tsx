"use client";

import { Facebook, Instagram } from "lucide-react";
import Link from "next/link";
import { FaXTwitter } from "react-icons/fa6";
import { LiaLinkedin } from "react-icons/lia";

const quickLinks = [
  { name: "Product", slug: "/" },
  { name: "Privacy", slug: "/privacy" },
  { name: "Contact", slug: "/contact" },
];

export default function Footer() {
  return (
    <div className="bg-[#001F1A]">
      <div className="py-20">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <h1 className="text-[#5952FF] text-3xl font-bold tracking-wide ">
                CVdigger
              </h1>
              <p className="text-gray-200 mt-4">
                cvtailor.ai--your AI career partner
              </p>
            </div>
            <div>
              <h1 className="text-white font-bold tracking-wide text-center">
                Links
              </h1>
              <p className="text-gray-200 mt-7 justify-center flex gap-4">
                {quickLinks.map((link) => (
                  <Link key={link.name} href={link.slug}>
                    {" "}
                    {link.name}{" "}
                  </Link>
                ))}
              </p>
            </div>
            <div>
              <h1 className="text-white font-bold tracking-wide text-center">
                Connect
              </h1>
              <p className="text-gray-200 mt-7 justify-center flex gap-4">
                <Facebook size={20} className="inline-block cursor-pointer" />
                <Instagram size={20} className="inline-block cursor-pointer" />
                <FaXTwitter size={20} className="inline-block cursor-pointer" />
                <LiaLinkedin
                  size={20}
                  className="inline-block cursor-pointer"
                />
              </p>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="flex items-center justify-between mt-[100px] border-t border-gray-600 pt-6">
            <h1 className="text-gray-400">
              Copyright 2025 cvtailor ai. All Rights Reserved
            </h1>
            <h1 className="text-gray-400">
              Made with AI for AI-optimized careers
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
