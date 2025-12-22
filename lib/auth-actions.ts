"use server";

import { cookies } from "next/headers";

export async function checkToken() {
  const accessToken = (await cookies()).get("accessToken")?.value;
  return !!accessToken;
}
