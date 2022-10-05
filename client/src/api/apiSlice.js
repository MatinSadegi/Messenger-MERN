import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000', prepareHeaders:(headers) => {
    if(JSON.parse(localStorage.getItem('profile'))){
      const { token } = JSON.parse(localStorage.getItem('profile'));
      headers.set("authorization", `Bearer ${token}`)
    }
    return headers
  } }),
  tagTypes: ['Form', 'User'],
  endpoints: builder => ({})
});
