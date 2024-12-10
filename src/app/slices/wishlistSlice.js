import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchWishlistAPI,
  addToWishlistAPI,
  removeFromWishlistAPI,
  clearWishlistAPI,
  moveToCartAPI,
} from './wishlistAPI';

export const fetchWishlistAsync = createAsyncThunk('wishlist/fetchWishlist', async userId => {
  return await fetchWishlistAPI(userId);
});

export const addToWishlistAsync = createAsyncThunk(
  'wishlist/addToWishlist',
  async ({ product, userId }) => {
    return await addToWishlistAPI(product, userId);
  }
);

export const removeFromWishlistAsync = createAsyncThunk('wishlist/removeFromWishlist', async id => {
  return await removeFromWishlistAPI(id);
});

export const clearWishlistAsync = createAsyncThunk('wishlist/clearWishlist', async ids => {
  return await clearWishlistAPI(ids);
});

export const moveToCartAsync = createAsyncThunk(
  'wishlist/moveToCart',
  async ({ id, product, userId }) => {
    const cartItem = await moveToCartAPI(id, product, userId);
    return { cartItem, id };
  }
);

const initialState = {
  status: 'idle',
  items: [],
  error: null,
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist(state, action) {
      state.items.push(action.payload);
    },
    removeFromWishlist(state, action) {
      const index = state.items.findIndex(item => item.product.id === action.payload);

      if (index !== -1) {
        state.items.splice(index, 1);
      }
    },
    clearWishlist(state) {
      state.items = [];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchWishlistAsync.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchWishlistAsync.fulfilled, (state, action) => {
        state.status = 'succeded';
        state.items = action.payload;
      })
      .addCase(fetchWishlistAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error;
      })
      .addCase(addToWishlistAsync.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(removeFromWishlistAsync.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item.id === action.payload);
        state.items.splice(index, 1);
      })
      .addCase(clearWishlistAsync.fulfilled, state => {
        state.items = [];
      })
      .addCase(moveToCartAsync.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item.id === action.payload.id);
        state.items.splice(index, 1);
      });
  },
});

export const { addToWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;

export const selectWishlistItems = state => state.wishlist.items;

export const selectWishlistItemById = (state, id) =>
  state.wishlist.items.find(item => item.product.id === id);

export const selectWishlistCount = state => state.wishlist.items.length;

export default wishlistSlice.reducer;
