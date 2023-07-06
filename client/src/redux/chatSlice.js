import { createSlice } from "@reduxjs/toolkit";


const chatSlice = createSlice({
  name: "chat",
  initialState: {
    onlineUsers:[],
    selectedChat: null,
    createChatStatus: { loading: false, success: false },
    userProfile: { show: false, info: null },
    showInbox: true,
  },
  reducers: {
    setSelectedChat: (state, action) => {
      state.selectedChat = action.payload;
    },
    setCreateChatStatus: (state, action) => {
      state.createChatStatus = action.payload;
    },
    setUserProfile: (state, action) => {
      state.userProfile = action.payload;
    },
    setShowInbox: (state, action) => {
      state.showInbox = action.payload;
      
    },
    setOnlineUsers:(state,action) => {
     state.onlineUsers = action.payload;
    }

  },
});

export const {
  setSelectedChat,
  setCreateChatStatus,
  setUserProfile,
  setShowInbox,
  setOnlineUsers,
} = chatSlice.actions;
export default chatSlice.reducer;
