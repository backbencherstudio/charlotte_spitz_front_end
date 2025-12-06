"use client";

import Profile from "@/components/dashboard/settings/Profile";

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-muted px-4 py-6 md:px-8 md:py-8">
      <div className="mx-auto w-full">
        <Profile />
      </div>
    </div>
  );
}
