// redux/Reducer/socket.js
import { createSlice } from '@reduxjs/toolkit';

const socketSlice = createSlice({
  name: 'socket',
  initialState: {
    isConnected: false,
  },
  reducers: {
    setSocketConnection: (state, action) => {
      state.isConnected = true;
    },
    setSocketDisconnected: (state) => {
      state.isConnected = false;
    },
  },
});

export const { setSocketConnection, setSocketDisconnected } = socketSlice.actions;
export default socketSlice.reducer;
