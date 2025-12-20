import ResetPsswordForm from "@/components/auth/reset-password";
import Image from "next/image";
import { Suspense } from "react";

const ResetPassword = () => {
  return (
    <section className="bg-[#705AEF]">
      <div className="container">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 min-h-screen items-center justify-center gap-8 py-10">
          <div>
            <Image
              src="/images/auth.png"
              alt="Signup Illustration"
              width={500}
              height={500}
              className="object-cover h-full w-full"
            />
          </div>
          <div>
            <Suspense>
              <ResetPsswordForm />
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
