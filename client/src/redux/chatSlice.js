import { createSlice } from "@reduxjs/toolkit";

 const chatSlice = createSlice({
   name: "chat",
   initialState: {
     selectedChat: null,
     createChatStatus: { loading: false, success: false },
     userProfile:{show:false , info:null}
   },
   reducers: {
     setSelectedChat: (state, action) => {
       state.selectedChat = action.payload;
     },
     setCreateChatStatus:(state,action) => {
      state.createChatStatus = action.payload;
     },
     setUserProfile:(state,action) => {
      state.userProfile = action.payload;
     }
   },
 });

export const {setSelectedChat,setCreateChatStatus , setUserProfile} = chatSlice.actions;
export default chatSlice.reducer