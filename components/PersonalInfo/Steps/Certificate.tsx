"use client";

import { Label } from "@/components/ui/label";
import { Plus, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { useFieldArray, useForm } from "react-hook-form";

interface CertificateData {
  certificateName: string;
  organization: string;
  result: string;
  expiration: string;
  certificateId: string;
}

interface CertificateStepProps {
  data: CertificateData[];
  onUpdate: (data: CertificateData[]) => void;
  onSnapshot?: (getter: () => CertificateData[]) => void;
}

export default function CertificateStep({
  data,
  onUpdate,
  onSnapshot,
}: CertificateStepProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    control,
  } = useForm<{ certificates: CertificateData[] }>({
    defaultValues: { certificates: data },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "certificates",
  });

  const getErrorMessage = (
    idx: number,
    key: keyof CertificateData
  ): string | undefined => {
    const ceErrors = (
      errors as unknown as {
        certificates?: Array<
          Partial<Record<keyof CertificateData, { message?: string }>>
        >;
      }
    ).certificates;
    const msg = ceErrors?.[idx]?.[key]?.message;
    return typeof msg === "string" ? msg : undefined;
  };

  // Register snapshot getter for parent
  useEffect(() => {
    onSnapshot?.(() => getValues().certificates);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Ensure at least one certificate block exists
  const ensuredOnceRef = useRef(false);
  useEffect(() => {
    if (ensuredOnceRef.current) return;
    const current = getValues().certificates || [];
    if (!current.length) {
      append({
        certificateName: "",
        organization: "",
        result: "",
        expiration: "",
        certificateId: "",
      });
    }
    ensuredOnceRef.current = true;
  }, [append, getValues]);

  const onSubmit = (formData: { certificates: CertificateData[] }) => {
    onUpdate(formData.certificates);
  };

  return (
    <div>
      <h2 className="text-2xl md:text-4xl text-[#070707] font-bold mb-6 text-center">
        Your Certifications
      </h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6"
          >
            <div className="col-span-2 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-[#1D1F2C]">
                Certificate {index + 1}
              </h3>
              {fields.length > 1 && (
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="inline-flex items-center justify-center h-8 w-8 border border-[#5952FF] text-[#5952FF] rounded-sm cursor-pointer hover:bg-[#5952FF]/10"
                  aria-label="Remove certificate"
                  title="Remove certificate"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            <div>
              <Label
                htmlFor={`certificateName-${index}`}
                className="block mb-2 font-medium text-[#1D1F2C]"
              >
                Certificate Name
              </Label>
              <input
                id={`certificateName-${index}`}
                className="w-full px-6 py-3 border rounded-sm focus:outline-none focus:ring-2 focus:ring-[#5952FF]"
                placeholder="Enter certificate name"
                {...register(`certificates.${index}.certificateName` as const, {
                  required: "Certificate name is required",
                })}
              />
              {getErrorMessage(index, "certificateName") && (
                <span className="text-red-600 text-sm">
                  {getErrorMessage(index, "certificateName")}
                </span>
              )}
            </div>

            <div>
              <Label
                htmlFor={`organization-${index}`}
                className="block mb-2 font-medium text-[#1D1F2C]"
              >
                Issuing Organization
              </Label>
              <input
                id={`organization-${index}`}
                className="w-full px-6 py-3 border rounded-sm focus:outline-none focus:ring-2 focus:ring-[#5952FF]"
                placeholder="Enter organization name"
                {...register(`certificates.${index}.organization` as const, {
                  required: "Organization name is required",
                })}
              />
              {getErrorMessage(index, "organization") && (
                <span className="text-red-600 text-sm">
                  {getErrorMessage(index, "organization")}
                </span>
              )}
            </div>

            <div>
              <Label
                htmlFor={`expiration-${index}`}
                className="block mb-2 font-medium text-[#1D1F2C]"
              >
                Year/Expiration
              </Label>
              <input
                id={`expiration-${index}`}
                type="date"
                placeholder="Enter expiration date"
                className="w-full px-6 py-3 border rounded-sm focus:outline-none focus:ring-2 focus:ring-[#5952FF]"
                {...register(`certificates.${index}.expiration` as const, {
                  required: "Expiration date is required",
                })}
              />
              {getErrorMessage(index, "expiration") && (
                <span className="text-red-600 text-sm">
                  {getErrorMessage(index, "expiration")}
                </span>
              )}
            </div>

            <div>
              <Label
                htmlFor={`certificateId-${index}`}
                className="block mb-2 font-medium text-[#1D1F2C]"
              >
                Certificate ID (Optional)
              </Label>
              <input
                id={`certificateId-${index}`}
                type="text"
                placeholder="Enter certificate ID"
                className="w-full px-6 py-3 border rounded-sm focus:outline-none focus:ring-2 focus:ring-[#5952FF]"
                {...register(`certificates.${index}.certificateId` as const)}
              />
              {getErrorMessage(index, "certificateId") && (
                <span className="text-red-600 text-sm">
                  {getErrorMessage(index, "certificateId")}
                </span>
              )}
            </div>
          </div>
        ))}
        <div>
          <button
            type="button"
            onClick={() =>
              append({
                certificateName: "",
                organization: "",
                result: "",
                expiration: "",
                certificateId: "",
              })
            }
            className="px-5 py-3 text-[#5952FF] border border-[#5952FF] rounded-sm flex items-center gap-2 font-semibold cursor-pointer"
          >
            <Plus size={18} />
            <span>Add more</span>
          </button>
        </div>
      </form>
    </div>
  );
}
