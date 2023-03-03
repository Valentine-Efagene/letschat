import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchMessages, sendMessage } from './message.api';
import { IDLE, PENDING, SUCCEEDED, FAILED } from '../../Helpers/loadingStates';

const initialState = {
  messages: null,
  target: null,
  status: IDLE,
  error: null,
};

const fetchMessagesThunk = createAsyncThunk(
  'message/fetch',
  async (target, { rejectWithValue }) => {
    if (target == null) return null;

    try {
      const result = await fetchMessages(target);
      return result;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

const sendMessageThunk = createAsyncThunk(
  'message/send',
  async (data, { rejectWithValue }) => {
    try {
      return await sendMessage(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    appendMessage: (state, { payload }) => {
      state.messages.push(payload);
    },
    setTarget: (state, { payload }) => {
      state.target = payload;
    },
    setMessages: (state, { payload }) => {
      state.messages = payload;
    },
  },
  extraReducers: buiilder => {
    buiilder.addCase(fetchMessagesThunk.fulfilled, (state, { payload }) => {
      state.messages = payload;
      state.status = SUCCEEDED;
    });
    buiilder.addCase(fetchMessagesThunk.pending, (state, { payload }) => {
      state.status = PENDING;
    });
    buiilder.addCase(fetchMessagesThunk.rejected, (state, { payload }) => {
      state.status = FAILED;
    });

    buiilder.addCase(sendMessageThunk.fulfilled, (state, { payload }) => {
      state.messages = payload;
      state.status = SUCCEEDED;
    });
    buiilder.addCase(sendMessageThunk.pending, (state, { payload }) => {
      state.status = PENDING;
    });
    buiilder.addCase(sendMessageThunk.rejected, (state, { payload }) => {
      state.error = payload;
      state.status = FAILED;
    });
  },
});

export { sendMessageThunk, fetchMessagesThunk };
export const { appendMessage, setTarget, setMessages } = messageSlice.actions;
export default messageSlice.reducer;
