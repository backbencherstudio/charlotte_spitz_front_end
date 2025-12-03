import { ArrowRight, Check, Crown, Rocket } from "lucide-react";

export default function PricingSection() {
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
    <section className="py-20 px-[140px] bg-[#F6F8FA]">
      <div>
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#1D1F2C] mb-4">
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
              <button
                className={`w-full py-3 px-6 rounded-full font-semibold flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer ${
                  plan.featured
                    ? "bg-[#5952FF] hover:bg-[#4A47D6]/90 text-white shadow-lg hover:shadow-xl"
                    : "bg-[#5952FF] hover:bg-[#4A47D6]/90 text-white shadow-lg hover:shadow-xl"
                }`}
              >
                {plan.buttonText}
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
