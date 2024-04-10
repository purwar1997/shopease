import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllProducts, getProductsByFilter } from './productApis';

// export const fetchAllProducts = createAsyncThunk('/products/fetchAllProducts', async () => {
//   return await getAllProducts();
// });

export const fetchProductsByFilter = createAsyncThunk(
  '/products/fetchProductsByFilter',
  async ({ filters, sort, pagination }) => {
    return await getProductsByFilter(filters, sort,pagination);
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
      .addCase(fetchProductsByFilter.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchProductsByFilter.fulfilled, (state, action) => {
        state.status = 'succeded';
        state.data = action.payload;
      })
      .addCase(fetchProductsByFilter.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
  },
});

export default productSlice.reducer;