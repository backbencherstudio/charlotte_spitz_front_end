"use client";
import { useForgotPasswordMutation } from "@/src/redux/features/(auth)/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface ForgotPssFormData {
  email: string;
}

const ForgotPssForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [forgotPassword] = useForgotPasswordMutation();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPssFormData>({
    mode: "onBlur",
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ForgotPssFormData) => {
    console.log("Form submitted:", data);
    try {
      const response = await forgotPassword(data);
      // console.log(response?.data?.success);
      if (response?.data?.success) {
        router.push(`/reset-password?email=${data.email}`);
        // toast.success(response.message);
      }
      // else {
      //   toast.error(response.message);
      // }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="bg-white rounded-[10px] p-8">
      <h2 className="text-[32px] font-medium text-[#070707] mb-12">
        Forgot your password?
      </h2>
      <p className="text-nowrap text-[16px] text[#070707]">
        No worries, just enter your email and we’ll send you a reset link.
      </p>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Email Field */}
        <div className="mt-6">
          <label className="block text-[16px] font-medium text-[#101010] mb-2">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email format",
              },
            })}
            className={`w-full px-2.5 py-[11px] border rounded-xl outline-none transition-colors mb-2`}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-primaryColor text-white px-5 py-4 font-semibold rounded-2xl cursor-pointer hover:bg-primaryColor/90 mt-4"
        >
          Reset Password
        </button>

        <div className="flex justify-center mt-6">
          <Link
            href="/login"
            className="text-lg text-primaryColor font-bold hover:underline"
          >
            Return to login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default ForgotPssForm;
