import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/user.slice';
import messageReducer from './message/message.slice';
import socketReducer from './socket/socket.slice';

export const store = configureStore({
  reducer: {
    message: messageReducer,
    user: userReducer,
    socket: socketReducer,
  },
});
