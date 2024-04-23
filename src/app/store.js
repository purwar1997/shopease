import { configureStore } from '@reduxjs/toolkit';
import productReducer from './slices/productSlice';
import authReducer from './slices/authSlice';
import cartReducer from './slices/cartSlice';
import addressReducer from './slices/addressSlice';
import orderReducer from './slices/orderSlice';

const store = configureStore({
  reducer: {
    product: productReducer,
    auth: authReducer,
    cart: cartReducer,
    address: addressReducer,
    order: orderReducer,
  },
});

export default store;
