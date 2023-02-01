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
  editCategory,
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
router.put('/api/category/edit/:categoryId', editCategory);
router.delete('/api/category/delete/:categoryId', deleteCategory);
router.get('/api/category/:categoryId', getCategory);
router.get('/api/categories', getCategories);

router.post('/api/coupon/create', auth, role, createCoupon);
router.put('/api/coupon/deactivate/:couponId', auth, role, deactivateCoupon);
router.put('/api/coupon/activate/:couponId', auth, role, activateCoupon);
router.delete('/api/coupon/delete/:couponId', auth, role, deleteCoupon);
router.get('/api/coupons', auth, role, getAllCoupons);

export default router;
