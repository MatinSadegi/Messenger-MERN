import { apiSlice } from "../../api/apiSlice";

export const chatApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    searchUsers: builder.query({
      query: (user) => ({
        url: `/user?search=${user}`,
      }),
    }),
    createChat: builder.mutation({
      query: (userId) => ({
        url: '/chat',
        method: 'POST',
        body: userId,
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const {useSearchUsersQuery, useCreateChatMutation} = chatApiSlice