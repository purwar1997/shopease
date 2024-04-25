import axios from 'axios';

const client = axios.create({
  baseURL: 'http://localhost:8000',
});

export async function fetchAddressesAPI(userId) {
  const config = {
    method: 'get',
    url: `/addresses?userId=${userId}`,
  };

  const response = await client(config);
  return response.data;
}

export async function addNewAddressAPI(address, userId) {
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
}

export async function updateAddressAPI(id, updates) {
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
}

export async function deleteAddressAPI(id) {
  const config = {
    method: 'delete',
    url: `/addresses/${id}`,
  };

  await client(config);
  return id;
};
