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
import Image from "next/image";
import { useRouter } from "next/navigation";
import image1 from "@/public/images/10.png";
import image2 from "@/public/images/template2.png";
import image3 from "@/public/images/Screenshot_9.png";

interface TemplatePreviewModalProps {
  submissionId: string;
}

export function TemplatePreviewModal({
  submissionId,
}: TemplatePreviewModalProps) {
  const router = useRouter();

  const handleTemplateSelect = (templateNumber: number) => {
    router.push(
      `/dashboard/submissions/preview/${submissionId}?template=${templateNumber}`
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-full border border-gray-300 hover:bg-[#E7E4FF] text-[#5952FF] hover:text-[#5952FF] hover:border-[#5952FF]  font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
        >
          <Eye className="w-5 h-5" />
          Preview Template
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Select Template Preview</DialogTitle>
          <div className="flex flex-col md:flex-row justify-between gap-4 pt-5">
            <div className="space-y-2 flex-1">
              <div
                className="relative w-full h-48 border border-gray-200 rounded-lg overflow-hidden cursor-pointer hover:border-[#5952FF] transition-colors"
                onClick={() => handleTemplateSelect(1)}
              >
                <Image
                  src={image1}
                  alt="Template 1"
                  fill
                  className="object-contain"
                />
              </div>
              <button
                onClick={() => handleTemplateSelect(1)}
                type="button"
                className="w-full border border-gray-300 hover:bg-[#E7E4FF] hover:border-[#5952FF] text-[#5952FF] font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Eye className="w-5 h-5" />
                Preview Template 1
              </button>
            </div>
            <div className="space-y-2 flex-1">
              <div
                className="relative w-full h-48 border border-gray-200 rounded-lg overflow-hidden cursor-pointer hover:border-[#5952FF] transition-colors"
                onClick={() => handleTemplateSelect(2)}
              >
                <Image
                  src={image2}
                  alt="Template 2"
                  fill
                  className="object-contain"
                />
              </div>
              <button
                onClick={() => handleTemplateSelect(2)}
                type="button"
                className="w-full border border-gray-300 hover:bg-[#E7E4FF] hover:border-[#5952FF] text-[#5952FF] font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Eye className="w-5 h-5" />
                Preview Template 2
              </button>
            </div>
            <div className="space-y-2 flex-1">
              <div
                className="relative w-full h-48 border border-gray-200 rounded-lg overflow-hidden cursor-pointer hover:border-[#5952FF] transition-colors"
                onClick={() => handleTemplateSelect(3)}
              >
                <Image
                  src={image3}
                  alt="Template 3"
                  fill
                  className="object-contain"
                />
              </div>
              <button
                onClick={() => handleTemplateSelect(3)}
                type="button"
                className="w-full border border-gray-300 hover:bg-[#E7E4FF] hover:border-[#5952FF] text-[#5952FF] font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Eye className="w-5 h-5" />
                Preview Template 3
              </button>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
