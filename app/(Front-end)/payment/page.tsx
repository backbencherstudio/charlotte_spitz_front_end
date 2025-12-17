"use client";

import Button from "@/components/reusable/Button";
import { useGetAllPackageQuery } from "@/src/redux/features/resumeInfo";
import { Check, Crown } from "lucide-react";
import { useRouter } from "next/navigation";
import { MdArrowOutward } from "react-icons/md";

interface Plan {
  name: string;
  price: number;
  benefits: string[];
}

// const plans = [
//   // {
//   //   name: "Basic Package",
//   //   price: "$3",
//   //   period: "One Time",
//   //   icon: <Rocket />,
//   //   features: [
//   //     "1 CV optimization",
//   //     "Basic ATS score",
//   //     "Standard templates",
//   //     "Email support",
//   //   ],
//   //   buttonText: "Choose Starter",
//   //   featured: false,
//   // },
//   {
//     name: "Premium Package",
//     price: "$20",
//     period: "One Time",
//     icon: <Crown />,
//     features: [
//       "Unlimited tailor credits",
//       "Upon receiving your $20 payment, your resume will be immediately assigned to a writer on our team. If any clarifications are needed, one of our team members will reach out to you.",
//       "1 Page Fit (Coming soon)",
//       "AI Bullet Rewrite (Coming Soon)",
//     ],
//     buttonText: "Pay Now",
//     featured: true,
//   },
// ];

const Payment = () => {
  const router = useRouter();
  const { data, isLoading, error } = useGetAllPackageQuery();

  console.log(data, "data", isLoading, error);

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

        {isLoading ? (
          <div className="flex justify-center gap-6 flex-wrap max-w-4xl mx-auto">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="rounded-2xl border p-5 md:p-6 w-full max-w-[400px] animate-pulse"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-gray-300 rounded"></div>
                  <div className="h-6 bg-gray-300 rounded w-32"></div>
                </div>
                <div className="mb-6">
                  <div className="h-10 bg-gray-300 rounded w-24 mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-16"></div>
                </div>
                <div className="space-y-4 mb-8">
                  {[1, 2, 3, 4].map((j) => (
                    <div key={j} className="flex items-start gap-3">
                      <div className="w-5 h-5 bg-gray-300 rounded shrink-0"></div>
                      <div className="h-4 bg-gray-300 rounded flex-1"></div>
                    </div>
                  ))}
                </div>
                <div className="h-12 bg-gray-300 rounded"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex justify-center gap-6 flex-wrap max-w-4xl mx-auto">
            {(data as { data?: Array<Plan> })?.data?.map(
              (plan: Plan, index: number) => (
                <div
                  key={index}
                  className={`rounded-2xl p-5 md:p-6 w-full max-w-[400px] transition-all duration-300 card-Shadow border hover:border border-[#5952FF]`}
                >
                  {/* Plan Name */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl">
                      <Crown />
                    </span>
                    <h3 className="text-xl font-bold text-[#4A4C56]">
                      {plan?.name}
                    </h3>
                  </div>

                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold text-[#5952FF]">
                        ${plan?.price}
                      </span>
                      <span className="text-[#A5A5AB]">/One Time</span>
                    </div>
                  </div>

                  {/* Features List */}
                  <ul className="space-y-4 mb-8">
                    {plan?.benefits?.map(
                      (feature: string, featureIndex: number) => (
                        <li
                          key={featureIndex}
                          className="flex items-start gap-3 text-[#4A4C56]"
                        >
                          <Check className="w-5 h-5 text-[#5952FF] shrink-0 mt-0.5" />
                          <span className="text-sm sm:text-base">
                            {feature}
                          </span>
                        </li>
                      )
                    )}
                  </ul>

                  {/* Button */}
                  <Button
                    icon={
                      <MdArrowOutward className="w-5 h-5 transition-transform duration-200" />
                    }
                    className="w-full items-center justify-center"
                    onClick={() => router.push("/success")}
                  >
                    Pay Now
                  </Button>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Payment;
