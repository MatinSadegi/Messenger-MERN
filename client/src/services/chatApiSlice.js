import { apiSlice } from "./apiSlice";

export const chatApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    searchUsers: builder.query({
      query: (user) => ({
        url: `/user?search=${user}`,
      }),
    }),
    createChat: builder.mutation({
      query: (userId) => ({
        url: "/chat",
        method: "POST",
        body: userId,
      }),
      invalidatesTags: ["User"],
    }),
    fetchAllChats: builder.query({
      query: () => ({
        url: "/chat",
      }),
    }),
    createGroupChat: builder.mutation({
      query: (groupInfo) => ({
        url: "/chat/group",
        method: "POST",
        body: groupInfo,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useSearchUsersQuery,
  useCreateChatMutation,
  useFetchAllChatsQuery,
  useCreateGroupChatMutation,
} = chatApiSlice;
