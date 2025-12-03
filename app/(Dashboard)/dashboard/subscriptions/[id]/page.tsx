"use client";

import React, { useState, useEffect, useRef } from "react";
import { ChevronDown, Plus, X } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function SubscriptionFormPage() {
  const params = useParams();
  const id = params.id as string;
  const isEdit = id !== "new";

  const [formData, setFormData] = useState({
    planDuration: "",
    price: "",
    cvOpt: "",
    numberOfCV: "",
    benefitInput: "",
  });

  const [benefits, setBenefits] = useState<string[]>([
    "1 CV optimization",
    "Basic ATS score",
    "Standard templates",
    "Email support",
  ]);

  const [showPlanDurationDropdown, setShowPlanDurationDropdown] =
    useState(false);
  const [showCvOptDropdown, setShowCvOptDropdown] = useState(false);
  const planDurationRef = useRef<HTMLDivElement>(null);
  const cvOptRef = useRef<HTMLDivElement>(null);

  const planDurationOptions = ["One Time", "Monthly", "Yearly", "Lifetime"];
  const cvOptOptions = [
    "1 CV optimization",
    "Unlimited CV optimization",
    "Basic ATS score",
  ];

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        planDurationRef.current &&
        !planDurationRef.current.contains(event.target as Node)
      ) {
        setShowPlanDurationDropdown(false);
      }
      if (
        cvOptRef.current &&
        !cvOptRef.current.contains(event.target as Node)
      ) {
        setShowCvOptDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddBenefit = () => {
    if (formData.benefitInput.trim()) {
      setBenefits((prev) => [...prev, formData.benefitInput.trim()]);
      setFormData((prev) => ({ ...prev, benefitInput: "" }));
    }
  };

  const handleRemoveBenefit = (index: number) => {
    setBenefits((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    console.log("Saving subscription:", { ...formData, benefits });
    // Implement save logic here
  };

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
            className="hover:text-purple-600"
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
          <div className="flex gap-4">
            {/* Plan Duration */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-[#4a4c56] mb-2">
                Plan Duration
              </label>
              <div className="relative" ref={planDurationRef}>
                <button
                  type="button"
                  onClick={() => {
                    setShowPlanDurationDropdown(!showPlanDurationDropdown);
                    setShowCvOptDropdown(false);
                  }}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-left flex items-center justify-between bg-white hover:border-gray-400 transition-colors"
                >
                  <span
                    className={
                      formData.planDuration
                        ? "text-[#4a4c56]"
                        : "text-[#A1A1A1]"
                    }
                  >
                    {formData.planDuration || "Select Duration"}
                  </span>
                  <ChevronDown className="w-5 h-5 text-[#777980]" />
                </button>
                {showPlanDurationDropdown && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
                    {planDurationOptions.map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => {
                          handleInputChange("planDuration", option);
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
                type="text"
                value={formData.price}
                onChange={(e) => handleInputChange("price", e.target.value)}
                placeholder="Enter your price"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* CV Opt */}
          <div>
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
          </div>

          {/* Number of CV */}
          <div>
            <label className="block text-sm font-medium text-[#4a4c56] mb-2">
              Number of CV
            </label>
            <input
              type="text"
              value={formData.numberOfCV}
              onChange={(e) => handleInputChange("numberOfCV", e.target.value)}
              placeholder="Enter your price"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {/* Benefits */}
          <div>
            <label className="block text-sm font-medium text-[#4a4c56] mb-2">
              Benefits
            </label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={formData.benefitInput}
                onChange={(e) =>
                  handleInputChange("benefitInput", e.target.value)
                }
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddBenefit();
                  }
                }}
                placeholder="Input service name"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={handleAddBenefit}
                className="px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center justify-center"
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
                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-purple-600 text-white rounded-lg text-sm"
                  >
                    {benefit}
                    <button
                      type="button"
                      onClick={() => handleRemoveBenefit(index)}
                      className="hover:bg-purple-700 rounded transition-colors"
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
              className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
