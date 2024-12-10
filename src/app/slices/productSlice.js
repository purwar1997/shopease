import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchProductsAPI,
  fetchCategoriesAPI,
  fetchBrandsAPI,
  fetchProductByIdAPI,
  addNewProductAPI,
  updateProductAPI,
  deleteProductAPI,
} from './productAPI';

export const fetchProductsAsync = createAsyncThunk(
  'products/fetchProducts',
  async ({ filters, sort, pagination }) => {
    return await fetchProductsAPI(filters, sort, pagination);
  }
);

export const fetchCategoriesAsync = createAsyncThunk('products/fetchCategories', async () => {
  return await fetchCategoriesAPI();
});

export const fetchBrandsAsync = createAsyncThunk('products/fetchBrands', async () => {
  return await fetchBrandsAPI();
});

export const fetchProductByIdAsync = createAsyncThunk('products/fetchProductById', async id => {
  return await fetchProductByIdAPI(id);
});

export const addNewProductAsync = createAsyncThunk('products/addNewProduct', async product => {
  return await addNewProductAPI(product);
});

export const updateProductAsync = createAsyncThunk(
  'products/updateProduct',
  async ({ id, updates }) => {
    return await updateProductAPI(id, updates);
  }
);

export const deleteProductAsync = createAsyncThunk('products/deleteProduct', async id => {
  return await deleteProductAPI(id);
});

const initialState = {
  status: 'idle',
  products: [],
  productCount: 0,
  error: null,
  brands: [],
  categories: [],
  selectedProductStatus: 'idle',
  selectedProduct: null,
  selectedProductError: null,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchProductsAsync.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchProductsAsync.fulfilled, (state, action) => {
        state.status = 'succeded';
        state.products = action.payload.products;
        state.productCount = action.payload.count;
      })
      .addCase(fetchProductsAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error;
      })
      .addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addCase(fetchBrandsAsync.fulfilled, (state, action) => {
        state.brands = action.payload;
      })
      .addCase(fetchProductByIdAsync.pending, state => {
        state.selectedProductStatus = 'loading';
      })
      .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
        state.selectedProductStatus = 'succeded';
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductByIdAsync.rejected, (state, action) => {
        state.selectedProductStatus = 'failed';
        state.selectedProductError = action.error;
      });
  },
});

export default productSlice.reducer;
