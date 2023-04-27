import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchMessages,
  sendMessage,
  fetchCountByContactId,
  fetchLastMessages,
} from './message.api';
import { IDLE, PENDING, SUCCEEDED, FAILED } from '../../helpers/loadingStates';
import { IMessage } from '../../types/message';
import { PURGE } from 'redux-persist';

interface IState {
  messages: IMessage[];
  target?: string;
  status: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: any;
  count: null;
  typing: string[];
  peers: string[];
  lastMessages: IMessage[];
}

const initialState: IState = {
  messages: [],
  target: undefined,
  status: IDLE,
  error: null,
  count: null,
  typing: [],
  peers: [],
  lastMessages: [],
};

const fetchMessagesThunk = createAsyncThunk(
  'message/fetch',
  async ({ target, page, limit }: any, { rejectWithValue }) => {
    if (target == null) return null;

    try {
      const result = await fetchMessages(target, page, limit);
      return result;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

const fetchLastMessagesThunk = createAsyncThunk(
  'message/fetchLast',
  async (contacts: any, { rejectWithValue }) => {
    if (contacts == null || contacts?.length < 1) return null;

    try {
      const result = await fetchLastMessages(contacts);
      return result;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

const fetchCountByContactIdThunk = createAsyncThunk(
  'message/count',
  async (contactId: string, { rejectWithValue }) => {
    if (contactId == null) return null;

    try {
      const result = await fetchCountByContactId(contactId);
      return result;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

const sendMessageThunk = createAsyncThunk(
  'message/send',
  async (data: any, { rejectWithValue }) => {
    try {
      return await sendMessage(data);
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    appendMessage: (state, { payload }: { payload: IMessage }) => {
      state.messages.push(payload);
      state.lastMessages = getUpdatedLastMessages({ ...state }, payload);
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
    setPeers: (state, { payload }) => {
      state.peers = payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(PURGE, () => {
      return initialState;
    });

    builder.addCase(fetchMessagesThunk.fulfilled, (state, { payload }) => {
      state.messages = payload;
      state.status = SUCCEEDED;
    });
    builder.addCase(fetchMessagesThunk.pending, (state, { payload }) => {
      state.status = PENDING;
    });
    builder.addCase(fetchMessagesThunk.rejected, (state, { payload }) => {
      state.status = FAILED;
    });

    builder.addCase(fetchLastMessagesThunk.fulfilled, (state, { payload }) => {
      //alert(JSON.stringify(payload));
      // console.log(JSON.stringify(payload));
      state.lastMessages = payload;
      state.status = SUCCEEDED;
    });
    builder.addCase(fetchLastMessagesThunk.pending, (state, { payload }) => {
      state.status = PENDING;
    });
    builder.addCase(fetchLastMessagesThunk.rejected, (state, { payload }) => {
      //alert(JSON.stringify(payload));
      // console.log(JSON.stringify(payload));
      state.status = FAILED;
    });

    builder.addCase(sendMessageThunk.fulfilled, (state, { payload }) => {
      state.messages = [...state.messages, payload];
      state.lastMessages = getUpdatedLastMessages(state, payload);
      state.status = SUCCEEDED;
    });
    builder.addCase(sendMessageThunk.pending, (state, { payload }) => {
      state.status = PENDING;
    });
    builder.addCase(sendMessageThunk.rejected, (state, { payload }) => {
      state.error = payload;
      state.status = FAILED;
    });

    builder.addCase(
      fetchCountByContactIdThunk.fulfilled,
      (state, { payload }) => {
        state.count = payload;
        state.status = SUCCEEDED;
      },
    );
    builder.addCase(
      fetchCountByContactIdThunk.pending,
      (state, { payload }) => {
        state.status = PENDING;
      },
    );
    builder.addCase(
      fetchCountByContactIdThunk.rejected,
      (state, { payload }) => {
        state.error = payload;
        state.status = FAILED;
      },
    );
  },
});

function getUpdatedLastMessages(state: IState, newMessage: IMessage) {
  const { sender, receiver } = newMessage;

  const focus = state.lastMessages.findIndex(message => {
    if (message == null) return null;

    return (
      (message.sender === sender && message.receiver === receiver) ||
      (message.sender === receiver && message.receiver === sender)
    );
  });

  if (focus == null) {
    state.lastMessages = [...state.lastMessages, newMessage];
  } else {
    state.lastMessages[focus] = newMessage;
  }

  return state.lastMessages;
}

export {
  sendMessageThunk,
  fetchLastMessagesThunk,
  fetchMessagesThunk,
  fetchCountByContactIdThunk,
};
export const {
  appendMessage,
  setTarget,
  setMessages,
  pushTyping,
  removeTyping,
  setPeers,
} = messageSlice.actions;
export default messageSlice.reducer;
