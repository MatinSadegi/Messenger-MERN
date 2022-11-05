import { configureStore } from "@reduxjs/toolkit";
import authReducers from "./redux/authSlice";
import chatReducers from "./redux/chatSlice";
import messageReducers from "./redux/messageSlice";
import { apiSlice } from "./services/apiSlice";

export default configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducers,
    chat: chatReducers,
    message: messageReducers
  },
  middleware: (gDM) => gDM().concat(apiSlice.middleware),
});
