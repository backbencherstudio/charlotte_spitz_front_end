import { getToken } from "@/components/auth/token";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    credentials: "include",
    prepareHeaders: async (headers) => {
      if (typeof window !== "undefined") {
        const token = await getToken();
        // console.log(token, "token");

        if (token) {
          headers.set("Authorization", `Bearer ${token}`);
        }
      }
      headers.set("Content-Type", "application/json");
      headers.set("Accept", "application/json");

      return headers;
    },
  }),
  tagTypes: ["subsciprions","profile", "submissions"],
  endpoints: (builder) => ({}),
});
