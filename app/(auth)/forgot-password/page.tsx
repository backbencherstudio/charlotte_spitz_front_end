import ForgotPssForm from "@/components/auth/forgot-pss-form";
import Image from "next/image";

const ForgotPassword = () => {
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
            <ForgotPssForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
