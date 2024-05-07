import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchUserOrdersAPI,
  fetchOrderByIdAPI,
  createNewOrderAPI,
  fetchAllOrdersAPI,
  updateOrderStatusAPI,
} from './orderAPI';

export const fetchUserOrdersAsync = createAsyncThunk('orders/fetchUserOrders', async userId => {
  return await fetchUserOrdersAPI(userId);
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

export const fetchAllOrdersAsync = createAsyncThunk('orders/fetchAllOrders', async () => {
  return await fetchAllOrdersAPI();
});

export const updateOrderStatusAsync = createAsyncThunk(
  'orders/updateOrderStatus',
  async ({ user, id, status }) => {
    return await updateOrderStatusAPI(user, id, status);
  }
);

const initialState = {
  status: 'idle',
  orders: [],
  error: null,
  selectedOrderStatus: 'idle',
  selectedOrder: null,
  selectedOrderError: null,
  allOrdersStatus: 'idle',
  allOrders: [],
  allOrdersError: null,
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUserOrdersAsync.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchUserOrdersAsync.fulfilled, (state, action) => {
        state.status = 'succeded';
        state.orders = action.payload;
      })
      .addCase(fetchUserOrdersAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error;
      })
      .addCase(createNewOrderAsync.fulfilled, (state, action) => {
        state.orders.push(action.payload);
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
      })
      .addCase(fetchAllOrdersAsync.pending, state => {
        state.allOrdersStatus = 'loading';
      })
      .addCase(fetchAllOrdersAsync.fulfilled, (state, action) => {
        state.allOrdersStatus = 'succeded';
        state.allOrders = action.payload;
      })
      .addCase(fetchAllOrdersAsync.rejected, (state, action) => {
        state.allOrdersStatus = 'failed';
        state.allOrders = action.error;
      })
      .addCase(updateOrderStatusAsync.fulfilled, (state, action) => {
        const index = state.allOrders.findIndex(order => order.id === action.payload.id);
        state.allOrders.splice(index, 1, action.payload);
      });
  },
});

export default orderSlice.reducer;
