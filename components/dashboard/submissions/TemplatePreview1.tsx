/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import image1 from "@/public/images/11.png";

interface TemplatePreview1Props {
  submissionInfo: any;
}

export default function TemplatePreview1({
  submissionInfo,
}: TemplatePreview1Props) {
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
    <div className="bg-gray-100 relative min-h-screen w-full flex items-center justify-center p-4">
      {/* A4 Size Container */}
      <div
        className="mx-auto shadow-2xl w-[210mm] h-[297mm]"
       
      >
        <div
          className="relative rounded-lg shadow-lg px-4 py-6 sm:px-6 sm:py-8 md:px-10 md:py-12 w-full h-full"
          style={{ width: "210mm", height: "297mm" }}
        >
          {/* Background Image */}
          <Image
            src={image1}
            alt="background"
            className="absolute inset-0 w-full h-full rounded-lg object-cover"
            fill
          />

          {/* Content Container */}
          <div className="relative z-10 h-full overflow-hidden">
            {/* Header Section */}
            <div className="mb-4 w-full lg:w-1/2 space-y-2">
              {/* Name and Title */}
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-1">
                  {personalInfo?.fullName || "Your Name"}
                </h1>
                <p className="text-base md:text-lg text-blue-900 font-bold">
                  {personalInfo?.jobTitle || "Your Job Title"}
                </p>
              </div>

              {/* About Me */}
              <div>
                <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                  {personalInfo?.professionalSummary ||
                    "Professional summary goes here."}
                </p>
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-12 gap-3 md:gap-4">
              {/* Left Column - Main Content */}
              <div className="col-span-12 lg:col-span-8 space-y-4 md:space-y-5">
                {/* Experience */}
                <div>
                  <h2 className="text-lg md:text-xl font-bold text-blue-900 mb-3">
                    Experience
                  </h2>
                  <div className="space-y-3 md:space-y-4">
                    {workExperiences.map((exp: any, idx: number) => (
                      <div key={idx} className="space-y-1">
                        <div className="">
                          <div>
                            <h3 className="text-base md:text-lg font-bold text-gray-800">
                              {exp.companyName}
                            </h3>
                            <p className="text-sm md:text-base text-gray-700">
                              {exp.jobTitle}
                            </p>
                          </div>
                          <p className="text-gray-500 text-xs mt-1">
                            {formatDate(exp.startDate)} -{" "}
                            {exp.endDate ? formatDate(exp.endDate) : "Present"}
                          </p>
                        </div>
                        <ul className="list-disc list-inside space-y-0.5 ml-2 text-xs md:text-sm text-gray-600">
                          {exp.achievements && <li>{exp.achievements}</li>}
                          {exp.responsibilities && (
                            <li>{exp.responsibilities}</li>
                          )}
                          {exp.location && <li>{exp.location}</li>}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Education */}
                <div>
                  <h2 className="text-lg md:text-xl font-bold text-blue-900 mb-2">
                    Education
                  </h2>
                  <div className="space-y-2">
                    {educations.map((edu: any, idx: number) => (
                      <div key={idx}>
                        <h3 className="text-base md:text-lg font-semibold text-gray-800">
                          {edu.institutionName}
                        </h3>
                        <p className="text-xs md:text-sm text-gray-600">
                          {edu.degreeOrCertificate}, {edu.passingYear}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column - Sidebar */}
              <div className="col-span-12 lg:col-span-4 space-y-4 md:space-y-5">
                {/* Details */}
                <div>
                  <h2 className="text-lg md:text-xl font-bold text-blue-900 mb-2">
                    Details
                  </h2>
                  <div className="space-y-1 text-xs md:text-sm text-gray-600">
                    <p>
                      <span className="font-semibold">Address:</span>{" "}
                      {personalInfo?.city_and_state || "N/A"}
                    </p>
                    <p>
                      <span className="font-semibold">Phone:</span>{" "}
                      {personalInfo?.phoneNumber || "N/A"}
                    </p>
                    <p>
                      <span className="font-semibold">Email:</span>{" "}
                      {personalInfo?.email || "N/A"}
                    </p>
                  </div>
                </div>

                {/* Skills */}
                <div>
                  <h2 className="text-lg md:text-xl font-bold text-blue-900 mb-2">
                    Skills
                  </h2>
                  <div className="space-y-2 md:space-y-3">
                    {skills.map((skill: any, idx: number) => (
                      <div key={idx} className="space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="text-xs md:text-sm text-gray-700 font-medium">
                            {skill.name}
                          </span>
                        </div>
                        <Progress
                          value={skill.proficiency || 0}
                          className="h-1.5"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
