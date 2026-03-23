import OtpForm from "@/components/auth/otp-form";
import Image from "next/image";
import { Suspense } from "react";

function OtpPage() {
  return (
    <section className="bg-[#705AEF]">
      <div className="container">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 min-h-screen items-center justify-center gap-8 py-10">
          <div className="overflow-hidden rounded-3xl">
            <Image
              src="/images/auth.jpg"
              alt="Signup Illustration"
              width={500}
              height={500}
              className="object-cover h-full w-full"
            />
          </div>
          <div>
            <Suspense>
              <OtpForm />
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  );
}

export default OtpPage;
