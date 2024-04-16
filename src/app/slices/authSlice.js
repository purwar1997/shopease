import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { signupUser, loginUser } from './authAPI';

export const signup = createAsyncThunk('/auth/signup', async credentials => {
  return await signupUser(credentials);
});

export const login = createAsyncThunk('/auth/login', async credentials => {
  return await loginUser(credentials);
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
