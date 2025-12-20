import { baseApi } from "@/src/redux/api/baseApi";

const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllOverview: builder.query({
      query: () => ({
        url: `overview`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllOverviewQuery } = dashboardApi;

// import { baseApi } from "@/src/redux/api/baseApi";

// const dashboardApi = baseApi.injectEndpoints({
//   endpoints: (builder) => ({
//     getAllOverview: builder.query({
//       query: () => ({
//         url: `overview`,
//         method: "GET",
//       }),
//     }),
//   }),
// });

// export const { useLazyGetAllOverviewQuery } = dashboardApi;
