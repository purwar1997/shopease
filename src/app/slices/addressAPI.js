import axios from 'axios';

const client = axios.create({
  baseURL: 'http://localhost:8000',
});

export const fetchUserAddressesAPI = async userId => {
  const config = {
    method: 'get',
    url: `/addresses?userId=${userId}`,
  };

  const response = await client(config);
  return response.data;
};

export const addNewAddressAPI = async (address, userId) => {
  const config = {
    method: 'post',
    url: '/addresses',
    data: {
      ...address,
      userId,
    },
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = await client(config);
  return response.data;
};

export const updateAddressAPI = async (id, updates) => {
  const config = {
    method: 'patch',
    url: `/addresses/${id}`,
    data: {
      ...updates,
    },
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = await client(config);
  return response.data;
};

export const deleteAddressAPI = async id => {
  const config = {
    method: 'delete',
    url: `/addresses/${id}`,
  };

  const response = await client(config);
  return id;
};
