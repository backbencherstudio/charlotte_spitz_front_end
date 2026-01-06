import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { pdf } from "@react-pdf/renderer";
import { ResumePDF } from "./ResumeDownload1";
import { Download } from "lucide-react";
import { ResumePDF2 } from "./ResumeDownload2";
import { ResumePDF3 } from "./ResumeDownload3";
import { useParams } from "next/navigation";
import { useGetSubmissionsByIdQuery } from "@/src/redux/features/submissions";
import Image from "next/image";
import image1 from "@/public/images/10.png";
import image2 from "@/public/images/template2.png";
import image3 from "@/public/images/Screenshot_9.png";

export function ResumeDownloadModal() {
  // Data
  const params = useParams();
  const id = params.id as string;
  const { data: submissionData } = useGetSubmissionsByIdQuery(id);

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
              <div>
                <Image
                  src={image1}
                  alt="img"
                  width={200}
                  height={200}
                  className="object-contain"
                />
                <button
                  onClick={downloadAsPdf}
                  type="button"
                  className="w-full border border-gray-300 hover:bg-gray-50 text-[#4a4c56] font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Download className="w-5 h-5" />
                  Download PDF 
                </button>
              </div>
              <div>
                <Image
                  src={image2}
                  alt="img"
                  width={200}
                  height={200}
                  className="object-contain"
                />
                <button
                  onClick={downloadAsPdf2}
                  type="button"
                  className="w-full border border-gray-300 hover:bg-gray-50 text-[#4a4c56] font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Download className="w-5 h-5" />
                  Download PDF
                </button>
              </div>
              <div>
                <Image
                  src={image3}
                  alt="img"
                  width={200}
                  height={200}
                  className="object-contain"
                />
                <button
                  onClick={downloadAsPdf3}
                  type="button"
                  className="w-full border border-gray-300 hover:bg-gray-50 text-[#4a4c56] font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Download className="w-5 h-5" />
                  Download PDF 
                </button>
              </div>
            </div>
          </DialogHeader>
        </DialogContent>
      </form>
    </Dialog>
  );
}
