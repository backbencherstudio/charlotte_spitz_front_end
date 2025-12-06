"use client";

import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";

interface CertificateData {
  certificateName: string;
  organization: string;
  result: string;
  expiration: string;
  certificateId: string;
}

interface CertificateStepProps {
  data: CertificateData;
  onUpdate: (data: CertificateData) => void;
}

export default function CertificateStep({
  data,
  onUpdate,
}: CertificateStepProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CertificateData>({
    defaultValues: data,
  });

  const onSubmit = (formData: CertificateData) => {
    onUpdate(formData);
  };

  return (
    <div>
      <h2 className="text-2xl md:text-4xl text-[#070707] font-bold mb-6 text-center">
        Your Certifications
      </h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <Label
              htmlFor="degree"
              className="block mb-2 font-medium text-[#1D1F2C]"
            >
              Certificate Name
            </Label>
            <input
              id="certificateName"
              className="w-full px-6 py-3 border rounded-sm focus:outline-none focus:ring-2 focus:ring-[#5952FF]"
              placeholder="Enter certificate name"
              {...register("certificateName", {
                required: "Certificate name is required",
              })}
            />
            {errors.certificateName && (
              <span className="text-red-600 text-sm">
                {errors.certificateName.message}
              </span>
            )}
          </div>

          <div>
            <Label
              htmlFor="organization"
              className="block mb-2 font-medium text-[#1D1F2C]"
            >
              Issuing Organization
            </Label>
            <input
              id="organization"
              className="w-full px-6 py-3 border rounded-sm focus:outline-none focus:ring-2 focus:ring-[#5952FF]"
              placeholder="Enter organization name"
              {...register("organization", {
                required: "Organization name is required",
              })}
            />
            {errors.organization && (
              <span className="text-red-600 text-sm">
                {errors.organization.message}
              </span>
            )}
          </div>

          <div>
            <Label
              htmlFor="expiration"
              className="block mb-2 font-medium text-[#1D1F2C]"
            >
              Year/Expiration
            </Label>
            <input
              id="expiration"
              type="date"
              placeholder="Enter expiration date"
              className="w-full px-6 py-3 border rounded-sm focus:outline-none focus:ring-2 focus:ring-[#5952FF]"
              {...register("expiration", {
                required: "Expiration date is required",
              })}
            />
            {errors.expiration && (
              <span className="text-red-600 text-sm">
                {errors.expiration.message}
              </span>
            )}
          </div>

          <div>
            <Label
              htmlFor="certificateId"
              className="block mb-2 font-medium text-[#1D1F2C]"
            >
              Certificate ID (Optional)
            </Label>
            <input
              id="certificateId"
              type="text"
              placeholder="Enter certificate ID"
              className="w-full px-6 py-3 border rounded-sm focus:outline-none focus:ring-2 focus:ring-[#5952FF]"
              {...register("certificateId", {
                required: "Certificate ID is required",
              })}
            />
            {errors.certificateId && (
              <span className="text-red-600 text-sm">
                {errors.certificateId.message}
              </span>
            )}
          </div>
        </div>
        <div>
          <button className="px-5 py-3 text-[#5952FF] border border-[#5952FF] rounded-sm flex items-center gap-2 font-semibold cursor-pointer">
            <Plus size={18} />
            <span>Add more</span>
          </button>
        </div>
      </form>
    </div>
  );
}
