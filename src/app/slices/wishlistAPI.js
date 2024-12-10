import axios from 'axios';
import { addToCartAPI, fetchCartAPI, updateQuantityAPI } from './cartAPI';

const client = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
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

export async function clearWishlistAPI(ids) {
  return await Promise.all(
    ids.map(async id => {
      const config = {
        method: 'delete',
        url: `/wishlist/${id}`,
      };

      await client(config);
    })
  );
}

export async function moveToCartAPI(id, product, userId) {
  await removeFromWishlistAPI(id);

  const cart = await fetchCartAPI(userId);
  const cartItem = cart.find(item => item.product.id === product.id);

  if (cartItem) {
    return await updateQuantityAPI(cartItem.id, cartItem.quantity + 1);
  } else {
    return await addToCartAPI(product, 1, userId);
  }
}
