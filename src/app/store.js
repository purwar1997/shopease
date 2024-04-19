import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './slices/productSlice';
import authReducer from './slices/authSlice';
import cartReducer from './slices/cartSlice';
import addressReducer from './slices/addressSlice';

const store = configureStore({
  reducer: {
    products: productsReducer,
    auth: authReducer,
    cart: cartReducer,
    address: addressReducer,
  },
});

export default store;
