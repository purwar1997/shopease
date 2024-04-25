import axios from 'axios';

const client = axios.create({
  baseURL: 'http://localhost:8000',
});

export async function fetchOrdersAPI(userId) {
  const config = {
    method: 'get',
    url: `/orders?userId=${userId}`,
  };

  const response = await client(config);
  return response.data;
}

export async function fetchOrderByIdAPI(id) {
  const config = {
    method: 'get',
    url: `/orders/${id}`,
  };

  const response = await client(config);
  return response.data;
}

export async function createNewOrderAPI(order, userId) {
  const config = {
    method: 'post',
    url: '/orders',
    data: {
      ...order,
      userId,
    },
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = await client(config);
  return response.data;
}

export async function updateOrderStatusAPI(id, orderStatus) {
  const config = {
    method: 'patch',
    url: `/orders/${id}`,
    data: {
      orderStatus,
    },
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = await client(config);
  return response.data;
};
