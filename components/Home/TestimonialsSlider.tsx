/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Star } from "lucide-react";
import Image from "next/image";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
// Import Swiper CSS
import { useRef } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface Testimonial {
  id: number;
  text: string;
  name: string;
  title: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    text: "\u201CI was honestly shocked at how good this came out.\u201D\nI've paid for resume services before and they were… fine. CVdigger was different. It didn't just rewrite my resume — it reframed my experience in a way that actually made sense to recruiters. I started getting callbacks within a week.",
    name: "Sarah M.",
    title: "Operations Manager",
    avatar: "/images/david.jpg",
  },
  {
    id: 2,
    text: "\u201CFast, clean, and actually tailored.\u201D\nI needed a resume fast and didn't expect much going in. The turnaround was quick, the layout was clean, and the wording sounded like me — just better. Worth every dollar.",
    name: "Josh L.",
    title: "Sales Associate",
    avatar: "/images/david.jpg",
  },
  {
    id: 3,
    text: "\u201CPerfect for first-time job seekers.\u201D\nThis was my first real resume and I had no idea what to include. CVdigger made it simple and asked the right questions. I feel way more confident applying now.",
    name: "Emily R.",
    title: "College Student",
    avatar: "/images/david.jpg",
  },
  {
    id: 4,
    text: "\u201CHelped me switch industries.\u201D\nI was changing careers and didn't know how to translate my experience. CVdigger did an amazing job connecting the dots and making my background relevant.",
    name: "Rachel S.",
    title: "Career Switcher",
    avatar: "/images/david.jpg",
  },
  {
    id: 5,
    text: "\u201CThe formatting alone was a huge upgrade.\u201D\nEven before reading the content, the resume looked professional. Clean, modern, and recruiter-friendly. The content matched it perfectly.",
    name: "Daniel P.",
    title: "Finance Analyst",
    avatar: "/images/david.jpg",
  },
  {
    id: 6,
    text: "\u201CSimple process, great results.\u201D\nThe form was easy, the communication was clear, and the final resume was polished and strong. I'd definitely recommend this to anyone job hunting.",
    name: "Leah B.",
    title: "Marketing Assistant",
    avatar: "/images/david.jpg",
  },
];

export default function TestimonialsSlider() {
  const swiperRef = useRef<any>(null);
  return (
    <section id="testimonials" className="bg-white">
      <div className="container">
        <div className="py-20">
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-12 text-[#333333]">
            What Our Users Say
          </h2>

          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            loop={true}
            speed={1000}
            autoplay={{
              delay: 300000,
              disableOnInteraction: false,
            }}
            navigation
            pagination={false}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            className="pb-10"
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id} className="h-auto">
                <TestimonialCard testimonial={testimonial} />
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="flex justify-center gap-6 mt-8">
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className="w-10 h-10 rounded-full bg-gray-200 text-primaryColor hover:text-white flex items-center justify-center shadow hover:bg-[#2563EB]/90 transition-all duration-200 hover:scale-105 card-Shadow cursor-pointer"
            >
              <FaArrowLeft className="w-5 h-5 " />
            </button>

            <button
              onClick={() => swiperRef.current?.slideNext()}
              className="w-10 h-10 rounded-full bg-gray-200 text-primaryColor hover:text-white flex items-center justify-center shadow hover:bg-[#2563EB]/90 transition-all duration-200 hover:scale-105 card-Shadow cursor-pointer"
            >
              <FaArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

interface TestimonialCardProps {
  testimonial: Testimonial;
}

function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="p-4 bg-[#F6F8FA] rounded-md h-[300px] flex flex-col">
      <div className="flex gap-1 mb-4 shrink-0">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className="w-4 h-4 md:w-5 md:h-5 fill-[#FFB112] text-[#FFB112]"
          />
        ))}
      </div>

      <p className="text-[#4A4C56] text-sm md:text-base leading-relaxed mb-6 flex-1 overflow-y-auto">
        {testimonial.text}
      </p>

      <div className="flex items-center justify-between shrink-0">
        <div>
          <p className="font-semibold text-[#333333] text-sm md:text-base">
            {testimonial.name}
          </p>
          <p className="text-[#4A4C56] text-xs md:text-sm mt-2">
            {testimonial.title}
          </p>
        </div>
        <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden shrink-0">
          <Image
            src={testimonial.avatar || "/placeholder.svg"}
            alt={testimonial.name}
            fill
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}
