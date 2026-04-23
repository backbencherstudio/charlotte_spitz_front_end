/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Button from "@/components/reusable/Button";
import { useGetAllPackageQuery } from "@/src/redux/features/resumeInfo";
import { useCreateSubmissionsMutation } from "@/src/redux/features/setting";
import { Check, Crown } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { MdArrowOutward } from "react-icons/md";

export interface Plan {
  id: string;
  name: string;
  price: number;
  benefits: string[];
}

const Payment = () => {
  const router = useRouter();
  const { data, isLoading } = useGetAllPackageQuery();

  const localDataRef = useRef<string | null>(null);
  const [isCreating, setIsCreating] = useState<string>("");
  const [createSubmissions, { isLoading: isCreatingPayment }] =
    useCreateSubmissionsMutation();

  const [file, setFile] = useState<File | null>(null);

  // Convert base64 from localStorage to File
  const base64ToFile = (base64: string, fileName: string): File => {
    const arr = base64.split(",");
    const mime = arr[0].match(/:(.*?);/)?.[1] || "image/png";
    const bstr = atob(arr[1]);
    const n = bstr.length;
    const u8arr = new Uint8Array(n);

    for (let i = 0; i < n; i++) {
      u8arr[i] = bstr.charCodeAt(i);
    }
    return new File([u8arr], fileName, { type: mime });
  };

  // Load profile photo
  useEffect(() => {
    const fileData = localStorage.getItem("file");
    if (fileData) {
      try {
        const convertedFile = base64ToFile(fileData, "profile.png");
        setFile(convertedFile);
      } catch (err) {
        console.error("Failed to convert base64 to file", err);
      }
    }
  }, []);

  // Load multi-step form data + redirect if missing
  useEffect(() => {
    if (typeof window === "undefined") return;

    const savedData = window.localStorage.getItem("multiStepFormData");
    localDataRef.current = savedData;

    if (!savedData) {
      router.push("/personal-info");
    }
  }, [router]);

  const handlePayment = async (packageId: string) => {
    const rawData =
      localDataRef.current ??
      (typeof window !== "undefined"
        ? window.localStorage.getItem("multiStepFormData")
        : null);

    if (!rawData) {
      router.push("/personal-info");
      return;
    }

    let formValues: Record<string, any> = {};
    try {
      formValues = JSON.parse(rawData);
    } catch (err) {
      console.error("Failed to parse form data:", err);
      router.push("/personal-info");
      return;
    }

    setIsCreating(packageId);

    // Create FormData properly
    const submissionFormData = new FormData();

    if (file) {
      submissionFormData.append("profilePhoto", file);
    }

    const payload = {
      packageId,
      ...formValues,
    };

    submissionFormData.append("data", JSON.stringify(payload));

    try {
      const response = await createSubmissions(submissionFormData).unwrap();

      if (response?.success && response?.data?.paymentUrl) {
        if (typeof window !== "undefined") {
          window.localStorage.removeItem("multiStepFormData");
          window.localStorage.removeItem("multiStepCurrentStep");
          window.localStorage.removeItem("file");
        }

        router.push(response.data.paymentUrl);
      } else {
        console.error("Unexpected response:", response);
        alert("Something went wrong. Please try again.");
      }
    } catch (error: any) {
      console.error("Submission error:", error);
      alert(
        error?.data?.message || "Payment initiation failed. Please try again.",
      );
    } finally {
      setIsCreating("");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-3">Choose Your Package</h1>
        <p className="text-gray-600">
          Select the format that works best for you
        </p>
      </div>

      {isLoading ? (
        // Simple loading skeleton
        <div className="grid md:grid-cols-2 gap-6">
          {[1, 2].map((i) => (
            <div key={i} className="border rounded-2xl p-8 animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-3/4 mb-6"></div>
              <div className="h-12 bg-gray-200 rounded w-1/2 mb-8"></div>
              <div className="space-y-4">
                {[1, 2, 3, 4].map((j) => (
                  <div key={j} className="h-6 bg-gray-200 rounded w-full"></div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center gap-6 flex-wrap max-w-4xl mx-auto">
          {(data as { data?: Array<Plan> })?.data?.map(
            (plan: Plan, index: number) => (
              <div
                key={index}
                className={`rounded-2xl p-5 md:p-6 w-full max-w-100 transition-all duration-300 card-Shadow border flex flex-col  justify-between  hover:border border-[#5952FF]`}
              >
                <div>
                  {/* Plan Name */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl">
                      <Crown />
                    </span>
                    <h3 className="text-xl font-bold text-[#4A4C56]">
                      {plan?.name}
                    </h3>
                  </div>
                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold text-[#5952FF]">
                        ${plan?.price}
                      </span>
                      <span className="text-[#A5A5AB]">/One Time</span>
                    </div>
                  </div>

                  {/* Features List */}
                  <ul className="space-y-4 mb-8">
                    {plan?.benefits?.map(
                      (feature: string, featureIndex: number) => (
                        <li
                          key={featureIndex}
                          className="flex items-start gap-3 text-[#4A4C56]"
                        >
                          <Check className="w-5 h-5 text-[#5952FF] shrink-0 mt-0.5" />
                          <span className="text-sm sm:text-base">
                            {feature}
                          </span>
                        </li>
                      ),
                    )}
                  </ul>
                </div>

                {/* Button */}
                <Button
                  icon={
                    <MdArrowOutward className="w-5 h-5 transition-transform duration-200" />
                  }
                  className="w-full items-center justify-center"
                  onClick={() => handlePayment(plan?.id)}
                  disabled={isCreating === plan?.id && isCreatingPayment}
                >
                  {isCreating === plan?.id ? "Processing..." : "Pay Now"}
                </Button>
              </div>
            ),
          )}
        </div>
      )}
    </div>
  );
};

export default Payment;
