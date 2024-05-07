import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchAddressesAPI,
  fetchAddressByIdAPI,
  addNewAddressAPI,
  updateAddressAPI,
  deleteAddressAPI,
  setAsDefaultAPI,
} from './addressAPI';

export const fetchAddressesAsync = createAsyncThunk('address/fetchAddresses', async userId => {
  return await fetchAddressesAPI(userId);
});

export const fetchAddressByIdAsync = createAsyncThunk('address/fetchAddressById', async id => {
  return await fetchAddressByIdAPI(id);
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
  async ({ id, updates, userId }) => {
    const address = await updateAddressAPI(id, updates, userId);
    return { address, default: updates.default };
  }
);

export const deleteAddressAsync = createAsyncThunk(
  'address/deleteAddress',
  async ({ id, userId }) => {
    return await deleteAddressAPI(id, userId);
  }
);

export const setAsDefaultAsync = createAsyncThunk(
  'address/setAsDefault',
  async ({ id, userId }) => {
    return await setAsDefaultAPI(id, userId);
  }
);

const initialState = {
  status: 'idle',
  addresses: [],
  error: null,
  selectedAddressStatus: 'idle',
  selectedAddress: null,
  selectedAddressError: null,
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
      .addCase(fetchAddressByIdAsync.pending, state => {
        state.selectedAddressStatus = 'loading';
      })
      .addCase(fetchAddressByIdAsync.fulfilled, (state, action) => {
        state.selectedAddressStatus = 'succeded';
        state.selectedAddress = action.payload;
      })
      .addCase(fetchAddressByIdAsync.rejected, (state, action) => {
        state.selectedAddressStatus = 'failed';
        state.selectedAddressError = action.error;
      })
      .addCase(addNewAddressAsync.fulfilled, (state, action) => {
        const defaultAddress = state.addresses.find(address => address.default);

        if (action.payload.default && defaultAddress) {
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
