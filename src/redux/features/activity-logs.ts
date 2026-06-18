import { baseApi } from "@/src/redux/api/baseApi";

const activityLogsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllActivityLogs: builder.query({
      query: () => ({
        url: `activity-logs`,
        method: "GET",
      }),
    }),
    getActivityDetails: builder.query({
      query: (id) => ({
        url: `activity-logs/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllActivityLogsQuery, useGetActivityDetailsQuery } =
  activityLogsApi;
