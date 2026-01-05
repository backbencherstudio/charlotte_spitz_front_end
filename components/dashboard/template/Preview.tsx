"use client";

import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import image1 from "@/public/images/11.png";

interface ExperienceItem {
  company: string;
  position: string;
  period: string;
  bullets: string[];
}

interface Skill {
  name: string;
  proficiency: number;
}

export default function Preview() {
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
    <div className="bg-gray-100 relative min-h-screen w-full flex items-center justify-center p-4">
      {/* A4 Size Container */}
      <div
        className="mx-auto shadow-2xl"
        style={{
          width: "210mm",
          height: "297mm",
          maxWidth: "210mm",
          maxHeight: "297mm",
        }}
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
                  Rick Tang
                </h1>
                <p className="text-base md:text-lg text-blue-900 font-bold">
                  Product Designer
                </p>
              </div>

              {/* About Me */}
              <div>
                <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                  I&apos;m a UI/UX specialist focused on designing clean and
                  functional projects across all platforms and devices in
                  response to specific briefs and problems, while always
                  maintaining a unique look and feel.
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
                    {experiences.map((exp, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="">
                          <div>
                            <h3 className="text-base md:text-lg font-bold text-gray-800">
                              {exp.company}
                            </h3>
                            <p className="text-sm md:text-base text-gray-700">
                              {exp.position}
                            </p>
                          </div>
                          <p className="text-gray-500 text-xs mt-1">
                            {exp.period}
                          </p>
                        </div>
                        <ul className="list-disc list-inside space-y-0.5 ml-2 text-xs md:text-sm text-gray-600">
                          {exp.bullets.map((bullet, bulletIdx) => (
                            <li key={bulletIdx}>{bullet}</li>
                          ))}
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
                  <div>
                    <h3 className="text-base md:text-lg font-semibold text-gray-800">
                      Brown University
                    </h3>
                    <p className="text-xs md:text-sm text-gray-600">
                      Interdisciplinary Studies, Sep 2010 - May 2012
                    </p>
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
                      <span className="font-semibold">Address:</span> San
                      Francisco, California
                    </p>
                    <p>
                      <span className="font-semibold">Phone:</span> (303)
                      902-9179
                    </p>
                    <p>
                      <span className="font-semibold">Email:</span>{" "}
                      ricktang@gmail.com
                    </p>
                  </div>
                </div>

                {/* Skills */}
                <div>
                  <h2 className="text-lg md:text-xl font-bold text-blue-900 mb-2">
                    Skills
                  </h2>
                  <div className="space-y-2 md:space-y-3">
                    {skills.map((skill, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="text-xs md:text-sm text-gray-700 font-medium">
                            {skill.name}
                          </span>
                        </div>
                        <Progress value={skill.proficiency} className="h-1.5" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Links */}
                <div>
                  <h2 className="text-lg md:text-xl font-bold text-blue-900 mb-2">
                    Links
                  </h2>
                  <div className="space-y-1">
                    <a
                      href="#"
                      className="text-xs md:text-sm text-blue-600 hover:text-blue-800 underline block"
                    >
                      LinkedIn
                    </a>
                    <a
                      href="#"
                      className="text-xs md:text-sm text-blue-600 hover:text-blue-800 underline block"
                    >
                      Dribbble
                    </a>
                    <a
                      href="#"
                      className="text-xs md:text-sm text-blue-600 hover:text-blue-800 underline block"
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
