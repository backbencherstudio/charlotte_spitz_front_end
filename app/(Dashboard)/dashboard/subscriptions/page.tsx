"use client";

import React, { useEffect } from "react";
import { Rocket, Crown, Check, Edit } from "lucide-react";
import Link from "next/link";
import { useGetAllSubscriptionsQuery } from "@/src/redux/features/subscriptions";

interface Subscription {
  id: string;
  name: string;
  type: string;
  price: string;
  benefits: string[];
  maxCVs?: string;
}

export default function SubscriptionsPage() {
  const { data: subscriptions } = useGetAllSubscriptionsQuery({});

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-8 space-y-1.5">
        <h1 className="text-3xl font-bold">Subscriptions</h1>
        <h2 className="text-[#A1A1A1]">Create and manage subscription plans</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
        {subscriptions?.data?.map((pkg: Subscription) => (
          <div key={pkg.id} className="bg-white rounded-lg p-6 shadow-sm">
            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              {pkg.type === "BASIC" ? (
                <Rocket className="w-5 h-5 text-[#4a4c56]" />
              ) : (
                <Crown className="w-5 h-5 text-[#4a4c56]" />
              )}
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
                <span className="text-sm text-[#A1A1A1]">{"/ One Time"}</span>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-3 mb-6">
              {pkg?.benefits?.map((feature: string, index: number) => (
                <div key={index} className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-[#5952FF] shrink-0" />
                  <span className="text-sm text-[#4a4c56]">{feature}</span>
                </div>
              ))}
            </div>

            {/* Edit Button */}
            <Link
              href={`/dashboard/subscriptions/${pkg?.id}`}
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
