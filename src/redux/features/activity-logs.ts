import { baseApi } from "@/src/redux/api/baseApi";

const activityLogsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllActivityLogs: builder.query({
      query: () => ({
        url: `activity-logs`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllActivityLogsQuery } = activityLogsApi;
