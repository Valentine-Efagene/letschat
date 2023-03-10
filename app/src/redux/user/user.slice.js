import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  addContactById,
  fetchUserById,
  updateUser,
  removeContactById,
  fetchContacts,
  fetchAllUsers,
  signIn,
  signUp,
  fetchCurrentUser,
  fetchTotal,
} from './user.api';
import { IDLE, PENDING, SUCCEEDED, FAILED } from '../../Helpers/loadingStates';

const initialState = {
  user: null,
  users: null,
  status: IDLE,
  error: null,
  contacts: null,
  total: null,
};

const fetchCurrentUserThunk = createAsyncThunk(
  'user/fetchCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetchCurrentUser();
      return res;
    } catch (error) {
      rejectWithValue(error);
    }
  },
);

const signInThunk = createAsyncThunk(
  'user/signIn',
  async (credentials, { rejectWithValue }) => {
    try {
      return await signIn(credentials);
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const signUpThunk = createAsyncThunk(
  'user/signUp',
  async (credentials, { rejectWithValue }) => {
    try {
      return await signUp(credentials);
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const fetchTotalThunk = createAsyncThunk(
  'user/fetchTotal',
  async (_, { rejectWithValue }) => {
    try {
      return await fetchTotal();
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const fetchByIdThunk = createAsyncThunk(
  'user/fetchById',
  async (id, { rejectWithValue }) => {
    if (id == null) return null;

    try {
      const response = await fetchUserById(id);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const fetchAllUsersThunk = createAsyncThunk(
  'user/fetchAllUsers',
  async (page, { rejectWithValue }) => {
    try {
      return await fetchAllUsers(page);
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const updateUserThunk = createAsyncThunk(
  'user/updateUser',
  async (data, { rejectWithValue }) => {
    try {
      const res = await updateUser(data);
      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const addContactThunk = createAsyncThunk(
  'user/addContact',
  async (contactId, { rejectWithValue }) => {
    try {
      return await addContactById(contactId);
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const removeContactThunk = createAsyncThunk(
  'user/removeContact',
  async (contactId, { rejectWithValue }) => {
    try {
      return await removeContactById(contactId);
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const fetchContactsThunk = createAsyncThunk(
  'user/fetchContacts',
  async (_, { rejectWithValue }) => {
    try {
      return await fetchContacts();
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: state => {
      localStorage.clear();
      state.user = null;
    },
  },
  extraReducers: buiilder => {
    buiilder.addCase(fetchCurrentUserThunk.fulfilled, (state, { payload }) => {
      state.user = payload;
      state.status = SUCCEEDED;
    });
    buiilder.addCase(fetchCurrentUserThunk.pending, (state, { payload }) => {
      state.status = PENDING;
    });
    buiilder.addCase(fetchCurrentUserThunk.rejected, (state, { payload }) => {
      state.error = payload;
      state.status = FAILED;
    });

    buiilder.addCase(signInThunk.fulfilled, (state, { payload }) => {
      state.user = payload;
      state.status = SUCCEEDED;
    });
    buiilder.addCase(signInThunk.pending, (state, { payload }) => {
      state.status = PENDING;
    });
    buiilder.addCase(signInThunk.rejected, (state, { payload }) => {
      state.error = payload;
      state.status = FAILED;
    });

    buiilder.addCase(fetchTotalThunk.fulfilled, (state, { payload }) => {
      state.total = payload;
      state.status = SUCCEEDED;
    });
    buiilder.addCase(fetchTotalThunk.pending, (state, { payload }) => {
      state.status = PENDING;
    });
    buiilder.addCase(fetchTotalThunk.rejected, (state, { payload }) => {
      state.error = payload;
      state.status = FAILED;
    });

    buiilder.addCase(signUpThunk.fulfilled, (state, { payload }) => {
      state.user = payload;
      state.status = SUCCEEDED;
    });
    buiilder.addCase(signUpThunk.pending, (state, { payload }) => {
      state.status = PENDING;
    });
    buiilder.addCase(signUpThunk.rejected, (state, { payload }) => {
      state.error = payload;
      state.status = FAILED;
    });

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
      state.user = payload?.data;
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
      state.contacts = payload;
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
      state.error = null;
    });
    buiilder.addCase(fetchAllUsersThunk.pending, (state, { payload }) => {
      state.error = null;
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
  signInThunk,
  signUpThunk,
  fetchCurrentUserThunk,
  fetchTotalThunk,
};
export const { logout } = userSlice.actions;
export default userSlice.reducer;
