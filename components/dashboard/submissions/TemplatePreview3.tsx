/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";
import { LiaLinkedin } from "react-icons/lia";
import { FaBehance, FaDribbble } from "react-icons/fa";
import image1 from "@/public/images/image 265.png";

interface TemplatePreview3Props {
  submissionInfo: any;
}

export default function TemplatePreview3({
  submissionInfo,
}: TemplatePreview3Props) {
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

  // Split full name into first and last
  const nameParts = (personalInfo?.fullName || "Your Name").split(" ");
  const firstName = nameParts[0] || "";
  const lastName = nameParts.slice(1).join(" ") || "";

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="w-[210mm] h-[297mm] bg-white grid grid-cols-12 shadow-lg rounded-xl overflow-hidden">
        {/* LEFT SIDEBAR */}
        <aside className="col-span-4 bg-[#E8EAEE] p-14">
          <h1 className="text-2xl font-bold text-[#5C6168] leading-tight">
            {firstName} <br /> {lastName}
          </h1>

          {/* TITLES */}
          <div className="mt-2 flex items-center gap-2">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">
                {personalInfo?.jobTitle?.toUpperCase() || "JOB TITLE"}
              </span>
            </div>
          </div>

          {/* LOCATION */}
          <div className="mt-4 flex items-center gap-1 text-sm text-gray-600">
            <MapPin size={14} />
            <span>{personalInfo?.city_and_state || "Location"}</span>
          </div>

          {/* EDUCATION */}
          <div className="mt-10">
            <h3 className="text-xs tracking-widest font-semibold text-gray-500 mb-4 border-b border-gray-300 pb-1">
              EDUCATION
            </h3>
            <div className="space-y-6 text-sm text-gray-600">
              {educations.map((edu: any, idx: number) => (
                <div key={idx}>
                  <p className="font-semibold">
                    {edu.degreeOrCertificate || "Degree"}
                  </p>
                  <p>{edu.institutionName || "Institution"}</p>
                  <p className="text-xs text-gray-500">
                    {edu.passingYear || "Year"}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* SKILLS */}
          <div className="mt-10">
            <h3 className="text-xs tracking-widest font-semibold text-gray-500 mb-4 border-b border-gray-300 pb-1">
              SKILLS
            </h3>
            <ul className="space-y-2 text-sm text-gray-600 list-disc list-inside">
              {skills.map((skill: any, i: number) => (
                <li key={i}>{skill.name}</li>
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
                <p>{personalInfo?.email || "email@example.com"}</p>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} />
                <p>{personalInfo?.phoneNumber || "Phone Number"}</p>
              </div>
              <div className="flex items-center gap-2">
                <LiaLinkedin size={16} />
                <p>LinkedIn Profile</p>
              </div>
              <div className="flex items-center gap-2">
                <FaBehance size={16} />
                <p>Behance Profile</p>
              </div>
              <div className="flex items-center gap-2">
                <FaDribbble size={16} />
                <p>Dribbble Profile</p>
              </div>
            </div>
          </div>

          {/* PROFILE */}
          <div>
            <h2 className="text-sm tracking-widest font-semibold text-gray-500 mb-3 border-b border-gray-300 pb-1">
              PROFILE
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              {personalInfo?.professionalSummary ||
                "Professional summary goes here."}
            </p>
          </div>

          {/* EXPERIENCE */}
          <div className="mt-8">
            <h2 className="text-sm tracking-widest font-semibold text-gray-500 mb-6 border-b border-gray-300 pb-1">
              EXPERIENCE
            </h2>
            <div className="space-y-6">
              {workExperiences.map((exp: any, i: number) => (
                <div key={i}>
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-gray-800">
                      {exp.jobTitle || "Job Title"}
                    </h3>
                    <span className="text-xs text-gray-500">
                      {formatDate(exp.startDate)} -{" "}
                      {exp.endDate ? formatDate(exp.endDate) : "present"}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">
                    {exp.companyName || "Company"}
                  </p>
                  <ul className="list-disc list-inside text-sm text-gray-600 mt-2 space-y-1">
                    {exp.achievements && <li>{exp.achievements}</li>}
                    {exp.responsibilities && <li>{exp.responsibilities}</li>}
                    {exp.location && <li>{exp.location}</li>}
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
