import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchOrdersAPI,
  fetchOrderByIdAPI,
  createNewOrderAPI,
  updateOrderStatusAPI,
} from './orderAPI';

export const fetchOrders = createAsyncThunk('/orders/fetchOrders', async userId => {
  return await fetchOrdersAPI(userId);
});

export const fetchOrderById = createAsyncThunk('/orders/fetchOrderById', async id => {
  return await fetchOrderByIdAPI(id);
});

export const createNewOrder = createAsyncThunk(
  '/orders/createNewOrder',
  async ({ order, userId }) => {
    return await createNewOrderAPI(order, userId);
  }
);

export const updateOrderStatus = createAsyncThunk(
  '/orders/updateOrderStatus',
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
      .addCase(fetchOrders.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = 'succeded';
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error;
      })
      .addCase(createNewOrder.fulfilled, (state, action) => {
        state.orders.push(action.payload);
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const index = state.orders.findIndex(order => order.id === action.payload.id);
        state.orders[index] = action.payload;
      })
      .addCase(fetchOrderById.pending, state => {
        state.selectedOrderStatus = 'loading';
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.selectedOrderStatus = 'succeded';
        state.selectedOrder = action.payload;
      })
      .addCase(fetchOrderById.rejected, (state, action) => {
        state.selectedOrderStatus = 'failed';
        state.selectedOrderError = action.error;
      });
  },
});

export default orderSlice.reducer;
