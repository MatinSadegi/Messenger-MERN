import { apiSlice } from "../../api/apiSlice";

export const messageApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder) =>({
        fetchAllMessage :builder.query({
            query:(chatId)=>({
                url:`/message/${chatId}`
            }),
            // transformResponse: res => res.reverse(),
            // providesTags:['Message']
        }),
        sendMessage : builder.mutation({
            query:(newMessage) => ({
                url:'/message',
                method:'POST',
                body:newMessage
            }),
            // invalidatesTags:(['Message'])
        })
    })
})

export const {useFetchAllMessageQuery, useSendMessageMutation} = messageApiSlice;