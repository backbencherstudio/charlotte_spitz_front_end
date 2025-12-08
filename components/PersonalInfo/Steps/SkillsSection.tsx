'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { Plus } from 'lucide-react';
import { useState } from 'react';

interface SkillTag {
  id: string;
  name: string;
}

interface SkillsSectionProps {
  data: {
    hardSkills: string[];
    softSkills: string[];
    languages: string[];
  };
  onUpdate: (data: {
    hardSkills: string[];
    softSkills: string[];
    languages: string[];
  }) => void;
}

export default function SkillsSection({ data, onUpdate }: SkillsSectionProps) {
  const [hardSkills, setHardSkills] = useState<SkillTag[]>([
    { id: '1', name: 'Microsoft Word' },
    { id: '2', name: 'Microsoft Excel' },
    { id: '3', name: 'Customer Service' },
    { id: '4', name: 'Data Entry' },
    { id: '5', name: 'QuickBooks' },
    { id: '6', name: 'Billing' },
    { id: '7', name: 'Medical Office Skills' },
    { id: '8', name: 'Computer Skills' },
  ]);

  const [softSkills, setSoftSkills] = useState<SkillTag[]>([
    { id: '1', name: 'Communication' },
    { id: '2', name: 'Time Management' },
    { id: '3', name: 'Leadership' },
    { id: '4', name: 'Teamwork' },
    { id: '5', name: 'Detail-Oriented' },
    { id: '6', name: 'Multitasking' },
  ]);

  const [languages, setLanguages] = useState<SkillTag[]>([
    { id: '1', name: 'Bangla' },
    { id: '2', name: 'English' },
    { id: '3', name: 'Hindi' },
    { id: '4', name: 'Spanish' },
    { id: '5', name: 'French' },
    { id: '6', name: 'German' },
  ]);

  const [selectedHardSkills, setSelectedHardSkills] = useState<string[]>([]);

  // Hard Skills state
  const [newHardSkill, setNewHardSkill] = useState<string>('');
  const [isHardSkillInputVisible, setIsHardSkillInputVisible] =
    useState<boolean>(false);

  // Soft Skills state
  const [newSoftSkill, setNewSoftSkill] = useState<string>('');
  const [isSoftSkillInputVisible, setIsSoftSkillInputVisible] =
    useState<boolean>(false);

  // Languages state
  const [newLanguage, setNewLanguage] = useState<string>('');
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

  const handleHardSkillsSubmit = () => {
    if (newHardSkill.trim()) {
      const newSkill = {
        id: String(nextId),
        name: newHardSkill,
      };
      setHardSkills((prevSkills) => [...prevSkills, newSkill]);
      setNewHardSkill('');
      setNextId(nextId + 1);
      setIsHardSkillInputVisible(false);
    }
  };

  const handleSoftSkillsSubmit = () => {
    if (newSoftSkill.trim()) {
      const newSkill = {
        id: String(nextId),
        name: newSoftSkill,
      };
      setSoftSkills((prevSkills) => [...prevSkills, newSkill]);
      setNewSoftSkill('');
      setNextId(nextId + 1);
      setIsSoftSkillInputVisible(false);
    }
  };

  const handleLanguagesSubmit = () => {
    if (newLanguage.trim()) {
      const newSkill = {
        id: String(nextId),
        name: newLanguage,
      };
      setLanguages((prevSkills) => [...prevSkills, newSkill]);
      setNewLanguage('');
      setNextId(nextId + 1);
      setIsLanguageInputVisible(false);
    }
  };

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
                className="inline-flex items-center gap-2 md:p-8 p-4 border border-[#5952FF] rounded-sm relative"
              >
                <span className="text-[#1D1F2C]">{skill.name}</span>
                <div className="absolute top-0.5 right-0.5 md:right-2 md:top-2">
                  <Checkbox className="cursor-pointer rounded-full h-4 w-4 md:h-5 md:w-5 data-[state=checked]:bg-[#5952FF] data-[state=checked]:border-[#5952FF]" />
                </div>
              </div>
            ))}
            <button
              onClick={() => setIsHardSkillInputVisible(true)}
              className="inline-flex items-center gap-2 md:p-8 p-4 border border-[#5952FF] rounded-sm cursor-pointer text-[#1D1F2C]"
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
                className="inline-flex items-center gap-2 px-4 py-2 border border-[#5952FF] rounded-lg text-[#1D1F2C]"
              >
                <span>{skill.name}</span>
              </div>
            ))}
          </div>
          <button
            onClick={() => setIsSoftSkillInputVisible(true)}
            className="inline-flex items-center gap-2 border border-[#5952FF] rounded-sm cursor-pointer text-[#1D1F2C] px-4 py-2"
          >
            <Plus size={18} />
            <span>Add your own Skill</span>
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
                className="inline-flex items-center gap-2 px-4 py-2 border border-[#5952FF] rounded-lg text-[#1D1F2C]"
              >
                <span>{lang.name}</span>
              </div>
            ))}
          </div>
          <button
            onClick={() => setIsLanguageInputVisible(true)}
            className="inline-flex items-center gap-2 border border-[#5952FF] rounded-sm cursor-pointer text-[#1D1F2C] px-4 py-2"
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
