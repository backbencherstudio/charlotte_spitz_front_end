"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { HiOutlineMenu, HiX } from "react-icons/hi";

import { cn } from "@/lib/utils";

const menuItems = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Pricing ", href: "#pricing" },
  { label: "Testimonials", href: "#testimonials" },
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
              href={item.href}
              className={cn(
                "hover:text-primaryColor transition",
                pathname === item.label ? "text-primaryColor" : "text-white"
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
            className="flex items-center gap-2 
        bg-transparent text-white 
        font-semibold px-6 py-2 rounded-full 
        border border-white hover:scale-105 
        hover:shadow-lg hover:shadow-primaryColor/80 
        transition-all duration-300 cursor-pointer group text-lg  justify-center"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="flex items-center gap-2 
        bg-primaryColor text-white 
        font-semibold px-6 py-2 rounded-full 
        hover:bg-primaryColor/90 hover:scale-105 
        hover:shadow-lg hover:shadow-primaryColor/80 
        transition-all duration-300 cursor-pointer group text-lg  justify-center"
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
