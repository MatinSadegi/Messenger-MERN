import { apiSlice } from "../../api/apiSlice";

export const chatApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    searchUsers: builder.query({
      query: (user) => ({
        url: `/user?search=${user}`,
      }),
      // providesTags:(result,error,user) => [{type:'User', user }]
    }),
    createChat: builder.mutation({
      query: (userId) => ({
        url: '/chat',
        method: 'POST',
        body: userId,
      }),
      invalidatesTags: ['User'],
    }),
    fetchAllChats : builder.query({
      query:() => ({
        url:'/chat'
      })
    })
  }),
});

export const {useSearchUsersQuery, useCreateChatMutation , useFetchAllChatsQuery} = chatApiSlice