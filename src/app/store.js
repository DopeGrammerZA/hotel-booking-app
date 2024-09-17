import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../firebase/auth/authSlice';
import accommodationsReducer from '../firebase/auth/accommodationSlice';  
import roomsReducer from '../firebase/auth/roomsSlice'; 

export const store = configureStore({
  reducer: {
    auth: authReducer,
    accommodations: accommodationsReducer,  
    rooms: roomsReducer,
  },
});

export default store;
