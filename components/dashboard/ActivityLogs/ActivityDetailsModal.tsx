"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Eye } from "lucide-react";
import { useGetActivityDetailsQuery } from "@/src/redux/features/activity-logs";

interface ActivityDetailsModalProps {
  activityId: string | unknown;
}

export function ActivityDetailsModal({
  activityId,
}: ActivityDetailsModalProps) {
  const { data } = useGetActivityDetailsQuery(activityId);

  const activity = data?.data;
  const description = activity?.description;
  const submission = activity?.submission;
  const personalInfo = submission?.personalInfo;
  const latestResume = submission?.resumes?.[0];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-full border border-gray-300 hover:bg-[#E7E4FF] text-[#5952FF] hover:text-[#5952FF] hover:border-[#5952FF] font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
        >
          <Eye className="w-5 h-5" />
          View Details
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Activity Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-lg bg-gray-50 p-4">
              <p className="text-xs text-[#A1A1A1] mb-1">Action</p>
              <p className="text-sm font-semibold text-[#4a4c56]">
                {activity?.action || "N/A"}
              </p>
            </div>
            <div className="rounded-lg bg-gray-50 p-4">
              <p className="text-xs text-[#A1A1A1] mb-1">Performed By</p>
              <p className="text-sm font-semibold text-[#4a4c56]">
                {activity?.userFullName ||
                  activity?.user?.userProfile?.firstName ||
                  "N/A"}
              </p>
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 p-4">
            <p className="text-xs text-[#A1A1A1] mb-1">Note</p>
            <p className="text-sm text-[#4a4c56]">
              {description?.note || "No note provided."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-lg bg-gray-50 p-4">
              <p className="text-xs text-[#A1A1A1] mb-1">Status Changed</p>
              <p className="text-sm text-[#4a4c56]">
                {description?.statusChanged || "N/A"}
              </p>
            </div>
            <div className="rounded-lg bg-gray-50 p-4">
              <p className="text-xs text-[#A1A1A1] mb-1">Resume Status</p>
              <p className="text-sm text-[#4a4c56]">
                {latestResume?.status ||
                  submission?.resumes?.[0]?.status ||
                  "N/A"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-lg bg-gray-50 p-4">
              <p className="text-xs text-[#A1A1A1] mb-1">Credits Deducted</p>
              <p className="text-sm text-[#4a4c56]">
                {description?.creditsDeducted ? "Yes" : "No"}
              </p>
            </div>
            <div className="rounded-lg bg-gray-50 p-4">
              <p className="text-xs text-[#A1A1A1] mb-1">Credits Remaining</p>
              <p className="text-sm text-[#4a4c56]">
                {description?.creditsRemaining ?? 0}
              </p>
            </div>
            <div className="rounded-lg bg-gray-50 p-4">
              <p className="text-xs text-[#A1A1A1] mb-1">Used Revisions</p>
              <p className="text-sm text-[#4a4c56]">
                {description?.usedRevisions ?? 0}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-lg bg-gray-50 p-4">
              <p className="text-xs text-[#A1A1A1] mb-1">Candidate</p>
              <p className="text-sm text-[#4a4c56]">
                {personalInfo?.fullName || "N/A"}
              </p>
            </div>
            <div className="rounded-lg bg-gray-50 p-4">
              <p className="text-xs text-[#A1A1A1] mb-1">Candidate Email</p>
              <p className="text-sm text-[#4a4c56]">
                {personalInfo?.email || "N/A"}
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
