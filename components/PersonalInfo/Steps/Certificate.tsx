"use client";

import { Label } from "@/components/ui/label";
import { Plus, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

interface CertificateData {
  certificateName: string;
  issuingOrganization: string;
  expirationYear: string;
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
  const normalizedInitial = useMemo(() => {
    if (!data || !data.length) {
      return [
        {
          certificateName: "",
          issuingOrganization: "",
          expirationYear: "",
          certificateId: "",
        },
      ];
    }

    return data.map((item: CertificateData) => ({
      certificateName: item.certificateName ?? item.certificateName ?? "",
      issuingOrganization:
        item.issuingOrganization ?? item.issuingOrganization ?? "",
      expirationYear: item.expirationYear ?? item.expirationYear ?? "",
      certificateId: item.certificateId ?? "",
    }));
  }, [data]);

  const [certificates, setCertificates] =
    useState<CertificateData[]>(normalizedInitial);

  // Register snapshot getter for parent so it can pull latest values
  useEffect(() => {
    onSnapshot?.(() => certificates);
  }, [certificates, onSnapshot]);

  const handleFieldChange = (
    index: number,
    field: keyof CertificateData,
    value: string
  ) => {
    const updated = [...certificates];
    updated[index] = { ...updated[index], [field]: value };
    setCertificates(updated);
    onUpdate(updated);
  };

  const addCertificate = () => {
    setCertificates((prev) => [
      ...prev,
      {
        certificateName: "",
        issuingOrganization: "",
        result: "",
        expirationYear: "",
        certificateId: "",
      },
    ]);
  };

  const removeCertificate = (index: number) => {
    if (certificates.length > 1) {
      const updated = certificates.filter((_, i) => i !== index);
      setCertificates(updated);
      onUpdate(updated);
    }
  };

  return (
    <div>
      <h2 className="text-2xl md:text-4xl text-[#070707] font-bold mb-6 text-center">
        Your Certifications
      </h2>

      <div>
        {certificates.map((certificate, index) => (
          <div
            key={index}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6"
          >
            <div className="col-span-2 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-headerColor">
                Certificate {index + 1}
              </h3>
              {certificates.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeCertificate(index)}
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
                className="block mb-2 font-medium text-headerColor"
              >
                Certificate Name
              </Label>
              <input
                id={`certificateName-${index}`}
                className="w-full px-6 py-3 border rounded-sm focus:outline-none focus:ring-2 focus:ring-[#5952FF]"
                placeholder="Enter certificate name"
                required
                value={certificate.certificateName}
                onChange={(e) =>
                  handleFieldChange(index, "certificateName", e.target.value)
                }
              />
            </div>

            <div>
              <Label
                htmlFor={`organization-${index}`}
                className="block mb-2 font-medium text-headerColor"
              >
                Issuing Organization
              </Label>
              <input
                id={`organization-${index}`}
                className="w-full px-6 py-3 border rounded-sm focus:outline-none focus:ring-2 focus:ring-[#5952FF]"
                placeholder="Enter organization name"
                required
                value={certificate.issuingOrganization}
                onChange={(e) =>
                  handleFieldChange(
                    index,
                    "issuingOrganization",
                    e.target.value
                  )
                }
              />
            </div>

            <div>
              <Label
                htmlFor={`expiration-${index}`}
                className="block mb-2 font-medium text-headerColor"
              >
                Year/Expiration
              </Label>
              <input
                id={`expiration-${index}`}
                type="date"
                placeholder="Enter expiration date"
                className="w-full px-6 py-3 border rounded-sm focus:outline-none focus:ring-2 focus:ring-[#5952FF]"
                required
                value={certificate.expirationYear}
                onChange={(e) =>
                  handleFieldChange(index, "expirationYear", e.target.value)
                }
              />
            </div>

            <div>
              <Label
                htmlFor={`certificateId-${index}`}
                className="block mb-2 font-medium text-headerColor"
              >
                Certificate ID (Optional)
              </Label>
              <input
                id={`certificateId-${index}`}
                type="text"
                placeholder="Enter certificate ID"
                className="w-full px-6 py-3 border rounded-sm focus:outline-none focus:ring-2 focus:ring-[#5952FF]"
                value={certificate.certificateId}
                onChange={(e) =>
                  handleFieldChange(index, "certificateId", e.target.value)
                }
              />
            </div>
          </div>
        ))}
        <div>
          <button
            type="button"
            onClick={addCertificate}
            className="px-5 py-3 text-[#5952FF] border border-[#5952FF] rounded-sm flex items-center gap-2 font-semibold cursor-pointer"
          >
            <Plus size={18} />
            <span>Add more</span>
          </button>
        </div>
      </div>
    </div>
  );
}
