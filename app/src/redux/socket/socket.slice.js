// https://dev.to/novu/building-a-chat-app-with-socketio-and-react-2edj
// https://www.freecodecamp.org/news/build-a-realtime-chat-app-with-react-express-socketio-and-harperdb/#how-to-set-up-the-server

import { createSlice } from '@reduxjs/toolkit';
import { IDLE } from '../../Helpers/loadingStates';
import io from 'socket.io-client';

const URL = 'http://localhost:3000';
const socket = io(URL, {
  auth: { userId: localStorage.getItem('user-id') },
  autoConnect: true,
  reconnectionDelayMax: 1000,
});

socket.onAny((event, ...args) => {
  console.log(event, args);
});

const initialState = {
  socket,
  status: IDLE,
  error: null,
  peers: [],
};

export const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    setPeers: (state, { payload }) => {
      state.peers = payload;
    },
    reconnect: state => {
      state.socket = io.connect('http://localhost:3000');
    },
  },
});

export const { setPeers, reconnect } = socketSlice.actions;
export default socketSlice.reducer;
