"use client";
import { useForgotPasswordMutation } from "@/src/redux/features/(auth)/auth";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

interface ResetPssFormData {
  new_password: string;
}

const ResetPsswordForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [forgotPassword] = useForgotPasswordMutation();
  const [otp, setOtp] = useState("");
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPssFormData>({
    mode: "onBlur",
    defaultValues: {
      new_password: "",
    },
  });

  const onSubmit = async (data: ResetPssFormData) => {
    console.log("Form submitted:", data);

    const payload = {
      ...data,
      otp: otp,
      email: email,
    };

    try {
      const response = await forgotPassword(payload);
      // console.log(response?.data?.success);
      if (response?.data?.success) {
        router.push(`/dashboard`);
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
        Reset your password?
      </h2>
      {/* <p className="text-nowrap text-[16px] text[#070707]">
        No worries, just enter your email and we’ll send you a reset link.
      </p> */}

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Email Field */}
        {/* <div className="mt-6">
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
        </div> */}

        <div className="">
          <label className="block text-[16px] font-medium text-[#101010] mb-2">
            OTP
          </label>
          {/* OTP Input */}
          <InputOTP
            maxLength={6}
            value={otp}
            onChange={(value) => setOtp(value)}
            className="mb-6 justify-center"
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>

            <InputOTPSeparator />

            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>

        {/* Password Field */}
        <div>
          <label className="block text-[16px] font-medium text-[#101010] mb-2">
            new_password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Create a new_password"
              {...register("new_password", {
                required: "new_password is required",
                minLength: {
                  value: 8,
                  message: "new_password must be at least 8 characters",
                },
              })}
              className={`w-full px-2.5 py-[11px] border rounded-xl outline-none transition-colors mb-2 `}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[16px]ay-500 hover:text-[#101010] cursor-pointer"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.new_password && (
            <p className="text-red-500 text-xs mt-1">
              {errors.new_password.message}
            </p>
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

export default ResetPsswordForm;
