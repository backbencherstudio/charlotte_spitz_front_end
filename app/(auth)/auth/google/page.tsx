import SetCookies from "@/components/auth/token";
import { redirect } from "next/navigation";

type GoogleCallbackPageProps = {
  searchParams: Promise<{
    access_token?: string;
    refresh_token?: string;
    callbackUrl?: string;
  }>;
};

export default async function GoogleCallbackPage({
  searchParams,
}: GoogleCallbackPageProps) {
  const params = await searchParams;
  const accessToken = params.access_token;

  if (accessToken) {
    await SetCookies(accessToken);
  }

  const callbackUrl = params.callbackUrl;
  if (callbackUrl && callbackUrl.startsWith("/")) {
    redirect(callbackUrl);
  }

  redirect("https://cvdigger.com/");
}
