"use client";

import SetCookies from "@/components/auth/token";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export default function GoogleCallbackPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [message, setMessage] = useState("Completing Google sign in...");

  const accessToken = searchParams.get("access_token");
  const callbackUrl = searchParams.get("callbackUrl");
  const errorParam = searchParams.get("error");

  const nextPath = useMemo(() => {
    if (callbackUrl && callbackUrl.startsWith("/")) {
      return callbackUrl;
    }
    return "/";
  }, [callbackUrl]);

  useEffect(() => {
    let isCancelled = false;

    const completeGoogleSignIn = async () => {
      if (errorParam) {
        if (!isCancelled) {
          setMessage("Google sign in failed. Redirecting to login...");
          router.replace(`/login?error=${encodeURIComponent(errorParam)}`);
        }
        return;
      }

      if (!accessToken) {
        if (!isCancelled) {
          setMessage("Google sign in failed. Redirecting to login...");
          router.replace("/login?error=missing_access_token");
        }
        return;
      }

      try {
        await SetCookies(accessToken);
        if (!isCancelled) {
          router.replace(nextPath);
        }
      } catch {
        if (!isCancelled) {
          setMessage("Session setup failed. Redirecting to login...");
          router.replace("/login?error=session_setup_failed");
        }
      }
    };

    void completeGoogleSignIn();

    return () => {
      isCancelled = true;
    };
  }, [accessToken, errorParam, nextPath, router]);

  return (
    <main className="min-h-screen flex items-center justify-center p-6 text-center">
      <p className="text-sm text-gray-600">{message}</p>
    </main>
  );
}
