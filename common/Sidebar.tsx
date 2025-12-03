"use client";

import { X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import {
  LayoutDashboard,
  FileText,
  FolderOpen,
  CreditCard,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";

interface NavItem {
  icon: React.ReactNode;
  label: string;
  href: string;
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const navItems: NavItem[] = [
    {
      icon: <LayoutDashboard size={20} />,
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      icon: <FileText size={20} />,
      label: "Submissions",
      href: "/dashboard/submissions",
    },
    {
      icon: <FolderOpen size={20} />,
      label: "Templates",
      href: "/dashboard/templates",
    },
    {
      icon: <CreditCard size={20} />,
      label: "Subscriptions",
      href: "/dashboard/subscriptions",
    },
    {
      icon: <BarChart3 size={20} />,
      label: "Activity Logs",
      href: "/dashboard/activity-logs",
    },
  ];

  const pathname = usePathname();
  const router = useRouter();

  const isActive = (href: string): boolean => {
    const pathWithoutLocale =
      pathname?.replace(/^\/[a-z]{2}(?=\/|$)/, "") || "/";
    if (href === "/dashboard") {
      return pathWithoutLocale === "/dashboard" || pathWithoutLocale === "/";
    }
    return pathWithoutLocale.startsWith(href);
  };

  const handleLogout = () => {
    // Handle logout logic here
    router.push("/login");
  };
  return (
    <div className="h-screen">
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="absolute top-0 left-0 w-full h-full z-40 xl:hidden bg-black/50"
          onClick={onClose}
        />
      )}

      {/* Sidebar container */}
      <div
        className={`
          ${
            isOpen
              ? "z-50 h-full overflow-hidden absolute top-0 left-0"
              : "h-full"
          }
          flex flex-col
          bg-white
          w-full overflow-y-auto
        `}
      >
        <div className="flex justify-end xl:hidden cursor-pointer p-4">
          <button onClick={onClose} className="hover:opacity-70">
            <X size={24} />
          </button>
        </div>

        {/* App Name Section */}
        <div className="px-6 py-6">
          <Link href="/dashboard" className="block">
            <h1 className="text-3xl font-bold text-purple-600">CVdigger</h1>
          </Link>
        </div>

        {/* Navigation Items */}
        <div className="px-4 space-y-1">
          {navItems.map((item, idx) => {
            const active = isActive(item.href);
            return (
              <Link
                key={idx}
                href={item.href}
                onClick={onClose}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-lg
                  transition-colors duration-200
                  ${
                    active
                      ? "bg-purple-600 text-white"
                      : "text-black hover:bg-gray-100"
                  }
                `}
              >
                <div className="shrink-0">{item.icon}</div>
                <span className="text-base font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Bottom Section - Settings and Log out */}
        <div className="mt-auto px-4 py-4 space-y-1">
          <Link
            href="/dashboard/settings"
            onClick={onClose}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-black hover:bg-gray-100 transition-colors duration-200"
          >
            <Settings size={20} />
            <span className="text-base font-medium">Settings</span>
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors duration-200 w-full"
          >
            <LogOut size={20} />
            <span className="text-base font-medium">Log out</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
