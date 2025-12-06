import { ArrowRight, CheckCircle, Folder, Wallet } from "lucide-react";
const HowItWorks = () => {
  return (
    <section className="bg-[#F6F8FA]">
      <div className="container ">
        <div className="py-20">
          <h1 className="text-4xl font-bold text-center mb-12 text-[#1D1F2C]">
            How it Works
          </h1>

          <div className="relative mb-16">
            {/* Dotted Line */}
            <div
              className="absolute top-5 left-[190px] right-[190px] h-px hidden md:block"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(to right, rgb(203, 213, 225) 0px, rgb(203, 213, 225) 8px, transparent 8px, transparent 16px)",
              }}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <div className="flex flex-col items-center">
                <div className="mb-8 flex items-center justify-center w-10 h-10 rounded-full bg-white border-2 border-[#5952FF] z-10">
                  01
                </div>
                <div className="bg-white rounded-lg p-6 text-center shadow-sm border border-slate-100 w-full">
                  <div className="flex justify-center items-center bg-[#F6F8FA] w-10 h-10 p-2 rounded-md mx-auto mb-4">
                    <Folder className="w-8 h-8 text-[#5952FF]" />
                  </div>
                  <h3 className="text-xl font-bold text-black mb-3">
                    Complete Questionnaire
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Upload your CV (PDF/DOCX/Text) and answer a few simple
                    questions.
                  </p>
                </div>
              </div>

              {/* Step 2 - Highlighted */}
              <div className="flex flex-col items-center">
                <div className="mb-8 flex items-center justify-center w-10 h-10 rounded-full bg-white border-2 border-[#5952FF] z-10">
                  02
                </div>
                <div className="bg-white rounded-lg p-6 text-center shadow-sm border border-slate-100 w-full">
                  <div className="flex justify-center items-center bg-[#F6F8FA] w-10 h-10 p-2 rounded-md mx-auto mb-4">
                    <Wallet className="w-8 h-8 text-[#5952FF]" />
                  </div>
                  <h3 className="text-xl font-bold text-black mb-3">
                    Make Payment
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Complete the payment to proceed with AI-powered resume
                    generation.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center">
                <div className="mb-8 flex items-center justify-center w-10 h-10 rounded-full bg-white border-2 border-[#5952FF] z-10">
                  03
                </div>
                <div className="bg-white rounded-lg p-6 text-center shadow-sm border border-slate-100 w-full">
                  <div className="flex justify-center items-center bg-[#F6F8FA] w-10 h-10 p-2 rounded-md mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-[#5952FF]" />
                  </div>
                  <h3 className="text-xl font-bold text-black mb-3">
                    Get Your Resume
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Download your optimized, job-ready resume instantly.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="flex justify-center">
            <button className="bg-[#5952FF] hover:bg-[#4B47D6]/90 text-white font-semibold py-3 px-8 rounded-full flex items-center gap-2 transition-colors duration-200 shadow-lg cursor-pointer">
              Create a Resume
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
