import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import accommodationsReducer from './accommodationSlice';  
import roomsReducer from './roomsSlice'; 

export const store = configureStore({
  reducer: {
    auth: authReducer,
    accommodations: accommodationsReducer,  
    rooms: roomsReducer,
  },
});

export default store;
