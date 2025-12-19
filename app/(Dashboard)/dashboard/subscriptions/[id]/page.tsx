"use client";

import React, { useState, useEffect, useRef, startTransition } from "react";
import { ChevronDown, Plus, X } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  useGetSubscriptionByIdQuery,
  useUpdateSubscriptionMutation,
} from "@/src/redux/features/subscriptions";

export default function SubscriptionFormPage() {
  const { id } = useParams();
  const subscriptionId = Array.isArray(id) ? id[0] : id || "new";
  const isEdit = subscriptionId !== "new";

  const { data: subscription, isLoading } = useGetSubscriptionByIdQuery(id);

  const [updateSubscription, { isLoading: isUpdating }] =
    useUpdateSubscriptionMutation();

  const [formData, setFormData] = useState({
    type: subscription?.data?.type || "",
    price: subscription?.data?.price || 0,
    // cvOpt: subscription?.data?.cvOpt || "",
    maxCVs: subscription?.data?.maxCVs || "",
    benefits: "",
  });

  const [benefits, setBenefits] = useState<string[]>(
    subscription?.data?.benefits || []
  );

  const [showPlanDurationDropdown, setShowPlanDurationDropdown] =
    useState(false);
  // const [showCvOptDropdown, setShowCvOptDropdown] = useState(false);
  const planDurationRef = useRef<HTMLDivElement>(null);
  const dataInitializedRef = useRef(false);

  const packageTypeOptions = ["BASIC", "PREMIUM"];

  // Update form data when subscription data loads
  useEffect(() => {
    if (subscription?.data && isEdit && !dataInitializedRef.current) {
      const subscriptionData = subscription.data;
      // Necessary to sync form state with async-loaded subscription data
      startTransition(() => {
        setFormData({
          type: subscriptionData.type || "",
          price: subscriptionData.price || 0,
          maxCVs: subscriptionData.maxCVs || "",
          benefits: "",
        });
        setBenefits(subscriptionData.benefits || []);
      });
      dataInitializedRef.current = true;
    }
  }, [subscription?.data, isEdit]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        planDurationRef.current &&
        !planDurationRef.current.contains(event.target as Node)
      ) {
        setShowPlanDurationDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (field: string, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: field === "price" ? (value === "" ? 0 : Number(value)) : value,
    }));
  };

  const handleAddBenefit = () => {
    if (formData.benefits.trim()) {
      setBenefits((prev) => [...prev, formData.benefits.trim()]);
      setFormData((prev) => ({ ...prev, benefits: "" }));
    }
  };

  const handleRemoveBenefit = (index: number) => {
    setBenefits((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    const data = {
      ...formData,
      price: Number(formData.price),
      benefits,
    };

    await updateSubscription({ data, id });
    // console.log("Saving subscription:", { ...formData, benefits });
    // Implement save logic here
  };

  if (isLoading) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#5952FF]"></div>
          <p className="mt-4 text-[#4a4c56]">Loading subscription...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6 space-y-2">
        <h1 className="text-2xl font-semibold text-[#4a4c56]">Subscriptions</h1>
        <h2 className="text-[#A1A1A1]">Create and manage subscription plans</h2>

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-[#4a4c56] mt-4">
          <Link
            href="/dashboard/subscriptions"
            className="hover:text-[#5952FF]"
          >
            Membership Plans
          </Link>
          <span>&gt;</span>
          <span className="text-[#A1A1A1]">{isEdit ? "Edit" : "Add New"}</span>
        </div>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-lg p-6 shadow-sm ">
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Package Type */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-[#4a4c56] mb-2">
                Package Type
              </label>
              <div className="relative" ref={planDurationRef}>
                <button
                  type="button"
                  onClick={() => {
                    setShowPlanDurationDropdown(!showPlanDurationDropdown);
                    // setShowCvOptDropdown(false);
                  }}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-left flex items-center justify-between bg-white hover:border-gray-400 transition-colors"
                >
                  <span
                    className={
                      formData.type ? "text-[#4a4c56]" : "text-[#A1A1A1]"
                    }
                  >
                    {formData.type || "Select Package Type"}
                  </span>
                  <ChevronDown className="w-5 h-5 text-[#777980]" />
                </button>
                {showPlanDurationDropdown && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
                    {packageTypeOptions?.map((option: string) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => {
                          handleInputChange("type", option);
                          setShowPlanDurationDropdown(false);
                        }}
                        className="w-full text-left px-4 py-3 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg text-sm text-[#4a4c56]"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Price */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-[#4a4c56] mb-2">
                Price
              </label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => handleInputChange("price", e.target.value)}
                placeholder="Enter your price"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5952FF] focus:border-transparent"
              />
            </div>
          </div>

          {/* CV Opt */}
          {/* <div>
            <label className="block text-sm font-medium text-[#4a4c56] mb-2">
              CV Opt
            </label>
            <div className="relative" ref={cvOptRef}>
              <button
                type="button"
                onClick={() => {
                  setShowCvOptDropdown(!showCvOptDropdown);
                  setShowPlanDurationDropdown(false);
                }}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-left flex items-center justify-between bg-white hover:border-gray-400 transition-colors"
              >
                <span
                  className={
                    formData.cvOpt ? "text-[#4a4c56]" : "text-[#A1A1A1]"
                  }
                >
                  {formData.cvOpt || "Select Duration"}
                </span>
                <ChevronDown className="w-5 h-5 text-[#777980]" />
              </button>
              {showCvOptDropdown && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
                  {cvOptOptions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => {
                        handleInputChange("cvOpt", option);
                        setShowCvOptDropdown(false);
                      }}
                      className="w-full text-left px-4 py-3 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg text-sm text-[#4a4c56]"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div> */}

          {/* Number of CV */}
          <div>
            <label className="block text-sm font-medium text-[#4a4c56] mb-2">
              Number of CV
            </label>
            <input
              type="text"
              value={formData.maxCVs}
              onChange={(e) => handleInputChange("maxCVs", e.target.value)}
              placeholder="Enter your price"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5952FF] focus:border-transparent"
            />
          </div>

          {/* Benefits */}
          <div>
            <label className="block text-sm font-medium text-[#4a4c56] mb-2">
              Benefits
            </label>
            <div className="relative mb-3">
              <input
                type="text"
                value={formData.benefits}
                onChange={(e) => handleInputChange("benefits", e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddBenefit();
                  }
                }}
                placeholder="Input service name"
                className="w-full px-4 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5952FF] focus:border-transparent"
              />
              <button
                type="button"
                onClick={handleAddBenefit}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2  text-[#5952FF] rounded-lg transition-colors flex items-center justify-center"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>

            {/* Benefit Tags */}
            {benefits.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {benefits.map((benefit, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#E2DEFF] text-[#5952FF] rounded-lg text-sm"
                  >
                    {benefit}
                    <button
                      type="button"
                      onClick={() => handleRemoveBenefit(index)}
                      className=" rounded transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Save Button */}
          <div className="pt-4">
            <button
              type="button"
              onClick={handleSave}
              disabled={isUpdating}
              className="bg-[#5952FF] text-white font-medium py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isUpdating ? (
                <>
                  <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Saving...
                </>
              ) : (
                "Save"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
