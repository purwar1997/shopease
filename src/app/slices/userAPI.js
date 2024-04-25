import axios from 'axios';

const client = axios.create({
  baseURL: 'http://localhost:8000',
});

export const fetchLoggedInUserAPI = async userId => {
  const config = {
    method: 'get',
    url: `/users/${userId}`,
  };

  const response = await client(config);
  return response.data;
};
