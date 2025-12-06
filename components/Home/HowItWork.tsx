"use client";
import { CheckCircle } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MdArrowOutward } from "react-icons/md";
import Button from "../reusable/Button";
const HowItWorks = () => {
  const router = useRouter();
  const steps = [
    {
      id: 1,
      number: "01",
      title: "Complete Questionnaire",
      desc: "Upload your CV (PDF/DOCX/Text) and answer a few simple questions.",
      icon: (
        <Image
          src="/images/folderIcon.svg"
          className="w-8 h-8 text-[#5952FF]"
          alt="folder-icon"
          width={100}
          height={100}
        />
      ),
    },
    {
      id: 2,
      number: "02",
      title: "Make Payment",
      desc: "Complete the payment to proceed with AI-powered resume generation.",
      icon: (
        <Image
          src="/images/walletIcon.svg"
          className="w-8 h-8 text-[#5952FF]"
          alt="wallet-icon"
          width={100}
          height={100}
        />
      ),
    },
    {
      id: 3,
      number: "03",
      title: "Get Your Resume",
      desc: "Download your optimized, job-ready resume instantly.",
      icon: <CheckCircle className="w-8 h-8 text-[#5952FF]" />,
    },
  ];
  return (
    <section id="how-it-works" className="bg-[#F6F8FA]">
      <div className="container ">
        <div className="py-20">
          <h1 className="text-2xl md:text-4xl font-bold text-center mb-12 text-[#1D1F2C]">
            How it Works
          </h1>

          <div className="relative mb-16">
            {/* Dotted Line */}
            <div
              className="absolute top-5 left-[190px] right-[190px] h-px hidden md:block"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(to right, #5952FF 0px, #5952FF 8px, transparent 8px, transparent 16px)",
              }}
            />

            <div className="grid grid-cols-1 h-full md:grid-cols-3 gap-8 items-stretch">
              {steps.map((step) => (
                <div key={step.id} className="flex flex-col h-full items-center">
                  <div className="mb-8 flex  items-center justify-center w-10 h-10 rounded-full bg-white border-2 border-[#5952FF] z-10">
                    {step.number}
                  </div>
                  <div className="bg-white rounded-lg p-6 text-center shadow-sm border border-slate-100 w-full hover:border hover:border-[#5952FF] hover:scale-105  card-Shadow transition-all duration-200 flex-1 flex flex-col justify-start gap-">
                    <div className="flex justify-center items-center bg-[#F6F8FA] w-10 h-10 p-2 rounded-md mx-auto mb-2">
                      {step.icon}
                    </div>
                    <h3 className="text-xl font-bold text-black mb-1">{step.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <div className="flex justify-center">
            <Button
              onClick={() => router.push("/personal-info")}
              icon={
                <MdArrowOutward className="w-5 h-5 transition-transform duration-200" />
              }
            >
              Create a Resume
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
