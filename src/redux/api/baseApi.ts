import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjbWpjaHg1aTMwMDAzbDB2bGhrb3pkN2x1IiwiZW1haWwiOiJhZG1pbjFAZ21haWwuY29tIiwiaWF0IjoxNzY2MTI2MzUxLCJleHAiOjE3NjYxMjk5NTF9.t7Uz1qh0xjqLdhMTfJ3p7un6gnSlsnFkWje22Ec4MeM`,
    },
    // prepareHeaders: async (headers) => {
    //   headers.set("Content-Type", "application/json");
    //   headers.set("Accept", "application/json");
    //   headers.set(
    //     "Authorization",
    //     `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjbWoycjR5YTUwMDAxbmd2bDRnNjE1b21yIiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE3NjU1MzcwMjQsImV4cCI6MTc2NTU0MDYyNH0.calAYSfdk7b02-Yw0WdMuO4o_AwyZmMZPpN_bZ__R6w`
    //   );
    //   //   const accessToken = await getToken();

    //   //   if (accessToken) {
    //   //     headers.set("Authorization", `Bearer ${accessToken}`);
    //   //   }
    //   return headers;
    // },
  }),
  endpoints: (builder) => ({}),
});
