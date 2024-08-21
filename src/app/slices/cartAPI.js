import axios from 'axios';
import { fetchWishlistAPI, addToWishlistAPI } from './wishlistAPI';

const client = axios.create({
  baseURL: `http://localhost:${process.env.REACT_APP_SERVER_URL}`,
});

export async function fetchCartAPI(userId) {
  const config = {
    method: 'get',
    url: `/cart?userId=${userId}`,
  };

  const response = await client(config);
  return response.data;
}

export async function addToCartAPI(product, quantity, userId) {
  const config = {
    method: 'post',
    url: '/cart',
    data: {
      product,
      quantity,
      userId,
    },
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = await client(config);
  return response.data;
}

export async function removeFromCartAPI(id) {
  const config = {
    method: 'delete',
    url: `/cart/${id}`,
  };

  await client(config);
  return id;
}

export async function updateQuantityAPI(id, quantity) {
  const config = {
    method: 'patch',
    url: `/cart/${id}`,
    data: {
      quantity,
    },
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = await client(config);
  return response.data;
}

export async function clearCartAPI(ids) {
  return await Promise.all(
    ids.map(async id => {
      const config = {
        method: 'delete',
        url: `/cart/${id}`,
      };

      await client(config);
    })
  );
}

export async function moveToWishlistAPI(id, product, userId) {
  await removeFromCartAPI(id);

  const wishlist = await fetchWishlistAPI(userId);

  const itemPresentInWishlist = wishlist.find(item => item.product.id === product.id);

  if (!itemPresentInWishlist) {
    return await addToWishlistAPI(product, userId);
  }
}
