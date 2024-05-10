import axios from 'axios';

const client = axios.create({
  baseURL: 'http://localhost:8000',
});

export async function fetchUserOrdersAPI(userId) {
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

export async function fetchAllOrdersAPI(pagination) {
  const { page, limit } = pagination;

  const config = {
    method: 'get',
    url: `/orders?_page=${page}&_limit=${limit}`,
  };

  const response = await client(config);
  return { orders: response.data, count: Number(response.headers.get('X-Total-Count')) };
}

export async function updateOrderStatusAPI(id, status, user) {
  if (user.role !== 'admin') {
    throw new Error('Only admin can update order status.');
  }

  const order = await fetchOrderByIdAPI(id);

  if (status === 'processing' && order.status !== 'created') {
    throw new Error('Only created order can be processed.');
  }

  if (status === 'shipped' && order.status !== 'processing') {
    throw new Error('Only processed order can be shipped.');
  }

  if (status === 'delivered' && order.status !== 'shipped') {
    throw new Error('Only shipped order can be delivered.');
  }

  const config = {
    method: 'patch',
    url: `/orders/${id}`,
    data: {
      status,
    },
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = await client(config);
  return response.data;
}

export async function deleteOrderAPI(id, user) {
  if (user.role !== 'admin') {
    throw new Error('Only admin can delete orders.');
  }

  const config = {
    method: 'delete',
    url: `/orders/${id}`,
  };

  const response = await client(config);
  return response.data;
}