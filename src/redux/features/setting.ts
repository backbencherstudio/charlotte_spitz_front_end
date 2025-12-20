import { baseApi } from "@/src/redux/api/baseApi";

const settingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSettings: builder.query({
      query: (id) => ({
        url: `submissions/${id}`,
        method: "GET",
      }),
    }),
    getSubmissionsById: builder.query({
      query: (id) => ({
        url: `submissions/${id}`,
        method: "GET",
      }),
    }),
    createSubmissions: builder.mutation({
      query: (data) => ({
        url: "submissions",
        method: "POST",
        body: data,
      }),
    }),
    deleteSubmissions: builder.mutation({
      query: (id) => ({
        url: `submissions/${id}`,
        method: "DELETE",
      }),
    }),
    updateSettings: builder.mutation({
      query: (data) => ({
        url: "settings",
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetSubmissionsByIdQuery,
  useCreateSubmissionsMutation,
  useDeleteSubmissionsMutation,
  useUpdateSettingsMutation,
} = settingApi;
