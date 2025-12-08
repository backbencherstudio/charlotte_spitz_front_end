'use client';

import { CheckCheck } from 'lucide-react';
import Link from 'next/link';

export default function SuccessPage() {
  return (
    <main className="py-20">
      <div className="container">
        {/* Blue Checkmark Circle */}
        <div className="flex justify-center mb-8">
          <div className="relative w-20 h-20 bg-[#5952FF] rounded-full flex items-center justify-center">
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>
        <div className="mb-12">
          <h1 className="text-4xl text-[#070707] font-bold text-center">
            Thank You!
          </h1>
          <p className="text-[#070707] text-base text-center">
            Your resume order has been received successfully.
          </p>
        </div>

        {/* Info Box */}
        <div className="border border-[#EEEEFF] bg-[#EEEEFF] rounded-md p-6 mb-8 max-w-3xl mx-auto">
          <h3 className="font-bold text-lg text-center mb-4">
            Check your email inbox
          </h3>
          <p className="text-gray-600 text-sm text-center">
            Your resume will be delivered within 48 hours (starting from the next business day).
          </p>
        </div>

        {/* Checkmark List */}
        <div className="space-y-3 mb-8 max-w-3xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0">
              <CheckCheck />
            </div>
            <span className="text-[#25314C] text-sm text-left">
              Payment processed successfully
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0">
              <CheckCheck />
            </div>
            <span className="text-[#25314C] text-sm text-left">
              Resume data saved securely
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-5 h-5  rounded-full flex items-center justify-center shrink-0">
              <CheckCheck />
            </div>
            <span className="text-[#25314C] text-sm text-left">
              Professional PDF will be delivered
            </span>
          </div>
        </div>

        {/* Button */}
        <div className="flex items-center justify-center">
          <Link
            href="/"
            className="px-6 py-3 border-2 border-[#5952FF] text-[#5952FF] rounded-md font-bold cursor-pointer"
          >
            Create Another Resume
          </Link>
        </div>
      </div>
    </main>
  );
}
