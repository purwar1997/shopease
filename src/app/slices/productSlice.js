import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllProducts, getProductsByFilter, getCategories, getBrands } from './productApis';

// export const fetchAllProducts = createAsyncThunk('/products/fetchAllProducts', async () => {
//   return await getAllProducts();
// });

export const fetchProductsByFilter = createAsyncThunk(
  '/products/fetchProductsByFilter',
  async ({ filters, sort, pagination }) => {
    return await getProductsByFilter(filters, sort, pagination);
  }
);

export const fetchCategories = createAsyncThunk('/products/fetchCategories', async () => {
  return await getCategories();
});

export const fetchBrands = createAsyncThunk('/products/fetchBrands', async () => {
  return await getBrands();
});

const initialState = {
  status: 'idle',
  data: [],
  count: 0,
  categories: [],
  brands: [],
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
        state.data = action.payload.products;
        state.count = action.payload.count;
      })
      .addCase(fetchProductsByFilter.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addCase(fetchBrands.fulfilled, (state, action) => {
        state.brands = action.payload;
      });
  },
});

export default productSlice.reducer;
