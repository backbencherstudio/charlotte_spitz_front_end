"use client";
import { useLoginMutation } from "@/src/redux/features/(auth)/auth";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface LoginFormData {
  name: string;
  email: string;
  phone: string;
  password: string;
  terms: boolean;
}

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [login, { isLoading }] = useLoginMutation();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    console.log("Form submitted:", data);
    try {
      const response = await login(data);
      if (response?.data?.success) {
        router.push("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="bg-white rounded-[10px] p-8">
      <h2 className="text-[32px] font-medium text-[#070707] mb-12">
        Admin Login
      </h2>

      <form onSubmit={handleSubmit(onSubmit)}>
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
              errors.name
                ? "border-red-500 focus:ring-2 focus:ring-red-500"
                : "border-gray-300 focus:ring-2 focus:ring-primaryColor"
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
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
                errors.name
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

        <div className="flex justify-end ">
          <Link
            href="/forgot-password"
            className="text-sm text-primaryColor hover:underline"
          >
            Forgot Password?
          </Link>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-primaryColor text-white px-5 py-4 font-semibold rounded-2xl cursor-pointer hover:bg-primaryColor/90 mt-4"
        >
          Continue
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
