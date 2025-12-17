import { baseApi } from "@/src/redux/api/baseApi";

const resumeInfo = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllPackage: builder.query<unknown, void>({
      query: () => ({
        url: "packages",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllPackageQuery } = resumeInfo;
