'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { MdArrowOutward } from 'react-icons/md';
import { PiClockCountdown } from 'react-icons/pi';
import Button from '../reusable/Button';
import { ATSDashboard } from './ATSDashboard';
import { ATSScoreCard } from './ATSScoreCard';
import { ResumePreview } from './ResumePreview';
const sampleResumeData = {
  name: 'John Smith',
  email: 'john.smith@example.com',
  phone: '(555) 123-0567',
  location: 'New York, NY',
  summary: `Experienced software engineer with over 8 years of expertise in developing
scalable web applications and leading development teams. Proficient in JavaScript,React, and Node.js, with a proven track record of delivering high-quality code that meets both technical and business requirements.`,
  experience: [
    {
      id: '1',
      position: 'Senior Software Engineer',
      company: 'TechCorp',
      date: '2022 - Present',
      location: 'New York, NY',
      achievements: [
        'Led the development of a customer-facing portal that increased user engagement ',
        'Architected and implemented RESTful APIs serving 1M+ daily requests',
      ],
    },
    {
      id: '2',
      position: 'Software Engineer',
      company: 'SoftCorp',
      date: '2017 - 2020',
      location: 'Boston, MA',
      achievements: [
        'Led the development of a customer-facing portal that increased user engagement ',
        'Architected and implemented RESTful APIs serving 1M+ daily requests',
      ],
    },
  ],
  education: [
    {
      id: '1',
      degree: 'Bachelor of Science in Computer Science',
      school: 'Massachusetts Institute of Technology',
      date: '2017',
    },
  ],
  skills: {
    languages: ['JavaScript', 'TypeScript', 'Python', 'Java'],
    frameworks: ['React', 'Node.js', 'Express', 'Next.js'],
    tools: ['Git', 'Docker', 'AWS', 'PostgreSQL', 'MongoDB'],
  },
};

const HeroSection = () => {
  const router = useRouter();
  return (
    <section className="relative">
      <div className="absolute bottom-0 right-0 min-[1024px]:max-w-[300px] min-[768px]:max-w-[450px] min-[1280px]:max-w-[500px] min-[1600px]:max-w-[600px] w-full h-[550px] z-0 bg-primaryColor" />
      <div className="py-10">
        <div className="container grid grid-cols-1 gap-6 lg:gap-0 lg:grid-cols-11 h-full items-center  ">
          <div className="lg:col-span-6 md:mr-10">
            <div className="mb-2">
              {/* <div className="inline-flex items-center gap-2 bg-[#EEEEFF]  px-4 py-2 rounded-full">
                <div className="w-2 h-2 bg-[#908BFF] rounded-full"></div>
                <span className="text-sm font-medium text-[#4A4C56]">
                  Your first CV is 100% free no card need
                </span>
              </div> */}
            </div>

            <div>
              <h1 className="md:text-[56px] text-3xl font-bold text-black leading-[120%] mb-4">
                Your Next Job Starts in the{' '}
                <span className=" text-[#2920FE]">Dirt You Dig.</span>
              </h1>
            </div>

            {/* Subheading */}
            {/* <p className="text-base md:text-lg text-[#4A4C56] md:mr-10 lg:mr-30">
              Turn one resume into a fleet of AI-perfected CVs—each tuned to a{' '}
              different job description with a single click.
            </p> */}

            {/* Stats */}
            <div className="flex items-center my-8 gap-x-4">
              {/* <div className="flex items-start gap-3">
                <div className="bg-[#FFFFFF] h-10 w-10 flex items-center justify-center rounded-md border border-gray-200">
                  <Image
                    src="/images/fileTextIcon.svg"
                    alt="CV Icon"
                    width={100}
                    height={100}
                    className="h-6 w-6"
                  />
                </div>
                <div>
                  <div className="text-xl font-bold text-[#07080B]">20,000</div>
                  <div className="text-sm text-descriptionColor">
                    CVs Optimized
                  </div>
                </div>
              </div> */}
              <div className="flex items-start gap-3">
                <div className="bg-[#FFFFFF] h-10 w-10 flex items-center justify-center rounded-md border border-gray-200">
                  <PiClockCountdown className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xl font-bold text-[#07080B]">2 min</div>
                  <div className="text-sm text-descriptionColor">
                    its only takes 2 min
                  </div>
                </div>
              </div>
            </div>
            <Button
              onClick={() => router.push('/personal-info')}
              icon={
                <MdArrowOutward className="w-5 h-5 transition-transform duration-200" />
              }
            >
              Create a Resume
            </Button>
          </div>

          <div className="lg:col-span-5 relative ">
            <div className="w-full hero-Shadow2 rounded-lg border border-gray-100 bg-white  shadow-lg  p-3">
              <ResumePreview data={sampleResumeData} />
            </div>
            <div className=" absolute top-0 -right-3.5 min-[1024px]:-right-3 min-[1400px]:-right-16 min-[1600px]:-right-[200px] h-full ">
              <div className="h-full flex flex-col justify-center md:justify-between gap-4">
                <ATSScoreCard
                  score={75}
                  status="Great match"
                  subtitle="Your application ranking"
                />
                <div>
                  <ATSDashboard />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
