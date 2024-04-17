import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchCartItemsAPI,
  addItemToCartAPI,
  removeItemFromCartAPI,
  updateItemQuantityAPI,
} from './cartAPI';

export const fetchCartItems = createAsyncThunk('/cart/fetchCartItems', async () => {
  return await fetchCartItemsAPI();
});

export const addItemToCart = createAsyncThunk('/cart/addItemToCart', async item => {
  return await addItemToCartAPI(item);
});

export const removeItemFromCart = createAsyncThunk('/cart/removeItemFromCart', async id => {
  await removeItemFromCartAPI(id);
  return id;
});

export const updateItemQuantity = createAsyncThunk(
  '/cart/updateItemQuantity',
  async ({ id, quantity }) => {
    return await updateItemQuantityAPI(id, quantity);
  }
);

const initialState = {
  status: 'idle',
  cartItems: [],
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
        state.cartItems = action.payload;
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error;
      })
      .addCase(addItemToCart.fulfilled, (state, action) => {
        state.cartItems.push(action.payload);
      })
      .addCase(removeItemFromCart.fulfilled, (state, action) => {
        state.cartItems = state.cartItems.filter(item => item.id !== action.payload);
      })
      .addCase(updateItemQuantity.fulfilled, (state, action) => {
        state.cartItems = state.cartItems.map(item =>
          item.id === action.payload.id ? action.payload : item
        );
      });
  },
});

export const selectCartItems = state => state.cart.cartItems;

export default cartSlice.reducer;
