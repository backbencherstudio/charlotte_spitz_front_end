"use client";

import Header from "@/common/Header";
import Sidebar from "@/common/Sidebar";
import React, { useState } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex">
      <div className="w-full max-w-[238px]">
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
      </div>
      <main className="w-full">
        <Header />
        <div className=" bg-[#FAFAFA]">{children}</div>
      </main>
    </div>
  );
}
