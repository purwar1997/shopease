import express from 'express';

import {
  signup,
  login,
  logout,
  forgotPassword,
  resetPassword,
  changePassword,
  getProfile,
} from '../controllers/auth.controllers';

import {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategory,
  getCategories,
} from '../controllers/category.controllers';

import {
  createCoupon,
  deactivateCoupon,
  activateCoupon,
  deleteCoupon,
  getAllCoupons,
} from '../controllers/coupon.controllers';

import {
  addProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getAllProducts,
  addProductReview,
  updateProductReview,
} from '../controllers/product.controllers';

import auth from '../middlewares/auth';
import role from '../middlewares/role';

const router = express.Router();

router.post('api/auth/signup', signup);
router.post('api/auth/login', login);
router.get('api/auth/logout', logout);
router.put('/api/auth/password/forgot', forgotPassword);
router.put('/api/auth/password/reset/:resetPasswordToken', resetPassword);
router.put('/api/auth/password/change', changePassword);
router.get('/api/auth/profile', auth, getProfile);

router.post('/api/category/create', createCategory);
router.put('/api/category/update/:categoryId', updateCategory);
router.delete('/api/category/delete/:categoryId', deleteCategory);
router.get('/api/category/:categoryId', getCategory);
router.get('/api/categories', getCategories);

router.post('/api/coupon/create', auth, role, createCoupon);
router.put('/api/coupon/deactivate/:couponId', auth, role, deactivateCoupon);
router.put('/api/coupon/activate/:couponId', auth, role, activateCoupon);
router.delete('/api/coupon/delete/:couponId', auth, role, deleteCoupon);
router.get('/api/coupons', auth, role, getAllCoupons);

router.post('/api/product/add', auth, role, addProduct);
router.put('/api/product/update/:productId', auth, role, updateProduct);
router.delete('/api/product/delete/:productId', auth, role, deleteProduct);
router.get('/api/product/:productId', getProduct);
router.get('/api/products', getAllProducts);
router.put('/api/product/review/add/:productId', addProductReview);
router.put('/api/product/review/update/:productId', updateProductReview);

export default router;
