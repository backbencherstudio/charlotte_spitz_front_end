/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  FileText,
  Clock,
  AlertCircle,
  X,
  Edit,
} from "lucide-react";
import { useParams } from "next/navigation";
import {
  useGetSubmissionsByIdQuery,
  useSubmissionStatusMutation,
  useUpdateSubmissionsMutation,
} from "@/src/redux/features/submissions";
import { toast } from "sonner";
import { ResumeDownloadModal } from "@/components/dashboard/submissions/ResumeDownloadModal";
import ApprovedModal from "@/components/dashboard/submissions/ApprovedModal";

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

  const {
    data: submissionData,
    isLoading,
    refetch,
  } = useGetSubmissionsByIdQuery(id);
  const [submissionStatus] = useSubmissionStatusMutation();
  const [updateSubmissions, { isLoading: isSavingSummary }] =
    useUpdateSubmissionsMutation();

  // State management for message input
  const [selectedAction, setSelectedAction] = useState<
    "PENDING" | "REVISION" | null
  >(null);
  const [adminNote, setAdminNote] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [isEditingSummary, setIsEditingSummary] = useState(false);
  const [summaryDraft, setSummaryDraft] = useState("");

  // console.log(submissionData);

  const apiItem = submissionData?.data;
  const submissionInfo = apiItem?.submission;
  const creditsInfo = apiItem?.creditsInfo;

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
      },
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

  useEffect(() => {
    setSummaryDraft(submission.professionalSummary || "");
  }, [submission.professionalSummary]);

  const handlePending = () => {
    setSelectedAction("PENDING");
    setAdminNote("");
  };

  const handleRevision = () => {
    setSelectedAction("REVISION");
    setAdminNote("");
  };

  const handleUpdateStatus = async () => {
    if (!adminNote.trim()) {
      toast.error("Please enter an admin note");
      return;
    }

    setIsUpdating(true);
    try {
      const res = await submissionStatus({
        id,
        status: selectedAction,
        adminNote: adminNote.trim(),
      });

      if (res?.data?.success) {
        toast.success(
          `Submission status updated to ${selectedAction === "PENDING" ? "pending" : "revision"}`,
        );
        setSelectedAction(null);
        setAdminNote("");
      } else {
        const errorMessage =
          ("error" in res && res.error && "data" in res.error
            ? (res.error.data as any)?.message?.message ||
              (res.error.data as any)?.message
            : null) || "Something went wrong";
        toast.error(errorMessage);
      }
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCancel = () => {
    setSelectedAction(null);
    setAdminNote("");
  };

  const handleSummaryUpdate = async () => {
    if (!summaryDraft.trim()) {
      toast.error("Please enter a professional summary");
      return;
    }

    try {
      const res = await updateSubmissions({
        id,
        data: {
          personalInfo: {
            professionalSummary: summaryDraft.trim(),
          },
        },
      });

      if (res && "data" in res && (res.data as any)?.success) {
        toast.success("Professional summary updated successfully");
        setIsEditingSummary(false);
        await refetch();
      } else {
        const errorMessage =
          (res && "error" in res && res.error && "data" in res.error
            ? (res.error.data as any)?.message?.message ||
              (res.error.data as any)?.message
            : null) || "Something went wrong";
        toast.error(errorMessage);
      }
    } catch {
      toast.error("Failed to update professional summary");
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
                <Mail className="w-5 h-5 text-descriptionColor" />
                <div>
                  <p className="text-xs text-[#A1A1A1] mb-1">Email</p>
                  <p className="text-sm font-medium text-[#4a4c56]">
                    {submission.email}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Phone className="w-5 h-5 text-descriptionColor" />
                <div>
                  <p className="text-xs text-[#A1A1A1] mb-1">Phone</p>
                  <p className="text-sm font-medium text-[#4a4c56]">
                    {submission.phone}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <MapPin className="w-5 h-5 text-descriptionColor" />
                <div>
                  <p className="text-xs text-[#A1A1A1] mb-1">Location</p>
                  <p className="text-sm font-medium text-[#4a4c56]">
                    {submission.location}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Calendar className="w-5 h-5 text-descriptionColor" />
                <div>
                  <p className="text-xs text-[#A1A1A1] mb-1">Submitted</p>
                  <p className="text-sm font-medium text-[#4a4c56]">
                    {submission.submitted}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <FileText className="w-5 h-5 text-descriptionColor" />
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
            {/* Approved Modal */}
            <ApprovedModal />

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
                  {skills?.map((skill: any) => (
                    <span key={skill.id} className="mr-2">
                      {skill.name},
                    </span>
                  ))}
                </p>
              </div>

              <div>
                <p className="flex items-center gap-2 text-xs text-[#A1A1A1] mb-1">
                  Professional Summary
                  <button
                    type="button"
                    onClick={() => setIsEditingSummary(true)}
                    className="text-[#5952FF] hover:text-blue-700"
                    aria-label="Edit professional summary"
                  >
                    <Edit className="cursor-pointer text-sm" />
                  </button>
                </p>

                {isEditingSummary ? (
                  <div className="space-y-3">
                    <textarea
                      value={summaryDraft}
                      onChange={(e) => setSummaryDraft(e.target.value)}
                      rows={5}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-[#4a4c56] focus:border-[#5952FF] focus:outline-none focus:ring-2 focus:ring-[#5952FF]/20"
                    />
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={handleSummaryUpdate}
                        disabled={isSavingSummary}
                        className="rounded-lg bg-[#5952FF] px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400 cursor-pointer"
                      >
                        {isSavingSummary ? "Updating..." : "Update"}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setIsEditingSummary(false);
                          setSummaryDraft(submission.professionalSummary || "");
                        }}
                        className="rounded-lg bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300 cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-[#4a4c56] leading-relaxed">
                    {submission.professionalSummary}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-[#4a4c56] mb-4 border-b border-gray-200 pb-2">
              Credits Info
            </h2>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg bg-gray-50 p-4">
                <p className="text-xs text-[#A1A1A1] mb-1">Max Revisions</p>
                <p className="text-sm font-semibold text-[#4a4c56]">
                  {creditsInfo?.maxRevisions ?? 0}
                </p>
              </div>
              <div className="rounded-lg bg-gray-50 p-4">
                <p className="text-xs text-[#A1A1A1] mb-1">Used Revisions</p>
                <p className="text-sm font-semibold text-[#4a4c56]">
                  {creditsInfo?.usedRevisions ?? 0}
                </p>
              </div>
              <div className="rounded-lg bg-gray-50 p-4">
                <p className="text-xs text-[#A1A1A1] mb-1">
                  Remaining Revisions
                </p>
                <p className="text-sm font-semibold text-[#4a4c56]">
                  {creditsInfo?.remainingRevisions ?? 0}
                </p>
              </div>
              <div className="rounded-lg bg-gray-50 p-4">
                <p className="text-xs text-[#A1A1A1] mb-1">Package</p>
                <p className="text-sm font-semibold text-[#4a4c56]">
                  {creditsInfo?.packageType ?? "N/A"}
                </p>
                {/* <p className="text-xs text-[#A1A1A1] mt-1">
                  {creditsInfo?.packageType ?? "Unknown"}
                </p> */}
              </div>
            </div>
          </div>

          {/* Admin Note / Message Input Form */}
          {selectedAction && (
            <div className="bg-white rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-[#4a4c56]">
                  {selectedAction === "PENDING" ? "Pending" : "Revision"} Note
                </h2>
                <button
                  onClick={handleCancel}
                  className="text-gray-500 hover:text-gray-700"
                  disabled={isUpdating}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-[#4a4c56] mb-2 block">
                    Admin Note
                  </label>
                  <textarea
                    value={adminNote}
                    onChange={(e) => setAdminNote(e.target.value)}
                    placeholder={
                      selectedAction === "PENDING"
                        ? "e.g., Resume moved back to pending review."
                        : "e.g., Please improve the professional summary and add more achievements."
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5952FF] focus:border-transparent resize-none"
                    rows={6}
                    disabled={isUpdating}
                  />
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={handleUpdateStatus}
                    disabled={isUpdating || !adminNote.trim()}
                    className="flex-1 bg-[#5952FF] hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-3 px-4 rounded-lg transition-colors cursor-pointer"
                  >
                    {isUpdating ? "Updating..." : "Update Status"}
                  </button>
                  <button
                    onClick={handleCancel}
                    disabled={isUpdating}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 disabled:bg-gray-400 text-gray-700 font-medium py-3 px-4 rounded-lg transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Template Preview */}
          {/* <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm"> */}
          {/* <h3 className="text-lg font-semibold text-[#4a4c56] mb-4">
              Template Preview
            </h3> */}

          {/* Preview Container */}
          {/* <div className="relative border-2 border-dashed border-gray-300 rounded-3xl overflow-hidden flex items-center justify-center h-[450px] mb-4">
           
              <Image
                src={previewImage}
                alt="image"
                fill
                className="object-cover"
              />
            </div> */}

          {/* Preview Button */}
          {/* <TemplatePreviewModal submissionId={id} /> */}
          {/* </div> */}
        </div>
      </div>
    </div>
  );
}
