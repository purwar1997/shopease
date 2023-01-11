import express from 'express';

import {
  signup,
  login,
  logout,
  forgotPassword,
  resetPassword,
  changePassword,
  getProfile,
} from '../controllers/auth.controller';

import {
  createCategory,
  editCategory,
  deleteCategory,
  getCategory,
  getCategories,
} from '../controllers/category.controller';

import auth from '../middlewares/auth';

const router = express.Router();

router.post('api/auth/signup', signup);
router.post('api/auth/login', login);
router.get('api/auth/logout', logout);
router.put('/api/auth/password/forgot', forgotPassword);
router.put('/api/auth/password/reset/:resetPasswordToken', resetPassword);
router.put('/api/auth/password/change', changePassword);
router.get('/api/auth/getProfile', auth, getProfile);
router.post('/api/createCategory', createCategory);
router.put('/api/editCategory/:categoryId', editCategory);
router.delete('/api/deleteCategory/:categoryId', deleteCategory);
router.get('/api/getCategory/:categoryId', getCategory);
router.get('/api/getCategories', getCategories);

export default router;
