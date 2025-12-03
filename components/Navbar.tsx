"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BsGlobe2 } from "react-icons/bs";
import { HiOutlineMenu, HiX } from "react-icons/hi";

import { cn } from "@/lib/utils";

const menuItems = [
  { label: "How it works" },
  { label: "Pricing " },
  { label: "Testimonials" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [language, setLanguage] = useState<"en" | "bn">("en");
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-[#000000] py-5">
      <div className="container mx-auto flex justify-between items-center">
        {/* Left: Logo */}
        <div className="text-[#5952FF] text-3xl font-bold tracking-wide">
          CVdigger
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-6 text-base">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              href={item.label}
              className={cn(
                "hover:text-secondaryColor transition",
                pathname === item.label ? "text-secondaryColor" : "text-white"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right: Language, Auth Buttons */}
        <div className="flex items-center space-x-3.5">
          <Link
            href="/login"
            className="text-white text-base bg-transparent border border-white px-6 py-2 rounded-full"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className=" text-white font-medium cursor-pointer  text-base px-6 py-2 rounded-full bg-[#5952FF]"
          >
            Sign up
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white text-2xl"
          >
            {menuOpen ? <HiX /> : <HiOutlineMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Content */}
      {menuOpen && (
        <div className="md:hidden px-4 mt-4 space-y-3">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              href={item.label}
              className={cn(
                "block text-base py-2",
                pathname === item.label ? "text-secondaryColor" : "text-white"
              )}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}

          {/* Language Dropdown (Mobile) */}
          <div className=" flex  items-center justify-between">
            <div className="text-white text-base flex items-center gap-2 ">
              <BsGlobe2 />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as "en" | "bn")}
                className="bg-transparent outline-none text-white"
              >
                <option value="en" className="text-black">
                  English
                </option>
                <option value="bn" className="text-black">
                  বাংলা
                </option>
              </select>
            </div>

            <Link href="/login" className="text-white text-base">
              Login
            </Link>
            <Link
              href="/registration"
              className="bg-secondaryColor inline-block text-blackColor font-medium cursor-pointer  text-base px-4 py-2 rounded-[8px]"
            >
              Sign up
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
