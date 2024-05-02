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

export async function fetchAddressByIdAPI(id) {
  const config = {
    method: 'get',
    url: `/addresses/${id}`,
  };

  const response = await client(config);
  return response.data;
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

export async function deleteAddressAPI(id) {
  const address = await fetchAddressByIdAPI(id);

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

export async function setAsDefaultAPI(id, userId) {
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
