// https://dev.to/novu/building-a-chat-app-with-socketio-and-react-2edj
// https://www.freecodecamp.org/news/build-a-realtime-chat-app-with-react-express-socketio-and-harperdb/#how-to-set-up-the-server

import { createSlice } from '@reduxjs/toolkit';
import { IDLE } from '../../Helpers/loadingStates';
import io from 'socket.io-client';
const socket = io.connect('http://localhost:3000');

const initialState = {
  socket: socket,
  status: IDLE,
  error: null,
};

export const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    reconnect: state => {
      state.socket = io.connect('http://localhost:3000');
    },
  },
});

export const { reconnect } = socketSlice.actions;
export default socketSlice.reducer;
