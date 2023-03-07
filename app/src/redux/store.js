import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/user.slice';
import messageReducer from './message/message.slice';

export const store = configureStore({
  reducer: {
    message: messageReducer,
    user: userReducer,
  },
});
