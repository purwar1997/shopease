import axios from 'axios';

const client = axios.create({
  baseURL: 'http://localhost:8000',
});

export const getProducts = async queryString => {
  const config = {
    method: 'get',
    url: `/products?${queryString}`,
  };

  const response = await client(config);
  return response.data;
};
