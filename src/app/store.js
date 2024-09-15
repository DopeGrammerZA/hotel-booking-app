import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../firebase/auth/authSlice';
import accommodationsReducer from '../firebase/auth/accommodationSlice'; 
// Import other reducers here

export const store = configureStore({
  reducer: {
    auth: authReducer,
    accommodations: accommodationsReducer, 
  },
});

export default store;
