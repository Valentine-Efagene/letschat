import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchUserById, updateUser } from './user.api';
import { IDLE, PENDING, SUCCEEDED, FAILED } from '../../Helpers/loadingStates';

const initialState = {
  user: null,
  status: IDLE,
  error: null,
};

const fetchByIdThunk = createAsyncThunk(
  'user/fetchById',
  async (id, { rejectWithValue }) => {
    try {
      return await fetchUserById(id);
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

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
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
  },
});

export { updateUserThunk, fetchByIdThunk };
export default userSlice.reducer;
