import express from 'express';

import {
  signup,
  login,
  logout,
  forgotPassword,
  resetPassword,
  changePassword,
  getProfile,
  getAllProfiles,
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
router.get('/api/auth/getAllProfiles', auth, role, getAllProfiles);

router.post('/api/category/create', auth, role, createCategory);
router.put('/api/category/update/:categoryId', auth, role, updateCategory);
router.delete('/api/category/delete/:categoryId', auth, role, deleteCategory);
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
