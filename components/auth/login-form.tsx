"use client";
import { useLoginMutation } from "@/src/redux/features/(auth)/auth";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import SetCookies from "./token";

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
  const params = useSearchParams();
  const redirect = params.get("redirect") || null;
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
  console.log(redirect == "/", "params");
  const onSubmit = async (data: LoginFormData) => {
    // console.log("Form submitted:", data);
    try {
      const response = await login(data);
      // console.log(response?.data?.data?.accessToken);
      console.log(response);
      console.log(response?.data?.user?.role);

      if (response?.data?.success) {
        SetCookies(
          response?.data?.data?.accessToken,
          response?.data?.data?.user?.role
        );
        if (redirect) {
          router.push(redirect);
          return;
        }
        toast.success(response?.data?.message || "Login successfully");
        if (response?.data?.data?.user?.role === "ADMIN") {
          router.push("/dashboard");
        } else {
          router.push("/");
        }
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
            className={`w-full px-2.5 py-2.75 border rounded-xl outline-none transition-colors mb-2 ${
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
              className={`w-full px-2.5 py-2.75 border rounded-xl outline-none transition-colors mb-2 ${
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
          className={
            "w-full disabled:bg-gray-400 disabled:cursor-not-allowed bg-primaryColor text-white px-5 py-4 font-semibold rounded-2xl cursor-pointer hover:bg-primaryColor/90 mt-4"
          }
          disabled={isLoading}
        >
          {isLoading ? "Continue..." : "Continue"}
        </button>
        {redirect == "/" && (
          <div>
            <p className="text-center mt-6 text-sm text-[#101010]">
              Don&#39;t have an account?{" "}
              <Link
                href="/signup"
                className="text-primaryColor font-medium hover:underline"
              >
                Sign Up
              </Link>
            </p>
          </div>
        )}
      </form>
    </div>
  );
};

export default LoginForm;
