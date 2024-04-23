import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchCartItemsAPI,
  addItemToCartAPI,
  removeItemFromCartAPI,
  updateItemQuantityAPI,
  clearCartAPI,
} from './cartAPI';

export const fetchCartItems = createAsyncThunk('/cart/fetchCartItems', async userId => {
  return await fetchCartItemsAPI(userId);
});

export const addItemToCart = createAsyncThunk(
  '/cart/addItemToCart',
  async ({ product, quantity, userId }) => {
    return await addItemToCartAPI(product, quantity, userId);
  }
);

export const removeItemFromCart = createAsyncThunk('/cart/removeItemFromCart', async id => {
  return await removeItemFromCartAPI(id);
});

export const updateItemQuantity = createAsyncThunk(
  '/cart/updateItemQuantity',
  async ({ id, quantity }) => {
    return await updateItemQuantityAPI(id, quantity);
  }
);

export const clearCart = createAsyncThunk('/cart/clearCart', async ids => {
  return await clearCartAPI(ids);
});

const initialState = {
  status: 'idle',
  items: [],
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCartItems.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.status = 'succeded';
        state.items = action.payload;
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error;
      })
      .addCase(addItemToCart.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(removeItemFromCart.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item.id === action.payload);
        state.items.splice(index, 1);
      })
      .addCase(updateItemQuantity.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item.id === action.payload.id);
        state.items.splice(index, 1, action.payload);
      })
      .addCase(clearCart.fulfilled, state => {
        state.items = [];
      });
  },
});

export const selectCartItems = state => state.cart.items;

export default cartSlice.reducer;
