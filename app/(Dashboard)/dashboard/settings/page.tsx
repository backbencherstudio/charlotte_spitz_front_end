"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import PaymentsConfig from "@/components/dashboard/settings/PaymentsConfig";
import Storage from "@/components/dashboard/settings/Storage";
import EmailConfig from "@/components/dashboard/settings/EmailConfig";

const settingsMenu = [
  { id: "payments", label: "Payments config" },
  { id: "email", label: "Email config" },
  { id: "storage", label: "Storage" },
  { id: "profile", label: "Profile" },
];

export default function SettingsPage() {
  const router = useRouter();
  const [activeSetting, setActiveSetting] = useState<string>("payments");

  const handleMenuClick = (id: string) => {
    if (id === "profile") {
      router.push("/dashboard/profile");
    } else {
      setActiveSetting(id);
    }
  };

  const renderContent = () => {
    switch (activeSetting) {
      case "payments":
      default:
        return <PaymentsConfig />;
      case "storage":
        return <Storage />;
      case "email":
        return <EmailConfig />;
    }
  };

  return (
    <div className="min-h-screen bg-muted px-4 py-6 md:px-8 md:py-8">
      <div className="mx-auto flex w-full flex-col gap-6 md:flex-row">
        {/* Left settings navigation */}
        <aside className="w-full rounded-xl bg-card p-4 shadow-sm md:w-64">
          <div className="space-y-1">
            {settingsMenu.map((item) => {
              const isActive = activeSetting === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleMenuClick(item.id)}
                  className={`flex w-full items-center rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors cursor-pointer ${
                    isActive
                      ? "bg-[#5952FF] text-white"
                      : "text-foreground/70 bg-accent hover:text-accent-foreground"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </aside>

        {/* Right content card */}
        <main className="flex-1">
          <Card className="h-full">{renderContent()}</Card>
        </main>
      </div>
    </div>
  );
}
