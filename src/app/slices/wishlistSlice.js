import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchWishlistAPI,
  addToWishlistAPI,
  removeFromWishlistAPI,
  moveToCartAPI,
} from './wishlistAPI';
import { addToCart, updateQuantity, selectCartItemById } from './cartSlice';

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

export const moveToCartAsync = createAsyncThunk(
  'wishlist/moveToCart',
  async ({ id, product, userId }, { dispatch, getState }) => {
    const response = await moveToCartAPI(id, product, userId);
    const itemPresentInCart = selectCartItemById(getState(), product.id);

    if (itemPresentInCart) {
      dispatch(updateQuantity(response));
    } else {
      dispatch(addToCart(response));
    }

    return id;
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
      .addCase(moveToCartAsync.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item.id === action.payload);
        state.items.splice(index, 1);
      });
  },
});

export const { addToWishlist } = wishlistSlice.actions;

export const selectWishlistItems = state => state.wishlist.items;

export const selectWishlistItemById = (state, id) =>
  state.wishlist.items.find(item => item.product.id === id);

export default wishlistSlice.reducer;
