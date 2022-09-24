import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
  tagTypes:['Form'],
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (formData) => ({
        url:'/user/signup',
        method:'POST',
        body:formData
      }),
      invalidatesTags:['Form']
    }),
    signIn: builder.mutation({
      query: (formData) => ({
        url:'/user/signin',
        method:'POST',
        body:formData
      }),
      invalidatesTags:['Form']
    }),
  }),
});

export const { useSignUpMutation, useSignInMutation } = apiSlice;
