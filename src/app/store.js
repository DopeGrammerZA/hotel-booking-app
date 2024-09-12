import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../firebase/auth/authSlice';  


export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
