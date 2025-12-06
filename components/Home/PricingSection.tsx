"use client";
import { Check, Crown, Rocket } from "lucide-react";
import { useRouter } from "next/navigation";
import { MdArrowOutward } from "react-icons/md";
import Button from "../reusable/Button";

export default function PricingSection() {
  const router = useRouter();
  const plans = [
    {
      name: "Basic Package",
      price: "$3",
      period: "One Time",
      icon: <Rocket />,
      features: [
        "1 CV optimization",
        "Basic ATS score",
        "Standard templates",
        "Email support",
      ],
      buttonText: "Choose Starter",
      featured: false,
    },
    {
      name: "Premium Package",
      price: "$19",
      period: "One Time",
      icon: <Crown />,
      features: [
        "Unlimited tailor credits",
        "Up to 10 PDF downloads",
        "1 Page Fit (Coming soon)",
        "AI Bullet Rewrite (Coming Soon)",
      ],
      buttonText: "Choose Pro",
      featured: true,
    },
  ];

  return (
    <section id="pricing" className="bg-[#F6F8FA]">
      <div className=" container">
        <div className="py-20">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-bold text-[#1D1F2C] mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-[#4A4C56] text-lg">
              Choose the plan that works best for you
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-12">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`rounded-2xl p-8 sm:p-10 transition-all duration-300 card-Shadow border hover:border hover:border-[#5952FF]`}
              >
                {/* Plan Name */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">{plan.icon}</span>
                  <h3 className="text-xl font-bold text-[#4A4C56]">
                    {plan.name}
                  </h3>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-[#5952FF]">
                      {plan.price}
                    </span>
                    <span className="text-[#A5A5AB]">/{plan.period}</span>
                  </div>
                </div>

                {/* Features List */}
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-start gap-3 text-[#4A4C56]"
                    >
                      <Check className="w-5 h-5 text-[#5952FF] shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Button */}
                <Button
                  icon={
                    <MdArrowOutward className="w-5 h-5 transition-transform duration-200" />
                  }
                  className="w-full items-center justify-center"
                  onClick={() => router.push("/payment")}
                >
                  {plan.buttonText}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
