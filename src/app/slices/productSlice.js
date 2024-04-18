import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchProductsByFilterAPI,
  fetchCategoriesAPI,
  fetchBrandsAPI,
  fetchProductByIdAPI,
} from './productApis';

export const fetchProductsByFilter = createAsyncThunk(
  '/products/fetchProductsByFilter',
  async ({ filters, sort, pagination }) => {
    return await fetchProductsByFilterAPI(filters, sort, pagination);
  }
);

export const fetchCategories = createAsyncThunk('/products/fetchCategories', async () => {
  return await fetchCategoriesAPI();
});

export const fetchBrands = createAsyncThunk('/products/fetchBrands', async () => {
  return await fetchBrandsAPI();
});

export const fetchProductById = createAsyncThunk('/products/fetchProductById', async id => {
  return await fetchProductByIdAPI(id);
});

const initialState = {
  status: 'idle',
  products: [],
  productCount: 0,
  error: null,
  brands: [],
  categories: [],
  selectedProduct: null,
  selectedProductStatus: 'idle',
  selectedProductError: null,
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
        state.productCount = action.payload.count;
      })
      .addCase(fetchProductsByFilter.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error;
      })
      .addCase(fetchBrands.fulfilled, (state, action) => {
        state.brands = action.payload;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addCase(fetchProductById.pending, state => {
        state.selectedProductStatus = 'loading';
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.selectedProductStatus = 'succeded';
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.selectedProductStatus = 'failed';
        state.selectedProductError = action.error;
      });
  },
});

export default productSlice.reducer;
