import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { pdf } from "@react-pdf/renderer";
import { toast } from "sonner";
import { ResumePDF } from "./ResumeDownload1";
import { Download } from "lucide-react";
import { ResumePDF2 } from "./ResumeDownload2";
import { ResumePDF3 } from "./ResumeDownload3";
import { useParams } from "next/navigation";
import { useGetSubmissionsByIdQuery } from "@/src/redux/features/submissions";

export function ResumeDownloadModal() {
  // Data
  const params = useParams();
  const id = params.id as string;

  const { data: submissionData, isLoading } = useGetSubmissionsByIdQuery(id);


  const apiItem = submissionData?.data?.[0];

  const downloadAsPdf = async () => {
    const blob = await pdf(<ResumePDF apiItem={apiItem} />).toBlob();

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${"download"}.pdf`;
    a.click();
    URL.revokeObjectURL(url);
    // toast.success("Download resume");
  };

  const downloadAsPdf2 = async () => {
    const blob = await pdf(<ResumePDF2 apiItem={apiItem} />).toBlob();

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${"download"}.pdf`;
    a.click();
    URL.revokeObjectURL(url);
    // toast.success("Download resume");
  };

  const downloadAsPdf3 = async () => {
    const blob = await pdf(<ResumePDF3 apiItem={apiItem} />).toBlob();

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${"download"}.pdf`;
    a.click();
    URL.revokeObjectURL(url);
    // toast.success("Download resume");
  };

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="w-full border border-gray-300 hover:bg-gray-50 text-[#4a4c56] font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            {" "}
            <Download className="w-5 h-5" />
            Download PDF
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[725px]">
          <DialogHeader>
            <DialogTitle>Resume Download</DialogTitle>
            <div className="flex flex-col md:flex-row justify-between gap-3 pt-5">
              <button
                onClick={downloadAsPdf}
                type="button"
                className="w-full border border-gray-300 hover:bg-gray-50 text-[#4a4c56] font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-5 h-5" />
                Download PDF 1
              </button>
              <button
                onClick={downloadAsPdf2}
                type="button"
                className="w-full border border-gray-300 hover:bg-gray-50 text-[#4a4c56] font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-5 h-5" />
                Download PDF 2
              </button>
              <button
                onClick={downloadAsPdf3}
                type="button"
                className="w-full border border-gray-300 hover:bg-gray-50 text-[#4a4c56] font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-5 h-5" />
                Download PDF 3
              </button>
            </div>
          </DialogHeader>
        </DialogContent>
      </form>
    </Dialog>
  );
}
