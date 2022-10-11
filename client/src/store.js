import { configureStore } from "@reduxjs/toolkit";
import authReducers from "./features/auth/authSlice";
import chatReducers from "./features/chat/chatSlice";
import { apiSlice } from "./api/apiSlice";

export default configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducers,
    chat: chatReducers,
  },
  middleware: (gDM) => gDM().concat(apiSlice.middleware),
});
