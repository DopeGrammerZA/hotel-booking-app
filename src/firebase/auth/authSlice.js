import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase-config';


export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const { user } = userCredential;
      const { uid, email: userEmail } = user;

      
      if (userEmail === 'AdminOnly@gmail.com') {
        return { uid, email: userEmail, isAdmin: true };
      }

      return { uid, email: userEmail, isAdmin: false };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      
      if (email === 'AdminOnly@gmail.com') {
        throw new Error('Admin registration is not allowed');
      }

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const { user } = userCredential;
      const { uid, email: userEmail } = user;

      
      await setDoc(doc(db, 'users', uid), {
        email: userEmail,
        uid
      });

      return { uid, email: userEmail };
    } catch (error) {
      console.error("Error saving user data to Firestore: ", error);
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    loading: false,
    error: null
  },
  reducers: {
    logout: (state) => {
      state.user = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
