/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import { Progress } from "@/components/ui/progress";
import image1 from "@/public/images/image 265.png";

interface TemplatePreview2Props {
  submissionInfo: any;
}

export default function TemplatePreview2({
  submissionInfo,
}: TemplatePreview2Props) {
  const personalInfo = submissionInfo?.submission?.personalInfo;
  const workExperiences = submissionInfo?.submission?.workExperiences ?? [];
  const educations = submissionInfo?.submission?.educations ?? [];
  const skills = submissionInfo?.submission?.skills ?? [];

  // Format date helper
  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  return (
    <main className="min-h-screen bg-gray-200 flex items-center justify-center p-6">
      <div className="w-[210mm] h-[297mm] bg-white rounded-xl shadow-lg overflow-hidden grid grid-cols-12">
        {/* LEFT SIDEBAR */}
        <aside className="col-span-4 bg-[#145349] text-white p-8">
          <div className="flex flex-col items-center text-center">
            <Image
              src={image1}
              alt="profile"
              width={90}
              height={90}
              className="rounded-full mb-4"
            />
            <h2 className="text-lg font-semibold">
              {personalInfo?.fullName || "Your Name"}
            </h2>
            <p className="text-sm text-gray-300">
              {personalInfo?.jobTitle || "Your Job Title"}
            </p>
          </div>

          {/* DETAILS */}
          <div className="mt-8">
            <h3 className="text-xs uppercase tracking-wider mb-3">Details</h3>
            <p className="text-sm text-gray-300">
              {personalInfo?.city_and_state || "N/A"}
            </p>
            <p className="text-sm text-gray-300 mt-1">
              {personalInfo?.phoneNumber || "N/A"}
            </p>
            <p className="text-sm text-gray-300 mt-1">
              {personalInfo?.email || "N/A"}
            </p>
          </div>

          {/* Skills */}
          <div className="mt-8">
            <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
              Skills
            </h2>
            <div className="space-y-3 sm:space-y-4">
              {skills.map((skill: any, idx: number) => (
                <div key={idx} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm sm:text-base font-medium">
                      {skill.name}
                    </span>
                  </div>
                  <Progress value={skill.proficiency || 0} className="h-2" />
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* RIGHT CONTENT */}
        <section className="col-span-8 p-10">
          {/* PROFILE */}
          <div>
            <h2 className="text-lg font-semibold mb-3">Profile</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              {personalInfo?.professionalSummary ||
                "Professional summary goes here."}
            </p>
          </div>

          {/* EXPERIENCE */}
          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-4">Experience</h2>
            <div className="space-y-6">
              {workExperiences.map((exp: any, i: number) => (
                <div key={i}>
                  <h3 className="font-semibold">{exp.companyName}</h3>
                  <p className="text-sm text-gray-600">{exp.jobTitle}</p>
                  <p className="text-xs text-gray-400 mb-2">
                    {formatDate(exp.startDate)} -{" "}
                    {exp.endDate ? formatDate(exp.endDate) : "Present"}
                  </p>
                  <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                    {exp.achievements && <li>{exp.achievements}</li>}
                    {exp.responsibilities && <li>{exp.responsibilities}</li>}
                    {exp.location && <li>{exp.location}</li>}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* EDUCATION */}
          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-3">Education</h2>
            {educations.map((edu: any, idx: number) => (
              <div key={idx} className="mb-3">
                <p className="font-medium text-sm">{edu.institutionName}</p>
                <p className="text-sm text-gray-500">
                  {edu.degreeOrCertificate} · {edu.passingYear}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
