export const PAGINATION = Object.freeze({
  PRODUCTS_PER_PAGE: 15,
  ORDERS_PER_PAGE: 5,
  USERS_PER_PAGE: 5,
});

export const REGEX = Object.freeze({
  NAME: '^[a-zA-Z]+$',
  FULL_NAME: '^[A-Za-zs]*$',
  PHONE: '(0|91)?[6-9][0-9]{9}',
  PASSWORD: '^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*_])[a-zA-Z0-9!@#$%^&*_]{6,20}$',
  POSTAL_CODE: '^[0-9A-Z]{2,4}[ ]?[0-9A-Z]{3,4}$',
  COUPON_CODE: '^[A-Z][A-Z0-9]{4,14}$',
});

export const ADMIN_DETAILS = Object.freeze({
  EMAIL: 'shubhampurwar35@gmail.com',
  PASSWORD: 'shopper_97',
});
