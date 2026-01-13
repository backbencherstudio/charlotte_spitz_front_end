"use client";

import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";
import { LiaLinkedin } from "react-icons/lia";
import { FaBehance, FaDribbble } from "react-icons/fa";
import image1 from "@/public/images/image 265.png";

interface ExperienceItem {
  title: string;
  company: string;
  period: string;
  description: string;
  bullets: string[];
}

export default function Preview3() {
  const experiences: ExperienceItem[] = [
    {
      title: "Job position",
      company: "Company, Country",
      period: "2021 – present",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      bullets: [
        "Unique experience highlight",
        "Unique experience highlight",
        "Unique experience highlight",
      ],
    },
    {
      title: "Job position",
      company: "Company, Country",
      period: "2021 – present",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      bullets: [
        "Unique experience highlight",
        "Unique experience highlight",
        "Unique experience highlight",
      ],
    },
    {
      title: "Job position",
      company: "Company, Country",
      period: "2021 – present",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      bullets: ["Unique experience highlight"],
    },
  ];

  const skills = [
    "User experience",
    "User interface",
    "App design",
    "Adaptive web design",
    "Product design",
    "Design system",
    "CSS",
    "AB testing",
    "User research",
  ];

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="w-[210mm] h-[297mm] bg-white grid grid-cols-12 shadow-lg rounded-xl overflow-hidden">
        {/* LEFT SIDEBAR */}
        <aside className="col-span-4 bg-[#E8EAEE] p-14">
          <h1 className="text-2xl font-bold text-[#5C6168] leading-tight">
            Robyn <br /> Kingsley
          </h1>

          {/* TITLES WITH ORANGE ACCENT */}
          <div className="mt-2 flex items-center gap-2">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">UX/UI DESIGNER</span>
              {/* <div className="w-2 h-3 bg-orange-500"></div> */}
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-1">PRODUCT DESIGNER</p>
          <p className="text-sm text-gray-600">UX RESEARCHER</p>

          {/* LOCATION */}
          <div className="mt-4 flex items-center gap-1 text-sm text-gray-600">
            <MapPin size={14} />
            <span>Berlin, Germany</span>
          </div>

          {/* EDUCATION */}
          <div className="mt-10">
            <h3 className="text-xs tracking-widest font-semibold text-gray-500 mb-4 border-b border-gray-300 pb-1">
              EDUCATION
            </h3>

            <div className="space-y-6 text-sm text-gray-600">
              <div>
                <p className="font-semibold">Course</p>
                <p>University</p>
                <p className="text-xs text-gray-500">2016 – 2018</p>
                <p className="mt-1 text-xs">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </div>

              <div>
                <p className="font-semibold">Course</p>
                <p>University</p>
                <p className="text-xs text-gray-500">2010 – 2014</p>
                <p className="mt-1 text-xs">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </div>
            </div>
          </div>

          {/* SKILLS */}
          <div className="mt-10">
            <h3 className="text-xs tracking-widest font-semibold text-gray-500 mb-4 border-b border-gray-300 pb-1">
              SKILLS
            </h3>
            <ul className="space-y-2 text-sm text-gray-600 list-disc list-inside">
              {skills.map((skill, i) => (
                <li key={i}>{skill}</li>
              ))}
            </ul>
          </div>
        </aside>

        {/* RIGHT CONTENT */}
        <section className="col-span-8 p-14">
          {/* HEADER */}
          <div className="flex items-start gap-6 mb-8">
            <Image
              src={image1}
              alt="profile"
              width={110}
              height={110}
              className="rounded-full"
            />
            <div className="text-sm text-gray-600 space-y-2">
              <div className="flex items-center gap-2">
                <Mail size={16} />
                <p>hi.robyn.kingsley@mail.com</p>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} />
                <p>+88 533 000 250</p>
              </div>
              <div className="flex items-center gap-2">
                <LiaLinkedin size={16} />
                <p>www.linkedin.com/in/robynkingsley</p>
              </div>
              <div className="flex items-center gap-2">
                <FaBehance size={16} />
                <p>www.behance.net/robynkingsley</p>
              </div>
              <div className="flex items-center gap-2">
                <FaDribbble size={16} />
                <p>dribbble.com/robyn_kingsley</p>
              </div>
            </div>
          </div>

          {/* PROFILE */}
          <div>
            <h2 className="text-sm tracking-widest font-semibold text-gray-500 mb-3 border-b border-gray-300 pb-1">
              PROFILE
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Risus
              commodo viverra maecenas accumsan lacus.
            </p>
          </div>

          {/* EXPERIENCE */}
          <div className="mt-8">
            <h2 className="text-sm tracking-widest font-semibold text-gray-500 mb-6 border-b border-gray-300 pb-1">
              EXPERIENCE
            </h2>

            <div className="space-y-6">
              {experiences.map((exp, i) => (
                <div key={i}>
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-gray-800">{exp.title}</h3>
                    <span className="text-xs text-gray-500">{exp.period}</span>
                  </div>
                  <p className="text-xs text-gray-500">{exp.company}</p>
                  <p className="text-sm text-gray-600 mt-2">
                    {exp.description}
                  </p>
                  <ul className="list-disc list-inside text-sm text-gray-600 mt-2 space-y-1">
                    {exp.bullets.map((b, j) => (
                      <li key={j}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
