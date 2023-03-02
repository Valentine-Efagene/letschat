import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/auth.slice';
import userReducer from './user/user.slice';
import messageReducer from './message/message.slice';
import socketReducer from './socket/socket.slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    message: messageReducer,
    user: userReducer,
    socket: socketReducer,
  },
});
