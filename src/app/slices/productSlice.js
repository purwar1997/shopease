import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllProducts, getProductsByFilter } from './productApis';

export const fetchAllProducts = createAsyncThunk('/products/fetchAllProducts', async () => {
  return await getAllProducts();
});

export const fetchProductsByFilter = createAsyncThunk(
  '/products/fetchProductsByFilter',
  async filters => {
    return await getProductsByFilter(filters);
  }
);

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
      .addCase(fetchAllProducts.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.status = 'succeded';
        state.data = action.payload;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchProductsByFilter.fulfilled, (state, action) => {
        state.data = action.payload;
      });
  },
});

export default productSlice.reducer;
