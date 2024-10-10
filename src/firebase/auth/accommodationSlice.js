import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import { db } from '../firebase-config';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';

const initialState = {
  accommodations: [],
  status: 'idle',
  error: null,
};

export const fetchAccommodations = createAsyncThunk(
  'accommodations/fetchAccommodations',
  async () => {
    const snapshot = await getDocs(collection(db, 'accommodations'));
    const accommodations = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return accommodations;
  }
);

export const addAccommodation = createAsyncThunk(
  'accommodations/addAccommodation',
  async (newAccommodation) => {
    const docRef = await addDoc(collection(db, 'accommodations'), newAccommodation);
    return { id: docRef.id, ...newAccommodation };
  }
);

export const updateAccommodation = createAsyncThunk(
  'accommodations/updateAccommodation',
  async ({ id, updatedData }) => {
    const docRef = doc(db, 'accommodations', id);
    await updateDoc(docRef, updatedData);
    return { id, ...updatedData };
  }
);

export const deleteAccommodation = createAsyncThunk(
  'accommodations/deleteAccommodation',
  async (id) => {
    const docRef = doc(db, 'accommodations', id);
    await deleteDoc(docRef);
    return id;
  }
);


const accommodationsSlice = createSlice({
  name: 'accommodations',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAccommodations.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAccommodations.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.accommodations = action.payload;
      })
      .addCase(fetchAccommodations.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addAccommodation.fulfilled, (state, action) => {
        state.accommodations.push(action.payload);
      })
      .addCase(updateAccommodation.fulfilled, (state, action) => {
        const index = state.accommodations.findIndex(acc => acc.id === action.payload.id);
        if (index !== -1) {
          state.accommodations[index] = action.payload;
        }
      })
      .addCase(deleteAccommodation.fulfilled, (state, action) => {
        state.accommodations = state.accommodations.filter(acc => acc.id !== action.payload);
      });
  },
});


export const selectAccommodations = createSelector(
  (state) => state.accommodations.accommodations,
  (accommodations) => accommodations || []
);

export default accommodationsSlice.reducer;
