import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getProductsByFilter, getCategories, getBrands, getProductById } from './productApis';

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

export const fetchProductById = createAsyncThunk('/products/fetchProductById', async productId => {
  return await getProductById(productId);
});

const initialState = {
  status: 'idle',
  products: [],
  brands: [],
  categories: [],
  selectedProduct: {},
  productCount: 0,
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
        state.products = action.payload.products;
        state.count = action.payload.count;
      })
      .addCase(fetchProductsByFilter.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchBrands.fulfilled, (state, action) => {
        state.brands = action.payload;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addCase(fetchProductById.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.status = 'succeded';
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default productSlice.reducer;
