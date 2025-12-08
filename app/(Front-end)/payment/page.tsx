'use client';

import Button from '@/components/reusable/Button';
import { Check, Crown } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { MdArrowOutward } from 'react-icons/md';

const plans = [
  // {
  //   name: "Basic Package",
  //   price: "$3",
  //   period: "One Time",
  //   icon: <Rocket />,
  //   features: [
  //     "1 CV optimization",
  //     "Basic ATS score",
  //     "Standard templates",
  //     "Email support",
  //   ],
  //   buttonText: "Choose Starter",
  //   featured: false,
  // },
  {
    name: 'Premium Package',
    price: '$20',
    period: 'One Time',
    icon: <Crown />,
    features: [
      'Unlimited tailor credits',
      'Upon receiving your $20 payment, your resume will be immediately assigned to a writer on our team. If any clarifications are needed, one of our team members will reach out to you.',
      '1 Page Fit (Coming soon)',
      'AI Bullet Rewrite (Coming Soon)',
    ],
    buttonText: 'Pay Now',
    featured: true,
  },
];

const Payment = () => {
  const router = useRouter();

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
        <div className="flex justify-center max-w-[400px] w-full mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`rounded-2xl p-5 md:p-6  transition-all duration-300 card-Shadow border hover:border border-[#5952FF]`}
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
                onClick={() => router.push('/success')}
              >
                {plan.buttonText}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Payment;
