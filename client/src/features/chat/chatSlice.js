import { createSlice } from "@reduxjs/toolkit";

 const chatSlice = createSlice({
   name: "chat",
   initialState: {
     selectedChat: null,
     createChatStatus: { loading: false, success: false },
   },
   reducers: {
     setSelectedChat: (state, action) => {
       state.selectedChat = action.payload;
     },
     setCreateChatStatus:(state,action) => {
      state.createChatStatus = action.payload;
     }
   },
 });

export const {setSelectedChat,setCreateChatStatus} = chatSlice.actions;
export default chatSlice.reducer