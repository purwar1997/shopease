import axios from 'axios';

const client = axios.create({
  baseURL: 'http://localhost:8000',
});

export const getAllProducts = async () => {
  const config = {
    method: 'get',
    url: '/products',
  };

  const response = await client(config);
  return response.data;
};

export const fetchProductsByFilterAPI = async (filters, sort, pagination) => {
  let queryString = '';

  for (let [key, value] of Object.entries(filters)) {
    if (key === 'category' || key === 'brand') {
      value = value[value.length - 1];
    }

    if (key === 'rating') {
      key = 'rating_gte';
    }

    queryString = queryString + `${key}=${value}&`;
  }

  if (Object.keys(sort).length > 0) {
    queryString = queryString + `_sort=${sort.sortBy}&_order=${sort.order}&`;
  }

  queryString = queryString + `_page=${pagination.page}&_limit=${pagination.limit}`;

  if (queryString.at(-1) === '&') {
    queryString = queryString.slice(0, -1);
  }

  const config = {
    method: 'get',
    url: `/products?${queryString}`,
  };

  const response = await client(config);
  return { products: response.data, count: Number(response.headers.get('X-Total-Count')) };
};

export const fetchBrandsAPI = async () => {
  const config = {
    method: 'get',
    url: '/brands',
  };

  const response = await client(config);
  return response.data;
};

export const fetchCategoriesAPI = async () => {
  const config = {
    method: 'get',
    url: '/categories',
  };

  const response = await client(config);
  return response.data;
};

export const fetchProductByIdAPI = async id => {
  const config = {
    method: 'get',
    url: `/products/${id}`,
  };

  const response = await client(config);
  return response.data;
};