import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  addContactById,
  fetchUserById,
  updateUser,
  removeContactById,
  fetchContacts,
  fetchAllUsers,
} from './user.api';
import { IDLE, PENDING, SUCCEEDED, FAILED } from '../../Helpers/loadingStates';

const initialState = {
  user: null,
  users: null,
  status: IDLE,
  error: null,
};

const fetchByIdThunk = createAsyncThunk(
  'user/fetchById',
  async (id, { rejectWithValue }) => {
    if (id == null) return null;

    try {
      return await fetchUserById(id);
    } catch (error) {
      rejectWithValue(error);
    }
  },
);

const fetchAllUsersThunk = createAsyncThunk(
  'user/fetchAllUsers',
  async (id, { rejectWithValue }) => {
    try {
      return await fetchAllUsers();
    } catch (error) {
      rejectWithValue(error);
    }
  },
);

const updateUserThunk = createAsyncThunk(
  'user/updateUser',
  async (data, { rejectWithValue }) => {
    try {
      return await updateUser(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

const addContactThunk = createAsyncThunk(
  'user/addContact',
  async (contactId, { rejectWithValue }) => {
    try {
      return await addContactById(contactId);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

const removeContactThunk = createAsyncThunk(
  'user/removeContact',
  async (contactId, { rejectWithValue }) => {
    try {
      return await removeContactById(contactId);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

const fetchContactsThunk = createAsyncThunk(
  'user/fetchContacts',
  async (contactId, { rejectWithValue }) => {
    try {
      return await fetchContacts(contactId);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentChatMate: (state, { payload }) => {
      state.chatMate = payload;
    },
  },
  extraReducers: buiilder => {
    buiilder.addCase(fetchByIdThunk.fulfilled, (state, { payload }) => {
      state.user = payload;
      state.status = SUCCEEDED;
    });
    buiilder.addCase(fetchByIdThunk.pending, (state, { payload }) => {
      state.status = PENDING;
    });
    buiilder.addCase(fetchByIdThunk.rejected, (state, { payload }) => {
      state.error = payload;
      state.status = FAILED;
    });

    buiilder.addCase(updateUserThunk.fulfilled, (state, { payload }) => {
      state.user = payload;
      state.status = SUCCEEDED;
    });
    buiilder.addCase(updateUserThunk.pending, (state, { payload }) => {
      state.status = PENDING;
    });
    buiilder.addCase(updateUserThunk.rejected, (state, { payload }) => {
      state.error = payload;
      state.status = FAILED;
    });

    buiilder.addCase(fetchContactsThunk.fulfilled, (state, { payload }) => {
      state.user = payload;
      state.status = SUCCEEDED;
    });
    buiilder.addCase(fetchContactsThunk.pending, (state, { payload }) => {
      state.status = PENDING;
    });
    buiilder.addCase(fetchContactsThunk.rejected, (state, { payload }) => {
      state.error = payload;
      state.status = FAILED;
    });

    buiilder.addCase(removeContactThunk.fulfilled, (state, { payload }) => {
      state.user = payload;
      state.status = SUCCEEDED;
    });
    buiilder.addCase(removeContactThunk.pending, (state, { payload }) => {
      state.status = PENDING;
    });
    buiilder.addCase(removeContactThunk.rejected, (state, { payload }) => {
      state.error = payload;
      state.status = FAILED;
    });

    buiilder.addCase(addContactThunk.fulfilled, (state, { payload }) => {
      state.user = payload;
      state.status = SUCCEEDED;
    });
    buiilder.addCase(addContactThunk.pending, (state, { payload }) => {
      state.status = PENDING;
    });
    buiilder.addCase(addContactThunk.rejected, (state, { payload }) => {
      state.error = payload;
      state.status = FAILED;
    });

    buiilder.addCase(fetchAllUsersThunk.fulfilled, (state, { payload }) => {
      state.users = payload;
      state.status = SUCCEEDED;
    });
    buiilder.addCase(fetchAllUsersThunk.pending, (state, { payload }) => {
      state.status = PENDING;
    });
    buiilder.addCase(fetchAllUsersThunk.rejected, (state, { payload }) => {
      state.error = payload;
      state.status = FAILED;
    });
  },
});

export {
  updateUserThunk,
  fetchByIdThunk,
  addContactThunk,
  removeContactThunk,
  fetchContactsThunk,
  fetchAllUsersThunk,
};
export const { setCurrentChatMate } = userSlice.actions;
export default userSlice.reducer;
