"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useSubmissionStatusMutation } from "@/src/redux/features/submissions";
import { CheckCircle } from "lucide-react";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { useState, useRef } from "react";

export default function ApprovedModal() {
  const params = useParams();
  const id = params.id as string;
  const [submissionStatus, { isLoading }] = useSubmissionStatusMutation();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [adminNote, setAdminNote] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleApprove = async () => {
    if (!selectedFile) {
      toast.error("Please select a file");
      return;
    }

    if (!adminNote.trim()) {
      toast.error("Please enter an admin note");
      return;
    }

    try {
      const res = await submissionStatus({
        id,
        status: "APPROVED",
        file: selectedFile,
        adminNote: adminNote.trim(),
      });
      if (res?.data?.success) {
        toast.success("Submission status approved");
        setSelectedFile(null);
        setAdminNote("");
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      } else {
        toast.error("Something went wrong");
      }
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <button className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer">
            <CheckCircle className="w-5 h-5" />
            Approve Submission
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-125">
          <DialogHeader>
            <DialogTitle>Approve Submission & Send Email</DialogTitle>
            <div className="pt-5 space-y-3">
              <Input
                ref={fileInputRef}
                type="file"
                className="w-full"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx"
              />
              {selectedFile && (
                <p className="text-sm text-gray-600">
                  Selected: {selectedFile.name}
                </p>
              )}

              <div>
                <label className="text-sm font-medium text-[#4a4c56] mb-2 block">
                  Admin Note
                </label>
                <textarea
                  value={adminNote}
                  onChange={(e) => setAdminNote(e.target.value)}
                  placeholder="Write an admin note for the approval email..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5952FF] focus:border-transparent resize-none"
                  rows={4}
                />
              </div>

              <button
                type="button"
                onClick={handleApprove}
                disabled={isLoading || !selectedFile || !adminNote.trim()}
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <CheckCircle className="w-5 h-5" />
                {isLoading ? "Processing..." : "Approve Submission"}
              </button>
            </div>
          </DialogHeader>
        </DialogContent>
      </form>
    </Dialog>
  );
}
