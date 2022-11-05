import { apiSlice } from "./apiSlice";

export const messageApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchAllMessage: builder.query({
      query: (chatId) => ({
        url: `/message/${chatId}`,
      }),
    }),
    sendMessage: builder.mutation({
      query: (newMessage) => ({
        url: "/message",
        method: "POST",
        body: newMessage,
      }),
    }),
  }),
});

export const { useFetchAllMessageQuery, useSendMessageMutation } =
  messageApiSlice;
