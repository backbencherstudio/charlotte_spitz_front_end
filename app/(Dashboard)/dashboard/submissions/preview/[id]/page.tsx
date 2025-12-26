/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import image1 from "@/public/images/11.png";
import { useGetSubmissionsByIdQuery } from "@/src/redux/features/setting";
import { useParams } from "next/navigation";

interface ExperienceItem {
  company: string;
  position: string;
  period: string;
  bullets: string[];
}

interface Skill {
  name: string;
  proficiency: number; // 0-100
}

export default function Preview() {
  const { id } = useParams();

  const { data: submissionData, isLoading } = useGetSubmissionsByIdQuery(id);

  // console.log(submissionData?.data?.[0]);

  const submissionInfo = submissionData?.data?.[0];

  const experiences: ExperienceItem[] = [
    {
      company: "Uber",
      position: "Product Designer",
      period: "Mar 2018 - Present",
      bullets: [
        "Designed safety-focused experiences for Riders and Drivers",
        "Physical space problem solving and its interaction with the digital interface",
        "Navigated organization to achieve operational improvements",
      ],
    },
    {
      company: "IFTTT",
      position: "Product Designer",
      period: "Dec 2015 - Mar 2018",
      bullets: [
        "Product and system design for a complex product",
        "Collaborated with researchers and developers for IFTTT",
        "Responsible for maintaining design across iOS, Android, and web",
      ],
    },
    {
      company: "Facebook",
      position: "Product Designer",
      period: "June 2013 - Sep 2015",
      bullets: [
        "Designed and prototyped internal tools",
        "Partnered with many teams to build assets and features",
        "Authored/developed custom user experience for mobile",
      ],
    },
    {
      company: "Google Maps",
      position: "UX/UI Design Intern",
      period: "June 2012 - Sep 2012",
      bullets: [
        "Contributed to Maps on iOS wireframe and user experience",
        "Designed and prototyped onboarding experience",
        "Asset and feature design for Maps on Android",
      ],
    },
  ];

  const skills: Skill[] = [
    { name: "Figma", proficiency: 90 },
    { name: "Sketch", proficiency: 85 },
    { name: "Adobe Photoshop", proficiency: 75 },
    { name: "Adobe Illustrator", proficiency: 70 },
    { name: "Principle", proficiency: 65 },
    { name: "Adobe XD", proficiency: 80 },
  ];

  return (
    <div className="bg-gray-100 relative min-h-screen w-full">
      {/* Main content container */}
      <div className="mx-auto p-3 sm:p-4 md:p-6 w-full max-w-7xl">
        <div className="relative rounded-lg shadow-lg px-4 py-6 sm:px-6 sm:py-8 md:px-10 md:py-12 lg:px-16 lg:py-20 w-full min-h-screen">
          {/* Background Image */}
          <Image
            src={image1}
            alt="background"
            className="absolute inset-0 w-full h-full rounded-lg"
          />

          {/* Content Container */}
          <div className="relative z-10">
            {/* Header Section */}
            <div className="mb-6 sm:mb-8 md:mb-10 lg:mb-12 w-full lg:w-1/2 space-y-3 sm:space-y-4">
              {/* Name and Title */}
              <div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-7xl font-bold text-blue-900 mb-1 sm:mb-2">
                  {submissionInfo?.submission?.personalInfo?.fullName}
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-blue-900 font-bold">
                  {submissionInfo?.submission?.personalInfo?.jobTitle ||
                    "Product Designer"}
                </p>
              </div>

              {/* About Me */}
              <div>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  {
                    submissionInfo?.submission?.personalInfo
                      ?.professionalSummary
                  }
                </p>
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-12 gap-4 sm:gap-6 md:gap-8">
              {/* Left Column - Main Content */}
              <div className="col-span-12 lg:col-span-8 space-y-6 sm:space-y-8 md:space-y-10 lg:space-y-12">
                {/* Experience */}
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-blue-900 mb-4 sm:mb-5 md:mb-6">
                    Experience
                  </h2>
                  <div className="space-y-4 sm:space-y-5 md:space-y-6">
                    {submissionInfo?.submission?.workExperiences?.map(
                      (exp: any, idx:number) => (
                        <div key={idx} className="space-y-2">
                          <div className="">
                            <div>
                              <h3 className="text-lg sm:text-xl font-bold text-gray-800">
                                {exp.companyName}
                              </h3>
                              <p className="text-base sm:text-lg text-gray-700">
                                {exp.jobTitle}
                              </p>
                            </div>
                            <p className="text-gray-500 text-xs sm:text-sm mt-1">
                              {new Date(exp.startDate).toLocaleString("en-US", {
                                month: "short",
                                year: "numeric",
                              })}
                              -
                              {new Date(exp.endDate).toLocaleString("en-US", {
                                month: "short",
                                year: "numeric",
                              })}
                            </p>
                          </div>
                          <ul className="list-disc list-inside space-y-1 ml-2 sm:ml-4 text-sm sm:text-base text-gray-600">
                            <li>{exp.achievements}</li>
                            <li>{exp.responsibilities}</li>
                            <li>{exp.location}</li>
                          </ul>
                        </div>
                      )
                    )}
                  </div>
                  {/* <div className="space-y-4 sm:space-y-5 md:space-y-6">
                    {experiences.map((exp, idx) => (
                      <div key={idx} className="space-y-2">
                        <div className="">
                          <div>
                            <h3 className="text-lg sm:text-xl font-bold text-gray-800">
                              {exp.company}
                            </h3>
                            <p className="text-base sm:text-lg text-gray-700">
                              {exp.position}
                            </p>
                          </div>
                          <p className="text-gray-500 text-xs sm:text-sm mt-1">
                            {exp.period}
                          </p>
                        </div>
                        <ul className="list-disc list-inside space-y-1 ml-2 sm:ml-4 text-sm sm:text-base text-gray-600">
                          {exp.bullets.map((bullet, bulletIdx) => (
                            <li key={bulletIdx}>{bullet}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div> */}
                </div>

                {/* Education */}
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-blue-900 mb-2 sm:mb-3">
                    Education
                  </h2>
                  {submissionInfo?.submission?.educations?.map((edu: any, idx: number) => (
                    <div key={idx}>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
                        {edu.institutionName}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600">
                      Passing Year : {edu.passingYear}
                      </p>
                    </div>
                  ))}
                  {/* <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
                      Brown University
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600">
                      Interdisciplinary Studies, Sep 2010 - May 2012
                    </p>
                  </div> */}
                </div>
              </div>

              {/* Right Column - Sidebar */}
              <div className="col-span-12 lg:col-span-4 space-y-6 sm:space-y-7 md:space-y-8">
                {/* Details */}
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-blue-900 mb-3 sm:mb-4">
                    Details
                  </h2>
                  <div className="space-y-2 text-sm sm:text-base text-gray-600">
                    <p>
                      <span className="font-semibold">Address:</span> San
                      Francisco, California
                    </p>
                    <p>
                      <span className="font-semibold">Phone:</span> {submissionInfo?.submission?.personalInfo?.phoneNumber}
                    </p>
                    <p>
                      <span className="font-semibold">Email:</span> 
                      {submissionInfo?.submission?.personalInfo?.email}
                    </p>
                  </div>
                </div>

                {/* Skills */}
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-blue-900 mb-3 sm:mb-4">
                    Skills
                  </h2>
                  <div className="space-y-3 sm:space-y-4">
                    {skills.map((skill, idx) => (
                      <div key={idx} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm sm:text-base text-gray-700 font-medium">
                            {skill.name}
                          </span>
                        </div>
                        <Progress value={skill.proficiency} className="h-2" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Links */}
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-blue-900 mb-3 sm:mb-4">
                    Links
                  </h2>
                  <div className="space-y-2">
                    <a
                      href="#"
                      className="text-sm sm:text-base text-blue-600 hover:text-blue-800 underline block"
                    >
                      LinkedIn
                    </a>
                    <a
                      href="#"
                      className="text-sm sm:text-base text-blue-600 hover:text-blue-800 underline block"
                    >
                      Dribbble
                    </a>
                    <a
                      href="#"
                      className="text-sm sm:text-base text-blue-600 hover:text-blue-800 underline block"
                    >
                      Behance
                    </a>
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
