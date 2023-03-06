import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchMessages,
  sendMessage,
  fetchCountByContactId,
} from './message.api';
import { IDLE, PENDING, SUCCEEDED, FAILED } from '../../Helpers/loadingStates';

const initialState = {
  messages: null,
  target: null,
  status: IDLE,
  error: null,
  count: null,
  typing: [],
};

const fetchMessagesThunk = createAsyncThunk(
  'message/fetch',
  async ({ target, page, limit }, { rejectWithValue }) => {
    if (target == null) return null;

    try {
      const result = await fetchMessages(target, page, limit);
      return result;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

const fetchCountByContactIdThunk = createAsyncThunk(
  'message/count',
  async (contactId, { rejectWithValue }) => {
    if (contactId == null) return null;

    try {
      const result = await fetchCountByContactId(contactId);
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
    pushTyping: (state, { payload }) => {
      if (state.typing.find(_user => _user === payload)) return;

      state.typing = [...state.typing, payload];
    },
    removeTyping: (state, { payload }) => {
      state.typing = state.typing?.filter(_typing => _typing !== payload);
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
      state.messages = [...state.messages, payload];
      state.status = SUCCEEDED;
    });
    buiilder.addCase(sendMessageThunk.pending, (state, { payload }) => {
      state.status = PENDING;
    });
    buiilder.addCase(sendMessageThunk.rejected, (state, { payload }) => {
      state.error = payload;
      state.status = FAILED;
    });

    buiilder.addCase(
      fetchCountByContactIdThunk.fulfilled,
      (state, { payload }) => {
        state.count = payload;
        state.status = SUCCEEDED;
      },
    );
    buiilder.addCase(
      fetchCountByContactIdThunk.pending,
      (state, { payload }) => {
        state.status = PENDING;
      },
    );
    buiilder.addCase(
      fetchCountByContactIdThunk.rejected,
      (state, { payload }) => {
        state.error = payload;
        state.status = FAILED;
      },
    );
  },
});

export { sendMessageThunk, fetchMessagesThunk, fetchCountByContactIdThunk };
export const {
  appendMessage,
  setTarget,
  setMessages,
  pushTyping,
  removeTyping,
} = messageSlice.actions;
export default messageSlice.reducer;
