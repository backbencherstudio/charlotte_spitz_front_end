"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { useSignUpMutation } from "@/src/redux/features/(auth)/auth";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface SignupFormData {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  password: string;
  termsAccepted: boolean;
}

const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [signUp, { isLoading }] = useSignUpMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    mode: "onBlur",
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone_number: "",
      password: "",
      termsAccepted: false,
    },
  });

  const onSubmit = async (data: SignupFormData) => {
    console.log("Form submitted:", data);
    const payload = {
      ...data,
      role: "USER",
    };
    try {
      const response = await signUp(payload);
      // console.log(response?.data?.success);
      if (response?.data?.success) {
        router.push(`/otp?email=${data.email}`);
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
        Let&apos;s create your account.
      </h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="block text-[16px] font-medium text-[#101010] mb-2">
            First Name
          </label>
          <input
            type="text"
            placeholder="Enter your name"
            {...register("first_name", {
              required: "Name is required",
              minLength: {
                value: 2,
                message: "Name must be at least 2 characters",
              },
            })}
            className={`w-full px-2.5 py-[11px] border rounded-xl outline-none transition-colors mb-2 ${
              errors.first_name
                ? "border-red-500 focus:ring-2 focus:ring-red-500"
                : "border-gray-300 focus:ring-2 focus:ring-primaryColor"
            }`}
          />
          {errors.first_name && (
            <p className="text-red-500 text-xs mt-1">
              {errors.first_name.message}
            </p>
          )}
        </div>
        {/* Last Name Field */}
        <div>
          <label className="block text-[16px] font-medium text-[#101010] mb-2">
            Last Name
          </label>
          <input
            type="text"
            placeholder="Enter your last name"
            {...register("last_name", {
              required: "Name is required",
              minLength: {
                value: 2,
                message: "Name must be at least 2 characters",
              },
            })}
            className={`w-full px-2.5 py-[11px] border rounded-xl outline-none transition-colors mb-2 ${
              errors.last_name
                ? "border-red-500 focus:ring-2 focus:ring-red-500"
                : "border-gray-300 focus:ring-2 focus:ring-primaryColor"
            }`}
          />
          {errors.last_name && (
            <p className="text-red-500 text-xs mt-1">
              {errors.last_name.message}
            </p>
          )}
        </div>

        {/* Email Field */}
        <div>
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
            className={`w-full px-2.5 py-[11px] border rounded-xl outline-none transition-colors mb-2 ${
              errors.first_name
                ? "border-red-500 focus:ring-2 focus:ring-red-500"
                : "border-gray-300 focus:ring-2 focus:ring-primaryColor"
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Phone Number Field */}
        <div>
          <label className="block text-[16px] font-medium text-[#101010] mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            placeholder="Enter your phone number"
            {...register("phone_number", {
              required: "Phone number is required",
              pattern: {
                value: /^[\d\s\-+$$$$]+$/,
                message: "Invalid phone format",
              },
            })}
            className={`w-full px-2.5 py-[11px] border rounded-xl outline-none transition-colors mb-2 ${
              errors.first_name
                ? "border-red-500 focus:ring-2 focus:ring-red-500"
                : "border-gray-300 focus:ring-2 focus:ring-primaryColor"
            }`}
          />
          {errors.phone_number && (
            <p className="text-red-500 text-xs mt-1">
              {errors.phone_number.message}
            </p>
          )}
        </div>

        {/* Password Field */}
        <div>
          <label className="block text-[16px] font-medium text-[#101010] mb-2">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Create a password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
              className={`w-full px-2.5 py-[11px] border rounded-xl outline-none transition-colors mb-2 ${
                errors.first_name
                  ? "border-red-500 focus:ring-2 focus:ring-red-500"
                  : "border-gray-300 focus:ring-2 focus:ring-primaryColor"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[16px]ay-500 hover:text-[#101010] cursor-pointer"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="flex items-start space-x-1.5 my-4">
          <Checkbox className="cursor-pointer h-4 w-4 data-[state=checked]:bg-[#5952FF] data-[state=checked]:border-[#5952FF]" />
          <label htmlFor="termsAccepted" className="text-sm text-gray-600">
            I agree to the{" "}
            <a
              href="#"
              className="text-primaryColor hover:underline font-medium"
            >
              Terms and Privacy Policy
            </a>
          </label>
        </div>
        {errors.termsAccepted && (
          <p className="text-red-500 text-xs">{errors.termsAccepted.message}</p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-primaryColor text-white px-5 py-4 font-semibold rounded-2xl cursor-pointer hover:bg-primaryColor/90"
        >
          Continue
        </button>

        {/* Login Link */}
        <p className="text-center text-sm text-gray-600 pt-2">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-blue-600 hover:underline font-medium"
          >
            Log In
          </a>
        </p>
      </form>
    </div>
  );
};

export default SignUpForm;
