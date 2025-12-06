"use client";

import type React from "react";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
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
  className?: string;
}

function Section({
  title,
  isOpen,
  onToggle,
  className,
  children,
}: SectionProps) {
  return (
    <div
      className={`border-b border-border  mt-1.5 last:border-b-0 ${className}`}
    >
      <button
        onClick={onToggle}
        className="flex w-full items-center gap-3  py-1 text-left cursor-pointer transition-opacity"
      >
        <h2 className="text-[13px] font-bold text-foreground">{title}</h2>
        <ChevronDown
          className={`h-4 w-4 text-foreground transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && <div className="mt-1 space-y-3">{children}</div>}
    </div>
  );
}

export function ResumePreview({ data }: { data: ResumeData }) {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    summary: true,
    experience: true,
    education: true,
    skills: true,
  });

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className="relative bg-background rounded-md border border-gray-200 ">
      <div className="p-3 ">
        {/* Header */}
        <div className="mb-2.5">
          <h1 className="text-[15px] font-bold text-foreground">{data.name}</h1>
          <div className="mt-1.5 flex flex-wrap items-center gap-3 text-[11px] text-muted-foreground">
            <a href={`mailto:${data.email}`} className="hover:text-foreground">
              {data.email}
            </a>
            <div className="text-[11px] flex gap-1 items-end">
              <span className="text-muted-foreground">•</span>
              <p>{data.phone}</p>
            </div>
            <div className="text-[11px] flex gap-1 items-end">
              <span className="text-muted-foreground">•</span>
              <span>{data.location}</span>
            </div>
          </div>
        </div>

        {/* Professional Summary Section */}
        <Section
          className="pb-2.5"
          title="Professional Summary"
          isOpen={openSections.summary}
          onToggle={() => toggleSection("summary")}
        >
          <p className="text-[11px] text-foreground leading-relaxed">
            {data.summary}
          </p>
        </Section>

        {/* Experience Section */}
        <Section
          className="pb-2.5"
          title="Experience"
          isOpen={openSections.experience}
          onToggle={() => toggleSection("experience")}
        >
          <div className="space-y-3">
            {data.experience.map((job) => (
              <div key={job.id}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-xs text-foreground">
                      {job.position}
                    </h3>
                    <Link
                      href="#"
                      className="text-[11px] font-semibold text-primaryColor "
                    >
                      {job.company}
                    </Link>
                  </div>
                  <div className="text-right text-[11px] text-muted-foreground whitespace-nowrap">
                    <p>{job.date}</p>
                    {job.location && <p>{job.location}</p>}
                  </div>
                </div>
                <ul className="mt-1 space-y-1 ml-4">
                  {job.achievements.map((achievement, idx) => (
                    <li
                      key={idx}
                      className="text-[11px] text-foreground list-disc"
                    >
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
          className="pb-2.5"
          title="Education"
          isOpen={openSections.education}
          onToggle={() => toggleSection("education")}
        >
          <div className="space-y-2">
            {data.education.map((edu) => (
              <div
                key={edu.id}
                className="flex items-start justify-between gap-4"
              >
                <div>
                  <h3 className="font-bold text-xs text-foreground">
                    {edu.degree}
                  </h3>
                  <p className="text-[11px] mt-1 text-primaryColor font-semibold">
                    {edu.school}
                  </p>
                  {edu.details && (
                    <p className="text-[11px]  text-muted-foreground mt-1">
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
          <div className=" grid grid-cols-2 gap-1">
            <div>
              <p className="text-xs font-semibold text-muted-foreground  mb-1">
                Programming Languages :
              </p>
              <p className="text-[11px] text-foreground">
                {data.skills.languages.join(", ")}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground  mb-1">
                Frameworks :
              </p>
              <p className="text-[11px] text-foreground">
                {data.skills.frameworks.join(", ")}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground  mb-1">
                Tools :
              </p>
              <p className="text-[11px] text-foreground">
                {data.skills.tools.join(", ")}
              </p>
            </div>
          </div>
        </Section>
      </div>
    </div>
  );
}
