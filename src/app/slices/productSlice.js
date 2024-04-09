import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getProducts } from './productApis';

export const fetchProducts = createAsyncThunk('/products/fetchProducts', async queryString => {
  return await getProducts(queryString);
});

const initialState = {
  status: 'idle',
  data: [],
  error: null,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchProducts.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeded';
        state.data = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default productSlice.reducer;
