"use client";

import { checkToken } from "@/lib/auth-actions";
import { cn } from "@/lib/utils";
import { useGetLoggedUserQuery } from "@/src/redux/features/resumeInfo";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { HiOutlineMenu, HiX } from "react-icons/hi";
import { removeToken } from "./auth/token";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
type User = {
  id: string;
  email: string;
  isEmailVerified: boolean;
  termsAccepted: boolean;
  role: "USER" | "ADMIN";
  createdAt: string;
  updatedAt: string;
  userProfile: {
    id: string;
    userId: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    designation: string | null;
    language: string | null;
    avatar: string | null;
    createdAt: string;
    updatedAt: string;
  };
};
const menuItems = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Pricing ", href: "#pricing" },
  { label: "Testimonials", href: "#testimonials" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userData, setUserData] = useState<User | null>(null);
  const [hasToken, setHasToken] = useState(false);

  // Check if token exists
  useEffect(() => {
    checkToken().then((tokenExists) => {
      setHasToken(tokenExists);
    });
  }, []);

  // Only call API if token exists
  const { data } = useGetLoggedUserQuery(undefined, {
    skip: !hasToken,
  }) as {
    data?: { data?: User };
    isLoading: boolean;
  };

  if (data?.data && !userData) {
    setUserData(data.data);
  }
  console.log(userData, "userData");

  const hanldeLogout = async () => {
    await removeToken();
    setUserData(null);
    setHasToken(false);
    window.location.href = "/";
  };

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
        {!userData ? (
          <div className="hidden md:flex items-center space-x-3.5">
            <Link
              href="/login?redirect=/"
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
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger className="flex justify-start items-center gap-3 cursor-pointer hover:opacity-90">
              <div className="px-4 py-2 rounded-full border shadow-lg shadow-primaryColor/80 border-primaryColor bg-white hidden md:flex items-center justify-center ">
                <span className="text-primaryColor font-semibold  text-base mr-4">
                  Welcome, {userData?.userProfile?.firstName}
                </span>
              </div>

              {/* <IoIosArrowDown size={24} className="text-whiteColor" /> */}
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="min-w-35 bg-red-300 border-0"
            >
              <DropdownMenuItem
                onClick={hanldeLogout}
                className="cursor-pointer text-white hover:bg-red-200! hover:text-red-600! font-semibold text-lg"
              >
                <LogOut className="text-blackColor" /> Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center gap-2">
          {userData && (
            <DropdownMenu>
              <DropdownMenuTrigger className="flex justify-start items-center gap-3 cursor-pointer hover:opacity-90">
                <div className="px-3 py-1.5 rounded-full border shadow-lg shadow-primaryColor/80 border-primaryColor bg-white  md:hidden items-center justify-center ">
                  <span className="text-primaryColor font-semibold  text-center text-sm md:text-base ">
                    Welcome, {userData?.userProfile?.firstName}
                  </span>
                </div>

                {/* <IoIosArrowDown size={24} className="text-whiteColor" /> */}
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="min-w-35 bg-red-300 border-0"
              >
                <DropdownMenuItem
                  onClick={hanldeLogout}
                  className="cursor-pointer text-white hover:bg-red-200! hover:text-red-600! font-semibold text-lg"
                >
                  <LogOut className="text-blackColor" /> Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
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
              href={item.href}
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
          {!userData && (
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
          )}
        </div>
      )}
    </header>
  );
}
