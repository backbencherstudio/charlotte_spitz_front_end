import { baseApi } from "@/src/redux/api/baseApi";

const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updateProfile: builder.mutation({
      query: (data) => ({
        url: "auth/update-profile",
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const { useUpdateProfileMutation } = profileApi;
