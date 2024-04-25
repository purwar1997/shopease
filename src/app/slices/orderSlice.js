import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchOrdersAPI,
  fetchOrderByIdAPI,
  createNewOrderAPI,
  updateOrderStatusAPI,
} from './orderAPI';

export const fetchOrdersAsync = createAsyncThunk('orders/fetchOrders', async userId => {
  return await fetchOrdersAPI(userId);
});

export const fetchOrderByIdAsync = createAsyncThunk('orders/fetchOrderById', async id => {
  return await fetchOrderByIdAPI(id);
});

export const createNewOrderAsync = createAsyncThunk(
  'orders/createNewOrder',
  async ({ order, userId }) => {
    return await createNewOrderAPI(order, userId);
  }
);

export const updateOrderStatusAsync = createAsyncThunk(
  'orders/updateOrderStatus',
  async ({ id, orderStatus }) => {
    return await updateOrderStatusAPI(id, orderStatus);
  }
);

const initialState = {
  status: 'idle',
  orders: [],
  error: null,
  selectedOrderStatus: 'idle',
  selectedOrder: null,
  selectedOrderError: null,
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOrdersAsync.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchOrdersAsync.fulfilled, (state, action) => {
        state.status = 'succeded';
        state.orders = action.payload;
      })
      .addCase(fetchOrdersAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error;
      })
      .addCase(createNewOrderAsync.fulfilled, (state, action) => {
        state.orders.push(action.payload);
      })
      .addCase(updateOrderStatusAsync.fulfilled, (state, action) => {
        const index = state.orders.findIndex(order => order.id === action.payload.id);
        state.orders.splice(index, 1, action.payload);
      })
      .addCase(fetchOrderByIdAsync.pending, state => {
        state.selectedOrderStatus = 'loading';
      })
      .addCase(fetchOrderByIdAsync.fulfilled, (state, action) => {
        state.selectedOrderStatus = 'succeded';
        state.selectedOrder = action.payload;
      })
      .addCase(fetchOrderByIdAsync.rejected, (state, action) => {
        state.selectedOrderStatus = 'failed';
        state.selectedOrderError = action.error;
      });
  },
});

export default orderSlice.reducer;
