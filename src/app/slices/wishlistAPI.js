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
  await removeFromWishlistAPI(id);

  const itemPresentInCart = selectCartItemById(store.getState(), product.id);

  if (itemPresentInCart) {
    return await updateQuantityAPI(itemPresentInCart.id, itemPresentInCart.quantity + 1);
  } else {
    return await addToCartAPI(product, 1, userId);
  }
};
