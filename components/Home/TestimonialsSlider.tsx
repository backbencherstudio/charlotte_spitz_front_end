"use client";

import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

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
    text: "The AI doesn't just generate content—it genuinely understands what recruiters and hiring managers are looking for in a candidate. It goes beyond surface-level suggestions by tailoring my resume, optimizing the tone and structure of my portfolio, and even helping me communicate my skills and experience more strategically. I was able to high...",
    name: "David K.",
    title: "Software engineer",
    avatar: "/images/david.jpg",
  },
  {
    id: 2,
    text: "The AI doesn't just generate content—it genuinely understands what recruiters and hiring managers are looking for in a candidate. It goes beyond surface-level suggestions by tailoring my resume, optimizing the tone and structure of my portfolio, and even helping me communicate my skills and experience more strategically. I was able to high...",
    name: "David K.",
    title: "Software engineer",
    avatar: "/images/david.jpg",
  },
  {
    id: 3,
    text: "The AI doesn't just generate content—it genuinely understands what recruiters and hiring managers are looking for in a candidate. It goes beyond surface-level suggestions by tailoring my resume, optimizing the tone and structure of my portfolio, and even helping me communicate my skills and experience more strategically. I was able to high...",
    name: "David K.",
    title: "Software engineer",
    avatar: "/images/david.jpg",
  },
  {
    id: 4,
    text: "The AI doesn't just generate content—it genuinely understands what recruiters and hiring managers are looking for in a candidate. It goes beyond surface-level suggestions by tailoring my resume, optimizing the tone and structure of my portfolio, and even helping me communicate my skills and experience more strategically. I was able to high...",
    name: "David K.",
    title: "Software engineer",
    avatar: "/images/david.jpg",
  },
  {
    id: 5,
    text: "The AI doesn't just generate content—it genuinely understands what recruiters and hiring managers are looking for in a candidate. It goes beyond surface-level suggestions by tailoring my resume, optimizing the tone and structure of my portfolio, and even helping me communicate my skills and experience more strategically. I was able to high...",
    name: "David K.",
    title: "Software engineer",
    avatar: "/images/david.jpg",
  },
  {
    id: 6,
    text: "The AI doesn't just generate content—it genuinely understands what recruiters and hiring managers are looking for in a candidate. It goes beyond surface-level suggestions by tailoring my resume, optimizing the tone and structure of my portfolio, and even helping me communicate my skills and experience more strategically. I was able to high...",
    name: "David K.",
    title: "Software engineer",
    avatar: "/images/david.jpg",
  },
];

export default function TestimonialsSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <section className="bg-white">
      <div className="container">
        <div className="py-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#333333]">
            What Our Users Say
          </h2>

          <div className="relative mb-12">
            <div className="hidden md:block overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{
                  transform: `translateX(-${currentIndex * (100 / 3)}%)`,
                }}
              >
                {testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="w-1/3 shrink-0 px-4">
                    <TestimonialCard testimonial={testimonial} />
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile/Tablet View - Smooth Sliding */}
            <div className="md:hidden overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{
                  transform: `translateX(-${currentIndex * 100}%)`,
                }}
              >
                {testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="w-full shrink-0">
                    <TestimonialCard testimonial={testimonial} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center items-center gap-4">
            <button
              onClick={goToPrevious}
              className="p-3 rounded-full bg-[#2563EB] text-white hover:bg-[#2563EB]/90 transition-colors duration-200 shadow-lg cursor-pointer"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={goToNext}
              className="p-3 rounded-full bg-[#2563EB] text-white hover:bg-[#2563EB]/90 transition-colors duration-200 shadow-lg cursor-pointer"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Indicator Dots - Mobile only */}
          <div className="md:hidden flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  index === currentIndex ? "bg-[#1E40AF] w-6" : "bg-slate-300"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
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

      {/* Testimonial Text */}
      <p className="text-[#4A4C56] text-sm md:text-base leading-relaxed mb-6">
        {testimonial.text}
      </p>

      {/* User Info */}
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
