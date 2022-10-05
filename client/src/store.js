import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import { apiSlice } from './api/apiSlice';

 export default configureStore({
  reducer: {
    [apiSlice.reducerPath]:apiSlice.reducer,
    auth: authReducer
  },
  middleware :gDM => gDM().concat(apiSlice.middleware)
});

