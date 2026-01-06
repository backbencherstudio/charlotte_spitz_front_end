/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useParams, useSearchParams } from "next/navigation";
import { useGetSubmissionsByIdQuery } from "@/src/redux/features/submissions";
import TemplatePreview1 from "@/components/dashboard/submissions/TemplatePreview1";
import TemplatePreview2 from "@/components/dashboard/submissions/TemplatePreview2";
import TemplatePreview3 from "@/components/dashboard/submissions/TemplatePreview3";

export default function Preview() {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const templateNumber = searchParams.get("template") || "1";

  const { data: submissionData, isLoading } = useGetSubmissionsByIdQuery(id);

  const submissionInfo = submissionData?.data?.[0];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5952FF] mx-auto mb-4"></div>
          <p className="text-[#4a4c56]">Loading preview...</p>
        </div>
      </div>
    );
  }

  // Render the appropriate template based on the template number
  switch (templateNumber) {
    case "2":
      return <TemplatePreview2 submissionInfo={submissionInfo} />;
    case "3":
      return <TemplatePreview3 submissionInfo={submissionInfo} />;
    default:
      return <TemplatePreview1 submissionInfo={submissionInfo} />;
  }
}
