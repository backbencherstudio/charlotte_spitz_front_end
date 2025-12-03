import { ArrowRight, Clock, FileText } from "lucide-react";
import { ATSDashboard } from "./ATSDashboard";
import { ATSScoreCard } from "./ATSScoreCard";
import { ResumePreview } from "./ResumePreview";

const sampleResumeData = {
  name: "John Smith",
  email: "john.smith@example.com",
  phone: "(555) 123-0567",
  location: "New York, NY",
  summary:
    "Experienced software engineer with over 8 years of expertise in developing scalable web applications using modern frameworks. Proficient in React, Node.js, with a proven track record of delivering high-quality code that meets both technical and business requirements.",
  experience: [
    {
      id: "1",
      position: "Senior Software Engineer",
      company: "TechCorp",
      date: "2022 - Present",
      location: "New York, NY",
      achievements: [
        "Led the development of a customer-facing portal that increased user engagement by 40%",
        "Architected and implemented RESTful APIs serving 1M+ daily requests",
      ],
    },
    {
      id: "2",
      position: "Software Engineer",
      company: "SoftCorp",
      date: "2017 - 2020",
      location: "Boston, MA",
      achievements: [
        "Led the development of a customer-facing portal that increased user engagement by 40%",
        "Architected and implemented RESTful APIs serving 1M+ daily requests",
      ],
    },
  ],
  education: [
    {
      id: "1",
      degree: "Bachelor of Science in Computer Science",
      school: "Massachusetts Institute of Technology",
      date: "2017",
      details: "GPA: 3.8",
    },
  ],
  skills: {
    languages: ["JavaScript", "TypeScript", "Python", "Java"],
    frameworks: ["React", "Node.js", "Express", "Next.js"],
    tools: ["Git", "Docker", "AWS", "PostgreSQL", "MongoDB"],
  },
};

const HeroSection = () => {
  return (
    <section className="relative">
      <div className="absolute top-10 right-0 w-[450px] h-[600px] bg-blue-500" />
      <div className="py-10">
        <div className="container grid grid-cols-3">
          <div className="col-span-2">
            <div className="mb-2">
              <div className="inline-flex items-center gap-2 bg-[#EEEEFF] px-4 py-2 rounded-full">
                <div className="w-2 h-2 bg-[#908BFF] rounded-full"></div>
                <span className="text-sm font-medium text-[#4A4C56]">
                  Your first CV is 100% free no card need
                </span>
              </div>
            </div>

            <div>
              <h1 className="text-4xl font-bold text-black leading-[160%] mb-4">
                Your Next Job Starts in <br />
                <span className="text-4xl font-bold text-[#2920FE]">
                  the Dirt You Dig.
                </span>
              </h1>
            </div>

            {/* Subheading */}
            <p className="text-lg text-[#4A4C56]">
              Turn one resume into a fleet of AI-perfected CVs—each tuned to a{" "}
              <br />
              different job description with a single click.
            </p>

            {/* Stats */}
            <div className="flex items-center my-8 gap-x-4">
              <div className="flex items-start gap-3">
                <div className="bg-[#FFFFFF] h-10 w-10 flex items-center justify-center rounded-md border border-gray-200">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xl font-bold text-[#07080B]">20,000</div>
                  <div className="text-sm text-[#777980]">CVs Optimized</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-[#FFFFFF] h-10 w-10 flex items-center justify-center rounded-md border border-gray-200">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xl font-bold text-[#07080B]">2 min</div>
                  <div className="text-sm text-[#777980]">
                    its only takes 2 min
                  </div>
                </div>
              </div>
            </div>

            <button className="inline-flex items-center gap-2 bg-[#5952FF] hover:bg-[#5952FF]/90 text-white font-semibold px-8 py-4 rounded-full transition-colors duration-200 text-lg cursor-pointer">
              Create a Resume
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          <div className="col-span-1 relative">
            <div className="w-full">
              <ResumePreview data={sampleResumeData} />
            </div>
            <div className="">
              <ATSScoreCard
                score={75}
                status="Great match"
                subtitle="Your application ranking"
              />
            </div>
            <div>
              <ATSDashboard />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
