"use client";

import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  FileText,
  Download,
  Edit,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react";
import { useParams } from "next/navigation";

interface SubmissionDetails {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  location: string;
  submitted: string;
  template: string;
  position: string;
  education: string;
  yearsOfExperience: string;
  skills: string;
  professionalSummary: string;
  status: "Approve" | "Pending" | "Revision";
}

export default function SubmissionDetailsPage() {
  const params = useParams();
  const id = params.id as string;

  // Sample data - replace with actual API call
  const submission: SubmissionDetails = {
    id: id || "1",
    fullName: "John Doe",
    email: "john@example.com",
    phone: "+1234567890",
    location: "New York, USA",
    submitted: "2024-11-27 10:30",
    template: "Modern Pro",
    position: "Senior Software Engineer",
    education: "Master of Computer Science",
    yearsOfExperience: "8 years",
    skills: "React, TypeScript, Node.js, Python, AWS",
    professionalSummary:
      "Experienced software engineer with a passion for building scalable web applications...",
    status: "Pending",
  };

  const handleApprove = () => {
    console.log("Approve submission:", id);
    // Implement approval logic
  };

  const handlePending = () => {
    console.log("Set to pending:", id);
    // Implement pending logic
  };

  const handleRevision = () => {
    console.log("Request revision:", id);
    // Implement revision logic
  };

  const handleDownloadPDF = () => {
    console.log("Download PDF:", id);
    // Implement PDF download logic
  };

  const handleEdit = () => {
    console.log("Edit submission:", id);
    // Implement edit logic
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-[#4a4c56]">
          Submission Details
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Panel - User Information */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-[#4a4c56] mb-6 border-b border-gray-200 pb-2">
              User Information
            </h2>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <span className="text-[#4a4c56] font-medium text-sm">
                      {submission.fullName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-[#A1A1A1] mb-1">Full Name</p>
                  <p className="text-sm font-medium text-[#4a4c56]">
                    {submission.fullName}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Mail className="w-5 h-5 text-[#777980]" />
                <div>
                  <p className="text-xs text-[#A1A1A1] mb-1">Email</p>
                  <p className="text-sm font-medium text-[#4a4c56]">
                    {submission.email}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Phone className="w-5 h-5 text-[#777980]" />
                <div>
                  <p className="text-xs text-[#A1A1A1] mb-1">Phone</p>
                  <p className="text-sm font-medium text-[#4a4c56]">
                    {submission.phone}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <MapPin className="w-5 h-5 text-[#777980]" />
                <div>
                  <p className="text-xs text-[#A1A1A1] mb-1">Location</p>
                  <p className="text-sm font-medium text-[#4a4c56]">
                    {submission.location}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Calendar className="w-5 h-5 text-[#777980]" />
                <div>
                  <p className="text-xs text-[#A1A1A1] mb-1">Submitted</p>
                  <p className="text-sm font-medium text-[#4a4c56]">
                    {submission.submitted}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <FileText className="w-5 h-5 text-[#777980]" />
                <div>
                  <p className="text-xs text-[#A1A1A1] mb-1">Template</p>
                  <p className="text-sm font-medium text-[#4a4c56]">
                    {submission.template}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleApprove}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <CheckCircle className="w-5 h-5" />
              Approve Submission
            </button>

            <button
              onClick={handlePending}
              className="w-full bg-[#5952FF] hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Clock className="w-5 h-5" />
              Pending
            </button>

            <button
              onClick={handleRevision}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <AlertCircle className="w-5 h-5" />
              Revision
            </button>

            <button
              onClick={handleDownloadPDF}
              className="w-full border border-gray-300 hover:bg-gray-50 text-[#4a4c56] font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Download className="w-5 h-5" />
              Download PDF
            </button>
          </div>
        </div>

        {/* Right Panel - Resume Form Data */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold ">Resume Form Data</h2>
              <button
                onClick={handleEdit}
                className="bg-[#E2DEFF] text-[#5952FF] font-medium py-2 px-4 rounded-lg transition-colors flex items-center gap-2"
              >
                <Edit className="w-4 h-4" />
                Edit Submission
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-xs text-[#A1A1A1] mb-1">
                  Position Applied For
                </p>
                <p className="text-sm font-medium text-[#4a4c56]">
                  {submission.position}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-[#A1A1A1] mb-1">Education</p>
                  <p className="text-sm font-medium text-[#4a4c56]">
                    {submission.education}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-[#A1A1A1] mb-1">
                    Years of Experience
                  </p>
                  <p className="text-sm font-medium text-[#4a4c56]">
                    {submission.yearsOfExperience}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-xs text-[#A1A1A1] mb-1">Skills</p>
                <p className="text-sm font-medium text-[#4a4c56]">
                  {submission.skills}
                </p>
              </div>

              <div>
                <p className="text-xs text-[#A1A1A1] mb-1">
                  Professional Summary
                </p>
                <p className="text-sm text-[#4a4c56] leading-relaxed">
                  {submission.professionalSummary}
                </p>
              </div>
            </div>
          </div>

          {/* Template Preview */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-[#4a4c56] mb-4">
              Template Preview
            </h3>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center min-h-[300px] bg-gray-50">
              <FileText className="w-16 h-16 text-gray-400 mb-4" />
              <p className="text-sm font-medium text-[#4a4c56] mb-2">
                Template preview: {submission.template}
              </p>
              <p className="text-xs text-[#A1A1A1] text-center">
                Full resume preview would be displayed here
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
