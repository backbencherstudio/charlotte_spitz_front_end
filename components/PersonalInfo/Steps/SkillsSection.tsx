"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";

interface SkillTag {
  id: string;
  name: string;
  isCustom: boolean;
}

interface FormattedSkill {
  name: string;
  type: "HARD" | "SOFT" | "LANGUAGE";
  isCustom: boolean;
}

interface SkillsSectionProps {
  data: FormattedSkill[];

  onUpdate: (data: FormattedSkill[]) => void;
  onSnapshot?: (getter: () => FormattedSkill[]) => void;
}

export default function SkillsSection({ onSnapshot }: SkillsSectionProps) {
  const [hardSkills, setHardSkills] = useState<SkillTag[]>([
    { id: "1", name: "Microsoft Word", isCustom: false },
    { id: "2", name: "Microsoft Excel", isCustom: false },
    { id: "3", name: "Customer Service", isCustom: false },
    { id: "4", name: "Data Entry", isCustom: false },
    { id: "5", name: "QuickBooks", isCustom: false },
    { id: "6", name: "Billing", isCustom: false },
    { id: "7", name: "Medical Office Skills", isCustom: false },
    { id: "8", name: "Computer Skills", isCustom: false },
  ]);

  const [softSkills, setSoftSkills] = useState<SkillTag[]>([
    { id: "1", name: "Communication", isCustom: false },
    { id: "2", name: "Time Management", isCustom: false },
    { id: "3", name: "Leadership", isCustom: false },
    { id: "4", name: "Teamwork", isCustom: false },
    { id: "5", name: "Detail-Oriented", isCustom: false },
    { id: "6", name: "Multitasking", isCustom: false },
  ]);

  const [languages, setLanguages] = useState<SkillTag[]>([
    { id: "1", name: "Bangla", isCustom: false },
    { id: "2", name: "English", isCustom: false },
    { id: "3", name: "Hindi", isCustom: false },
    { id: "4", name: "Spanish", isCustom: false },
    { id: "5", name: "French", isCustom: false },
    { id: "6", name: "German", isCustom: false },
  ]);

  const [selectedHardSkills, setSelectedHardSkills] = useState<string[]>([]);
  const [selectedSoftSkills, setSelectedSoftSkills] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);

  // Hard Skills state
  const [newHardSkill, setNewHardSkill] = useState<string>("");
  const [isHardSkillInputVisible, setIsHardSkillInputVisible] =
    useState<boolean>(false);

  // Soft Skills state
  const [newSoftSkill, setNewSoftSkill] = useState<string>("");
  const [isSoftSkillInputVisible, setIsSoftSkillInputVisible] =
    useState<boolean>(false);

  // Languages state
  const [newLanguage, setNewLanguage] = useState<string>("");
  const [isLanguageInputVisible, setIsLanguageInputVisible] =
    useState<boolean>(false);

  const [nextId, setNextId] = useState<number>(
    Math.max(hardSkills.length, softSkills.length, languages.length) + 1
  );

  const selectHardSkill = (id: string) => {
    setSelectedHardSkills((prev) =>
      prev.includes(id)
        ? prev.filter((skillId) => skillId !== id)
        : [...prev, id]
    );
  };

  const selectSoftSkill = (id: string) => {
    setSelectedSoftSkills((prev) =>
      prev.includes(id)
        ? prev.filter((skillId) => skillId !== id)
        : [...prev, id]
    );
  };

  const selectLanguage = (id: string) => {
    setSelectedLanguages((prev) =>
      prev.includes(id) ? prev.filter((langId) => langId !== id) : [...prev, id]
    );
  };

  const handleHardSkillsSubmit = () => {
    if (newHardSkill.trim()) {
      const newSkill = {
        id: String(nextId),
        name: newHardSkill,
        isCustom: true,
      };
      setHardSkills((prevSkills) => [...prevSkills, newSkill]);
      setSelectedHardSkills((prev) => [...prev, String(nextId)]);
      setNewHardSkill("");
      setNextId(nextId + 1);
      setIsHardSkillInputVisible(false);
    }
  };

  const handleSoftSkillsSubmit = () => {
    if (newSoftSkill.trim()) {
      const newSkill = {
        id: String(nextId),
        name: newSoftSkill,
        isCustom: true,
      };
      setSoftSkills((prevSkills) => [...prevSkills, newSkill]);
      setSelectedSoftSkills((prev) => [...prev, String(nextId)]);
      setNewSoftSkill("");
      setNextId(nextId + 1);
      setIsSoftSkillInputVisible(false);
    }
  };

  const handleLanguagesSubmit = () => {
    if (newLanguage.trim()) {
      const newSkill = {
        id: String(nextId),
        name: newLanguage,
        isCustom: true,
      };
      setLanguages((prevSkills) => [...prevSkills, newSkill]);
      setSelectedLanguages((prev) => [...prev, String(nextId)]);
      setNewLanguage("");
      setNextId(nextId + 1);
      setIsLanguageInputVisible(false);
    }
  };

  // Register snapshot getter so parent can pull values on navigation
  useEffect(() => {
    const getSnapshot = (): FormattedSkill[] => {
      const formattedSkills: FormattedSkill[] = [];

      // Add selected hard skills
      hardSkills
        .filter((s) => selectedHardSkills.includes(s.id))
        .forEach((s) => {
          formattedSkills.push({
            name: s.name,
            type: "HARD",
            isCustom: s.isCustom,
          });
        });

      // Add selected soft skills
      softSkills
        .filter((s) => selectedSoftSkills.includes(s.id))
        .forEach((s) => {
          formattedSkills.push({
            name: s.name,
            type: "SOFT",
            isCustom: s.isCustom,
          });
        });

      // Add selected languages
      languages
        .filter((l) => selectedLanguages.includes(l.id))
        .forEach((l) => {
          formattedSkills.push({
            name: l.name,
            type: "LANGUAGE",
            isCustom: l.isCustom,
          });
        });

      return formattedSkills;
    };
    onSnapshot?.(getSnapshot);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    hardSkills,
    softSkills,
    languages,
    selectedHardSkills,
    selectedSoftSkills,
    selectedLanguages,
  ]);

  return (
    <main>
      <div>
        <h2 className="text-2xl md:text-4xl text-[#070707] font-bold mb-6 text-center">
          Your Skills Section
        </h2>
        <div className="mb-8">
          <h2 className="text-[16px] md:text-xl font-semibold text-gray-900 mb-4">
            Hard Skills Examples
          </h2>
          <div className="flex flex-wrap gap-3 mb-4">
            {hardSkills.map((skill) => (
              <div
                key={skill.id}
                onClick={() => selectHardSkill(skill.id)}
                className={
                  `inline-flex cursor-pointer items-center hover:bg-primaryColor/15 gap-2 md:px-6 md:py-5 px-4 py-2 border border-primaryColor rounded-sm relative` +
                  (selectedHardSkills.includes(skill.id)
                    ? " bg-primaryColor/15 text-headerColor border-primaryColor"
                    : " text-headerColor border-primaryColor")
                }
              >
                <span className="text-headerColor">{skill.name}</span>
                <div className="absolute top-0.5 right-0.5 md:right-1 md:top-1">
                  <Checkbox
                    checked={selectedHardSkills.includes(skill.id)}
                    className="cursor-pointer rounded-full h-4 w-4 md:h-5 md:w-5 data-[state=checked]:bg-primaryColor data-[state=checked]:border-primaryColor"
                  />
                </div>
              </div>
            ))}
            <button
              onClick={() => setIsHardSkillInputVisible(true)}
              className="inline-flex items-center gap-2 md:px-6 md:py-5 px-4 py-2 border border-[#5952FF] rounded-sm cursor-pointer text-headerColor"
            >
              <Plus size={18} />
              <span>Add</span>
            </button>
          </div>
        </div>

        {isHardSkillInputVisible && (
          <div className="fixed inset-0 bg-opacity-10 flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
              <h3 className="text-xl font-semibold mb-4">
                Add a New Hard Skill
              </h3>
              <input
                type="text"
                value={newHardSkill}
                onChange={(e) => setNewHardSkill(e.target.value)}
                className="p-2 border border-[#5952FF] rounded-sm w-full mb-4"
                placeholder="Enter a new hard skill..."
              />
              <div className="flex justify-between">
                <button
                  onClick={handleHardSkillsSubmit}
                  className="bg-[#5952FF] cursor-pointer text-white px-4 py-2 rounded-sm"
                >
                  Add
                </button>
                <button
                  onClick={() => setIsHardSkillInputVisible(false)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-sm cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Soft Skills Section */}
        <div className="mb-8">
          <h2 className="text-[16px] md:text-xl font-semibold text-gray-900 mb-4">
            Soft Skills Examples
          </h2>
          <div className="flex flex-wrap gap-3 mb-4">
            {softSkills.map((skill) => (
              <div
                key={skill.id}
                onClick={() => selectSoftSkill(skill.id)}
                className={`inline-flex items-center gap-2 px-2 py-1 hover:bg-primaryColor hover:text-white duration-200 md:px-4 md:py-2.5 border rounded-sm cursor-pointer transition-all ${
                  selectedSoftSkills.includes(skill.id)
                    ? "bg-primaryColor text-white border-primaryColor"
                    : "border-primaryColor text-headerColor"
                }`}
              >
                <span>{skill.name}</span>
              </div>
            ))}
          </div>
          <button
            onClick={() => setIsSoftSkillInputVisible(true)}
            className="inline-flex items-center gap-2 border border-[#5952FF] rounded-sm cursor-pointer text-headerColor px-4 py-2 md:py-2.5"
          >
            <Plus size={18} />
            <span>Add your own Skill </span>
          </button>

          {isSoftSkillInputVisible && (
            <div className="fixed inset-0 bg-opacity-10 flex justify-center items-center">
              <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h3 className="text-xl font-semibold mb-4">
                  Add a New Soft Skill
                </h3>
                <input
                  type="text"
                  value={newSoftSkill}
                  onChange={(e) => setNewSoftSkill(e.target.value)}
                  className="p-2 border border-[#5952FF] rounded-sm w-full mb-4"
                  placeholder="Enter a new soft skill..."
                />
                <div className="flex justify-between">
                  <button
                    onClick={handleSoftSkillsSubmit}
                    className="bg-[#5952FF] cursor-pointer text-white px-4 py-2 rounded-sm"
                  >
                    Add
                  </button>
                  <button
                    onClick={() => setIsSoftSkillInputVisible(false)}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-sm cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Languages Section */}
        <div className="mb-12">
          <h2 className="text-[16px] md:text-xl font-semibold text-gray-900 mb-4">
            Languages
          </h2>
          <div className="flex flex-wrap gap-3 mb-4">
            {languages.map((lang) => (
              <div
                key={lang.id}
                onClick={() => selectLanguage(lang.id)}
                className={`inline-flex items-center gap-2 px-2 py-1 hover:bg-primaryColor hover:text-white duration-200  md:px-4 md:py-2.5 border rounded-sm cursor-pointer transition-all ${
                  selectedLanguages.includes(lang.id)
                    ? "bg-primaryColor text-white border-primaryColor"
                    : "border-primaryColor text-headerColor"
                }`}
              >
                <span>{lang.name}</span>
              </div>
            ))}
          </div>
          <button
            onClick={() => setIsLanguageInputVisible(true)}
            className="inline-flex items-center gap-2 border border-[#5952FF] rounded-sm cursor-pointer text-headerColor px-4 py-2 md:py-2.5"
          >
            <Plus size={18} />
            <span>Add languages</span>
          </button>

          {isLanguageInputVisible && (
            <div className="fixed inset-0 bg-opacity-10 flex justify-center items-center">
              <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h3 className="text-xl font-semibold mb-4">
                  Add a New Language
                </h3>
                <input
                  type="text"
                  value={newLanguage}
                  onChange={(e) => setNewLanguage(e.target.value)}
                  className="p-2 border border-[#5952FF] rounded-sm w-full mb-4"
                  placeholder="Enter a new language..."
                />
                <div className="flex justify-between">
                  <button
                    onClick={handleLanguagesSubmit}
                    className="bg-[#5952FF] cursor-pointer text-white px-4 py-2 rounded-sm"
                  >
                    Add
                  </button>
                  <button
                    onClick={() => setIsLanguageInputVisible(false)}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-sm cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
