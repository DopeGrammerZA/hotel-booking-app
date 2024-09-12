// src/firebase/auth/accommodationSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../firebase-config';

// Thunks
export const fetchAccommodations = createAsyncThunk('accommodations/fetchAccommodations', async () => {
  const snapshot = await getDocs(collection(db, 'accommodations'));
  const accommodations = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return accommodations;
});

export const addAccommodation = createAsyncThunk('accommodations/addAccommodation', async (newAccommodation) => {
  await addDoc(collection(db, 'accommodations'), newAccommodation);
  return newAccommodation;
});

const accommodationSlice = createSlice({
  name: 'accommodations',
  initialState: {
    data: [], // Ensure that data is initialized as an empty array
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAccommodations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAccommodations.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload; // Set the fetched data
      })
      .addCase(fetchAccommodations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addAccommodation.fulfilled, (state, action) => {
        state.data.push(action.payload); // Push the new accommodation to the state
      });
  },
});

export const selectAccommodations = (state) => state.accommodations?.data || [];
export const selectLoading = (state) => state.accommodations?.loading;
export const selectError = (state) => state.accommodations?.error;

export default accommodationSlice.reducer;
