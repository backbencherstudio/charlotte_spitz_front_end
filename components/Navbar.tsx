"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { HiOutlineMenu, HiX } from "react-icons/hi";

import { cn } from "@/lib/utils";

const menuItems = [
  { label: "How it works" },
  { label: "Pricing " },
  { label: "Testimonials" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-[#000000] py-5">
      <div className="container mx-auto flex justify-between items-center">
        {/* Left: Logo */}
        <Link
          href="/"
          className="text-[#5952FF] text-xl md:text-3xl font-bold tracking-wide"
        >
          CVdigger
        </Link>

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
        <div className="hidden md:flex items-center space-x-3.5">
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
            <Link href="/login" className="text-white text-base">
              Login
            </Link>
            <Link
              href="/signup"
              className=" text-white font-medium cursor-pointer  text-base px-6 py-2 rounded-full bg-[#5952FF]"
            >
              Sign up
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
