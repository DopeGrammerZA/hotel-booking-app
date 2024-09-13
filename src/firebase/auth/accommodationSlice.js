// src/firebase/auth/accommodationSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db, collection, getDocs } from '../firebase-config';

export const fetchAccommodations = createAsyncThunk(
  'accommodations/fetchAccommodations',
  async () => {
    const querySnapshot = await getDocs(collection(db, 'accommodations'));
    let accommodations = [];
    querySnapshot.forEach((doc) => {
      accommodations.push({ id: doc.id, ...doc.data() });
    });
    return accommodations;
  }
);

const accommodationsSlice = createSlice({
  name: 'accommodations',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {
    addAccommodation: (state, action) => {
      state.data.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAccommodations.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAccommodations.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchAccommodations.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export const { addAccommodation } = accommodationsSlice.actions;
export const selectAccommodations = (state) => state.accommodations;
export default accommodationsSlice.reducer;
