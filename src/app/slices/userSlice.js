import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchLoggedInUserAPI,
  signupAPI,
  loginAPI,
  logoutAPI,
  updateProfileAPI,
  deleteAccountAPI,
} from './userAPI';

export const fetchLoggedInUserAsync = createAsyncThunk('user/fetchLoggedInUser', async id => {
  return await fetchLoggedInUserAPI(id);
});

export const signupAsync = createAsyncThunk('user/signup', async signupInfo => {
  return await signupAPI(signupInfo);
});

export const loginAsync = createAsyncThunk('user/login', async loginInfo => {
  return await loginAPI(loginInfo);
});

export const logoutAsync = createAsyncThunk('user/logout', async () => {
  return await logoutAPI();
});

export const updateProfileAsync = createAsyncThunk(
  'user/updateProfile',
  async ({ id, updates }) => {
    return await updateProfileAPI(id, updates);
  }
);

export const deleteAccountAsync = createAsyncThunk('user/deleteAccount', async id => {
  return await deleteAccountAPI(id);
});

const initialState = {
  loggedInUser: null,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchLoggedInUserAsync.fulfilled, (state, action) => {
        state.loggedInUser = action.payload;
      })
      .addCase(fetchLoggedInUserAsync.rejected, (state, action) => {
        state.error = action.error;
      })
      .addCase(signupAsync.fulfilled, (state, action) => {
        state.loggedInUser = action.payload;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.loggedInUser = action.payload;
      })
      .addCase(logoutAsync.fulfilled, state => {
        state.loggedInUser = null;
      })
      .addCase(updateProfileAsync.fulfilled, (state, action) => {
        state.loggedInUser = action.payload;
      })
      .addCase(deleteAccountAsync.fulfilled, state => {
        state.loggedInUser = null;
      });
  },
});

export const selectLoggedInUser = state => state.user.loggedInUser;

export default userSlice.reducer;
