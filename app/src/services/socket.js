import { io } from 'socket.io-client';

const URL = 'http://localhost:3600';
const socket = io(URL, {
  auth: { userId: localStorage.getItem('user-id') },
  autoConnect: true,
  reconnectionDelayMax: 1000,
});

export default socket;
