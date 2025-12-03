import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null, 
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      
      const { uid, email } = action.payload;
      state.user = { uid, email };
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;

export default authSlice.reducer;
