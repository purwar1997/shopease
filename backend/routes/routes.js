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

import auth from '../middlewares/auth';

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

export default router;
