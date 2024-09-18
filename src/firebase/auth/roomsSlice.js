import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchRoomsFromFirebase } from '../firebase-config'; 

// Define the thunk action for fetching rooms
export const fetchRooms = createAsyncThunk('rooms/fetchRooms', async () => {
  const rooms = await fetchRoomsFromFirebase(); 
  return rooms;
});

const roomsSlice = createSlice({
  name: 'rooms',
  initialState: {
    rooms: [],
    selectedRoom: null,
    loading: false,
    error: null,
  },
  reducers: {
    selectRoom: (state, action) => {
      state.selectedRoom = action.payload; 
    },
    clearSelectedRoom: (state) => {
      state.selectedRoom = null; 
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRooms.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRooms.fulfilled, (state, action) => {
        state.rooms = action.payload; 
        state.loading = false;
      })
      .addCase(fetchRooms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { selectRoom, clearSelectedRoom } = roomsSlice.actions;
export default roomsSlice.reducer;
