import { baseApi } from "@/src/redux/api/baseApi";

const resumeInfo = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllPackage: builder.query<unknown, void>({
      query: () => ({
        url: "packages",
        method: "GET",
      }),
    }),
    getLoggedUser: builder.query<unknown, void>({
      query: () => ({
        url: "users/me",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllPackageQuery, useGetLoggedUserQuery } = resumeInfo;
