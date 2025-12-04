import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, Edit, Trash2 } from "lucide-react";
import Image from "next/image";
import image1 from "@/public/images/2.png";

// Template data type
export interface TemplateData {
  id: string;
  name: string;
  description: string;
  previewType: "light" | "dark";
  usage: number;
  status: "active" | "inactive";
  previewImage?: string;
}

// JSON data for templates
const templatesData: TemplateData[] = [
  {
    id: "1",
    name: "Modern Pro",
    description: "Clean and professional design for corporate roles.",
    previewType: "light",
    usage: 342,
    status: "active",
  },
  {
    id: "2",
    name: "Modern Pro",
    description: "Clean and professional design for corporate roles.",
    previewType: "dark",
    usage: 342,
    status: "active",
  },
  {
    id: "3",
    name: "Modern Pro",
    description: "Clean and professional design for corporate roles.",
    previewType: "light",
    usage: 342,
    status: "active",
  },
  {
    id: "4",
    name: "Modern Pro",
    description: "Clean and professional design for corporate roles.",
    previewType: "light",
    usage: 342,
    status: "active",
  },
  {
    id: "5",
    name: "Modern Pro",
    description: "Clean and professional design for corporate roles.",
    previewType: "dark",
    usage: 342,
    status: "active",
  },
  {
    id: "6",
    name: "Modern Pro",
    description: "Clean and professional design for corporate roles.",
    previewType: "light",
    usage: 342,
    status: "active",
  },
];

// Template Preview Component
function TemplatePreview({ type }: { type: "light" | "dark" }) {
  if (type === "dark") {
    return (
      <div className="w-full h-48 from-green-800 to-green-900 rounded-lg p-4 flex items-start gap-4 relative overflow-hidden">
        {/* Profile Picture Placeholder */}
        <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-white font-semibold text-sm">
          RT
        </div>
        <div className="flex-1 text-white">
          <h3 className="font-semibold text-lg mb-2">Rick Tang</h3>
          <div className="space-y-1 text-xs opacity-90">
            <div>Profile</div>
            <div>Experience</div>
            <div>Details</div>
            <div>Links</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-48 bg-white rounded-lg p-4 border relative overflow-hidden">
      {/* Abstract shapes */}
      <div className="absolute top-0 right-0 w-24 h-24">
        <div className="absolute top-2 right-2 w-16 h-16 bg-blue-200 rounded-full opacity-50 blur-sm"></div>
        <div className="absolute top-4 right-4 w-12 h-12 bg-pink-200 rounded-full opacity-50 blur-sm"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <h3 className="font-semibold text-lg mb-4">Rick Tang</h3>
        <div className="grid grid-cols-2 gap-4 text-xs">
          <div>
            <div className="font-medium mb-1">Experience</div>
            <div className="text-gray-500 space-y-1">
              <div>• Software Engineer</div>
              <div>• Product Manager</div>
            </div>
          </div>
          <div>
            <div className="font-medium mb-1">Details</div>
            <div className="text-gray-500 space-y-1">
              <div>Address</div>
              <div>Phone</div>
              <div>Email</div>
              <div>LinkedIn</div>
              <div>Skills</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Template Card Component
function TemplateCard({ template }: { template: TemplateData }) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        {/* Image Section */}
        <div
          className="w-full h-48 relative overflow-hidden mb-2
        "
        >
          <Image
            src={image1}
            alt={template.name}
            fill
            className="object-cover"
          />
        </div>

        {/* Preview Section */}
        {/* <div className="p-4">
          <TemplatePreview type={template.previewType} />
        </div> */}

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
            <Button
              variant="outline"
              size="sm"
              className="flex-1 bg-[#5952FF] text-white cursor-pointer"
            >
              <Eye className="w-4 h-4 mr-1" />
              Preview
            </Button>
            <Button variant="outline" size="sm" className="flex-1">
              <Edit className="w-4 h-4 mr-1" />
              Edit
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="bg-red-500 hover:bg-red-600 text-white border-red-500"
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
      <div className="mb-6">
        <h1 className="text-4xl font-semibold mb-2">Templates</h1>
        <p className="text-sm text-gray-500">
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
