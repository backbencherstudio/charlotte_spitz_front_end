/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import Image from "next/image";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

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
    text: "The AI doesn’t just generate content—it genuinely understands what recruiters and hiring managers are looking for in a candidate. It goes beyond surface-level suggestions by tailoring my resume, optimizing the tone and structure of my portfolio, and even helping me communicate my skills and experience more strategically. I was able to highlight what truly matters for the roles I’m applying to, and it made my entire job search process feel more focused, confident, and aligned with industry expectations.",
    name: "David K.",
    title: "Software engineer",
    avatar: "/images/david.jpg",
  },
  {
    id: 2,
    text: "The AI doesn’t just generate content—it genuinely understands what recruiters and hiring managers are looking for in a candidate. It goes beyond surface-level suggestions by tailoring my resume, optimizing the tone and structure of my portfolio, and even helping me communicate my skills and experience more strategically. I was able to highlight what truly matters for the roles I’m applying to, and it made my entire job search process feel more focused, confident, and aligned with industry expectations.",
    name: "David K.",
    title: "Software engineer",
    avatar: "/images/david.jpg",
  },
  {
    id: 3,
    text: "The AI doesn’t just generate content—it genuinely understands what recruiters and hiring managers are looking for in a candidate. It goes beyond surface-level suggestions by tailoring my resume, optimizing the tone and structure of my portfolio, and even helping me communicate my skills and experience more strategically. I was able to highlight what truly matters for the roles I’m applying to, and it made my entire job search process feel more focused, confident, and aligned with industry expectations.",
    name: "David K.",
    title: "Software engineer",
    avatar: "/images/david.jpg",
  },
  {
    id: 4,
    text: "The AI doesn’t just generate content—it genuinely understands what recruiters and hiring managers are looking for in a candidate. It goes beyond surface-level suggestions by tailoring my resume, optimizing the tone and structure of my portfolio, and even helping me communicate my skills and experience more strategically. I was able to highlight what truly matters for the roles I’m applying to, and it made my entire job search process feel more focused, confident, and aligned with industry expectations.",
    name: "David K.",
    title: "Software engineer",
    avatar: "/images/david.jpg",
  },
  {
    id: 5,
    text: "The AI doesn’t just generate content—it genuinely understands what recruiters and hiring managers are looking for in a candidate. It goes beyond surface-level suggestions by tailoring my resume, optimizing the tone and structure of my portfolio, and even helping me communicate my skills and experience more strategically. I was able to highlight what truly matters for the roles I’m applying to, and it made my entire job search process feel more focused, confident, and aligned with industry expectations.",
    name: "David K.",
    title: "Software engineer",
    avatar: "/images/david.jpg",
  },
  {
    id: 6,
    text: "The AI doesn’t just generate content—it genuinely understands what recruiters and hiring managers are looking for in a candidate. It goes beyond surface-level suggestions by tailoring my resume, optimizing the tone and structure of my portfolio, and even helping me communicate my skills and experience more strategically. I was able to highlight what truly matters for the roles I’m applying to, and it made my entire job search process feel more focused, confident, and aligned with industry expectations.",
    name: "David K.",
    title: "Software engineer",
    avatar: "/images/david.jpg",
  },
  {
    id: 7,
    text: "The AI doesn’t just generate content—it genuinely understands what recruiters and hiring managers are looking for in a candidate. It goes beyond surface-level suggestions by tailoring my resume, optimizing the tone and structure of my portfolio, and even helping me communicate my skills and experience more strategically. I was able to highlight what truly matters for the roles I’m applying to, and it made my entire job search process feel more focused, confident, and aligned with industry expectations.",
    name: "David K.",
    title: "Software engineer",
    avatar: "/images/david.jpg",
  },
  {
    id: 8,
    text: "The AI doesn’t just generate content—it genuinely understands what recruiters and hiring managers are looking for in a candidate. It goes beyond surface-level suggestions by tailoring my resume, optimizing the tone and structure of my portfolio, and even helping me communicate my skills and experience more strategically. I was able to highlight what truly matters for the roles I’m applying to, and it made my entire job search process feel more focused, confident, and aligned with industry expectations.",
    name: "David K.",
    title: "Software engineer",
    avatar: "/images/david.jpg",
  },
];

export default function TestimonialsSlider() {
  const swiperRef = useRef<any>(null);
  return (
    <section className="bg-white">
      <div className="container">
        <div className="py-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#333333]">
            What Our Users Say
          </h2>

          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={20}
            slidesPerView={1}
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
              <SwiperSlide key={testimonial.id}>
                <TestimonialCard testimonial={testimonial} />
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="flex justify-center gap-6 mt-8">
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className="w-10 h-10 rounded-full bg-[#2563EB] text-white flex items-center justify-center shadow hover:bg-[#2563EB]/90 cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={() => swiperRef.current?.slideNext()}
              className="w-10 h-10 rounded-full bg-[#2563EB] text-white flex items-center justify-center shadow hover:bg-[#2563EB]/90 cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
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
    <div className="p-4 bg-[#F6F8FA] rounded-md">
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className="w-4 h-4 md:w-5 md:h-5 fill-[#FFB112] text-[#FFB112]"
          />
        ))}
      </div>

      <p className="text-[#4A4C56] text-sm md:text-base leading-relaxed mb-6">
        {testimonial.text}
      </p>

      <div className="flex items-center justify-between">
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
