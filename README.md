# Shopease

![static-badge](https://img.shields.io/badge/built_with-love-red?style=for-the-badge)
![static-badge](https://img.shields.io/badge/status-success-limegreen?style=for-the-badge)

## 0. Table of Contents

1. [Overview](#1-overview)
2. [Main Features](#2-main-features)
3. [Extra Features](#3-extra-features)
4. [Tools and technologies used](#4-tools-and-technologies-used)
5. [Deployed Link](#5-deployed-link)

## 1. Overview

Shopease is an e-commerce platform designed to provide a seamless shopping experience to users. With a vast selection of products ranging from electronics and fashion to home goods and beauty products, Shopease aims to cater to all your shopping needs in one location.

![preview](./media/preview.png)

## 2. Main Features

- Authentication
  - User signup
  - User login
  - User logout
- Cart management
  - Add item to cart
  - Remove item from cart
  - Update item quantity
  - Clear cart
- Wishlist management
  - Add item to wishlist
  - Remove item from wishlist
  - Clear wishlist
- Manage addresses
  - Add new address
  - Update an address
  - Delete an address
  - Set an address as default
- Profile management
  - Update profile - first name, last name, phone, password
  - Delete account 
- Products
  - Filter by category, brand and rating
  - Sort by rating, newly added, price-low to high and price-high to low
- View order history
- Admin panel
  - Product management
    - Add new product
    - Update product details
    - Delete a product
    - Filter and sort products
  - User management
    - Update user role
    - Delete a user
  - Order management
    - Update order status
    - Delete an order
    - Sort orders by amount

## 3. Extra Features
   
- Pagination to render large lists of products, orders and users
- Sanitization and validation of data entered in React Forms
- Lazy loading to import bundles only when they are required, thereby reducing the initial bundle size
- Memoization of React components and expensive calculations
- Best practices of React and Redux to minimize unnecessary re-renders
- Custom hooks to handle modals and dropdowns

## 4. Tools and technologies used

- Create React App to initialize React project
- Tailwind CSS to style UI components
- React Router v6 to implement client side routing
- Redux Toolkit to save global state in an external store
- Redux Thunks to fetch data and save it in a Redux store
- Axios client to send API requests
- JSON Server as a mock backend to serve incoming API requests
- pm2 to ensure that JSON Server keeps running as a daemon process
- Morgan to log information about HTTP requests
- Hosted on DigitalOcean droplet using Nginx as a web server 

## 5. Deployed Link

To checkout the live demo of Shopease, [click here](http://shopease.shubhampurwar.in).
