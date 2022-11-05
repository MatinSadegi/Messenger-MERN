import { apiSlice } from "./apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (formData) => ({
        url: "/user/signup",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Form"],
    }),
    signIn: builder.mutation({
      query: (formData) => ({
        url: "/user/signin",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Form"],
    }),
  }),
});

export const { useSignInMutation, useSignUpMutation } = authApiSlice;
