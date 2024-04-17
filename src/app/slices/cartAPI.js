import axios from 'axios';

const client = axios.create({
  baseURL: 'http://localhost:8000',
});

export const fetchCartItemsAPI = async () => {
  const config = {
    method: 'get',
    url: '/cart',
  };

  const response = await client(config);
  return response.data;
};

export const addItemToCartAPI = async item => {
  const config = {
    method: 'post',
    url: '/cart',
    data: {
      product: item,
      quantity: 1,
    },
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = await client(config);
  return response.data;
};

export const removeItemFromCartAPI = async id => {
  const config = {
    method: 'delete',
    url: `/cart/${id}`,
  };

  const response = await client(config);
  return response.data;
};

export const updateItemQuantityAPI = async (id, quantity) => {
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
};
