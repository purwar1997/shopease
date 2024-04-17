import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { signupAPI, loginAPI } from './authAPI';

export const signup = createAsyncThunk('/auth/signup', async credentials => {
  return await signupAPI(credentials);
});

export const login = createAsyncThunk('/auth/login', async credentials => {
  return await loginAPI(credentials);
});

const initialState = {
  loggedInUser: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(signup.fulfilled, (state, action) => {
        state.loggedInUser = action.payload;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loggedInUser = action.payload;
      });
  },
});

export const selectLoggedInUser = state => state.auth.loggedInUser;

export default authSlice.reducer;
