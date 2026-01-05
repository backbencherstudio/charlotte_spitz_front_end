"use client";

import Image from "next/image";
import { Progress } from "@/components/ui/progress";
import image1 from "@/public/images/image 265.png";

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

export default function Preview2() {
  const experiences: ExperienceItem[] = [
    {
      company: "Uber",
      position: "Product Designer",
      period: "Mar 2015 – Present",
      bullets: [
        "Designed safety-focused experiences for Riders and Drivers",
        "Physical space problem solving and its interaction with the digital interface",
        "Navigated organization to achieve operational improvements",
      ],
    },
    {
      company: "IFTTT",
      position: "Product Designer",
      period: "Dec 2013 – Mar 2015",
      bullets: [
        "Product and system design for a complex product",
        "Collaborated with researchers and developers for IFTTT",
        "Responsible for maintaining design across iOS, Android, and web",
      ],
    },
    {
      company: "Facebook",
      position: "Product Designer",
      period: "Jun 2013 – Sep 2013",
      bullets: [
        "Designed and prototyped internal tools",
        "Partnered with teams to build assets and features",
        "Authored custom mobile UX solutions",
      ],
    },
    {
      company: "Google Maps",
      position: "UX/UI Design Intern",
      period: "Jun 2012 – Sep 2012",
      bullets: [
        "Wireframes and UX for Maps on iOS",
        "Onboarding experience design",
        "Feature assets for Android",
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
    <main className="min-h-screen bg-gray-200 flex items-center justify-center p-6">
      <div className="w-full max-w-[900px] bg-white rounded-xl shadow-lg overflow-hidden grid grid-cols-12">
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
            <h2 className="text-lg font-semibold">Rick Tang</h2>
            <p className="text-sm text-gray-300">Product Designer</p>
          </div>

          {/* DETAILS */}
          <div className="mt-8">
            <h3 className="text-xs uppercase tracking-wider mb-3">Details</h3>
            <p className="text-sm text-gray-300">San Francisco, California</p>
            <p className="text-sm text-gray-300 mt-1">(303) 902-9179</p>
            <p className="text-sm text-gray-300 mt-1">ricktang@gmail.com</p>
          </div>

          {/* LINKS */}
          <div className="mt-8">
            <h3 className="text-xs uppercase tracking-wider mb-3">Links</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>LinkedIn</li>
              <li>Dribbble</li>
              <li>Behance</li>
            </ul>
          </div>

          {/* Skills */}
          <div className="mt-8">
            <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
              Skills
            </h2>
            <div className="space-y-3 sm:space-y-4">
              {skills.map((skill, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm sm:text-base font-medium">
                      {skill.name}
                    </span>
                  </div>
                  <Progress value={skill.proficiency} className="h-2 " />
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
              {
                "I'm a product designer focused on creating great user experiences and meeting business needs. I enjoy solving problems and collaborating with cross-functional teams."
              }
            </p>
          </div>

          {/* EXPERIENCE */}
          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-4">Experience</h2>

            <div className="space-y-6">
              {experiences.map((exp, i) => (
                <div key={i}>
                  <h3 className="font-semibold">{exp.company}</h3>
                  <p className="text-sm text-gray-600">{exp.position}</p>
                  <p className="text-xs text-gray-400 mb-2">{exp.period}</p>
                  <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                    {exp.bullets.map((b, j) => (
                      <li key={j}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* EDUCATION */}
          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-3">Education</h2>
            <p className="font-medium text-sm">Brown University</p>
            <p className="text-sm text-gray-500">
              Interaction Design · Sep 2010 – May 2013
            </p>
          </div>

          {/* LANGUAGES */}
          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-3">Languages</h2>
            <p className="text-sm text-gray-600">English, Italian</p>
          </div>
        </section>
      </div>
    </main>
  );
}
