"use client";

import React from "react";
import { Progress } from "@/components/ui/progress";

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
    <div className="bg-gray-100 relative">
      {/* Main content container */}
      <div className="relative mx-auto p-6">
        <div
          className="rounded-lg shadow-lg p-12  gap-8 object-cover bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url(/images/11.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="mb-12 lg:w-1/2 space-y-4">
            {/* Name and Title */}
            <div>
              <h1 className="text-5xl font-bold text-blue-900 mb-2">
                Rick Tang
              </h1>
              <p className="text-xl text-blue-900 font-bold">
                Product Designer
              </p>
            </div>

            {/* About Me */}
            <div>
              <p className="text-gray-600 leading-relaxed">
                I&apos;m a UI/UX specialist focused on designing clean and
                functional projects across all platforms and devices in response
                to specific briefs and problems, while always maintaining a
                unique look and feel.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-12">
            {/* Left Column - Main Content */}
            <div className="col-span-12 lg:col-span-8 space-y-8">
              {/* Experience */}
              <div>
                <h2 className="text-2xl font-bold text-blue-900 mb-6">
                  Experience
                </h2>
                <div className="space-y-6">
                  {experiences.map((exp, idx) => (
                    <div key={idx} className="space-y-2">
                      <div className="">
                        <div>
                          <h3 className="text-xl font-bold text-gray-800">
                            {exp.company}
                          </h3>
                          <p className="text-lg">{exp.position}</p>
                        </div>
                        <p className="text-gray-500 text-sm">{exp.period}</p>
                      </div>
                      <ul className="list-disc list-inside space-y-1 ml-4 text-gray-600">
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
                <h2 className="text-2xl font-bold text-blue-900 mb-3">
                  Education
                </h2>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    Brown University
                  </h3>
                  <p className="text-gray-600">
                    Interdisciplinary Studies, Sep 2010 - May 2012
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column - Sidebar */}
            <div className="col-span-12 lg:col-span-4 space-y-8">
              {/* Details */}
              <div>
                <h2 className="text-2xl font-bold text-blue-900 mb-4">
                  Details
                </h2>
                <div className="space-y-2 text-gray-600">
                  <p>
                    <span className="font-semibold">Address:</span> San
                    Francisco, California
                  </p>
                  <p>
                    <span className="font-semibold">Phone:</span> (303) 902-9179
                  </p>
                  <p>
                    <span className="font-semibold">Email:</span>{" "}
                    ricktang@gmail.com
                  </p>
                </div>
              </div>

              {/* Skills */}
              <div>
                <h2 className="text-2xl font-bold text-blue-900 mb-4">
                  Skills
                </h2>
                <div className="space-y-4">
                  {skills.map((skill, idx) => (
                    <div key={idx} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700 font-medium">
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
                <h2 className="text-2xl font-bold text-blue-900 mb-4">Links</h2>
                <div className="space-y-2">
                  <a
                    href="#"
                    className="text-blue-600 hover:text-blue-800 underline block"
                  >
                    LinkedIn
                  </a>
                  <a
                    href="#"
                    className="text-blue-600 hover:text-blue-800 underline block"
                  >
                    Dribbble
                  </a>
                  <a
                    href="#"
                    className="text-blue-600 hover:text-blue-800 underline block"
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
  );
}
