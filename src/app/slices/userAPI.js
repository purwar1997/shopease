import axios from 'axios';

const client = axios.create({
  baseURL: 'http://localhost:8000',
});

export async function fetchLoggedInUserAPI(id) {
  const config = {
    method: 'get',
    url: `/users/${id}`,
  };

  const response = await client(config);
  return response.data;
}

export async function signupAPI(signupInfo) {
  delete signupInfo.confirmPassword;

  const config = {
    method: 'post',
    url: '/users',
    data: signupInfo,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = await client(config);
  return response.data;
}

export async function loginAPI(loginInfo) {
  const { email, password } = loginInfo;

  const config = {
    method: 'get',
    url: `/users?email=${email}&password=${password}`,
  };

  const response = await client(config);

  if (response.data.length === 0) {
    throw new Error('User not found');
  }

  return response.data[0];
};
