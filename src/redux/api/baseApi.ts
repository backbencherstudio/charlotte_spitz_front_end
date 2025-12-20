// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export const baseApi = createApi({
//   reducerPath: "api",
//   baseQuery: fetchBaseQuery({
//     baseUrl: process.env.NEXT_PUBLIC_API_URL,
//     credentials: "include",
//     headers: {
//       "Content-Type": "application/json",
//       Accept: "application/json",
//       Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjbWpjaHg1aTMwMDAzbDB2bGhrb3pkN2x1IiwiZW1haWwiOiJhZG1pbjFAZ21haWwuY29tIiwiaWF0IjoxNzY2MTI2MzUxLCJleHAiOjE3NjYxMjk5NTF9.t7Uz1qh0xjqLdhMTfJ3p7un6gnSlsnFkWje22Ec4MeM`,
//     },
//   }),
//   endpoints: (builder) => ({}),
// });

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

        if (token) {
          headers.set("Authorization", `Bearer ${token}`);
        }
      }
      headers.set("Content-Type", "application/json");
      headers.set("Accept", "application/json");

      return headers;
    },
  }),
  endpoints: (builder) => ({}),
});
