import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchMessages,
  sendMessage,
  fetchCountByContactId,
  fetchLastMessages,
} from './message.api';
import { IDLE, PENDING, SUCCEEDED, FAILED } from '../../Helpers/loadingStates';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile } from '@fortawesome/free-solid-svg-icons';

const initialState = {
  messages: null,
  target: null,
  status: IDLE,
  error: null,
  count: null,
  typing: [],
  peers: [],
  lastMessages: [],
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

const fetchLastMessagesThunk = createAsyncThunk(
  'message/fetchLast',
  async (contacts, { rejectWithValue }) => {
    if (contacts == null || contacts?.length < 1) return null;

    try {
      const result = await fetchLastMessages(contacts);
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

    buiilder.addCase(fetchLastMessagesThunk.fulfilled, (state, { payload }) => {
      //alert(JSON.stringify(payload));
      // console.log(JSON.stringify(payload));
      state.lastMessages = payload;
      state.status = SUCCEEDED;
    });
    buiilder.addCase(fetchLastMessagesThunk.pending, (state, { payload }) => {
      state.status = PENDING;
    });
    buiilder.addCase(fetchLastMessagesThunk.rejected, (state, { payload }) => {
      //alert(JSON.stringify(payload));
      // console.log(JSON.stringify(payload));
      state.status = FAILED;
    });

    buiilder.addCase(sendMessageThunk.fulfilled, (state, { payload }) => {
      state.messages = [...state.messages, payload];
      state.lastMessages = getUpdatedLastMessages(state, payload);
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

function getUpdatedLastMessages(state, newMessage) {
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
