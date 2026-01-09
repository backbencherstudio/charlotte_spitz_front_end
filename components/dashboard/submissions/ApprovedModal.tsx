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

    try {
      const res = await submissionStatus({
        id,
        status: "APPROVED",
        file: selectedFile,
      });
      if (res?.data?.success) {
        toast.success("Submission status approved");
        setSelectedFile(null);
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
        <DialogContent className="sm:max-w-[500px]">
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
              <button
                type="button"
                onClick={handleApprove}
                disabled={isLoading || !selectedFile}
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
