import axios from 'axios';
import { fetchUserOrdersAPI } from './orderAPI';

const client = axios.create({
  baseURL: `http://localhost:${process.env.REACT_APP_SERVER_URL}`,
});

export async function fetchAddressesAPI(userId) {
  const config = {
    method: 'get',
    url: `/addresses?userId=${userId}`,
  };

  const response = await client(config);
  const addresses = response.data.filter(address => !address.deleted);
  return addresses;
}

export async function fetchAddressByIdAPI(id) {
  const config = {
    method: 'get',
    url: `/addresses/${id}`,
  };

  const response = await client(config);
  const address = response.data;

  if (address.deleted) {
    throw new Error('Address not found.');
  }

  return address;
}

export async function addNewAddressAPI(address, userId) {
  const addresses = await fetchAddressesAPI(userId);
  const defaultAddress = addresses.find(address => address.default);

  if (address.default && defaultAddress) {
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

  if (!defaultAddress) {
    address.default = true;
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

export async function updateAddressAPI(id, updates, userId) {
  const address = await fetchAddressByIdAPI(id);

  if (address.deleted) {
    throw new Error('Address not found.');
  }

  if (updates.default) {
    const addresses = await fetchAddressesAPI(userId);
    const defaultAddress = addresses.find(address => address.default);

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

export async function deleteAddressAPI(id, userId) {
  const address = await fetchAddressByIdAPI(id);

  if (address.default) {
    throw new Error("Default address can't be deleted");
  }

  const orders = await fetchUserOrdersAPI(userId);

  const isAddressUsed = orders.find(order => order.deliveryAddress.id === id);

  if (isAddressUsed) {
    await updateAddressAPI(id, { deleted: true }, userId);
  } else {
    const config = {
      method: 'delete',
      url: `/addresses/${id}`,
    };

    await client(config);
  }

  return id;
}

export async function setAsDefaultAPI(id, userId) {
  const address = await fetchAddressByIdAPI(id);

  if (address.deleted) {
    throw new Error('Address not found.');
  }

  const addresses = await fetchAddressesAPI(userId);
  const defaultAddress = addresses.find(address => address.default);

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
