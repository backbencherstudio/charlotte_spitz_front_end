"use server";

import { cookies } from "next/headers";

// Token
export default async function SetCookies(token: string) {
  (await cookies()).set("accessToken", token);
}

export const getToken = async () => {
  const accessToken = (await cookies()).get("accessToken")?.value;
  return accessToken;
};

export async function removeToken() {
  (await cookies()).delete("accessToken");
}
