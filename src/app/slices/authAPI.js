import axios from 'axios';

const client = axios.create({
  baseURL: 'http://localhost:8000',
});

export const signupAPI = async credentials => {
  delete credentials.confirmPassword;

  const config = {
    method: 'post',
    url: '/users',
    data: credentials,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = await client(config);
  return response.data;
};

export const loginAPI = async credentials => {
  const { email, password } = credentials;

  const config = {
    method: 'get',
    url: `/users?email=${email}&password=${password}`,
  };

  const response = await client(config);
  return response.data[0] ?? null;
};
