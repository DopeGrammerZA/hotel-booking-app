import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import { db } from '../firebase/config/firebase-config';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';

export const selectAvailableAccommodations = createSelector(
  (state) => state.accommodations.accommodations,
  (accommodations) => accommodations.filter(acc => acc.isAvailable === true)
);
  
console.log(selectAvailableAccommodations)

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

export const checkAvailability = createAsyncThunk(
  'accommodations/checkAvailability',
  async ({ checkInDate, checkOutDate, numRooms, numGuests }) => {
    const snapshot = await getDocs(collection(db, 'accommodations'));
    const accommodations = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    
    const availableAccommodations = accommodations.filter(accommodation => {
      const { maxRooms, maxGuests, bookings } = accommodation;

      if (numRooms <= maxRooms && numGuests <= maxGuests) {
        return bookings.every(booking => (
          new Date(checkOutDate) <= new Date(booking.checkInDate) || 
          new Date(checkInDate) >= new Date(booking.checkOutDate)
        ));
      }
      return false;
    });


    return availableAccommodations;
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
      })
      .addCase(checkAvailability.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(checkAvailability.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.accommodations = action.payload;
      })
      .addCase(checkAvailability.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const selectAccommodations = createSelector(
  (state) => state.accommodations.accommodations,
  (accommodations) => accommodations || []
);

export const selectAccommodationStatus = (state) => state.accommodations.status;

export default accommodationsSlice.reducer;
