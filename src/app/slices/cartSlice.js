import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchCartAPI,
  addToCartAPI,
  removeFromCartAPI,
  updateQuantityAPI,
  clearCartAPI,
  moveToWishlistAPI,
} from './cartAPI';

export const fetchCartAsync = createAsyncThunk('cart/fetchCart', async userId => {
  return await fetchCartAPI(userId);
});

export const addToCartAsync = createAsyncThunk(
  'cart/addToCart',
  async ({ product, quantity, userId }) => {
    return await addToCartAPI(product, quantity, userId);
  }
);

export const removeFromCartAsync = createAsyncThunk('cart/removeFromCart', async id => {
  return await removeFromCartAPI(id);
});

export const updateQuantityAsync = createAsyncThunk(
  'cart/updateQuantity',
  async ({ id, quantity }) => {
    return await updateQuantityAPI(id, quantity);
  }
);

export const clearCartAsync = createAsyncThunk('cart/clearCart', async ids => {
  return await clearCartAPI(ids);
});

export const moveToWishlistAsync = createAsyncThunk(
  'cart/moveToWishlist',
  async ({ id, product, userId }) => {
    const wishlistItem = await moveToWishlistAPI(id, product, userId);
    return { wishlistItem, id };
  }
);

const initialState = {
  status: 'idle',
  items: [],
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      state.items.push(action.payload);
    },
    updateQuantity(state, action) {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      state.items.splice(index, 1, action.payload);
    },
    removeFromCart(state, action) {
      const index = state.items.findIndex(item => item.product.id === action.payload);

      if (index !== -1) {
        state.items.splice(index, 1);
      }
    },
    clearCart(state) {
      state.items = [];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCartAsync.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchCartAsync.fulfilled, (state, action) => {
        state.status = 'succeded';
        state.items = action.payload;
      })
      .addCase(fetchCartAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error;
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(removeFromCartAsync.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item.id === action.payload);
        state.items.splice(index, 1);
      })
      .addCase(updateQuantityAsync.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item.id === action.payload.id);
        state.items.splice(index, 1, action.payload);
      })
      .addCase(clearCartAsync.fulfilled, state => {
        state.items = [];
      })
      .addCase(moveToWishlistAsync.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item.id === action.payload.id);
        state.items.splice(index, 1);
      });
  },
});

export const { addToCart, updateQuantity, removeFromCart, clearCart } = cartSlice.actions;

export const selectCartItems = state => state.cart.items;

export const selectCartItemById = (state, id) =>
  state.cart.items.find(item => item.product.id === id);

export const selectCartCount = state =>
  state.cart.items.reduce((count, item) => count + item.quantity, 0);

export default cartSlice.reducer;
