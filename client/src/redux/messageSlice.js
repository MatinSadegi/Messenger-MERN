import { createSlice, current } from "@reduxjs/toolkit";

const messageSlice = createSlice({
  name: "chat",
  initialState: {
    messages: [],
    notifications: localStorage.getItem("notifications")
      ? JSON.parse(localStorage.getItem("notifications"))
      : [],
    newMessage: "",
  },
  reducers: {
    setMessages: (state, action) => {
      state.messages = action.payload;

    },

    setNewMessage: (state, action) => {
      state.newMessage = action.payload;
    },
    setNotifications: (state, action) => {
      state.notifications = action.payload
      localStorage.setItem(
        "notifications",
        JSON.stringify(state.notifications)
      );
    },
  },
});

export const { setMessages, setNewMessage, setNotifications } =
  messageSlice.actions;
export default messageSlice.reducer;
