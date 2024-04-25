import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchLoggedInUserAPI } from './userAPI';

export const fetchLoggedInUser = createAsyncThunk('/user/fetchLoggedInUser', async userId => {
  return await fetchLoggedInUserAPI(userId);
});

const initialState = {
  status: 'idle',
  userInfo: null,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchLoggedInUser.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchLoggedInUser.fulfilled, (state, action) => {
        state.status = 'succeded';
        state.userInfo = action.payload;
      })
      .addCase(fetchLoggedInUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error;
      });
  },
});

export const selectUserInfo = state => state.user.userInfo;

export default userSlice.reducer;
