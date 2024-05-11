import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchLoggedInUserAPI,
  signupAPI,
  loginAPI,
  logoutAPI,
  updateProfileAPI,
  deleteAccountAPI,
  fetchAllUsersAPI,
  updateUserRoleAPI,
  deleteUserAPI,
  fetchAdminsAPI,
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

export const fetchAllUsersAsync = createAsyncThunk('user/fetchAllUsers', async pagination => {
  return await fetchAllUsersAPI(pagination);
});

export const updateUserRoleAsync = createAsyncThunk(
  'user/updateUserRole',
  async ({ id, role, user }) => {
    return await updateUserRoleAPI(id, role, user);
  }
);

export const deleteUserAsync = createAsyncThunk(
  'user/deleteUser',
  async ({ user, loggedInUser }) => {
    await deleteUserAPI(user.id, loggedInUser);
    return { user, loggedInUser };
  }
);

export const fetchAdminsAsync = createAsyncThunk('user/fetchAdmins', async () => {
  return await fetchAdminsAPI();
});

const initialState = {
  loggedInUser: null,
  error: null,
  allUsersStatus: 'idle',
  allUsers: [],
  allUsersError: null,
  userCount: 0,
  adminStatus: null,
  admins: [],
  adminError: null,
  adminCount: 0,
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
      })
      .addCase(fetchAllUsersAsync.pending, state => {
        state.allUsersStatus = 'loading';
      })
      .addCase(fetchAllUsersAsync.fulfilled, (state, action) => {
        state.allUsersStatus = 'succeded';
        state.allUsers = action.payload.users;
        state.userCount = action.payload.count;
      })
      .addCase(fetchAllUsersAsync.rejected, (state, action) => {
        state.allUsersStatus = 'failed';
        state.allUsersError = action.error;
      })
      .addCase(updateUserRoleAsync.fulfilled, (state, action) => {
        const index = state.allUsers.findIndex(user => user.id === action.payload.id);
        state.allUsers.splice(index, 1, action.payload);

        state.admins = state.allUsers.filter(user => user.role === 'admin');
        state.adminCount = state.admins.length;
      })
      .addCase(deleteUserAsync.fulfilled, (state, action) => {
        const { user, loggedInUser } = action.payload;

        if (user.role === 'admin') {
          state.admins = state.admins.filter(admin => admin.id !== user.id);
          state.adminCount = state.admins.length;
        }

        if (user.id === loggedInUser.id) {
          state.loggedInUser = null;
        }
      })
      .addCase(fetchAdminsAsync.pending, state => {
        state.adminStatus = 'loading';
      })
      .addCase(fetchAdminsAsync.fulfilled, (state, action) => {
        state.adminStatus = 'succeded';
        state.admins = action.payload;
        state.adminCount = action.payload.length;
      })
      .addCase(fetchAdminsAsync.rejected, (state, action) => {
        state.adminStatus = 'failed';
        state.adminError = action.error;
      });
  },
});

export const selectLoggedInUser = state => state.user.loggedInUser;

export default userSlice.reducer;
