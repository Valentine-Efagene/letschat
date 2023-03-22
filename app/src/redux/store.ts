import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import userReducer from './user/user.slice';
import messageReducer from './message/message.slice';

export const store = configureStore({
  reducer: {
    message: messageReducer,
    user: userReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
