import axios from 'axios';
import { addToCartAPI, updateQuantityAPI } from './cartAPI';
import { selectCartItemById } from './cartSlice';
import store from '../store';

const client = axios.create({
  baseURL: 'http://localhost:8000',
});

export const fetchWishlistAPI = async userId => {
  const config = {
    method: 'get',
    url: `/wishlist?userId=${userId}`,
  };

  const response = await client(config);
  return response.data;
};

export const addToWishlistAPI = async (product, userId) => {
  const config = {
    method: 'post',
    url: '/wishlist',
    data: {
      product,
      userId,
    },
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = await client(config);
  return response.data;
};

export const removeFromWishlistAPI = async id => {
  const config = {
    method: 'delete',
    url: `/wishlist/${id}`,
  };

  await client(config);
  return id;
};

export const moveToCartAPI = async (id, product, userId) => {
  let config = {
    method: 'delete',
    url: `/wishlist/${id}`,
  };

  await client(config);

  const itemPresentInCart = selectCartItemById(store.getState(), product.id);

  if (itemPresentInCart) {
    const response = await updateQuantityAPI(itemPresentInCart.id, itemPresentInCart.quantity + 1);
    return response;
  } else {
    const response = await addToCartAPI(product, 1, userId);
    return response;
  }
};
