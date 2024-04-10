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

export const getProductsByFilter = async filters => {
  let queryString = '';

  for (const [key, value] of Object.entries(filters)) {
    queryString = queryString + `${key}=${value}&`;
  }

  queryString = queryString.slice(0, -1);

  const config = {
    method: 'get',
    url: `/products?${queryString}`,
  };

  const response = await client(config);
  return response.data;
};
