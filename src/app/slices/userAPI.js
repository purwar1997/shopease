import axios from 'axios';
import { fetchCartAPI } from './cartAPI';
import { fetchWishlistAPI } from './wishlistAPI';
import { fetchAddressesAPI } from './addressAPI';
import { fetchOrdersAPI } from './orderAPI';

const client = axios.create({
  baseURL: 'http://localhost:8000',
});

export async function fetchLoggedInUserAPI(id) {
  const config = {
    method: 'get',
    url: `/users/${id}`,
  };

  const response = await client(config);
  delete response.data.password;
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
  delete response.data.password;
  return response.data;
}

export async function loginAPI(loginInfo) {
  const { email, password } = loginInfo;

  const config = {
    method: 'get',
    url: `/users?email=${email}&password=${password}`,
  };

  const response = await client(config);
  const user = response.data[0];

  if (!user) {
    throw new Error('User not found');
  }

  delete user.password;
  return user;
}

export async function logoutAPI() {
  await new Promise(resolve => {
    setTimeout(resolve, 1500);
  });
}

export async function updateProfileAPI(id, updates) {
  if (!updates.password) {
    delete updates.password;
  }

  delete updates.confirmPassword;

  const config = {
    method: 'patch',
    url: `/users/${id}`,
    data: {
      ...updates,
    },
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = await client(config);
  delete response.data.password;
  return response.data;
}

export async function deleteAccountAPI(id) {
  const config = {
    method: 'delete',
    url: `/users/${id}`,
  };

  await client(config);

  const cart = await fetchCartAPI(id);
  const wishlist = await fetchWishlistAPI(id);
  const addresses = await fetchAddressesAPI(id);
  const orders = await fetchOrdersAPI(id);

  await Promise.all(
    cart.map(async item => {
      const config = {
        method: 'delete',
        url: `/cart/${item.id}`,
      };

      await client(config);
    })
  );

  await Promise.all(
    wishlist.map(async item => {
      const config = {
        method: 'delete',
        url: `/wishlist/${item.id}`,
      };

      await client(config);
    })
  );

  await Promise.all(
    addresses.map(async address => {
      const config = {
        method: 'delete',
        url: `/addresses/${address.id}`,
      };

      await client(config);
    })
  );

  await Promise.all(
    orders.map(async order => {
      const config = {
        method: 'delete',
        url: `/orders/${order.id}`,
      };

      await client(config);
    })
  );
}