import { baseApi } from "@/src/redux/api/baseApi";

const submissionsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSubmissions: builder.query<unknown, void>({
      query: () => ({
        url: "submissions",
        method: "GET",
      }),

    }),
    getSubmissionsById: builder.query({
      query: (id) => ({
        url: `blog-categories/${id}`,
        method: "GET",
      }),
    }),
    createSubmissions: builder.mutation({
      query: (data) => ({
        url: "blog-categories",
        method: "POST",
        body: data,
      }),
    }),
    deleteSubmissions: builder.mutation({
      query: (id) => ({
        url: `blog-categories/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllSubmissionsQuery,
  useGetSubmissionsByIdQuery,
  useCreateSubmissionsMutation,
  useDeleteSubmissionsMutation,
} = submissionsApi;
