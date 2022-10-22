import { configureStore } from "@reduxjs/toolkit";
import authReducers from "./features/auth/authSlice";
import chatReducers from "./features/chat/chatSlice";
import messageReducers from "./features/message/messageSlice";
import { apiSlice } from "./api/apiSlice";

export default configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducers,
    chat: chatReducers,
    message: messageReducers
  },
  middleware: (gDM) => gDM().concat(apiSlice.middleware),
});
