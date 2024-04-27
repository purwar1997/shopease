import axios from 'axios';
import store from '../store';
import { selectAddresses, selectDefaultAddress, selectAddressById } from './addressSlice';

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
  const addresses = selectAddresses(store.getState());
  const defaultAddress = selectDefaultAddress(store.getState());

  if (addresses.length === 0) {
    address.default = true;
  }

  if (address.default) {
    const config = {
      method: 'patch',
      url: `/addresses/${defaultAddress.id}`,
      data: {
        default: false,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    };

    await client(config);
  }

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
  if (updates.default) {
    const defaultAddress = selectDefaultAddress(store.getState());

    const config = {
      method: 'patch',
      url: `/addresses/${defaultAddress.id}`,
      data: {
        default: false,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    };

    await client(config);
  }

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
  const address = selectAddressById(store.getState(), id);

  if (address.default) {
    throw new Error("Default address can't be deleted");
  }

  const config = {
    method: 'delete',
    url: `/addresses/${id}`,
  };

  await client(config);
  return id;
}

export async function setAsDefaultAPI(id) {
  const defaultAddress = selectDefaultAddress(store.getState());

  let config = {
    method: 'patch',
    url: `/addresses/${defaultAddress.id}`,
    data: {
      default: false,
    },
    headers: {
      'Content-Type': 'application/json',
    },
  };

  await client(config);

  config = {
    method: 'patch',
    url: `/addresses/${id}`,
    data: {
      default: true,
    },
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = await client(config);
  return response.data;
}