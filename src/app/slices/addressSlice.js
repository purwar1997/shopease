import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchUserAddressesAPI,
  addNewAddressAPI,
  updateAddressAPI,
  deleteAddressAPI,
} from './addressAPI';

export const fetchUserAddresses = createAsyncThunk('/address/fetchUserAddress', async userId => {
  return await fetchUserAddressesAPI(userId);
});

export const addNewAddress = createAsyncThunk(
  '/address/addNewAddress',
  async ({ address, userId }) => {
    return await addNewAddressAPI(address, userId);
  }
);

export const updateAddress = createAsyncThunk('/address/updateAddress', async ({ id, updates }) => {
  return await updateAddressAPI(id, updates);
});

export const deleteAddress = createAsyncThunk('/address/deleteAddress', async id => {
  return await deleteAddressAPI(id);
});

const initialState = {
  status: 'idle',
  addresses: [],
  error: null,
};

const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUserAddresses.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchUserAddresses.fulfilled, (state, action) => {
        state.status = 'succeded';
        state.addresses = action.payload;
      })
      .addCase(fetchUserAddresses.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error;
      })
      .addCase(addNewAddress.fulfilled, (state, action) => {
        state.addresses.push(action.payload);
      })
      .addCase(updateAddress.fulfilled, (state, action) => {
        const index = state.addresses.findIndex(address => address.id === action.payload.id);
        state.addresses.splice(index, 1, action.payload);
      })
      .addCase(deleteAddress.fulfilled, (state, action) => {
        const index = state.addresses.findIndex(address => address.id === action.payload);
        state.addresses.splice(index, 1);
      });
  },
});

export default addressSlice.reducer;
