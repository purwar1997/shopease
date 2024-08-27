import axios from 'axios';
import { fetchCartAPI } from './cartAPI';
import { fetchWishlistAPI } from './wishlistAPI';
import { fetchAddressesAPI } from './addressAPI';
import { fetchUserOrdersAPI } from './orderAPI';

const client = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
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
  const signupDetails = { ...signupInfo };
  delete signupDetails.confirmPassword;

  let config = {
    method: 'get',
    url: `/users?email=${signupInfo.email}`,
  };

  let response = await client(config);

  if (response.data.length) {
    throw new Error('User already exists.');
  }

  config = {
    method: 'post',
    url: '/users',
    data: {
      ...signupDetails,
      role: 'user',
    },
    headers: {
      'Content-Type': 'application/json',
    },
  };

  response = await client(config);
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
  const profile = { ...updates };

  if (!profile.password) {
    delete profile.password;
  }

  delete profile.confirmPassword;

  const config = {
    method: 'patch',
    url: `/users/${id}`,
    data: {
      ...profile,
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
  const user = await fetchLoggedInUserAPI(id);

  if (user.role === 'admin') {
    const config = {
      method: 'get',
      url: `/users?role=admin`,
    };

    const response = await client(config);
    const admins = response.data;

    if (admins.length === 1) {
      throw new Error(
        'Please promote another user to the role of an admin. Only then you can delete your account.'
      );
    }
  }

  const config = {
    method: 'delete',
    url: `/users/${id}`,
  };

  await client(config);

  const cart = await fetchCartAPI(id);
  const wishlist = await fetchWishlistAPI(id);
  const addresses = await fetchAddressesAPI(id);
  const orders = await fetchUserOrdersAPI(id);

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

export async function fetchAllUsersAPI(pagination) {
  const { page, limit } = pagination;

  const config = {
    method: 'get',
    url: `/users?_page=${page}&_limit=${limit}`,
  };

  const response = await client(config);
  return { users: response.data, count: Number(response.headers.get('X-Total-Count')) };
}

export async function updateUserRoleAPI(id, role, user) {
  if (user.role !== 'admin') {
    throw new Error('Only admin can update user role.');
  }

  if (id === user.id && role === 'user') {
    const config = {
      method: 'get',
      url: `/users?role=admin`,
    };

    const response = await client(config);
    const admins = response.data;

    if (admins.length === 1) {
      throw new Error(
        'Please promote another user to the role of an admin. Only then you can demote yourself to the role of a user.'
      );
    }
  }

  const config = {
    method: 'patch',
    url: `/users/${id}`,
    data: {
      role,
    },
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = await client(config);
  return response.data;
}

export async function deleteUserAPI(id, user) {
  if (user.role !== 'admin') {
    throw new Error('Only admin can delete a user.');
  }

  if (id === user.id) {
    const config = {
      method: 'get',
      url: `/users?role=admin`,
    };

    const response = await client(config);
    const admins = response.data;

    if (admins.length === 1) {
      throw new Error(
        'Please promote another user to the role of an admin. Only then you can delete your account.'
      );
    }
  }

  let config = {
    method: 'delete',
    url: `/users/${id}`,
  };

  await client(config);

  const cart = await fetchCartAPI(id);
  const wishlist = await fetchWishlistAPI(id);
  const addresses = await fetchAddressesAPI(id);
  const orders = await fetchUserOrdersAPI(id);

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

export async function fetchAdminsAPI() {
  const config = {
    method: 'get',
    url: `/users?role=admin`,
  };

  const response = await client(config);
  return response.data;
}