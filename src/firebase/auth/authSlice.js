import { createSlice } from '@reduxjs/toolkit';
import { auth } from '../firebase-config';

const initialState = {
  user: null,
  status: 'idle',
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { uid, email, role } = action.payload;
      state.user = { uid, email, role };
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;

export const listenToAuthChanges = () => (dispatch) => {
  auth.onAuthStateChanged((user) => {
    if (user) {
      dispatch(setUser({ uid: user.uid, email: user.email, role: 'user' }));
    } else {
      dispatch(clearUser());
    }
  });
};

export const signOutUser = () => async (dispatch) => {
  try {
    await auth.signOut();
    dispatch(clearUser());
  } catch (error) {
    console.error('Error signing out:', error);
  }
};


export const selectUser = (state) => state.auth.user;

export default authSlice.reducer;
