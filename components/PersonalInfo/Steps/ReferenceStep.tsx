"use client";

import { useEffect, useMemo, useState } from "react";
import { Label } from "@/components/ui/label";
import { Plus, X } from "lucide-react";

interface ReferenceData {
  name: string;
  relationship: string;
  phoneNumber: string;
  availableOnRequest: boolean;
}

interface ReferenceStepProps {
  data: ReferenceData[];
  onUpdate: (data: ReferenceData[]) => void;
  onSnapshot?: (getter: () => ReferenceData[]) => void;
}

export default function ReferenceStep({
  data,
  onUpdate,
  onSnapshot,
}: ReferenceStepProps) {
  const normalizedInitial = useMemo(() => {
    if (!data || !data.length) {
      return [{ name: "", relationship: "", phoneNumber: "", availableOnRequest: false }];
    }
    return data.map((item: ReferenceData) => ({
      name: item.name ?? "",
      relationship: item.relationship ?? "",
      phoneNumber: item.phoneNumber ?? "",
      availableOnRequest: item.availableOnRequest ?? false,
    }));
  }, [data]);

  const [references, setReferences] = useState<ReferenceData[]>(normalizedInitial);
  // keep local state aligned if parent data changes
  useEffect(() => {
    setReferences(normalizedInitial);
  }, [normalizedInitial]);
  const [availableUponRequest, setAvailableUponRequest] = useState(
    normalizedInitial?.[0]?.availableOnRequest ?? false
  );

  const handleFieldChange = (
    index: number,
    field: keyof ReferenceData,
    value: string
  ) => {
    const updated = [...references];
    updated[index] = { ...updated[index], [field]: value };
    setReferences(updated);
    onUpdate(updated);
  };

  const addReference = () => {
    setReferences((prev) => {
      const next = [
        ...prev,
        { name: "", relationship: "", phoneNumber: "", availableOnRequest: false },
      ];
      onUpdate(next);
      return next;
    });
  };

  const removeReference = (index: number) => {
    if (references.length > 1) {
      setReferences((prev) => {
        const next = prev.filter((_, i) => i !== index);
        onUpdate(next);
        return next;
      });
    }
  };

  const handleAvailableToggle = (checked: boolean) => {
    setAvailableUponRequest(checked);
    if (checked) {
      const next = [
        { name: "", relationship: "", phoneNumber: "", availableOnRequest: true },
      ];
      setReferences(next);
      onUpdate(next);
    } else {
      // keep existing entries but ensure flag is false
      const next = references.length
        ? references.map((r) => ({ ...r, availableOnRequest: false }))
        : [{ name: "", relationship: "", phoneNumber: "", availableOnRequest: false }];
      setReferences(next);
      onUpdate(next);
    }
  };

  // Register snapshot getter for parent so it can pull latest values
  useEffect(() => {
    onSnapshot?.(() => references);
  }, [references, onSnapshot]);

  return (
    <div>
      <h2 className="text-2xl md:text-4xl text-[#070707] font-bold mb-6 text-center">
        References
      </h2>

      <div className="flex items-center gap-3 mb-6 justify-center md:justify-start">
        <input
          id="available-request"
          type="checkbox"
          className="h-4 w-4 accent-[#5952FF]"
          checked={availableUponRequest}
          onChange={(e) => handleAvailableToggle(e.target.checked)}
        />
        <Label htmlFor="available-request" className="text-headerColor">
          Available upon request
        </Label>
      </div>

      {availableUponRequest && (
        <div className="mb-6 text-sm text-headerColor bg-[#5952FF]/5 border border-[#5952FF]/30 rounded-sm px-4 py-3">
          You have indicated that references are available upon request. You can uncheck the box to add specific reference details.
        </div>
      )}

      <div>
        {references.map((ref, index) => (
          <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="col-span-2 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-headerColor">Reference {index + 1}</h3>
              {!availableUponRequest && references.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeReference(index)}
                  className="inline-flex items-center justify-center h-8 w-8 border border-[#5952FF] text-[#5952FF] rounded-sm cursor-pointer hover:bg-[#5952FF]/10"
                  aria-label="Remove reference"
                  title="Remove reference"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            <div>
              <Label htmlFor={`ref-name-${index}`} className="block mb-2 font-medium text-headerColor">
                Name
              </Label>
              <input
                id={`ref-name-${index}`}
                type="text"
                className="w-full px-6 py-3 border rounded-sm focus:outline-none focus:ring-2 focus:ring-[#5952FF]"
                placeholder="Enter full name"
                required={!availableUponRequest}
                disabled={availableUponRequest}
                value={ref.name}
                onChange={(e) => handleFieldChange(index, "name", e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor={`ref-relationship-${index}`} className="block mb-2 font-medium text-headerColor">
                Relationship
              </Label>
              <input
                id={`ref-relationship-${index}`}
                type="text"
                className="w-full px-6 py-3 border rounded-sm focus:outline-none focus:ring-2 focus:ring-[#5952FF]"
                placeholder="e.g., Manager, Professor"
                required={!availableUponRequest}
                disabled={availableUponRequest}
                value={ref.relationship}
                onChange={(e) => handleFieldChange(index, "relationship", e.target.value)}
              />
            </div>

            <div className="md:col-span-2">
              <Label htmlFor={`ref-phone-${index}`} className="block mb-2 font-medium text-headerColor">
                Phone Number
              </Label>
              <input
                id={`ref-phone-${index}`}
                type="tel"
                inputMode="tel"
                className="w-full px-6 py-3 border rounded-sm focus:outline-none focus:ring-2 focus:ring-[#5952FF]"
                placeholder="Enter phone number"
                required={!availableUponRequest}
                disabled={availableUponRequest}
                value={ref.phoneNumber}
                onChange={(e) => handleFieldChange(index, "phoneNumber", e.target.value)}
              />
            </div>
          </div>
        ))}

        {!availableUponRequest && (
          <div>
            <button
              type="button"
              onClick={addReference}
              className="px-5 py-3 text-[#5952FF] border border-[#5952FF] rounded-sm flex items-center gap-2 font-semibold cursor-pointer"
            >
              <Plus size={18} />
              <span>Add more</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}