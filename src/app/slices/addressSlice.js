import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchAddressesAPI,
  addNewAddressAPI,
  updateAddressAPI,
  deleteAddressAPI,
  setAsDefaultAPI,
} from './addressAPI';

export const fetchAddressesAsync = createAsyncThunk('address/fetchAddresses', async userId => {
  return await fetchAddressesAPI(userId);
});

export const addNewAddressAsync = createAsyncThunk(
  'address/addNewAddress',
  async ({ address, userId }) => {
    const newAddress = await addNewAddressAPI(address, userId);
    return { address: newAddress, default: address.default };
  }
);

export const updateAddressAsync = createAsyncThunk(
  'address/updateAddress',
  async ({ id, updates }) => {
    const address = await updateAddressAPI(id, updates);
    return { address, default: updates.default };
  }
);

export const deleteAddressAsync = createAsyncThunk('address/deleteAddress', async id => {
  return await deleteAddressAPI(id);
});

export const setAsDefaultAsync = createAsyncThunk('address/setAsDefault', async id => {
  return await setAsDefaultAPI(id);
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
      .addCase(fetchAddressesAsync.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchAddressesAsync.fulfilled, (state, action) => {
        state.status = 'succeded';
        state.addresses = action.payload;
      })
      .addCase(fetchAddressesAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error;
      })
      .addCase(addNewAddressAsync.fulfilled, (state, action) => {
        const defaultAddress = state.addresses.find(address => address.default);

        if (action.payload.default) {
          defaultAddress.default = false;
        }

        state.addresses.push(action.payload.address);
      })
      .addCase(updateAddressAsync.fulfilled, (state, action) => {
        const defaultAddress = state.addresses.find(address => address.default);

        if (action.payload.default) {
          defaultAddress.default = false;
        }

        const index = state.addresses.findIndex(
          address => address.id === action.payload.address.id
        );

        state.addresses.splice(index, 1, action.payload.address);
      })
      .addCase(deleteAddressAsync.fulfilled, (state, action) => {
        const index = state.addresses.findIndex(address => address.id === action.payload);
        state.addresses.splice(index, 1);
      })
      .addCase(setAsDefaultAsync.fulfilled, (state, action) => {
        const defaultAddress = state.addresses.find(address => address.default);
        defaultAddress.default = false;
        
        const index = state.addresses.findIndex(address => address.id === action.payload.id);
        state.addresses.splice(index, 1, action.payload);
      });
  },
});

export const selectAddresses = state => state.address.addresses;

export const selectAddressById = (state, id) =>
  state.address.addresses.find(address => address.id === id);

export const selectDefaultAddress = state =>
  state.address.addresses.find(address => address.default);

export default addressSlice.reducer;
