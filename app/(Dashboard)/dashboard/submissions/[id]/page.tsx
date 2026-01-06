/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  FileText,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react";
import { useParams } from "next/navigation";
import {
  useGetSubmissionsByIdQuery,
  useSubmissionStatusMutation,
} from "@/src/redux/features/submissions";
import { toast } from "sonner";
import previewImage from "@/public/images/10.png";
import Image from "next/image";
import { ResumeDownloadModal } from "@/components/dashboard/submissions/ResumeDownloadModal";
import { TemplatePreviewModal } from "@/components/dashboard/submissions/TemplatePreviewModal";

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

  const { data: submissionData, isLoading } = useGetSubmissionsByIdQuery(id);
  const [submissionStatus] = useSubmissionStatusMutation();

  // console.log(submissionData);

  const apiItem = submissionData?.data?.[0];
  const submissionInfo = apiItem?.submission;

  const personalInfo = submissionInfo?.personalInfo;
  const workExperiences = submissionInfo?.workExperiences ?? [];
  const educations = submissionInfo?.educations ?? [];
  const skills = submissionInfo?.skills ?? [];

  // Format date helper
  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return (
      date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }) +
      " " +
      date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      })
    );
  };

  // Calculate years of experience
  const calculateYearsOfExperience = () => {
    if (workExperiences.length === 0) return "0 years";

    let totalMonths = 0;
    workExperiences.forEach(
      (exp: { startDate: string; endDate: string | null }) => {
        const startDate = new Date(exp.startDate);
        const endDate = exp.endDate ? new Date(exp.endDate) : new Date();
        const months =
          (endDate.getFullYear() - startDate.getFullYear()) * 12 +
          (endDate.getMonth() - startDate.getMonth());
        totalMonths += months;
      }
    );

    const years = Math.floor(totalMonths / 12);
    return years > 0 ? `${years} years` : "Less than 1 year";
  };

  // Format skills array to string
  const formatSkills = () => {
    if (skills.length === 0) return "No skills listed";
    return skills.map((skill: { name: string }) => skill.name).join(", ");
  };

  // Map status from API to UI format
  const mapStatus = (status: string) => {
    if (!status) return "Pending";
    const statusMap: Record<string, "Approve" | "Pending" | "Revision"> = {
      APPROVED: "Approve",
      PENDING: "Pending",
      REVISION: "Revision",
    };
    return statusMap[status.toUpperCase()] || "Pending";
  };

  // Build submission object from API data
  const submission: SubmissionDetails = {
    id: apiItem?.id || id,
    fullName: personalInfo?.fullName || "N/A",
    email: personalInfo?.email || "N/A",
    phone: personalInfo?.phoneNumber || "N/A",
    location: personalInfo?.city_and_state || "N/A",
    submitted: formatDate(apiItem?.createdAt || ""),
    template: apiItem?.templateId ?? "Not assigned",
    position: workExperiences[0]?.jobTitle || "N/A",
    education: educations[0]?.degreeOrCertificate || "N/A",
    yearsOfExperience: calculateYearsOfExperience(),
    skills: formatSkills(),
    professionalSummary:
      personalInfo?.professionalSummary || "No summary provided",
    status: mapStatus(apiItem?.status || ""),
  };

  const handleApprove = async () => {
    const res = await submissionStatus({
      id,
      status: "APPROVED",
    });
    if (res?.data?.success) {
      toast.success("Submission status approved");
    } else {
      toast.error("Something wont wrong");
    }
  };

  const handlePending = async () => {
    const res = await submissionStatus({
      id,
      status: "PENDING",
    });
    if (res?.data?.success) {
      toast.success("Submission status pending");
    } else {
      toast.error("Something wont wrong");
    }
  };

  const handleRevision = async () => {
    const res = await submissionStatus({
      id,
      status: "REVISION",
    });
    if (res?.data?.success) {
      toast.success("Submission status revision");
    } else {
      toast.error("Something wont wrong");
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5952FF] mx-auto mb-4"></div>
          <p className="text-[#4a4c56]">Loading submission details...</p>
        </div>
      </div>
    );
  }

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

            {/* Download Resume */}
            {/* <button
              onClick={downloadAsPdf}
              type="button"
              className="w-full border border-gray-300 hover:bg-gray-50 text-[#4a4c56] font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Download className="w-5 h-5" />
              Download PDF
            </button> */}
            <ResumeDownloadModal />
          </div>
        </div>

        {/* Right Panel - Resume Form Data */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
              <h2 className="text-lg font-bold ">Resume Form Data</h2>
              {/* <button
                onClick={handleEdit}
                className="bg-[#E2DEFF] text-[#5952FF] font-medium py-2 px-4 rounded-lg transition-colors flex items-center gap-2"
              >
                <Edit className="w-4 h-4" />
                Edit Submission
              </button> */}
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
                {educations.map((edu: any) => (
                  <div key={edu.id}>
                    <p className="font-medium mb-2">
                      {edu.degreeOrCertificate}
                    </p>
                    <p className="text-sm text-gray-600">
                      {edu.institutionName}
                    </p>
                    <p className="text-xs text-gray-400">
                      Passing Year: {edu.passingYear}
                    </p>
                  </div>
                ))}

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
                <p className="text-sm font-medium text-[#4a4c56] flex flex-wrap">
                  {skills.map((skill: any) => (
                    <span key={skill.id} className="mr-2">
                      {skill.name},
                    </span>
                  ))}
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
          <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-[#4a4c56] mb-4">
              Template Preview
            </h3>

            {/* Preview Container */}
            <div className="relative border-2 border-dashed border-gray-300 rounded-3xl overflow-hidden flex items-center justify-center h-[450px] mb-4">
              {/* Image */}
              <Image
                src={previewImage}
                alt="image"
                fill
                className="object-cover"
              />
            </div>

            {/* Preview Button */}
            <TemplatePreviewModal submissionId={id} />
          </div>
        </div>
      </div>
    </div>
  );
}
