"use client";

import type React from "react";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface ResumeData {
  name: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
  experience: Array<{
    id: string;
    company: string;
    position: string;
    date: string;
    location?: string;
    achievements: string[];
  }>;
  education: Array<{
    id: string;
    degree: string;
    school: string;
    date: string;
    details?: string;
  }>;
  skills: {
    languages: string[];
    frameworks: string[];
    tools: string[];
  };
}

interface SectionProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

function Section({ title, isOpen, onToggle, children }: SectionProps) {
  return (
    <div className="border-b border-border pb-4 last:border-b-0">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between py-2 text-left hover:opacity-70 transition-opacity"
      >
        <h2 className="text-lg font-semibold text-foreground">{title}</h2>
        <ChevronDown
          className={`h-5 w-5 text-foreground transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && <div className="mt-3 space-y-3">{children}</div>}
    </div>
  );
}

export function ResumePreview({ data }: { data: ResumeData }) {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    summary: true,
    experience: true,
    education: false,
    skills: false,
  });

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className="relative bg-background rounded-lg border border-border">
      <div className="p-6 pr-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground">{data.name}</h1>
          <div className="mt-2 flex flex-wrap gap-4 text-sm text-muted-foreground">
            <a href={`mailto:${data.email}`} className="hover:text-foreground">
              {data.email}
            </a>
            <span>{data.phone}</span>
            <span>{data.location}</span>
          </div>
        </div>

        {/* Professional Summary Section */}
        <Section
          title="Professional Summary"
          isOpen={openSections.summary}
          onToggle={() => toggleSection("summary")}
        >
          <p className="text-sm text-foreground leading-relaxed">
            {data.summary}
          </p>
        </Section>

        {/* Experience Section */}
        <Section
          title="Experience"
          isOpen={openSections.experience}
          onToggle={() => toggleSection("experience")}
        >
          <div className="space-y-4">
            {data.experience.map((job) => (
              <div key={job.id}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-foreground">
                      {job.position}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {job.company}
                    </p>
                  </div>
                  <div className="text-right text-xs text-muted-foreground whitespace-nowrap">
                    <p>{job.date}</p>
                    {job.location && <p>{job.location}</p>}
                  </div>
                </div>
                <ul className="mt-2 space-y-1 ml-4">
                  {job.achievements.map((achievement, idx) => (
                    <li key={idx} className="text-sm text-foreground list-disc">
                      <span className="text-foreground">{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        {/* Education Section */}
        <Section
          title="Education"
          isOpen={openSections.education}
          onToggle={() => toggleSection("education")}
        >
          <div className="space-y-3">
            {data.education.map((edu) => (
              <div
                key={edu.id}
                className="flex items-start justify-between gap-4"
              >
                <div>
                  <h3 className="font-semibold text-foreground">
                    {edu.degree}
                  </h3>
                  <p className="text-sm text-muted-foreground">{edu.school}</p>
                  {edu.details && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {edu.details}
                    </p>
                  )}
                </div>
                <p className="text-xs text-muted-foreground whitespace-nowrap">
                  {edu.date}
                </p>
              </div>
            ))}
          </div>
        </Section>

        {/* Skills Section */}
        <Section
          title="Skills"
          isOpen={openSections.skills}
          onToggle={() => toggleSection("skills")}
        >
          <div className="space-y-3">
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">
                Programming Languages
              </p>
              <p className="text-sm text-foreground">
                {data.skills.languages.join(", ")}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">
                Frameworks
              </p>
              <p className="text-sm text-foreground">
                {data.skills.frameworks.join(", ")}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">
                Tools
              </p>
              <p className="text-sm text-foreground">
                {data.skills.tools.join(", ")}
              </p>
            </div>
          </div>
        </Section>
      </div>
    </div>
  );
}
