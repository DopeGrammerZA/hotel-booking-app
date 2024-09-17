import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../firebase-config';  


export const fetchRooms = createAsyncThunk('rooms/fetchRooms', async () => {
  const roomCollection = collection(firestore, 'accommodations');    
  const roomSnapshot = await getDocs(roomCollection);
  const rooms = roomSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return rooms;
});

const roomsSlice = createSlice({
  name: 'rooms',
  initialState: {
    rooms: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRooms.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRooms.fulfilled, (state, action) => {
        state.rooms = action.payload;
        state.loading = false;
      })
      .addCase(fetchRooms.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export default roomsSlice.reducer;
