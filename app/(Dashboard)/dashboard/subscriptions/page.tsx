"use client";

import React from "react";
import { Rocket, Crown, Check, Edit } from "lucide-react";
import Link from "next/link";

interface PackageFeature {
  text: string;
}

interface Package {
  id: string;
  name: string;
  icon: React.ReactNode;
  price: string;
  period: string;
  features: PackageFeature[];
  isPremium?: boolean;
}

export default function SubscriptionsPage() {
  const packages: Package[] = [
    {
      id: "basic",
      name: "Basic Package",
      icon: <Rocket className="w-5 h-5 text-[#4a4c56]" />,
      price: "$3",
      period: "/ One Time",
      features: [
        { text: "1 CV optimization" },
        { text: "Basic ATS score" },
        { text: "Standard templates" },
        { text: "Email support" },
      ],
    },
    {
      id: "premium",
      name: "Premium Package",
      icon: <Crown className="w-5 h-5 text-[#4a4c56]" />,
      price: "$19",
      period: "/ One Time",
      features: [
        { text: "Unlimited tailor credits" },
        { text: "Up to 10 PDF downloads" },
        { text: "1 Page Fit" },
        { text: "AI Bullet Rewrite" },
      ],
      isPremium: true,
    },
  ];

  const handleEdit = (packageId: string) => {
    console.log("Edit package:", packageId);
    // Implement edit logic here
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-8 space-y-1.5">
        <h1 className="text-3xl font-bold">Subscriptions</h1>
        <h2 className="text-[#A1A1A1]">Create and manage subscription plans</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className={`bg-white rounded-lg p-6 shadow-sm ${
              pkg.isPremium ? "" : ""
            }`}
          >
            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              {pkg.icon}
              <h3 className="text-lg font-semibold text-[#4a4c56]">
                {pkg.name}
              </h3>
            </div>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-[#5952FF]">
                  {pkg.price}
                </span>
                <span className="text-sm text-[#A1A1A1]">{pkg.period}</span>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-3 mb-6">
              {pkg.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-[#5952FF] shrink-0" />
                  <span className="text-sm text-[#4a4c56]">{feature.text}</span>
                </div>
              ))}
            </div>

            {/* Edit Button */}
            <Link
              href={`/dashboard/subscriptions/${pkg.id}`}
              className="w-full bg-[#5952FF]  text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <Edit className="w-4 h-4" />
              Edit
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
