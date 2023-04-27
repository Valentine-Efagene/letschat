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
import { IDLE, PENDING, SUCCEEDED, FAILED } from '../../helpers/loadingStates';
import { IUser } from '../../types/user';
import { PURGE } from 'redux-persist';
import { RootState } from '../store';

interface IState {
  user: IUser | null;
  users: IUser[];
  status: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: any;
  contacts: string[] | null;
  total: number | null;
  token: string | null | undefined;
}

const initialState: IState = {
  user: null,
  users: [],
  status: IDLE,
  error: null,
  contacts: [],
  total: null,
  token: null,
};

const fetchCurrentUserThunk = createAsyncThunk(
  'user/fetchCurrentUser',
  async (_, { rejectWithValue, getState }) => {
    try {
      const state: RootState = getState() as unknown as RootState;
      const token = state.user?.token;
      const uid = state.user?.user?.id;

      if (uid == null || token == null) {
        return rejectWithValue({ summary: 'Please sign in' });
      }

      const res = await fetchCurrentUser(uid, token);
      return res;
    } catch (error) {
      rejectWithValue(error);
    }
  },
);

const signInThunk = createAsyncThunk(
  'user/signIn',
  async (
    credentials: { email: string; password: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await signIn(credentials);
      console.log(response);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const signUpThunk = createAsyncThunk(
  'user/signUp',
  async (
    credentials: { email: string; password: string },
    { rejectWithValue },
  ) => {
    try {
      return await signUp(credentials);
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const fetchTotalThunk = createAsyncThunk(
  'user/fetchTotal',
  async (_, { rejectWithValue, getState }) => {
    try {
      const state: RootState = getState() as unknown as RootState;
      const token = state.user?.token;

      if (token == null) {
        return rejectWithValue({ summary: 'Please sign in' });
      }

      return await fetchTotal(token);
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
  async (page: number, { rejectWithValue, getState }) => {
    try {
      const state: RootState = getState() as unknown as RootState;
      const token = state.user?.token;

      if (token == null) {
        return rejectWithValue({ summary: 'Please sign in' });
      }

      return await fetchAllUsers(token, page);
    } catch (error) {
      /**
       * const err = error as AxiosError
        return rejectWithValue(ErrorHelper.simplifyAxiosError(err))
       */
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
  async (contactId: string, { rejectWithValue }) => {
    try {
      return await addContactById(contactId);
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const removeContactThunk = createAsyncThunk(
  'user/removeContact',
  async (contactId: string, { rejectWithValue }) => {
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
    logout: () => {},
  },
  extraReducers: builder => {
    builder.addCase(PURGE, () => {
      return initialState;
    });

    builder.addCase(fetchCurrentUserThunk.fulfilled, (state, { payload }) => {
      state.user = payload;
      state.status = SUCCEEDED;
    });
    builder.addCase(fetchCurrentUserThunk.pending, (state, { payload }) => {
      state.status = PENDING;
    });
    builder.addCase(fetchCurrentUserThunk.rejected, (state, { payload }) => {
      state.error = payload;
      state.status = FAILED;
    });

    builder.addCase(signInThunk.fulfilled, (state, { payload }) => {
      state.user = payload?.user;
      state.token = payload?.token;
      state.status = SUCCEEDED;
    });
    builder.addCase(signInThunk.pending, (state, { payload }) => {
      state.status = PENDING;
    });
    builder.addCase(signInThunk.rejected, (state, { payload }) => {
      state.error = payload;
      state.status = FAILED;
    });

    builder.addCase(fetchTotalThunk.fulfilled, (state, { payload }) => {
      state.total = payload;
      state.status = SUCCEEDED;
    });
    builder.addCase(fetchTotalThunk.pending, (state, { payload }) => {
      state.status = PENDING;
    });
    builder.addCase(fetchTotalThunk.rejected, (state, { payload }) => {
      state.error = payload;
      state.status = FAILED;
    });

    builder.addCase(signUpThunk.fulfilled, (state, { payload }) => {
      state.user = payload?.user;
      state.token = payload?.token;
      state.status = SUCCEEDED;
    });
    builder.addCase(signUpThunk.pending, (state, { payload }) => {
      state.status = PENDING;
    });
    builder.addCase(signUpThunk.rejected, (state, { payload }) => {
      state.error = payload;
      state.status = FAILED;
    });

    builder.addCase(fetchByIdThunk.fulfilled, (state, { payload }) => {
      state.user = payload;
      state.status = SUCCEEDED;
    });
    builder.addCase(fetchByIdThunk.pending, (state, { payload }) => {
      state.status = PENDING;
    });
    builder.addCase(fetchByIdThunk.rejected, (state, { payload }) => {
      state.error = payload;
      state.status = FAILED;
    });

    builder.addCase(updateUserThunk.fulfilled, (state, { payload }) => {
      state.user = payload?.data;
      state.status = SUCCEEDED;
    });
    builder.addCase(updateUserThunk.pending, (state, { payload }) => {
      state.status = PENDING;
    });
    builder.addCase(updateUserThunk.rejected, (state, { payload }) => {
      state.error = payload;
      state.status = FAILED;
    });

    builder.addCase(fetchContactsThunk.fulfilled, (state, { payload }) => {
      state.contacts = payload;
      state.status = SUCCEEDED;
    });
    builder.addCase(fetchContactsThunk.pending, (state, { payload }) => {
      state.status = PENDING;
    });
    builder.addCase(fetchContactsThunk.rejected, (state, { payload }) => {
      state.error = payload;
      state.status = FAILED;
    });

    builder.addCase(removeContactThunk.fulfilled, (state, { payload }) => {
      state.user = payload as unknown as IUser; // TODO
      state.status = SUCCEEDED;
    });
    builder.addCase(removeContactThunk.pending, (state, { payload }) => {
      state.status = PENDING;
    });
    builder.addCase(removeContactThunk.rejected, (state, { payload }) => {
      state.error = payload;
      state.status = FAILED;
    });

    builder.addCase(addContactThunk.fulfilled, (state, { payload }) => {
      state.user = payload;
      state.status = SUCCEEDED;
    });
    builder.addCase(addContactThunk.pending, (state, { payload }) => {
      state.status = PENDING;
    });
    builder.addCase(addContactThunk.rejected, (state, { payload }) => {
      state.error = payload;
      state.status = FAILED;
    });

    builder.addCase(fetchAllUsersThunk.fulfilled, (state, { payload }) => {
      state.users = payload;
      state.status = SUCCEEDED;
      state.error = null;
    });
    builder.addCase(fetchAllUsersThunk.pending, (state, { payload }) => {
      state.error = null;
      state.status = PENDING;
    });
    builder.addCase(fetchAllUsersThunk.rejected, (state, { payload }) => {
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
