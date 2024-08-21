import axios from 'axios';

const client = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
});

export async function fetchProductsAPI(filters, sort, pagination) {
  let queryString = '';

  const { sortBy, order } = sort;
  const { page, limit } = pagination;

  for (let [key, value] of Object.entries(filters)) {
    if (key === 'category' || key === 'brand') {
      value = value[value.length - 1];
    }

    if (key === 'rating') {
      key = 'rating_gte';
    }

    queryString = queryString + `${key}=${value}&`;
  }

  if (sortBy) {
    queryString = queryString + `_sort=${sortBy}&_order=${order}&`;
  }

  queryString = queryString + `_page=${page}&_limit=${limit}`;

  const config = {
    method: 'get',
    url: `/products?${queryString}`,
  };

  const response = await client(config);

  return {
    products: response.data.filter(product => !product.deleted),
    count: Number(response.headers.get('X-Total-Count')),
  };
}

export async function fetchBrandsAPI() {
  const config = {
    method: 'get',
    url: '/brands',
  };

  const response = await client(config);
  return response.data;
}

export async function fetchCategoriesAPI() {
  const config = {
    method: 'get',
    url: '/categories',
  };

  const response = await client(config);
  return response.data;
}

export async function fetchProductByIdAPI(id) {
  const config = {
    method: 'get',
    url: `/products/${id}`,
  };

  const response = await client(config);
  const product = response.data;

  if (product.deleted) {
    throw new Error('Product not found.');
  }

  return product;
}

export async function addNewProductAPI(product) {
  const config = {
    method: 'post',
    url: '/products',
    data: product,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = await client(config);
  return response.data;
}

export async function updateProductAPI(id, updates) {
  const product = await fetchProductByIdAPI(id);

  if (product.deleted) {
    throw new Error('Product not found.');
  }

  const config = {
    method: 'patch',
    url: `/products/${id}`,
    data: updates,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = await client(config);
  return response.data;
}

export async function deleteProductAPI(id) {
  const config = {
    method: 'patch',
    url: `/products/${id}`,
    data: {
      deleted: true,
    },
    headers: {
      'Content-Type': 'application/json',
    },
  };

  await client(config);
  return id;
}
