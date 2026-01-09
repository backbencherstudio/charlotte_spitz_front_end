import { baseApi } from "@/src/redux/api/baseApi";

interface PaginationParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
}

interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

const submissionsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSubmissions: builder.query<
      PaginatedResponse<unknown>,
      PaginationParams
    >({
      query: (params = {}) => {
        const { page = 1, limit = 10, search, status } = params;
        const queryParams = new URLSearchParams();
        queryParams.append("page", page.toString());
        queryParams.append("limit", limit.toString());
        if (search) queryParams.append("search", search);
        if (status && status !== "All") queryParams.append("status", status);

        return {
          url: `submissions?${queryParams.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["submissions"]
    }),
    getSubmissionsById: builder.query({
      query: (id) => ({
        url: `submissions/${id}`,
        method: "GET",
      }),
    }),
    submissionStatus: builder.mutation({
      query: ({ id, status, file }) => {
        const formData = new FormData();
        formData.append("status", status);
        if (file) {
          formData.append("file", file);
        }
        return {
          url: `submissions/${id}/status`,
          method: "PATCH",
          body: formData,
        };
      },
      invalidatesTags: ["submissions"]
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
  }),
});

export const {
  useGetAllSubmissionsQuery,
  useGetSubmissionsByIdQuery,
  useSubmissionStatusMutation,
  useCreateSubmissionsMutation,
  useDeleteSubmissionsMutation,
} = submissionsApi;
