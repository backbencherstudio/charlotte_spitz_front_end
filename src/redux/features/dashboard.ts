import { baseApi } from "@/src/redux/api/baseApi";

const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllOverview: builder.query({
      query: ({ range }) => ({
        url: `overview?range=${range}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllOverviewQuery } = dashboardApi;
