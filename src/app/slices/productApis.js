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

export const getProductsByFilter = async (filters, sortOption) => {
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

  if (Object.keys(sortOption).length > 0) {
    queryString = queryString + `_sort=${sortOption.sortBy}&_order=${sortOption.order}&`;
  }

  queryString = queryString.slice(0, -1);

  const config = {
    method: 'get',
    url: `/products?${queryString}`,
  };

  const response = await client(config);
  return response.data;
};
