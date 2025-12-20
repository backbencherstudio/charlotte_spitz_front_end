import { baseApi } from "@/src/redux/api/baseApi";

const subscriptionsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSubscriptions: builder.query({
      query: () => ({
        url: `packages`,
        method: "GET",
      }),
    }),
    getSubscriptionById: builder.query({
      query: (id) => ({
        url: `packages/${id}`,
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
    updateSubscription: builder.mutation({
      query: ({ data, id }) => ({
        url: `packages/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAllSubscriptionsQuery,
  useGetSubscriptionByIdQuery,
  useCreateSubmissionsMutation,
  useDeleteSubmissionsMutation,
  useUpdateSubscriptionMutation,
} = subscriptionsApi;
