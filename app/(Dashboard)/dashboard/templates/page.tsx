import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import image1 from "@/public/images/10.png";
import image2 from "@/public/images/template2.png";
import image3 from "@/public/images/Screenshot_9.png";
import { StaticImageData } from "next/image";

// Template type definition
interface Template {
  id: string;
  img: StaticImageData;
  url: string;
  name: string;
  description: string;
  previewType: "light" | "dark";
  usage: number;
  status: string;
}

// JSON data for templates
const templatesData: Template[] = [
  {
    id: "1",
    img: image1,
    url: "/dashboard/templates/preview",
    name: "Modern Pro",
    description: "Clean and professional design for corporate roles.",
    previewType: "light",
    usage: 342,
    status: "active",
  },
  {
    id: "2",
    img: image2,
    url: "/dashboard/templates/preview2",
    name: "Modern Pro",
    description: "Clean and professional design for corporate roles.",
    previewType: "dark",
    usage: 342,
    status: "active",
  },
  {
    id: "3",
    img: image3,
    url: "/dashboard/templates/preview3",
    name: "Modern Pro",
    description: "Clean and professional design for corporate roles.",
    previewType: "light",
    usage: 342,
    status: "active",
  },
  // {
  //   id: "4",
  //   name: "Modern Pro",
  //   description: "Clean and professional design for corporate roles.",
  //   previewType: "light",
  //   usage: 342,
  //   status: "active",
  // },
  // {
  //   id: "5",
  //   name: "Modern Pro",
  //   description: "Clean and professional design for corporate roles.",
  //   previewType: "dark",
  //   usage: 342,
  //   status: "active",
  // },
  // {
  //   id: "6",
  //   name: "Modern Pro",
  //   description: "Clean and professional design for corporate roles.",
  //   previewType: "light",
  //   usage: 342,
  //   status: "active",
  // },
];

// Template Card Component
function TemplateCard({ template }: { template: Template }) {
  return (
    <Card className="">
      <CardContent className="p-0">
        {/* Image Section */}
        <div className="w-full h-72 relative overflow-hidden mb-2">
          <Image
            src={template?.img}
            alt={template.name}
            fill
            className="object-cover bg-center bg-no-repeat"
          />
        </div>

        {/* Template Info Section */}
        <div className="px-4 pb-4 space-y-3">
          {/* Name and Status */}
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-semibold text-base">{template.name}</h4>
                {/* <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                  <span className="text-white text-xs font-bold">O</span>
                </div> */}
              </div>
              <p className="text-sm text-gray-600">{template.description}</p>
            </div>
          </div>

          {/* Usage and Status */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">
              Usage: {template.usage}
            </span>
            <Button
              size="sm"
              className="h-7 px-3 bg-[#DCFCE7] text-green-600 text-xs"
            >
              Active
            </Button>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <Link className="flex-1" href={template.url}>
              <Button
                variant="outline"
                size="sm"
                className="w-full bg-[#E7E4FF] text-[#5952FF] cursor-pointer hover:bg-[#4b43e6d4] hover:text-white"
              >
                <Eye className="w-4 h-4 mr-1" />
                Preview
              </Button>
            </Link>
            {/* <Button variant="outline" size="sm" className="flex-1">
              <Edit className="w-4 h-4 mr-1" />
              Edit
            </Button> */}
            <Button
              variant="outline"
              size="sm"
              className="bg-[#FFDADA] hover:bg-red-600 text-red-600 hover:text-white cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function TemplatesPage() {
  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
      <div className="mb-8 space-y-1.5">
        <h1 className="text-3xl font-bold">Templates</h1>
        <p className="text-[#A1A1A1]">
          Manage your resume templates and customize them to fit your needs.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templatesData.map((template) => (
          <TemplateCard key={template.id} template={template} />
        ))}
      </div>
    </div>
  );
}
