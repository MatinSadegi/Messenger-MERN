import { createSlice } from "@reduxjs/toolkit";

 const chatSlice = createSlice({
   name: 'chat',
   initialState: {
     selectedChat: null,
   },
   reducers: {
     setSelectedChat: (state, action) => {
       state.selectedChat = action.payload
       
     },
   },
 });

export const {setSelectedChat} = chatSlice.actions;
export default chatSlice.reducer