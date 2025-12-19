"use client";

import { useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { useVerifyEmailMutation } from "@/src/redux/features/(auth)/auth";
import { useRouter, useSearchParams } from "next/navigation";

export default function OtpForm() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const [otp, setOtp] = useState("");
  const [verifyEmail, { isLoading }] = useVerifyEmailMutation();
  const router = useRouter();

  const handleSubmit = async () => {
    console.log("OTP Value:", otp);
    const payload = {
      email: email,
      otp: otp,
    };
    try {
      const response = await verifyEmail(payload);
      if (response?.data?.success) {
        router.push("/login");
      }
    } catch (error) {
      console.log(error);
    }
    // API call here
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-md max-w-md w-full mx-auto">
      {/* Title */}
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Verify OTP</h2>
      <p className="text-gray-500 mb-6">
        Enter the 6-digit code sent to your email
      </p>

      <div className="flex justify-center">
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

      {/* Submit Button */}
      <Button
        onClick={handleSubmit}
        disabled={otp.length !== 6}
        className="w-full bg-primaryColor text-white px-5 py-4 font-semibold rounded-2xl cursor-pointer hover:bg-primaryColor/90 mt-4"
      >
        Verify OTP
      </Button>

      {/* Resend */}
      <p className="text-sm text-center text-gray-500 mt-4">
        Didn’t receive the code?{" "}
        <button className="text-[#705AEF] font-semibold">Resend</button>
      </p>
    </div>
  );
}
