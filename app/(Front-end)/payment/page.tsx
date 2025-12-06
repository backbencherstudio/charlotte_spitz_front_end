import { ArrowRight, Check, Crown, Rocket } from "lucide-react";
import Link from "next/link";

const plans = [
  {
    name: "Basic Package",
    link: "/success",
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
    link: "/success",
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

const Payment = () => {
  return (
    <section className="py-15 md:py-20">
      <div className="container">
        <div className="text-center mb-12">
          <h1 className="text-2xl md:text-4xl text-[#070707] font-bold text-center">
            Choose Your Package
          </h1>
          <p className="text-[#070707] text-base">
            Select the format that works best for you
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-12">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`rounded-2xl p-8 sm:p-10 transition-all duration-300 ${
                plan.featured
                  ? "bg-white border-2 border-[#5952FF] shadow-xl"
                  : "bg-white border border-slate-200 shadow-lg"
              }`}
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
              <Link
                href={plan.link}
                className={`flex items-center gap-2 bg-primaryColor text-white font-semibold px-8 py-4 rounded-full hover:bg-primaryColor/90 hover:scale-105 hover:shadow-lg hover:shadow-primaryColor/80 transition-all duration-300 cursor-pointer group text-lg justify-center
        `}
              >
                {plan.buttonText}
                <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:rotate-45" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Payment;
