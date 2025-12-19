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
  }),
});

export const {
  useGetAllSubmissionsQuery,
  useGetSubmissionsByIdQuery,
  useCreateSubmissionsMutation,
  useDeleteSubmissionsMutation,
} = submissionsApi;
