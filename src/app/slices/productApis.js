import axios from 'axios';

const client = axios.create({
  baseURL: 'http://localhost:8000',
});

export const getProducts = async () => {
  const config = {
    method: 'get',
    url: '/products',
  };

  const response = await client(config);
  return response.data;
};
