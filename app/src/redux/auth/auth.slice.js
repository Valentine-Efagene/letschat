import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCurrentUser, signIn, signUp } from './auth.api';
import { IDLE, PENDING, SUCCEEDED, FAILED } from '../../Helpers/loadingStates';

const initialState = {
  user: null,
  status: IDLE,
  error: null,
};

const fetchCurrentUserThunk = createAsyncThunk(
  'auth/fetchCurrentUser',
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
  'auth/signIn',
  async (credentials, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      return await signIn(credentials);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

const signUpThunk = createAsyncThunk(
  'auth/signUp',
  async (credentials, { rejectWithValue }) => {
    try {
      return await signUp(credentials);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const authSlice = createSlice({
  name: 'auth',
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
  },
});

export { signInThunk, signUpThunk, fetchCurrentUserThunk };
export const { logout } = authSlice.actions;
export default authSlice.reducer;
