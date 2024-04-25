import axios from 'axios';
import store from '../store';
import { addToCartAPI, updateQuantityAPI } from './cartAPI';
import { selectCartItemById } from './cartSlice';

const client = axios.create({
  baseURL: 'http://localhost:8000',
});

export async function fetchWishlistAPI(userId) {
  const config = {
    method: 'get',
    url: `/wishlist?userId=${userId}`,
  };

  const response = await client(config);
  return response.data;
}

export async function addToWishlistAPI(product, userId) {
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
}

export async function removeFromWishlistAPI(id) {
  const config = {
    method: 'delete',
    url: `/wishlist/${id}`,
  };

  await client(config);
  return id;
}

export async function moveToCartAPI(id, product, userId) {
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
