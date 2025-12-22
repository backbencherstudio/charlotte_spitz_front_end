import { baseApi } from "@/src/redux/api/baseApi";

const profileApi = baseApi.injectEndpoints({
  endpoints: (builder: any) => ({
    getProfile: builder.query({
      query: () => ({
        url: "users/me",
        method: "GET",
      }),
    }),
    updateProfile: builder.mutation({
      query: (data: any) => ({
        url: "auth/update-profile",
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const { useGetProfileQuery, useUpdateProfileMutation } = profileApi;
